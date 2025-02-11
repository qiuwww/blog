import { getRequest, postRequest, putRequest, deleteRequest, importRequest, uploadFileRequest ,postRequestJson,postRequestBodyJson,baseurl as base} from '@/libs/axios';
import request from '@/utils/request'
let baseUrl = base;
	export const addTComponentmanagement = params => {
		return postRequestBodyJson('/tComponentmanagement/addTComponentmanagement',params);
	};
	export const deleteTComponentmanagement = params => {
		return postRequest('/tComponentmanagement/deleteTComponentmanagement',params);
	};
	export const updateTComponentmanagement = params => {
		return postRequestBodyJson('/tComponentmanagement/updateTComponentmanagement',params);
	};
	export const queryTComponentmanagementList = params => {
		return getRequest('/tComponentmanagement/queryTComponentmanagementList',params);
	};
	export const getTComponentmanagement = params => {
		return getRequest('/tComponentmanagement/getTComponentmanagement',params);
	};
	// export const queryTComponentmanagementTreeByPage = params => {
	// 	return getRequest('/tComponentmanagement/queryTComponentmanagementTreeByPage',params);
	// };
// 查询部件 tree
export function queryTComponentmanagementTreeByPage(data) {
  return request({
    url:  baseUrl+'/tComponentmanagement/queryTComponentmanagementTreeByPage',
    method: 'post',
    data
  })
}
// 查询部件 不分页 tree
export function queryTComponentmanagementTreeNotPage(data) {
  return request({
    url:  baseUrl+'/tComponentmanagement/queryTComponentmanagementTreeNotPage',
    method: 'post',
    data
  })
}
