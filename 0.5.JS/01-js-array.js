// 01-js-function-array.js
/**
 * num：1
 * 取数组的最大值||最小值
 * 借助于Math对象的max||min方法，最好用
 * 参考：http://www.jb51.net/article/77331.htm
 */
// 方法一，便利数组依次保存当前的最大值
//最大值
if (typeof Array.prototype['max'] == 'undefined') { // 防止与引入的类库重名
	Array.prototype.max = function() { 
		var max = this[0];
		var len = this.length; 
		for (var i = 1; i < len; i++){ 
			if (this[i] > max) { 
				max = this[i]; 
			} 
		} 
		return max;
	}
	return;
}
// 方法二，最好用
// 最大值
Array.prototype.max = function(){ 
	return Math.max.apply(Math, this);
};
// 调用
[1,2,3].max();

