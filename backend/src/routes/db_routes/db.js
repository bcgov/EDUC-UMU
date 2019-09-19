/* eslint-disable */
'use strict';

const express = require('express');
const Database = require('../../db/Database');

const dbRouter = express.Router();
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

dbRouter.get('/users', async(_req, res) => {
  let response = await database.selectUsers();
  if(Array.isArray(response)){
    res.status(200).json(response);
  } else {
    res.status(500).json({ message: "Unable to retrieve users from database"});
  }
});

dbRouter.put('/users', async(_req, res) => {
    let data = _req.body;
    const response = await database.updateUser(data);
    if(response){
        res.status(200).send(data);
    } else {
        res.status(500).json({ message: "Unable to update user"});
    }
});
dbRouter.post('/users', async(_req, res) => {
    let data = _req.body;
    const response = await database.createUser(data);
    if(response){
        res.status(200).send(data);
    } else {
        res.status(500).json({ message: "Unable to add user to database"});
    }
});
dbRouter.delete('/users', async(_req, res) => {
    let data = _req.body;
    const response = await database.deleteUser(data);
    if(response){
        res.status(200).send(data);
    } else {
        res.status(500).json({ message: "Unable to remove "})
    }
});


dbRouter.get('/proxy', async(_req, res) => {
  let response = await database.selectProxies();
  if(Array.isArray(response)){
    res.status(200).json(response);
  } else {
    res.status(500).json({ message: "Unable to retrieve proxies from database."});
  }
});

dbRouter.put('/proxy', async(_req, res) => {
    let data = _req.body;
    const response = await database.updateProxy(data);
    if(response){
        res.status(200).send(data);
    } else {
        res.status(500).json({ message: "Unable to update user proxy."});
    }
});
dbRouter.post('/proxy', async(_req, res) => {
    let data = _req.body;
    const response = await database.createProxy(data);
    if(response){
        res.status(200).send(data);
    } else {
        res.status(500).json({ message: "Unable to add user proxy to database."});
    }
});
dbRouter.delete('/proxy', async(_req, res) => {
    let data = _req.body;
    const response = await database.deleteProxy(data);
    if(response){
        res.status(200).send(data);
    } else {
        res.status(500).json({ message: "Unable to delete user."});
    }
});



dbRouter.get('/roles', async(_req, res) => {
  let response = await database.selectRole();
  if(Array.isArray(response)){
    res.status(200).json(response);
  } else {
    res.status(500).json({ message: "Unable to retrieve roles from database."});
  }
});

dbRouter.put('/roles', async(_req, res) => {
    let data = _req.body;
    const response = await database.updateRole(data);
    if(response){
        res.status(200).json(data);
    } else {
        res.status(500).json({ message: "Unable to update role."});
    }
});
dbRouter.post('/roles', async(_req, res) => {
    let data = _req.body;
    const response = await database.createRole(data);
    if(response){
        res.status(200).json(response);
    } else {
        res.status(500).json({ message: "Unable to add role to database."});
    }
});
dbRouter.delete('/roles', async(_req, res) => {
    let data = _req.body;
    const response = await database.deleteRole(data);
    if(response){
        res.status(200).json(response);
    } else {
        res.status(500).json({ message: "Unable to delete role."});
    }
});

module.exports = dbRouter;
