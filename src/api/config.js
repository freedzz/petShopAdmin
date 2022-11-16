import axios from 'axios'
import apiConfig from '@/config/api'
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  config.baseURL = !config.realUrl ? apiConfig.rootUrl : ''
  config.headers.common['X-Hioshop-Token'] = localStorage.getItem('token') || ''
  config.headers['Content-Type'] = config.headers['Content-Type'] || 'application/json; charset=utf-8'
  return config
}, (error) => {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response.data
}, (error) => {
  // 对响应错误做点什么
  return Promise.reject(error)
})
