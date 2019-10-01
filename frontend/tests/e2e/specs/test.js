require('dotenv');
module.exports = {
  'Application Running' : (browser) => {
    browser
      .url('https://obiee-umu-pbuo5q-dev.pathfinder.gov.bc.ca/')
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('.container')
      .end();
  },
  'Test External Links' : (browser) => {
    browser
      .url('https://obiee-umu-pbuo5q-dev.pathfinder.gov.bc.ca/')
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('.container')
      .click('#footer-home')
      .pause(2000)
      .assert.urlEquals('https://www2.gov.bc.ca/gov/content/home')
    /*.end();
            These tests do not work for firefox, as GeckoDriver provides marionette error
            Can re-enable this tests when GeckoDriver fixes this issue*/
      .url('https://obiee-umu-pbuo5q-dev.pathfinder.gov.bc.ca/')
      .waitForElementVisible('#app', 5000)
      .click('#footer-about')
      .pause(2000)
      .assert.urlEquals('https://www2.gov.bc.ca/gov/content/about-gov-bc-ca')
      .url('https://obiee-umu-pbuo5q-dev.pathfinder.gov.bc.ca/')
      .waitForElementVisible('#app', 5000)
      .click('#footer-disclaimer')
      .pause(2000)
      .assert.urlEquals('https://www2.gov.bc.ca/gov/content/home/disclaimer')
      .url('https://obiee-umu-pbuo5q-dev.pathfinder.gov.bc.ca/')
      .waitForElementVisible('#app', 5000)
      .click('#footer-privacy')
      .pause(2000)
      .assert.urlEquals('https://www2.gov.bc.ca/gov/content/home/privacy')
      .url('https://obiee-umu-pbuo5q-dev.pathfinder.gov.bc.ca/')
      .waitForElementVisible('#app', 5000)
      .click('#footer-accessibility')
      .pause(2000)
      .assert.urlEquals('https://www2.gov.bc.ca/gov/content/home/accessible-government')
      .url('https://obiee-umu-pbuo5q-dev.pathfinder.gov.bc.ca/')
      .waitForElementVisible('#app', 5000)
      .click('#footer-copyright')
      .pause(2000)
      .assert.urlEquals('https://www2.gov.bc.ca/gov/content/home/copyright')
      .url('https://obiee-umu-pbuo5q-dev.pathfinder.gov.bc.ca/')
      .waitForElementVisible('#app', 5000)
      .end();
  },
  //This test logs into the UMU in order to see password protected resources
  'Perform Login': (browser) => {
    browser
      .url('https://obiee-umu-pbuo5q-dev.pathfinder.gov.bc.ca/')
      .waitForElementVisible('#nav-login', 5000)
      .click('#nav-login')
      .waitForElementVisible('#zocial-idir', 5000)
      .click('#zocial-idir')
      .waitForElementVisible('#login-form', 5000)
      .setValue('#user', process.env.IDIR_USER)
      .setValue('#password', process.env.IDIR_PASS)
      .submitForm('#login-form')
      .waitForElementVisible('#app', 5000)
      .assert.visible('#tab-container')
      .end();
  },

};
