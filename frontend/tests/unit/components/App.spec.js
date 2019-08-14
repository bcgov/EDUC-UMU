import { mount, createLocalVue } from '@vue/test-utils';
//import Vuetify from 'vuetify';
import VueRouter from 'vue-router';
import App from '@/App.vue';
import Vuex from 'vuex';
import Vue from 'vue';

describe('App.vue', () => {
    let wrapper;
    let getters;
    let store;

    beforeEach(() => {
        getters = {
            isAuthenticated: () => 'false'
        };
        store = new Vuex.Store({
            getters
        });
    
        const router = new VueRouter();
        wrapper = mount(App, {
            Vue,
            store,
            router
        });
    });

    test('app exists', () => {
        expect(wrapper).toBeTruthy();
    });
});
