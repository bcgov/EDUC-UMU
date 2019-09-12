import Vue from 'vue';
import Vuex from 'vuex';
import auth from '@/store/modules/auth.js';
import userActions from '@/store/modules/userActions.js';
import roleActions from '@/store/modules/roleActions.js';
import proxyActions from '@/store/modules/proxyActions.js';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { auth, userActions, roleActions, proxyActions }
});
