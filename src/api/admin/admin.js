import request from '../request.js'
export function deleAdmin () {
  return request({
    method: 'post',
    url: '/admin/deleAdmin'
  })
}
export function getAdmin () {
  return request({
    method: 'get',
    url: '/admin'
  })
}
export function adminSave (data) {
  return request({
    method: 'post',
    url: '/admin/adminSave',
    data
  })
}
export function adminAdd (data) {
  return request({
    method: 'post',
    url: '/admin/adminAdd',
    data
  })
}
export function adminDetail (data) {
  return request({
    method: 'post',
    url: '/admin/adminDetail',
    data
  })
}