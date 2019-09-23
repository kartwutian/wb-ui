import Vue from 'vue';
import config from '../config/config';

/**
 * 通用延时函数
 * @param timeout
 * @returns {Promise<any>}
 */
export const delay = (timeout = .3) => new Promise(resolve => setTimeout(resolve, timeout*1000));

/**
 * 讲枚举数组转化为枚举对象
 * @param arr
 * @param options {key: 'key',val: 'name'}
 * @returns {{}}
 */
export const exchangeToEnum = (arr = [], options = { key: 'id', val: 'name' }) => {
  if(!Array.isArray(arr)){
    console.error('第一个参数必须为数组');
    return {};
  }
  return arr.reduce((result, item)=>{
    result[item[options.key]] = item[options.val];
    return result;
  }, {});
};

/**
 * 通用loading包装,适用单一异常场景
 * @param fn // async函数
 * @returns {Promise<void>}
 */
export const commonLoading = async (fn, errorHandle) =>{
  try {
    uni.showLoading({
      title: '加载中',
    });
    return await fn();
  }catch (e) {
    console.error(e);
    if(errorHandle) errorHandle(e)
  }finally {
    uni.hideLoading();
  }
};

/**
 * 通用error包装,适用单一异常场景
 * @param fn // async函数
 * @returns {Promise<void>}
 */
export const commonError = async fn =>{
  try {
    await fn();
  }catch (e) {
    console.error(e);
  }
};

// token相关
const token_key = "app_token";
export function setToken(token) {
  uni.setStorageSync(token_key, token)
}

export function getToken() {
  return uni.getStorageSync(token_key) || ""
}

export function removeToken() {
  uni.clearStorageSync()
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
export function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

export function isArray(obj) {
  return Array.isArray(obj);
}

/**
 *公用添加默认值的方法
 * @param data 对象 or 数组
 * @param defaultvalue 默认值（替换null和undefined）
 * @returns {Uint8Array | BigInt64Array | any[] | Float64Array | Int8Array | Float32Array | Int32Array | Uint32Array | Uint8ClampedArray | BigUint64Array | Int16Array | Uint16Array|{}|*}
 */
export function generateDefaultValue(data, defaultvalue = '--') {
  if (!isObject(data)) return data;
  if(isArray(data)){
    return data.map(item => {
      if(item === null || item === undefined || item === '') return defaultvalue;
      if(isObject(item)) {
        return generateDefaultValue(item, defaultvalue)
      }
      return item;
    })
  }
  return Object.keys(data).reduce((result, item) => {
    if(data[item] === null || data[item] === undefined || data[item] === ''){
      result[item] = defaultvalue;
      return result;
    }
    if(isObject(data[item])){
      result[item] = generateDefaultValue(data[item], defaultvalue)
      return result;
    }
    result[item] = data[item];
    return result;
  },{});
}

/**
 * 深拷贝
 * @param data
 * @returns {Uint8Array | BigInt64Array | any[] | Float64Array | Int8Array | Float32Array | Int32Array | Uint32Array | Uint8ClampedArray | BigUint64Array | Int16Array | Uint16Array|{}|*}
 */
export function deepCopy(data) {
  if (!isObject(data)) return data;
  if(isArray(data)){
    return data.map(item => {
      if(isObject(item)) {
        return deepCopy(item)
      }
      return item;
    })
  }
  return Object.keys(data).reduce((result, item) => {
    if(isObject(data[item])){
      result[item] = deepCopy(data[item])
      return result;
    }
    result[item] = data[item];
    return result;
  },{});
}

export function resetState(state, initialState){
  if (!isObject(initialState)){
    console.error('please use object as argument');
    return;
  }
  if(isArray(initialState)){
    // 注意改变state自身, 不能重新赋值[]
    state = (()=>{
      while(state.length){
        state.pop()
      }
      JSON.parse(JSON.stringify(initialState)).forEach((item)=>{
        state.push(item)
      })
    })();
  }
  if(isObject(state)){
    Object.keys(state).forEach(key => {
      if(isObject(initialState[key])) {
        return resetState(state[key], initialState[key])
      }
      if(initialState[key] === undefined){
        delete state[key];
        return;
      }
      state[key] = initialState[key];
    });
  }
}

export function getUrl(url){
  if(url.startsWith('/')){
    return config.imageUrl + url
  }
  return config + '/' + url;
}

export function validate(data, rules) {
  const res = {};
  Object.keys(rules).forEach(field => {
    for(let i = 0; i < rules[field].length; i++){
      if(data[field] && !data[field].toString().match( rules[field][i].reg)){
        res[field] = rules[field][i].msg; // 有错误，则赋值错误，跳出循环
        break
      }
      res[field] = null; // 没有错误，则赋值为null
    }
  });
  return res
}

export function fetchErrorMsg(data) {
  if(isArray(data)){
    for(let i = 0; i< data.length; i++){
      const errField = Object.keys(data[i]).filter(field => data[i][field] !== null);
      if(errField.length){
        return data[i][errField[0]];
      }
    }
    return false;
  }
  const errField = Object.keys(data).filter(field => data[field] !== null);
  if(errField.length){
    return data[errField[0]];
  }
  return false
}

/**
 * 生成model
 * @param options
 * @returns {{mutations: (options.mutations|{}|{updateShallowState(Object, Object): void}), state: (Uint8Array|BigInt64Array|any[]|Float64Array|Int8Array|Float32Array|Int32Array|Uint32Array|Uint8ClampedArray|BigUint64Array|Int16Array|Uint16Array|{}|*), getters: U, actions: (options.actions|{}), namespaced: boolean}}
 */
export const modelGenerate = (options = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {},
  getters: {},
}) => {
  const {namespaced, state:initialState, mutations, actions, getters} = options;
  return {
    namespaced: namespaced || true,

    state: {
      ...deepCopy(initialState),
    },
    mutations: {
      /**
       * 浅更新，只改变一级状态
       * @param {Object} state
       * @param {Object} payload
       */
      updateShallowState(state, payload) {
        let realPayload = payload;
        if(payload.payload){
          realPayload = payload.payload
        }
        Object.keys(realPayload).forEach(key => {
          state[key] = realPayload[key]
        })
      },
      reset(state) {
        // 重置state
        resetState(state, initialState);
      },
      ...mutations
    },
    actions: {
      ...actions
    },
    getters: gettersGenerate(initialState, getters),
  }
}

/**
 * 生成 getters
 * @param initialState
 * @param getters
 * @returns {U}
 */
export function gettersGenerate(initialState,getters) {
  const normalGetters = Object.keys(initialState).reduce((res, next)=>{
    res[next] = function (state) {
      return state[next]
    };
    return res
  },{});
  return {
    ...normalGetters,
    ...getters,
  }
}
