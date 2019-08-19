module.exports = {
    'Application Running' : (browser) => {
      browser
        .url('https://obiee-umu-pbuo5q-dev.pathfinder.gov.bc.ca/')
        .waitForElementVisible('#app', 5000)
        .assert.elementPresent('.container')
        .end();
    },
    'Attempt Login': (browser) => {
        browser
            .url('https://obiee-umu-pbuo5q-dev.pathfinder.gov.bc.ca/')
            .waitForElementVisible('#nav-login', 5000)
            .click('#nav-login')
            .waitForElementVisible('#zocial-idir', 5000)
            .click('#zocial-idir')
            .waitForElementVisible('#user', 5000)
            .setValue('#user', process.env.IDIR_USER)
            .setValue('#password', process.env.IDIR_PASS)
            .click('.btn btn-primary')
            .waitForElementVisible('.v-tabs top-round theme--dark', 5000)
            .end();
    }
};