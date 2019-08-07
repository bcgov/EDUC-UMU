module.exports = {
  'default e2e tests' : (browser) => {
    browser
      .url(process.env.HOST_ROUTE)
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('.container')
      .end();
  },
};
