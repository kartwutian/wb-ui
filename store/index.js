import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import * as getters from './getters';
import state from './state';
import mutations from './mutations';
import login from './modules/saler/login';
import tabbar from '../pages/tabbar/models/tabbar';
import home from '../pages/index/models/home';
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
    home,
    tabbar,
  },
});
