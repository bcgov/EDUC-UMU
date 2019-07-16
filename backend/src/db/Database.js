var { AuthUser } = require('./authUsers');
var { Proxy } = require('./proxy');
var { Roles } = require('./roles');

class Database {
    constructor() {
        this.authUsers = new AuthUser();
        this.proxy = new Proxy();
        this.roles = new Roles();
    }

/**********************************************************/
/*********             User Functions             *********/
/**********************************************************/
    createUser(authUser, callback) {
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
    updateUser(authUser, callback) {
        this.authUsers.update(authUser, ifError({ notify: callback }).otherwise((rows) => {
            callback(rows[0].last_value);
        }));
    }
    deleteUser(authUser, callback) {
        this.authUsers.delete(authUser.userId, callback);
    }
    selectUsers(callback) {
        this.authUsers.selectAll(callback);
    }


/**********************************************************/
/*********             Proxy Functions            *********/
/**********************************************************/
    createProxy(proxyDetails, callback) {
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
    updateProxy(proxyDetails, callback) {
        this.proxy.update(proxyDetails, ifError({ notify: callback }).otherwise((rows) => {
            callback(rows[0].last_value);
        }));
    }
    deleteProxy(proxyDetails, callback) {
        this.proxy.delete(proxyDetails.proxyId, callback);
    }
    selectProxies(callback) {
        this.proxy.selectAll(callback);
    }

/**********************************************************/
/*********             Role Functions             *********/
/**********************************************************/
    createRole(roleDetails, callback) {
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
    updateRole(roleDetails, callback) {
        this.roles.update(roleDetails, ifError({ notify: callback }).otherwise((rows) => {
            callback(rows[0].last_value);
        }));
    }
    deleteRole(roleDetails, callback) {
        this.roles.delete(roleDetails.roleId, callback);
    }
    selectRole(callback) {
        this.proxy.selectAll(callback);
    }
}

module.exports = Database;