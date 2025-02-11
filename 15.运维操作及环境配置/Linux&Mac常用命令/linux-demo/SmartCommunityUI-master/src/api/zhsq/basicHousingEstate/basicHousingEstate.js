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
export const addBasicHousingEstate = params => {
  return postRequestBodyJson('/basicHousingEstate/addBasicHousingEstate', params)
}
export const deleteBasicHousingEstate = params => {
  return postRequestBodyJson('/basicHousingEstate/deleteBasicHousingEstate', params)
}
export const updateBasicHousingEstate = params => {
  return postRequestBodyJson('/basicHousingEstate/updateBasicHousingEstate', params)
}
export const queryBasicHousingEstateList = params => {
  return getRequest('/basicHousingEstate/queryBasicHousingEstateList', params)
}
export const getBasicHousingEstate = params => {
  return getRequest('/basicHousingEstate/getBasicHousingEstate', params)
}
export const queryAllList = params => {
  return getRequest('/basicHousingEstate/queryAllList', params)
}
export const download = (params) => {
  return request({
		  url: baseurl + '/basicHousingEstate/download', // 接口名字
		  method: 'post',
		  params: params,
		  responseType: 'blob'// 通过api应该知道这是什么吧
  })
}
