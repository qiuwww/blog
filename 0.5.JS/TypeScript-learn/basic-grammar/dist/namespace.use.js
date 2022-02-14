/// <reference path="namespace.ts" />
var strings = ["Hello", "98052", "101"];
// Validators to use
var validators = {};
// 整体定义函数的输入及输出
export var stringCapitalizeEveryWord = function (str) {
    return str.replace(/\b[a-z]/g, function (char) { return char.toUpperCase(); });
};
