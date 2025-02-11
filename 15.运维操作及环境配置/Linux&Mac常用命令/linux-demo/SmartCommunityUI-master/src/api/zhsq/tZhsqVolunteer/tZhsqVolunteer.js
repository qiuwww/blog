import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
  importRequest,
  uploadFileRequest,
  postRequestJson,
  postRequestBodyJson,
  baseurl
} from '@/libs/axios'
import request from '@/utils/request'
export const addTZhsqVolunteer = params => {
  //
  return request({
    method: 'post',
    url: baseurl + `/tZhsqVolunteer/addTZhsqVolunteer`,
    data: params
		  })

  // return postRequestJson('/tZhsqVolunteer/addTZhsqVolunteer',params);
}
export const deleteTZhsqVolunteer = params => {
  // return postRequestBodyJson('/tZhsqVolunteer/deleteTZhsqVolunteer', JSON.stringify(params) )
  return postRequestBodyJson('/tZhsqVolunteer/deleteTZhsqVolunteer', params)
}

export const updateTZhsqVolunteer = params => {
  //
  return request({
    method: 'post',
    url: baseurl + `/tZhsqVolunteer/updateTZhsqVolunteer`,
    data: params
		  })
  // return postRequestJson('/tZhsqVolunteer/updateTZhsqVolunteer',params);
}
export const queryTZhsqVolunteerList = params => {
  return getRequest('/tZhsqVolunteer/queryTZhsqVolunteerList', params)
}
export const getTZhsqVolunteer = params => {
  return getRequest('/tZhsqVolunteer/getTZhsqVolunteer', params)
}
export const exportExcel = (params) => {
  return request({
    url: baseurl + '/tZhsqVolunteer/download', // 接口名字
    method: 'post',
    params: params,
    responseType: 'blob'// 通过api应该知道这是什么吧
  })
}

export const queryAllList = params => {
  return getRequest('/tZhsqVolunteer/queryAllList', params)
}
