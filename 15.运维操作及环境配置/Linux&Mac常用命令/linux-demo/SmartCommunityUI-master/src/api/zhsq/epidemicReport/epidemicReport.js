import { getRequest, postRequest, putRequest, deleteRequest, importRequest, uploadFileRequest ,postRequestJson,postRequestBodyJson} from '@/libs/axios';
import request from '@/utils/request'
	export const addEpidemicReport = params => {
		return postRequestBodyJson('/epidemicReport/addEpidemicReport',params);
	};
	export const deleteEpidemicReport = params => {
		return postRequest('/epidemicReport/deleteEpidemicReport',params);
	};
	export const updateEpidemicReport = params => {
		return postRequestBodyJson('/epidemicReport/updateEpidemicReport',params);
	};
	export const queryEpidemicReportList = params => {
		return getRequest('/epidemicReport/queryEpidemicReportList',params);
	};
	export const getEpidemicReport = params => {
		return getRequest('/epidemicReport/getEpidemicReport',params);
	};
  export const exportExcel = (params) => {
    return request({
      url: "/api/epidemicReport/download", // 接口名字
      method: 'post',
      params: params,
      responseType: 'blob'// 通过api应该知道这是什么吧
    })
  }
