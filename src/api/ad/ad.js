import request from '../request.js'
export function updateSort (data) {
  return request({
    method: 'post',
    url: '/ad/updateSort',
    data
  })
}
export function saleStatus (data) {
  return request({
    method: 'get',
    url: '/ad/saleStatus',
    data
  })
}
export function adDestoory (data) {
  return request({
    method: 'post',
    url: '/ad/destory',
    data
  })
}
export function getList (data) {
  return request({
    method: 'get',
    url: '/ad',
    data
  })
}
export function getallrelate (data) {
  return request({
    method: 'post',
    url: '/ad/getallrelate',
    data
  })
}
export function getQiniuToken (data) {
  return request({
    method: 'post',
    url: '/index/getQiniuToken',
    data
  })
}
export function adStore (data) {
  return request({
    method: 'post',
    url: '/ad/store',
    data
  })
}
export function getAdInfo (data) {
  return request({
    method: 'get',
    url: '/ad/info',
    data
  })
}