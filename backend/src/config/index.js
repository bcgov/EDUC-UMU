/* eslint-disable */
'use strict';
const nconf = require('nconf');
const dotenv = require('dotenv');
dotenv.config();

const env = 'default';

//injects environment variables into the json file
nconf.overrides({
    environment: env,
    logoutEndpoint: 'https://sso.pathfinder.gov.bc.ca/auth/realms/jsgbqlip/protocol/openid-connect/logout',
    oidc: {
        clientID: process.env.SSO_CLIENT_ID,
        clientSecret: process.env.SSO_USER_SECRET,
        publicKey: "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwf39ND7EhUhIo1JSDrvpa2NLazsm2tn5E7w\ndqCRzpQOR2nx29IlNlqEwIC5iNk8alWXaXgLoMLAJ9FPORJPVcp+N5cvTponYOuabU/cqhUlZdUTj8A49i\nUlzr2twJsiWHjnRNSOSP94ewtZreuyU5QogQzMAFy0ywdQs3W7vj5gP88XfokC2OnRh80\n/eRLQn2G9j5XllrRrlzp1\n/X769b3KVRph3KYYE+ksNvwca7pSTySVfu4ozAqtJqSx6yvFktDRrIZOkhs0qLEijLXDIoG+\n/ZlmDT5k+1EcnNSyQ7R7T+P9kMMt01pgehdybjIiRqLD4oCTtAPf29pC6aGWZmQIDAQAB\n-----END PUBLIC KEY-----",
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