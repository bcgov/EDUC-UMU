const config = require('config');
const express = require('express');
const session = require('express-session');
const log = require('npmlog');
const oracledb = require('oracledb');

const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const OidcStrategy = require('passport-openidconnect').Strategy;
const apiRouter = express.Router();

const app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

var dbcon = await oracledb.getConnection({
    user: "",
    password : "",
    connectString : "" // "12.2.0.1:443/service_name"               [//]host_name[:port][/service_name][:server_type][/instance_name]
    },
    function(err, connection) {
        if(err) {
            console.error(err.message);
            return;
    }
    console.log("Connection successful!");
    connection.close(
        function(err) {
          if (err) {
            console.error(err.message);
            return;
          }
        });
  });
