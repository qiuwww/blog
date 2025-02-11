import { getRequest, postRequest, putRequest, deleteRequest, importRequest, uploadFileRequest ,postRequestJson} from '@/libs/axios';
import request from '@/utils/request'

	export const getDeployHistorys = params => {
		return getRequest('/deployHistory/getDeployHistorys',params);
	};

export const deleteDeployHistory = params => {
  return postRequest('/deployHistory/deleteDeployHistory',params);
};
