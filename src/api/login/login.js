import request from '../request.js'
export function login (data) {
  return request({
    method: 'post',
    url: '/auth/login',
    data
  })
}
