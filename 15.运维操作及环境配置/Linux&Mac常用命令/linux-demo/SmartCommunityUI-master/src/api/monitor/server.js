import request from '@/utils/request'
import { getRequest, postRequest, putRequest, deleteRequest, importRequest, uploadFileRequest ,postRequestJson} from '@/libs/axios';
export function add(data) {
  return request({
    url: '/api/server',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: '/api/server',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: '/api/server',
    method: 'put',
    data
  })
}

export function queryServerList(params) {
  return getRequest('/server',params);
}


export default { add, edit, del, queryServerList }
