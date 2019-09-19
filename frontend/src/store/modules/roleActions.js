import ApiService from '@/common/apiService';

export default {
    namespaced: true,
    state: {
        roles: null,
        addError: true,
        updateError: true,
        deleteError: true
    },
    getters: {
        roles: state => state.roles,
        roleAddError: state => state.addError,
        roleUpdateError: state => state.updateError,
        roleDeleteError: state => state.deleteError
    },
    mutations: {
        setRoles: (state, roleRes) => {
            state.roles = roleRes;
        },
        addRole: (state, roleRes) => {
            state.addError = roleRes
        },
        updateRole: (state, roleRes) => {
            state.updateError = roleRes;
        },
        deleteRole: (state, roleRes) => {
            state.deleteError = roleRes;
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
                context.commit('addRole', response);
            } catch(e) {
                context.commit('addRole', e);
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
        },
        async deleteRole(context, info){
            context.commit('deleteRole', null);
            try {
                const response = await ApiService.deleteRole(info);
                context.commit('deleteRole', response);
            } catch(e) {
                context.commit('deleteRole', e);
            }
        }
    }
}