const router = require('express').Router();
const passport = require('passport');

// const auth = require('./auth/auth');
const dbRouter = require('./db_routes/db');

// Base v1 Responder
router.get('/', (_req, res) => {
  res.status(200).json({
    endpoints: [
      '/database'
    ]
  });
});
// Database
router.use('/database', passport.authenticate('oidc', {failureRedirect: '../error'}), dbRouter);

module.exports = router;