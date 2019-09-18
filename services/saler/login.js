import { stringify } from 'qs';
import request from '../../utils/request'

export function login(params) {
    return request(`/api/ftts/user/login?${stringify(params)}`, {
        method: 'get',
    }, false)
}

export function logout() {
    return request(`/app/ajaxLogout`, {
        method: 'post',
    })
}
