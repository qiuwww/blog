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
export const addBasicSocialOrganization = params => {
  return request({
    method: 'post',
    url: baseurl + '/basicSocialOrganization/addBasicSocialOrganization',
    data: params
  })
}
export const deleteBasicSocialOrganization = params => {
  return postRequestBodyJson('/basicSocialOrganization/deleteBasicSocialOrganization', params)
}
export const updateBasicSocialOrganization = params => {
  return request({
    method: 'post',
    url: baseurl + '/basicSocialOrganization/updateBasicSocialOrganization',
    data: params
  })
}
export const queryBasicSocialOrganizationList = params => {
  return getRequest('/basicSocialOrganization/queryBasicSocialOrganizationList', params)
}
export const getBasicSocialOrganization = params => {
  return getRequest('/basicSocialOrganization/getBasicSocialOrganization', params)
}
export const exportExcel = (params) => {
  return request({
    url: baseurl + '/basicSocialOrganization/download', // 接口名字
    method: 'post',
    params: params,
    responseType: 'blob'// 通过api应该知道这是什么吧
  })
}

export const getCommunityCountData = () => {
  return getRequest('/basicSocialOrganization/getCommunityCountData')
}

export const getGridsCountData = () => {
  return getRequest('/basicSocialOrganization/getGridsCountData')
}
export const queryBasicSocialOrganizationListByAnyWayWhere = params => {
  return getRequest('/basicSocialOrganization/queryBasicSocialOrganizationListByAnyWayWhere', params)
}
