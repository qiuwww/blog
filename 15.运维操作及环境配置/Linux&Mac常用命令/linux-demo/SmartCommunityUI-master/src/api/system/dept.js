import request from '@/utils/request'
import { getRequest, postRequest, putRequest, deleteRequest, importRequest, uploadFileRequest ,postRequestJson} from '@/libs/axios';
export function getDepts(params) {
  return request({
    url: '/api/dept',
    method: 'get',
    params
  })
}

export function add(data) {
  return request({
    url: '/api/dept',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: '/api/dept',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: '/api/dept',
    method: 'put',
    data
  })
}
export function getDept(params) {
  return request({
    url: '/api/dept',
    method: 'get',
    params
  })
}

export const getDpetById = params => {
  return getRequest('/dept/getDpetById',params);
};

export const deleteByIds = params => {
  return postRequest('/dept/deleteByIds',params);
};


export const getAllDepList = params => {
  return getRequest('/dept/getAllDepList',params);
};
export default { add, edit, del }
