import { getRequest, postRequest, putRequest, deleteRequest, importRequest, uploadFileRequest ,postRequestJson} from '@/libs/axios';
//获取树数据
export const getDeptAndEquipmentPacketTreeData = params => {
  return getRequest('/dataOverview/getDeptAndEquipmentPacketTreeData',params);
};
