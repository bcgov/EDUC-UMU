/* eslint-disable */
'use strict';
const path = require('path');
const nconf = require('nconf');
const dotenv = require('dotenv');
dotenv.config();

const env = process.env.NODE_ENV || 'default';

//injects environment variables into the json file
nconf.overrides({
    environment: env,
    oidc: {
        clientID: process.env.SSO_CLIENT_ID,
        clientSecret: process.env.SSO_USER_SECRET,
        publicKey: process.env.SSO_PUBLIC_KEY,
        discovery: "https://sso-dev.pathfinder.gov.bc.ca/auth/realms/jsgbqlip/.well-known/openid-configuration",
        certUrl: "https://sso-dev.pathfinder.gov.bc.ca/auth/realms/jsgbqlip/protocol/openid-connect/certs"
    }
});

nconf.argv().env().file({ file: path.join(__dirname, `${env}.json`)});

nconf.defaults({

});

module.exports = nconf;