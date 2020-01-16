import { delay } from "../utils/helper";

export default {
  async updateName({ commit }, payload) {
    // 第一个参数为上下文环境
    try {
      await delay(payload);
      commit("updateState", {
        name: "hello updated vuex"
      });
    } catch (e) {
      console.dir(e);
    }
  }
};
