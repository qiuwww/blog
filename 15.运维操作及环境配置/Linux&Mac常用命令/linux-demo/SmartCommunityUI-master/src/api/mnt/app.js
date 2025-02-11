import request from '@/utils/request'
import { getRequest, postRequest, putRequest, deleteRequest, importRequest, uploadFileRequest ,postRequestJson} from '@/libs/axios';
export function add(data) {
  return request({
    url: '/api/app',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: '/api/app',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: '/api/app',
    method: 'put',
    data
  })
}
export const getAppById = params => {
  return getRequest('/app/getAppById',params);
};
export const queryAppList = params => {
  return getRequest('/app/queryAppList',params);
};
export const deleteByIds = params => {
  return postRequest('/app/deleteByIds',params);
};
export default { add, edit, del }
