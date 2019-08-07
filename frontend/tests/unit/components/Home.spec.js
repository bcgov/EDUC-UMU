import { mount } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Vue from 'vue';
import Vuex from 'vuex';
import Home from '../../../src/components/Home.vue';

describe('Home.vue', () => {
  let getters;
  let actions;
  let store;
  let wrapper;
  
  beforeEach(() => {

    Vue.use(Vuetify);
    Vue.use(Vuex);

    getters = {
      isAuthenticated: () => 'false'
    };

    store = new Vuex.Store({
      getters, actions
    });

    wrapper = mount(Home, {
      Vue,
      store
    });
  });

  it('not automatically logged in', () => {
    expect(wrapper.html()).toBe('<div class="container"><h1>Not Logged In</h1></div>');
  });

});
