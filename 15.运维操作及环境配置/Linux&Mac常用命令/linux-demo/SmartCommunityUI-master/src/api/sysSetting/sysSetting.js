import { getRequest, postRequest, putRequest, deleteRequest, importRequest, uploadFileRequest ,postRequestJson} from '@/libs/axios';
import request from '@/utils/request'
	export const addSysSetting = params => {
		return postRequest('/sysSetting/addSysSetting',params);
	};
	export const deleteSysSetting = params => {
		return postRequest('/sysSetting/deleteSysSetting',params);
	};
	export const updateSysSetting = params => {
		return postRequest('/sysSetting/updateSysSetting',params);
	};
	export const querySysSettingList = params => {
		return getRequest('/sysSetting/querySysSettingList',params);
	};
	export const getSysSetting = params => {
		return getRequest('/sysSetting/getSysSetting',params);
	};
