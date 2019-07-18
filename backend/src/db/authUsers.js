var oracledb = require('oracledb');
require('dotenv');

class AuthUser {
    constructor() {
    }
    /*
    async create(options, callback) {
        db.execute(`insert into :1(SYSTEM, USERNAME, NAME, VALUE, AUTHDIRNAME, USERGUID, CREATED_BY) values(:2, :3, :4, :5, :6, :7, :8);`, [process.env.AUTH_TABLE, options.system, options.username, options.name, options.value, options.authdirnmae, options.guid, options.createdBy], () => {
            db.execute(`select last_value from :1;`, [process.env.AUTH_TABLE], callback);
        });
    }
    async delete(id, callback) {
        db.execute(`delete from :1 where userguid=:2;`, [process.env.AUTH_TABLE, id], callback);
    }*/
    async selectAll() {
        let connection = await oracledb.getConnection({
            user: process.env.ORACLE_USER,
            password : process.env.ORACLE_PASSWORD,
            connectString : process.env.ORACLE_CONNECT
        });
        let result = await connection.execute('SELECT * FROM SEC_AUTHORIZATION');
        console.log('Oracle Response: '+ typeof(result));
        if(connection){
            try{
                await connection.close();
            } catch(err){
                console.error(err);
            }
        }
        return result.rows;
    }/*
    async select(id, callback) {
        db.execute(`select * from :1 where id=:2`, [process.env.AUTH_TABLE, id], callback);
    }
    async update(options, callback) {
        db.execute(`update :1 set SYSTEM=:2, USERNAME=:3, NAME=:4, VALUE=:5, AUTHDIRNAME=:6, USERGUID=:7, UPDATED_BY=:8`, [process.env.AUTH_TABLE, options.system, options.username, options.name, options.value, options.authdirname, options.guid, options.updatedBy], () => {
            db.execute(`select last_value from :1;`, [process.env.AUTH_TABLE], callback);
        });
    }
    */
}

module.exports = {
    AuthUser:AuthUser
};