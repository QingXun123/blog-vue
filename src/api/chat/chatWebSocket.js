import request from '@/utils/request'
import backendUrls from '@/config/globalConfig';

export function getOnlineUserByRoomId(roomId) {
    return request({
        url: backendUrls.url + '/chat/room/getOnlineUserByRoomId?roomId=' + roomId,
        method: 'get'
    })
}

export function getOnlineCountByRoomId(roomId) {
    return request({
        url: backendUrls.url + '/chat/room/getOnlineCountByRoomId?roomId=' + roomId,
        method: 'get'
    })
}
