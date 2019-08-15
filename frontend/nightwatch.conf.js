const chrome = require('chromedriver');
const gecko = require('geckodriver');

module.exports = {
    "src_folders": ["./tests/e2e/specs"],

    "selenium": {
        "start_process": true,
        "server_path": "./node_modules/selenium-server-standalone-jar/jar/selenium-server-standalone-3.141.59.jar",
        "log_path": "",
        "port": 4444,
        "cli_args": {
            "webdriver.chrome.driver": chrome.path,
            "webdriver.gecko.driver": gecko.path
        }
    },

    "test_settings": {
        "chrome": {
            "silent": true,
            "desiredCapabilities": {
                "browserName": "chrome",
                "javascriptEnabled": true,
                "acceptSslCerts": true,
                "acceptInsecureCerts": true,
                "webStorageEnabled": true,
                "chromeOptions": {
                    "args": ["--headless", "--disable-gpu", "window-size=1920,1080", "no-sandbox", "ignore-certificate-errors"]
                }
            }
        },
        "firefox": {
            "silent": true,
            "desiredCapabilities": {
                "browserName": "firefox",
                "alwaysMatch": {
                    "moz:firefoxOptions": {
                        "args": ["-headless"]
                    }
                }
            }
        }
    }
}