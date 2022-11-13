import request from '../request.js'
export function getareadata () {
  return request({
    method: 'post',
    url: '/shipper/getareadata'
  })
}
export function freightdetail (data) {
  return request({
    method: 'post',
    url: '/shipper/freightdetail',
    data
  })
}
export function shipperDestory (data) {
  return request({
    method: 'post',
    url: '/shipper/destory',
    data
  })
}
export function shipperFreight () {
  return request({
    method: 'get',
    url: '/shipper/freight'
  })
}
export function exceptAreaDelete (data) {
  return request({
    method: 'post',
    url: '/shipper/exceptAreaDelete',
    data
  })
}
export function getExceptarea (data) {
  return request({
    method: 'post',
    url: '/shipper/exceptarea',
    data
  })
}
export function saveExceptArea (data) {
  return request({
    method: 'post',
    url: '/shipper/saveExceptArea',
    data
  })
}
export function addExceptArea (data) {
  return request({
    method: 'post',
    url: '/shipper/addExceptArea',
    data
  })
}
export function exceptAreaDetail (data) {
  return request({
    method: 'post',
    url: '/shipper/exceptAreaDetail',
    data
  })
}
export function saveTable (data) {
  return request({
    method: 'post',
    url: '/shipper/saveTable',
    data
  })
}
export function addTable (data) {
  return request({
    method: 'post',
    url: '/shipper/addTable',
    data
  })
}