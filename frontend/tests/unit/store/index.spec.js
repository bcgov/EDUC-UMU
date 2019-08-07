import { createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Vue from 'vue';
import indexStore from '@/store/index';

test('index loads and exists', () => {
  Vue.use(Vuex);
  expect(indexStore).toBeTruthy();
});
