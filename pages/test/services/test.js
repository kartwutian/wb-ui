import request from '../../../utils/request'



/**
*小程序登录
* @param params
**/
export function login(params) {
  return request(`/api/user/login`, {
    method: 'GET',
    data: params,
  })
}

/**
*退出登录
* @param params
**/
export function signOut(params) {
  return request(`/api/ftts/user/signOut`, {
    method: 'GET',
    data: params,
  })
}

