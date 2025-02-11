// import axios from 'axios'
import request from '@/utils/request'
import {getRequest, postRequest, putRequest, deleteRequest, importRequest, getRequestWithNoToken,baseurl as server } from '@/libs/axios';
const file = {

}

/**
 * @description 文件上传
 * @param {String} title 标题
 */
export const uploadImg = async data => {
 return request({
  url: server + '/download/fileUpload',
  method: 'post',
  data
 })
}
// file.upload = function(formData, callBack) {
//  axios({
//   url: filePath + '/base/download/fileUpload',
//   method: 'post',
//   data: formData,
//   contentType: 'multipart/form-data'
//  }).then(res => {
//   if (res.code === '1') {
//    callBack(res)
//   }
//   if (res.code === 0) {
//    callBack(res)
//   }
//  })
// }
//
// /**
//  * @description 多文件上传
//  * @param {String} url 路径
//  */
// file.uploads = function(formData, callBack) {
//  axios({
//   url: filePath + '/base/download/batchUpload',
//   method: 'post',
//   data: formData,
//   contentType: 'multipart/form-data'
//  }).then(res => {
//   if (res.code === '1') {
//    callBack(res)
//   }
//   if (res.code === 0) {
//    callBack(res)
//   }
//  })
// }
//
// /**
//  * @description 文件删除
//  * @param {String} url
//  */
// file.delFile = function(url, data, callBack) {
//  axios({
//   url: filePath + '/base/download/fileDelete',
//   method: 'get',
//   sdata: data,
//   contentType: 'application/x-www-form-urlencoded'
//  }).then(res => {
//   callBack(res)
//  })
// }
export default file
