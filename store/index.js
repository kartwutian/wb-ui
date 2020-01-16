import Vue from "vue";
import Vuex from "vuex";
import actions from "./actions";
import * as getters from "./getters";
import state from "./state";
import mutations from "./mutations";
import loadingPlugin from "./plugins/loading/loadingPlugin";
import reloadPlugin from "./plugins/reload/reloadPlugin";

import home from "../pages/home/models/home";

Vue.use(Vuex);
export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  plugins: [loadingPlugin, reloadPlugin],
  modules: {
    home
  }
});
