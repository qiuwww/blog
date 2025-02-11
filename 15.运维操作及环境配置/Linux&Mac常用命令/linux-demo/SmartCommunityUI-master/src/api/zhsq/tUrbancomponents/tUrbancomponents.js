import { getRequest, postRequest, putRequest, deleteRequest, importRequest, uploadFileRequest ,postRequestJson,postRequestBodyJson} from '@/libs/axios';
import request from '@/utils/request'
	export const addTUrbancomponents = params => {
		return postRequestBodyJson('/tUrbancomponents/addTUrbancomponents',params);
	};
	export const deleteTUrbancomponents = params => {
		return postRequest('/tUrbancomponents/deleteTUrbancomponents',params);
	};
	export const updateTUrbancomponents = params => {
		return postRequestBodyJson('/tUrbancomponents/updateTUrbancomponents',params);
	};
	export const queryTUrbancomponentsList = params => {
		return getRequest('/tUrbancomponents/queryTUrbancomponentsList',params);
	};
	export const getTUrbancomponents = params => {
		return getRequest('/tUrbancomponents/getTUrbancomponents',params);
	};
