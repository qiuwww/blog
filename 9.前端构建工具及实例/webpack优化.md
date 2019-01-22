DefinePlugin可以在编译时期创建全局变量。
该特性适用于开发版本同线上版本在某些常量上有区别的场景。
比如，可能会通过全局变量定义是否需要打印日志，在开发版中打印日志，
而在先上版本不打印日志。

## 打包的时候去掉console.log 与 debugger
```
new webpack.optimize.UglifyJsPlugin({
  minimize: true,
  compress: {
    warnings: false,
  }
})
```
