import request from '@/utils/request'
import { getRequest} from '@/libs/axios';

export function add(data) {
  return request({
    url: '/api/localStorage',
    method: 'post',
    data
  })
}

export function del(ids) {
  return request({
    url: '/api/localStorage/',
    method: 'delete',
    data: ids
  })
}

export function edit(data) {
  return request({
    url: '/api/localStorage',
    method: 'put',
    data
  })
}

export const getLocalAll = params => {
  return getRequest('/localStorage?page=' + (params.page-1) + '&size=' + params.size + '&sort=' + params.sort +
  '&blurry=' + params.blurry + '&createTime=' + params.createTime);
};

export default { add, edit, del }
