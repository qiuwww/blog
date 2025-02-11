import {baseurl, getRequest, postRequest, putRequest, deleteRequest, importRequest, uploadFileRequest ,postRequestJson} from '@/libs/axios';
import request from '@/utils/request'
export const getByCondition = params => {
  return getRequest('/tWorkOrderBusiness/getByCondition',params);
};
export const apply = params => {
  return postRequest('/tWorkOrderBusiness/apply',params);
};

export const start = params => {
  return postRequest('/tWorkOrderBusiness/start',params);
};

export const cancel = params => {
  return postRequest('/tWorkOrderBusiness/cancel',params);
};
export const delByIds = params => {
  return deleteRequest('/tWorkOrderBusiness/delByIds',params);
};



