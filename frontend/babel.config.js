module.exports = {
    entry: ['babel-polyfill', './src/main.js'],
    presets: [
      '@vue/app',
      '@babel/preset-env'
    ]
  };