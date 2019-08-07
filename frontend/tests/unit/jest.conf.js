const path = require('path');

module.exports =  {
  rootDir: path.resolve(__dirname, '../../'),
  clearMocks: true,
  setupFiles: [
    '<rootDir>/tests/unit/setup.js',
    '<rootDir>/node_modules/regenerator-runtime/runtime'
  ],
  moduleFileExtensions: [
    'js',
    'json',
    'vue',
    'jsx'
  ],
  transform: {
    '.*\\.(vue)$': 'vue-jest',
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '^.+\\.jsx?$': 'babel-jest'
  },
  transformIgnorePatterns: [
    '/node_modules/'
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  snapshotSerializers: [
    'jest-serializer-vue'
  ],
  testMatch: [
    '**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)'
  ],
  testURL: 'http://localhost/',
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname'
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,vue}',
    '!src/main.js',
    '!src/plugins/*.*'
  ],
  testResultsProcessor: 'jest-sonar-reporter'
};