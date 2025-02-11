import { getRequest, postRequest, putRequest, deleteRequest, importRequest, uploadFileRequest ,postRequestJson} from '@/libs/axios';
import request from '@/utils/request'
	export const addTEquipmentManagement = params => {
		return postRequest('/tEquipmentManagement/addTEquipmentManagement',params);
	};
	export const deleteTEquipmentManagement = params => {
		return postRequest('/tEquipmentManagement/deleteTEquipmentManagement',params);
	};
	export const updateTEquipmentManagement = params => {
		return postRequest('/tEquipmentManagement/updateTEquipmentManagement',params);
	};
	export const queryTEquipmentManagementList = params => {
		return getRequest('/tEquipmentManagement/queryTEquipmentManagementList',params);
	};
	export const getTEquipmentManagement = params => {
		return getRequest('/tEquipmentManagement/getTEquipmentManagement',params);
	};
