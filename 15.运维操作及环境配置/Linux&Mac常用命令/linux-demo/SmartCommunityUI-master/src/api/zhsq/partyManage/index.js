import request from '@/utils/request'
import {getRequest, postRequest, putRequest, deleteRequest, importRequest, getRequestWithNoToken,baseurl as prefix } from '@/libs/axios';
/*
 *  党委管理接口
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */

/*
 *  党委列表
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getPartyCommitteeList = async data => {
 return await request({
  url: prefix + '/admin/party/committee',
  method: 'get',
  params: data
 })
}

/*
 *  党委新增
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getPartyCommitteeAdd = async data => {
 return await request({
  url: prefix + '/admin/party/committee',
  method: 'post',
  data
 })
}

/*
 *  党委修改
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getPartyCommitteeEdit = async data => {
 return await request({
  url: prefix + '/admin/party/committee/' + data.id,
  method: 'put',
  data
 })
}

/*
 *  党委删除
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getPartyCommitteeDelete = async data => {
 return await request({
  url: prefix + '/admin/party/committee/' + data,
  method: 'delete'
 })
}

/*
 *  党支部列表
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getPartyBranchList = async data => {
 return await request({
  url: prefix + '/admin/party/partybranch',
  method: 'get',
  params: data
 })
}

/*
 *  党委支部添加
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getPartyBranchAdd = async data => {
 return await request({
  url: prefix + '/admin/party/partybranch',
  method: 'post',
  data
 })
}

/*
 *  党委支部编辑
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getPartyBranchEdit = async data => {
 return await request({
  url: prefix + '/admin/party/partybranch/' + data.id,
  method: 'put',
  data
 })
}

/*
 *  党委支部删除
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getPartyBranchDelete = async data => {
 return await request({
  url: prefix + '/admin/party/partybranch/' + data,
  method: 'delete',
  params: data
 })
}

/*
 *  获取所有街道
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getLoadStreetDept = async data => {
 return await request({
  url: prefix + '/gridDept/loadStreetGridDept',
  method: 'get',
  params: data
 })
}

/*
 *  根据街道id获取社区
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getLoadCommunityDeptByStreet = async params => {
 return await request({
  url: prefix + '/gridDept/loadCommunityGridDeptByStreet',
  params,
  method: 'get'
 })
}

/*
 *  基本信息
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const baseInfomation = async data => {
 return await request({
  url: prefix + '/admin/party/baseInfomation',
  method: 'get',
  params: data
 })
}
