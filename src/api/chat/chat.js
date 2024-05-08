import request from '@/utils/request'
import backendUrls from '@/config/globalConfig';

export function getChatList() {
    return request({
        url: backendUrls.url + '/chat/chat/getChatList',
        method: 'get'
    })
}
