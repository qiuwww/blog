
// 有两个数组a，b，大小都为n，数组元素的值任意，无序；

// 要求：

// 通过交换a，b中的元素，使数组a元素的和与数组b元素的和之间的差最小。8分钟写出代码！


var getRandomNum = function (start, end){
	if(typeof start === 'number' && typeof end === 'number'){
		return Math.floor(Math.random() * (end - start)) + start + 1;
	}else{
		return 
	}	
}

var getArr = function(len, start, end){
	var arr = [];
	for (var i = len; i >= 0; i--) {
		arr.push(getRandomNum(start, end));
	};
	return arr;
}

// console.log(getArr(100, 2, 32));
var n = 5;
var start = 1;
var end = 100;

var arr1 = getArr(n, start, end);
var arr2 = getArr(n, start, end);

console.log(arr1);
console.log(arr2);

arr1 = arr1.sort(function(a,b){return b-a});
arr2 = arr2.sort(function(a,b){return b-a});

console.log(arr1);
console.log(arr2);

var total = function(arr) {
	return arr.reduce(function(sum, value) {
	  	return sum + value;
	}, 0);
}





console.log(total(arr1));
console.log(total(arr2));

var newArr1 = [];
var newArr2 = [];

// for (var i = arr1.length - 1; i >= 0; i--) {
// 	if(total(newArr1) >= total(newArr2)){
		
// 	}
	
// };
