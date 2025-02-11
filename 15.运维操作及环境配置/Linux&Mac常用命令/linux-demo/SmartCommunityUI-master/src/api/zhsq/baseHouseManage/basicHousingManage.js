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

export const addBasicHousing = params => {
  return postRequest('/basicHousing/addBasicHousing', params)
}
export const deleteBasicHousingManage = params => {
  return postRequestBodyJson('/basicHousing/deleteBasicHousing', params)
}
export const updateBasicHousingManage = params => {
  return postRequest('/basicHousing/updateBasicHousing', params)
}
export const queryBasicHousingManageList = params => {
  return getRequest('/basicHousing/queryBasicHousingList', params)
}
export const getBasicHousingManage = params => {
  return getRequest('/basicHousing/getBasicHousing', params)
}
export const getAllBasicHousingManage = params => {
  return getRequest('/basicHousing/getAllBasicHousing', params)
}
export const queryHousingManage = params => {
  return getRequest('/basicHousingManage/queryHousingManage', params)
}
export const exportExcel = (params) => {
  return request({
    url: baseurl + '/basicHousingManage/download', // 接口名字
    method: 'post',
    params: params,
    responseType: 'blob'// 通过api应该知道这是什么吧
  })
}

export const getHouseTree = params => {
  return getRequest('/basicHousing/getHouseTree', params)
}

export const getRealHouseAndDoor = params => {
  return getRequest('/basicHousing/getRealHouseAndDoor', params)
}

export const getRealDoorAndPerson = params => {
  return getRequest('/basicHousing/getRealDoorAndPerson', params)
}
