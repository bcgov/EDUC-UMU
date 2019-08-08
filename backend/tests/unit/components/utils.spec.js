const axios = require('axios');
const config = require('../../../src/config/index');
const MockAdapter = require('axios-mock-adapter');
const log = require('npmlog');

const utils = require('../../../src/components/utils');

log.level = config.get('server:logLevel');
const mockAxios = new MockAdapter(axios);

describe('getOidcDiscovery', () => {
  const url = config.get('oidc:discovery');
  const spy = jest.spyOn(axios, 'get');

  afterEach(() => {
    spy.mockClear();
  });

  it('should gracefully fail if endpoint is down', async () => {
    mockAxios.onGet(url).networkErrorOnce();

    const result = await utils.getOidcDiscovery();

    expect(result).toBeFalsy();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(url);
  });

  it('should get and cache OIDC Discovery data', async () => {
    mockAxios.onGet(url).reply(200, {
      data: {
        issuer: 'issuerurl',
        authorization_endpoint: 'authurl',
        token_endpoint: 'tokenurl'
      }
    });

    await utils.getOidcDiscovery();
    const result = await utils.getOidcDiscovery();

    expect(result).toBeTruthy();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(url);
  });
});

describe('prettyStringify', () => {
  const obj = {
    foo: 'bar'
  };

  it('should return a formatted json string with 2 space indent', () => {
    const result = utils.prettyStringify(obj);

    expect(result).toBeTruthy();
    expect(result).toEqual('{\n  "foo": "bar"\n}');
  });

  it('should return a formatted json string with 4 space indent', () => {
    const result = utils.prettyStringify(obj, 4);

    expect(result).toBeTruthy();
    expect(result).toEqual('{\n    "foo": "bar"\n}');
  });
});
  
describe('toPascalCase', () => {
  it('should return a string', () => {
    const string = 'test foo bar';
    const result = utils.toPascalCase(string);

    expect(result).toBeTruthy();
    expect(result).toMatch(/[A-Z][a-z]+(?:[A-Z][a-z]+)*/);
  });
});
