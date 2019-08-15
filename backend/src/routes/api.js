/*eslint-disable*/
'use strict';
const express = require('express');

const router = express.Router();
// const auth = require('./auth/auth');
const dbRouter = require('./db_routes/db');

//uses the builtin OIDC function to determine whether user is authenticated
function isAuthenticated(req, res, next) {
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/api/auth/login');
}

//provides routing to the database endpoints
router.get('/', (_req, res) => {
  res.status(200).json({
    endpoints: [
      '/database',
      '/validation'
    ]
  });
});

//ensures only authenticated users can access the database endpoints
router.use('/database', isAuthenticated, dbRouter);

module.exports = router;
