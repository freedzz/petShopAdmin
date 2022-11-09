import { storage, tokenTableName } from '@/config'

/**
 * @author chuzhixin 1204505056@qq.com （不想保留author可删除）
 * @description 获取accessToken
 * @returns {string|ActiveX.IXMLDOMNode|Promise<any>|any|IDBRequest<any>|MediaKeyStatus|FormDataEntryValue|Function|Promise<Credential | null>}
 */
export function getAccessToken() {
  if (storage) {
    if (storage === 'localStorage') {
      return localStorage.getItem(tokenTableName)
    } else if (storage === 'sessionStorage') {
      return sessionStorage.getItem(tokenTableName)
    }
    return localStorage.getItem(tokenTableName)
  }
  return localStorage.getItem(tokenTableName)
}

/**
 * @author chuzhixin 1204505056@qq.com （不想保留author可删除）
 * @description 存储accessToken
 * @param accessToken
 * @returns {void|*}
 */
export function setAccessToken(accessToken) {
  if (storage) {
    if (storage === 'localStorage') {
      return localStorage.setItem(tokenTableName, accessToken)
    } else if (storage === 'sessionStorage') {
      return sessionStorage.setItem(tokenTableName, accessToken)
    }
    return localStorage.setItem(tokenTableName, accessToken)
  }
  return localStorage.setItem(tokenTableName, accessToken)
}

/**
 * @author chuzhixin 1204505056@qq.com （不想保留author可删除）
 * @description 移除accessToken
 * @returns {void|Promise<void>}
 */
export function removeAccessToken() {
  if (storage) {
    if (storage === 'localStorage') {
      return localStorage.removeItem(tokenTableName)
    } else if (storage === 'sessionStorage') {
      return sessionStorage.clear()
    }
    return localStorage.removeItem(tokenTableName)
  }
  return localStorage.removeItem(tokenTableName)
}
