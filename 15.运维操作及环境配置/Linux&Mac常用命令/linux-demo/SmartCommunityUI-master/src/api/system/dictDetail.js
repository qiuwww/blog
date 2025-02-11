import request from '@/utils/request'
import { postRequest} from '@/libs/axios';
export function get(dictName) {
  const params = {
    dictName,
    page: 0,
    size: 9999
  }
  return request({
    url: '/api/dictDetail',
    method: 'get',
    params
  })
}

export function getDictMap(dictName) {
  const params = {
    dictName,
    page: 0,
    size: 9999
  }
  return request({
    url: '/api/dictDetail/map',
    method: 'get',
    params
  })
}

export function addDetail(data) {
  return request({
    url: '/api/dictDetail',
    method: 'post',
    data
  })
}

export function delDetail(id) {
  return request({
    url: '/api/dictDetail/' + id,
    method: 'delete'
  })
}

export function editDetail(data) {
  return request({
    url: '/api/dictDetail',
    method: 'put',
    data
  })
}

export const delAll = params => {
  return postRequest('/dictDetail/delete',params);
};



export default { addDetail, editDetail, delDetail }
