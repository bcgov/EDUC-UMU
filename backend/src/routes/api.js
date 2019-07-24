import express from 'express'
import passport from 'passport';

const router = express.Router();
// const auth = require('./auth/auth');
const dbRouter = require('./db_routes/db');

function isAuthenticated(req, res, next) {
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/auth/login');
};

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
router.use('/database', dbRouter);

//TODO implement database check (connection, response, etc)
//router.use('/db_status', passport.authenticate('jwt', {session: false}), dbStatus);

module.exports = router;