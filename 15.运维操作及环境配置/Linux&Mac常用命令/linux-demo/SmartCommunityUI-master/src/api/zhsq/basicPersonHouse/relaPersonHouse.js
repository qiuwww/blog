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
	export const addRelaPersonHouse = params => {
		return postRequest('/relaPersonHouse/addRelaPersonHouse',params);
	};
	export const deleteRelaPersonHouse = params => {
    return postRequestBodyJson('/tZhsqVolunteer/deleteTZhsqVolunteer', JSON.stringify(params) )
	};
	export const updateRelaPersonHouse = params => {
		return postRequest('/relaPersonHouse/updateRelaPersonHouse',params);
	};
	export const queryRelaPersonHouseList = params => {
		return getRequest('/relaPersonHouse/queryRelaPersonHouseList',params);
	};
	export const getRelaPersonHouse = params => {
		return getRequest('/relaPersonHouse/getRelaPersonHouse',params);
	};
	export  const  getRelaPersonHouseByPid = params => {
    return getRequest('/relaPersonHouse/getRelaPersonHouseByPid',params);
  }
