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
export const addTZhsqGridMember = params => {
  return request({
    method: 'post',
    url: baseurl + `/tZhsqGridMember/addTZhsqGridMember`,
    data: params
  })
}
export const deleteTZhsqGridMember = params => {
  return postRequestBodyJson('/tZhsqGridMember/deleteTZhsqGridMember', params)
}
export const updateTZhsqGridMember = params => {
  return request({
    method: 'post',
    url: baseurl + `/tZhsqGridMember/updateTZhsqGridMember`,
    data: params
  })
}
export const queryTZhsqGridMemberList = params => {
  return getRequest('/tZhsqGridMember/queryTZhsqGridMemberList', params)
}
export const getTZhsqGridMember = params => {
  return getRequest('/tZhsqGridMember/getTZhsqGridMember', params)
}

export const exportExcel = (params) => {
  return request({
    url: baseurl + '/tZhsqGridMember/download', // 接口名字
    method: 'post',
    params: params,
    responseType: 'blob'// 通过api应该知道这是什么吧
  })
}
// 统计数据
export const getStatisticsData = params => {
  return getRequest('/tZhsqGridMember/getStatisticsData', params)
}
export const queryAllTZhsqGridMemberList = params => {
  return getRequest('/tZhsqGridMember/queryAllTZhsqGridMemberList', params)
}
export const queryAllTZhsqGridMemberListByGridId = params => {
  return getRequest('/tZhsqGridMember/queryAllTZhsqGridMemberListByGridId', params)
}
export const queryAllTZhsqGridMemberListByAnyWayWhere = params => {
  return getRequest('/tZhsqGridMember/queryAllTZhsqGridMemberListByAnyWayWhere', params)
}

export const gridPersonTrackQuery = params => {
  return getRequest('/tZhsqGridMember/gridPersonTrackQuery', params)
}
export const queryAllGridMemberListByGridId = params => {
  return getRequest('/tZhsqGridMember/queryAllGridMemberListByGridId', params)
}
export const getGridMemberTree = params => {
  return getRequest('/tZhsqGridMember/getGridMemberTree', params)
}
export const queryGridMemberList = params => {
  return getRequest('/tZhsqGridMember/queryGridMemberList', params)
}

