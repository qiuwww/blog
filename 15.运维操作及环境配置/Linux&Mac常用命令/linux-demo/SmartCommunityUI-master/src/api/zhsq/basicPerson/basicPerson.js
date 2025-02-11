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
export const addBasicPerson = params => {
  // return postRequest('/basicPerson/addBasicPerson',params);
  // return request({
  //   method: 'post',
  //   url: baseurl + `/basicPerson/addBasicPerson`,
  //   data: params
  // })
  return postRequestBodyJson('/basicPerson/addBasicPerson', params)
}

export const deleteBasicPerson = params => {
  return postRequestBodyJson('/basicPerson/deleteBasicPerson', params)
}
export const updateBasicPerson = params => {
  return postRequestBodyJson('/basicPerson/updateBasicPerson',params);
  // return request({
  //   method: 'post',
  //   url: baseurl + `/basicPerson/updateBasicPerson`,
  //   data: params
  // })
}
export const queryBasicPersonList = params => {
  return getRequest('/basicPerson/queryBasicPersonList', params)
}

export const getBasicPerson = params => {
  return getRequest('/basicPerson/getBasicPerson', params)
}
export const uploadPerson = params => {
  return getRequest('/basicPerson/uploadPerson', params)
}
export const count = params => {
  return getRequest('/basicPerson/count', params)
}
export const getSpecialPersonCount = params => {
  return getRequest('/basicPerson/getSpecialPersonCount', params)
}

export const getBuildArchiveByEstateId = params => {
  return getRequest('/basicPerson/getBuildArchiveByEstateId', params)
}
export const getPersonByCardId = params => {
  return getRequest('/basicPerson/getPersonByCardId', params)
}

export const addBasicPersonByType2 = params => {
  return request({
    method: 'post',
    url: baseurl + `/basicPerson/addBasicPersonByType2`,
    data: params
  })
}

export const updateBasicPersonByType2 = params => {
  return request({
    method: 'post',
    url: baseurl + `/basicPerson/updateBasicPersonByType2`,
    data: params
  })
}
// 档案查询统计
export const statisticsGridPerson = params => {
  return getRequest('/basicPerson/statisticsGridPerson')
}
// 人口查询统计
export const statisticsGridPerson2 = params => {
  return getRequest('/basicPerson/statisticsGridPerson2', params)
}
// 绑定房屋
export const bindHouse = params => {
  return postRequest('/basicPerson/bindHouse', params)
}
// 解绑房屋
export const outBind = params => {
  return postRequestBodyJson('/basicPerson/outBind', params)
}
// 获取身份证号
export const getCardId = params => {
  return getRequest('/basicPerson/getCardId', params)
}
// 一张图模糊查询
export const queryBasicPersonListByAnyWayWhere = params => {
  return getRequest('/basicPerson/queryBasicPersonListByAnyWayWhere', params)
}

// 房屋id查询人口信息
export const getPersonByHouseId = params => {
  return getRequest('/basicPerson/getPersonByHouseId', params)
}
// 导出人口数据
export const download = (params) => {
  return request({
    url: baseurl + '/basicPerson/download', // 接口名字
    method: 'post',
    params: params,
    responseType: 'blob'// 通过api应该知道这是什么吧
  })
}
// 导出人口数据
export  const downloadDynamics =async (params) => {
  return await request({
    url: baseurl + '/basicPerson/downloadDynamics', // 接口名字
    method: 'post',
    data: params,
    responseType: 'blob'// 通过api应该知道这是什么吧
  })
}
// // 查询当前社区下男女比例
// export const getPersonDataMaleToFemaleratio = params => {
//   return getRequest('/basicPerson/getPersonDataMaleToFemaleratio', params)
// }

// 查询当前社区下男女比例
export const getPersonDataMaleToFemaleratio = params => {
  return getRequest('/tZhsqMerchantProfile/selectByCommunityAndGrid', params)
}
export const queryBasicPersonDynamicList = params => {
  return getRequest('/basicPerson/queryBasicPersonDynamicList', params)
}

