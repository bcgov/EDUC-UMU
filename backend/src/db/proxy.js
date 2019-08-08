/* eslint-disable */
'use strict'

import oracledb from 'oracledb';
import dotenv from 'dotenv';
dotenv.config();

export class Proxy {
    constructor() {
    }
    /*
    async create(options, callback) {
        db.execute(`insert into :1(PROXYID, TARGETID, PROXYLEVEL) values(:2, :3, :4);`, [process.env.PROXY_TABLE, options.proxy, options.target, options.level], () => {
            db.execute(`select last_value from :1;`, [process.env.PROXY_TABLE], callback);
        });
    }
    async delete(id, callback) {
        db.execute(`delete from :1 where id=:2;`, [process.env.PROXY_TABLE, id]);
    }*/
    //select all proxies from table
    async selectAll() {
        let connection = await oracledb.getConnection({
            user: process.env.ORACLE_USER,
            password : process.env.ORACLE_PASSWORD,
            connectString : process.env.ORACLE_CONNECT
        });
        const query = 'SELECT * FROM ' + process.env.PROXY_TABLE;
        let result = await connection.execute(query);
        if(connection){
            try{
                await connection.close();
            } catch(err){
                console.error(err);
            }
        }
        return result.rows;
    }
    /*
    async select(id, callback) {
        db.execute(`select * from :1 where id=:2`, [process.env.PROXY_TABLE, id], callback);
    }
    async update(options, callback) {
        db.execute(`update :1 set PROXYID=:2, TARGETID=:3, PROXYLEVEL=:4;`, [process.env.PROXY_TABLE, options.proxy, options.target, options.level], () => {
            db.execute(`select last_value from :1;`, [process.env.PROXY_TABLE], callback);
        });
    }
    */
};