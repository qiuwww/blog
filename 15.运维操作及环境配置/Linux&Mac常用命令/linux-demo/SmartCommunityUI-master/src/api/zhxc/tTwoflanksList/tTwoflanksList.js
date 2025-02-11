import { getRequest, postRequest, putRequest, deleteRequest, importRequest, uploadFileRequest ,postRequestJson,postRequestBodyJson} from '@/libs/axios';
import request from '@/utils/request'
	export const addTTwoflanksList = params => {
		return postRequestBodyJson('/tTwoflanksList/addTTwoflanksList',params);
	};
	export const deleteTTwoflanksList = params => {
		return postRequest('/tTwoflanksList/deleteTTwoflanksList',params);
	};
	export const updateTTwoflanksList = params => {
		return postRequestBodyJson('/tTwoflanksList/updateTTwoflanksList',params);
	};
	export const queryTTwoflanksListList = params => {
		return getRequest('/tTwoflanksList/queryTTwoflanksListList',params);
	};
	export const getTTwoflanksList = params => {
		return getRequest('/tTwoflanksList/getTTwoflanksList',params);
	};
