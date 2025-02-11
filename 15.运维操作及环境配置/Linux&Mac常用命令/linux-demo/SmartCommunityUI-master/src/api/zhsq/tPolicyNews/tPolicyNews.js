import { getRequest, postRequest, putRequest, deleteRequest, importRequest, uploadFileRequest ,postRequestJson,postRequestBodyJson} from '@/libs/axios';
import request from '@/utils/request'
	export const addTPolicyNews = params => {
		return postRequestBodyJson('/tPolicyNews/addTPolicyNews',params);
	};
	export const deleteTPolicyNews = params => {
		return postRequest('/tPolicyNews/deleteTPolicyNews',params);
	};
	export const updateTPolicyNews = params => {
		return postRequestBodyJson('/tPolicyNews/updateTPolicyNews',params);
	};
	export const queryTPolicyNewsList = params => {
		return getRequest('/tPolicyNews/queryTPolicyNewsList',params);
	};
	export const getTPolicyNews = params => {
		return getRequest('/tPolicyNews/getTPolicyNews',params);
	};
