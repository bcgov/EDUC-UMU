'use strict';
const express = require('express');
const router = express.Router();

router.get('/', (_req, res) =>{
    res.status(200).json({
        endpoints :[
            '/csvTemplate'
        ]
    });
});

router.get('/csvTemplate', (_req, res) => {
    res.setHeader('Content-disposition', 'attachment; filename=csvTemplate.csv');
    res.set('Content-Type', 'text/csv');
    res.download('./csvTemplate.csv');

});

module.exports = router;