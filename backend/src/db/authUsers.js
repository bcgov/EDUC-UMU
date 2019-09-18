/* eslint-disable */
'use strict'

const dotenv = require('dotenv');
dotenv.config();

class AuthUser {
  constructor() {}
  
  async create(options) {
      /*
      db.execute(`insert into :1(SYSTEM, USERNAME, NAME, VALUE, AUTHDIRNAME, USERGUID, CREATED_BY) values(:2, :3, :4, :5, :6, :7, :8);`, [process.env.AUTH_TABLE, options.system, options.username, options.name, options.value, options.authdirnmae, options.guid, options.createdBy], () => {
          db.execute(`select last_value from :1;`, [process.env.AUTH_TABLE], callback);
      });*/
      if(options != null){
        return 'kjsfhsldfsa'
      }

      return 'whatever';
  }
  async delete(id) {
      /*
      db.execute(`delete from :1 where userguid=:2;`, [process.env.AUTH_TABLE, id], callback);
      */
     if(id != null){
       return 'kjsfhsldfsa'
     }
     return 'whatever';
  }
  //select all users from table
  async selectAll() {
    const users =  [{"system": "EDW","username": "NDenny","name": "lkfsdjafs", "value": "sdgjhndffsd", "authSource": "IDIR", "guid": "239786FWEUHDFGSDKFASDF", "id": 1 },
    {"system": "EDW","username": "NDenny","name": "sdfsad", "value": "sdfasdf", "authSource": "IDIR", "guid": "239786FWEUHDFGSDKFASDF", "id": 3 },
    {"system": "EDW","username": "SShaw","name": "ntw3462nwer", "value": "nqertnwern", "authSource": "IDIR", "guid": "UYJM56890FQWUIBHF", "id": 18 },
    {"system": "EDW","username": "NDenny","name": "gfdagdfe", "value": "hgj5effa", "authSource": "IDIR", "guid": "239786FWEUHDFGSDKFASDF", "id": 5 },
    {"system": "EDW","username": "PHolland","name": "54fq34yu", "value": "23589yht9", "authSource": "IDIR", "guid": "54789THERIFU23G54WYRT", "id": 6 },
    {"system": "EDW","username": "PHolland","name": "refgwe54tui90", "value": "afwer2nn54", "authSource": "IDIR", "guid": "54789THERIFU23G54WYRT", "id": 7 },
    {"system": "EDW","username": "PHolland","name": "qv3jhun34", "value": "q4tv", "authSource": "IDIR", "guid": "54789THERIFU23G54WYRT", "id": 8 },
    {"system": "EDW","username": "NDenny","name": "sdfsdfas", "value": "wefaweff", "authSource": "IDIR", "guid": "239786FWEUHDFGSDKFASDF", "id": 4 },
    {"system": "EDW","username": "PHolland","name": "nwh456", "value": "25yn4nwertwb", "authSource": "IDIR", "guid": "54789THERIFU23G54WYRT", "id": 9 },
    {"system": "EDW","username": "PHolland","name": "qwbtqtret", "value": "wetbrtbwertt34", "authSource": "IDIR", "guid": "54789THERIFU23G54WYRT", "id": 10 },
    {"system": "EDW","username": "TRankin","name": "4tbbq4t", "value": "qetbrbbt", "authSource": "IDIR", "guid": "FVBNJTY89WEFUHEFIBRQ", "id": 11 },
    {"system": "EDW","username": "NDenny","name": "dfgagfasdf", "value": "sadfsdfs", "authSource": "IDIR", "guid": "239786FWEUHDFGSDKFASDF", "id": 2 },
    {"system": "EDW","username": "TRankin","name": "436bbqwrtbrbe", "value": "yjumsea", "authSource": "IDIR", "guid": "FVBNJTY89WEFUHEFIBRQ", "id": 12 },
    {"system": "EDW","username": "TRankin","name": "34tbw34bg", "value": "weby6um3", "authSource": "IDIR", "guid": "FVBNJTY89WEFUHEFIBRQ", "id": 14 },
    {"system": "EDW","username": "TRankin","name": "b3wtwtbwer", "value": "btrnurnrew", "authSource": "IDIR", "guid": "FVBNJTY89WEFUHEFIBRQ", "id": 15 },
    {"system": "EDW","username": "SShaw","name": "n625nwerv", "value": "wbtrt324n62", "authSource": "IDIR", "guid": "UYJM56890FQWUIBHF", "id": 16 },
    {"system": "EDW","username": "SShaw","name": "rewtn34n63", "value": "wernt3562", "authSource": "IDIR", "guid": "UYJM56890FQWUIBHF", "id": 17 },
    {"system": "EDW","username": "TRankin","name": "vqwe5qvfmhjf", "value": "mjrtyw45", "authSource": "IDIR", "guid": "FVBNJTY89WEFUHEFIBRQ", "id": 13 },
    {"system": "EDW","username": "SShaw","name": "wernt66546", "value": "wnt43626n2n", "authSource": "IDIR", "guid": "UYJM56890FQWUIBHF", "id": 19 },
    {"system": "EDW","username": "SShaw","name": "nt3w6562", "value": "n265462ewtn", "authSource": "IDIR", "guid": "UYJM56890FQWUIBHF", "id": 20 }];
    /*
    let connection = await oracledb.getConnection({
      user: process.env.ORACLE_USER,
      password : process.env.ORACLE_PASSWORD,
      connectString : process.env.ORACLE_CONNECT
    });
    const query = 'SELECT * FROM ' + process.env.AUTH_TABLE;
    let result = await connection.execute(query);
    console.log(result);
    if(connection){
      try{
        await connection.close();
      } catch(err){
        console.error(err);
      }
    }
    return result.rows;*/
    return users;
  }/*
  async select(options) {
      //db.execute(`select * from :1 where USERGUID=:2 AND `, [process.env.AUTH_TABLE, id]);
  }*/
  async update(options) {
      /*db.execute(`update :1 set SYSTEM=:2, USERNAME=:3, NAME=:4, VALUE=:5, AUTHDIRNAME=:6, USERGUID=:7, UPDATED_BY=:8`, [process.env.AUTH_TABLE, options.system, options.username, options.name, options.value, options.authdirname, options.guid, options.updatedBy], () => {
          db.execute(`select last_value from :1;`, [process.env.AUTH_TABLE]);
      });*/
      if(options != null){
        return 'asdklfhaerjkfahse'
      }
      return 'whatever';
  }
};

module.exports = AuthUser;
