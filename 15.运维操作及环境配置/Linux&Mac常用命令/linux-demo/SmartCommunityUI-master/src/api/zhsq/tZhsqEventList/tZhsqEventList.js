import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
  importRequest,
  uploadFileRequest,
  postRequestJson,
  baseurl, postRequestBodyJson
} from '@/libs/axios'
import request from '@/utils/request'
export const addTZhsqEventList = params => {
  return postRequest('/tZhsqEventList/addTZhsqEventList', params)
}
export const deleteTZhsqEventList = params => {
  return postRequestBodyJson('/tZhsqEventList/deleteTZhsqEventList', params)
}
export const updateTZhsqEventList = params => {
  return postRequest('/tZhsqEventList/updateTZhsqEventList', params)
}
export const queryTZhsqEventListList = params => {
  return getRequest('/tZhsqEventList/queryTZhsqEventListList', params)
}
export const getTZhsqEventList = params => {
  return getRequest('/tZhsqEventList/getTZhsqEventList', params)
}
export const queryAllTZhsqEventListByAnyWayWhere = params => {
  return getRequest('/tZhsqEventList/queryAllTZhsqEventListByAnyWayWhere', params)
}
export const exportExcel = (params) => {
  return request({
    url: baseurl + '/tZhsqEventList/download', // 接口名字
    method: 'post',
    params: params,
    responseType: 'blob'// 通过api应该知道这是什么吧
  })
}
