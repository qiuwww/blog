import request from '@/utils/request'
import { getRequest, postRequest, putRequest, deleteRequest, importRequest, uploadFileRequest, postRequestJson} from '@/libs/axios';

export function add(data) {
  return request({
    url: '/api/serverDeploy',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: '/api/serverDeploy',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: '/api/serverDeploy',
    method: 'put',
    data
  })
}

export const queryServerList = params => {//查询所有的服务器
  return getRequest('/serverDeploy', params);
};

export default { add, edit, del }
