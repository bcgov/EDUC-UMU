import { mount } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Vue from 'vue';
import Vuex from 'vuex';
import Home from '../../../src/components/Home.vue';
import indexStore from '../../../src/store/index';

describe('Home.vue', () => {
  let wrapper;
  
  beforeEach(() => {

    Vue.use(Vuetify);
    Vue.use(Vuex);

    getters = {
      isAuthenticated: () => 'false'
    };

    wrapper = mount(Home, {
      Vue,
      indexStore
    });
  });

  it('not automatically logged in', () => {
    expect(wrapper.html()).toBe('<div class="container"><h1>Not Logged In</h1></div>');
  });

});
