/*eslint-disable*/
'use strict';
const passport = require('passport');
const express = require('express');
//const keycloak = require('../components/keycloak');
const router = express.Router();
//const auth = require('./auth/auth');
const dbRouter = require('./db_routes/db');
const envRouter = require('./envRouter');

function removeFrameguard(_req, res, next) {
  res.removeHeader('X-Frame-Options')
  next()
}

function checkRoles(req, res, next){
  if(req.user.jwt.realm_access.roles.includes('umu-access')){
    return next();
  }
  return res.status(401).json({
    message: 'Unauthorized user'
  })
};
//provides routing to the database endpoints
router.get('/', (_req, res) => {
  res.status(200).json({
    endpoints: [
      '/database',
      '/validation',
      '/environment'
    ]
  });
});

//ensures only authenticated users can access the database endpoints
router.use('/database', passport.authenticate('jwt', {
  session: false
}), checkRoles, removeFrameguard, dbRouter);

router.use('/environment', envRouter);

module.exports = router;
