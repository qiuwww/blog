import { getRequest, postRequest, putRequest, deleteRequest, importRequest, uploadFileRequest ,postRequestJson} from '@/libs/axios';
import request from '@/utils/request'
	export const addTDataService = params => {
		return postRequest('/tDataService/addTDataService',params);
	};
	export const deleteTDataService = params => {
		return postRequest('/tDataService/deleteTDataService',params);
	};
	export const updateTDataService = params => {
		return postRequest('/tDataService/updateTDataService',params);
	};
	export const queryTDataServiceList = params => {
		return getRequest('/tDataService/queryTDataServiceList',params);
	};
	export const getTDataService = params => {
		return getRequest('/tDataService/getTDataService',params);
	};
	//修改角色服务权限
	export const updateAuthority = params => {
		return postRequest('/tDataService/updateAuthority',params);
	};
	//获取树数据
	export const treeData = params => {
		return getRequest('/tDataService/treeData',params);
	};
	//分页查询
	export const queryAll = params => {
		return getRequest('/tDataService/queryAll',params);
	};
	//树查询
	export const treeSearch = params => {
		return getRequest('/tDataService/treeSearch',params);
	};