import { shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import Vuetify from 'vuetify';
import Proxy from '@/components/ProxyTable.vue';

describe('Proxy.vue', () => {
    let wrapper;
    
    beforeEach(() => {
        Vue.use(Vuetify);

        wrapper = shallowMount(Proxy, {
            Vue
        });
    });

    test('should contain table', () => {
        expect(wrapper.html()).toContain('<div class="v-data-table theme--light">');
    });
    test('should exectue functions', async () => {
        wrapper.vm.validate();
        wrapper.vm.getProxy();
        wrapper.vm.updateProxyForm('test', 'test', 'test');
        wrapper.vm.addProxy();
        wrapper.vm.deleteProxy();
        expect(wrapper).toBeTruthy();
    })
});