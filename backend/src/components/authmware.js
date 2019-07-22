'use strict';

import express from 'express';
import session from 'express-session';
import passport from 'passport';
import OAuth2Strategy from 'passport-oauth2';
import config from '../config/index';

const authmware = (app) => {
    const ops = {
        secret: config.get('oidc:clientSecret'),
        cookie: {
            httpOnly: false
        },
        resave: false,
        saveUninitialized: false
    };

    app.use(session(ops));
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
        done(null,{});
    });

    passport.deserializeUser((id, done) => {
        done(null, {});
    });

    const oAuth2Strategy = new OAuth2Strategy(
        {
            authorizationURL: config.get('oidc:authUrl'),
            tokenURL: config.get('oidc:tokenUrl'),
            clientID: config.get('oidc:clientID'),
            clientSecret: config.get('oidc:clientSecret'),
            callbackURL: config.get('server:frontend') + '/api/auth/callback'
        },
        (accessToken, refreshToken, profile, done) => done(null, {})
    );

    oAuth2Strategy.authorizeParams = () => {
        return { kc_idp_hint: 'idir'};
    };

    passport.use(oAuth2Strategy);
};

module.exports = () => {
    const app = express();
    authmware(app);
    return app;
};