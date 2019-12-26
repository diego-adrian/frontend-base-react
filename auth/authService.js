const crypto = require('crypto');
const moment = require('moment');
const Issuer = require('openid-client').Issuer;
const config = require('./config');

/**
 * @function authService
 * @description Autenticacion con Ciudadania Digital
 * @author dbarra@agetic.gob.bo
 */

module.exports = function authService () {
  const issuer = new Issuer(config.iss);
  const cliente = new issuer.Client(config.openId.client);

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
      return {
        url: authorizeUrl,
        codigo: state
      };
    } catch (error) {
      console.error(error.message);
    }
  }

  async function authorizate (req, info) {
    try {
      let user;
      let respuesta;
      const params = cliente.callbackParams(req);
      if (!params.state) {
        throw new Error('Parámetro state es requerido.');
      }
      if (!params.code) {
        throw new Error('Parámetro code es requerido.');
      }
      const resultadoState = {};
      await cliente.authorizationCallback(cliente.redirect_uris[0], params, {
        nonce: resultadoState.parametros.nonce,
        state: resultadoState.state
      });
      console.log('------------------------------------');
      console.log(9999999999999);
      console.log('------------------------------------');
    } catch (error) {
      console.error(error.message);
    }
  }

  return {
    getCode,
    authorizate
  }
};
