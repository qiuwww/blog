import request from '@/utils/request'
import {baseurl as base}  from '@/libs/axios';
import { server } from './prefix'
// 获取停车场
export const parkingList = async data => {
  return request({
    url:base+ '/parking/lot',
    method: 'get',
    params: data
  })
}
// 新增全部停车场
export const parkingAdd = async data => {
  return request({
    url: base+'/parking/lot',
    method: 'post',
    data
  })
}
// 查询停车场
export const parkingAll = async data => {
  return request({
    url: base+'/parking/lot/loadAll',
    method: 'get',
    params: data
  })
}
// 修改停车场
export const parkingEdit = async data => {
  return request({
    url:base+ '/parking/lot/' + data.id,
    method: 'put',
    data
  })
}

// 删除停车场

export const parkingDelete = async data => {
  return request({
    url: base+'/parking/lot/' + data,
    method: 'delete',
    data
  })
}

// 查询停车设备

export const parkingDeviceList = async data => {
  return request({
    url: base+'/parking/device',
    method: 'get',
    params: data
  })
}

// 新增停车设备

export const parkingDeviceAdd = async data => {
  return request({
    url: base+'/parking/device',
    method: 'post',
    data
  })
}

// 修改停车设备

export const parkingDeviceEdit = async data => {
  return request({
    url:base+ '/parking/device/' + data.id,
    method: 'put',
    data
  })
}

// 删除停车设备

export const parkingDeviceDelete = async data => {
  return request({
    url: base+'/parking/device/' + data,
    method: 'delete',
    data
  })
}
