const crypto = require('crypto');
const moment = require('moment');
const url = require('url');
const Issuer = require('openid-client').Issuer;
const firebase = require('./firebase');
const config = require('./config');

const ciudadaniaDigitalCodeRef = firebase.database().ref().child('code');

/**
 * @function authService
 * @description Autenticacion con Ciudadania Digital
 * @author dbarra@agetic.gob.bo
 */

module.exports = function authService () {
  const issuer = new Issuer(config.iss);
  const cliente = new issuer.Client(config.openId.client);
  cliente.CLOCK_TOLERANCE = 5;

  /**
   * El método permite obtener el state y nonce para iniciar el flujo oauth 2.0
   * @returns {JSON}
   */

  async function getCode () {
    try {
      const state = crypto.randomBytes(16).toString('hex');
      const nonce = crypto.randomBytes(16).toString('hex');
      const authorizationRequest = Object.assign({
        redirect_uri: config.openId.client.redirect_uris[0],
        state,
        nonce
      }, config.openId.client_params);
      const authorizeUrl = cliente.authorizationUrl(authorizationRequest);

      const key = ciudadaniaDigitalCodeRef.push().key;
      const newCode = {
        id: key,
        state,
        parametros: {
          nonce
        }
      };
      await ciudadaniaDigitalCodeRef.child(key).update(newCode);
      return {
        url: authorizeUrl,
        codigo: state
      };
    } catch (error) {
      console.error(error.message);
    }
  }

  /**
   * El método permite realizar el intercambio del code por el id_token y access_token
   * @param {object} req
   * @param {object} info
   * @returns {JSON}
   */

  function authorizate (req) {
    return new Promise((resolve, reject) => {
      try {
        const params = cliente.callbackParams(req);
        if (!params.state) {
          throw new Error('Parámetro state es requerido.');
        }
        if (!params.code) {
          throw new Error('Parámetro code es requerido.');
        }
        
        ciudadaniaDigitalCodeRef.once('value', (data) => {
          let token;
          let resultadoState = Object.entries(data.val()).find(([key, item], i) => item.state === params.state);
          resultadoState = resultadoState[1];
          if (resultadoState) {
            cliente.authorizationCallback(cliente.redirect_uris[0], params, {
              nonce: resultadoState.parametros.nonce,
              state: resultadoState.state,
            })
            .then(respuestaCode => {
              token = respuestaCode.id_token;
              return cliente.userinfo(respuestaCode.access_token);
            })
            .then(claims => {
              const user = {
                nombres: claims.nombre.nombres,
                primer_apellido: `${claims.nombre.primer_apellido}`,
                segundo_apellido: `${claims.nombre.segundo_apellido}`,
                correo: claims.email,
                numero_celular: claims.celular,
                fecha_nacimiento: claims.fecha_nacimiento,
                usuario: claims.documento_identidad.numero_documento,
                documento_identidad: claims.documento_identidad.numero_documento,
              };
              resolve({
                usuario: user,
                token: token,
                menu: [],
                permisos: [],
              });
            })
            .catch(err => {
              resolve({
                url: cliente.post_logout_redirect_uris[0]
              });
            });
          } else {
            throw new Error('Ocurrio un error al tratar de autenticar con CD');
          }
        });
      } catch (error) {
        reject(error.message);
      }
    });
  }

  return {
    getCode,
    authorizate
  }
};
