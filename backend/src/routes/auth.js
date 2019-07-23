import config from '../config/index';
import passport from 'passport';
import express from 'express';
import auth from '../components/auth';
const {
  body,
  validationResult
} = require('express-validator');

const router = express.Router();

router.get('/', (_req, res) => {
  res.status(200).json({
    endpoints: [
      '/callback',
      '/login',
      '/logout',
      '/refresh',
      '/token'
    ]
  });
});

router.get('/callback',
  passport.authenticate('oidc', {
    failureRedirect: 'error'
  }),
  (_req, res) => {
    res.redirect(config.get('server:frontend'));
  }
);

router.get('/error', (_req, res) => {
  res.status(401).json({
    message: 'Error: Unable to authenticate'
  });
});

router.get('/login', passport.authenticate('oidc', {
  failureRedirect: '../error'
}));


router.get('/logout', (req, res) => {
  req.logout();
  res.redirect(config.get('server:frontend'));
});

router.post('/refresh', [
  body('refreshToken').exists()
], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  const refresh = await auth.renew(req.body.refreshToken);
  return res.status(200).json(refresh);
});

router.use('/token', auth.removeExpired, (req, res) => {
  if (req.user && req.user.jwt && req.user.refreshToken) {
    res.status(200).json(req.user);
  } else {
    res.status(401).json({
      message: 'Not logged in'
    });
  }
});


module.exports = router;