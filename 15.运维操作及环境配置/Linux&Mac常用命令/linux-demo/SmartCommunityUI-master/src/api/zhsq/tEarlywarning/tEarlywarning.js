import { getRequest, postRequest, putRequest, deleteRequest, importRequest, uploadFileRequest ,postRequestJson,postRequestBodyJson} from '@/libs/axios';
import request from '@/utils/request'
	export const addTEarlywarning = params => {
		return postRequestBodyJson('/tEarlywarning/addTEarlywarning',params);
	};
	export const deleteTEarlywarning = params => {
		return postRequest('/tEarlywarning/deleteTEarlywarning',params);
	};
	export const updateTEarlywarning = params => {
		return postRequestBodyJson('/tEarlywarning/updateTEarlywarning',params);
	};
	export const queryTEarlywarningList = params => {
		return getRequest('/tEarlywarning/queryTEarlywarningList',params);
	};
	export const getTEarlywarning = params => {
		return getRequest('/tEarlywarning/getTEarlywarning',params);
	};
