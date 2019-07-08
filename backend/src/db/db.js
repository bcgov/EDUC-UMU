var oracledb = require('oracledb');
var config = require('../../config/index');

var db = {};

db.init = function(){
    db.db = oracledb.getConnection({
        user: process.env.ORACLE_USER,
        password : process.env.ORACLE_PASSWORD,
        connectString : process.env.ORACLE_CONNECT
    });

    db.db.on('error', function(error){
        logger.error(error);
        throw(error);
    });

    db.db.once('open', function(){
        logger.debug("db connection established");
    });
};

module.exports = db;