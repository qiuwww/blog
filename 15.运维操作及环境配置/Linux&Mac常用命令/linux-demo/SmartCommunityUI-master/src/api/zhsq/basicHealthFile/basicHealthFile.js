import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
  importRequest,
  uploadFileRequest,
  postRequestJson,
  postRequestBodyJson
} from '@/libs/axios'
import request from '@/utils/request'
	export const addBasicHealthFile = params => {
		return postRequest('/basicHealthFile/addBasicHealthFile',params);
	};
	export const deleteBasicHealthFile = params => {
		return postRequest('/basicHealthFile/deleteBasicHealthFile',params);
    return postRequestBodyJson('/tZhsqVolunteer/deleteTZhsqVolunteer', JSON.stringify(params) )
	};
	export const updateBasicHealthFile = params => {
		return postRequest('/basicHealthFile/updateBasicHealthFile',params);
	};
	export const queryBasicHealthFileList = params => {
		return getRequest('/basicHealthFile/queryBasicHealthFileList',params);
	};
	export const getBasicHealthFile = params => {
		return getRequest('/basicHealthFile/getBasicHealthFile',params);
	};
export const getBasicHealthFileByPersonId = params => {
  return getRequest('/basicHealthFile/getBasicHealthFileByPersonId',params);
};
