import request from '@/utils/request'
import { getRequest, postRequest, putRequest, deleteRequest, importRequest, uploadFileRequest, postRequestJson} from '@/libs/axios';

export function add(data) {
  return request({
    url: '/api/database',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: '/api/database',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: '/api/database',
    method: 'put',
    data
  })
}

export function testDbConnection(data) {
  return request({
    url: '/api/database/testConnect',
    method: 'post',
    data
  })
}

export const queryDbList = params => {//查询所有的数据库
  return getRequest('/database', params);
};

export default { add, edit, del, testDbConnection }
