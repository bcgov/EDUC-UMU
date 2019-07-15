const dbRouter = require('express').Router();
const Database = require('../../db/Database');

var database = new Database();

dbRouter.get('/users', async(_req, res) => {
    const response = await database.selectUsers();
    if(response instanceof Array){
        res.status(200).json({ users : response });
    } else{
        res.status(500).json({ message : "Unable to retrieve users from database"});
    }
});
dbRouter.put('/users', async(_req, res) => {
    let data = _req.body.data;
    const response = await database.updateUser(data);
});
dbRouter.post('/users', async(_req, res) => {
    let data = _req.body.data;
    const response = await database.createUser(data);
});


dbRouter.get('/proxy', async(_req, res) => {
    const response = await database.selectProxies();
    if(response instanceof Array){
        res.status(200).json({ proxies : response });
    } else{
        res.status(500).json({ message : "Unable to retrieve proxies from database"});
    }
});
dbRouter.put('/proxy', async(_req, res) => {
    let data = _req.body.data;
    const response = await database.updateProxy(data);
});
dbRouter.post('/proxy', async(_req, res) => {
    let data = _req.body.data;
    const response = await database.createProxy(data);
});


dbRouter.get('/roles', async(_req, res) => {
    const response = await database.selectRole();
    if(response instanceof Array){
        res.status(200).json({ roles : response });
    } else {
        res.status(500).json({ message : "Unable to retrieve roles from database"});
    }
});
dbRouter.put('/roles', async(_req, res) => {
    let data = _req.body.data;
    const response = await database.updateRole(data);
});
dbRouter.post('/roles', async(_req, res) => {
    let data = _req.body.data;
    const response = await database.createRole(data);
});

module.exports = dbRouter;