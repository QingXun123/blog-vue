import request from '@/utils/request'
import backendUrls from '@/config/globalConfig';

export function getVideoBarrage(id) {
	return request({
	  url: backendUrls.url + '/dplayer/v2?id=' + id,
	  method: 'get'
	})
}