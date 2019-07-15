var { AuthUser } = require('./authUsers');
var { Proxy } = require('./proxy');
var { Roles } = require('./roles');

let Database = function() {
    this.authUsers = new AuthUser();
    this.proxy = new Proxy();
    this.roles = new Roles();
};

Database.prototype.createUser = function(authUser, callback){
    this.authUsers.select(authUser.userId, ifError({notify:callback}).otherwise((rows)=> {
        if(!rows || rows.length === 0){
            this.authUsers.create(authUser, ifError({notify:callback}).otherwise((rows)=> {
                callback(rows[0].last_value);
            }));
        } else {
            authUser.id = rows[0].id;
            this.authUsers.update(authUser, ifError({notify:callback}).otherwise((rows)=> {
                callback(rows[0].last_value);
            }));
        }
    }))
};

Database.prototype.updateUser = function(authUser, callback){
    this.authUsers.update(authUser, ifError({notify:callback}).otherwise((rows)=> {
        callback(rows[0].last_value);
    }));
};

Database.prototype.deleteUser = function(authUser, callback){
    this.authUsers.delete(authUser.userId, callback);
};

Database.prototype.selectUsers = function(authUser, callback){
    this.authUsers.selectAll(callback);
};



Database.prototype.createProxy = function(proxyDetails, callback){
    this.proxy.select(proxyDetails.proxyId, ifError({notify:callback}).otherwise((rows)=> {
        if(!rows || rows.length === 0){
            this.proxy.create(proxyDetails, ifError({notify:callback}).otherwise((rows)=> {
                callback(rows[0].last_value);
            }));
        } else {
            proxyDetails.id = rows[0].id;
            this.proxy.update(proxyDetails, ifError({notify:callback}).otherwise((rows)=> {
                callback(rows[0].last_value);
            }));
        }
    }))
};

Database.prototype.updateProxy = function(proxyDetails, callback){
    this.proxy.update(proxyDetails, ifError({notify:callback}).otherwise((rows)=> {
        callback(rows[0].last_value);
    }));
};

Database.prototype.deleteProxy = function(proxyDetails, callback){
    this.proxy.delete(proxyDetails.proxyId, callback);
};

Database.prototype.selectProxies = function(callback){
    this.proxy.selectAll(callback);
};



Database.prototype.createRole = function(roleDetails, callback){
    this.roles.select(rolesDetails.roleId, ifError({notify:callback}).otherwise((rows)=> {
        if(!rows || rows.length === 0){
            this.roles.create(roleDetails, ifError({notify:callback}).otherwise((rows)=> {
                callback(rows[0].last_value);
            }));
        } else {
            roleDetails.id = rows[0].id;
            this.roles.update(roleDetails, ifError({notify:callback}).otherwise((rows)=> {
                callback(rows[0].last_value);
            }));
        }
    }))
};

Database.prototype.updateRole = function(roleDetails, callback){
    this.roles.update(roleDetails, ifError({notify:callback}).otherwise((rows)=> {
        callback(rows[0].last_value);
    }));
};

Database.prototype.deleteRole = function(roleDetails, callback){
    this.roles.delete(roleDetails.roleId, callback);
};

Database.prototype.selectRole = function(callback){
    this.proxy.selectAll(callback);
};

module.exports = Database;