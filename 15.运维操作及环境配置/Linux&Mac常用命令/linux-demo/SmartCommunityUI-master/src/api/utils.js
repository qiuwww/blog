import request from '@/utils/request'

export const uploadImg = async data => {
  return request({
    url: '/api/download/fileUpload',
    method: 'post',
    data
  })
}

// 删除
export const deletImg = async data => {
  return request({
    url: '/api/download/fileDelete',
    method: 'get',
    params: data
  })
}



// import { queryAllList } from '@/api/zhsq/basicGrids/basicGrids' ; 获取 社区 id 下的 网格 communityId

export const getCommunityList = async data => {
  return request({
    url: '/server/grid/dept/loadCommunityDeptByStreet',
    method: 'post',
    data
  })
}

export const getLoadStreetDept = async data => {
  return request({
    url: '/server/grid/dept/loadStreetDept',
    method: 'get',
    data
  })
}
// api/basicGrids/queryBasicGridsList
// 拉取所有网格
export const getAllGrid = async data => {
  return request({
    url: '/api/basicGrids/queryBasicGridsList ',
    method: 'get',
    data
  })
}
// /base/download/fileDelete

// /tZhsqMerchantProfile/selectByCommunityAndGrid
// 数据大屏
export const bigData = async data => {
  return request({
    url: '/api/tZhsqMerchantProfile/selectByCommunityAndGrid',
    method: 'get',
    params: data
  })
}

// 获取事件类型数据 大屏
export const eventsTypeData = async data => {
  return request({
    url: '/server/grid/events/getBigData',
    method: 'post',
    data
  })
}

// 获取任务类型数据
export const taskTypeData = async data => {
  return request({
    url: baseUrl +'/work/details/getBigData',
    method: 'post',
    data
  })
}
// 获取 提示消息
// /grid/push/loadUnreadCount
export const getAllMsg = async data => {
  return request({
    url: '/server/grid/push/loadMsgInWeb',
    method: 'post',
    data
  })
}

// 党建数据大屏/* partypc party */

export const partyBuilding = async data => {
  return request({
    url:'/party/report/analysis',
    method: 'get',
    params: data
  })
}

// 所有消息已读
export const setReadStatus = async data => {
  return request({
    url: '/server/grid/push/setReadStatus',
    method: 'post',
    data
  })
}
//获取车辆进出记录统计
export const getCarOutNumlist = async data => {
  return request({
    url:'/server/grid/parking/lot/getCarStatistics',
    method: 'get',
    params: data
  })
}





