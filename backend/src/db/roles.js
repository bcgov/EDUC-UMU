/*eslint-disable*/
'use strict'

import oracledb from 'oracledb';
import dotenv from 'dotenv';
dotenv.config();

export class Roles {
    constructor() {
    }
    /*
    create(options, callback) {
        db.execute(`insert into :1(SYSTEM, APPLICATION_ROLE, CREATE_BY) values(:2, :3, :4)`, [process.env.ROLES_TABLE, options.system, options.role, options.createdBy], () => {
            db.execute(`select last_value from :1;`, [process.env.ROLES_TABLE], callback);
        });
    }
    delete(id, callback) {
        db.execute(`delete from :1 where id=:2`, [process.env.ROLES_TABLE, id], callback);
    }
    */
   //select all roles from table
     async selectAll() {
        let connection = await oracledb.getConnection({
            user: process.env.ORACLE_USER,
            password : process.env.ORACLE_PASSWORD,
            connectString : process.env.ORACLE_CONNECT
        });
        const query = 'SELECT * FROM ' + process.env.ROLES_TABLE;
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
    select(id, callback) {
        db.execute(`select * from :1 where id=:2`, [process.env.ROLES_TABLE, id], callback);
    }
    update(options, callback) {
        db.execute(`update :1 set SYSTEM=:2, APPLICATION_ROLE=:3, UPDATED_BY=:4`, [process.env.ROLES_TABLE, options.system, options.role, options.updatedBy], () => {
            db.execute(`select last_value from :1`, [process.env.ROLES_TABLE], callback);
        });
    }
    */
};