/* eslint-disable */
'use strict'

const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

class AuthUser {
  constructor() {}
  
  async create(opt) {
      /*
      const query = 'INSERT INTO ' + process.env.AUTH_TABLE + '(SYSTEM, USERNAME, NAME, VALUE, AUTHDIRNAME, GUID) 
      VALUES (' + opt.system + ',' + opt.username + ',' + opt.name + ',' + opt.value + ',' + opt.authSource + ',' + opt.guid + ')'; */
      //return false here since there is no error
      if(opt != null){
        return {'error': false};
      }
      //there was an error
      return {'error': true};
  }
  async delete(opt) {
    //const query = 'DELETE FROM ' + process.env.AUTH_TABLE + 
    //' WHERE SYSTEM=' + opt.system + 'AND USERNAME=' + opt.username + 'AND NAME=' + opt.name + 'AND VALUE=' +  opt.value + 'AND AUTHDIRNAME=' + opt.authSource + 'AND USERGUID=' + opt.guid';
     if(opt != null){
       return {'error': false};
     }
     return {'error': true};
  }
  //select all users from table
  async selectAll() {
    /*
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
    */
    console.log('Endpoint: ' + process.env.DB_ENDPOINT);
    console.log('Table: ' + process.env.AUTH_TABLE);
    const query = 'select sysdate from dual;';
    const url = process.env.DB_ENDPOINT;
    const response = await axios.post(url, {
      headers: {
        'Content-Type': 'application/sql',
        'Authorization': 'Basic ' + process.env.DB_AUTH
      },
      data: query
    });
    console.log('Data' + response.data);
    return response.data;
  }
  async update(options) {
      /*
      const old = options.old;
      const new = options.new;
      const query = 'UPDATE ' + process.env.AUTH_TABLE + 
        ' SET SYSTEM=' + new.system + ', USERNAME=' + new.username + ', NAME=' + new.name + ', VALUE=' +  new.value + ', AUTHDIRNAME=' + new.authSource + ', GUID=' + new.guid + 
        ' WHERE SYSTEM=' + old.system + 'AND USERNAME=' + old.username + 'AND NAME=' + old.name + 'AND VALUE=' +  old.value + 'AND AUTHDIRNAME=' + old.authSource + 'AND GUID=' + old.guid';
      */
      if(options != null){
        return {'error': false};
     }
     return {'error': true};
  }
};

module.exports = AuthUser;
