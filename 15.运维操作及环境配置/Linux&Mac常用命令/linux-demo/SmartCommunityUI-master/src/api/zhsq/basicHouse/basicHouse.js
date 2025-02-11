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

export const addBasicHousingCustomer = params => {
  return postRequest('/basicHousing/addBasicHousing', params)
}
export const deleteBasicHousingCustomer = params => {
  return postRequestBodyJson('/basicHousing/deleteBasicHousing', params)
}

export const queryBasicHousingCustomerList = params => {
  return getRequest('/basicHousing/queryBasicHousingList', params)
}
export const getBasicHousingCustomer = params => {
  return getRequest('/basicHousing/getBasicHousing', params)
}
export const addBasicHousing = params => {
  return request({
    method: 'post',
    url: baseurl + `/basicHousing/addBasicHousing`,
    data: params
  })
}

export const updateBasicHousing = params => {
  return request({
    method: 'post',
    url: baseurl +`/basicHousing/updateBasicHousing`,
    data: params
  })
}

export const updateBasicHousingCustomer = params => {
  return request({
    method: 'post',
    url: baseurl + `/basicHousing/updateBasicHousingCustomer`,
    data: params
  })
}

export const deleteBasicHousingManage = params => {
  return postRequestBodyJson('/basicHousing/deleteBasicHousing', params)
}

export const queryBasicHousingManageList = params => {
  return getRequest('/basicHousing/queryBasicHousingList', params)
}
export const getBasicHousing = params => {
  return getRequest('/basicHousing/getBasicHousing', params)
}
export const getAllBasicHousingManage = params => {
  return getRequest('/basicHousing/getAllBasicHousing', params)
}
export const queryHousing = params => {
  return getRequest('/basicHousing/queryHousing', params)
}
export const getUnitByBuildArchiveId = params => {
  return getRequest('/basicHousing/getUnitByBuildArchiveId', params)
}

export const getAllPersonByRela = params => {
  return getRequest('/basicHousing/getAllPersonByRela', params)
}

export const getRoomByBuildArchiveId = params => {
  return getRequest('/basicHousing/getRoomByBuildArchiveId', params)
}

export const getRealOfHouseAndDoor = params => {
  return getRequest('/basicHousing/getRealOfHouseAndDoor', params)
}

export const queryBasicHousingListByAnyWayWhere = params => {
  return getRequest('/basicHousing/queryBasicHousingListByAnyWayWhere', params)
}

export const getUnits = params => {
  return getRequest('/basicHousing/getUnits', params)
}

export const getFloors = params => {
  return getRequest('/basicHousing/getFloors', params)
}

export const getDoorNumbers = params => {
  return getRequest('/basicHousing/getDoorNumbers', params)
}

// 根据人员id,获取房屋信息
export const getHouseByPersonId = params => {
  return getRequest('/basicHousing/getHouseByPersonId', params)
}
export const exportExcel = (params) => {
  return request({
    url: baseurl + '/basicHousing/download', // 接口名字
    method: 'post',
    params: params,
    responseType: 'blob'// 通过api应该知道这是什么吧
  })
}
export const exportExcelRent = (params) => {
  return request({
    url: baseurl + '/basicHousing/downloadRent', // 接口名字
    method: 'post',
    params: params,
    responseType: 'blob'// 通过api应该知道这是什么吧
  })
}


