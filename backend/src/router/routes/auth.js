import { asyncMiddleware, logger, errorWithCode } from '@bcgov/nodejs-common-utils';
import { get } from '../config/index';
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
    res.status(200).end()
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
  res.redirect(get('server:frontend'));
});


export default router;