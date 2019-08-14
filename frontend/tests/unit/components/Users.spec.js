import { shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import Users from '@/components/UserTable.vue';
import auth from '@/store/modules/auth.js';
import db from '@/store/modules/db.js';

describe('Proxy.vue', () => {
    let wrapper;
    let store;
    let getters;
    
    beforeEach(() => {
        Vue.use(Vuetify);
        Vue.use(Vuex);

        getters = {
            isAuthenticated: () => 'true'
        }

        store = new Vuex.Store({
            getters,
            modules: { auth, db }
        });
        
        wrapper = shallowMount(Users, {
            Vue,
            store
        });
    });

    test('should contain table', () => {
        expect(wrapper.html()).toContain('<div class="v-data-table theme--light">');
    });

    test('should execute functions', async () => {
        wrapper.vm.validate();
        wrapper.vm.getItems();
        wrapper.vm.addUser();
        wrapper.vm.updateUserForm('test', 'test', 'test', 'test', 'test', 'test');
        wrapper.vm.deleteUser();
        expect(wrapper).toBeTruthy();
    });

});