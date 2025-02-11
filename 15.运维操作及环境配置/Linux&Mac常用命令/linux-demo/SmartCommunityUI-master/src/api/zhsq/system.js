import request from '@/utils/request'
import {getRequest, postRequest, putRequest, deleteRequest, importRequest, getRequestWithNoToken,baseurl as base } from '@/libs/axios';
let baseUrl = base;
// 新增部门类型
export function addDepartmentType(data) {
  return request({
    url: baseUrl+'/deptType/add',
    method: 'post',
    data
  })
}

// 删除部门类型
export function deleteDepartmentType(data) {
  return request({
    url:  baseUrl+'/deptType/delete',
    method: 'get',
    params: data
  })
}

// 修改部门类型
export function modifyDepartmentType(data) {
  return request({
    url: baseUrl+ '/deptType/modify',
    method: 'post',
    data
  })
}

// 查询部门list
export function getDepartmentTypeList(data) {
  return request({
    url: baseUrl+ '/deptType/loadAll4Select',
    method: 'get',
    params: data
  })
}

// 获取部门 tree
export function getDepartmentTypeTree(data) {
  return request({
    url:  baseUrl+'/gridDept/loadGridDeptTree',
    method: 'get',
    params: data
  })
}
// 获取部门 tree
export function loadGridDeptTreeByPage(data) {
  return request({
    url:  baseUrl+'/gridDept/loadGridDeptTreeByPage',
    method: 'post',
     data
  })
}
// 获取部门 不分页 tree
export function loadGridDeptTreeNotPage(data) {
  return request({
    url:  baseUrl+'/gridDept/loadGridDeptTreeNotPage',
    method: 'post',
     data
  })
}
// 部门层级
export function getDepartmentTypeLevel(data) {
  return request({
    url:  baseUrl+'/dictionary/loadByType',
    method: 'get',
    params: data
  })
}

// 新增部门
export function addDepartment(data) {
  return request({
    url:  baseUrl+'/gridDept/add',
    method: 'post',
    data
  })
}

// / 修改部门
export function modifyDepartment(data) {
  return request({
    url:  baseUrl+'/gridDept/modify',
    method: 'post',
    data
  })
}

//  删除部门
export function deleteDepartment(data) {
  return request({
    url:  baseUrl+'/gridDept/delete',
    method: 'get',
    params: data
  })
}

