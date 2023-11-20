# TS

## declare 是干嘛的

.d.ts 文件中的顶级声明必须以 "declare" 或 "export" 修饰符开头。

通过 declare 声明的类型或者变量或者模块，**在 include 包含的文件范围内，都可以直接引用而不用去 import 或者 import type 相应的变量或者类型。**相当于声明了一个区域的包。

1. declare 声明一个类型 declare type Asd { name: string; } 在 include 包含的文件范围内可以直接使用 Asd 这个 type；

## enum 的参数类型

1. `const saveTmscCookieAccredit = (val: '1' | '0') => {`；

## Could not find a declaration file for module 'vue-xxx'

这里是因为包是 js 写的，所以就需要添加配置：`"noImplicitAny": false,"allowJs": true,`，[参考](https://stackoverflow.com/questions/49258849/could-not-find-a-declaration-file-for-module-vue-xxx)；

## 扩展名

1. .vue 需要添加；
2. .ts 不需要添加；

## error TS2307: Cannot find module

1. 添加配置："moduleResolution": "node"
