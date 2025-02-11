import { getRequest, postRequest, putRequest, deleteRequest, importRequest, uploadFileRequest ,postRequestJson} from '@/libs/axios';
import request from '@/utils/request'
	export const addTSubstances = params => {
		return postRequest('/tSubstances/addTSubstances',params);
	};
	export const deleteTSubstances = params => {
		return postRequest('/tSubstances/deleteTSubstances',params);
	};
	export const updateTSubstances = params => {
		return postRequest('/tSubstances/updateTSubstances',params);
	};
	export const queryTSubstancesList = params => {
		return getRequest('/tSubstances/queryTSubstancesList',params);
	};
	export const getTSubstances = params => {
		return getRequest('/tSubstances/getTSubstances',params);
	};
  //获取全部数据
  export const queryAllTSubstancesList = params => {
    return getRequest('/tSubstances/queryAllTSubstancesList',params);
  };
