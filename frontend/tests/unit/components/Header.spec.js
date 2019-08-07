import { mount } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import Vue from 'vue';
import Header from '@/components/Header.vue';

describe('Header.vue', () => {
  let getters;
  let store;
  let wrapper;

  beforeEach(() => {
    Vue.use(Vuetify);
    Vue.use(Vuex);

    getters = {
      isAuthenticated: () => 'false'
    };

    store = new Vuex.Store({
      getters
    });

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
