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
export const addTZhsqTaskList = params => {
  return postRequest('/tZhsqTaskList/addTZhsqTaskList', params)
}
export const deleteTZhsqTaskList = params => {
  return postRequestBodyJson('/tZhsqTaskList/deleteTZhsqTaskList', params)
}
export const updateTZhsqTaskList = params => {
  return postRequest('/tZhsqTaskList/updateTZhsqTaskList', params)
}
export const queryTZhsqTaskListList = params => {
  return getRequest('/tZhsqTaskList/queryTZhsqTaskListList', params)
}
export const getTZhsqTaskList = params => {
  return getRequest('/tZhsqTaskList/getTZhsqTaskList', params)
}
export const exportExcel = (params) => {
  return request({
    url: baseurl + '/tZhsqTaskList/download', // 接口名字
    method: 'post',
    params: params,
    responseType: 'blob'// 通过api应该知道这是什么吧
  })
}
