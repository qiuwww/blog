数组的扩展.js

// 类数组转数组
var toArray = (() => {
	return Array.from ? Array.from : (obj) => [].slice.call(obj);
})();
var likeArray = document.querySelectorAll('div');
toArray(likeArray);

