import utils from "./wxs/utils";

export default {
  install(Vue) {
    // 把vant的utils绑到vue实例上, vant uni-app的组件内部有使用该对象上的方法
    Vue.prototype.$utils = utils;
  }
};
