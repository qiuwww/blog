

// 整个语句都开启严格模式的语法
"use strict";
// 总库，需要的复制出来，不至于每次都占用过多内存

let isInteger = (x) => {
	return (x ^ 0) === x;
};

let log = (msg) => {
	console.log(msg)
};

// 类数组转数组
// 用早querySelectAll方法和arguments属性的处理
let formArr = (arrayLike) => {
	if (Array.form) {
		return Array.form(arrayLike);
	} else {
		return [].slice.call(arrayLike);
	}
}
/**
 * @desc cookie操作方法集
 */
let CookieUtils = {
	/**
	 * @desc 根据name读取cookie
	 * @param  {String} name 
	 * @return {String}
	 */
	getCookie(name) {
		var arr = document.cookie.replace(/\s/g, "").split(';');
		for (var i = 0; i < arr.length; i++) {
			var tempArr = arr[i].split('=');
			if (tempArr[0] == name) {
				return decodeURIComponent(tempArr[1]);
			}
		}
		return '';
	},
	/**
	 * @desc  设置Cookie
	 * @param {String} name 
	 * @param {String} value 
	 * @param {Number} days 
	 */
	setCookie(name, value, days) {
		var date = new Date();
		date.setDate(date.getDate() + days);
		document.cookie = name + '=' + value + ';expires=' + date;
	},
	/**
	 * @desc 设置过期时间为之前的值
	 * @param {*需要设置的key} name 
	 */
	removeCookie(name) {
		this.setCookie(name, '1', -1);
	}
}

/**
 * @desc 获取浏览器类型和版本
 * @return {String} 
 */
let getExplore = () => {
	var sys = {},
		ua = navigator.userAgent.toLowerCase(),
		s;
	(s = ua.match(/rv:([\d.]+)\) like gecko/)) ? sys.ie = s[1] :
		(s = ua.match(/msie ([\d\.]+)/)) ? sys.ie = s[1] :
			(s = ua.match(/edge\/([\d\.]+)/)) ? sys.edge = s[1] :
				(s = ua.match(/firefox\/([\d\.]+)/)) ? sys.firefox = s[1] :
					(s = ua.match(/(?:opera|opr).([\d\.]+)/)) ? sys.opera = s[1] :
						(s = ua.match(/chrome\/([\d\.]+)/)) ? sys.chrome = s[1] :
							(s = ua.match(/version\/([\d\.]+).*safari/)) ? sys.safari = s[1] : 0;
	// 根据关系进行判断
	if (sys.ie) return ('IE: ' + sys.ie)
	if (sys.edge) return ('EDGE: ' + sys.edge)
	if (sys.firefox) return ('Firefox: ' + sys.firefox)
	if (sys.chrome) return ('Chrome: ' + sys.chrome)
	if (sys.opera) return ('Opera: ' + sys.opera)
	if (sys.safari) return ('Safari: ' + sys.safari)
	return 'Unkonwn'
}

/**
 * @desc 获取操作系统类型
 * @return {String} 
 */
let getOS = () => {
	var userAgent = 'navigator' in window && 'userAgent' in navigator && navigator.userAgent.toLowerCase() || '';
	var vendor = 'navigator' in window && 'vendor' in navigator && navigator.vendor.toLowerCase() || '';
	var appVersion = 'navigator' in window && 'appVersion' in navigator && navigator.appVersion.toLowerCase() || '';

	if (/mac/i.test(appVersion)) return 'MacOSX'
	if (/win/i.test(appVersion)) return 'windows'
	if (/linux/i.test(appVersion)) return 'linux'
	if (/iphone/i.test(userAgent) || /ipad/i.test(userAgent) || /ipod/i.test(userAgent)) 'ios'
	if (/android/i.test(userAgent)) return 'android'
	if (/win/i.test(appVersion) && /phone/i.test(userAgent)) return 'windowsPhone'
}



/**
 * 函数节流
 */

/**
 * @desc   函数节流。
 * 适用于限制`resize`和`scroll`等函数的调用频率
 *
 * @param  {Number}    delay          0 或者更大的毫秒数。 对于事件回调，大约100或250毫秒（或更高）的延迟是最有用的。
 * @param  {Boolean}   noTrailing     可选，默认为false。
 *                                    如果noTrailing为true，当节流函数被调用，每过`delay`毫秒`callback`也将执行一次。
 *                                    如果noTrailing为false或者未传入，`callback`将在最后一次调用节流函数后再执行一次.
 *                                    （延迟`delay`毫秒之后，节流函数没有被调用,内部计数器会复位）
 * @param  {Function}  callback       延迟毫秒后执行的函数。`this`上下文和所有参数都是按原样传递的，
 *                                    执行去节流功能时，调用`callback`。
 * @param  {Boolean}   debounceMode   如果`debounceMode`为true，`clear`在`delay`ms后执行。
 *                                    如果debounceMode是false，`callback`在`delay` ms之后执行。
 *
 * @return {Function}  新的节流函数
 */


/**
 * 函数去抖动
 */
/**
 * @desc 函数防抖 
 * 与throttle不同的是，debounce保证一个函数在多少毫秒内不再被触发，只会执行一次，
 * 要么在第一次调用return的防抖函数时执行，要么在延迟指定毫秒后调用。
 * @example 适用场景：如在线编辑的自动存储防抖。
 * @param  {Number}   delay         0或者更大的毫秒数。 对于事件回调，大约100或250毫秒（或更高）的延迟是最有用的。
 * @param  {Boolean}  atBegin       可选，默认为false。
 *                                  如果`atBegin`为false或未传入，回调函数则在第一次调用return的防抖函数后延迟指定毫秒调用。
                                    如果`atBegin`为true，回调函数则在第一次调用return的防抖函数时直接执行
 * @param  {Function} callback      延迟毫秒后执行的函数。`this`上下文和所有参数都是按原样传递的，
 *                                  执行去抖动功能时，，调用`callback`。
 *
 * @return {Function} 新的防抖函数。
 */



export default {
	isInteger,
	log,
	formArr,
	CookieUtils,
	getExplore,
	getOS

}







