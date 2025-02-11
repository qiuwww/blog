import request from '@/utils/request'
import { getRequest, postRequest, putRequest, deleteRequest, importRequest, uploadFileRequest ,postRequestJson} from '@/libs/axios';
import qs from "qs";

// 获取所有的Role
export function getAll() {
  return request({
    url: '/api/roles/all',
    method: 'get'
  })
}

export function add(data) {
  return request({
    url: '/api/roles',
    method: 'post',
    data
  })
}

export function get(id) {
  return request({
    url: '/api/roles/' + id,
    method: 'get'
  })
}

export function getLevel() {
  return request({
    url: '/api/roles/level',
    method: 'get'
  })
}

export function del(ids) {
  return request({
    url: '/api/roles',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: '/api/roles',
    method: 'put',
    data
  })
}

export function editMenu(data) {
  return request({
    url: '/api/roles/menu',
    method: 'put',
    data
  })
}

export const queryRoleList = params => {
  return getRequest('/roles',params);
};
export const getRolesByPage = params => {
  return request({
    url: '/api/roles/getRolesByPage',
    method: 'post',
    data:params
  })
};
export const downloadRoles = params => {
  return request({
    url: '/api/roles/download' + '?' + qs.stringify(params, { indices: false }),
    method: 'get',
    responseType: 'blob'
  });
};

export default { add, edit, del, get, editMenu, getLevel,queryRoleList,getRolesByPage }
