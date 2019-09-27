'use strict';
const express = require('express');
const router = express.Router();
const jsonSend = ['IDIR', process.env.AUTH_SOURCES];

router.get('/auth_source', (_req, res) => {
  res.status(200).json(jsonSend);
});

module.exports = router;
