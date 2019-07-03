const config = require('config');
const express = require('express');
const session = require('express-session');
const log = require('npmlog');
const morgan = require('morgan');
const passport = require('passport');
const oracledb = require('oracledb');


const utils = require('./src/components/utils');

const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const OidcStrategy = require('passport-openidconnect').Strategy;
const apiRouter = express.Router();

const app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

app.use(morgan(config.get('server.morganFormat')));

log.level = config.get('server.logLevel');
log.addLevel('debug', 1500, {
  fg: 'cyan'
});

//log.debug('Config', utils.prettyStringify(config));
// GetOK Base API Directory
apiRouter.get('/', (_req, res) => {
  res.status(200).json({
    endpoints: [
      '/api/auth',
      '/api/v1',
      '/api/db'
    ],
    versions: [
      1
    ]
  });
});

// Root level Router
app.use(/(\/getok)?(\/api)?/, apiRouter);

app.use((err, _req, res, next) => {
  log.error(err.stack);
  res.status(500).json({
    status: 500,
    message: 'Internal Server Error: ' + err.stack.split('\n', 1)[0]
  });
  next();
});

// Handle 404
app.use((_req, res) => {
  res.status(404).json({
    status: 404,
    message: 'Page Not Found'
  });
});

// Prevent unhandled errors from crashing application
process.on('unhandledRejection', err => {
  log.error(err.stack);
});

var dbcon =  oracledb.getConnection({
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

  module.exports = app;