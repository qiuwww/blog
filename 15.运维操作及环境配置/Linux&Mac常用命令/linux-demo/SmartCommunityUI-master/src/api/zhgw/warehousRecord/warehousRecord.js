import request from '@/utils/request'

let baseurl = "WebService"

export const getByPage = params => {
    return request({
        method: 'get',
        url: baseurl + "/STList/getByPage",
        params
    });
};