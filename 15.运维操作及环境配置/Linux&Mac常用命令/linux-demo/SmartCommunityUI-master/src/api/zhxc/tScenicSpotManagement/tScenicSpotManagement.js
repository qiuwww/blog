import { getRequest, postRequest, putRequest, deleteRequest, importRequest, uploadFileRequest ,postRequestJson,postRequestBodyJson} from '@/libs/axios';
import request from '@/utils/request'
	export const addTScenicSpotManagement = params => {
		return postRequestBodyJson('/tScenicSpotManagement/addTScenicSpotManagement',params);
	};

  export const addTScenicSpotManagementPatch = params => {
    return postRequestBodyJson('/tScenicSpotManagement/addTScenicSpotManagementPatch', params);
  };

	export const deleteTScenicSpotManagement = params => {
		return postRequest('/tScenicSpotManagement/deleteTScenicSpotManagement',params);
	};
	export const updateTScenicSpotManagement = params => {
		 return postRequestBodyJson('/tScenicSpotManagement/updateTScenicSpotManagement',params);
	};
	export const queryTScenicSpotManagementList = params => {
		return getRequest('/tScenicSpotManagement/queryTScenicSpotManagementList',params);
	};
	export const getTScenicSpotManagement = params => {
		return getRequest('/tScenicSpotManagement/getTScenicSpotManagement',params);
	};
  export const getTScenicSpotManagementListByTree = params => {
    return getRequest('/tScenicSpotManagement/getTScenicSpotManagementListByTree',params);
  };
  export const isNotHaveChildren = params => {
    return getRequest('/tScenicSpotManagement/isNotHaveChildren',params);
  };

  export const getPolygonAndPolyLineAndPoint = params => {
    return getRequest('/tScenicSpotManagement/getPolygonAndPolyLineAndPoint',params);
  };
  export const updateByIds = params => {
    return postRequestBodyJson('/tScenicSpotManagement/updateByIds',params);
  };
  export const getinfobyaretype = params => {
    return getRequest('/tScenicSpotManagement/getinfobyaretype',params);
  };
  