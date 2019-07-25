import Vue from 'vue';
import Vuex from 'vuex';
import auth from '@/store/modules/auth.js';
import db from '@/store/modules/db.js';
Vue.use(Vuex);

export default new Vuex.Store({
  modules: { auth, db }
});
