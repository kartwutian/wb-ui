import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import * as getters from './getters';
import state from './state';
import mutations from './mutations';
import login from './modules/saler/login';
import loadingPlugin from "./plugins/loading/loadingPlugin";

Vue.use(Vuex);
export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  plugins: [loadingPlugin],
  modules: {
    login,
  },
});
