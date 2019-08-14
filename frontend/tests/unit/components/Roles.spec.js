import { shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import Roles from '@/components/ApplicationRoles.vue';

describe('Proxy.vue', () => {
    let wrapper;
    
    beforeEach(() => {
        Vue.use(Vuetify);

        wrapper = shallowMount(Roles, {
            Vue
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