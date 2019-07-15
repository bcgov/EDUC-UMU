const dbRouter = require('express').Router();
const Database = require('../../db/Database');

var database = new Database();

dbRouter.get('/users', async(_req, res) => {
    database.selectUsers();
});
dbRouter.put('/users', async(_req, res) => {
    let data = _req.body.data;
    database.updateUser(data);
});
dbRouter.post('/users', async(_req, res) => {
    let data = _req.body.data;
    database.createUser(data);
});


dbRouter.get('/proxy', async(_req, res) => {
    database.selectProxies();
});
dbRouter.put('/proxy', async(_req, res) => {
    let data = _req.body.data;
    database.updateProxy(data);
});
dbRouter.post('/proxy', async(_req, res) => {
    let data = _req.body.data;
    database.createProxy(data);
});


dbRouter.get('/roles', async(_req, res) => {
    database.selectRole();
});
dbRouter.put('/roles', async(_req, res) => {
    let data = _req.body.data;
    database.updateRole(data);
});
dbRouter.post('/roles', async(_req, res) => {
    let data = _req.body.data;
    database.createRole(data);
});

module.exports = dbRouter;