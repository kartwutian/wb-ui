import Vue from 'vue'

export default {

  /**
   * 浅更新，只改变一级状态
   * @param {Object} state
   * @param {Object} payload
   */
  updateShallowState(state, payload) {
    Object.keys(payload).forEach(key => {
      state[key] = payload[key]
    })
  },
};
