import request from '../request.js'
export function getList (data) {
  return request({
    method: 'get',
    url: '/shopcart',
    data
  })
}
