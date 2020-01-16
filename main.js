import Vue from "vue";
import App from "./App";
import store from "./store";
import VueI18n from "vue-i18n";
import messages from "./locales/index.js";
import { getUrl } from "./utils/helper";
import VantUni from "./components/vant";

Vue.use(VueI18n);
Vue.use(VantUni);
Vue.config.productionTip = false;

Vue.prototype.$store = store;

const i18n = new VueI18n({
  locale: "zh-CN",
  messages: messages
});

Vue.prototype._i18n = i18n;

// 扩展一个公用获取图片url的方法
Vue.prototype.$getUrl = getUrl;

App.mpType = "app";

const app = new Vue({
  store,
  i18n,
  ...App
});
app.$mount();
