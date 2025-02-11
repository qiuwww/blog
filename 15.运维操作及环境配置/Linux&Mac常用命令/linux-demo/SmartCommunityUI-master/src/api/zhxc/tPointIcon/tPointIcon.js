import { getRequest, postRequest, putRequest, deleteRequest, importRequest, uploadFileRequest ,postRequestJson,postRequestBodyJson} from '@/libs/axios';
import request from '@/utils/request'
export const addTPointIcon = params => {
  return postRequestBodyJson('/tPointIcon/addTPointIcon',params);
};
export const deleteTPointIcon = params => {
  return postRequest('/tPointIcon/deleteTPointIcon',params);
};
export const updateTPointIcon = params => {
  return postRequestBodyJson('/tPointIcon/updateTPointIcon',params);
};
export const queryTPointIconList = params => {
  return getRequest('/tPointIcon/queryTPointIconList',params);
};
export const getTPointIcon = params => {
  return getRequest('/tPointIcon/getTPointIcon',params);
};
export const queryAllTPointIconList = params => {
  return getRequest('/tPointIcon/queryAllTPointIconList',params);
};
