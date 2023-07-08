
import './css/index.styl';

import { httpRequest } from './utils/Utils.js';

import axios from 'axios';

const fetchMock = require('fetch-mock');

/**
 * 使用函数来生成数据
 */
let mockDataFunc = (args) => {
    return Mock.mock({
        'datafrom': 'mockFunc', // 写死的字符串

        'string1|5-20': '@string(2, 5)', // 前面控制后边的次数，后边的设置长度
        'string2': '@string1', // 引用当前上下文的属性
        "string3|3": "★★★",
        'string4|1': ['@string(10, 20)', '@cword(5, 10)'],
        'string5': '@string("壹贰叁肆伍陆柒捌玖拾", 3, 5 )',

        'char': '@character("upper")', // lower || upper || number || symbol || aeiou 不传参数就合起来取一个

        'color': '@color', // 6位16进制数
        'title': '@string(5, 10)', // 一个字符串

        'number1|10-20': 1, // 最小10到最大20之间的一个数值        
        'number2': '@float(1, 10000, 2, 2)', // (min, max, dmin, dmax); 最小两位小数，最大也是两位小数
        'number3|1-100.1-10': 1, // 后边的1是没有意义的
        'number4': '@natural(1000, 10000)', // 自然数, 只设置一个表示最小值
        'number5': '@integer(-100, 100)',
        'number6': '@range(1, 20, 5)',

        'boolean1|1': true, // true||false各一半
        'boolean2|1-10': true, // 为true的几率是1/11， 为false的几率是10/11

        'date1': '@date("yyyy-MM-dd")', // 返回一个随机的日期
        'now': '@now()', // 返回当前日期
        'time': '@time',

         'object1|2-4': { // 内部的key-value 随机2-4个
            '110000': '北京市',
            '120000': '天津市',
            '130000': '河北省',
            '140000': '山西省'
        },

        

        'cname': '@cname(3, 10)', // 中文名字
        'cword': '@cword(3, 10)', // 中文字符 
        'ctitle': '@ctitle(2, 10)',
        'clast|10': ['@clast'], 


        'random1|1': ['A', 'B', 'C'], // 随机取10个

        'url': '@url()',
        'ip': '@ip',

        'cparagraph': '@cparagraph',
        'email': '@email',
        '句子': '@sentence(1, 20)',

        'img1': '@image', // Random.image( size, background, foreground, format, text )
        'img2': '@dataImage("200x100", "Hello!")',

        'province': '@province', // 省份
        'region|5': ['@region()'],

        'capitalize': '@capitalize("hello")', // 工具，处理首字母大写

        'guid': '@guid()',
        'id': '@id()', // 身份证号

        'reg': /[a-z]+,([A-Z]){1,10},[0-9]?/, // 使用正则来生成

        'data|2-5': [{ // 返回一个数组套对象的结构
            // 属性 id 是一个自增数，起始值为 1，每次增 1
            'id|+1': 1, // 添加索引
            'name': '@cname',
            'age|1-100': 100,
            // 后边的是控制小数点位数的
            'x|-20-50.1-10': 1,
            'y|-20-30.1-10': 1
        }]
    })
}

// 可是用函数来替代返回的数据
let data1 = mockDataFunc();
console.log('%c运行函数生成的data1: ', 'color: blue; font-size: 20px;', data1);
document.querySelector('#func').innerHTML += '<pre>' + JSON.stringify(data1, null, 4) + '</pre>';


/**
 * 模拟拦截ajax post||get
 */
// Mock.mock( rurl?, rtype?, template|function( options ) )
// get
Mock.mock(/\/ajax\/.+/, 'get', {
    'errno': function(){
        return Math.floor(Math.random() + 0.01);
    },
    'errmsg': 'error message is @string(3, 20)',
    'total|1-20': 1,
    "data" : function(){
        let total = this.total;
         return new Array(total).fill('').map(() => {
            return Mock.mock({
                'index|+1': 1,
                'title': '@cword(1, 20)',
                'date': '@date("yyyy-MM-dd")',
                'value1:': '@float(1, 10000, 2, 4)',
                'company': '@cword(3, 10)',
            });
        });
    }
}).setup({
    timeout: '200-400' // 似乎是全局作用
});

// post
Mock.mock(/\/ajax\/.+/, 'post', request => {
    console.log("request的请求参数: ", request);
    let params = JSON.parse(request.body);
    let { col, row } = params;
    // 函数生成
    let arrays = (row, col) => { // 这里使用函数来生成，当然可以使用ajax来
        return Mock.mock({ // 这里模拟一个可配置的二维数组
            data: function() {
                return new Array(row).fill('').map(() => {
                    return new Array(col).fill('').map(() => {
                        return Mock.mock('@float(1, 10000, 1, 3)');
                    });
                });
            }
        });
    }
    return arrays(col, row);
});

// Mock the fetch() global to always return the same value for GET
// requests to all URLs.
fetchMock.get('*', Mock.mock({dataFrom: 'fetch-mock', hello: 'world', now: '@now'}));


// ajax请求
// url = '', data = {}, type = 'GET', method = 'fetch'
console.time("请求时间");
httpRequest('/ajax/data2', {col: 10, row: 20}, 'get', 'ajax').then(res => {
    console.timeEnd("请求时间");
    console.log("%c/ajax/data2 && post: ", "color: green; font-size: 20px;", res);
});

// test axios
// Optionally the request above could also be done as
axios.get('/ajax/user')
.then(function (response) {
    console.log("axios数据请求结果data3: ", response.data);
})
.catch(function (error) {
    console.log(error);
});

// 服务端拦截
httpRequest('http://127.0.0.1:3000/express/getdata', {page: 1, pagesize: 10}, 'get', 'ajax').then(res => {
    console.log("%c/express/getdata && get 的结果: ", "font-size: 20px;color:red;", res);
});


// fetch方式数据请求
httpRequest('/fetch/data4', {page: 1, pagesize: 10}, 'get', 'fetch').then(res => {
    console.log("/fetch/data4 && get: ", res);
});
// Unmock.
fetchMock.restore();


var template = {
    name: 'value1'
}
var data = {
    name: 'value2'
}
Mock.valid(template, data)