import { getRequest, postRequest, putRequest, deleteRequest, importRequest, uploadFileRequest ,postRequestJson} from '@/libs/axios';
import request from '@/utils/request'
	export const addTShooting = params => {
		return request({
			method: 'post',
			url: `api/tShooting/addTShooting`,
			data:params
		  });
	};
	export const deleteTShooting = params => {
		return postRequest('/tShooting/deleteTShooting',params);
	};
	export const updateTShooting = params => {
		return request({
			method: 'post',
			url: `api/tShooting/updateTShooting`,
			data:params
		  });
	};
	export const queryTShootingList = params => {
		return getRequest('/tShooting/queryTShootingList',params);
	};
	export const getTShooting = params => {
		return getRequest('/tShooting/getTShooting',params);
	};
  //获取全部数据
  export const queryAllTShootingList = params => {
    return getRequest('/tShooting/queryAllTShootingList',params);
  };
