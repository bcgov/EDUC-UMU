import { Router } from 'express'
import isAuthenticated from '../../components/auth2.js';

const router = new Router();
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
router.use('/database', dbRouter);

//TODO implement database check (connection, response, etc)
//router.use('/db_status', passport.authenticate('jwt', {session: false}), dbStatus);

module.exports = router;