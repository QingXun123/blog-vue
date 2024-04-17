import request from '@/utils/request'
import backendUrls from '@/config/globalConfig';

export function getEpisodeList(data) {
	return request({
	  url: backendUrls.url + '/video/episode/list',
	  method: 'post',
	  data: data
	})
}

export function getVideoEpisodeById(videoEpisodeId) {
	return request({
	  url: backendUrls.url + '/video/episode/getById?videoEpisodeId=' + videoEpisodeId,
	  method: 'get'
	})
}

export function getVideoById(videoId) {
	return request({
	  url: backendUrls.url + '/video/episode/getByVideoId?videoId=' + videoId,
	  method: 'get'
	})
}