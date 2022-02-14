# yarn&npm 常用命令

[文章参考](https://segmentfault.com/a/1190000022116379)

## yarn

```bash
yarn config list # 查看全局配置
yarn global list # 全局包
yarn info eslint # 查看远端eslint包的内容
```

## npm

```bash
npm list -g --depth 0 # 全局包
```

## QA

1. UNMET PEER DEPENDENCY

   1. 未满足对等依赖性
      1. 意思是说父依赖缺少了这个依赖的对等版本。
   2. [具体参考](https://blog.51cto.com/u_15080021/2586133)

2. 删除 npm 全局安装包？
   1. npm uninstall -g \*\*；
   2. 找到目标目录，直接删除(/usr/local/lib)；
