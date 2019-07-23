'use strict';

import { logger, getJwtCertificate } from '@bcgov/common-nodejs-utils';
import express from 'express';
import passport from 'passport';
//import OAuth2Strategy from 'passport-oauth2';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import config from '../config/index';

const authmware = async (app) => {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
        logger.info('serialize');
        done(null, {});
      });
    
      // We don't load any addtional user information.
      passport.deserializeUser((id, done) => {
        logger.info('deserial');
        done(null, {});
      });

      const { certificate, algorithm } = await getJwtCertificate(config.get('oidc:certUrl'));
      const opts = {};
      opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
      opts.algorithms = [algorithm];
      opts.secretOrKey = certificate;
      opts.passReqToCallback = true;
      opts.audience = config.get('oidc:clientID');
    
      // For development purposes only ignore the expiration
      // time of tokens.
    
      const jwtStrategy = new JwtStrategy(opts, async (req, jwtPayload, done) => {
            if((typeof(jwtPayload) == 'undefined') || (jwtPayload == null)) {
                return done('No JWT token', null);
            }

            return done(null, {
                email: jwtPayload.email,
                familyName: jwtPayload.family_name,
                givenName: jwtPayload.given_name,
                jwt: jwtPayload,
                name: jwtPayload.name,
                preferredUsername: jwtPayload.preferred_username,
            });
      });
      passport.use(jwtStrategy);
};

module.exports = () => {
    const app = express();

    authmware(app);
    return app;
};