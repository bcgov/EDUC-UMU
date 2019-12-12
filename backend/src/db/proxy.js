/* eslint-disable */
'use strict'

const oracledb = require('oracledb');
const dotenv = require('dotenv');
dotenv.config();

class Proxy {
  constructor() {}
  async create(opt) {
    let connection = await oracledb.getConnection({
      user: process.env.ORACLE_USER,
      password : process.env.ORACLE_PASSWORD,
      connectString : process.env.ORACLE_CONNECT
    });
    
      const bind = [process.env.PROXY_TABLE, JSON.stringify(opt.proxy), JSON.stringify(opt.target), JSON.stringify(opt.level)];
      let result = await connection.execute(
        `INSERT INTO :table (PROXYID, TARGETID, PROXYLEVEL) VALUES (:proxy, :target, :level);`,
         bind);
      console.log(result);
      await connection.commit();
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
      const query = 'DELETE FROM ' + process.env.PROXY_TABLE + ' WHERE PROXYID=' + opt.proxy + ' AND ' + opt.target + ' AND ' + opt.level; 
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
  }
  //select all proxies from table
  async selectAll() {
    let connection = await oracledb.getConnection({
      user: process.env.ORACLE_USER,
      password : process.env.ORACLE_PASSWORD,
      connectString : process.env.ORACLE_CONNECT
    });
  
    const query = 'SELECT * FROM ' + process.env.PROXY_TABLE;
   
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
  }
  async update(opt) {
    let connection = await oracledb.getConnection({
      user: process.env.ORACLE_USER,
      password : process.env.ORACLE_PASSWORD,
      connectString : process.env.ORACLE_CONNECT
    });
      const newJson = opt.new;
      const old = opt.old;
      const query = 'UPDATE ' + process.env.PROXY_TABLE + ' SET PROXYID=' + newJson.proxy + ', TARGETID=' + newJson.target + ', PROXYLEVEL=' + newJson.level + ' WHERE PROXYID=' + old.proxy + ', TARGETID=' + old.target + ',PROXYLEVEL=' + old.level;
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
  }
};

module.exports = Proxy;
