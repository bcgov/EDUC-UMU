var oracledb = require('oracledb');
require('dotenv');
let db = oracledb.getConnection({
    user: process.env.ORACLE_USER,
    password : process.env.ORACLE_PASSWORD,
    connectString : process.env.ORACLE_CONNECT
});

class AuthUser {
    constructor() {
    }
    create(options, callback) {
        db.execute(`insert into :1(SYSTEM, USERNAME, NAME, VALUE, AUTHDIRNAME, USERGUID, CREATED_BY) values(:2, :3, :4, :5, :6, :7, :8);`, [process.env.AUTH_TABLE, options.system, options.username, options.name, options.value, options.authdirnmae, options.guid, options.createdBy], () => {
            db.execute(`select last_value from :1;`, [process.env.AUTH_TABLE], callback);
        });
    }
    delete(id, callback) {
        db.execute(`delete from :1 where userguid=:2;`, [process.env.AUTH_TABLE, id], callback);
    }
    selectAll(callback) {
        db.execute(`select * from :1`, [process.env.AUTH_TABLE]);
    }
    select(id, callback) {
        db.execute(`select * from :1 where id=:2`, [process.env.AUTH_TABLE, id], callback);
    }
    update(options, callback) {
        db.execute(`update :1 set SYSTEM=:2, USERNAME=:3, NAME=:4, VALUE=:5, AUTHDIRNAME=:6, USERGUID=:7, UPDATED_BY=:8`, [process.env.AUTH_TABLE, options.system, options.username, options.name, options.value, options.authdirname, options.guid, options.updatedBy], () => {
            db.execute(`select last_value from :1;`, [process.env.AUTH_TABLE], callback);
        });
    }
}






module.exports = {
    AuthUser:AuthUser
};