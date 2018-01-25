function BinarySearch(srcArray, des) {
	// 应该先排一下序
	if(!Array.isArray(srcArray)){
		return '第一个参数请传入数组';
	}
	srcArray = srcArray.sort(function(a, b) {
		return a-b;
	})
	console.log("排序之后的数组：", srcArray);
	var low = 0;
	var high = srcArray.length - 1;
	while (low <= high) {
		debugger
		// 这里需要考虑middle为非整型的时候的问题, 这里其实向上取整与向下取整差别不大，查找的次数随机
		var middle = Math.floor((low + high) / 2);
		if (des == srcArray[middle]) {
			return middle;
		} else if (des < srcArray[middle]) {
			high = middle - 1;// 这里是为了移动中间值
		} else {
			low = middle + 1;
		}
	}
	return -1;
}

var testArr = [1,2,5,6,4,10,20,0,8,9];
BinarySearch(testArr, 8);
BinarySearch(testArr, 1);