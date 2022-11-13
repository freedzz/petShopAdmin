import request from '../request.js'
export function checkLogin () {
  return request({
    method: 'get',
    url: '/index/checkLogin'
  })
}