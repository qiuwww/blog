/// <reference path="namespace.ts" />

let strings = ["Hello", "98052", "101"];
// Validators to use
let validators: { [s: string]: Validation.StringValidator } = {};

// 整体定义函数的输入及输出
export const stringCapitalizeEveryWord: Validation.StringCapitalizeEveryWord = str =>
  str.replace(/\b[a-z]/g, char => char.toUpperCase());
