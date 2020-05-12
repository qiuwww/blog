# README

记录相关示例

[官方文档](https://www.tslang.cn/docs/handbook/basic-types.html)
[非官方文档](https://ts.xcatliu.com/basics/primitive-data-types)

## ts 环境

- 全局安装`yarn global add typescript`，
- 也可以本地安装，然后使用`npx tsc filename`

查看版本号: `tsc -V`

1. 手动编译文件: `tsc --outFile ./out/function.js ./src/function.ts`

2. [也可以在线编译](http://www.typescriptlang.org/play/index.html)，适用于测试而不适用于开发
3. [在线练习工具](https://www.tslang.cn/play/index.html)。

## 3. 配置 vsc 的自动编译工具， 使用 vscode

配置 tsconfig.json 文件

1. 运行`tsc --init`来生成 ts 的配置文件;
2. 这这里配置生成文件地址`outDir: './dist'`;
3. 点击菜单 **终端-运行任务** 点击 `tsc:监视-TypeScript-learn/basic-grammar/tsconfig.json`，需要选中指定的文件，然后就可以自动生成代码了。

这样直接打开 index.html 引用 dist 中的文件，就可以直接查看了。
不同的文件，需要切换。

## 直接在 node 下运行 ts

使用 ts-node 包

```bash
yarn add ts-node ts-node-dev typescript --dev

npx ts-node ./src/interface.ts

# 监控模式
npx ts-node-dev ./src/interface.ts
```
