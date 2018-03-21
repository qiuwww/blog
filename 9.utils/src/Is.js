

/**
 * 
 * @desc   判断`obj`是否为空
 * @param  {Object} obj
 * @return {Boolean}
 */
function isEmptyObject(obj) {
    if (!obj || typeof obj !== 'object' || Array.isArray(obj))
        return false
    return !Object.keys(obj).length
}

/**
 * 
 * @desc 随机生成颜色
 * @return {String} 	
 */
function randomColor() {
    return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
}

/**
 * 
 * @desc 生成指定范围随机数
 * @param  {Number} min 
 * @param  {Number} max 
 * @return {Number} 
 */
function randomNum(min, max) {
    return Math.floor(min + Math.random() * (max - min));
}

/**
 * 
 * @desc   判断是否为邮箱地址
 * @param  {String}  str
 * @return {Boolean} 
 */
function isEmail(str) {
    return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(str);
}

/**
 * 
 * @desc  判断是否为身份证号
 * @param  {String|Number} str 
 * @return {Boolean}
 */
function isIdCard(str) {
    return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(str)
}

/**
 * 
 * @desc   判断是否为手机号
 * @param  {String|Number} str 
 * @return {Boolean} 
 */
function isPhoneNum(str) {
    return /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(str)
}

/**
 * 
 * @desc   判断是否为URL地址
 * @param  {String} str 
 * @return {Boolean}
 */
function isUrl(str) {
    return /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i.test(str);
}


// 判断是纯对象（非数组，非函数）
let isObject = function(obj){
	if(obj && typeof obj === 'object' && obj.toString === "[object Object]"){
		return true;
	}else{
		return false;
	}
}

// 检测是不是指数
function isPrime(n) { 
	return !(/^.?$|^(..+?)\1+$/).test('1'.repeat(n));
}

// 检测从str到end的所有质数
function getPrime(str, end) {
	let res = [];
	for(let i = str; i <= end; i++){
		if(isPrime(i)){
			res.push(i);
		}else{
			continue;
		}
	}
	return res;
}
// test
getPrime(1, 1000);


var $ = (function () {
    'use strict';

    var types = 'Array Object String Date RegExp Function Boolean Number Null Undefined'.split(' ');

	function type () {
	   return Object.prototype.toString.call(this).slice(8, -1);
	}

	for (var i = types.length; i--;) {
	    $['is' + types[i]] = (function (self) {
	        return function (elem) {
	           return type.call(elem) === self;
	        };
	    })(types[i]);
	}

    return $;
})();//类型判断