import { asyncMiddleware } from '@bcgov/common-nodejs-utils';
import config from '../config/index';
import passport from 'passport';
const router = require('express').Router();

router.get('/', (_req, res) => {
  res.status(200).json({
    endpoints: [
      '/callback',
      '/login',
      '/logout'
    ]
  });
});

router.use('/callback',
  passport.authenticate('oauth2', {
    failureRedirect: 'error'
  }),
  asyncMiddleware(async (req, res) => {
    res.redirect(config.get('server:frontend'));
  })
);

router.use('/error', (_req, res) => {
  res.status(401).json({
    message: 'Error: Unable to authenticate'
  });
});

router.get('/login', passport.authenticate('oauth2'));


router.get('/logout', (req, res) => {
  req.logout();
  res.redirect(config.get('server:frontend'));
});


export default router;