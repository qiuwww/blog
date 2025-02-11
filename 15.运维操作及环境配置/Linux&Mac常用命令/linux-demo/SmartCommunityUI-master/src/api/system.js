import request from '@/utils/request'

// 新增部门类型
export function addDepartmentType(data) {
  return request({
    url: '/server/grid/dept-type/add',
    method: 'post',
    data
  })
}

// 删除部门类型
export function deleteDepartmentType(data) {
  return request({
    url: '/server/grid/dept-type/delete',
    method: 'get',
    params: data
  })
}

// 修改部门类型
export function modifyDepartmentType(data) {
  return request({
    url: '/server/grid/dept-type/modify',
    method: 'post',
    data
  })
}

// 查询部门list
export function getDepartmentTypeList(data) {
  return request({
    url: '/server/grid/dept-type/loadAll4Select',
    method: 'get',
    params: data
  })
}

// 获取部门 tree
export function getDepartmentTypeTree(data) {
  return request({
    url: '/server/grid/dept/loadDeptTree',
    method: 'get',
    params: data
  })
}
// 获取部门 tree
export function loadGridDeptTreeByPage(data) {
  return request({
    url: '/server/grid/dept/loadGridDeptTreeByPage',
    method: 'get',
    params: data
  })
}

// 部门层级
export function getDepartmentTypeLevel(data) {
  return request({
    url: '/server/grid/grid/dictionary/loadByType',
    method: 'get',
    params: data
  })
}

// 新增部门
export function addDepartment(data) {
  return request({
    url: '/server/grid/dept/add',
    method: 'post',
    data
  })
}

// / 修改部门
export function modifyDepartment(data) {
  return request({
    url: '/server/grid/dept/modify',
    method: 'post',
    data
  })
}

//  删除部门
export function deleteDepartment(data) {
  return request({
    url: '/server/grid/dept/delete',
    method: 'get',
    params: data
  })
}

//  新增岗位
export function addPost(data) {
  return request({
    url: '/server/grid/post/add',
    method: 'post',
    data
  })
}

// 修改岗位
export function modifyPost(data) {
  return request({
    url: '/server/grid/post/modify',
    method: 'post',
    data
  })
}

// 获取岗位表格数据
export function getPostTable(data) {
  return request({
    url: '/server/grid/post/loadAllByQuery',
    method: 'post',
    data
  })
}

// 删除岗位
export function deletePost(data) {
  return request({
    url: '/server/grid/post/delete',
    method: 'get',
    params: data
  })
}

// 获取角色权限
export const getActions = async data => {
  return request({
    url: '/server/grid/menuRole/loadAllByUser',
    method: 'post',
    data
  })
}

// xin zeng 权限
export const addJurisdiction = async data => {
  return request({
    url: '/server/grid/menu-main/add',
    method: 'post',
    data
  })
}

// 获取角色列表 分页
export function getRoleTable(data) {
  return request({
    url: '/server/grid/role/loadAllByQuery',
    method: 'post',
    data
  })
}

// 获取角色列表 不分页
export function getRole4Select(data) {
  return request({
    url: '/server/grid/role/loadAll4Select',
    method: 'post',
    data
  })
}

// 删除角色
export function deleteRole(data) {
  return request({
    url: '/server/grid/role/modify',
    method: 'post',
    data
  })
}

// 修改 角色权限
export const editAction = async data => {
  return request({
    url: '/server/grid/menuRole/setMenuRole',
    method: 'post',
    data
  })
}

// 新增角色 (err)
export function addRole(data) {
  return request({
    url: '/server/grid/post/add',
    method: 'post',
    data
  })
}

// 删除权限
export const deleteJurisdiction = async data => {
  return request({
    url: '/server/grid/menu-main/delete',
    method: 'get',
    params: data
  })
}
// 修改权限
export const editJurisdiction = async data => {
  return request({
    url: '/server/grid/menu-main/modify',
    method: 'post',
    data
  })
}
// 编辑角色权限
export const action = async data => {
  return request({
    url: '/server/grid/menuRole/setMenuRole',
    method: 'post',
    data
  })
}

// 获取考勤展示表格
export const getAttendance = async data => {
  return request({
    url: '/server/grid/attendance/loadAllByQuery',
    method: 'post',
    data
  })
}

// 新增人员考勤
export const addAttendance = async data => {
  return request({
    url: '/server/grid/attendance/listAdd',
    method: 'post',
    data
  })
}


export const postAttendance = async data => {
  return request({
    url: '/server/grid/attendance/modify',
    method: 'post',
    data
  })
}

// 添加考勤展示接口
export const GetAttendanceAdd = async data => {
  return request({
    url: '/server/grid/attendance/getCurrentWeekData',
    method: 'post',
    data
  })
}

// getArchivesList
export const getUserList = async data => {
  return request({
    url: '/server/grid/attendance/getArchivesList',
    method: 'post',
    data
  })
}

export const getDayList = async data => {
  return request({
    url: '/server/grid/logging/loadAllByQuery',
    method: 'post',
    data
  })
}

// 用户管理查询
export const getUserMenergerList = async data => {
  return request({
    url: '/server/grid/userInfo/loadAllByQuery',
    method: 'post',
    data
  })
}

// 用户新增
export const addUser = async data => {
  return request({
    url: '/server/grid/userInfo/add ',
    method: 'post',
    data
  })
}
// 用户验证
export function smsCode(data) {
  return request({
    url: '/server/base/oauth/smsCode',
    method: 'get',
    params:data
  })
}
// 用户停用启用
// grid/userInfo/modifyStatus
export const modifyStatusUser = async data => {
  return request({
    url: '/server/grid/userInfo/modifyStatus',
    method: 'post',
    data
  })
}

// 用户修改
export const modifyUser = async data => {
  return request({
    url: '/server/grid/userInfo/modify',
    method: 'post',
    data
  })
}

// 人员类型
export const getUserTypeList = async data => {
  return request({
    url: '/api/basicPerson/getPersonDataByType',
    method: 'get',
    params: data
  })
}

// 根据社区id 查询 gridId
export const getGridList = async data => {
  return request({
    url: '/api/basicGrids/queryAllList',
    method: 'get',
    params: data
  })
}

