import nconf from 'nconf';
import dotenv from 'dotenv';

dotenv.config();

nconf.overrides({
    oidc: {
        clientID: process.env.SSO_CLIENT_ID,
        clientSecret: process.env.SSO_CLIENT_SECRET,
        publicKey: process.env.SSO_PUBLIC_KEY
    },
    server: {
        frontend: process.env.SERVER_FRONTEND
    }
});

export default nconf;