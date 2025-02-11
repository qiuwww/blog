import { getRequest, postRequest, putRequest, deleteRequest, importRequest, uploadFileRequest ,postRequestJson} from '@/libs/axios';
import request from '@/utils/request'
	export const addTWarningSettings = params => {
		return postRequest('/tWarningSettings/addTWarningSettings',params);
	};
	export const deleteTWarningSettings = params => {
		return postRequest('/tWarningSettings/deleteTWarningSettings',params);
	};
	export const updateTWarningSettings = params => {
		return postRequest('/tWarningSettings/updateTWarningSettings',params);
	};
	export const queryTWarningSettingsList = params => {
		return getRequest('/tWarningSettings/queryTWarningSettingsList',params);
	};
	export const getTWarningSettings = params => {
		return getRequest('/tWarningSettings/getTWarningSettings',params);
	};

	export const getWarningSettingsByEquipmentId = params => {
	  return getRequest('/tWarningSettings/getWarningSettingsByEquipmentId', params);
  };
