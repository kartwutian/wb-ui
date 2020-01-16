import Vue from "vue";
export default {
  namespaced: false,
  state: {
    actions: {} // 用来统一存储所有的异步请求loading状态
  },
  mutations: {
    $$updateLoading(state, payload) {
      const actionName = payload.actionName.type || payload.actionName;
      Vue.set(state.actions, actionName, payload.loading);
    }
  },
  getters: {
    $$loading(state) {
      return state.actions;
    }
  }
};
