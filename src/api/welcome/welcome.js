import request from '../request.js'
export function getInfo () {
  return request({
    method: 'get',
    url: '/index'
  })
}
export function getMainInfo (data) {
  return request({
    method: 'get',
    url: '/index/main',
    data
  })
}
export function getIndexInfo () {
  return request({
    method: 'get',
    url: '/index'
  })
}