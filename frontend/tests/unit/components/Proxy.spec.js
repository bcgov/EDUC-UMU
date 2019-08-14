import { shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import Proxy from '@/components/ProxyTable.vue';
import auth from '@/store/modules/auth.js';


describe('ProxyTable.vue', () => {
    let wrapper;
    let store;
    
    beforeEach(() => {
        Vue.use(Vuetify);
        Vue.use(Vuex);

        store = new Vuex.Store({
            modules: { auth }
        });
        wrapper = shallowMount(Proxy, {
            Vue,
            store
        });
    });

    test('should contain table', () => {
        expect(wrapper.html()).toContain('<v-data-table-stub');
    });
    test('should exectue functions', () => {
        //wrapper.vm.validate();
        //wrapper.vm.getProxy();
        wrapper.vm.updateProxyForm('test', 'test', 'test');
        wrapper.vm.addProxy();
        wrapper.vm.deleteProxy();
        expect(wrapper).toBeTruthy();
    })
});