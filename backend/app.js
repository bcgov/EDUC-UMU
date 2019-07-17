const config = require('./config/index');
const express = require('express');
const session = require('express-session');
const log = require('npmlog');
const morgan = require('morgan');
const passport = require('passport');
const oracledb = require('oracledb');
const dotenv = require('dotenv');
const Keycloak = require('keycloak-connect');
const Database = require('./src/db/Database');

const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const OidcStrategy = require('passport-openidconnect').Strategy;

const utils = require('./src/components/utils');
const authRouter = require('./src/routes/auth');

const apiRouter = express.Router();

dotenv.config();

let keyConfig = {
  "resource": process.env.SSO_CLIENT_ID,
  "ssl-required": "external",
  "auth-server-url": "https://sso-dev.pathfinder.gov.bc.ca/auth",
  "realm": "jsgbqlip",
  "credentials": {
    "secret": process.env.SSO_USER_SECRET
  },
  "confidential-port": 0,
  "policy-enforcer": {}
};

var memoryStore = new session.MemoryStore();
var keycloak = new Keycloak({store: memoryStore}, keyConfig);

const app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

app.use(morgan(config.get('server:morganFormat')));


app.use(session({
  secret: config.get('oidc:clientSecret'),
  resave: false,
  saveUninitialized: true,
  store: memoryStore
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(keycloak.middleware({
  logout: '/logout'
}));

log.level = config.get('server:logLevel');
log.addLevel('debug', 1500, {
  fg: 'cyan'
});

log.debug('Config', utils.prettyStringify(config));

utils.getOidcDiscovery().then(discovery => {
  // Add Passport OIDC Strategy
  passport.use('oidc', new OidcStrategy({
    issuer: discovery.issuer,
    authorizationURL: discovery.authorization_endpoint,
    tokenURL: discovery.token_endpoint,
    userInfoURL: discovery.userinfo_endpoint,
    clientID: config.get('oidc:clientID'),
    clientSecret: config.get('oidc:clientSecret'),
    callbackURL: '/getok/api/auth/callback',
    scope: discovery.scopes_supported
  }, (_issuer, _sub, profile, accessToken, refreshToken, done) => {
    if ((typeof (accessToken) === 'undefined') || (accessToken === null) ||
      (typeof (refreshToken) === 'undefined') || (refreshToken === null)) {
      return done('No access token', null);
    }

    profile.jwt = accessToken;
    profile.refreshToken = refreshToken;
    return done(null, profile);
  }));

  // Add Passport JWT Strategy
  passport.use('jwt', new JWTStrategy({
    algorithms: discovery.token_endpoint_auth_signing_alg_values_supported,
    audience: config.get('oidc:clientID'),
    issuer: discovery.issuer,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.get('oidc:publicKey')
  }, (jwtPayload, done) => {
    if ((typeof (jwtPayload) === 'undefined') || (jwtPayload === null)) {
      return done('No JWT token', null);
    }

    done(null, {
      email: jwtPayload.email,
      familyName: jwtPayload.family_name,
      givenName: jwtPayload.given_name,
      jwt: jwtPayload,
      name: jwtPayload.name,
      preferredUsername: jwtPayload.preferred_username,
    });
  }));
});
passport.serializeUser((user, next) => next(null, user));
passport.deserializeUser((obj, next) => next(null, obj));

// GetOK Base API Directory
apiRouter.get('/', (_req, res) => {
  res.status(200).json({
    endpoints: [
      '/api/auth'
    ],
    versions: [
      1
    ]
  });
});

// Root level Router
app.use(/(\/getok)?(\/api)?/, apiRouter);

apiRouter.use('/auth', authRouter);

var database = new Database();

app.get('/database', keycloak.protect(), (_req, res) => {
    res.status(200).json({
      endpoints: [
        '/users',
        '/proxy',
        '/roles'
      ]
    });
  });

app.get('/api/database/users', keycloak.protect(), async(_req, res) => {
    const response = await database.selectUsers();
    if(response instanceof Array){
        res.status(200).json({ users : response });
    } else{
        res.status(500).json({ message : "Unable to retrieve users from database"});
    }
});
/*
dbRouter.put('/users', async(_req, res) => {
    let data = _req.body.data;
    const response = await database.updateUser(data);
    if(response instanceof Array){
        res.status(200).json({ message: "User successfully updated!"});
    } else {
        res.status(500).json({ message: "Unable to update user"});
    }
});
dbRouter.post('/users', async(_req, res) => {
    let data = _req.body.data;
    const response = await database.createUser(data);
    if(response instanceof Array){
        res.status(200).json({ message: "User successfully added to database!"});
    } else {
        res.status(500).json({ message: "Unable to add user to database"});
    }
});
*/

app.get('/api/database/proxy', keycloak.protect(), async(_req, res) => {
    const response = await database.selectProxies();
    if(response instanceof Array){
        res.status(200).json({ proxies : response });
    } else{
        res.status(500).json({ message : "Unable to retrieve proxies from database"});
    }
});
/*
dbRouter.put('/proxy', async(_req, res) => {
    let data = _req.body.data;
    const response = await database.updateProxy(data);
    if(response instanceof Array){
        res.status(200).json({ message: "User proxy successfully updated!"});
    } else {
        res.status(500).json({ message: "Unable to update user proxy."});
    }
});
dbRouter.post('/proxy', async(_req, res) => {
    let data = _req.body.data;
    const response = await database.createProxy(data);
    if(response instanceof Array){
        res.status(200).json({ message: "User proxy successfully added to database!"});
    } else {
        res.status(500).json({ message: "Unable to add user proxy to database."});
    }
});
*/


app.get('/api/database/roles', keycloak.protect(), async(_req, res) => {
    const response = await database.selectRole();
    if(response instanceof Array){
        res.status(200).json({ roles : response });
    } else {
        res.status(500).json({ message : "Unable to retrieve roles from database"});
    }
});
/*
dbRouter.put('/roles', async(_req, res) => {
    let data = _req.body.data;
    const response = await database.updateRole(data);
    if(response instanceof Array){
        res.status(200).json({ message: "Successfully updated role!"});
    } else {
        res.status(500).json({ message: "Unable to update role."});
    }
});
dbRouter.post('/roles', async(_req, res) => {
    let data = _req.body.data;
    const response = await database.createRole(data);
    if(response instanceof Array){
        res.status(200).json({ message: "Successfully added role to database!"});
    } else {
        res.status(500).json({ message: "Unable to add role to database."});
    }
});
*/

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
    user: process.env.ORACLE_USER,
    password : process.env.ORACLE_PASSWORD,
    connectString : process.env.ORACLE_CONNECT
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