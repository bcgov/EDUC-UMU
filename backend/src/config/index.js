/* eslint-disable */
'use strict';

import nconf from 'nconf';
import dotenv from 'dotenv';
dotenv.config();

const env = process.env.NODE_ENV;

//injects environment variables into the json file
nconf.overrides({
    environment: env,
    oidc: {
        clientID: process.env.SSO_CLIENT_ID,
        clientSecret: process.env.SSO_USER_SECRET,
        publicKey: process.env.SSO_PUBLIC_KEY,
        discovery: "https://sso-dev.pathfinder.gov.bc.ca/auth/realms/jsgbqlip/.well-known/openid-configuration",
        certUrl: "https://sso-dev.pathfinder.gov.bc.ca/auth/realms/jsgbqlip/protocol/openid-connect/certs"
    },
    server: {
        frontend: process.env.SERVER_FRONTEND,
        logLevel: "silent",
        morganFormat: "dev",
        port: 8080
    }
});


nconf.defaults({

});

module.exports = nconf;