import ApiService from '@/common/apiService';

export default {
  namespaced: true,
  state: {
    users: null,
    addError: false,
    updateError: false,
    deleteError: false
  },
  getters: {
    users: state => state.users,
    userAddError: state => state.addError,
    userUpdateError: state => state.updateError,
    userDeleteError: state => state.deleteError
  },
  mutations: {
    setUsers: (state, userRes) => {
      state.users = userRes;
    },
    addUser: (state, userRes) => {
      state.addError = userRes;
    },
    updateUser: (state, userRes) => {
      state.updateError = userRes;
    },
    deleteUser: (state, userRes) => {
      state.deleteUser = userRes;
    }
  },
  actions: {
    async getUsers(context){
      context.commit('setUsers', null);
      try {
        const response = await ApiService.getUsers();
        console.log(response);
        context.commit('setUsers', response);
        return response;
      } catch(e) {
        context.commit('setUsers', e);
        return e;
      }
    },
    async addNewUser(context, info){
      context.commit('addUser', null);
      try {
        const response = await ApiService.addUser(info);
        context.commit('addUser', response);
      } catch(e) {
        context.commit('addUser', e);
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
    },
    async deleteUser(context, info){
      context.commit('deleteUser', null);
      try {
        const response = await ApiService.deleteUser(info);
        context.commit('deleteUser', response);
      } catch(e) {
        context.commit('deleteUser', e);
      }
    }
  }
};
