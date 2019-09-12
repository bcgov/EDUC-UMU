import { shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import Users from '@/components/UserTable.vue';
import auth from '@/store/modules/auth.js';
import database from '@/store/modules/database.js'

describe('UserTable.vue', () => {
    let wrapper;
    let store;
    
    beforeEach(() => {
        Vue.use(Vuetify);
        Vue.use(Vuex);

        store = new Vuex.Store({
            modules: { auth, database }
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