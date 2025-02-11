import request from '@/utils/request'
import { getRequest, postRequest, putRequest, deleteRequest, importRequest, uploadFileRequest ,postRequestJson} from '@/libs/axios';


export function del(keys) {
  return request({
    url: '/auth/online',
    method: 'delete',
    data: keys
  })
}

//获取在线用户全部数据
export const queryServerList = params => {
  return getRequest('/auth/online',params);
};
