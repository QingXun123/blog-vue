import request from '@/utils/request'
import backendUrls from '@/config/globalConfig';

export function login(data) {
    return request({
        url: backendUrls.url + '/user/doLogin',
        method: 'post',
        data: data,
        headers: {
            isSaToken: true
        }
    })
}

export function register(data) {
    return request({
        url: backendUrls.url + '/user/register',
        method: 'post',
        data: data,
        headers: {
            isSaToken: true
        }
    })
}

export function userInfo() {
    return request({
        url: backendUrls.url + '/user/info',
        method: 'get',
        headers: {
            isSaToken: true
        }
    })
}

export function userLogout() {
    return request({
        url: backendUrls.url + '/user/logout',
        method: 'get',
        headers: {
            isSaToken: true
        }
    })
}