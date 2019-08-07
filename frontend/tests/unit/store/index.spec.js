import Vuex from 'vuex';
import Vue from 'vue';
import indexStore from '../../../src/store/index';

test('index loads and exists', () => {
  Vue.use(Vuex);
  expect(indexStore).toBeTruthy();
});
