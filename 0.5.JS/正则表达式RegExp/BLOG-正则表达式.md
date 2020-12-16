---
title: 正则表达式
date: 2016-6-8
tags:
  - JS
  - 正则表达式
categories:
  - [JS]
  - [正则表达式]
---

[TOC]

## 正则表达式类

[正则表达式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions)

正则表达式是用于匹配字符串中字符组合的模式。在 JavaScript 中，正则表达式也是对象。

这些模式被用于 RegExp 的

1. exec 和
2. test 方法(RegExp 只有这两个)

以及 String 的

1. match、
2. matchAll、
3. replace、
4. search 和
5. split 方法。

## regexp 正则表达式方法

### regexp 的 exec 对应 string 的 match 方法

```js
/ll/.exec('hello, word');
// 返回结果与字符串的match方法一毛一样：
// 得到一个类数组：
// 0:"ll",
// index:2,
// input:"hello word",
// length:1
```

### test，返回 boolean，测试当前模式，是否能在字符串中找到

```js
/ll/.test('hello');
// 返回true;
```

## string 字符串相关的方法

### match 模式匹配,与 exec 对调, 返回结果一样; 功能相对弱

```js
'hello word'.match(/ll/);
// 得到一个类数组：
// 0:"ll",
// index:2,
// input:"hello word",
// length:1
```

与 exec 的操作相反，得到的结果一致

### search，比 indexOf 功能强大一点

```js
'cat, dog'.search(/at/);
// 返回第一次匹配到的索引1;
```

### replace，按正则替换文本，只有 replace 有回调

```js
'cat, dog'.replace(/cat/, 'mouse');
// 返回修改的文本
// "mouse, dog"
```

### split，按照正则分隔字符串

```js
`a1b2c3d4e5f6g7`.split(/\d/g);
// 返回结果数组：
// ["a", "b", "c", "d", "e", "f", "g", ""]
```

## 常用的正则表达式

[在线测试工具](https://regexper.com/)，可以把代码下载到本地的，访问就不会受限制了。

### 解析 query 字符串

```js
const testURL =
  'https://www.youzan.com?name=coder&age=20&callback=https%3A%2F%2Fyouzan.com%3Fname%3Dtest';
function getQueryObject(url) {
  var query = url.includes('?') ? url.split('?')[1] : url;
  var obj = {};
  var reg = /([^?&=]+)=([^?&=]*)/g;
  query.replace(reg, function (rs, $1, $2) {
    var name = decodeURIComponent($1);
    var val = decodeURIComponent($2);
    val = String(val);
    obj[name] = val;
    return rs;
  });
  return obj;
}

getQueryObject(testURL);
```

### 千分位数值

```js
// 千分位数值.js
function format(num) {
  return (num.toFixed(2) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
}
var num = 12345; // 12,345.00
console.log(format(num));

/*与 regexp 相匹配的子串。表示与之相匹配的子字符串*/
function comdify(n) {
  n = n + '';
  var re = /\d{1,3}(?=(\d{3})+$)/g;
  var n1 = n.replace(/^(\d+)((\.\d+)?)$/, function (s, s1, s2) {
    return s1.replace(re, '$&,') + s2;
  });
  return n1;
}
console.log(comdify(1212133345.78));
```

### 用于获取 cookie 的值

```js
// 用于获取cookie的值
function getCookie(name) {
  var arr,
    reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
  if ((arr = document.cookie.match(reg))) {
    return unescape(arr[2]);
  } else {
    return null;
  }
}
```

### 基本匹配规则

邮箱匹配：`var regEmail = /^(\w+\.)*\w+@(\w+\.)+[A-Za-z]+$/;`

手机号匹配：`var regPhone = /^1[34578]\d{9}$/;`

匹配中文字符：`/[\u4e00-\u9fa5]/`

匹配帐号是否合法(字母开头，允许 5-10 字节，允许字母数字下划线)：`/^[a-zA-Z][a-zA-Z0-9_]{4,9}$/`

匹配身份证：`/\d{15}|\d{18}/`

匹配 HTML 标记的正则表达式：`< (\S*?)[^>]*>.*?|< .*? />`

### 身份证正则判断

```js
var aCity = {
  11: '北京',
  12: '天津',
  13: '河北',
  14: '山西',
  15: '内蒙古',
  21: '辽宁',
  22: '吉林',
  23: '黑龙江',
  31: '上海',
  32: '江苏',
  33: '浙江',
  34: '安徽',
  35: '福建',
  36: '江西',
  37: '山东',
  41: '河南',
  42: '湖北',
  43: '湖南',
  44: '广东',
  45: '广西',
  46: '海南',
  50: '重庆',
  51: '四川',
  52: '贵州',
  53: '云南',
  54: '西藏',
  61: '陕西',
  62: '甘肃',
  63: '青海',
  64: '宁夏',
  65: '新疆',
  71: '台湾',
  81: '香港',
  82: '澳门',
  91: '国外',
};

function isCardID(sId) {
  var iSum = 0;
  var info = '';
  if (!/^\d{17}(\d|x)$/i.test(sId)) {
    alert('你输入的身份证长度或格式错误');
    flagsid = true;
    return;
  }
  sId = sId.replace(/x$/i, 'a');
  if (aCity[parseInt(sId.substr(0, 2))] == null) {
    alert('你的身份证地区非法');
    flagsid = true;
    return;
  }
  sBirthday = sId.substr(6, 4) + '-' + Number(sId.substr(10, 2)) + '-' + Number(sId.substr(12, 2));
  var d = new Date(sBirthday.replace(/-/g, '/'));
  if (sBirthday != d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()) {
    alert('身份证上的出生日期非法');
    flagsid = true;
    return;
  }
  for (var i = 17; i >= 0; i--) iSum += (Math.pow(2, i) % 11) * parseInt(sId.charAt(17 - i), 11);
  if (iSum % 11 != 1) {
    alert('你输入的身份证号非法');
    flagsid = true;
    return;
  }
  flagsid = false;
  return true; //aCity[parseInt(sId.substr(0,2))]+","+sBirthday+","+(sId.substr(16,1)%2?"男":"女")
}
```

### 随机汉字

随机汉字：regexp, `[\u4e00-\u9fa5]{1,20} | [\u4e00-\u9fa5]{2,5}`；
