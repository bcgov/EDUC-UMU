'use strict'

import { get } from 'axios';
import { get as _get } from '../../config/index';
import { error as _error } from 'npmlog';

import { toPascalCase, getWebAdeToken } from './utils';

async function getWebAdeOauth2Status(webadeEnv = 'INT') {
  const result = {
    authenticated: false,
    authorized: false,
    endpoint: _get(`serviceClient.getok${toPascalCase(webadeEnv)}.endpoint`),
    healthCheck: false,
    name: `WebADE API (${webadeEnv})`
  };

  try {
    const username = _get(`serviceClient.getok${toPascalCase(webadeEnv)}.username`);
    const password = _get(`serviceClient.getok${toPascalCase(webadeEnv)}.password`);
    const webAdeResponse = await getWebAdeToken(username, password, 'WEBADE-REST', webadeEnv);

    result.healthCheck = !!webAdeResponse;
    result.authenticated = 'access_token' in webAdeResponse;
    result.authorized = 'scope' in webAdeResponse && webAdeResponse.scope.includes('WEBADE-REST.UPDATEAPPLICATIONS');

    return result;
  } catch (error) {
    _error('getWebAdeOauth2Status', error.message);
    return result;
  }
}

async function getMsscStatus() {
  const username = _get('serviceClient.mssc.username');
  const password = _get('serviceClient.mssc.password');

  const result = {
    authenticated: false,
    authorized: false,
    endpoint: _get('serviceClient.mssc.endpoint'),
    healthCheck: false,
    name: 'Common Messaging API'
  };


  try {
    const webAdeResponse = await getWebAdeToken(username, password, 'CMSG');

    result.authorized = 'scope' in webAdeResponse &&
      webAdeResponse.scope.includes('CMSG.CREATEMESSAGE');

    if ('access_token' in webAdeResponse) {
      result.authenticated = true;

      try {
        const endpointResult = await get(result.endpoint, {
          headers: {
            'Authorization': `Bearer ${webAdeResponse.access_token}`
          }
        });

        if (endpointResult.status === 200) {
          result.healthCheck = true;
        }
      } catch (error) {
        _error('getMsscStatus', error.message);
      }
    }

    return result;
  } catch (error) {
    _error('getMsscStatus', error.message);
    return result;
  }
}

const checks = {
  getStatus: () => Promise.all([
    getWebAdeOauth2Status('INT'),
    getWebAdeOauth2Status('TEST'),
    getWebAdeOauth2Status('PROD'),
    getMsscStatus()
  ])
};

export default checks;