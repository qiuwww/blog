import { getRequest, postRequest, putRequest, deleteRequest, importRequest, uploadFileRequest ,postRequestJson,postRequestBodyJson} from '@/libs/axios';
import request from '@/utils/request'
	export const addTArmedequipment = params => {
		return postRequestBodyJson('/tArmedequipment/addTArmedequipment',params);
	};
	export const deleteTArmedequipment = params => {
		return postRequest('/tArmedequipment/deleteTArmedequipment',params);
	};
	export const updateTArmedequipment = params => {
		return postRequestBodyJson('/tArmedequipment/updateTArmedequipment',params);
	};
	export const queryTArmedequipmentList = params => {
		return getRequest('/tArmedequipment/queryTArmedequipmentList',params);
	};
	export const getTArmedequipment = params => {
		return getRequest('/tArmedequipment/getTArmedequipment',params);
	};
