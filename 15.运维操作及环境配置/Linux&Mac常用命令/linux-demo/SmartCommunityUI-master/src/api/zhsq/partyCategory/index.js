import request from '@/utils/request'
import {getRequest, postRequest, putRequest, deleteRequest, importRequest, getRequestWithNoToken,baseurl as prefix } from '@/libs/axios';
/*
 *  党员分类
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */

/*
 *  党员分类列表
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getPartyCategoryList = async data => {
 return await request({
  url: prefix + '/admin/party/category',
  method: 'get',
  params: data
 })
}
