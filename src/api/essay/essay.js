import request from '@/utils/request'
import backendUrls from '@/config/globalConfig';

export function getBanner() {
    return request({
        url: backendUrls.url + '/essay/essayBanner/getBanner',
        method: 'get'
    })
}

export function getFeaturedEssayList() {
    return request({
        url: backendUrls.url + '/essay/essayInfo/getTopEssayList',
        method: 'get'
    })
}

export function getPage(data) {
    return request({
        url: backendUrls.url + '/essay/essayInfo/page',
        method: 'post',
        data: data
    })
}

export function getEssayListLikeSubject(data) {
    return request({
        url: backendUrls.url + '/essay/essayInfo/getEssayListLikeSubject',
        method: 'post',
        data: data
    })
}

export function addComment(data) {
    return request({
        url: backendUrls.url + '/essay/essayComment/addComment',
        method: 'post',
        data: data,
        headers: {
            isSaToken: true
        }
    })
}

export function getCommentPage(data) {
    return request({
        url: backendUrls.url + '/essay/essayComment/getCommentPage',
        method: 'post',
        data: data
    })
}

export function getNextCommentPage(data) {
    return request({
        url: backendUrls.url + '/essay/essayComment/getNextCommentPage',
        method: 'post',
        data: data
    })
}

export function getCommentTotalByReplyCommentId(commentId) {
    return request({
        url: backendUrls.url + '/essay/essayComment/getNextCommentPage?commentId=' + commentId,
        method: 'get',
    })
}

export function getDoubleNextCommentDoubleTotal(commentId) {
    return request({
        url: backendUrls.url + '/essay/essayComment/getDoubleNextCommentDoubleTotal?commentId=' + commentId,
        method: 'get',
    })
}

export function like(data) {
    return request({
        url: backendUrls.url + '/essay/essayLike/like',
        method: 'post',
        data: data,
        headers: {
            isSaToken: true
        }
    })
}

export function dislike(data) {
    return request({
        url: backendUrls.url + '/essay/essayLike/dislike',
        method: 'post',
        data: data
    })
}

export function deleteComment(data) {
    return request({
        url: backendUrls.url + '/essay/essayComment/deleteComment',
        method: 'post',
        data: data,
        headers: {
            isSaToken: true
        }
    })
}

export function info(essayId) {
    return request({
        url: backendUrls.url + '/essay/essayInfo/info?essayId=' + essayId,
        method: 'get'
    })
}

export function readEssay(essayId) {
    return request({
        url: backendUrls.url + '/essay/essayInfo/readEssay?essayId=' + essayId,
        method: 'get'
    })
}

export function getNewEssayList(essayId) {
    return request({
        url: backendUrls.url + '/essay/essayInfo/getNewEssayList',
        method: 'get'
    })
}