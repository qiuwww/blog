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
export const addTZhsqPropertyManagement = params => {
  return postRequest('/tZhsqPropertyManagement/addTZhsqPropertyManagement', params)
}
export const deleteTZhsqPropertyManagement = params => {
  return postRequestBodyJson('/tZhsqPropertyManagement/deleteTZhsqPropertyManagement', params)
}
export const updateTZhsqPropertyManagement = params => {
  return postRequest('/tZhsqPropertyManagement/updateTZhsqPropertyManagement', params)
}
export const queryTZhsqPropertyManagementList = params => {
  return getRequest('/tZhsqPropertyManagement/queryTZhsqPropertyManagementList', params)
}
export const getTZhsqPropertyManagement = params => {
  return getRequest('/tZhsqPropertyManagement/getTZhsqPropertyManagement', params)
}
// 模糊查询 所有物业信息
export const queryAllList = params => {
  return getRequest('/tZhsqPropertyManagement/queryAllList', params)
}
export const download = (params) => {
  return request({
		  url: baseurl + '/tZhsqPropertyManagement/download', // 接口名字
		  method: 'post',
		  params: params,
		  responseType: 'blob'// 通过api应该知道这是什么吧
  })
}
