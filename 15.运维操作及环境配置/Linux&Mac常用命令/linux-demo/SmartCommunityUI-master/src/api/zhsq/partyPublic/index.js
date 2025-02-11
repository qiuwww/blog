import request from '@/utils/request'
import {getRequest, postRequest, putRequest, deleteRequest, importRequest, getRequestWithNoToken,baseurl as prefix } from '@/libs/axios';
/*
 *  党委公开接口
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */

/*
 *  党委公开列表
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getPartyWorkList = async data => {
 return await request({
  url: prefix + '/admin/party/partywork',
  method: 'get',
  params: data
 })
}

/*
 *  党委公开新增
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const partyWorkAdd = async data => {
 return await request({
  url: prefix + '/admin/party/partywork',
  method: 'post',
  data
 })
}

/*
 *  党委公开修改
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const partyWorkEdit = async data => {
 return await request({
  url: prefix + '/admin/party/partywork/' + data.id,
  method: 'put',
  data
 })
}

/*
 *  党委公开删除
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const partyWorkDelete = async data => {
 return await request({
  url: prefix + '/admin/party/partywork/' + data,
  method: 'delete'
 })
}

/*
 *  图片轮播列表
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getPartyBannerList = async data => {
 return await request({
  url: prefix + '/admin/party/banner',
  method: 'get',
  params: data
 })
}

/*
 *  图片轮播添加
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getPartyBannerAdd = async data => {
 return await request({
  url: prefix + '/admin/party/banner',
  method: 'post',
  data
 })
}

/*
 *  图片轮播编辑
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getPartyBannerEdit = async data => {
 return await request({
  url: prefix + '/admin/party/banner/' + data.id,
  method: 'put',
  data
 })
}

/*
 *  图片轮播删除
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getPartyBannerDelete = async data => {
 return await request({
  url: prefix + '/admin/party/banner/' + data,
  method: 'delete'
 })
}
