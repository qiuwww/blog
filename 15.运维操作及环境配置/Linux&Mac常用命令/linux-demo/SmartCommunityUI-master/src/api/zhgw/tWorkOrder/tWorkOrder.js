import {baseurl, getRequest, postRequest, putRequest, deleteRequest, importRequest, uploadFileRequest ,postRequestJson} from '@/libs/axios';
import request from '@/utils/request'
export const addTWorkOrder = params => {
  return postRequest('/tWorkOrder/addTWorkOrder',params);
};
export const deleteTWorkOrder = params => {
  return postRequest('/tWorkOrder/deleteTWorkOrder',params);
};
export const updateTWorkOrder = params => {
  return postRequest('/tWorkOrder/updateTWorkOrder',params);
};
export const queryTWorkOrderList = params => {
  return getRequest('/tWorkOrder/queryTWorkOrderList',params);
};
export const getTWorkOrder = params => {
  return getRequest('/tWorkOrder/getTWorkOrder',params);
};
export const getNumber = params => {
  return getRequest('/tWorkOrder/getNumber',params);
};

export const download = (params) => { // 导出房屋数据
  return request({
    url: baseurl + '/tWorkOrder/download', // 接口名字
    method: 'post',
    params: params,
    responseType: 'blob'// 通过api应该知道这是什么吧,
  })
}
