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

export const addTBasicInformationManagement = params => {
  return postRequestBodyJson('/tBasicInformationManagement/addTBasicInformationManagement', params);
};

export const addTBasicInformationManagementPatch = params => {
  return postRequestBodyJson('/tBasicInformationManagement/addTBasicInformationManagementPatch', params);
};
export const deleteTBasicInformationManagement = params => {
  return postRequest('/tBasicInformationManagement/deleteTBasicInformationManagement', params);
};
export const updateTBasicInformationManagement = params => {
  return postRequestBodyJson('/tBasicInformationManagement/updateTBasicInformationManagement', params);
};
export const queryTBasicInformationManagementList = params => {
  return getRequest('/tBasicInformationManagement/queryTBasicInformationManagementList', params);
};
export const getTBasicInformationManagement = params => {
  return getRequest('/tBasicInformationManagement/getTBasicInformationManagement', params);
};

export const updateByIds = params => {
  return postRequestBodyJson('/tBasicInformationManagement/updateByIds', params);
};




