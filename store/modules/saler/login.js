import {
  login,
  logout
} from '../../../services/saler/login'

import {
  delay
} from "../../../utils/helper";

export default {
  namespaced: true,

  state: {

  },
  mutations: {

  },
  actions: {
    async login({ commit }, {payload}) {
      // 第一个参数为上下文环境
      const res = await login(payload);
      uni.setStorageSync('user_info', res.data);
      uni.showToast({
        title: '登录成功',
        icon: 'success',
      });
      await delay(.5);
      uni.reLaunch({
        url: '/pages/saler/index/index'
      });
      return res;
    },

  },
  getters: {

  }
};
