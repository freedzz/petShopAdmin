import request from '../request.js'
export function getShowStatus (data) {
  return request({
    method: 'get',
    url: '/category/showStatus',
    data
  })
}
export function getChannelStatus (data) {
  return request({
    method: 'get',
    url: '/category/channelStatus',
    data
  })
}
export function getCategoryStatus (data) {
  return request({
    method: 'get',
    url: '/category/categoryStatus',
    data
  })
}
export function updateSort (data) {
  return request({
    method: 'post',
    url: '/category/updateSort',
    data
  })
}
export function specificationDelete (data) {
  return request({
    method: 'post',
    url: '/specification/delete',
    data
  })
}
export function categoryDestory (data) {
  return request({
    method: 'post',
    url: '/category/destory',
    data
  })
}
export function getCategory (data) {
  return request({
    method: 'get',
    url: '/category',
    data
  })
}
export function getSpecification () {
  return request({
    method: 'get',
    url: '/specification'
  })
}