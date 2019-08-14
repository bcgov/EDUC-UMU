import { shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import Roles from '@/components/ApplicationRoles.vue';
import auth from '@/store/modules/auth.js';


describe('ApplicationRoles.vue', () => {
    let wrapper;
    let store;
    
    beforeEach(() => {
        Vue.use(Vuetify);
        Vue.use(Vuex);

        store = new Vuex.Store({
            modules: { auth }
        });
        wrapper = shallowMount(Roles, {
            Vue,
            store
        });
    });

    test('should contain table', () => {
        expect(wrapper.html()).toContain('<v-data-table-stub');
    });
    test('should execute functions', () => {
        //wrapper.vm.validate();
        //wrapper.vm.getRoles();
        wrapper.vm.updateRoleForm('test', 'test');
        wrapper.vm.addRole();
        wrapper.vm.deleteRole();
        expect(wrapper).toBeTruthy();
    });
});