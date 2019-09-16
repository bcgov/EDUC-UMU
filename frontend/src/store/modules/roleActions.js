import ApiService from '@/common/apiService';

export default {
    namespaced: true,
    state: {
        roles: null,
        roleAdd: null,
        roleUpdate: null
    },
    getters: {
        users: state => state.roles,
        addMessage: state => state.roleAdd,
        updateMessage: state => state.roleUpdate
    },
    mutations: {
        setRoles: (state, roleRes) => {
            state.roles = roleRes;
        },
        addRole: (state, roleRes) => {
            state.roleAdd = roleRes
        },
        updateRole: (state, roleRes) => {
            state.roleUpdate = roleRes;
        }
    },
    actions: {
        async getRoles(context){
            context.commit('setRoles', null);
            try {
                const response = await ApiService.getRoles();
                context.commit('setRoles', response);
                return response;
            } catch(e) {
                context.commit('setRoles', e);
                return e;
            }
        },
        async addRole(context, info){
            context.commit('addRole', null);
            try {
                const response = await ApiService.addRole(info);
                context.commit('roleAdd', response);
            } catch(e) {
                context.commit('roleAdd', e);
            }
        },
        async updateRole(context, info){
            context.commit('updateRole', null);
            try {
                const response = await ApiService.updateRole(info);
                context.commit('updateRole', response);
            } catch(e) {
                context.commit('updateRole', e);
            }
        }
    }
}