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
            .assert.elementPresent('.environment-prod')
            .back()
            .waitForElementVisible('#app', 5000)
            .click('#footer-about')
            .pause(2000)
            .assert.elementPresent('.environment-prod')
            .back
            .waitForElementVisible('#app', 5000)
            .click('#footer-disclaimer')
            .pause(2000)
            .assert.elementPresent('.environment-prod')
            .back()
            .waitForElementVisible('#app', 5000)
            .click('#footer-privacy')
            .pause(2000)
            .assert.elementPresent('.environment-prod')
            .back()
            .waitForElementVisible('#app', 5000)
            .click('#footer-accessibility')
            .pause(2000)
            .assert.elementPresent('.environment-prod')
            .back()
            .waitForElementVisible('#app', 5000)
            .click('#footer-copyright')
            .pause(2000)
            .assert.elementPresent('.environment-prod')
            .back()
            .waitForElementVisible('#app', 5000)
            .end();
    },
    'Attempt Login': (browser) => {
        browser
            .url('https://obiee-umu-pbuo5q-dev.pathfinder.gov.bc.ca/')
            .waitForElementVisible('#nav-login', 5000)
            .click('#nav-login')
            .waitForElementVisible('#zocial-idir', 5000)
            .click('#zocial-idir')
            .end();
    }
};