# npmlink 本地开发 modules

## 操作步骤

1. **开发包**内运行`npm link`，这个时候会生成一个全局安装包的链接，具体的地址可以通过`npm config get prefix`(/usr/local)，`{prefix}/lib/node_modules/<package>`，开发包需要时一个可 publish 的项目；
2. 然后在**测试项目内**，运行`npm link packageName`(@zyf2e/adapt)，这个时候就会链接到项目的 node_modules 下边。

> /Users/qiuww/code/ks/adapt-demo/node_modules/@zyf2e/adapt -> /usr/local/lib/node_modules/@zyf2e/adapt -> /Users/qiuww/code/ks/adapt

## caution

注意这个时候需要修改 package.json 的 main 属性`"main": "./src/index.ts",`，需要当前指向 src 目录。

## 推出 link，使用默认的安装包下载操作

需要删除这个引用(也可以直接去删除这个链接)，并重新安装：

```bash
npm unlink @zyf2e/adapt
npm install @zyf2e/adapt
```

link会安装本地，install还是会安装线上包。
