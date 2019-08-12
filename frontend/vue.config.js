module.exports = {
  transpileDependencies:[/node_modules[/\\\\]vuetify[/\\\\]/],
  // When running in VueCLI development mode (npm run serve) proxy calls through the intended backend API route
  // To override, see .env.development file
  devServer: {
    proxy: 'http://localhost:8080'
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/'
    : '/test/'
};
