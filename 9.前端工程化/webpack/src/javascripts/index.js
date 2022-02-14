// 文件引用 requier 按照文件引用的顺序打包  文件依赖
// require('./style.less')
require('../styles/normalize'); //通用的ressa
require('../styles/index.less');
// utils ? 没有相对路径  回想@  => 别名
const format = require('utils/format');
const { log } = require('../utils/utils');

log('hello world');
log(format('hello webpack'));

console.log('这个变量是通过webpack.DefinePlugin注入的：', process.env.ENV);
console.log(__DEV__);

console.log({ ...{ a: 1 }, ...{ b: 2 } });

// 测试import 与 import()的问题，对比main方法下的引用
import { counter, incCounter } from './dynamicModule.js';
console.log(counter); //3
incCounter();
console.log(counter); //4

// 测试externals，

import $ from 'jquery';

console.log("$('body')", $('body'));

// 测试自定义loader，读取txt类型的文件

import txt from '@/assets/test.txt';

console.log('txt', txt);
