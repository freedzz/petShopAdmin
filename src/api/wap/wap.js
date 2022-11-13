import request from '../request.js'
export function updatePrice (data) {
  return request({
    method: 'post',
    url: '/wap/updatePrice',
    data
  })
}
export function goodsSaleStatus (data) {
  return request({
    method: 'get',
    url: '/goods/saleStatus',
    data
  })
}
export function onsale (data) {
  return request({
    method: 'get',
    url: '/wap/onsale',
    data
  })
}
export function drop (data) {
  return request({
    method: 'get',
    url: '/wap/drop',
    data
  })
}