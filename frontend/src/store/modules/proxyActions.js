import ApiService from '@/common/apiService';

export default {
    namespaced: true,
    state: {
        proxy: null,
        proxyAdd: null,
        proxyUpdate: null
    },
    getters: {
        proxy: state => state.proxy,
        addMessage: state => state.proxyAdd,
        updateMessage: state => state.proxyUpdate
    },
    mutations: {
        setProxy: (state, proxyRes) => {
            state.proxy = proxyRes;
        },
        addProxy: (state, proxyRes) => {
            state.proxyAdd = proxyRes
        },
        updateProxt: (state, proxyRes) => {
            state.rproxyUpdate = proxyRes;
        }
    },
    actions: {
        async getProxy(context){
            context.commit('setProxy', null);
            try {
                const response = await ApiService.getProxy();
                context.commit('setProxy', response);
                return response;
            } catch(e) {
                context.commit('setProxy', e);
                return e;
            }
        },
        async addProxy(context, info){
            context.commit('addProxy', null);
            try {
                const response = await ApiService.addProxy(info);
                context.commit('proxyAdd', response);
            } catch(e) {
                context.commit('proxyAdd', e);
            }
        },
        async updateProxy(context, info){
            context.commit('updateProxy', null);
            try {
                const response = await ApiService.updateProxy(info);
                context.commit('updateProxy', response);
            } catch(e) {
                context.commit('updateProxy', e);
            }
        }
    }
}