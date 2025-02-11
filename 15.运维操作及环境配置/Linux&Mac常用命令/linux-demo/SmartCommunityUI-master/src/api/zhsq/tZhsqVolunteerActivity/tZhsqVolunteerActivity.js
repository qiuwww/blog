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
export const addTZhsqVolunteerActivity = params => {
  return postRequestBodyJson('/tZhsqVolunteerActivity/addTZhsqVolunteerActivity', params)
}
export const deleteTZhsqVolunteerActivity = params => {
  return postRequestBodyJson('/tZhsqVolunteerActivity/deleteTZhsqVolunteerActivity', params)
}
export const updateTZhsqVolunteerActivity = params => {
  return postRequestBodyJson('/tZhsqVolunteerActivity/updateTZhsqVolunteerActivity', params)
}
export const queryTZhsqVolunteerActivityList = params => {
  return getRequest('/tZhsqVolunteerActivity/queryTZhsqVolunteerActivityList', params)
}
export const getTZhsqVolunteerActivity = params => {
  return getRequest('/tZhsqVolunteerActivity/getTZhsqVolunteerActivity', params)
}
export const exportExcel = (params) => {
  return request({
    url: baseurl + '/tZhsqVolunteerActivity/download', // 接口名字
    method: 'post',
    params: params,
    responseType: 'blob'// 通过api应该知道这是什么吧
  })
}
