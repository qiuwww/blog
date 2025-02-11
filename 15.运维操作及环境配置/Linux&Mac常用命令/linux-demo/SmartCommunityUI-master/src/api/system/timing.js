import request from '@/utils/request'
import { getRequest, postRequest, putRequest, deleteRequest, importRequest, uploadFileRequest ,postRequestJson} from '@/libs/axios';
export function add(data) {
  return request({
    url: '/api/jobs',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: '/api/jobs',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: '/api/jobs',
    method: 'put',
    data
  })
}

export function updateIsPause(id) {
  return request({
    url: '/api/jobs/' + id,
    method: 'put'
  })
}

export function execution(id) {
  return request({
    url: '/api/jobs/exec/' + id,
    method: 'put'
  })
}
export const getJobsById = params => {
  return getRequest('/jobs/getById',params);
};
export const queryJobsList = params => {
  return getRequest('/jobs/queryListByPage',params);
};
export const deleteByIds = params => {
  return postRequest('/jobs/deleteByIds',params);
};
export const queryJobsLogList = params => {
  return getRequest('/jobs/logs',params);
};
// 退役军人按采集点导出
export const exportJobsLogExcel = (params) => {
  return request({
    url: '/api/jobs/logs/download', // 接口名字
    method: 'get',
    params: params,
    responseType: 'blob'//通过api应该知道这是什么吧
  })
}

export default { del, updateIsPause, execution, add, edit,getJobsById ,queryJobsList,deleteByIds}
