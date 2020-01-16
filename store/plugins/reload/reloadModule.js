import Vue from "vue";
export default {
  namespaced: false,
  state: {
    isShouldReloadRoutes: {} // 用来统一存储所有的异步请求loading状态
  },
  mutations: {
    createIsShouldReloadRoutes(state, payload) {
      let { routes } = payload;
      if (typeof routes === "string") {
        if (routes.startsWith("/")) {
          routes = routes.substring(1);
        }
        Vue.set(state.isShouldReloadRoutes, routes, true);
      }
      if (Array.isArray(routes)) {
        routes.forEach(route => {
          if (route.startsWith("/")) {
            route = route.substring(1);
          }
          Vue.set(state.isShouldReloadRoutes, route, true);
        });
      }
    },
    removeIsShouldReloadRoutes(state, payload) {
      const { currentRoute } = payload;
      if (state.isShouldReloadRoutes.hasOwnProperty(currentRoute)) {
        state.isShouldReloadRoutes[currentRoute] = undefined; // 释放
        delete state.isShouldReloadRoutes[currentRoute];
      }
    }
  },
  getters: {
    $$isShouldReloadRoutes(state) {
      return state.isShouldReloadRoutes;
    }
  }
};
