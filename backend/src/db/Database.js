/* eslint-disable */
'use strict'

var AuthUser = require('./authUsers');
var Proxy = require('./proxy');
var Roles = require('./roles');

//provides a class that can perform database queries on different tables
class Database {
  constructor() {
    this.authUsers = new AuthUser();
    this.proxy = new Proxy();
    this.roles = new Roles();
  }

/**********************************************************/
/*********             User Functions             *********/
/**********************************************************/
  async createUser(authUser) {
    let result = this.authUsers.create(authUser);
    return result;
  }
  async updateUser(authUser) {
    let result = this.authUsers.update(authUser);
    return result;
  }
  async deleteUser(authUser) {
    let result = this.authUsers.delete(authUser);
    return result;
  }
  async selectUsers() {
    let result = await this.authUsers.selectAll();
    return result;
  }


/**********************************************************/
/*********             Proxy Functions            *********/
/**********************************************************/
  async createProxy(proxyDetails) {
    let result = this.proxy.create(proxyDetails);
    return result;
  }
  async updateProxy(proxyDetails) {
    let result = this.proxy.update(proxyDetails);
    return result;
  }
  async deleteProxy(proxyDetails) {
    let result = this.proxy.delete(proxyDetails);
    return result;
  }
  async selectProxies(callback) {
    let result = this.proxy.selectAll(callback);
    return result;
  }

/**********************************************************/
/*********             Role Functions             *********/
/**********************************************************/
  async createRole(roleDetails) {
    let result = this.roles.create(roleDetails);
    return result;
  }
  async updateRole(roleDetails) {
    let result = this.roles.update(roleDetails);
    return result;
  }
  async deleteRole(roleDetails) {
    let result = this.roles.delete(roleDetails);
    return result;
  }
  async selectRole(callback) {
    let result = this.roles.selectAll(callback);
    return result;
  }
};

module.exports = Database;
