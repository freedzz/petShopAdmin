import request from '../request.js'
export function keywordsDestory (data) {
  return request({
    method: 'post',
    url: '/keywords/destory',
    data
  })
}
export function keywordsStore (data) {
  return request({
    method: 'post',
    url: '/keywords/store',
    data
  })
}
export function getKeywords (data) {
  return request({
    method: 'get',
    url: '/keywords',
    data
  })
}
export function getKeywordsInfo (data) {
  return request({
    method: 'get',
    url: '/keywords/info',
    data
  })
}