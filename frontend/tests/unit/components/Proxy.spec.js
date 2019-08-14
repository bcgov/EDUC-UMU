import { shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import Proxy from '@/components/ProxyTable.vue';
import auth from '@/store/modules/auth.js';
import db from '@/store/modules/db.js';

describe('Proxy.vue', () => {
    let wrapper;
    
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
        wrapper = shallowMount(Proxy, {
            Vue,
            store
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