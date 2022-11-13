import axios from 'axios'
import qs from 'qs'
import './config'
export default function request ({ method, url, data, headers = {}, config = {}, isCustom = true }) {
  if (!isCustom) {
    return axios({
      method,
      url,
      data,
      headers,
      ...config
    })
  }
  switch (method) {
  case 'GET':
  case 'get':
    return axios({
      method,
      url: `${url}?${qs.stringify(data)}`,
      headers,
      ...config
    })
  case 'POST':
  case 'post':
    return axios({
      method,
      url,
      data: JSON.stringify(data),
      headers,
      ...config
    })
  case 'PUT':
    break
  case 'DELETE':
    break
  default:
    return axios({
      method,
      url,
      data,
      headers,
      ...config
    })
  }
}
