import { Router } from 'express';
import Database from '../../../db/Database';
import { isAuthenticated } from '../../../components/auth2';
import { asyncMiddleware } from '@bcgov/common-nodejs-utils';

const dbRouter = new Router();
var database = new Database();

dbRouter.get('/database', (_req, res) => {
    res.status(200).json({
      endpoints: [
        '/users',
        '/proxy',
        '/roles'
      ]
    });
});

dbRouter.get('/users', asyncMiddleware(async(_req, res) => {
    let response = await database.selectUsers();
    res.status(200).json(response);
}));
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

dbRouter.get('/proxy', asyncMiddleware(async(_req, res) => {
    let response = await database.selectProxies();
    res.status(200).json(response);
}));
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


dbRouter.get('/roles', asyncMiddleware(async(_req, res) => {
    let response = await database.selectRole();
    res.status(200).json(response);
}));
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
export default dbRouter;