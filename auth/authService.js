const crypto = require('crypto');
const Issuer = require('openid-client').Issuer;
const config = require('./config');

/**
 * @function authService
 * @description Autenticacion con Ciudadania Digital
 * @author dbarra@agetic.gob.bo
 */

module.exports = function authService () {
  console.log('------------------------------------');
  console.log(config.openId.client);
  console.log('------------------------------------');
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

  return {
    getCode
  }
};
