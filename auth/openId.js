// curl -X POST https://account-idetest.agetic.gob.bo/reg -H "Content-Type: application/json" -d '{"redirect_uris": ["http://localhost:3000/oauth/login.html"], "post_logout_redirect_uris":["http://localhost:3000/oauth/logout.html"],"client_name":"frontend_base_react","token_endpoint_auth_method":"client_secret_basic","authorization_params":{"scope":"openid nombre email documento_identidad fecha_nacimiento celular"},"grant_types":["authorization_code"],"response_types":["code"],"application_type":"web","contacts":["dbarra@agetic.gob.bo"]}'
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
      'http://localhost:3000/oauth/logout.html'
    ],
    'backchannel_logout_session_required': false,
    'frontchannel_logout_session_required': false,
    'authorization_signed_response_alg': 'RS256',
    'web_message_uris': [],
    'client_id_issued_at': 1577402114,
    'client_id': '7fffdacc-14d4-43b0-bdff-033622441b43',
    'client_name': 'frontend_base_react',
    'client_secret_expires_at': 0,
    'client_secret': 'jylYx9TS7WwDpVpOuTTXSUaFBxISbLQ6xGDeIz9M6pcwdkWN/hhT1gpHgxNR8BGe',
    'contacts': [
      'dbarra@agetic.gob.bo'
    ],
    'redirect_uris': [
      'http://localhost:3000/oauth/login.html'
    ],
    'introspection_endpoint_auth_method': 'client_secret_basic',
    'revocation_endpoint_auth_method': 'client_secret_basic',
    'registration_client_uri': 'https://account-idetest.agetic.gob.bo/reg/7fffdacc-14d4-43b0-bdff-033622441b43',
    'registration_access_token': 'fz98bS36QBtHIkpVQiFNweT1xKg3xLBnF7gxASVLgNz'
  },
  // parameters registry client
  client_params: {
    scope: ['openid nombre email documento_identidad fecha_nacimiento celular']
    // prompt: 'consent',
  }
};

module.exports = openId;
