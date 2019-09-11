import Vue from 'vue';
import Vuex from 'vuex';
import auth from '@/store/modules/auth.js';
import database from '@/store/modules/database.js';
Vue.use(Vuex);

export default new Vuex.Store({
  modules: { auth, database }
});
