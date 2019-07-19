import { get } from '../../config/index';
import { authenticate } from 'passport';
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
  authenticate('oauth2', {
    failureRedirect: 'error'
  }),
  (_req, res) => {
    res.redirect(get('server:frontend'));
  }
);

router.use('/error', (_req, res) => {
  res.status(401).json({
    message: 'Error: Unable to authenticate'
  });
});

router.get('/login', authenticate('oauth2'));


router.get('/logout', (req, res) => {
  req.logout();
  res.redirect(get('server:frontend'));
});


export default router;