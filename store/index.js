import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import * as getters from './getters';
import state from './state';
import mutations from './mutations';
import loadingPlugin from "./plugins/loading/loadingPlugin";

import home from '../pages/index/models/home';
import tabbar from '../pages/tabbar/models/tabbar';
import btn from '../pages/btn/models/btn';
import test from '../pages/test/models/test';


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
    btn,
    test,

  },
});
