
import './css/index.styl';

import { httpRequest } from './utils/Utils.js';


/**
 * 使用函数来生成数据
 */
let mockDataFunc = (args) => {
    return Mock.mock({
        'name': 'Jack', // 写死的字符串
        'age|10-20': 1, // 最小到最大之间的一个数值
        'color': '@color', // 6位16进制数
        'title': '@string(5, 10)', // 一个字符串
        'number': '@float(1, 10000, 2, 2)', // (min, max, dmin, dmax); 最小两位小数，最大也是两位小数
        'date': '@date("yyyy-MM-dd")', // 返回一个随机的日期
        'now': '@now(yyyy-MM-dd)', // 返回当前日期
        'province': '@province', // 省份
        'cname': '@cname(3, 10)', // 中文名字
        'cword': '@cword(3, 10)', // 中文字符 
        'randomArr|1': ['A', 'B'], // 随机取10个
        'string20|1': ['@string(10, 20)', '@cword(5, 10)'],
        'url': '@url()',
        'paragraph': '@cparagraph()',
        'email': '@email()',
        'data|1-3': [{ // 一个数组，长度为4
            'id|+1': 1, // 添加索引
            'list|1-3': [{
                // 属性 id 是一个自增数，起始值为 1，每次增 1
                'id|+1': 1, // 添加索引
                'name': '@cname',
                'age|1-100': 100,
                'color': '@color',
                'hehe': '@name',
                'index|+1': 1,
                'index_name|5-10': '@string',
                'new_value|50000-60000': 1,
                // 后边的是控制小数点位数的
                'x|-20-50.1-10': 50,
                'y|-20-30.1-10': 30,
                'name': '@cname',
                'jc': '@string',
                'zdf|1-100.2': 100,
                'zcb|1-200.2': 200,
                'q5|5000-10000': 10000,
                'q10|2000-5000': 5000,
                'q20|1000-2000': 2000
            }]
        }]
        // 这里的setup是给全部实例添加的，且以最后一次添加的为准，所以setup只能用一次
    })
}

let data1 = mockDataFunc();

console.log('data1: ', data1);

document.querySelector('#func').innerHTML +=
    '<pre>' +
        JSON.stringify(data1, null, 4) +
    '</pre>';


/**
 * 模拟拦截ajax post||get
 */
// Mock.mock( rurl?, rtype?, template|function( options ) )


Mock.mock(/ajax\/.+/, 'get', {
    'error|1': [0, 1],
    'data|1-10': [{
        'id|+1': 1,
        'title': '@cword(2, 5)'
    }] 
});

Mock.mock(/ajax\/.+/, 'post', request => {
    console.log("request的请求参数: ", request);
    let params = JSON.parse(request.body);
    return mockDataFunc(params);
});

// url = '', data = {}, type = 'GET', method = 'fetch'
httpRequest('/ajax/data2', {page: 1, pagesize: 10}, 'post').then(res => {
    console.log("/ajax/data2 && post: ", res);
});


Mock.mock('http://127.0.0.1:3000/*', 'get', request => {
    console.log("拦截请求");
    return '123'
});

// 服务端拦截
httpRequest('http://127.0.0.1:3000/express/getdata', {page: 1, pagesize: 10}, 'get').then(res => {
    console.log("/express/getdata && get: ", res);
});