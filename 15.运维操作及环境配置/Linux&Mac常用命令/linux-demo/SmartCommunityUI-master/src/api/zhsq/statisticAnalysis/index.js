import request from '@/utils/request'
import {getRequest, postRequest, putRequest, deleteRequest, importRequest, getRequestWithNoToken,baseurl as prefix } from '@/libs/axios';
/*
 *  统计分析接口
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */

/*
 *  党员类别统计分析
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const categoriesanalysis = async data => {
 return await request({
  url: prefix + '/admin/party/categoriesanalysis',
  method: 'get',
  params: data
 })
}

/*
 *  网格党员
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const gridpartyanalysis = async data => {
 return await request({
  url: prefix + '/admin/party/gridpartyanalysis',
  method: 'get',
  params: data
 })
}

/*
 *  党员学习情况分析
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const learnanalysis = async data => {
 return await request({
  url: prefix + '/admin/party/learnanalysis',
  method: 'get',
  params: data
 })
}

/*
 *  党费缴纳
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const partypaymentanalysis = async data => {
 return await request({
  url: prefix + '/admin/party/partypaymentanalysis',
  method: 'get',
  params: data
 })
}

/*
 *  活动推送人群分析
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const pushcrowdanalysis = async data => {
 return await request({
  url: prefix + '/admin/party/pushcrowdanalysis',
  method: 'get',
  params: data
 })
}
