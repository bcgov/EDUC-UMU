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
            .end();/*
            .back()
            .waitForElementVisible('#app', 5000)
            .click('#footer-about')
            .pause(2000)
            .assert.urlEquals('https://www2.gov.bc.ca/gov/content/about-gov-bc-ca')
            .back()
            .waitForElementVisible('#app', 5000)
            .click('#footer-disclaimer')
            .pause(2000)
            .assert.urlEquals('https://www2.gov.bc.ca/gov/content/home/disclaimer')
            .back()
            .waitForElementVisible('#app', 5000)
            .click('#footer-privacy')
            .pause(2000)
            .assert.urlEquals('https://www2.gov.bc.ca/gov/content/home/privacy')
            .back()
            .waitForElementVisible('#app', 5000)
            .click('#footer-accessibility')
            .pause(2000)
            .assert.urlEquals('https://www2.gov.bc.ca/gov/content/home/accessibility')
            .back()
            .waitForElementVisible('#app', 5000)
            .click('#footer-copyright')
            .pause(2000)
            .assert.urlEquals('https://www2.gov.bc.ca/gov/content/home/copyright')
            .back()
            .waitForElementVisible('#app', 5000)
            .end();*/
    },
    'Navigate to login': (browser) => {
        browser
            .url('https://obiee-umu-pbuo5q-dev.pathfinder.gov.bc.ca/')
            .waitForElementVisible('#nav-login', 5000)
            .click('#nav-login')
            .waitForElementVisible('#zocial-idir', 5000)
            //.click('#zocial-idir')
            .url('https://logontest7.gov.bc.ca/clp-cgi/int/logon.cgi?flags=1000:1,0&TYPE=33554433&REALMOID=06-426ed0fc-e631-4b35-b589-4730b3c8533f&GUID=&SMAUTHREASON=0&METHOD=GET&SMAGENTNAME=$SM$Lk6VtkyHw8x3zQIIsMiOiEXYFJF%2fJzjVT7eioCjxBjJck5VMlbxxrR%2bLZSo%2flIBX&TARGET=$SM$HTTPS%3a%2f%2fsfstest7%2egov%2ebc%2eca%2faffwebservices%2fredirectjsp%2fsso-devpathfinder%2fredirect%2ejsp%3fSAMLRequest%3dnVJdb9sgFP0rFu8YgtM4QXGkrNG0SN1mNWkf$%2BlJh$%2B7pBs8Hj4nT798P2qmYvUbU3dDmX88UaVdt0ctv7k7mHnz2gj361jUE5XmSkd0ZahRqlUS2g9KU8bL$%2FeSRFz2TnrbWkbMq1cBytEcF5bQ6Lt2$%2FHWGuxbcAdwZ13Cw$%2F1dRk7edygZQ7S0gnPcKX$%2BqtanAxS$%2F2HBdlXCqmgl7mQDUtMl1pxwpnf4CbzmCqzmrjSbQLdrRRA9XFwzX6ME8vn6vrVyhwUoGs64tGl2xIQAQZJPpsXQljRhmpVYNAov0uI$%2Fvdc1rdzBLBV1Qs5ks6r1ZzWtyUgi54spgnaZVykQQw5sG$%2BPsP7OmIPe4NeGZ8RwWcrypdU8KNIJF$%2FJWRrzpXgiUf434k8hAW1erkdcTCCUX47HnObfD0cSPYLD0X4AkM168CRHcnfR80eb2$%2FxXOWt2wTpJ6OS3QLPf5TYE$%2FTvaNo19vQ0rPiTkXQ9j5K3y14UNE13ReoTKbnAaqg3Fs83E$%2Be$%2FH3vwB%26RelayState%3dvsZGiZNcXcyXm1i8hkySocDdGH60lhld1fVQGn_2ofk%2ejXUZjNp1OqA%2ehttps$%3A$%2F$%2Fsso-dev%2epathfinder%2egov%2ebc%2eca$%2Fauth$%2Frealms$%2Fjsgbqlip%26SMPORTALURL%3dhttps$%3A$%2F$%2Fsfstest7%2egov%2ebc%2eca$%2Faffwebservices$%2Fpublic$%2Fsaml2sso')
            .pause(5000)
            .source((result) => {
                console.log(result.value);
            })
            .end();
    },

};