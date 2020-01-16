import loadingModule from "./loadingModule";
const loadingPlugin = async store => {
  store.registerModule("$$loading", loadingModule);
  const dispatch = store.dispatch;
  store.dispatch = async (...args) => {
    store.commit("$$updateLoading", {
      loading: true,
      actionName: args[0]
    });
    try {
      return await dispatch(...args);
    } catch (e) {
      throw e;
    } finally {
      // debugger
      store.commit("$$updateLoading", {
        loading: false,
        actionName: args[0]
      });
    }
  };
};

export default loadingPlugin;
