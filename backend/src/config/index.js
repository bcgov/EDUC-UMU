import nconf from 'nconf';
import dotenv from 'dotenv';
dotenv.config();

dotenv.config();

nconf.overrides({
    oidc: {
        clientID: process.env.SSO_CLIENT_ID,
        clientSecret: process.env.SSO_USER_SECRET,
        publicKey: process.env.SSO_PUBLIC_KEY,
        discovery: "https://sso-dev.pathfinder.gov.bc.ca/auth/realms/jsgbqlip/.well-known/openid-configuration",
        certUrl: "https://sso-dev.pathfinder.gov.bc.ca/auth/realms/jsgbqlip/protocol/openid-connect/certs",
        authUrl: "https://sso-dev.pathfinder.gov.bc.ca/auth/realms/jsgbqlip/protocol/openid-connect/auth",
        tokenUrl: "https://sso-dev.pathfinder.gov.bc.ca/auth/realms/jsgbqlip/protocol/openid-connect/token"
    },
    server: {
        frontend: 'https://obiee-umu-pbuo5q-tools.pathfinder.gov.bc.ca',
        logLevel: "silent",
        morganFormat: "dev",
        port: 8080
    }
});


nconf.defaults({

});

module.exports = nconf