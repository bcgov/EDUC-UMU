const chromedriver = require('chromedriver');
const gecko = require('geckodriver');

module.exports = {
    selenium: {
        start_process: true,
        cli_args: {
            'webdriver.chrome.driver': chromedriver.path,
            'webdriver.gecko.driver': gecko.path
        }
    },

    test_settings: {
        default: {
            selenium_port: 4444,
            selenium_host: 'localhost',
            silent: true
        },
        chrome: {
            desiredCapabilities: {
                browserName: 'chrome',
                javascripeEnabled: true,
                acceptSslCerts: true,
                chromeOptions: {
                    args: ['--headless', '--disable-gpu']
                }
            }
        },
        firefox: {
            desiredCapabilities: {
                browserName: 'firefox',
                acceptInsecureCerts: true
            }
        }
    }
};