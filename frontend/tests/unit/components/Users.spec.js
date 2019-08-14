import { shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import Users from '@/components/UserTable.vue';
import auth from '@/store/modules/auth.js';
import db from '@/store/modules/db.js';

describe('UserTable.vue', () => {
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
        expect(wrapper.html()).toContain('<v-data-table-stub');
    });

    test('should execute functions', () => {
        //wrapper.vm.validate();
        //wrapper.vm.getItems();
        wrapper.vm.addUser();
        wrapper.vm.updateUserForm('test', 'test', 'test', 'test', 'test', 'test');
        wrapper.vm.deleteUser();
        expect(wrapper).toBeTruthy();
    });

});