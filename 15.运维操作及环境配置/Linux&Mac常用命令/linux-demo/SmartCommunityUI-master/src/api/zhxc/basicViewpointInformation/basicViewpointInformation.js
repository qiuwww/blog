import { getRequest, postRequest, putRequest, deleteRequest, importRequest, uploadFileRequest ,postRequestJson} from '@/libs/axios';
import request from '@/utils/request'
	export const addBasicViewpointInformation = params => {
		return postRequest('/basicViewpointInformation/addBasicViewpointInformation',params);
	};
	export const deleteBasicViewpointInformation = params => {
		return postRequest('/basicViewpointInformation/deleteBasicViewpointInformation',params);
	};
	export const updateBasicViewpointInformation = params => {
		return postRequest('/basicViewpointInformation/updateBasicViewpointInformation',params);
	};
	export const queryBasicViewpointInformationList = params => {
		return getRequest('/basicViewpointInformation/queryBasicViewpointInformationList',params);
	};
	export const getBasicViewpointInformation = params => {
		return getRequest('/basicViewpointInformation/getBasicViewpointInformation',params);
	};
	export const getbyareaId = params => {
		return getRequest('/basicViewpointInformation/getbyareaId',params);
	};
