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
    //test if the user exists before updating
    /*let test = this.authUsers.select(authUser.old);
    if(!test){
      return test;
    }*/
    let result = this.authUsers.update(authUser);
    return result;
  }
  async deleteUser(authUser) {
    let result = this.authUsers.delete(authUser);
    return result;
  }
  async selectUsers() {
    let result = this.authUsers.selectAll();
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
    //test if the proxy exists before updating
    /*let test = this.proxy.select(proxyDetails.old);
    if(!test){
      return test;
    }*/
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
    //test if the role exists before updating
    /*let test = this.roles.select(roleDetails.old);
    if(!test){
      return test;
    }*/
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
