import request from '../request.js'
export function getQiniuToken () {
  return request({
    method: 'post',
    url: '/index/getQiniuToken'
  })
}
export function deleteBannerImage (data) {
  return request({
    method: 'post',
    url: '/category/deleteBannerImage',
    data
  })
}
export function deleteIconImage (data) {
  return request({
    method: 'post',
    url: '/category/deleteIconImage',
    data
  })
}
export function saveStore (data) {
  return request({
    method: 'post',
    url: '/category/store',
    data
  })
}
export function getTopCategory () {
  return request({
    method: 'get',
    url: '/category/topCategory',
  })
}
export function categoryInfo (data) {
  return request({
    method: 'get',
    url: '/category/info',
    data
  })
}