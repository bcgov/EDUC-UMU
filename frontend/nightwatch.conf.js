const chrome = require('chromedriver');
const gecko = require('geckodriver');

module.exports = {
    "src_folders": ["./tests/e2e/specs"],

    "webdriver": {
        "start_process": true,
        "server_path": chrome.path,
        "port": 4444
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
            "webdriver": {
                "start_process": true,
                "server_path": gecko.path,
                "port": 9515
            },
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