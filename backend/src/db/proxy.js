var oracledb = require('oracledb');
require('dotenv');
let db = oracledb.getConnection({
    user: process.env.ORACLE_USER,
    password : process.env.ORACLE_PASSWORD,
    connectString : process.env.ORACLE_CONNECT
});

class Proxy {
    constructor() {
    }
    create(options, callback) {
        db.execute(`insert into :1(PROXYID, TARGETID, PROXYLEVEL) values(:2, :3, :4);`, [process.env.PROXY_TABLE, options.proxy, options.target, options.level], () => {
            db.execute(`select last_value from :1;`, [process.env.PROXY_TABLE], callback);
        });
    }
    delete(id, callback) {
        db.execute(`delete from :1 where id=:2;`, [process.env.PROXY_TABLE, id]);
    }
    selectAll(callback) {
        db.execute(`select * from :1`, [process.env.PROXY_TABLE], callback);
    }
    select(id, callback) {
        db.execute(`select * from :1 where id=:2`, [process.env.PROXY_TABLE, id], callback);
    }
    update(options, callback) {
        db.execute(`update :1 set PROXYID=:2, TARGETID=:3, PROXYLEVEL=:4;`, [process.env.PROXY_TABLE, options.proxy, options.target, options.level], () => {
            db.execute(`select last_value from :1;`, [process.env.PROXY_TABLE], callback);
        });
    }
}






module.exports = {
    Proxy:Proxy
};