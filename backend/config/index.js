'use strict';

import nconf from 'nconf';
import dotenv from 'dotenv';
import path from 'path';

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

nconf.argv()
    .env()
    .file({ file: path.join(__dirname, 'default.json')});


nconf.defaults({

});

export default nconf;