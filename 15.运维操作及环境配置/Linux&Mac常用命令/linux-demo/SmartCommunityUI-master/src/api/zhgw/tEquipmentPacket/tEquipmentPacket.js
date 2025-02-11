import { getRequest, postRequest, putRequest, deleteRequest, importRequest, uploadFileRequest ,postRequestJson} from '@/libs/axios';
import request from '@/utils/request'
	export const addTEquipmentPacket = params => {
		// return postRequest('/tEquipmentPacket/addTEquipmentPacket',params);
    return request({
      method: 'post',
      url: `api/tEquipmentPacket/addTEquipmentPacket`,
      data: params
    })
	};
	export const deleteTEquipmentPacket = params => {
		return postRequest('/tEquipmentPacket/deleteTEquipmentPacket',params);
	};
	export const updateTEquipmentPacket = params => {
		// return postRequest('/tEquipmentPacket/updateTEquipmentPacket',params);
    return request({
      method: 'post',
      url: `api/tEquipmentPacket/updateTEquipmentPacket`,
      data: params
    })
	};
	export const queryTEquipmentPacketList = params => {
		return getRequest('/tEquipmentPacket/queryTEquipmentPacketList',params);
	};
	export const getTEquipmentPacket = params => {
		return getRequest('/tEquipmentPacket/getTEquipmentPacket',params);
	};

	export const getAllTEquipmentPacket = params => {
    return getRequest('/tEquipmentPacket/getAllTEquipmentPacket',params);
  };
