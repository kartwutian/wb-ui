import {delay, modelGenerate} from '../../../utils/helper';
import {
  login,
  signOut,
  } from '../services/test'

export default modelGenerate({
  state: {

  },
  mutations: {
    /**
     * @param {Object} state
     * @param {Object} payload
     */
    update(state, payload) {

    },

  },
  actions: {
    
    
    // 小程序登录
    async login({commit}, {payload}){
      const res = await login(payload);
      return res.data;
    },
    
    // 退出登录
    async signOut({commit}, {payload}){
      const res = await signOut(payload);
      return res.data;
    },
    
  },
  getters: {

  }
});
