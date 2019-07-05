import config from('./config');
const express = require('express');
const session = require('express-session');
const log = require('npmlog');
const morgan = require('morgan');
const passport = require('passport');
const oracledb = require('oracledb');

const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const OidcStrategy = require('passport-openidconnect').Strategy;

const utils = require('./src/components/utils');
const authRouter = require('./src/routes/auth');

const apiRouter = express.Router();

const app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

app.use(morgan(config.get('server.morganFormat')));


app.use(session({
  secret: config.get('oidc.clientSecret'),
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

log.level = config.get('server.logLevel');
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
    clientID: config.get('oidc.clientID'),
    clientSecret: config.get('oidc.clientSecret'),
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
    audience: config.get('oidc.clientID'),
    issuer: discovery.issuer,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.get('oidc.publicKey')
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

apiRouter.get('/', (_req, res) => {
  res.status(200).json({
    endpoints: [
      '/api/auth',
    ],
    versions: [
      1
    ]
  });
});


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

apiRouter.use('/auth', authRouter);

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