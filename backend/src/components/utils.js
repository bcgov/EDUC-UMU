/* eslint-disable */
'use strict';

const axios = require('axios');
const config = require('../config/index');
const log = require('npmlog');
const cryptico = require('cryptico-js');

let discovery = null;

const utils = {
  // Returns OIDC Discovery values
  async getOidcDiscovery() {
    if (!discovery) {
      try {
        const response = await axios.get(config.get('oidc:discovery'));

        log.verbose('getOidcDiscovery', utils.prettyStringify(response.data));
        discovery = response.data;
      } catch (error) {
        log.error('getOidcDiscovery', `OIDC Discovery failed - ${error.message}`);
      }
    }
    return discovery;
  },

  // Creates a random password
  generatePassword: (key, len = 12) => {
    const pw = generator.generate({
      length: len,
      numbers: true
    });
    return {
      password: pw,
      encyptedPassword: cryptico.encrypt(pw, key).cipher
    };
  },

  // Returns a pretty JSON representation of an object
  prettyStringify: (obj, indent = 2) => JSON.stringify(obj, null, indent),

  // Returns a string in Pascal Case
  toPascalCase: str => str.toLowerCase().replace(/\b\w/g, t => t.toUpperCase())
};

module.exports = utils;