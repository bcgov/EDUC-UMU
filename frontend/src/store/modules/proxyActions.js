import ApiService from '@/common/apiService';

export default {
    namespaced: true,
    state: {
        proxy: null,
        proxyAdd: null,
        proxyUpdate: null,
        proxyDelete: null
    },
    getters: {
        proxy: state => state.proxy,
        addMessage: state => state.proxyAdd,
        updateMessage: state => state.proxyUpdate,
        deleteMessage: state => state.proxyDelete
    },
    mutations: {
        setProxy: (state, proxyRes) => {
            state.proxy = proxyRes;
        },
        addProxy: (state, proxyRes) => {
            state.proxyAdd = proxyRes
        },
        updateProxy: (state, proxyRes) => {
            state.proxyUpdate = proxyRes;
        },
        deleteProxy: (state, proxyRes) => {
            state.proxyDelete = proxyRes;
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
        },
        async deleteProxy(context, info){
            try {
                const response = await ApiService.deleteProxy(info);
                context.commit('deleteProxy', response);
            } catch(e) {
                context.commit('deleteProxy', e);
            }
        }
    }
}