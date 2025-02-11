import request from '@/utils/request'
import { getRequest, postRequest, putRequest, deleteRequest, importRequest, uploadFileRequest ,postRequestJson} from '@/libs/axios';
// import {add, edit} from "../mnt/app";

export function del(ids) {
  return request({
    url: '/api/pictures',
    method: 'delete',
    data: ids
  })
}
export function add(data) {
  return request({
    url: '/api/pictures',
    method:  'post',
    data
  })
}
export function edit(data) {
  return request({
    url: '/api/pictures',
    method: 'put',
    data
  })
}
export function sync() {
  return request({
    url: '/api/pictures/synchronize',
    method: 'post'
  })
}
export const queryPictureList  = params => {
  return getRequest('/pictures',params);
};

export const deleteByIds = params => {
  return postRequest('/pictures/deleteByIds',params);
};
export default { add, edit, del }

