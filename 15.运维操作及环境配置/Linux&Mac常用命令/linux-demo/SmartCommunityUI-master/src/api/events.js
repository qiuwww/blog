import request from '@/utils/request'
import {getRequest, postRequest, putRequest, deleteRequest, importRequest, getRequestWithNoToken,baseurl as base } from '@/libs/axios';
let baseUrl = base
// 获得全部事件
export const getAllLoad = async data => {
  return await request({
    url: baseUrl+'/events/loadAllByQuery',
    method: 'post',
    data
  })
}

// 获取流程流转历史
export const historicFlow = (id, params) => {
  return getRequest(`/events/historicFlow/${id}`, params)
}

// 审批任务通过
export const pass = (params) => {
  return postRequest('/events/pass', params)
}

// 获得全部事件类型
export const getEventType = async data => {
  return await request({
    url: baseUrl +'/events/type/loadAllByQuery',
    method: 'post',
    data
  })
}
// 查询事件类型 tree
export function queryEventsTypeTreeByPage(data) {
  return request({
    url:  baseUrl+'/events/type/queryEventsTypeTreeByPage',
    method: 'post',
    data
  })
}
// 查询事件类型 不分页 tree
export function queryEventsTypeTreeNotPage(data) {
  return request({
    url:  baseUrl+'/events/type/queryEventsTypeTreeNotPage',
    method: 'post',
    data
  })
}

// 获取单个网格事件
export function loadOne(data) {
  return request({
    url:  baseUrl+'/events/loadOne',
    method: 'post',
    data
  })
}
export const getloadOne = params => {
  return getRequest('/events/loadOne',params);
};

export const addEventType = async data => {
  return await request({
    url: baseUrl +'/events/type/add',
    method: 'post',
    data
  })
}

//流程审批 新增事件(分派不同审批人)
export const addEvents = async data => {
  return await request({
    url: baseUrl +'/events/addEvents',
    method: 'post',
    data
  })
}

//自办自结 新增事件(自己上报自己审批)
export const addEventsSelf = async data => {
  return await request({
    url: baseUrl +'/events/addEventsSelf',
    method: 'post',
    data
  })
}

//新增事件 不涉及流程
export const addEventsNotTask = async data => {
  return await request({
    url: baseUrl +'/events/add',
    method: 'post',
    data
  })
}

export const modifyEventType = async data => {
  return await request({
    url: baseUrl +'/events/type/modify',
    method: 'post',
    data
  })
}

export const modifyEvent = async data => {
  return await request({
    url: baseUrl +'/events/modify',
    method: 'post',
    data
  })
}

// deleteEventType
export const deleteEventType = async data => {
  return await request({
    url: baseUrl +'/events/type/delete',
    method: 'get',
    params: data
  })
}

export const getOrderDetails = async data => {
  return await request({
    url: baseUrl +'/events/getOrderDetails',
    method: 'get',
    params: data
  })
}

// 删除事件
export const deleteEvent = async data => {
  return await request({
    url: baseUrl +'/events/delete',
    method: 'get',
    params: data
  })
}

// 获取所又事件类型
export const getEventsTypeList = async data => {
  return await request({
    url: baseUrl +'/events/type/loadByQuery',
    method: 'get',
    params: data
  })
}

// 修改事件类型
export const changeEventsType = async data => {
  return await request({
    url: baseUrl +'//handle/changeEventsType',
    method: 'post',
    data
  })
}

// 事件属实
export const isAuthenticity = async data => {
  return await request({
    url: baseUrl +'/handle/isAuthenticity',
    method: 'post',
    data
  })
}
 // 不属实审核
 export const beVerified = async data => {
  return await request({
    url: baseUrl +'/handle/beVerified',
    method: 'post',
    data
  })
}


// 受理派遣
export const acceptDispatch = async data => {
  return await request({
    url: baseUrl +'/handle/distribute',
    method: 'post',
    data
  })
}

// 处理反馈
export const handlingAssignment = async data => {
  return await request({
    url: baseUrl +'/handle/processing',
    method: 'post',
    data
  })
}

// 异议审核 Objection review
export const handlingObjectionAssignment = async data => {
  return await request({
    url: baseUrl +'/handle/objectionReview',
    method: 'post',
    data
  })
}

// grid/handle/endEvents
// 结束事件
export const handlingEndEvents = async data => {
  return await request({
    url: baseUrl +'/handle/endEvents',
    method: 'post',
    data
  })
}

// 事件统计
export const eventsMap = async data => {
  return await request({
    url: baseUrl +'/events/getStatistics',
    method: 'post',
     data
  })
}

// 事件统计
export const getStatisticsPage = async data => {
  return await request({
    url: baseUrl +'/events/getStatisticsPage',
    method: 'post',
    data
  })
}

// 分级上报审核
export const hierarchical = async data => {
  return request({
    url: baseUrl +'/handle/examineHierarchical',
    method: 'post',
    data
  })
}

export const examine = async data => {
  return request({
    url: baseUrl +'/handle/examine',
    method: 'post',
    data
  })
}
// 分级上报 上报
 export const beforeHierarchical = async data => {
  return await request({
    url: baseUrl +'/handle/hierarchical',
    method: 'post',
    data
  })
}

