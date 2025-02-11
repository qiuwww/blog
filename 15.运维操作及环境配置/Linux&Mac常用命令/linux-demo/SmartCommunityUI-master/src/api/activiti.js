// 统一请求路径前缀在libs/axios.js中修改
import { getRequest, postRequest, putRequest, deleteRequest, importRequest, uploadFileRequest ,postRequestBodyJson} from '@/libs/axios';
import request from '@/utils/request'

export const activityIp = process.env.VUE_APP_BASE_API;
// 导出模型
export const exportModel =activityIp + '/api/actModel/export/'
// 通过文件部署模型流程
export const deployByFile =activityIp + '/api/actModel/deployByFile'
// 导出流程资源
export const exportResource =activityIp + '/api/actProcess/export'
// 获取高亮实时流程图
export const getHighlightImg = activityIp +'/api/actProcess/getHighlightImg/'

// 获取模型
export const getModelDataList = (params) => {
  return getRequest('/actModel/getByCondition', params)
}
// 添加模型
export const addModel = (params) => {
  return postRequest('/actModel/add', params)
}
// 部署模型
export const deployModel = (id, params) => {
  return getRequest(`/actModel/deploy/${id}`, params)
}
//请求部门
export const dept = (params) => {
  return getRequest(`/tpici/getDept`, params)
}
// 删除模型
export const deleteModel = (ids, params) => {
  return deleteRequest(`/actModel/delByIds/${ids}`, params)
}

// 获取流程数据
export const getProcessDataList = (params) => {
  return getRequest('/actProcess/getByCondition', params)
}
// 获取所有流程数据
export const getAllProcess = (params) => {
  return getRequest('/actProcess/getAllProcess', params)
}

// 编辑流程信息
export const updateInfo = (params) => {
  return postRequest('/actProcess/updateInfo', params)
}
// 修改流程状态 激活/挂起
export const updateStatus = (params) => {
  return postRequest('/actProcess/updateStatus', params)
}
// 转化流程为模型
export const convertToModel = (id, params) => {
  return getRequest(`/actProcess/convertToModel/${id}`, params)
}
// 节点设置
export const getProcessNode = (id, params) => {
  return getRequest(`/actProcess/getProcessNode/${id}`, params)
}
// 节点用户设置
export const editNodeUser = (params) => {
  return postRequest('/actProcess/editNodeUser', params)
}
// 删除流程定义
export const deleteProcess = (ids, params) => {
  return deleteRequest(`/actProcess/delByIds/${ids}`, params)
}

// 获取流程数据
export const getRunningProcess = (params) => {
  return getRequest('/actProcess/getRunningProcess', params)
}
// 获取结束数据
export const getFinishedProcess = (params) => {
  return getRequest('/actProcess/getFinishedProcess', params)
}
// 通过key获取最新流程
export const getProcessByKey = (key, params) => {
  return getRequest(`/actProcess/getByKey/${key}`, params)
}
// 通过流程定义id获取第一个任务节点审批人
export const getFirstNode = (id, params) => {
  return getRequest(`/actProcess/getFirstNode/${id}`, params)
}
// 获取下一个任务节点审批人
export const getNextNode = (procDefId, currActId, params) => {
  return getRequest(`/actProcess/getNextNode/${procDefId}/${currActId}`, params)
}
// 通过节点id获取审批人
export const getNode = (id, params) => {
  return getRequest(`/actProcess/getNode/${id}`, params)
}
// 修改流程状态 激活/挂起
export const updateInsStatus = (params) => {
  return postRequest('/actProcess/updateInsStatus', params)
}
// 删除流程运行实例
export const deleteProcessIns = (ids, params) => {
  return deleteRequest(`/actProcess/delInsByIds/${ids}`, params)
}
// 删除结束流程实例
export const delHistoricIns = (ids, params) => {
  return deleteRequest(`/actProcess/delHistoricInsByIds/${ids}`, params)
}

//
//// 获取代办列表
//export const todoList = (params) => {
//  return getRequest('/actTask/todoList', params)
//}
//// 获取已办列表
//export const doneList = (params) => {
//  return getRequest('/actTask/doneList', params)
//}
//// 获取流程流转历史
//export const historicFlow = (id, params) => {
//  return getRequest(`/actTask/historicFlow/${id}`, params)
//}
//// 委托他人代办
//export const delegate = (params) => {
//  return postRequest('/actTask/delegate', params)
//}
//// 审批任务通过
//export const pass = (params) => {
//  return postRequest('/actTask/pass', params)
//}
//// 批量审批任务通过
//export const passAll = (ids, params) => {
//  return postRequest(`/actTask/passAll/${ids}`, params)
//}
//// 获取可返回的节点
//export const getBackList = (id, params) => {
//  return getRequest(`/actTask/getBackList/${id}`, params)
//}
//// 任务节点审批驳回至发起人
//export const back = (params) => {
//  return postRequest('/actTask/back', params)
//}
//// 批量驳回至发起人
//export const backAll = (ids, params) => {
//  return postRequest(`/actTask/backAll/${ids}`, params)
//}
//// 任务节点审批驳回至指定历史节点
//export const backToTask = (params) => {
//  return postRequest('/actTask/backToTask', params)
//}
//// 删除任务
//export const deleteTask = (ids, params) => {
//  return deleteRequest(`/actTask/delete/${ids}`, params)
//}
//// 删除历史任务
//export const deleteHistoricTask = (ids, params) => {
//  return deleteRequest(`/actTask/deleteHistoric/${ids}`, params)
//}

// 获取代办列表
export const todoList = (params) => {
  return getRequest('/actApplyTask/todoList', params)
}
// 获取已办列表
export const doneList = (params) => {
  return getRequest('/actApplyTask/doneList', params)
}
// 获取流程流转历史
export const historicFlow = (id, params) => {
  return getRequest(`/actApplyTask/historicFlow/${id}`, params)
}
// 委托他人代办
export const delegate = (params) => {
  return postRequest('/actApplyTask/delegate', params)
}
// 审批任务通过
export const pass = (params) => {
  return postRequest('/actApplyTask/pass', params)
}
// 批量审批任务通过
export const passAll = (ids, params) => {
  return postRequest(`/actApplyTask/passAll/${ids}`, params)
}
// 获取可返回的节点
export const getBackList = (id, params) => {
  return getRequest(`/actApplyTask/getBackList/${id}`, params)
}
// 任务节点审批驳回至发起人
export const back = (params) => {
  return postRequest('/actApplyTask/back', params)
}
// 批量驳回至发起人
export const backAll = (ids, params) => {
  return postRequest(`/actApplyTask/backAll/${ids}`, params)
}
// 任务节点审批驳回至指定历史节点
export const backToTask = (params) => {
  return postRequest('/actApplyTask/backToTask', params)
}
// 删除任务
export const deleteTask = (ids, params) => {
  return deleteRequest(`/actApplyTask/delete/${ids}`, params)
}
// 删除历史任务
export const deleteHistoricTask = (ids, params) => {
  return deleteRequest(`/actApplyTask/deleteHistoric/${ids}`, params)
}

// 获取一级类别
export const initActCategory = (params) => {
  return getRequest('/actCategory/getByParentId/0', params)
}
// 加载类别子级数据
export const loadActCategory = (id, params) => {
  return getRequest(`/actCategory/getByParentId/${id}`, params)
}
// 添加类别
export const addActCategory = (params) => {
  return postRequest('/actCategory/add', params)
}
// 编辑类别
export const editActCategory = (params) => {
  return postRequest('/actCategory/edit', params)
}
// 删除类别
export const deleteActCategory = (ids, params) => {
  return deleteRequest(`/actCategory/delByIds/${ids}`, params)
}
// 搜索类别
export const searchActCategory = (params) => {
  return getRequest('/actCategory/search', params)
}

//// 获取申请数据
//export const getBusinessDataList = (params) => {
//  return getRequest('/actBusiness/getByCondition', params)
//}
//// 提交申请
//export const applyBusiness = (params) => {
//  return postRequest('/actBusiness/apply', params)
//}
//// 直接提交申请
//export const startBusiness = (params) => {
//  return postRequest('/actBusiness/start', params)
//}
//// 撤回申请
//export const cancelApply = (params) => {
//  return postRequest('/actBusiness/cancel', params)
//}
//// 删除申请
//export const deleteBusiness = (ids, params) => {
//  return deleteRequest(`/actBusiness/delByIds/${ids}`, params)
//}

// 获取申请数据
export const getBusinessDataList = (params) => {
  return getRequest('/actApplyBusiness/getByCondition', params)
}
// 提交申请
export const applyBusiness = (params) => {
  return postRequest('/actApplyBusiness/apply', params)
}
// 直接提交申请
export const startBusiness = (params) => {
  return postRequest('/actApplyBusiness/start', params)
}
// 撤回申请
export const cancelApply = (params) => {
  return postRequest('/actApplyBusiness/cancel', params)
}
// 删除申请
export const deleteBusiness = (ids, params) => {
  return deleteRequest(`/actApplyBusiness/delByIds/${ids}`, params)
}

// 获取单个请假数据
export const getLeaveData = (id, params) => {
  return getRequest(`/leave/get/${id}`, params)
}
// 新增请假数据
export const addLeave = (params) => {
  return postRequest('/leave/add', params)
}
// 修改请假数据
export const updateLeave = (params) => {
  return putRequest('/leave/update', params)
}

// 获取单个请假数据
export const getYeWuShouLiData = (id, params) => {
  return getRequest(`/leave/getYeWuShouLiData/${id}`, params)
}
// 获取数据 审核页面
export const getYeWuShouLiDataInSH = (id, params) => {
  return getRequest(`/leave/getYeWuShouLiDataInSH/${id}`, params)
}

// 获取单个请假数据
export const getChangeTypeData = (id, params) => {
  return getRequest(`/tChangetype/getChangeTypeData/${id}`, params)
}

// 获取统计报表
export const getBusinessTotalData = (params) => {
  return getRequest(`/leave/getBusinessTotalData`, params)
}
// 导出统计报表
export const exportExcel = (params) => {
  //return getRequest(`/leave/exportExcel`, params)
  return request({
    url: '/api/leave/exportExcel', // 接口名字
    method: 'get',
    params: params,
    responseType: 'blob'//通过api应该知道这是什么吧
  })
}

//首页获取各个区县房屋 各申请对象类型（农民工。。。。）售卖情况
export const getAreaHouseSaleSituation = () => {
  return getRequest(`/leave/getAreaHouseSaleSituation`)
}


//首页获取各个类型的售卖总额
export const getAreaMoneyTotal = () => {
  return getRequest(`/leave/getAreaMoneyTotal`)
}
// 批量生产批次号
export const pchAll = (params) => {
  return postRequest(`/yewushouli/picihao`, params)
}
//上传附件接口
export const uploadFile = (params) => {
  return postRequest(`/yewushouli/uploadFj`,params);
}
//读取身份证接口
export const readCardID  = (params) => {
	return request({
        method: 'post',
        url: `api/yewushouli/readCardID`,
        data:params
   });
}

//读取营业执照接口
export const readBusinessLicense = (params) => {
  return request({
    method: 'post',
    url: `api/yewushouli/readBusinessLicense`,
    data:params
  });
}

//验证身份证接口
export const authentication = (params) => {
  return getRequest(`/leave/authentication`,params);
}
//房屋唯一验证接口
export const houseVerification = (params) => {
  return postRequest(`/leave/houseVerification`,params);
}

//查询已完成流程接口
export const finished = (params) => {
  return postRequest(`/leave/SelectAplayBusiness`,params);
}

//查询当前节点内是否有比当前申报信息先存在的申报数据，有则不能进行申报金额回写操作
export const checkFlow = (params) => {
  return getRequest(`/leave/checkFlow`,params);
}

//根据房产地址查询是否有该房产信息
export const getHouseDataByAddress = (params) => {
  return postRequest(`/tChangetype/getHouseDataByAddress`,params);
}

// 退役军人按采集点导出
export const exportTyjrExcel = (params) => {
  return request({
    url: '/api/leave/exportTyjrExcel', // 接口名字
    method: 'get',
    params: params,
    responseType: 'blob'//通过api应该知道这是什么吧
  })
}


//模糊查询房产地址
export const queryAddress = (params) => {
  return postRequest(`/tChangetype/queryAddress`,params);
}
//根据房屋Id 查询申报信息中的合同时间
export const queryTimeByHouseId = (params) => {
  return postRequest(`/tChangetype/queryTimeByHouseId`,params);
}
//上传部门附件接口
export const uploadDeptFile = (params) => {
  return request({
        method: 'post',
        url: `api/actApplyBusiness/uploadDeptFile`,
        data:params
    });
}
//根据id获取标准化厂房数据
export const getWorkshopData = (id, params) => {
  return getRequest(`/leave/getWorkshopData/${id}`, params)
}
// 结束流程
export const toEnd = (params) => {
  return postRequest('/actApplyTask/toEnd', params)
}

//删除其他附件接口
export const delOtherFile = (params) => {
  return postRequest(`/leave/delOtherFile`,params);
}

//自动生成意见汇总环节的审批意见
export const selectBusinessLicense = (data) => {
  return request({
    method: 'post',
    url: '/api/SummaryComments/readBusinessLicense',
    data
  });
}

//意见汇总计算补贴金额
export const summaryMoney = (id) => {
  return getRequest(`/leave/summaryMoney/${id}`)
}

//车位验证接口 parkingVerification
export const parkingVerification = (params) => {
  return postRequest(`/leave/parkingVerification`,params);
}
//新增流程表单数据
export const addActivity = (params) => {
  return postRequestBodyJson(`/activityDynamics/addActivity`,params);
}
//编辑流程表单数据
export const updateActivity = (params) => {
  return postRequestBodyJson(`/activityDynamics/updateActivity`,params);
}
//根据Id查询流程表单数据
export const getActivityById = (params) => {
  return getRequest(`/activityDynamics/getActivityById`,params);
}

