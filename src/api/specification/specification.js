import request from '../request.js'
export function getDetail (data) {
  return request({
    method: 'post',
    url: '/specification/detail',
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
export function specificationUpdate (data) {
  return request({
    method: 'post',
    url: '/specification/update',
    data
  })
}
export function specificationAdd (data) {
  return request({
    method: 'post',
    url: '/specification/add',
    data
  })
}