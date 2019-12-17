/* eslint-disable */
'use strict'

const oracledb = require('oracledb');
const dotenv = require('dotenv');
dotenv.config();

class AuthUser {
  constructor() {}
  
  async create(opt) {
    let connection = await oracledb.getConnection({
      user: process.env.ORACLE_USER,
      password : process.env.ORACLE_PASSWORD,
      connectString : process.env.ORACLE_CONNECT
    });
      //const binds = [process.env.AUTH_TABLE, JSON.stringify(opt.system), JSON.stringify(opt.username), JSON.stringify(opt.name), JSON.stringify(opt.value), JSON.stringify(opt.authSource), JSON.stringify(opt.guid)];
      //return false here since there is no error
      try{
        console.log('Creating user...');
        console.log(opt);
        const dateJs = new Date();
        const dt = dateJs.toISOString().split('T')[0]
        console.log(dt);
        const query = 'INSERT INTO ' + process.env.AUTH_TABLE + ' (SYSTEM, USERNAME, NAME, VALUE, AUTHDIRNAME, USERGUID, CREATE_BY, CREATE_DATE) VALUES (\'' + opt.system + '\',\'' + opt.username + '\',\'' + opt.name + '\',\'' + opt.value + '\',\'' + opt.authSource + '\',\'' + opt.guid + '\',\'' + opt.userAdd + '\', TO_DATE(\'' + dt + '\', \'YYYY-MM-DD\'))';
        console.log(query);
        let result = await connection.execute(query);
        console.log(result);
        await connection.commit();
      } catch(e) {
        console.error(e);
      }
      if(connection){
        try{
          await connection.close();
        } catch(err){
          console.error(err);
          return {'error': true};
        }
      }
      return {'error': false};
  }
  async delete(opt) {
    let connection = await oracledb.getConnection({
      user: process.env.ORACLE_USER,
      password : process.env.ORACLE_PASSWORD,
      connectString : process.env.ORACLE_CONNECT
    });
    try{
      console.log('Deleting user...');
      console.log(opt);
      const query = 'DELETE FROM ' + process.env.AUTH_TABLE + 
      ' WHERE SYSTEM=\'' + opt.system + '\' AND USERNAME=\'' + opt.username + '\' AND NAME=\'' + opt.name + '\' AND VALUE=\'' +  opt.value + '\' AND AUTHDIRNAME=\'' + opt.authSource + '\' AND USERGUID=\'' + opt.guid + '\'';
      let result = await connection.execute(query,[], { autoCommit: true });
      console.log(result);
      if(connection){
        try{
          await connection.close();
        } catch(err){
          console.error(err);
          return {'error': true};
        }
      }
      return {'error': false };
    } catch(e){
      console.error(e);
    }
  }
  //select all users from table
  async selectAll() {
    try{
      let connection = await oracledb.getConnection({
        user: process.env.ORACLE_USER,
        password : process.env.ORACLE_PASSWORD,
        connectString : process.env.ORACLE_CONNECT
      });
      try{
        const query = 'SELECT * FROM ' + process.env.AUTH_TABLE;
        const result = await connection.execute(query, [], {outFormat: oracledb.OBJECT});
        if(connection){
          try{
            await connection.close();
            console.log('Connection closed successfully');
          } catch(err){
            console.log("Error occured during database interaction");
            console.error(err);
          }
        }
        return result.rows;
      } catch(e){
        console.error(e);
      }
    } catch(e){
      console.log("Connection failed");
      console.error(e);
    }
  }
  async update(options) {
    let connection = await oracledb.getConnection({
      user: process.env.ORACLE_USER,
      password : process.env.ORACLE_PASSWORD,
      connectString : process.env.ORACLE_CONNECT
    });
    try{
      console.log('Updating user...');
      console.log(options);
      const old = options.old;
      const newJson = options.new;
      const dateJs = new Date();
      const dt = dateJs.toISOString().split('T')[0]
      console.log(dt);
      const query = 'UPDATE ' + process.env.AUTH_TABLE + 
        ' SET SYSTEM=\'' + newJson.system + '\', USERNAME=\'' + newJson.username + '\', NAME=\'' + newJson.name + '\', VALUE=\'' +  newJson.value + '\', AUTHDIRNAME=\'' + newJson.authSource + '\', GUID=\'' + newJson.guid + '\', UPDATE_BY=\'' + newJson.userUpdate + '\', UPDATE_DATE=TO_DATE(\'' + dt + '\', \'YYYY-MM-DD\'))' +
        ' WHERE SYSTEM=\'' + old.system + '\' AND USERNAME=\'' + old.username + '\' AND NAME=\'' + old.name + '\' AND VALUE=\'' +  old.value + '\' AND AUTHDIRNAME=\'' + old.authSource + '\' AND GUID=\'' + old.guid + '\'';
     let result = await connection.execute(query,[], { autoCommit: true });
      console.log(result);
      if(connection){
        try{
          await connection.close();
        } catch(err){
          console.error(err);
          return {'error': true};
        }
      }
    return {'error': false};
    } catch(e) {
      console.error(e);
    }
  }
};

module.exports = AuthUser;
