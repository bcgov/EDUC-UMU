import { mount } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import Vue from 'vue';
import Header from '../../../src/components/Header.vue';
import indexStore from '../../../src/store/index';

describe('Header.vue', () => {
  let wrapper;

  beforeEach(() => {
    Vue.use(Vuetify);
    Vue.use(Vuex);

    getters = {
      isAuthenticated: () => 'false'
    };

    wrapper = mount(Header, {
      Vue,
      indexStore
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
