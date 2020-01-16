import config from "../config/config.js";
import { delay, setToken, getToken, removeToken } from "./helper";

export const CODE_SUCCESS = "1000"; // 成功的状态码
export const TOKEN_ERROR = "1011"; // TOKEN 失效
const MSG_KEY = "message"; // 错误提示的字段
const codeMessage = {
  200: "服务器成功返回请求的数据。",
  201: "新建或修改数据成功。",
  202: "一个请求已经进入后台排队（异步任务）。",
  204: "删除数据成功。",
  400: "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
  401: "用户没有权限（令牌、用户名、密码错误）。",
  403: "用户得到授权，但是访问是被禁止的。",
  404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
  406: "请求的格式不可得。",
  410: "请求的资源被永久删除，且不会再得到的。",
  422: "当创建一个对象时，发生一个验证错误。",
  500: "服务器发生错误，请检查服务器。",
  502: "网关错误。",
  503: "服务不可用，服务器暂时过载或维护。",
  504: "网关超时。"
};

let networkType;

uni.getNetworkType({
  success(res) {
    networkType = res.networkType;
  }
});

uni.onNetworkStatusChange(res => {
  networkType = res.networkType;
});

/**
 * @param {object} options
 * object: {
 *   @param {string} method
 *   @param {any} data
 *   @param {object} header
 * }
 * @param {boolean} isUseDefaultErrorTip 是否使用默认错误提示
 */
export default function request(
  url,
  options = {
    headers: {}
  },
  isUseDefaultErrorTip = true
) {
  return new Promise((resolve, reject) => {
    if (networkType === "none") {
      uni.showToast({
        title: "无法连接到网络，请确保网络环境正常",
        icon: "none"
      });
      return reject({
        [MSG_KEY]: "无法连接到网络，请确保网络环境正常"
      });
    }

    let pages = getCurrentPages();
    if (!(pages.length === 1 && pages[0].route === "pages/login/index")) {
      options.headers = {
        ...options.headers,
        AuthorizationApp: (() => {
          const $$token = getToken();
          return $$token;
        })()
      };
    }
    if (url.indexOf("http") !== 0) {
      url = config.domain + url;
    }
    // console.log(url);
    uni.request({
      url: url,
      method: options.method,
      data: options.data,
      header: {
        "content-type": "application/json", // 默认值
        ...options.headers
      },
      async success(res) {
        // 正常所有请求都会走到这里，包括404， 500等
        if (res.statusCode !== 200) {
          isUseDefaultErrorTip &&
            uni.showToast({
              title: codeMessage[res.statusCode] || "系统错误",
              icon: "none"
            });
          await delay(1);
          return reject({
            ...res,
            message: codeMessage[res.statusCode] // 保证所有错误都有message字段
          });
        }

        // 特殊处理未登录错误
        if (res.data.code && res.data.code === TOKEN_ERROR) {
          removeToken();
          uni.showToast({
            title: res.data.AppMsg || "请先登录",
            icon: "none"
          });
          await delay(0.5);
          uni.reLaunch({
            url: "/pages/saler/login/index"
          });
          return reject(res.data);
        }

        // 处理后台捕获的错误
        if (res.data.code !== CODE_SUCCESS) {
          isUseDefaultErrorTip &&
            uni.showToast({
              title: res.data[MSG_KEY] || "系统错误",
              icon: "none"
            });
          await delay(1);
          return reject(res.data);
        }
        // 如果响应头有x-auth-token字段返回，把返回值存为token
        if (res.header["x-auth-token"]) {
          setToken(res.header["x-auth-token"]);
        }
        // 处理正常逻辑
        return resolve(res.data);
      },
      fail(err) {
        return reject(err);
      }
    });
  });
}
