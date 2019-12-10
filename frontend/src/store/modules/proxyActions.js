import ApiService from '@/common/apiService';

export default {
  namespaced: true,
  state: {
    proxy: null,
    addError: false,
    updateError: false,
    deleteError: false
  },
  getters: {
    proxy: state => state.proxy,
    proxyAddError: state => state.addError,
    proxyUpdateError: state => state.updateError,
    proxyDeleteError: state => state.deleteError
  },
  mutations: {
    setProxy: (state, proxyRes) => {
      state.proxy = proxyRes;
    },
    addProxy: (state, proxyRes) => {
      state.addError = proxyRes;
    },
    updateProxy: (state, proxyRes) => {
      state.updateError = proxyRes;
    },
    deleteProxy: (state, proxyRes) => {
      state.deleteError = proxyRes;
    }
  },
  actions: {
    async getProxy(context){
      context.commit('setProxy', null);
      try {
        const response = await ApiService.getProxy();
        console.log(response);
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
        context.commit('addProxy', response);
      } catch(e) {
        context.commit('addProxy', true);
      }
    },
    async updateProxy(context, info){
      context.commit('updateProxy', null);
      try {
        const response = await ApiService.updateProxy(info);
        context.commit('updateProxy', response);
      } catch(e) {
        context.commit('updateProxy', true);
      }
    },
    async deleteProxy(context, info){
      try {
        const response = await ApiService.deleteProxy(info);
        context.commit('deleteProxy', response);
      } catch(e) {
        context.commit('deleteProxy', true);
      }
    }
  }
};
