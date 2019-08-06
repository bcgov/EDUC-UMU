import { mount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import Header from '@/components/Header.vue';

describe('Header.vue', () => {
  let getters;
  let store;
  let wrapper;

  beforeEach(() => {
    const localVue = createLocalVue();

    localVue.use(Vuetify);
    localVue.use(Vuex);

    getters = {
      isAuthenticated: () => 'false'
    };

    store = new Vuex.Store({
      getters
    });

    wrapper = mount(Header, {
      localVue,
      store
    });
  });
/*
  if('has login button', () => {
      expect(wrapper.html()).toContain('')
  })
*/
  it('has app title', () => {
    expect(wrapper.html()).toContain('User Management Utility');
  });

});