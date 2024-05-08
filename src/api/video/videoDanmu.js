import request from '@/utils/request'
import backendUrls from '@/config/globalConfig';

export function getDanmuList(videoEpisodeId) {
	return request({
	  url: backendUrls.url + '/video/video/danmu/getDanmuList?videoEpisodeId=' + videoEpisodeId,
	  method: 'get'
	})
}

export function addDanmu(data) {
	return request({
	  url: backendUrls.url + '/video/video/danmu/addDanmu',
	  method: 'post',
	  data: data
	})
}