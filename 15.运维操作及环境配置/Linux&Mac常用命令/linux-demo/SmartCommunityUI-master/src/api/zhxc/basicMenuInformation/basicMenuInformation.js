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
} from '@/libs/axios';
import request from '@/utils/request'

export const addBasicMenuInformation = params => {
  return postRequestBodyJson('/basicMenuInformation/addBasicMenuInformation', params);
};
export const editBasicMenuInformation = params => {
  return postRequestBodyJson('/basicMenuInformation/editBasicMenuInformation', params);
};
export const getBasicMenuInformationById = params => {
  return getRequest('/basicMenuInformation/getBasicMenuInformationById', params);
};

export const getBasicMenuInformationList = params => {
  return getRequest('/basicMenuInformation/getBasicMenuInformationList', params);
};
export const deleteBasicMenuInformation = params => {
  return postRequest('/basicMenuInformation/deleteBasicMenuInformation', params);
};

export const uploadImages = params => {
  return request({
    method: 'post',
    url: baseurl + `/basicMenuInformation/uploadImages`,
    data: params
  })
};


export const getBasicMenuInformationByMenuPath = params => {
  return getRequest('/basicMenuInformation/getBasicMenuInformationByMenuPath', params);
};

export const getSecondMenuByPath = params => {
  return getRequest('/basicMenuInformation/getSecondMenuByPath', params);
};

export const getMenuWithoutChild = params => {
  return getRequest('/basicMenuInformation/getMenuWithoutChild', params);
}; 

export const getFirstMenu = params => {
  return getRequest('/basicMenuInformation/getFirstMenu', params);
};
