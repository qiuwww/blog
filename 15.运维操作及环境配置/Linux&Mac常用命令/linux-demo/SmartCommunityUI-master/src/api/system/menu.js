import request from '@/utils/request'

import { getRequest,putRequest,postRequest} from '@/libs/axios';

export const getMenus = params => {
  return getRequest('/menus/getMenus',params);
};
export const editMenus = params => {
  return request({
    method: 'post',
    url: `/api/menus/editMenus`,
    data:params
  });
};

export const addMenus = params => {
  return request({
    method: 'post',
    url: `/api/menus/addMeuns`,
    data:params
  });
};

export const deleteMenus = params => {
  return postRequest('/menus/delete',params);
};


export function getMenusTree() {
  return request({
    url: '/api/menus/tree',
    method: 'get'
  })
}

export function buildMenus() {
  return request({
    url: '/api/menus/build',
    method: 'get'
  })
}

export function add(data) {
  return request({
    url: '/api/menus',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: '/api/menus',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: '/api/menus',
    method: 'put',
    data
  })
}

export const getLeftMenuTree = params => {
  return getRequest('/menus/getLeftMenuTree',params);
};

export default { add, edit, del, getMenusTree }
