import request from '@/utils/request'

export function getFieldData(tableName) {
  return request({
    url: '/api/genConfig/' + tableName,
    method: 'get'
  })
}

export function update(data) {
  return request({
    url: '/api/genConfig',
    data,
    method: 'put'
  })
}

export function get(tableName) {
  return request({
    url: '/api/genConfig/' + tableName,
    method: 'get'
  })
}
