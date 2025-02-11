import { getRequest, postRequest, putRequest, deleteRequest, importRequest, uploadFileRequest ,postRequestJson} from '@/libs/axios';
import request from '@/utils/request'
	export const addTEarlyWarningRecord = params => {
		return postRequest('/tEarlyWarningRecord/addTEarlyWarningRecord',params);
	};
	export const deleteTEarlyWarningRecord = params => {
		return postRequest('/tEarlyWarningRecord/deleteTEarlyWarningRecord',params);
	};
	export const updateTEarlyWarningRecord = params => {
		return postRequest('/tEarlyWarningRecord/updateTEarlyWarningRecord',params);
	};
	export const queryTEarlyWarningRecordList = params => {
		return getRequest('/tEarlyWarningRecord/queryTEarlyWarningRecordList',params);
	};
	export const getTEarlyWarningRecord = params => {
		return getRequest('/tEarlyWarningRecord/getTEarlyWarningRecord',params);
	};
