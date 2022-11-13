import request from '../request.js'
/**
 * order
 */
export function getAllRegion () {
  return request({
    method: 'get',
    url: '/order/getAllRegion'
  })
}
export function deliveryGoGo (data) {
  return request({
    method: 'get',
    url: '/order/orderDelivery',
    data
  })
}
export function getDeliveyInfo (data) {
  return request({
    method: 'get',
    url: '/delivery',
    data
  })
}
export function saveExpressValueInfo (data) {
  return request({
    method: 'post',
    url: '/order/saveExpressValueInfo',
    data
  })
}
export function getOrderpack (data) {
  return request({
    method: 'get',
    url: '/order/orderpack',
    data
  })
}
export function getOrder (data) {
  return request({
    method: 'get',
    url: '/order',
    data
  })
}
export function saveRemarkInfo (data) {
  return request({
    method: 'post',
    url: '/order/saveRemarkInfo',
    data
  })
}
export function savePrintInfo (data) {
  return request({
    method: 'post',
    url: '/order/savePrintInfo',
    data
  })
}
export function saveAdminMemo (data) {
  return request({
    method: 'post',
    url: '/order/saveAdminMemo',
    data
  })
}
export function onPrintNum (url, data, headers) {
  return request({
    method: 'post',
    url: url,
    data,
    headers
  })
}
export function getOrderDestory (data) {
  return request({
    method: 'post',
    url: '/order/destory',
    data
  })
}
export function rePrintExpress (data) {
  return request({
    method: 'get',
    url: '/order/rePrintExpress',
    data
  })
}
export function directPrintExpress (data) {
  return request({
    method: 'get',
    url: '/order/directPrintExpress',
    data
  })
}
export function checkExpress (data) {
  return request({
    method: 'get',
    url: '/order/checkExpress',
    data
  })
}
export function orderReceive (data) {
  return request({
    method: 'get',
    url: '/order/orderReceive',
    data
  })
}
export function getMianExpress (data) {
  return request({
    method: 'post',
    url: '/order/getMianExpress',
    data
  })
}
export function goDelivery (data) {
  return request({
    method: 'post',
    url: '/order/goDelivery',
    data
  })
}
export function goPrintOnly (data) {
  return request({
    method: 'post',
    url: '/order/goPrintOnly',
    data
  })
}
export function orderPrice (data) {
  return request({
    method: 'get',
    url: '/order/orderPrice',
    data
  })
}
export function getAutoStatus () {
  return request({
    method: 'get',
    url: '/order/getAutoStatus',
  })
}
export function getOrderDetail (data) {
  return request({
    method: 'get',
    url: '/order/detail',
    data
  })
}
/**
 * orderDetail
 */
export function orderChangeStatus (data) {
  return request({
    method: 'post',
    url: '/order/changeStatus',
    data
  })
}
export function getOrderExpress (data) {
  return request({
    method: 'post',
    url: '/order/getOrderExpress',
    data
  })
}
export function orderpack (data) {
  return request({
    method: 'get',
    url: '/order/orderpack',
    data
  })
}
export function goodsListDelete (data) {
  return request({
    method: 'post',
    url: '/order/goodsListDelete',
    data
  })
}
export function saveGoodsList (data) {
  return request({
    method: 'post',
    url: '/order/saveGoodsList',
    data
  })
}
export function saveAddress (data) {
  return request({
    method: 'post',
    url: '/order/saveAddress',
    data
  })
}