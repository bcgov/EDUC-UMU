module.exports = {
  'default e2e tests' : (browser) => {
    browser
      .url("http://localhost:8080/")
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('.container')
      .end();
  },
};
