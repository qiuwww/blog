import request from '@/utils/request'
import {getRequest, postRequest, putRequest, deleteRequest, importRequest, getRequestWithNoToken,baseurl as prefix } from '@/libs/axios';
/*
 *  学习中心接口
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */

/*
 *  学习中心列表
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getLearningcenterList = async data => {
 return await request({
  url: prefix + '/admin/party/learningcenter',
  method: 'get',
  params: data
 })
}

/*
 *  学习中心新增
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const learningCenterAdd = async data => {
 return await request({
  url: prefix + '/admin/party/learningcenter',
  method: 'post',
  data
 })
}

/*
 *  学习中心修改
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const learningCenterEdit = async data => {
 return await request({
  url: prefix + '/admin/party/learningcenter/' + data.id,
  method: 'post',
  data
 })
}

/*
 *  学习中心删除
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const learningCenterDelete = async data => {
 return await request({
  url: prefix + '/admin/party/learningcenter/' + data,
  method: 'delete'
 })
}

/*
 * 新增（模范宣塑,两学一做）
 * @param data {sourceType: 资源来源(1:两学一做，2：模范宣塑)}
 * @returns {Promise<AxiosResponse<any>>}
 */
export const learningmaterialsAdd = async data => {
 return await request({
  url: prefix + '/admin/party/learningmaterials',
  method: 'post',
  data
 })
}
/*
 * 查询（模范宣塑,两学一做）
 * @param data {sourceType: 资源来源(1:两学一做，2：模范宣塑)}
 * @returns {Promise<AxiosResponse<any>>}
 */
export const learningmaterialsInfo = async data => {
    return await request({
        url: prefix + '/admin/party/learningmaterials/' + data,
        method: 'get'
    })
}
/*
 * 完成学习人员列表
 * @param data {sourceType:}
 * @returns {Promise<AxiosResponse<any>>}
 */
export const completelearningList = async data => {
 return await request({
  url: prefix + '/admin/party/completelearning/' + data.id,
  method: 'get',
  params: data
 })
}
