/* eslint-disable */
'use strict'

const oracledb = require('oracledb');
const dotenv = require('dotenv');
dotenv.config();

class Roles {
  constructor() {}

  async create(opt) {
      /*
      const query = 'INSERT INTO ' + process.env.ROLES_TABLE + ' (SYSTEM, APPLICATION_ROLE) VALUES (' + opt.system + ',' + opt.role + ')';
      */
      if(opt != null){
        return {'error': false};
     }
     return {'error': true};
  }
  async delete(opt) {
      /*
      const query = 'DELETE FROM ' + process.env.ROLES_TABLE + ' WHERE SYSTEM=' + opt.system + 'AND APPLICATION_ROLE=' + opt.role; 
      */
      if(opt != null){
        return {'error': false};
     }
     return {'error': true};
  }

  //select all roles from table
  async selectAll() {
    /*
    const query = 'SELECT * FROM ' + process.env.ROLES_TABLE;
    const res = get from ords
    res.forEach(element => {

    });
    return res;
    }*/
    return [{'system': 'test', 'role': 'test', 'create': 'test', 'createDate': 'test', 'update': 'test', 'updateDate': 'test'}];
  }
  /*
  select(id, callback) {
      db.execute(`select * from :1 where id=:2`, [process.env.ROLES_TABLE, id], callback);
  }*/
  async update(opt) {
      /*
      const new = opt.new;
      const old = opt.old;
      const query = 'UPDATE ' + process.env.ROLES_TABLE + ' SET SYSTEM=' + new.system + ', APPLICATION_ROLE=' + new.role + ' WHERE SYSTEM=' + old.system + ' AND APPLICATION_ROLE=' + old.role;
      */
      if(opt != null){
        return {'error': false};
     }
     return {'error': true};
  }

};

module.exports = Roles;
