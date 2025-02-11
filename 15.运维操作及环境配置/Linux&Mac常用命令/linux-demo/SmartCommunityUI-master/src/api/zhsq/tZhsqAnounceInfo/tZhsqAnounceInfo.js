import {getRequest, postRequest, postRequestBodyJson} from '@/libs/axios';

export const addTZhsqAnounceInfo = params => {
  return postRequestBodyJson('/tZhsqAnounceInfo/addTZhsqAnounceInfo', params);
};
export const deleteTZhsqAnounceInfo = params => {
  return postRequest('/tZhsqAnounceInfo/deleteTZhsqAnounceInfo', params);
};
export const updateTZhsqAnounceInfo = params => {
  return postRequestBodyJson('/tZhsqAnounceInfo/updateTZhsqAnounceInfo', params);
};
export const queryTZhsqAnounceInfoList = params => {
  return postRequest('/tZhsqAnounceInfo/queryTZhsqAnounceInfoList', params);
};
export const getTZhsqAnounceInfo = params => {
  return getRequest('/tZhsqAnounceInfo/getTZhsqAnounceInfo', params);
};
