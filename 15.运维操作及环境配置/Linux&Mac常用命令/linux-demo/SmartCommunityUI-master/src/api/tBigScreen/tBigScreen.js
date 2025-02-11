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

export const addTBigScreen = params => {
  return postRequestBodyJson('/tBigScreen/addTBigScreen', params);
};
export const deleteTBigScreen = params => {
  return postRequest('/tBigScreen/deleteTBigScreen', params);
};
export const updateTBigScreen = params => {
  return postRequestBodyJson('/tBigScreen/updateTBigScreen', params);
};
export const queryTBigScreenList = params => {
  return getRequest('/tBigScreen/queryTBigScreenList', params);
};
export const getTBigScreen = params => {
  return getRequest('/tBigScreen/getTBigScreen', params);
};
