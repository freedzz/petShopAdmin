import request from '../request.js'
export function updateStockByHand () {
  return request({
    method: 'post',
    url: '/crontab/updateStockByHand'
  })
}
export function updateGoodsNumber () {
  return request({
    method: 'post',
    url: '/goods/updateGoodsNumber'
  })
}
export function updatePrice (data) {
  return request({
    method: 'post',
    url: '/goods/updatePrice',
    data
  })
}
export function checkSku (data) {
  return request({
    method: 'post',
    url: '/goods/checkSku',
    data
  })
}
export function updateShortName (data) {
  return request({
    method: 'post',
    url: '/goods/updateShortName',
    data
  })
}
export function updateSort (data) {
  return request({
    method: 'post',
    url: '/goods/updateSort',
    data
  })
}
export function goodDestory (data) {
  return request({
    method: 'post',
    url: '/goods/destory',
    data
  })
}
export function getGood (data) {
  return request({
    method: 'get',
    url: '/goods',
    data
  })
}
export function onsale (data) {
  return request({
    method: 'get',
    url: '/goods/onsale',
    data
  })
}
export function out (data) {
  return request({
    method: 'get',
    url: '/goods/out',
    data
  })
}
export function drop (data) {
  return request({
    method: 'get',
    url: '/goods/drop',
    data
  })
}
export function sort (data) {
  return request({
    method: 'get',
    url: '/goods/sort',
    data
  })
}
export function saleStatus (data) {
  return request({
    method: 'get',
    url: '/goods/saleStatus',
    data
  })
}
export function productStatus (data) {
  return request({
    method: 'get',
    url: '/goods/productStatus',
    data
  })
}
export function indexShowStatus (data) {
  return request({
    method: 'get',
    url: '/goods/indexShowStatus',
    data
  })
}
export function uploadHttpsImage (data) {
  return request({
    method: 'post',
    url: '/goods/uploadHttpsImage',
    data
  })
}
export function getGoodsSpec (data) {
  return request({
    method: 'post',
    url: '/specification/getGoodsSpec',
    data
  })
}
export function getQiniuToken () {
  return request({
    method: 'post',
    url: '/index/getQiniuToken'
  })
}
export function uploadToQiniu(url, data) {
  return request({
    method: 'post',
    isCustom: false,
    url: url,
    data,
    config: {
      realUrl: true,
    },
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
export function getGalleryList (data) {
  return request({
    method: 'post',
    url: '/goods/getGalleryList',
    data
  })
}
export function copygoods (data) {
  return request({
    method: 'post',
    url: '/goods/copygoods',
    data
  })
}
export function goodsStore (data) {
  return request({
    method: 'post',
    url: '/goods/store',
    data
  })
}
export function goodsInfo (data) {
  return request({
    method: 'get',
    url: '/goods/info',
    data
  })
}
export function getAllCategory (data) {
  return request({
    method: 'get',
    url: '/goods/getAllCategory',
    data
  })
}
export function getAllSpecification (data) {
  return request({
    method: 'get',
    url: '/goods/getAllSpecification',
    data
  })
}
export function getExpressData (data) {
  return request({
    method: 'get',
    url: '/goods/getExpressData',
    data
  })
}