const router = require('express').Router();
const path = require('path');
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
router.use('/database', passport.authenticate('jwt', {
  session: false
}), dbRouter);

module.exports = router;