import Vue from 'vue';
import vuetify from '@/plugins/vuetify';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import App from './App.vue';
import router from './router';
import store from './store';

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app');
