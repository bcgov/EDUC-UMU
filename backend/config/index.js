const nconf = require('nconf');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

nconf.overrides({
    oidc: {
        clientID: process.env.SSO_CLIENT_ID,
        clientSecret: process.env.SSO_USER_SECRET,
        publicKey: process.env.SSO_PUBLIC_KEY,
        discovery: "https://sso-pbuo5q-tools.pathfinder.gov.bc.ca/auth/realms/obiee-umu/.well-known/openid-configuration"
    },
    server: {
        frontend: 'https://obiee-umu-pbuo5q-tools.pathfinder.gov.bc.ca',
        logLevel: "debug",
        morganFormat: "dev",
        port: 8080
    }
});


nconf.defaults({

});

module.exports = nconf