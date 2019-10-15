import reloadModule from './reloadModule'
const reloadPlugin = async store => {
  store.registerModule('$$reload', reloadModule);
  const dispatch = store.dispatch;
  const { $$isShouldReloadRoutes } = store.getters;
  store.dispatch = async (...args) => {
    try {
      return await dispatch(...args);
    } catch (e) {
      throw(e);
    } finally {
      // debugger
      if(Object.keys($$isShouldReloadRoutes).length !== 0){
        const pages = getCurrentPages();
        // console.log(pages)
        store.commit('removeIsShouldReloadRoutes', {
          currentRoute: pages[pages.length-1].route,
        });
      }
    }
  };
};

export default reloadPlugin;
