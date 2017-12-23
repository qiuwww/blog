// 1. 最大平均值子数组

// 第一行输入一个 整数数组 ，第二行输入一个数字最小子数组的长度 k，最后输出子数组的最大平均值。

// 样例输入




var getLargestAverageSubarray = (arr, k) => {
	if(Array.isArray(arr) && arr.length >= k){
		var max = Number.NEGATIVE_INFINITY;
		var avg;
		var sum = 0;
		for(var i = 0, len = arr.length; i <= len - k; i++){
			for(var j = 0; j < k; j++){
				sum += arr[i + j];
			}
			avg = sum / k;
			if(avg >= max){
				max = avg;
			}else{
				continue
			}
			sum = 0;
		}
		return max;
	}else{
		return '参数有误';
	}
}

// var nums = [1, 12, -5, -6, 50, 3];
// var k = 3;
// getLargestAverageSubarray(nums, k);


// 2. 生成一个随机的数组

var getRandomArr = function(len, max){
	var arr = [];
	let getRandomNum = function(){
		return Math.floor((Math.random() - 0.5) * max + 1);
	}
	while(arr.length < len) {
		arr.push(getRandomNum());
	}
	return arr;
}

var arr = getRandomArr(50, 1000);

console.log(arr);

getLargestAverageSubarray(arr, 3);

// 有点问题