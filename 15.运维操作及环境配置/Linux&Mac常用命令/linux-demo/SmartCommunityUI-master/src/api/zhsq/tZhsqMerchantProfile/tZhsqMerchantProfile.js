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
export const addTZhsqMerchantProfile = params => {
  return request({
    method: 'post',
    url: baseurl + '/tZhsqMerchantProfile/addTZhsqMerchantProfile',
    data: params
  })
}
export const deleteTZhsqMerchantProfile = params => {
  return postRequestBodyJson('/tZhsqMerchantProfile/deleteTZhsqMerchantProfile', params)
}
export const updateTZhsqMerchantProfile = params => {
  return request({
    method: 'post',
    url: baseurl + '/tZhsqMerchantProfile/updateTZhsqMerchantProfile',
    data: params
  })
}
export const queryTZhsqMerchantProfileList = params => {
  return getRequest('/tZhsqMerchantProfile/queryTZhsqMerchantProfileList', params)
}
export const getTZhsqMerchantProfile = params => {
  return getRequest('/tZhsqMerchantProfile/getTZhsqMerchantProfile', params)
}
export const queryTZhsqMerchantProfileListByAnyWayWhere = params => {
  return getRequest('/tZhsqMerchantProfile/queryTZhsqMerchantProfileListByAnyWayWhere', params)
}
export const exportExcel = (params) => {
  return request({
    url: baseurl + '/tZhsqMerchantProfile/download', // 接口名字
    method: 'post',
    params: params,
    responseType: 'blob'// 通过api应该知道这是什么吧
  })
}
