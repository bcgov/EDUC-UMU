import { shallowMount } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import Vue from 'vue';
import Header from '@/components/Header.vue';
import auth from '@/store/modules/auth.js';
import db from '@/store/modules/db.js';

describe('Header.vue', () => {
    let wrapper;
    let store;

    beforeEach(() => {
        Vue.use(Vuetify);
        Vue.use(Vuex);

        getters = {
            isAuthenticated: () => 'false'
        };
        store = new Vuex.Store({
            modules: { auth, db }
        });

        wrapper = shallowMount(Header, {
            Vue: Vue,
            store
        });
    });

    test('expect site title', () => {
        expect(wrapper.html()).toContain('User Management Utility');
    });
    test('expect empty localStorage', () => {
        wrapper.vm.clearStorage();
        expect(wrapper).toBeTruthy();
    });
});