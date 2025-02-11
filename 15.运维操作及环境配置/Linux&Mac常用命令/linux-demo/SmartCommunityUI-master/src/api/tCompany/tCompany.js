import { getRequest, postRequest, putRequest, deleteRequest, importRequest, uploadFileRequest, postRequestJson} from '@/libs/axios';
import request from '@/utils/request'
	export const addTCompany = params => {
		return postRequest('/tCompany/addTCompany', params);
	};
	export const deleteTCompany = params => {
		return postRequest('/tCompany/deleteTCompany', params);
	};
	export const updateTCompany = params => {
		return postRequest('/tCompany/updateTCompany', params);
	};
	export const queryTCompanyList = params => {
		return getRequest('/tCompany/queryTCompanyList', params);
	};
	export const getTCompany = params => {
		return getRequest('/tCompany/getTCompany', params);
	};
