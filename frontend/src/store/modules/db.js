import ApiService from '@/common/apiService';

export default {
    namespaced: true,
    state: {
        users: null
    },
    getters: {
    },
    mutations: {
        getUsers: (state, value) => {
            state.users = value;
        }
    },
    actions: {
        async getUsers(context) {
            context.commit('getUsers', null);
            try {
                const response = await ApiService.getUsers();
                context.commit('getUsers', response);
            } catch (e) {
                context.commit('getUsers', e);
            }
        }
    }
};