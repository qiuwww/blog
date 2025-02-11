import { getRequest, postRequest, putRequest, deleteRequest, importRequest, uploadFileRequest ,postRequestJson,postRequestBodyJson} from '@/libs/axios';
import request from '@/utils/request';
	export const addTGridMapService = params => {
		return postRequestBodyJson('/tGridMapService/addTGridMapService',params);
	};
	export const deleteTGridMapService = params => {
		return postRequest('/tGridMapService/deleteTGridMapService',params);
	};
	export const updateTGridMapService = params => {
		return postRequestBodyJson('/tGridMapService/updateTGridMapService',params);
	};
	export const queryTGridMapServiceList = params => {
		return getRequest('/tGridMapService/queryTGridMapServiceList',params);
	};
	export const getTGridMapService = params => {
		return getRequest('/tGridMapService/getTGridMapService',params);
	};
    export const getAllService = params => {
		return getRequest('/tGridMapService/getAllService',params);
	};