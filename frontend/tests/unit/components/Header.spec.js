import { mount } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import Vue from 'vue';
import Header from '../../../src/components/Header.vue';
import store from '../../../src/store/index';

describe('Header.vue', () => {
  let wrapper;

  beforeEach(() => {
    Vue.use(Vuetify);
    Vue.use(Vuex);

    wrapper = mount(Header, {
      Vue,
      store
    });
  });
  /*
  if('has login button', () => {
    expect(wrapper.html()).toContain('')
  })
  */

  //ensure the page title exists
  it('has app title', () => {
    expect(wrapper.html()).toContain('User Management Utility');
  });

});
