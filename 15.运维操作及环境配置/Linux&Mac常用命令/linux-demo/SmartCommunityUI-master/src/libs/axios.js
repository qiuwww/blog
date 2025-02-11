import request from '@/utils/request'
// import { getStore, setStore } from './storage';
// import { router } from '../router/index';
import { getToken } from '@/utils/auth'

// 统一请求路径前缀
const base = '/api'
export const baseurl = base
export const getRequest = (url, params) => {
  // let accessToken = getStore('accessToken');
  return request({
    method: 'get',
    url: `${base}${url}`,
    params,
    headers: {
      'Authorization': getToken()
    }
  })
}

export const postRequest = (url, params) => {
  // let accessToken = getStore("accessToken");
  return request({
    method: 'post',
    url: `${base}${url}`,
    params,
    transformRequest: [function(data) {
      let ret = ''
      for (const it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      ret = ret.substring(0, ret.length - 1)
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': getToken()
    }
  })
}
export const postRequestJson = (url, params) => {
  // let accessToken = getStore("accessToken");
  return request({
    method: 'post',
    url: `${base}${url}`,
    params,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': getToken()
    }
  })
}
export const postRequestBodyJson = (url, params) => {
  // let accessToken = getStore("accessToken");
  return request({
    method: 'post',
    url: `${base}${url}`,
    data:JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export const putRequest = (url, params) => {
  // let accessToken = getStore("accessToken");
  return request({
    method: 'put',
    url: `${base}${url}`,
    params,
    transformRequest: [function(data) {
      let ret = ''
      for (const it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      ret = ret.substring(0, ret.length - 1)
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': getToken()
    }
  })
}

export const deleteRequest = (url, params) => {
  // let accessToken = getStore('accessToken');
  return request({
    method: 'delete',
    url: `${base}${url}`,
    data: params,
    headers: {
      'Authorization': getToken()
    }
  })
}

export const importRequest = (url, params) => {
  // let accessToken = getStore('accessToken');
  return request({
    method: 'post',
    url: `${base}${url}`,
    params,
    headers: {
      'Authorization': getToken()
    }
  })
}

export const uploadFileRequest = (url, params) => {
  // let accessToken = getStore('accessToken');
  return axios({
    method: 'post',
    url: `${base}${url}`,
    params,
    headers: {
      'Authorization': getToken()
    }
  })
}

/**
 * 无需token验证的请求 避免旧token过期导致请求失败
 * @param {*} url
 * @param {*} params
 */
export const getRequestWithNoToken = (url, params) => {
  return axios({
    method: 'get',
    url: `${base}${url}`,
    params: params
  })
}
