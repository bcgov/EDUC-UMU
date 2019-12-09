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
      const query = 'INSERT INTO ' + process.env.AUTH_TABLE + '(SYSTEM, USERNAME, NAME, VALUE, AUTHDIRNAME, GUID) VALUES (' + opt.system + ',' + opt.username + ',' + opt.name + ',' + opt.value + ',' + opt.authSource + ',' + opt.guid + ')'; 
      //return false here since there is no error
      let result = await connection.execute(query);
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
  }
  async delete(opt) {
    let connection = await oracledb.getConnection({
      user: process.env.ORACLE_USER,
      password : process.env.ORACLE_PASSWORD,
      connectString : process.env.ORACLE_CONNECT
    });
    const query = 'DELETE FROM ' + process.env.AUTH_TABLE + 
    ' WHERE SYSTEM=' + opt.system + 'AND USERNAME=' + opt.username + 'AND NAME=' + opt.name + 'AND VALUE=' +  opt.value + 'AND AUTHDIRNAME=' + opt.authSource + 'AND USERGUID=' + opt.guid;
    let result = await connection.execute(query);
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
  }
  //select all users from table
  async selectAll() {
    try{
      console.log("Testing connection...");
      let connection = await oracledb.getConnection({
        user: process.env.ORACLE_USER,
        password : process.env.ORACLE_PASSWORD,
        connectString : process.env.ORACLE_CONNECT
      });
      const query = 'SELECT * FROM ' + process.env.AUTH_TABLE;
      let result = await connection.execute(query);
  
      if(connection){
        try{
          await connection.close();
        } catch(err){
          console.log("Error occured during database interaction");
          console.error(err);
        }
      }
      const rows =  result.rows;
      console.log(rows);
/*
      { name: 'SYSTEM' },
     { name: 'USERNAME' },
     { name: 'NAME' },
     { name: 'VALUE' },
     { name: 'AUTHDIRNAME' },
     { name: 'USERGUID' },
     { name: 'CREATE_BY' },
     { name: 'CREATE_DATE' },
     { name: 'UPDATE_BY' },
     { name: 'UPDATE_DATE' }

     */
      var returnJson;
      rows.forEach(function(element, index){
        returnJson[index].system =  element[0],
        returnJson[index].username = element[1],
        returnJson[index].name = element[2],
        returnJson[index].value = element[3],
        returnJson[index].authSource = element[4],
        returnJson[index].guid = element[5],
        returnJson[index].create = element[6];
        returnJson[index].createDate = element[7],
        returnJson[index].update = element[8],
        returnJson[index].updateDate = element[9]
      });
      console.log(returnJson);
      return returnJson;
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
      const old = options.old;
      const newJson = options.new;
      const query = 'UPDATE ' + process.env.AUTH_TABLE + 
        ' SET SYSTEM=' + newJson.system + ', USERNAME=' + newJson.username + ', NAME=' + newJson.name + ', VALUE=' +  newJson.value + ', AUTHDIRNAME=' + newJson.authSource + ', GUID=' + newJson.guid + 
        ' WHERE SYSTEM=' + old.system + 'AND USERNAME=' + old.username + 'AND NAME=' + old.name + 'AND VALUE=' +  old.value + 'AND AUTHDIRNAME=' + old.authSource + 'AND GUID=' + old.guid;
     let result = await connection.execute(query);
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
  }
};

module.exports = AuthUser;
