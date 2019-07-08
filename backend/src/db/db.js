var oracledb = require('oracledb');

var db = {};

db.init = function(){
    const logger = require('npmlog');

    db = oracledb.getConnection({
        user: process.env.ORACLE_USER,
        password : process.env.ORACLE_PASSWORD,
        connectString : process.env.ORACLE_CONNECT
    });

    /*db.on('error', function(error){
        logger.error(error);
        throw(error);
    });

    db.once('open', function(){
        logger.debug("db connection established");
    });*/
};

module.exports = db;