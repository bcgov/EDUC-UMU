/* eslint-disable */
'use strict'

const oracledb = require('oracledb');
const dotenv = require('dotenv');
dotenv.config();

class Roles {
  constructor() {}

  async create(options) {
      /*db.execute(`insert into :1(SYSTEM, APPLICATION_ROLE, CREATE_BY) values(:2, :3, :4)`, [process.env.ROLES_TABLE, options.system, options.role, options.createdBy], () => {
          db.execute(`select last_value from :1;`, [process.env.ROLES_TABLE]);
      });*/
      if(options != null){
        return {'error': false};
     }
     return {'error': true};
  }
  async delete(id) {
      //db.execute(`delete from :1 where id=:2`, [process.env.ROLES_TABLE, id]);
      if(id != null){
        return {'error': false};
     }
     return {'error': true};
  }

  //select all roles from table
  async selectAll() {
    /*let connection = await oracledb.getConnection({
      user: process.env.ORACLE_USER,
      password : process.env.ORACLE_PASSWORD,
      connectString : process.env.ORACLE_CONNECT
    });
    const query = 'SELECT * FROM ' + process.env.ROLES_TABLE;
    let result = await connection.execute(query);
    if(connection){
      try{
        await connection.close();
      } catch(err){
        console.error(err);
      }
    }*/
    return [{'system': 'test', 'role': 'test', 'create': 'test', 'createDate': 'test', 'update': 'test', 'updateDate': 'test'}];
  }
  /*
  select(id, callback) {
      db.execute(`select * from :1 where id=:2`, [process.env.ROLES_TABLE, id], callback);
  }*/
  async update(options) {
      /*db.execute(`update :1 set SYSTEM=:2, APPLICATION_ROLE=:3, UPDATED_BY=:4`, [process.env.ROLES_TABLE, options.system, options.role, options.updatedBy], () => {
          db.execute(`select last_value from :1`, [process.env.ROLES_TABLE], callback);
      });*/
      if(options != null){
        return {'error': false};
     }
     return {'error': true};
  }

};

module.exports = Roles;
