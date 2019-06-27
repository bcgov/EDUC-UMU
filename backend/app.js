const config = require('config');
const express = require('express');
const session = require('express-session');
const log = require('npmlog');

const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const OidcStrategy = require('passport-openidconnect').Strategy;
import oracledb from 'oracledb';

const app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

app.use()

var dbcon = await oracledb.getConnection({
    user: "",
    password : "",
    connectString : "" // "12.2.0.1:443/service_name"               [//]host_name[:port][/service_name][:server_type][/instance_name]
});
console.log(dbcon);