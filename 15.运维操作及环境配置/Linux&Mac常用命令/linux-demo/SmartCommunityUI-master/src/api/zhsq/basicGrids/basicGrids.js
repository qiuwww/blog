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
export const addBasicGrids = params => {
  return request({
    method: 'post',
    url: baseurl + `/basicGrids/addBasicGrids`,
    data: params
  })
}
export const deleteBasicGrids = params => {
  return postRequestBodyJson('/basicGrids/deleteBasicGrids', params)
}
export const updateBasicGrids = params => {
  return request({
    method: 'post',
    url: baseurl + `/basicGrids/updateBasicGrids`,
    data: params
  })
}
export const queryBasicGridsList = params => {
  return getRequest('/basicGrids/queryBasicGridsList', params)
}
export const getBasicGrids = params => {
  return getRequest('/basicGrids/getBasicGrids', params)
}
export const queryAllList = async params => {
  return await getRequest('/basicGrids/queryAllListByAnyWhere', params)
}
export const queryAllListByAnyWhere = async params => {
  return await getRequest('/basicGrids/queryAllList', params)
}

export const queryAllGridsTree = async params => {
  return await getRequest('/basicGrids/queryAllGridsTree', params)
}

export const exportExcel = (params) => {
  return request({
    url: baseurl + '/basicGrids/download', // 接口名字
    method: 'post',
    params: params,
    responseType: 'blob'// 通过api应该知道这是什么吧
  })
}
