import request from "@/utils/request";
import {baseurl as base}  from '@/libs/axios';
// 监控设备//localhost:9527/server/grid/cameraInfo/loadAllByQuery
export const cameraInfo = async data => {
    return request({
        url: base + "/cameraInfo/loadAllByQuery",
        method: "post",
        data
    });
};

export const cameraInfoAdd = async data => {
    return request({
        url: base + "/cameraInfo/add",
        method: "post",
        data
    });
};
export const cameraInfoDelete = async data => {
    return request({
        url: base + "/cameraInfo/delete",
        method: "get",
        params: data
    });
};
export const cameraInfoById = async data => {
  return request({
    url: base + "/cameraInfo/loadOne",
    method: "get",
    params: data
  });
};
export const cameraInfoModify = async data => {
    return request({
        url: base + "/cameraInfo/modify",
        method: "post",
        data
    });
};

// yujing

export const videoWarning = async data => {
    return request({
        url: base + "/videoWarning/loadAllByQuery",
        method: "post",
        data
    });
};
//community/property/loadAllBySelectFromGrid


export const loadAllBySelectFromGrid = async data => {
    return request({
        url: base+"/basicHousingEstate/loadAllBySelectFromGrid",
        method: "post",
        data
    });
};



// 楼宇
export const loadAllByQueryBuildingIntercom = async data => {
    return request({
        url: base + "/buildingIntercom/loadAllByQuery",
        method: "post",
        data
    });
};

export const addBuildingIntercom = async data => {
    return request({
        url: base + "/buildingIntercom/add",
        method: "post",
        data
    });
};

// 李勇 说 删除
export const deleteBuildingIntercom = async data => {
    return request({
        url: base + "/buildingIntercom/delete",
        method: "get",
        params: data
    });
};


//
export const modifyBuildingIntercom = async data => {
    return request({
        url: base + "/buildingIntercom/modify",
        method: "post",
        data
    });
};

// 停车道闸

export const addParkingBarrier = async data => {
    return request({
        url: base + "/parkingBarrier/add",
        method: "post",
        data
    });
};


export const loadAllByQueryParkingBarrier = async data => {
    return request({
        url: base + "/parkingBarrier/loadAllByQuery",
        method: "post",
        data
    });
};

export const modifyParkingBarrier = async data => {
    return request({
        url: base + "/parkingBarrier/modify",
        method: "post",
        data
    });
};

export const deleteParkingBarrier = async data => {
    return request({
        url: base + "/parkingBarrier/delete",
        method: "get",
        params: data
    });
};
