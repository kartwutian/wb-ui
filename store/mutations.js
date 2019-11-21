import Vue from 'vue'
import {resetState} from "../utils/helper";

export default {

  /**
   * 按payload更新state的值
   * @param {Object} state
   * @param {Object} payload
   */
  updateState(state, payload) {
    let realPayload = payload;
    if(payload.payload){
      realPayload = payload.payload
    }
    Object.keys(realPayload).forEach(key => {
      resetState(state[key], realPayload)
    })
  },
};
