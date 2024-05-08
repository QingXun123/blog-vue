import request from '@/utils/request'
import backendUrls from '@/config/globalConfig';

export function videoPage(data) {
	return request({
	  url: backendUrls.url + '/video/video/page',
	  method: 'post',
	  data: data
	})
}

export function newVideoList(data) {
	return request({
	  url: backendUrls.url + '/video/video/newVideoList',
	  method: 'post',
	  data: data
	})
}