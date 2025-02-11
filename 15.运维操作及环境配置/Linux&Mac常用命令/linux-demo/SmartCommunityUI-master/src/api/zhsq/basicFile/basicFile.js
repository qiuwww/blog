import {
  baseurl,
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
  importRequest,
  uploadFileRequest,
  postRequestJson,
  postRequestBodyJson
} from '@/libs/axios'
import request from '@/utils/request'
import { getToken } from '@/utils/auth'
export const addBasicFile = params => {
  // return postRequest('/basicFile/addBasicFile',params);
  return request({
    url: baseurl + '/basicFile/addBasicFile',
    data: params,
    method: 'post'
  })
}

export const updateBasicFile = params => {
  // return postRequest('/basicFile/addBasicFile',params);
  return request({
    url: baseurl + '/basicFile/updateBasicFile',
    data: params,
    method: 'post'
  })
}

export const deleteBasicFile = params => {
  return postRequestBodyJson('/basicFile/deleteBasicFile', params)
}

export const queryBasicFileList = params => {
  return getRequest('/basicFile/queryBasicFileList', params)
}
export const getBasicFile = params => {
  return getRequest('/basicFile/getBasicFile', params)
}
export const queryAllBasicFileList = params => {
  return getRequest('/basicFile/queryAllBasicFileList', {})
}
