import { delay, modelGenerate } from "../../../utils/helper";
import { postTest } from "../services/home";

export default modelGenerate({
  state: {},
  mutations: {
    /**
     * @param {Object} state
     * @param {Object} payload
     */
    update(state, payload) {}
  },
  actions: {
    async query({ commit }, payload) {
      await delay(2);
      await postTest(payload);
    }
  },
  getters: {}
});
