const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const glob = require('glob');
const path = require('path');

module.exports = {
  configureWebpack: {
    performance: {
      hints: false
    },
    plugins: [
      new PurgecssPlugin({
        paths: glob.sync([
          path.join(__dirname, './public/index.html'),
          path.join(__dirname, './**/*.vue'),
          path.join(__dirname, '../node_modules/vuetify/src/**/*.js'),
        ])
      })
    ],
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 250000
      }
    },
  },
  build: {
    transpile: ['vuetify/lib'],
    plugins: [new VuetifyLoaderPlugin()]
  },
  transpileDependencies:['vuetify'],
  // When running in VueCLI development mode (npm run serve) proxy calls through the intended backend API route
  // To override, see .env.development file
  devServer: {
    proxy: {
    // Using reduce syntax to represent multiple mount points
    // https://github.com/vuejs/vue-cli/issues/2285#issuecomment-462061125
      ...['/api', '/getok/api'].reduce(
        (acc, ctx) => ({
          ...acc,
          [ctx]: {
            target: process.env.VUE_APP_API_ROOT,
            changeOrigin: true,
            ws: false
          }
        }),
        {}
      ),
      ...['/'].reduce(
        (acc, ctx) => ({
          ...acc,
          [ctx]: {
            target: 'http://localhost:8080'
          }
        }),
        {}
      )
    }
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/'
    : '/test/'
};
