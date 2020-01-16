import reloadModule from "./reloadModule";
import Vue from "vue";
const reloadPlugin = async store => {
  store.registerModule("$$reload", reloadModule);

  const dispatch = store.dispatch;
  const { $$isShouldReloadRoutes } = store.getters;
  // 在vue的实例上扩展一个方法，返回是否需要刷新页面的布尔值
  if (!Vue.prototype.$$isNeedReload) {
    Vue.prototype.$$isNeedReload = function() {
      const pages = getCurrentPages();
      let currentRoute = pages[pages.length - 1].route;
      if (currentRoute.startsWith("/")) {
        currentRoute = currentRoute.substring(1);
      }
      if ($$isShouldReloadRoutes[currentRoute]) {
        return true;
      }
      return false;
    };
  }

  store.dispatch = async (...args) => {
    try {
      return await dispatch(...args);
    } catch (e) {
      throw e;
    } finally {
      // debugger
      if (Object.keys($$isShouldReloadRoutes).length !== 0) {
        const pages = getCurrentPages();
        // console.log(pages)
        store.commit("removeIsShouldReloadRoutes", {
          currentRoute: pages[pages.length - 1].route
        });
      }
    }
  };
};

export default reloadPlugin;
