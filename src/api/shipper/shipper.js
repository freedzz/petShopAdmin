import request from '../request.js'
export function shipperStore (data) {
  return request({
    method: 'post',
    url: '/shipper/store',
    data
  })
}
export function getShipperInfp (data) {
  return request({
    method: 'get',
    url: '/shipper/info',
    data
  })
}
export function updateSort (data) {
  return request({
    method: 'post',
    url: '/shipper/updateSort',
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
export function shipperList (data) {
  return request({
    method: 'get',
    url: '/shipper/list',
    data
  })
}
export function enabledStatus (data) {
  return request({
    method: 'get',
    url: '/shipper/enabledStatus',
    data
  })
}
export function getAllRegion () {
  return request({
    method: 'get',
    url: '/order/getAllRegion'
  })
}
export function changeAutoStatus (data) {
  return request({
    method: 'post',
    url: '/admin/changeAutoStatus',
    data
  })
}
export function storeShipperSettings (data) {
  return request({
    method: 'post',
    url: '/admin/storeShipperSettings',
    data
  })
}
export function getShipper () {
  return request({
    method: 'get',
    url: '/shipper'
  })
}