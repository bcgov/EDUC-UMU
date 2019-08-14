import { shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import Roles from '@/components/ApplicationRoles.vue';
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
        wrapper = shallowMount(Roles, {
            Vue,
            store
        });
    });

    test('should contain table', () => {
        expect(wrapper.html()).toContain('<div class="v-data-table theme--light">');
    });
    test('should execute functions', async () => {
        wrapper.vm.validate();
        wrapper.vm.getRoles();
        wrapper.vm.updateRoleForm('test', 'test');
        wrapper.vm.addRole();
        wrapper.vm.deleteRole();
        expect(wrapper).toBeTruthy();
    });
});