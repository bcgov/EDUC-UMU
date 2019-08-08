/*eslint-disable*/
'use strict'

import { AuthUser } from './authUsers';
import { Proxy } from './proxy';
import { Roles } from './roles';

//provides a class that can perform database queries on different tables
export default class Database {
    constructor() {
        this.authUsers = new AuthUser();
        this.proxy = new Proxy();
        this.roles = new Roles();
    }

/**********************************************************/
/*********             User Functions             *********/
/**********************************************************/
    async createUser(authUser, callback) {
        this.authUsers.select(authUser.userId, ifError({ notify: callback }).otherwise((rows) => {
            if (!rows || rows.length === 0) {
                this.authUsers.create(authUser, ifError({ notify: callback }).otherwise((rows) => {
                    callback(rows[0].last_value);
                }));
            }
            else {
                authUser.id = rows[0].id;
                this.authUsers.update(authUser, ifError({ notify: callback }).otherwise((rows) => {
                    callback(rows[0].last_value);
                }));
            }
        }));
    }
    async updateUser(authUser, callback) {
        this.authUsers.update(authUser, ifError({ notify: callback }).otherwise((rows) => {
            callback(rows[0].last_value);
        }));
    }
    async deleteUser(authUser, callback) {
        this.authUsers.delete(authUser.userId, callback);
    }
    async selectUsers() {
        let result = this.authUsers.selectAll();
        return result;
    }


/**********************************************************/
/*********             Proxy Functions            *********/
/**********************************************************/
    async createProxy(proxyDetails, callback) {
        this.proxy.select(proxyDetails.proxyId, ifError({ notify: callback }).otherwise((rows) => {
            if (!rows || rows.length === 0) {
                this.proxy.create(proxyDetails, ifError({ notify: callback }).otherwise((rows) => {
                    callback(rows[0].last_value);
                }));
            }
            else {
                proxyDetails.id = rows[0].id;
                this.proxy.update(proxyDetails, ifError({ notify: callback }).otherwise((rows) => {
                    callback(rows[0].last_value);
                }));
            }
        }));
    }
    async updateProxy(proxyDetails, callback) {
        this.proxy.update(proxyDetails, ifError({ notify: callback }).otherwise((rows) => {
            callback(rows[0].last_value);
        }));
    }
    async deleteProxy(proxyDetails, callback) {
        this.proxy.delete(proxyDetails.proxyId, callback);
    }
    async selectProxies(callback) {
        let result = this.proxy.selectAll(callback);
        return result;
    }

/**********************************************************/
/*********             Role Functions             *********/
/**********************************************************/
    async createRole(roleDetails, callback) {
        this.roles.select(rolesDetails.roleId, ifError({ notify: callback }).otherwise((rows) => {
            if (!rows || rows.length === 0) {
                this.roles.create(roleDetails, ifError({ notify: callback }).otherwise((rows) => {
                    callback(rows[0].last_value);
                }));
            }
            else {
                roleDetails.id = rows[0].id;
                this.roles.update(roleDetails, ifError({ notify: callback }).otherwise((rows) => {
                    callback(rows[0].last_value);
                }));
            }
        }));
    }
    async updateRole(roleDetails, callback) {
        this.roles.update(roleDetails, ifError({ notify: callback }).otherwise((rows) => {
            callback(rows[0].last_value);
        }));
    }
    async deleteRole(roleDetails, callback) {
        this.roles.delete(roleDetails.roleId, callback);
    }
    async selectRole(callback) {
        let result = this.roles.selectAll(callback);
        return result;
    }
};