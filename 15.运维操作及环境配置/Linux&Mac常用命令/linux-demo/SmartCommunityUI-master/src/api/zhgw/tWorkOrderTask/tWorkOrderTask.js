import {baseurl, getRequest, postRequest, putRequest, deleteRequest, importRequest, uploadFileRequest ,postRequestJson} from '@/libs/axios';
import request from '@/utils/request'
export const todoList = params => {
  return getRequest('/tWorkOrderTask/todoList',params);
};

export const doneList = params => {
  return getRequest('/tWorkOrderTask/doneList',params);
};

export const historicFlow = params => {
  return getRequest('/tWorkOrderTask/historicFlow',params);
};

export const pass = params => {
  return postRequest('/tWorkOrderTask/pass',params);
};

export const passAll = params => {
  return postRequest('/tWorkOrderTask/passAll',params);
};

export const getBackList = params => {
  return getRequest('/tWorkOrderTask/getBackList',params);
};

export const backToTask = params => {
  return postRequest('/tWorkOrderTask/backToTask',params);
};

export const back = params => {
  return postRequest('/tWorkOrderTask/back',params);
};

export const backAll = params => {
  return postRequest('/tWorkOrderTask/backAll',params);
};

export const delegate = params => {
  return postRequest('/tWorkOrderTask/delegate',params);
};

// export const delete = params => {
//   return deleteRequest('/tWorkOrderTask/delete',params);
// };

export const deleteHistoric = params => {
  return deleteRequest('/tWorkOrderTask/deleteHistoric',params);
};

