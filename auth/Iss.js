const openId = require('./openId');
const iss = {
  issuer: `${openId.issuer}`,
  authorization_endpoint: `${openId.issuer}/auth`,
  token_endpoint: `${openId.issuer}/token`,
  revocation_endpoint: `${openId.issuer}/revocation`,
  registration_endpoint: `${openId.issuer}/reg`,
  userinfo_endpoint: `${openId.issuer}/me`,
  introspection_endpoint: `${openId.issuer}/token/introspection`,
  check_session_iframe: `${openId.issuer}/session/check`,
  end_session_endpoint: `${openId.issuer}/session/end`,
  jwks_uri: `${openId.issuer}/certs`
};

module.exports = iss;