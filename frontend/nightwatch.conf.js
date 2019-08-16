const chromedriver = require('chromedriver');
const gecko = require('geckodriver');
const selenium = require('selenium-server');

module.exports = {
    src_folders: ['tests/e2e/specs'],
    output_folder: 'tests/e2e/reports',
    custom_assertions_path: ['tests/e2e/custom-assertions'],

    selenium: {
        start_process: true,
        server_path: selenium.path,
        host: 'localhost',
        port: 4444,
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
                acceptInsecureCerts: true,
                alwaysMatch: {
                    "moz:firefoxOptions": {
                        args: ['-headless']
                    }
                }
            }
        }

    }
};