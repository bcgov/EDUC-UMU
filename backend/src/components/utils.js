import axios from 'axios';
import config from '../config/index';
import log from 'npmlog';
import cryptico from 'cryptico-js';

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
    console.log(discovery);
    return discovery;
  },

  // Creates a random password
  generatePassword: key => {
    const pw = generator.generate({
      length: 12,
      numbers: true
    });
    const result = {
      password: pw,
      encyptedPassword: cryptico.encrypt(pw, key).cipher
    };
    return result;
  },

  // Returns a pretty JSON representation of an object
  prettyStringify: obj => JSON.stringify(obj, null, 2),

  // Returns a string in Pascal Case
  toPascalCase: str => str.toLowerCase().replace(/\b\w/g, t => t.toUpperCase())
};

module.exports = utils;