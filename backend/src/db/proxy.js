/* eslint-disable */
'use strict'

const oracledb = require('oracledb');
const dotenv = require('dotenv');
dotenv.config();

class Proxy {
  constructor() {}
  async create(opt) {
    /*
      const query = 'INSERT INTO ' + process.env.PROXY_TABLE + ' (PROXYID, TARGETID, PROXYLEVEL) 
      VALUES (' + opt.proxy + ',' + opt.target + ',' + opt.level + ')';*/
      if(opt != null){
        return {'error': false};
     }
     return {'error': true};
  }
  async delete(opt) {
      /*
      const query = 'DELETE FROM ' + process.env.PROXY_TABLE + ' WHERE PROXYID=' + opt.proxy + ' AND ' + opt.target + ' AND ' + opt.level; 
      */
      if(opt != null){
        return {'error': false};
     }
     return {'error': true};
  }
  //select all proxies from table
  async selectAll() {
    /*
    const query = 'SELECT * FROM ' + process.env.PROXY_TABLE;
    const res = send to ords
    res.forEach(element => {

    })
    }*/
    return [
            {'proxy': '239786FWEUHDFGSDKFASDF', 'target': '54789THERIFU23G54WYRT', 'level': 'full', 'proxyName': '', 'targetName': ''},
            {'proxy': '54789THERIFU23G54WYRT', 'target': 'FVBNJTY89WEFUHEFIBRQ', 'level': 'not full', 'proxyName': '', 'targetName': ''}
          ];
  }
  async update(opt) {
      /*
      const new = opt.new;
      const old = opt.old;
      const query = 'UPDATE ' + process.env.PROXY_TABLE + ' SET PROXYID=' + new.proxy + ',' TARGETID=' + new.target + 'PROXYLEVEL=' + new.level + ' WHERE PROXYID=' + old.proxy + ', TARGETID=' + old.target + ',PROXYLEVEL=' + old.level;
      */
      if(opt != null){
        return {'error': false};
     }
     return {'error': true};
  }
};

module.exports = Proxy;
