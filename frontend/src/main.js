import Vue from 'vue';
import vuetify from '@/plugins/vuetify';
import 'babel-polyfill';
import App from './App.vue';
import router from './router';
import store from './store';

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app');
