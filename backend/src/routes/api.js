const router = require('express').Router();
import isAuthenticated from '../components/auth2.js';

// const auth = require('./auth/auth');
const dbRouter = require('./db_routes/db').default;

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
router.use('/database', isAuthenticated,  dbRouter);

//TODO implement database check (connection, response, etc)
//router.use('/db_status', passport.authenticate('jwt', {session: false}), dbStatus);

module.exports = router;