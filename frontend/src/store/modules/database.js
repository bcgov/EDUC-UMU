import ApiService from '@/common/apiService';

export default {
    namespaced: true,
    state: {
        getUsers: null,
        users: {}
    },
    getters: {
        users: state => state.users
    },
    mutations: {
        setUsers: (state, userRes) => {
            state.users = userRes;
        }
    },
    actions: {
        async getUsers(context){
            context.commit('setUsers', null);
            try {
                const response = await ApiService.getUsers();
                context.commit('setUsers', response);
            } catch(e) {
                context.commit('setUsers', e);
            }
        }
    }
}