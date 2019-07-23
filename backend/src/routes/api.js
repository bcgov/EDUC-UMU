import express from 'express'
import passport from 'passport';

const router = express.Router();
// const auth = require('./auth/auth');
import dbRouter from './db_routes/db';

// Base v1 Responder
router.get('/', (_req, res) => {
  res.status(200).json({
    endpoints: [
      '/database',
      '/validation'
    ]
  });
});
// Database
router.use('/database', passport.authenticate('jwt', {
  session: false
}), dbRouter);

//TODO implement database check (connection, response, etc)
//router.use('/db_status', passport.authenticate('jwt', {session: false}), dbStatus);

module.exports = router;