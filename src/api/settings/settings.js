import request from '../request.js'
export function noticeUpdate (data) {
  return request({
    method: 'post',
    url: '/notice/update',
    data
  })
}
export function noticeAdd (data) {
  return request({
    method: 'post',
    url: '/notice/add',
    data
  })
}
export function updateContent (data) {
  return request({
    method: 'post',
    url: '/notice/updateContent',
    data
  })
}
export function noticeDestory (data) {
  return request({
    method: 'post',
    url: '/notice/destory',
    data
  })
}
export function getNotice (data) {
  return request({
    method: 'get',
    url: '/notice',
    data
  })
}