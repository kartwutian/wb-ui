import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import * as getters from './getters';
import state from './state';
import mutations from './mutations';
import loadingPlugin from "./plugins/loading/loadingPlugin";

import home from '../pages/home/models/home';
import tabbar from '../pages/tabbar/models/tabbar';
import login from '../pages/login/models/login';


Vue.use(Vuex);
export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  plugins: [loadingPlugin],
  modules: {
    home,
    tabbar,
    login,

  },
});
