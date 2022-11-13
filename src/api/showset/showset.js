import request from '../request.js'
export function showsetStore (data) {
  return request({
    method: 'post',
    url: '/admin/showsetStore',
    data
  })
}
export function getShowset () {
  return request({
    method: 'post',
    url: '/admin/showset'
  })
}