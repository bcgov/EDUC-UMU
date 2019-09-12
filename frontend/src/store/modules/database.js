import ApiService from '@/common/apiService';

export default {
    namespaced: true,
    state: {
        users: null,
        userAdd: null,
        userUpdate: null
    },
    getters: {
        users: state => state.users,
        addMessage: state => state.userAdd,
        updateMessage: state => state.userUpdate
    },
    mutations: {
        setUsers: (state, userRes) => {
            state.users = userRes;
        },
        addUser: (state, userRes) => {
            state.userAdd = userRes
        },
        updateUser: (state, userRes) => {
            state.userUpdate = userRes;
        }
    },
    actions: {
        async getUsers(context){
            return new Promise((resolve, reject) => {
                context.commit('setUsers', null);
                try {
                    const response = await ApiService.getUsers();
                    context.commit('setUsers', response);
                    resolve(reponse);
                } catch(e) {
                    context.commit('setUsers', e);
                    reject(e);
                }
            })
        },
        async addUser(context, info){
            context.commit('addUser', null);
            try {
                const response = await ApiService.addUser(info);
                context.commit('userAdd', response);
            } catch(e) {
                context.commit('userAdd', e);
            }
        },
        async updateUser(context, info){
            context.commit('updateUser', null);
            try {
                const response = await ApiService.updateUser(info);
                context.commit('updateUser', response);
            } catch(e) {
                context.commit('updateUser', e);
            }
        }
    }
}
