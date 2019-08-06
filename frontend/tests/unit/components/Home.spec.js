import { mount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import Home from '@/components/Home.vue';

describe('Home.vue', () => {
  let getters;
  let actions;
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
      getters, actions
    });

    wrapper = mount(Home, {
      localVue,
      store
    });
  });

  it('not automatically logged in', () => {
    expect(wrapper.html()).toBe('<div class="container"><h1>Not Logged In</h1></div>');
  });

});
