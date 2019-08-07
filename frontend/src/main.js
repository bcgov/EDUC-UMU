import Vue from 'vue';
import vuetify from '@/plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store';

const vuetifyOptions = {};
Vue.use(Vuetify)

new Vue({
  vuetify: new Vuetify(vuetifyOptions),
  router,
  store,
  render: h => h(App)
}).$mount('#app');
