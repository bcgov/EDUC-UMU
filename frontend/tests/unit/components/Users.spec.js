import { shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import Users from '@/components/UserTable.vue';

describe('Proxy.vue', () => {
    let wrapper;
    
    beforeEach(() => {
        Vue.use(Vuetify);

        wrapper = shallowMount(Users, {
            Vue
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