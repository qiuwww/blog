import request from '@/utils/request'

let baseurl = "WebService"

export const getByPage = params => {
    return request({
        method: 'get',
        url: baseurl+ "/QCLIST/getByPage",
        params
    });
};

export const lookInspection = params => {
    return baseurl+ "/QCfile/" + params;
};