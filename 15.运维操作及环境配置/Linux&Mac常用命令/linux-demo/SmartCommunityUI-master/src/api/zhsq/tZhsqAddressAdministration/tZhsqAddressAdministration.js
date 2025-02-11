import { getRequest, postRequest, putRequest, deleteRequest, importRequest, uploadFileRequest ,postRequestJson,postRequestBodyJson} from '@/libs/axios';
import request from '@/utils/request'
	export const addTZhsqAddressAdministration = params => {
		return postRequestBodyJson('/tZhsqAddressAdministration/addTZhsqAddressAdministration',params);
	};
	export const deleteTZhsqAddressAdministration = params => {
		return postRequest('/tZhsqAddressAdministration/deleteTZhsqAddressAdministration',params);
	};
	export const updateTZhsqAddressAdministration = params => {
		return postRequestBodyJson('/tZhsqAddressAdministration/updateTZhsqAddressAdministration',params);
	};
	export const queryTZhsqAddressAdministrationList = params => {
		return getRequest('/tZhsqAddressAdministration/queryTZhsqAddressAdministrationList',params);
	};
	export const getTZhsqAddressAdministration = params => {
		return getRequest('/tZhsqAddressAdministration/getTZhsqAddressAdministration',params);
  };
  export const listWithTree = params => {
    return getRequest('/tZhsqAddressAdministration/listWithTree',params);
	};
