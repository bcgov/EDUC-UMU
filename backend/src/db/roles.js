/* eslint-disable */
'use strict'

const oracledb = require('oracledb');
const dotenv = require('dotenv');
dotenv.config();

class Roles {
  constructor() {}

  async create(opt) {
    let connection = await oracledb.getConnection({
      user: process.env.ORACLE_USER,
      password : process.env.ORACLE_PASSWORD,
      connectString : process.env.ORACLE_CONNECT
    });
    console.log('Inserting role...');
    console.log(opt);
    const bind = [process.env.ROLES_TABLE, JSON.stringify(opt.system), JSON.stringify(opt.role)];
    try{
      const dt = new Date();
      const query = 'INSERT INTO ' + process.env.ROLES_TABLE + ' (SYSTEM, APPLICATION_ROLE, CREATE_BY, CREATE_DATE) VALUES (\'' + opt.system + '\',\'' + opt.role + '\',\'' + opt.userAdd + '\',\'' + dt +'\')';
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
    const query = 'DELETE FROM ' + process.env.ROLES_TABLE + ' WHERE SYSTEM=\'' + opt.system + '\' AND APPLICATION_ROLE=\'' + opt.role + '\''; 
    let result = await connection.execute(query, [],{ autoCommit: true });
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
    } catch(e){
      console.error(e);
    }
  }

  //select all roles from table
  async selectAll() {
    let connection = await oracledb.getConnection({
      user: process.env.ORACLE_USER,
      password : process.env.ORACLE_PASSWORD,
      connectString : process.env.ORACLE_CONNECT
    });
    try{
      const query = 'SELECT * FROM ' + process.env.ROLES_TABLE;
      let result = await connection.execute(query, [], {outFormat: oracledb.OBJECT});
        console.log(result);
        if(connection){
          try{
            await connection.close();
          } catch(err){
            console.error(err);
          }
        }
      return result.rows;
    } catch(e) {
      console.error(e);
    }
  }
  /*
  select(id, callback) {
      db.execute(`select * from :1 where id=:2`, [process.env.ROLES_TABLE, id], callback);
  }*/
  async update(opt) {
    let connection = await oracledb.getConnection({
      user: process.env.ORACLE_USER,
      password : process.env.ORACLE_PASSWORD,
      connectString : process.env.ORACLE_CONNECT
    });
    try{
      const newJson = opt.new;
      const old = opt.old;
      const dt = new Date();
      const query = 'UPDATE ' + process.env.ROLES_TABLE + ' SET SYSTEM=\'' + newJson.system + '\', APPLICATION_ROLE=\'' + newJson.role + '\', UPDATE_BY=\''+ newJson.updateUser + '\', UPDATE_DATE=\'' + dt + '\' WHERE SYSTEM=\'' + old.system + '\' AND APPLICATION_ROLE=\'' + old.role + '\'';
      let result = await connection.execute(query, [],{ autoCommit: true });
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
    } catch(e){
      console.error(e);
    }
  }
};

module.exports = Roles;
