import config from './config/index';
import express from 'express';
import log from 'npmlog';
import morgan from 'morgan';
import dotenv from'dotenv';

import utils from './src/components/utils';
import authRouter from './src/routes/auth';
import mainRouter from './src/routes/api';
import auth from './src/components/authmware.js';

import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

const apiRouter = express.Router();

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

app.use(cookieParser());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.raw(options));

app.use(morgan(config.get('server:morganFormat')));

log.level = config.get('server:logLevel');
log.addLevel('debug', 1500, {
  fg: 'cyan'
});

log.debug('Config', utils.prettyStringify(config));

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

// Root level Router
app.use(/(\/getok)?(\/api)?/, apiRouter);

apiRouter.use('/auth', authRouter);

apiRouter.use('/main', mainRouter);

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

app.use(auth(app));
//The following variable can be used to test connections to the database (probably shouldn't test queries though)
/*
var dbcon =  oracledb.getConnection({
    user: process.env.ORACLE_USER,
    password : process.env.ORACLE_PASSWORD,
    connectString : process.env.ORACLE_CONNECT
    },
    async function(err, connection) {
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
*/
  module.exports = app;