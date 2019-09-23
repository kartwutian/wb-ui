import {delay, modelGenerate} from "../../../utils/helper";
import {
  login,
} from '../services/login'

export default modelGenerate({
  state: {

  },
  actions: {
    async delayChange({commit}, payload){
      await delay(2);
      commit('updateShallowState', payload)
    },
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
        url: '/pages/saler/index/home'
      });
      return res;
    },
  }
});

