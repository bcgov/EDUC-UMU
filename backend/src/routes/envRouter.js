'use strict'
const express = require('express');
const router = express.Router();

router.get('/auth_source', (_req, res) => {
    res.status(200).json({data: process.env.AUTH_SOURCES});
});

module.exports = router;