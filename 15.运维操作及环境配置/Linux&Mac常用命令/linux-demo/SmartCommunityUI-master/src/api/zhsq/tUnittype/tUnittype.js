import { getRequest, postRequest, putRequest, deleteRequest, importRequest, uploadFileRequest ,postRequestJson,postRequestBodyJson,baseurl as base} from '@/libs/axios';
import request from '@/utils/request'
let baseUrl = base;
	export const addTUnittype = params => {
		return postRequestBodyJson('/tUnittype/addTUnittype',params);
	};
	export const deleteTUnittype = params => {
		return postRequest('/tUnittype/deleteTUnittype',params);
	};
	export const updateTUnittype = params => {
		return postRequestBodyJson('/tUnittype/updateTUnittype',params);
	};
	export const queryTUnittypeList = params => {
		return getRequest('/tUnittype/queryTUnittypeList',params);
	};
	export const getTUnittype = params => {
		return getRequest('/tUnittype/getTUnittype',params);
	};
// 查询单位 tree
export function queryTUnittypeTree(data) {
  return request({
    url:  baseUrl+'/tUnittype/queryTUnittypeTree',
    method: 'post',
    data
  })
}
