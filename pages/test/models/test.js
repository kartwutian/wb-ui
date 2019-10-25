import {delay, modelGenerate} from "../../../utils/helper";
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
    
    
    async login({commit}, {payload}){
      const res = await login(payload);
      return res.data;
    },
    
    async signOut({commit}, {payload}){
      const res = await signOut(payload);
      return res.data;
    },
    
  },
  getters: {

  }
});
