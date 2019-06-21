import Vue from 'vue';
import Vuex from 'vuex';
import auth from '@/store/modules/auth.js';
import configForm from '@/store/modules/configForm.js';
import checks from '@/store/modules/checks.js';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { auth, configForm, checks }
});