import { mount } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import App from '../../../src/App.vue';
import Vuex from 'vuex';
import store from '../../../src/store/index';

describe('App.vue', () => {
  let wrapper;

  beforeEach(() => {
    Vue.use(Vuetify);
    Vue.use(Vuex);
    Vue.use(VueRouter);

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
