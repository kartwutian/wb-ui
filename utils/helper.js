import Vue from "vue";
import config from "../config/config";

/**
 * 通用延时函数
 * @param timeout
 * @returns {Promise<any>}
 */
export const delay = (timeout = 0.3) =>
  new Promise(resolve => setTimeout(resolve, timeout * 1000));

/**
 * 讲枚举数组转化为枚举对象
 * @param arr
 * @param options {key: 'key',val: 'name'}
 * @returns {{}}
 */
export const exchangeToEnum = (
  arr = [],
  options = {
    key: "id",
    val: "name"
  }
) => {
  if (!Array.isArray(arr)) {
    console.error("第一个参数必须为数组");
    return {};
  }
  return arr.reduce((result, item) => {
    result[item[options.key]] = item[options.val];
    return result;
  }, {});
};

/**
 * 通用loading包装,适用单一异常场景
 * @param fn // async函数
 * @returns {Promise<void>}
 */
export const commonLoading = async (fn, errorHandle) => {
  try {
    uni.showLoading({
      title: "加载中"
    });
    return await fn();
  } catch (e) {
    console.error(e);
    if (errorHandle) errorHandle(e);
  } finally {
    uni.hideLoading();
  }
};

/**
 * 通用error包装,适用单一异常场景
 * @param fn // async函数
 * @returns {Promise<void>}
 */
export const commonError = async fn => {
  try {
    await fn();
  } catch (e) {
    console.error(e);
  }
};

// token相关
const token_key = "app_token";
export function setToken(token) {
  uni.setStorageSync(token_key, token);
}

export function getToken() {
  return uni.getStorageSync(token_key) || "";
}

export function removeToken() {
  uni.clearStorageSync();
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
export function isObject(obj) {
  return obj !== null && typeof obj === "object";
}

export function isArray(obj) {
  return Array.isArray(obj);
}

export function isFuc(f) {
  return typeof f === "function";
}

/**
 *公用添加默认值的方法
 * @param data 对象 or 数组
 * @param defaultvalue 默认值（替换null和undefined）
 * @returns {Uint8Array | BigInt64Array | any[] | Float64Array | Int8Array | Float32Array | Int32Array | Uint32Array | Uint8ClampedArray | BigUint64Array | Int16Array | Uint16Array|{}|*}
 */
export function generateDefaultValue(data, defaultvalue = "--") {
  if (!isObject(data)) return data;
  const newData = new data.constructor();

  for (let key in Object.getOwnPropertyDescriptors(data)) {
    if (data[key] === null || data[key] === undefined || data[key] === "") {
      newData[key] = defaultvalue;
    } else {
      newData[key] = generateDefaultValue(data[key]);
    }
  }
  return newData;
}

/**
 * 深拷贝
 * @param data
 */
export function deepCopy(data) {
  if (!isObject(data)) return data;
  const newData = new data.constructor();

  for (let key in Object.getOwnPropertyDescriptors(data)) {
    newData[key] = deepCopy(data[key]);
  }
  return newData;
}

/**
 * 深度比较两个数是否相等
 * @param a
 * @param b
 * @returns {boolean}
 */
export function deepCompare(a, b) {
  if (!isObject(a) || !isObject(b)) {
    return a === b;
  }

  const propsA = Object.getOwnPropertyDescriptors(a);
  const propsB = Object.getOwnPropertyDescriptors(b);
  if (Object.keys(propsA).length !== Object.keys(propsB).length) {
    return false;
  }

  return Object.keys(propsA).every(key => deepCompare(a[key], b[key]));
}

/**
 * 用来合并a，b两个对象，会改变a的值
 * @param a
 * @param b
 * @param isWatch Boolean，是否监听变化，用于vue store等
 * @returns {*}
 */
export function deepCombine(a, b, isWatch = false) {
  if (!isObject(b)) {
    return b;
  }

  const propsB = Object.getOwnPropertyDescriptors(b);

  for (let key in propsB) {
    if (a[key] === undefined) {
      if (isWatch) {
        Vue.set(a, key, b[key]);
      } else {
        a[key] = b[key];
      }
    } else {
      a[key] = deepCombine(a[key], b[key], isWatch);
    }
  }
  return a;
}

/**
 * 用于深度合并，返回值为一个新的结果，不会改变传入参数
 * @param args
 * @returns {*}
 */
export function deepAssign(...args) {
  if (!args.length) return;
  if (args.length === 1) return deepCopy(...args);
  let result = {};
  for (let i = 0; i < args.length; i++) {
    deepCombine(result, args[i]);
  }
  return result;
}

/**
 * 重置状态，在原state上直接改变数值为initialState的值
 * @param state
 * @param initialState
 * @returns {*}
 */
export function resetState(state, initialState) {
  if (!isObject(state) || !isObject(initialState)) {
    return initialState;
  }
  const propsState = Object.getOwnPropertyDescriptors(state);

  for (let key in Object.getOwnPropertyDescriptors(propsState)) {
    if (initialState[key] === undefined) {
      delete state[key];
    } else {
      state[key] = resetState(state[key], initialState[key]);
    }
  }
  return state;
}

export function getUrl(url) {
  if (url.startsWith("/")) {
    return config.imageUrl + url;
  }
  return config + "/" + url;
}

export function validate(data, rules) {
  const res = {};
  Object.keys(rules).forEach(field => {
    for (let i = 0; i < rules[field].length; i++) {
      if (data[field] && !data[field].toString().match(rules[field][i].reg)) {
        res[field] = rules[field][i].msg; // 有错误，则赋值错误，跳出循环
        break;
      }
      res[field] = null; // 没有错误，则赋值为null
    }
  });
  return res;
}

export function fetchErrorMsg(data) {
  if (isArray(data)) {
    for (let i = 0; i < data.length; i++) {
      const errField = Object.keys(data[i]).filter(
        field => data[i][field] !== null
      );
      if (errField.length) {
        return data[i][errField[0]];
      }
    }
    return false;
  }
  const errField = Object.keys(data).filter(field => data[field] !== null);
  if (errField.length) {
    return data[errField[0]];
  }
  return false;
}

/**
 * 生成model
 * @param options
 * @returns {{mutations: (options.mutations|{}|{updateState(Object, Object): void, reset(*=): void}), state: *, getters: U, actions: (options.actions|{}), namespaced: boolean}}
 */
export const modelGenerate = (
  options = {
    namespaced: true,
    state: {},
    mutations: {},
    actions: {},
    getters: {}
  }
) => {
  const {
    namespaced,
    state: initialState,
    mutations,
    actions,
    getters
  } = options;
  return {
    namespaced: namespaced || true,

    state: {
      ...deepCopy(initialState)
    },
    mutations: {
      /**
       * 按payload更新state的值
       * @param {Object} state
       * @param {Object} payload
       */
      updateState(state, payload) {
        let realPayload = payload;
        if (payload.payload) {
          realPayload = payload.payload;
        }
        deepCombine(state, realPayload, true);
      },
      resetState(state) {
        // 重置state
        resetState(state, initialState);
      },
      ...mutations
    },
    actions: {
      ...actions
    },
    getters: gettersGenerate(initialState, getters)
  };
};

/**
 * 生成 getters
 * @param initialState
 * @param getters
 * @returns {U}
 */
export function gettersGenerate(initialState, getters) {
  const normalGetters = Object.keys(initialState).reduce((res, next) => {
    res[next] = function(state) {
      return state[next];
    };
    return res;
  }, {});
  return {
    ...normalGetters,
    ...getters
  };
}

/**
 *
 * @param options
 * @param enhancer   // 增强子, 增强的配置项必须是函数（处理生命周期）;增强子可以是函数，也可以是对象，函数的话默认为before，在配置项之前执行;是对象的话，可以配置before 和 after，控制执行的顺序
 */
export function page(options, enhancer = {}) {
  Object.keys(enhancer).forEach(k => {
    if (options[k] && isFuc(options[k])) {
      const temp = options[k];
      const before = isObject(enhancer[k]) ? enhancer[k].before : enhancer[k];
      const after = isObject(enhancer[k]) ? enhancer[k].after : undefined;

      options[k] = function(...args) {
        before && before(...args);
        temp(...args);
        after && after(...args);
      };
    }
  });

  return {
    ...options
  };
}

/**
 * 页面拦截
 * @param options
 * @returns {*}
 */
export function pageIntercept(options) {
  const enhancer = {
    onLoad() {
      console.log("you has not login in");
    }
  };
  return page(options, enhancer);
}
