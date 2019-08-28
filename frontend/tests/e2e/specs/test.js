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
            /*.end;
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
            .assert.urlEquals('https://www2.gov.bc.ca/gov/content/home/accessibility')
            .url('https://obiee-umu-pbuo5q-dev.pathfinder.gov.bc.ca/')
            .waitForElementVisible('#app', 5000)
            .click('#footer-copyright')
            .pause(2000)
            .assert.urlEquals('https://www2.gov.bc.ca/gov/content/home/copyright')
            .url('https://obiee-umu-pbuo5q-dev.pathfinder.gov.bc.ca/')
            .waitForElementVisible('#app', 5000)
            .end();
    },
    'Navigate to login': (browser) => {
        browser
            .url('https://obiee-umu-pbuo5q-dev.pathfinder.gov.bc.ca/')
            .waitForElementVisible('#nav-login', 5000)
            .click('#nav-login')
            .waitForElementVisible('#zocial-idir', 5000)
            //Following test doesn't work because login form has "no-robots" header
            /*.click('#zocial-idir')
            .pause(5000)
            .source((result) => {
                console.log(result.value);
            })*/
            .end();
    },

};