import request from '../request.js'
export function getUser (data) {
  return request({
    method: 'get',
    url: '/user',
    data
  })
}
export function userDestory (data) {
  return request({
    method: 'post',
    url: '/user/destory',
    data
  })
}
export function userUpdateInfo (data) {
  return request({
    method: 'post',
    url: '/user/updateInfo',
    data
  })
}
export function userSaveAddress (data) {
  return request({
    method: 'post',
    url: '/user/saveaddress',
    data
  })
}
export function updateInfo (data) {
  return request({
    method: 'post',
    url: '/user/updateInfo',
    data
  })
}
export function updateName (data) {
  return request({
    method: 'post',
    url: '/user/updateName',
    data
  })
}
export function updateMobile (data) {
  return request({
    method: 'post',
    url: '/user/updateMobile',
    data
  })
}
export function getDataInfo (data) {
  return request({
    method: 'get',
    url: '/user/datainfo',
    data
  })
}
export function getUserInfo (data) {
  return request({
    method: 'get',
    url: '/user/info',
    data
  })
}
export function getUserOrder (data) {
  return request({
    method: 'get',
    url: '/user/info',
    data
  })
}
export function getUserAddress (data) {
  return request({
    method: 'get',
    url: '/user/address',
    data
  })
}
export function getUserCartdata (data) {
  return request({
    method: 'get',
    url: '/user/cartdata',
    data
  })
}
export function getUserFoot (data) {
  return request({
    method: 'get',
    url: '/user/foot',
    data
  })
}
export function getAllRegion () {
  return request({
    method: 'get',
    url: '/order/getAllRegion'
  })
}