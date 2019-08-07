import Vue from 'vue';
import vuetify from '@/plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store';

const vuetifyOptions = {};
Vue.use(vuetify);

new Vue({
  vuetify: new vuetify(vuetifyOptions),
  router,
  store,
  render: h => h(App)
}).$mount('#app');
