import request from '@/utils/request'
import { encrypt } from '@/utils/rsaEncrypt'
import { getRequest,postRequest,deleteRequest} from '@/libs/axios';

export function add(data) {
  return request({
    url: '/api/users',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: '/api/users',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: '/api/users',
    method: 'put',
    data
  })
}

export function editUser(data) {
  return request({
    url: '/api/users/center',
    method: 'put',
    data
  })
}

export function updatePass(user) {
  const data = {
    oldPass: encrypt(user.oldPass),
    newPass: encrypt(user.newPass)
  }
  return request({
    url: '/api/users/updatePass/',
    method: 'post',
    data
  })
}

export function updateEmail(form) {
  const data = {
    password: encrypt(form.pass),
    email: form.email
  }
  return request({
    url: '/api/users/updateEmail/' + form.code,
    method: 'post',
    data
  })
}

export const getAllUsers = params => {
  return getRequest('/users/getAllUsers', params);
};

export const deleteUser = params => {
  return postRequest('/users/deleteUser', params);
};
export const patchUpdateState = params => {
  return postRequest('/users/updataUserState', params);
};

/*获取用户数据权限树*/
export const getDeptTree = params => {
  return getRequest('/users/getDeptTree', params);
};

export default { add, edit, del, getAllUsers, deleteUser,patchUpdateState,getDeptTree }

