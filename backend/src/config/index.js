/* eslint-disable */
'use strict';
const nconf = require('nconf');
const dotenv = require('dotenv');
dotenv.config();

const env = 'default';

//injects environment variables into the json file
nconf.overrides({
    environment: env,
    oidc: {
        clientID: process.env.SSO_CLIENT_ID,
        clientSecret: process.env.SSO_USER_SECRET,
        publicKey: process.env.PUBLIC_KEY,
        discovery: "https://sso.pathfinder.gov.bc.ca/auth/realms/jsgbqlip/.well-known/openid-configuration"
    },
    server: {
        frontend: process.env.SERVER_FRONTEND,
        logLevel: 'silent',
        morganFormat: 'dev',
        port: 8080
    }
});

nconf.defaults({

});

module.exports = nconf;