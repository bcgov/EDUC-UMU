import { getJwtCertificate, logger } from '@bcgov/common-nodejs-utils';
import jwt from 'jsonwebtoken';
import config from '../config/index';

const sendError = (res, statusCode, message) => {
    logger.info(`Rejecting authenticaiton, message = ${message}`);
    res.status(statusCode).json({ error: message, success: false });
  };
  
  const verifyToken = clientAccessToken => new Promise(async (resolve, reject) => {
    try {
      const { certificate, algorithm } = await getJwtCertificate(config.get('oidc:certUrl'));
  
      jwt.verify(clientAccessToken, certificate, { algorithms: [algorithm] }, (verifyErr, verifyResult) => {
        if (verifyErr) {
          throw (verifyErr);
        }
  
        resolve(verifyResult);
      });
    } catch (err) {
      const message = 'Unable to verify token';
      logger.error(`${message}, error = ${err.message}`);
  
      reject(new Error(message));
    }
  });

  const isAuthenticated = async (req, res, next) => {
    // The download URL requires that the user authenticates via their
    // browser which will add an 'isAuthenticated' method for testing.
    if (/^.*\/album\/[0-9A-Za-z-]*\/download\/.*$/.test(req.originalUrl)) {
      logger.info('Verifying web user authentication');
      // This is not the same isAuthenticated() as above.
      if (req.isAuthenticated()) {
        return next();
      }
  
      logger.info('Redirecting web user to login');
      req.session.redirect_to = req.originalUrl;
      res.redirect('/main/auth/login');
      return null;
    }
  
    // Other API will use a Bearer JWT and should be verified
    // as follows.
    logger.info('Verifying API user authentication');
  
    const authHeader = req.headers.authorization;
    if (authHeader == null) {
      return sendError(res, 400, 'Please send Authorization header');
    }
  
    const authHeaderArray = authHeader.split(' ');
    if (authHeaderArray.length < 2) {
      return sendError(res, 400, 'Please send Authorization header with bearer type first followed by a space and then access token');
    }
    const clientAccessToken = authHeaderArray[1];
  
    try {
      const verifyResult = await verifyToken(clientAccessToken);
      if (verifyResult) {
        return next();
      }
      return sendError(res, 401, 'Invalid or expired access token');
    } catch (err) {
      return sendError(res, 401, err.message);
    }
  };

  module.exports = isAuthenticated;