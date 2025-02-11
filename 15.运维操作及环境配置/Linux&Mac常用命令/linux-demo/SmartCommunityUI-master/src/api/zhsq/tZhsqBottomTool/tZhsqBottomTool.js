import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
  importRequest,
  uploadFileRequest,
  postRequestJson,
  baseurl, postRequestBodyJson
} from '@/libs/axios'
import request from '@/utils/request'
export const addTZhsqBottomTool = params => {
  return postRequest('/tZhsqBottomTool/addTZhsqBottomTool', params)
}
export const deleteTZhsqBottomTool = params => {
  return postRequestBodyJson('/tZhsqBottomTool/deleteTZhsqBottomTool', params)
}
export const updateTZhsqBottomTool = params => {
  return postRequest('/tZhsqBottomTool/updateTZhsqBottomTool', params)
}
export const queryTZhsqBottomToolList = params => {
  return getRequest('/tZhsqBottomTool/queryTZhsqBottomToolList', params)
}
export const getTZhsqBottomTool = params => {
  return getRequest('/tZhsqBottomTool/getTZhsqBottomTool', params)
}
export const treeData = params => {
  return getRequest('/tZhsqBottomTool/treeData', params)
}

