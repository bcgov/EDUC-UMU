import { mount } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import App from '../../../src/App.vue';
import Vuex from 'vuex';

describe('App.vue', () => {
  let wrapper;
  let getters;
  let store;

  beforeEach(() => {
    Vue.use(Vuetify);
    Vue.use(Vuex);
    Vue.use(VueRouter);
    getters = {
      isAuthenticated: () => 'false'
    };

    store = new Vuex.Store({
      getters
    });

    const router = new VueRouter();
    wrapper = mount(App, {
      Vue,
      store,
      router
    });
  });

  //ensure we are able to create something from our App.vue file
  it('exists', () => {
    expect(wrapper).toBeTruthy();
  });
});
