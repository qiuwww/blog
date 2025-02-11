import { getRequest, postRequest, putRequest, deleteRequest, importRequest, uploadFileRequest ,postRequestJson} from '@/libs/axios';
import request from '@/utils/request'
	export const queryErrorLogList = params => {
		return getRequest('/logs/error',params);
	};

export const queryLogList = params => {
  return getRequest('/logs/user',params);
};

