import atob from 'atob';
import { post } from 'axios';
import { get } from '../../config/index';
import { verbose, error as _error } from 'npmlog';
import { stringify } from 'querystring';

import { getOidcDiscovery, prettyStringify } from './utils';

const auth = {
  // Check if JWT Access Token has expired
  isTokenExpired(token) {
    const now = Date.now().valueOf() / 1000;
    const jwtPayload = token.split('.')[1];
    const payload = JSON.parse(atob(jwtPayload));

    return (!!payload.exp && payload.exp < now);
  },

  // Check if JWT Refresh Token has expired
  isRenewable(token) {
    const now = Date.now().valueOf() / 1000;
    const jwtPayload = token.split('.')[1];
    const payload = JSON.parse(atob(jwtPayload));

    // Check if expiration exists, or lacks expiration
    return (typeof (payload.exp) !== 'undefined' && payload.exp !== null &&
      payload.exp == 0 || payload.exp > now);
  },

  // Get new JWT and Refresh tokens
  async renew(refreshToken) {
    let result = {};

    try {
      const discovery = await getOidcDiscovery();
      const response = await post(discovery.token_endpoint,
        stringify({
          client_id: get('oidc:clientID'),
          client_secret: get('oidc:clientSecret'),
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
          scope: discovery.scopes_supported
        }), {
          headers: {
            Accept: 'application/json',
            'Cache-Control': 'no-cache',
            'Content-Type': 'application/x-www-form-urlencoded',
          }
        }
      );

      verbose('renew', prettyStringify(response.data));
      result.jwt = response.data.access_token;
      result.refreshToken = response.data.refresh_token;
    } catch (error) {
      _error('renew', error.message);
      result = error.response.data;
    }

    return result;
  },

  // Update or remove token based on JWT and user state
  async removeExpired(req, _res, next) {
    try {
      if (!!req.user && !!req.user.jwt) {
        verbose('removeExpired', 'User & JWT exists');

        if (auth.isTokenExpired(req.user.jwt)) {
          verbose('removeExpired', 'JWT has expired');

          if (!!req.user.refreshToken && auth.isRenewable(req.user.refreshToken)) {
            verbose('removeExpired', 'Can refresh JWT token');

            // Get new JWT and Refresh Tokens and update the request
            const {
              jwt,
              refreshToken
            } = await auth.renew(req.user.refreshToken);
            req.user.jwt = jwt;
            req.user.refreshToken = refreshToken;
          } else {
            verbose('removeExpired', 'Cannot refresh JWT token');
            delete req.user;
          }
        }
      } else {
        verbose('removeExpired', 'No existing User or JWT');
        delete req.user;
      }
    } catch (error) {
      _error('removeExpired', error.message);
    }

    next();
    return;
  }
};

export default auth;