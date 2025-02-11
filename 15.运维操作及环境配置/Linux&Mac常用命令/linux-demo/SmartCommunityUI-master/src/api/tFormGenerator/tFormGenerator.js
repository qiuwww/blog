import { getRequest, postRequest, putRequest, deleteRequest, importRequest, uploadFileRequest ,postRequestJson,postRequestBodyJson} from '@/libs/axios';
import request from '@/utils/request'
	export const addTFormGenerator = params => {
		return postRequestBodyJson('/tFormGenerator/addTFormGenerator',params);
	};
	export const deleteTFormGenerator = params => {
		return postRequest('/tFormGenerator/deleteTFormGenerator',params);
	};
	export const updateTFormGenerator = params => {
		return postRequestBodyJson('/tFormGenerator/updateTFormGenerator',params);
	};
	export const queryTFormGeneratorList = params => {
		return getRequest('/tFormGenerator/queryTFormGeneratorList',params);
	};
	export const getTFormGenerator = params => {
		return getRequest('/tFormGenerator/getTFormGenerator',params);
	};
  export const getTFormGeneratorDynamics = params => {
    return getRequest('/tFormGenerator/getTFormGeneratorDynamics',params);
  };

