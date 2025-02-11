import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
  importRequest,
  uploadFileRequest,
  postRequestJson,
  postRequestBodyJson
} from '@/libs/axios';
import request from '@/utils/request'

export const addTBasicPolylineManagement = params => {
  return postRequestBodyJson('/tBasicPolylineManagement/addTBasicPolylineManagement', params);
};
export const addTBasicPolylineManagementPatch = params => {
  return postRequestBodyJson('/tBasicPolylineManagement/addTBasicPolylineManagementPatch', params);
};


export const deleteTBasicPolylineManagement = params => {
  return postRequest('/tBasicPolylineManagement/deleteTBasicPolylineManagement', params);
};
export const updateTBasicPolylineManagement = params => {
  return postRequestBodyJson('/tBasicPolylineManagement/updateTBasicPolylineManagement', params);
};
export const queryTBasicPolylineManagementList = params => {
  return getRequest('/tBasicPolylineManagement/queryTBasicPolylineManagementList', params);
};
export const getTBasicPolylineManagement = params => {
  return getRequest('/tBasicPolylineManagement/getTBasicPolylineManagement', params);
};
export const updateByIds = params => {
  return postRequestBodyJson('/tBasicPolylineManagement/updateByIds', params);
};
