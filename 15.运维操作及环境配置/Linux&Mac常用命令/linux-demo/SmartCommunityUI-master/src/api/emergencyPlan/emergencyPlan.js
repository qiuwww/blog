import { getRequest, postRequest, putRequest, deleteRequest, importRequest, uploadFileRequest ,postRequestJson} from '@/libs/axios';
import request from '@/utils/request'
	export const addEmergencyPlan = params => {
		return postRequest('/emergencyPlan/addEmergencyPlan',params);
	};
	export const deleteEmergencyPlan = (ids,params) => {
		return postRequest('/emergencyPlan/deleteEmergencyPlan',params);
	};
	export const updateEmergencyPlan = params => {
		return postRequest('/emergencyPlan/updateEmergencyPlan',params);
	};
	export const queryEmergencyPlanList = params => {
		return getRequest('/emergencyPlan/queryEmergencyPlanList',params);
	};
	export const getEmergencyPlan = params => {
		return getRequest('/emergencyPlan/getEmergencyPlan',params);
	};
	export const getDict = params => {
		return getRequest('/emergencyPlan/queryDict',params);
	}
