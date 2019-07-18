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
router.use('/database', passport.authenticate('jwt', {
  failureRedirect: 'error'
}),  dbRouter);

//TODO implement database check (connection, response, etc)
//router.use('/db_status', passport.authenticate('jwt', {session: false}), dbStatus);

module.exports = router;