import { getRequest, postRequest, putRequest, deleteRequest, importRequest, uploadFileRequest ,postRequestJson,postRequestBodyJson} from '@/libs/axios';
import request from '@/utils/request'
	export const addTEmergencyhedging = params => {
		return postRequestBodyJson('/tEmergencyhedging/addTEmergencyhedging',params);
	};
	export const deleteTEmergencyhedging = params => {
		return postRequest('/tEmergencyhedging/deleteTEmergencyhedging',params);
	};
	export const updateTEmergencyhedging = params => {
		return postRequestBodyJson('/tEmergencyhedging/updateTEmergencyhedging',params);
	};
	export const queryTEmergencyhedgingList = params => {
		return getRequest('/tEmergencyhedging/queryTEmergencyhedgingList',params);
	};
	export const getTEmergencyhedging = params => {
		return getRequest('/tEmergencyhedging/getTEmergencyhedging',params);
	};
