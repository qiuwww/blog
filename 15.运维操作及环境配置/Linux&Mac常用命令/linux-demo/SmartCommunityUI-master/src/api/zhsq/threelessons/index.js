import request from '@/utils/request'
import {getRequest, postRequest, putRequest, deleteRequest, importRequest, getRequestWithNoToken,baseurl as prefix } from '@/libs/axios';
/*
 *  三会一接口
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */

/*
 *  三会一课列表
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getThreelessonsList = async data => {
 return await request({
  url: prefix + '/admin/party/threelessons',
  method: 'get',
  params: data
 })
}

/*
 *  三会一课新增
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const threelessonsAdd = async data => {
 return await request({
  url: prefix + '/admin/party/threelessons',
  method: 'post',
  data
 })
}

/*
 *  三会一课修改
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const threelessonsEdit = async data => {
 return await request({
  url: prefix + '/admin/party/threelessons/' + data.id,
  method: 'post',
  data
 })
}

/*
 *  三会一课删除
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const threelessonsDelete = async data => {
 return await request({
  url: prefix + '/admin/party/threelessons/' + data,
  method: 'delete'
 })
}

/*
 *  三会一课详情
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const threelessonsDetail = async data => {
 return await request({
  url: prefix + '/admin/party/threelessons/detail/' + data,
  method: 'get'
 })
}

