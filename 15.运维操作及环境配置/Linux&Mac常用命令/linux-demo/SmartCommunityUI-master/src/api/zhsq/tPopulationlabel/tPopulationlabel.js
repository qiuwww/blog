import { getRequest, postRequest, putRequest, deleteRequest, importRequest, uploadFileRequest ,postRequestJson,postRequestBodyJson,baseurl as base} from '@/libs/axios';
import request from '@/utils/request'
let baseUrl = base;
	export const addTPopulationlabel = params => {
		return postRequestBodyJson('/tPopulationlabel/addTPopulationlabel',params);
	};
	export const deleteTPopulationlabel = params => {
		return postRequest('/tPopulationlabel/deleteTPopulationlabel',params);
	};
	export const updateTPopulationlabel = params => {
		return postRequestBodyJson('/tPopulationlabel/updateTPopulationlabel',params);
	};
	export const queryTPopulationlabelList = params => {
		return getRequest('/tPopulationlabel/queryTPopulationlabelList',params);
	};
	export const getTPopulationlabel = params => {
		return getRequest('/tPopulationlabel/getTPopulationlabel',params);
	};
// 查询标签 tree
export function queryTPopulationlabelTree(data) {
  return request({
    url:  baseUrl+'/tPopulationlabel/queryTPopulationlabelTree',
    method: 'post',
    data
  })
}
