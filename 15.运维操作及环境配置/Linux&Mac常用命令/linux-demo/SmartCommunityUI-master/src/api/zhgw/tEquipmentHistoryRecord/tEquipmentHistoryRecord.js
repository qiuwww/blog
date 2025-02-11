import { getRequest, postRequest, putRequest, deleteRequest, importRequest, uploadFileRequest ,postRequestJson} from '@/libs/axios';
import request from '@/utils/request'
	export const addTEquipmentHistoryRecord = params => {
		return postRequest('/tEquipmentHistoryRecord/addTEquipmentHistoryRecord',params);
	};
	export const deleteTEquipmentHistoryRecord = params => {
		return postRequest('/tEquipmentHistoryRecord/deleteTEquipmentHistoryRecord',params);
	};
	export const updateTEquipmentHistoryRecord = params => {
		return postRequest('/tEquipmentHistoryRecord/updateTEquipmentHistoryRecord',params);
	};
	export const queryTEquipmentHistoryRecordList = params => {
		return getRequest('/tEquipmentHistoryRecord/queryTEquipmentHistoryRecordList',params);
	};
	export const getTEquipmentHistoryRecord = params => {
		return getRequest('/tEquipmentHistoryRecord/getTEquipmentHistoryRecord',params);
	};

	export const getEquipmentHistoryRecordLatestData = params => {
		return getRequest('/tEquipmentHistoryRecord/getEquipmentHistoryRecordLatestData',params);
	};


