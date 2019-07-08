const router = require('express').Router();
const path = require('path');
const passport = require('passport');

// const auth = require('./auth/auth');
const checksRouter = require('./v1/checks');
const dbRouter = require('./v1/db')

// Base v1 Responder
router.get('/', (_req, res) => {
  res.status(200).json({
    endpoints: [
      '/checks',
      '/db_router'
    ]
  });
});

// OpenAPI Docs
router.get('/docs', (_req, res) => {
  const docs = require('../docs/docs');
  res.send(docs.getDocHTML('v1'));
});

// OpenAPI YAML Spec
router.get('/api-spec.yaml', (_req, res) => {
  res.sendFile(path.join(__dirname, '../docs/v1.api-spec.yaml'));
});

// Checks
router.use('/checks', passport.authenticate('jwt', {
  session: false
}), checksRouter);

router.use('/db_router', passport.authenticate('jwt', {
    session: false
}), dbRouter);

module.exports = router;