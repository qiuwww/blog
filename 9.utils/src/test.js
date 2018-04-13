// Only Node.JS has a process variable that is of [[Class]] process
module.exports = Object.prototype.toString.call(typeof process !== 'undefined' ? process : 0) === '[object process]';



// 测试字符串是否包含另一个字符串

// stringObject.indexOf(searchvalue,fromindex)
str1.includes(str2)