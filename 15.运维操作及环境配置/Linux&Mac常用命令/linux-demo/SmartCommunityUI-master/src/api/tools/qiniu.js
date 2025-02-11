import request from '@/utils/request'
import { getRequest} from '@/libs/axios';

export function get() {
  return request({
    url: '/api/qiNiuContent/config',
    method: 'get'
  })
}

export function update(data) {
  return request({
    url: '/api/qiNiuContent/config',
    data,
    method: 'put'
  })
}

export function download(id) {
  return request({
    url: '/api/qiNiuContent/download/' + id,
    method: 'get'
  })
}

export function sync() {
  return request({
    url: '/api/qiNiuContent/synchronize',
    method: 'post'
  })
}

export function del(ids) {
  return request({
    url: '/api/qiNiuContent',
    method: 'delete',
    data: ids
  })
}

export const getQiniuAll = params => {
  return getRequest('/qiNiuContent?page=' + (params.page-1) + '&size=' + params.size + '&sort=' + params.sort +
  '&key='+ params.key + '&c=' + params.c);
};

export default { del, download, sync }
