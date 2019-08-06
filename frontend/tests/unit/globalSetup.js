global.originalLogError = global.console.error; 

global.console.error = (...args) => {
  if (args[0].includes('[Vuetify]') && args[0].includes('https://github.com/vuetifyjs/vuetify/issues/4068')) return;
  global.originalLogError(...args);
};
