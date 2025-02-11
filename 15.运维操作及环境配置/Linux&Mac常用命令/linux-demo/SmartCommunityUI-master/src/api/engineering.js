import request from '@/utils/request'
import {getRequest, postRequest, putRequest, deleteRequest, importRequest, getRequestWithNoToken,baseurl as base } from '@/libs/axios';
let baseUrl = base;
//
export const getAllDispatch = async data => {
  return await request({
    url: baseUrl +'/work/repair-service/employeeTasks',
    method: 'post',
    data
  })
}
//
export const getAllTask = async data => {
  return await request({
    url: baseUrl +'/work/task-manager/loadAllByQuery',
    method: 'post',
    data
  })
}

export const getAllPeriodicTask = async data => {
  return await request({
    url:baseUrl +"/work/task-manager/loadAllPeriodicTask",
    method: "post",
    data
  });
};

export const getAllTaskCyc = async data => {
  return await request({
    url: baseUrl +'/work/task-manager/loadAllPeriodicTask',
    method: 'post',
    data
  })
}

export const modifyCycTask = async data => {
  return await request({
    url: baseUrl +'/work/task-manager/updateStatus',
    method: 'post',
    data
  })
}

//
// export const cancelTask = async data => {
//   return await request({
//     url: "/server/grid/work/task-manager/cancel",
//     method: "get",
//     params: data
//   });
// };

//
export const getAllTaskCategoryByselect = async data => {
  //
  return await request({
    url: baseUrl +'/work/task-category/loadAllBySelect',
    method: 'get',
    params: data
  })
}

export const getAllTaskCategory = async data => {
  return await request({
    url: baseUrl +'/work/task-category/loadAllAndDepartment',
    method: 'post',
    data
  })
}

export const addTask = async data => {
  return await request({
    url: baseUrl +'/work/task-manager/add',
    method: 'post',
    data
  })
}

export const deleteTaskCategory = async data => {
  return await request({
    url: baseUrl +'/work/task-category/delete',
    method: 'get',
    params: data
  })
}

export const teskExamineHistory = async data => {
  return await request({
    url: baseUrl +'/work/details/loadTaskHistory',
    method: 'post',
    data
  })
}

export const setTaskCategory = async data => {
  return await request({
    url: baseUrl +'/work/task-category/saveAndUpdate',
    method: 'post',
    data
  })
}

// export const getSystemScore = async data => {
//   return await request({
//     url: "server/grid/work/task-manager/loadSystemScore",
//     method: "post",
//     data
//   });
// };

export const addEvaluation = async data => {
  return await request({
    url: baseUrl +'/work/details/orderEvaluate',
    method: 'post',
    data
  })
}

// export const getUserScore = async data => {
//   return await request({
//     url: "/server/grid/work/score/details/loadAllDetailsScore",
//     method: "post",
//     data
//   });
// };

// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const getAllEquipmentCategory = async data => {
  return await request({
    url: baseUrl +'/work/device-category/loadAllByProperty',
    method: 'get',
    params: data
  })
}
export const getAllEquipment = async data => {
  return await request({
    url: baseUrl +'/work/equipment-maintenance/loadAllByQuery',
    method: 'post',
    data
  })
}// loadAllEquipment

export const getAllEquipments = async data => {
  return await request({
    url: baseUrl +'/work/equipment-maintenance/loadAllEquipment',
    method: 'post',
    data
  })
}

export const getAllEquipmentDetail = async data => {
  return await request({
    url: baseUrl +'/work/maintain-details/loadAllByQuery',
    method: 'post',
    data
  })
}
export const addEquipmentCategory = async data => {
  return await request({
    url: baseUrl +'/work/device-category/add',
    method: 'post',
    data
  })
}
export const deleteEquipmentCategory = async data => {
  return await request({
    url: baseUrl +'/work/device-category/delete',
    method: 'get',
    params: data
  })
}
export const editEquipmentCategory = async data => {
  return await request({
    url: baseUrl +'/work/device-category/modify',
    method: 'post',
    data
  })
}
export const setQRRule = async data => {
  return await request({
    url: baseUrl +'/work/equipment-maintenance/setQrRule',
    method: 'post',
    data
  })
}
export const getQrRule = async data => {
  return await request({
    url: baseUrl +'/work/equipment-maintenance/getQrRule',
    method: 'get',
    params: data
  })
}

export const getEquipIntactRate = async data => {
  return await request({
    url: baseUrl +'/work/device-category/getEquipIntactRate',
    method: 'get',
    params: data
  })
}
export const setOverhaulReminder = async data => {
  return await request({
    url: baseUrl +'/work/equipment-maintenance/setReminderDate',
    method: 'post',
    data
  })
}

export const getReminderDispatch = async data => {
  return await request({
    url: baseUrl +'/work/repair-service/reminder',
    method: 'post',
    data
  })
}
export const setReminderDispatch = async data => {
  return await request({
    url: baseUrl +'/work/details/reminder',
    method: 'post',
    data
  })
}
// getVacationDispatch
export const getVacationDispatch = async data => {
  return await request({
    url: baseUrl +'/work/repair-service/employeeTasks',
    method: 'post',
    data
  })
}
export const addEquipment = async data => {
  return await request({
    url: baseUrl +'/work/equipment-maintenance/add',
    method: 'post',
    data
  })
}
export const editEquipment = async data => {
  return await request({
    url: baseUrl +'/work/equipment-maintenance/modify',
    method: 'post',
    data
  })
}
export const getEquipmentCategoryBySelect = async data => {
  return await request({
    url: baseUrl +'/work/device-category/loadAllBySelect',
    method: 'get',
    params: data
  })
}
export const getEquipment = async data => {
  return await request({
    url: baseUrl +'/work/equipment-maintenance/loadOne',
    method: 'get',
    params: data
  })
}
export const deleteEquipment = async data => {
  return await request({
    url: baseUrl +'/work/equipment-maintenance/delete',
    method: 'get',
    params: data
  })
}
export const getAllWorkOrder = async data => {
  return await request({
    url: baseUrl +'/work/score/loadAllByQuery',
    method: 'post',
    data
  })
}
export const getWorkOrder = async data => {
  return await request({
    url: baseUrl +'/work/score/loadOne',
    method: 'get',
    params: data
  })
}
export const editWorkOrder = async data => {
  return await request({
    url: baseUrl +'/work/score/modify',
    method: 'post',
    data
  })
}
export const getTimeliness = async data => {
  return await request({
    url: baseUrl +'/work/score/loadTimely',
    method: 'get',
    params: data
  })
}
export const setTimeliness = async data => {
  return await request({
    url: baseUrl +'/work/score/timely/saveOrUpdate',
    method: 'post',
    data
  })
}
export const getOverhaulReminder = async data => {
  return await request({
    url: baseUrl +'/work/equipment-maintenance/loadReminderInfo',
    method: 'get',
    params: data
  })
}
export const getAllReportComplaint = async data => {
  return await request({
    url: baseUrl +'/work/report-complaint/loadAllByQuery',
    method: 'post',
    data
  })
}
export const getReportComplaint = async data => {
  return await request({
    url: baseUrl +'/work/report-complaint/loadOne',
    method: 'get',
    params: data
  })
}
export const getAllRepair = async data => {
  return await request({
    url: baseUrl +'/work/repair-service/loadAllByQuery',
    method: 'post',
    data
  })
}
export const getRepair = async data => {
  data.noApp = 1
  return await request({
    url: baseUrl +'/work/details/loadDateForApp',
    method: 'post',
    data
  })
}
export const addRepair = async data => {
  return await request({
    url: baseUrl +'/work/repair-service/add',
    method: 'post',
    data
  })
}
export const dispatch = async data => {
  return await request({
    url: baseUrl +'/work/repair-service/distribution',
    method: 'post',
    data
  })
}
export const repairExamine = async data => {
  return await request({
    url: baseUrl +'/work/repair-service/review',
    method: 'post',
    data
  })
}

export const equipmentPlanSelect = async data => { // 、、、、、、、、、、、、
  return await request({
    url: 'server/grid/equipment/inspectionPlan/loadByQuery',
    method: 'post',
    data
  })
}

export const equipmentExamine = async data => {
  return await request({
    url: baseUrl +'/work/maintain-details/modify',
    method: 'post',
    data
  })
}

export const teskExamine = async data => {
  return await request({
    url: baseUrl +'/work/details/modify',
    method: 'post',
    data
  })
}
export const getRepairProgress = async data => {
  return await request({
    url: baseUrl +'/work/repair-service/loadSchedule',
    method: 'post',
    data
  })
}
export const getRepairServiceComment = async data => {
  return await request({
    url: baseUrl +'/work/repair-service/loadEvaluationInfo',
    method: 'get',
    params: data
  })
}
export const getAllRepairQuote = async data => {
  return await request({
    url: baseUrl +'/work/repair-service/loadAllByProperty',
    method: 'get',
    params: data
  })
}
export const setRepairQuote = async data => {
  return await request({
    url: baseUrl +'/work/repair-service/quote/saveOrUpdate',
    method: 'post',
    data
  })
}
// export const getAllTaskCategory = async data => {
//   return await request({
//     url: "server/grid/work/task-category/loadAllAndDepartment",
//     method: "post",
//     data
//   });
// };
// export const setTaskCategory = async data => {
//   return await request({
//     url: "server/grid/work/task-category/saveAndUpdate",
//     method: "post",
//     data
//   });
// };
// export const deleteTaskCategory = async data => {
//   return await request({
//     url: "server/grid/work/task-category/delete",
//     method: "get",
//     params: data
//   });
// };
// export const getAllTaskCategoryByselect = async data => {
//   return await request({
//     url: "server/grid/work/task-category/loadAllBySelect",
//     method: "get",
//     params: data
//   });
// };
// export const addTask = async data => {
//   return await request({
//     url: "server/grid/work/task-manager/add",
//     method: "post",
//     data
//   });
// };
// export const getAllTask = async data => {
//   return await request({
//     url: "server/grid/work/task-manager/loadAllByQuery",
//     method: "post",
//     data
//   });
// };

export const setAllTask = async data => {
  return await request({
    url: baseUrl +'/work/details/changeUrgency',
    method: 'post',
    data
  })
}

export const cancelTask = async data => {
  return await request({
    url: baseUrl +'/work/task-manager/cancel',
    method: 'get',
    params: data
  })
}
export const editStatusTask = async data => {
  return await request({
    url: baseUrl +'/work/task-manager/updateStatus',
    method: 'post',
    data
  })
}
export const getReportComplaintProgress = async data => {
  return await request({
    url: baseUrl +'/work/report-complaint/loadSchedule',
    method: 'get',
    params: data
  })
}
export const getTaskManager = async data => {
  return await request({
    url: baseUrl +'/work/task-manager/loadOne',
    method: 'get',
    params: data
  })
}
export const getTaskManagerDetails = async data => {
  return await request({
    url: baseUrl +'/work/details/loadDateForApp',
    method: 'post',
    data
  })
}

export const getCycTaskManagerDetails = async data => {
  return await request({
    url: baseUrl +'/work/task-manager/getTaskManager',
    method: 'get',
    params: data
  })
}

export const getTaskComment = async data => {
  return await request({
    url: baseUrl +'/work/task-manager/loadEvaluationInfo',
    method: 'get',
    params: data
  })
}
export const getTaskProgress = async data => {
  return await request({
    url: baseUrl +'/work/task-manager/loadSchedule',
    method: 'get',
    params: data
  })
}
export const editTask = async data => {
  return await request({
    url: baseUrl +'/work/task-manager/modify',
    method: 'post',
    data
  })
}
export const getCycleInfo = async data => {
  return await request({
    url: baseUrl +'/work/task-manager/loadCycleInfo',
    method: 'get',
    params: data
  })
}
export const taskExamine = async data => {
  return await request({
    url: baseUrl +'/work/task-manager/review',
    method: 'post',
    data
  })
}
export const reportComplaintExamine = async data => {
  return await request({
    url: baseUrl +'/work/report-complaint/review',
    method: 'post',
    data
  })
}
export const getAllMeterReading = async data => {
  return await request({
    url: baseUrl +'/work/meter-reading-data/loadAllByQuery',
    method: 'post',
    data
  })
}
export const editMeterReading = async data => {
  return await request({
    url: baseUrl +'/work/meter-reading-data/modify',
    method: 'post',
    data
  })
}
export const meterReadingReminder = async data => {
  return await request({
    url: baseUrl +'/work/meter-reading-data/addOrUpdateTimer',
    method: 'post',
    data
  })
}
export const getAllMeterReadingReminder = async data => {
  return await request({
    url: baseUrl +'/work/meter-reading-timer/loadAllByProperty',
    method: 'get',
    params: data
  })
}
export const getMeterType = async data => {
  return await request({
    url: baseUrl +'/work/meter-reading-timer/getMeterType',
    method: 'get',
    params: data
  })
}
export const addMeterReaminder = async data => {
  return await request({
    url: baseUrl +'/work/meter-reading-timer/addOrUpdate',
    method: 'post',
    data
  })
}
export const updateQrRule = async data => {
  return await request({
    url: baseUrl +'/work/equipment-maintenance/updateQrRule',
    method: 'get',
    params: data
  })
}
export const setRelativeDept = async data => {
  return await request({
    url: baseUrl +'/work/equipment-maintenance/setDepartmentIds',
    method: 'post',
    data
  })
}
export const getRelativeDept = async data => {
  return await request({
    url: baseUrl +'/work/equipment-maintenance/getDepartmentIds',
    method: 'get',
    params: data
  })
}
export const downloadQR = async data => {
  return await request({
    url: baseUrl +'/work/equipment-maintenance/downloadQr',
    method: 'get',
    params: data
  })
}
export const getSystemScore = async data => {
  return await request({
    url: baseUrl +'/work/task-manager/loadSystemScore',
    method: 'post',
    data
  })
}
export const getUserScore = async data => {
  return await request({
    url: baseUrl +'/work/score/details/loadAllDetailsScore',
    method: 'post',
    data
  })
}
// export const addEvaluation = async data => {
//   return await request({
//     url: "server/grid/work/repair-service/orderEvaluate",
//     method: "post",
//     data
//   });
// };

export const getEquipmentPlan = async data => {
  return await request({
    url: 'server/grid/equipment/inspectionPlan/loadAllByQuery',
    method: 'post',
    data
  })
}

export const getEquipmentExample = async data => {
  return await request({
    url: baseUrl +'/work/equipment-maintenance/loadByQuery',
    method: 'post',
    data
  })
}

export const setAddEquipmentPlan = async data => {
  return await request({
    url: 'server/grid/equipment/inspectionPlan/add',
    method: 'post',
    data
  })
}
export const getCleckItem = async data => {
  return await request({
    url: 'server/grid/equipment/inspectionStandards/loadByQuery',
    method: 'get',
    params: data
  })
}

export const getAllInspectionSituation = async data => {
  return await request({
    url: 'server/grid/equipment/inspectionDetails/loadAllByQuery',
    method: 'post',
    data
  })
}

export const addCleckItem = async data => {
  return await request({
    url: 'server/grid/equipment/inspectionStandards/add',
    method: 'post',
    data
  })
}

export const deleteCleckItem = async data => {
  return await request({
    url: 'server/grid/equipment/inspectionStandards/delete',
    method: 'get',
    params: data
  })
}

// getOneDetial
export const getOneDetial = async data => {
  return await request({
    url: 'server/grid/equipment/inspectionDetails/loadOne',
    method: 'get',
    params: data
  })
}

// work/maintain-details/add
export const addEquipmentRepair = async data => {
  return await request({
    url: baseUrl +'/work/maintain-details/add',
    method: 'post',
    data
  })
}

// equipment/inspectionDetails/modify
export const editEquipmentPlan = async data => {
  return await request({
    url: 'server/grid/equipment/inspectionPlan/modify',
    method: 'post',
    data
  })
}

export const deleteEquipmentPlan = async data => {
  return await request({
    url: 'server/grid/equipment/inspectionDetails/delete',
    method: 'get',
    params: data
  })
}

export const getAllEmployee = async data => {
  return await request({
    url: baseUrl +'/work/repair-service/employeeTasks',
    method: 'post',
    data
  })
}

export const setDispatch = async data => {
  return await request({
    url: 'server/grid/equipment/inspectionDetails/dispatch',
    method: 'post',
    data
  })
}

export const getInspectSignInDetails = async data => {
  return await request({
    url: 'server/grid/equipment/inspectSignInDetails/loadInspectInfo',
    method: 'post',
    data
  })
}

export const setDeleteOne = async data => {
  return await request({
    url: baseUrl +'/work/meter-reading-timer/delete',
    method: 'get',
    params: data
  })
}

export const getAllEquipmentRepairs = async data => {
  return await request({
    url: baseUrl +'/work/maintain-details/loadAllByQuery',
    method: 'post',
    data
  })
}

export const getloadEvaluationInfo = async data => {
  return await request({
    url: baseUrl +'/work/maintain-details/loadEvaluationInfo',
    method: 'get',
    params: data
  })
}
export const getloadSchedule = async data => {
  return await request({
    url: baseUrl +'/work/maintain-details/loadSchedule',
    method: 'get',
    params: data
  })
}

// work/maintain-details/review

export const getAllEquipmentReview = async data => {
  return await request({
    url: baseUrl +'/work/maintain-details/review',
    method: 'post',
    data
  })
}

// work/maintain-details/dispatch
export const getAllEquipmentDispatch = async data => {
  return await request({
    url: baseUrl +'/work/maintain-details/dispatch',
    method: 'post',
    data
  })
}

export const get_BXMK_Detial = async data => {
  data.noApp = 1
  return await request({
    url: baseUrl +'/work/details/loadDateForApp',
    method: 'post',
    data
  })
}

// /work/repair-service/changeRepairType
export const get_BXMK_History = async data => {
  return await request({
    url: baseUrl +'/work/repair-service/changeRepairType',
    method: 'post',
    data
  })
}

export const getRepairTrack = async data => {
  return request({
    url: baseUrl +'/work/order-follow-up/loadByQuery',
    method: 'post',
    data
  })
}
export const getReport_Complaint = async data => {
  return request({
    url: baseUrl +'/work/report-complaint/loadByQuery',
    method: 'post',
    data
  })
}

export const getDetail_Dispath = async data => {
  return request({
    url: baseUrl +'/work/repair-service/distribution',
    method: 'post',
    data
  })
}
export const setTesk_Dispath = async data => {
  return request({
    url: baseUrl +'/work/details/dispatch',
    method: 'post',
    data
  })
}

// /work/report-complaint/loadDetails
export const getReportComplaintLoadDetails = async params => {
  return request({
    url: baseUrl +'/work/report-complaint/loadDetails',
    method: 'get',
    params
  })
}

export const getSatisfied = async data => {
  return request({
    url: baseUrl +'/work/report-complaint/getReturnVisitResult',
    method: 'post',
    data
  })
}
// 回访
//  /work/report-complaint/getReturnVisitResult
export const getSubmit = async data => {
  return request({
    url: baseUrl +'/work/report-complaint/submit',
    method: 'post',
    data
  })
}
// certification/getHuthenticationInHousingId
export const getHuthenticationInHousingId = async data => {
  return request({
    url: 'server/grid/certification/getHuthenticationInHousingId',
    method: 'get',
    params: data

  })
}

// 、、/work/task-manager/loadOne

export const getLoadOne = async data => {
  return request({
    url: baseUrl +'/work/task-manager/loadOne',
    method: 'get',
    params: data
  })
}

// 任务统计
export const getTaskMap = async data => {
  return request({
    url: baseUrl +'/work/details/taskStatistics',
    method: 'post',
    data
  })
}


export const getCycTask = async data => {
  return request({
    url: baseUrl +'/work/task-manager/loadManagerNew',
    method: 'get',
    params: data

  })
}

