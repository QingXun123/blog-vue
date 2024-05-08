import request from '@/utils/request'
import backendUrls from '@/config/globalConfig';

export function login(data) {
    return request({
        url: backendUrls.url + '/user/user/doLogin',
        method: 'post',
        data: data
    })
}

export function register(data) {
    return request({
        url: backendUrls.url + '/user/user/register',
        method: 'post',
        data: data
    })
}

export function userInfo() {
    return request({
        url: backendUrls.url + '/user/user/info',
        method: 'get'
    })
}

export function userLogout() {
    return request({
        url: backendUrls.url + '/user/user/logout',
        method: 'get'
    })
}