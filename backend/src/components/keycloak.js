const config = require('../config/index');
const Keycloak = require('keycloak-connect');

module.exports = new Keycloak({}, {
    bearerOnly: false,
    'confidential-port': 0,
    clientId: config.get('oidc.clientID'),
    'policy-enforcer': {},
    realm: 'Jsgbqlip',
    secret: config.get('oidc.clientSecret'),
    serverUrl: 'https://sso.pathfinder.gov.bc.ca/auth',
    'ssl-required': external,
    'use-resouce-role-mappings': true,
    'verify-token-audience': true
});