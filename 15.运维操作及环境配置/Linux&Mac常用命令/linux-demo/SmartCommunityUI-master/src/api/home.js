// 统一请求路径前缀在libs/axios.js中修改
import { getRequest, postRequest, putRequest, deleteRequest, importRequest, uploadFileRequest } from '@/libs/axios';
import request from '@/utils/request'

//获取首页热门物业表格数据
export const getHotBusinessTableData = (params) => {
  return postRequest(`/home/getHotBusinessTableData`, params);
}

//获取首页对象分类占比
export const getBusinessScaleByType = () => {
  return postRequest(`/home/getBusinessScaleByType`);
}

//获取首页顶部数据
export const getBusinessCount = () => {
  return postRequest(`/home/getBusinessCount`);
}

//获取首页房产类型排行数据
export const getPropertyTypeRanking = (params) => {
  return getRequest(`/home/getPropertyTypeRanking`, params);
}
//获取每个月业务受理量
export const getEveryMonthBusinessData = () => {
  return postRequest(`/home/getEveryMonthBusinessData`);
}
