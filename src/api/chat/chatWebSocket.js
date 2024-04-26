import request from '@/utils/request'
import backendUrls from '@/config/globalConfig';

export function getOnlineUserByRoomId(roomId) {
    return request({
        url: backendUrls.url + '/room/getOnlineUserByRoomId?roomId=' + roomId,
        method: 'get'
    })
}

export function getOnlineCountByRoomId(roomId) {
    return request({
        url: backendUrls.url + '/room/getOnlineCountByRoomId?roomId=' + roomId,
        method: 'get'
    })
}
