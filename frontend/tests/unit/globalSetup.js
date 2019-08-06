//Handles a known error with Vuetify

const logError = console.error; // eslint-disable-line no-console
console.error = (...args) => { // eslint-disable-line no-console
  if (
    args[0].includes('[Vuetify]') &&
    args[0].includes('https://github.com/vuetifyjs/vuetify/issues/4068')
  )
  return;
  logError(...args);
};
