import request from '@/utils/request'
import {getRequest, postRequest, putRequest, deleteRequest, importRequest, getRequestWithNoToken,baseurl as prefix } from '@/libs/axios';
/*
 *  党群活动接口
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */

/*
 *  党群活动列表
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getPartymassesList = async data => {
 return await request({
  url: prefix + '/admin/party/partymasses',
  method: 'get',
  params: data
 })
}

/*
 *  党群活动新增
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const partymassesAdd = async data => {
 return await request({
  url: prefix + '/admin/party/partymasses',
  method: 'post',
  data
 })
}

/*
 *  党群活动修改
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const partymassesEdit = async data => {
 return await request({
  url: prefix + '/admin/party/partymasses/' + data.id,
  method: 'put',
  data
 })
}

/*
 *  党群活动删除
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const partymassesDelete = async data => {
 return await request({
  url: prefix + '/admin/party/partymasses/' + data,
  method: 'delete'
 })
}

/*
 *  党群活动取消
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const partymassesCancel = async data => {
 return await request({
  url: prefix + '/admin/party/partymasses/' + data + '/cancel',
  method: 'put'
 })
}

/*
 * 党群列表-报名列表
 * @param data {sourceType: 资源来源(1:两学一做，2：模范宣塑)}
 * @returns {Promise<AxiosResponse<any>>}
 */
export const partymassesPeo = async data => {
 return await request({
  url: prefix + '/admin/party/partymasses/' + data.partymassesId + '/enroll',
  method: 'get',
  params: data.data
 })
}

