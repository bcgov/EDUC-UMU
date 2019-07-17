const dbRouter = require('express').Router();
const Database = require('../../db/Database');

var database = new Database();

dbRouter.get('/database', keycloak.protect(), (_req, res) => {
    res.status(200).json({
      endpoints: [
        '/users',
        '/proxy',
        '/roles'
      ]
    });
  });

dbRouter.get('/database/users', keycloak.protect(), async(_req, res) => {
    const response = await database.selectUsers();
    res.status(200).json({ users : response });
});
/*
dbRouter.put('/users', async(_req, res) => {
    let data = _req.body.data;
    const response = await database.updateUser(data);
    if(response instanceof Array){
        res.status(200).json({ message: "User successfully updated!"});
    } else {
        res.status(500).json({ message: "Unable to update user"});
    }
});
dbRouter.post('/users', async(_req, res) => {
    let data = _req.body.data;
    const response = await database.createUser(data);
    if(response instanceof Array){
        res.status(200).json({ message: "User successfully added to database!"});
    } else {
        res.status(500).json({ message: "Unable to add user to database"});
    }
});
*/

dbRouter.get('/database/proxy', keycloak.protect(), async(_req, res) => {
    const response = await database.selectProxies();
    if(response instanceof Array){
        res.status(200).json({ proxies : response });
    } else{
        res.status(500).json({ message : "Unable to retrieve proxies from database"});
    }
});
/*
dbRouter.put('/proxy', async(_req, res) => {
    let data = _req.body.data;
    const response = await database.updateProxy(data);
    if(response instanceof Array){
        res.status(200).json({ message: "User proxy successfully updated!"});
    } else {
        res.status(500).json({ message: "Unable to update user proxy."});
    }
});
dbRouter.post('/proxy', async(_req, res) => {
    let data = _req.body.data;
    const response = await database.createProxy(data);
    if(response instanceof Array){
        res.status(200).json({ message: "User proxy successfully added to database!"});
    } else {
        res.status(500).json({ message: "Unable to add user proxy to database."});
    }
});
*/


dbRouter.get('/database/roles', keycloak.protect(), async(_req, res) => {
    const response = await database.selectRole();
    if(response instanceof Array){
        res.status(200).json({ roles : response });
    } else {
        res.status(500).json({ message : "Unable to retrieve roles from database"});
    }
});
/*
dbRouter.put('/roles', async(_req, res) => {
    let data = _req.body.data;
    const response = await database.updateRole(data);
    if(response instanceof Array){
        res.status(200).json({ message: "Successfully updated role!"});
    } else {
        res.status(500).json({ message: "Unable to update role."});
    }
});
dbRouter.post('/roles', async(_req, res) => {
    let data = _req.body.data;
    const response = await database.createRole(data);
    if(response instanceof Array){
        res.status(200).json({ message: "Successfully added role to database!"});
    } else {
        res.status(500).json({ message: "Unable to add role to database."});
    }
});
*/
module.exports = dbRouter;