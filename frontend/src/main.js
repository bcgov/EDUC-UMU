import Vue from 'vue';
import vuetify from '@/plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store';

if('serviceWorker' in navigator) {
  navigator.serviceWorker.register('../public/service-worker.js');
};

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app');
