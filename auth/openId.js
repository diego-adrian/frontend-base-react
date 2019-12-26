// curl -X POST https://account-idetest.agetic.gob.bo/reg -H "Content-Type: application/json" -d '{"redirect_uris": ["http://localhost:3000/static/oauth/login.html"], "post_logout_redirect_uris":["http://localhost:3000/static/oauth/logout.html"],"client_name":"frontend_base_react","token_endpoint_auth_method":"client_secret_basic","authorization_params":{"scope":"openid nombre email documento_identidad fecha_nacimiento celular"},"grant_types":["authorization_code"],"response_types":["code"],"application_type":"web","contacts":["dbarra@agetic.gob.bo"]}'
const openId = {
  // issuer server openid connect
  issuer: 'https://account-idetest.agetic.gob.bo',
  // response registry client
  client: {
    'application_type': 'web',
    'grant_types': [
      'authorization_code'
    ],
    'id_token_signed_response_alg': 'RS256',
    'require_auth_time': false,
    'response_types': [
      'code'
    ],
    'subject_type': 'public',
    'token_endpoint_auth_method': 'client_secret_basic',
    'introspection_signed_response_alg': 'RS256',
    'post_logout_redirect_uris': [
      'http://localhost:3000/static/oauth/logout.html'
    ],
    'backchannel_logout_session_required': false,
    'frontchannel_logout_session_required': false,
    'authorization_signed_response_alg': 'RS256',
    'web_message_uris': [],
    'client_id_issued_at': 1577397710,
    'client_id': '1ccbbd2c-4cb5-48d8-9f55-d5517f190f4d',
    'client_name': 'frontend_base_react',
    'client_secret_expires_at': 0,
    'client_secret': 'kppJqkuX8/CuP+N6Fp8KMboxYRYJiwwW+a7CbDXW/4IrwH7yDgmpI826S/AFTHGL',
    'contacts': [
      'dbarra@agetic.gob.bo'
    ],
    'redirect_uris': [
      'http://localhost:3000/static/oauth/login.html'
    ],
    'introspection_endpoint_auth_method': 'client_secret_basic',
    'revocation_endpoint_auth_method': 'client_secret_basic',
    'registration_client_uri': 'https://account-idetest.agetic.gob.bo/reg/1ccbbd2c-4cb5-48d8-9f55-d5517f190f4d',
    'registration_access_token': 'yEld~fSIIY6LuYCb7yO87KX0oYr8DZgwcg~jXIyGpOm'
  },
  // parameters registry client
  client_params: {
    scope: ['openid nombre email documento_identidad fecha_nacimiento celular']
    // prompt: 'consent',
  }
};

module.exports = openId;
