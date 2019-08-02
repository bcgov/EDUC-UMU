'use strict'

const config = require('./config/index');
const dotenv = require('dotenv');
const log = require('npmlog');
const morgan = require('morgan');
const session = require('express-session');
const express = require('express');
const passport = require('passport');
const cors = require('cors');
const helmet = require('helmet');
dotenv.config();

const OidcStrategy = require('passport-openidconnect').Strategy;

const utils = require('./components/utils');
const authRouter = require('./routes/auth');
const mainRouter = require('./routes/api');

const apiRouter = express.Router();

//initialize app
const app = express();

//sets security measures (headers, etc)
app.use(helmet());
app.use(helmet.frameguard());
app.use(cors());

//tells the app to use json as means of transporting data
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

//initialize logging middleware
app.use(morgan(config.get('server:morganFormat')));

//sets cookies for security purposes (prevent cookie access, allow secure connections only, etc)
var expiryDate = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
app.use(session({
  secret: config.get('oidc:clientSecret'),
  resave: false,
  saveUninitialized: true,
  httpOnly: true,
  secure: true,
  expires: expiryDate
}));

//initialize routing and session. Cookies are now only reachable via requests (not js)
app.use(passport.initialize());
app.use(passport.session());

//configure logging
log.level = config.get('server:logLevel');
log.addLevel('debug', 1500, {
  fg: 'cyan'
});
log.debug('Config', utils.prettyStringify(config));

//initialize our authentication strategy
utils.getOidcDiscovery().then(discovery => {
  // Add Passport OIDC Strategy
  passport.use('oidc', new OidcStrategy({
    issuer: discovery.issuer,
    authorizationURL: discovery.authorization_endpoint,
    tokenURL: discovery.token_endpoint,
    userInfoURL: discovery.userinfo_endpoint,
    clientID: config.get('oidc:clientID'),
    clientSecret: config.get('oidc:clientSecret'),
    callbackURL: '/api/auth/callback',
    scope: discovery.scopes_supported
  }, (_issuer, _sub, profile, accessToken, refreshToken, done) => {
    if ((typeof (accessToken) === 'undefined') || (accessToken === null) ||
      (typeof (refreshToken) === 'undefined') || (refreshToken === null)) {
      return done('No access token', null);
    }

    //set access and refresh tokens
    profile.jwt = accessToken;
    profile.refreshToken = refreshToken;
    return done(null, profile);
  }));
});
//functions for serializing/deserializing users
passport.serializeUser((user, next) => {
  next(null, user);
});
passport.deserializeUser((obj, next) => {
  next(null, obj);
});

// GetOK Base API Directory
apiRouter.get('/', (_req, res) => {
  res.status(200).json({
    endpoints: [
      '/api/auth',
      '/api/main'
    ],
    versions: [
      1
    ]
  });
});

//set up routing to auth and main API
app.use(/(\/getok)?(\/api)?/, apiRouter);

apiRouter.use('/auth', authRouter);
apiRouter.use('/main', mainRouter);

//Handle 500 error
app.use((err, _req, res, next) => {
  log.error(err.stack);
  res.status(500).json({
    status: 500,
    message: 'Internal Server Error: ' + err.stack.split('\n', 1)[0]
  });
  next();
});

// Handle 404 error
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
//The following variable can be used to test connections to the database (probably shouldn't test queries though)
module.exports = app;