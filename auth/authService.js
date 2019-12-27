const crypto = require('crypto');
const moment = require('moment');
const Issuer = require('openid-client').Issuer;
const firebase = require('./firebase');
const config = require('./config');

const ciudadaniaDigitalRef = firebase.database().ref('ciudadania-digital');

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

  function getCode () {
    try {
      const state = crypto.randomBytes(16).toString('hex');
      const nonce = crypto.randomBytes(16).toString('hex');
      const authorizationRequest = Object.assign({
        redirect_uri: config.openId.client.redirect_uris[0],
        state,
        nonce
      }, config.openId.client_params);
      const authorizeUrl = cliente.authorizationUrl(authorizationRequest);


      const key = ciudadaniaDigitalRef.push().key;
      const newCode = {
        id: key,
        state,
        parametros: {
          nonce
        }
      };
      ciudadaniaDigitalRef.child(key).update(newCode).then(() => {
        return {
          url: authorizeUrl,
          codigo: state
        };
      });
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

  function authorizate (req, info) {
    try {
      let user;
      let respuesta;
      console.log('---------------REQPQRASSSSS---------------------');
      console.log(req);
      console.log('------------------------------------');
      const params = cliente.callbackParams(req);
      console.log('-----------PARAMSSSSSSs-------------------------');
      console.log(params);
      console.log('------------------------------------');
      if (!params.state) {
        throw new Error('Parámetro state es requerido.');
      }
      if (!params.code) {
        throw new Error('Parámetro code es requerido.');
      }
      const resultadoState = {};
      cliente.authorizationCallback(cliente.redirect_uris[0], params, {
        nonce: '',
        state: params.state,
      }).then((response) => {
        console.log('--------REPSONSEEEEEEEEEe----------------------------');
        console.log(response);
        console.log('------------------------------------');
        return response;
      }).catch(err => {
        console.log('-----------ERRRRRRRRROOOOOOO-------------------------');
        console.log(err.message);
        console.log('------------------------------------');
      })
    } catch (error) {
      console.error(error.message);
    }
  }

  return {
    getCode,
    authorizate
  }
};
