import { getRequest, postRequest, putRequest, deleteRequest, importRequest, uploadFileRequest ,postRequestJson} from '@/libs/axios';
import request from '@/utils/request'
  //新增
	export const addTRiskSources = params => {
    return request({
      method: 'post',
      url: `api/tRiskSources/addTRiskSources`,
      data:params
    });
	};
	export const deleteTRiskSources = params => {
		return postRequest('/tRiskSources/deleteTRiskSources',params);
	};
  //更新
	export const updateTRiskSources = params => {
    return request({
      method: 'post',
      url: `api/tRiskSources/updateTRiskSources`,
      data:params
    });
	};
	export const queryTRiskSourcesList = params => {
		return getRequest('/tRiskSources/queryTRiskSourcesList',params);
	};
	export const getTRiskSources = params => {
		return getRequest('/tRiskSources/getTRiskSources',params);
	};
	//获取风险源表全部数据
  export const queryAlltRiskSourcesList = params => {
    return getRequest('/tRiskSources/queryAlltRiskSourcesList',params);
  };
