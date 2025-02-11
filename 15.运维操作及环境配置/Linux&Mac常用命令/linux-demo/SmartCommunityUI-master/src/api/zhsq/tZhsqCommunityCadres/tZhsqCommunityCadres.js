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
export const addTZhsqCommunityCadres = params => {
  return request({
    method: 'post',
    url: baseurl + `/tZhsqCommunityCadres/addTZhsqCommunityCadres`,
    data: params
  })
}
export const deleteTZhsqCommunityCadres = params => {
  return postRequestBodyJson('/tZhsqCommunityCadres/deleteTZhsqCommunityCadres', params)
}
export const updateTZhsqCommunityCadres = params => {
  return request({
    method: 'post',
    url: baseurl + `/tZhsqCommunityCadres/updateTZhsqCommunityCadres`,
    data: params
  })
}
export const exportExcel = (params) => {
  return request({
    url: baseurl + '/tZhsqCommunityCadres/download', // 接口名字
    method: 'post',
    params: params,
    responseType: 'blob'// 通过api应该知道这是什么吧
  })
}
export const queryTZhsqCommunityCadresList = params => {
  return getRequest('/tZhsqCommunityCadres/queryTZhsqCommunityCadresList', params)
}
export const getTZhsqCommunityCadres = params => {
  return getRequest('/tZhsqCommunityCadres/getTZhsqCommunityCadres', params)
}

export const queryBasicResumeListByPersonId = params => {
  return getRequest('/basicResume/queryBasicResumeListByPersonId', params)
}
