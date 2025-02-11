import request from '@/utils/request'
import { getRequest, postRequest, putRequest, deleteRequest, importRequest, uploadFileRequest ,postRequestJson} from '@/libs/axios';
export function getAllJob(deptId) {
  const params = {
    deptId,
    page: 0,
    size: 9999
  }
  return request({
    url: '/api/job',
    method: 'get',
    params
  })
}

export function add(data) {
  return request({
    url: '/api/job',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: '/api/job',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: '/api/job',
    method: 'put',
    data
  })
}
export const getJob = params => {
  return getRequest('/job/getJobById',params);
};
export const queryJobList = params => {
  return getRequest('/job/queryJobList',params);
};
export const deleteByIds = params => {
  return postRequest('/job/deleteByIds',params);
};
export default { add, edit, del }
