import request from '@/utils/request'
import {getRequest, postRequest, putRequest, deleteRequest, importRequest, getRequestWithNoToken,baseurl as prefix } from '@/libs/axios';
/*
 *  党员管理接口
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */

/*
 *  党员管理列表
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getpartymemberList = async data => {
  return await request({
    url: prefix + '/admin/party/partymember',
    method: 'get',
    params: data
  })
}

/*
 *  党员管理新增
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const partymemberAdd = async data => {
  return await request({
    url: prefix + '/admin/party/partymember',
    method: 'post',
    data
  })
}

/*
 *  党员管理修改
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const partymemberEdit = async data => {
  return await request({
    url: prefix + '/admin/party/partymember/' + data.id,
    method: 'post',
    data
  })
}

/*
 *  党员管理删除
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const partymemberDelete = async data => {
  return await request({
    url: prefix + '/admin/party/partymember/' + data,
    method: 'delete'
  })
}

/*
 *  档案转入转出列表
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getinoutlist = async data => {
  return await request({
    url: prefix + '/admin/party/inoutlist',
    method: 'get',
    params: data
  })
}

/*
 *  档案转入转出审核通过
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const inoutadopt = async data => {
  return await request({
    url: prefix + '/admin/party/inoutadopt/' + data.id,
    method: 'post',
    data
  })
}

/*
 *  档案转入转出驳回
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const inoutreject = async data => {
  return await request({
    url: prefix + '/admin/party/inoutreject/' + data.id,
    method: 'post',
    data
  })
}

/*
 *  党员表彰列表
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const partycommendList = async data => {
  return await request({
    url: prefix + '/admin/party/partycommend',
    method: 'get',
    params: data
  })
}

/*
 *  党员表彰新增
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const partycommendAdd = async data => {
  return await request({
    url: prefix + '/admin/party/partycommend',
    method: 'post',
    data
  })
}

/*
 *  党员表彰删除
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const partycommendDelete = async data => {
  return await request({
    url: prefix + '/admin/party/partycommend/' + data,
    method: 'delete'
  })
}

/*
 *  党员表彰修改
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const partycommendEdit = async data => {
  return await request({
    url: prefix + '/admin/party/partycommend/' + data.id,
    method: 'put',
    data
  })
}

/*
 *  党员表彰详情
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const partycommendInfo = async data => {
  return await request({
    url: prefix + '/admin/party/partycommend/' + data.id,
    method: 'get'
  })
}

/*
 *  党员缴纳列表
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const partyduesList = async data => {
  return await request({
    url: prefix + '/admin/party/partydues',
    method: 'get',
    params: data
  })
}

/*
 *  党员缴纳新增
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const partyduesAdd = async data => {
  return await request({
    url: prefix + '/admin/party/partydues',
    method: 'post',
    data
  })
}

/*
 *  党员缴纳删除
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const partyduesDelete = async data => {
  return await request({
    url: prefix + '/admin/party/partydues/' + data,
    method: 'delete'
  })
}

/*
 *  党员缴纳修改
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const partyduesEdit = async data => {
  return await request({
    url: prefix + '/admin/party/partydues/' + data.id,
    method: 'put',
    data
  })
}
