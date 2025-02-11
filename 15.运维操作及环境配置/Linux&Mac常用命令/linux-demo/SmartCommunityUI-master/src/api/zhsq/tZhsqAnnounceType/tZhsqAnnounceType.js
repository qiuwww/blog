import {getRequest, postRequest, postRequestBodyJson} from '@/libs/axios';

export const addTZhsqAnnounceType = params => {
  return postRequestBodyJson('/tZhsqAnnounceType/addTZhsqAnnounceType', params);
};
export const deleteTZhsqAnnounceType = params => {
  return postRequest('/tZhsqAnnounceType/deleteTZhsqAnnounceType', params);
};
export const updateTZhsqAnnounceType = params => {
  return postRequestBodyJson('/tZhsqAnnounceType/updateTZhsqAnnounceType', params);
};

export const queryTZhsqAnnounceTypeList = params => {
  return getRequest('/tZhsqAnnounceType/queryTZhsqAnnounceTypeList', params);
};
export const getTZhsqAnnounceType = params => {
  return getRequest('/tZhsqAnnounceType/getTZhsqAnnounceType', params);
};
export const queryAllTZhsqAnnounceTypeList = params => {
  return getRequest('/tZhsqAnnounceType/queryAllTZhsqAnnounceTypeList', params);
};
