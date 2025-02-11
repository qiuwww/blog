import { getRequest, postRequest, putRequest, deleteRequest, importRequest, uploadFileRequest ,postRequestJson} from '@/libs/axios';
import request from '@/utils/request'
	export const addTDetailBox = params => {
		return postRequest('/tDetailBox/addTDetailBox',params);
	};
	export const deleteTDetailBox = params => {
		return postRequest('/tDetailBox/deleteTDetailBox',params);
	};
	export const updateTDetailBox = params => {
		return postRequest('/tDetailBox/updateTDetailBox',params);
	};
	export const queryTDetailBoxList = params => {
		return getRequest('/tDetailBox/queryTDetailBoxList',params);
	};
export const getNameByTheme = params => {
  return getRequest('/tBasicInformationManagement/getNameByTheme',params);
};
	export const getTDetailBox = params => {
		return getRequest('/tDetailBox/getTDetailBox',params);
	};
