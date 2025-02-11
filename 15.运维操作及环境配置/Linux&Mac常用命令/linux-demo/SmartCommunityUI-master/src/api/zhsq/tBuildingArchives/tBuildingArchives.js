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
export const addTBuildingArchives = params => {
  // return postRequest('/tBuildingArchives/addTBuildingArchives',params);
  return request({
    method: 'post',
    url: baseurl + `/tBuildingArchives/addTBuildingArchives`,
    data: params
  })
}
export const deleteTBuildingArchives = params => {
  return postRequestBodyJson('/tBuildingArchives/deleteTBuildingArchives', params)
}
export const updateTBuildingArchives = params => {
  // return postRequest('/tBuildingArchives/updateTBuildingArchives',params);
  return request({
    method: 'post',
    url: baseurl +`/tBuildingArchives/updateTBuildingArchives`,
    data: params
  })
}
export const queryTBuildingArchivesList = params => {
  return getRequest('/tBuildingArchives/queryTBuildingArchivesList', params)
}
export const getTBuildingArchives = params => {
  return getRequest('/tBuildingArchives/getTBuildingArchives', params)
}
export const queryTBuildingArchivesAll = params => {
  return getRequest('/tBuildingArchives/queryTBuildingArchivesAll', params)
}

export const queryTBuildingArchivesListByAnyWayWhere = params => {
  return getRequest('/tBuildingArchives/queryTBuildingArchivesListByAnyWayWhere', params)
}
// 统计人口类型
export const statistics = params => {
  return getRequest('/tBuildingArchives/statistics', params)
}
// 获取最大单元数
export const getMaxUnit = params => {
  return getRequest('/tBuildingArchives/getMaxUnit', params)
}
// 查询单元中楼层数和层户数
export const getFloorAndDoor = params => {
  return getRequest('/tBuildingArchives/getFloorAndDoor', params)
}
export const exportExcel = (params) => {
  return request({
    url: baseurl + '/tBuildingArchives/download', // 接口名字
    method: 'post',
    params: params,
    responseType: 'blob'// 通过api应该知道这是什么吧
  })
}
// 查询除当前标绘面以外的所有数据
export const getOtherPolygonData = params => {
  return getRequest('/tBuildingArchives/getOtherPolygonData', params)
}
