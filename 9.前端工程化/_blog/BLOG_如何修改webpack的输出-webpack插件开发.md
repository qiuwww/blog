# 如何修改webpack的输出-webpack插件开发

1. webpack5的基础上进行；

1.介绍webpack的构建流程，文件变更及初始化流程。
2.打包流程，并不是本次主要的。每次dev都要build。
3.插件开发流程，主要的节点介绍。
4.具体这个插件如何开发。
5.能展示什么功能。

## 是什么

1. 在使用webpack进行开发的时候，通常会建立浏览器与webpack端的一个WebSocket连接，确保本地文件的修改，可以反应到浏览器端的页面上，这个时候webpack就是将本地文件处理后输出到浏览器端的；

## 分析webpack的输出

## 修改webpack的输出

1. babel分析输出结果，遍历节点；

## 具体可以做哪一些功能

1. 注入开发工具的代码；
2. 对自己的代码添加一些特殊的标记；
3. 给所有标签加上border；

## 参考文档

# 如何修改webpack的输出，在dev阶段和build阶段

## 步骤

1. 这里面要你自己去详细了解三个东西：1. compiler，2. compilation，3. 和emit同一个层面的其他节点名。
2. 直接通过compilation找到要输出的文件内容，通过replace进行替换，替换完之后，又把内容塞回去。

上面的代码就是我的全部代码。compilation.assets获取了所有的assets，也就是每一个要处理的文件，它的key值是以options.output.filename命名的，所以你可以看到我用outputfile去和key进行对比。

asset.source()是直接获取到要输出的文件的内容。但是这个内容还是保存在内存中的，还没有生成文件。而通过new RawSource则创建了新的asset，再塞回去，这样输出来的文件内容就变了。

## 测试demo

```js
// 插件 index.js
const pluginName = 'myTestPlugin';
 
class myTestPlugin {
    apply(compiler) {
        compiler.hooks.emit.tapAsync(pluginName, (compilation, cb) => {
            //可遍历出所有的资源名
            for (var filename in compilation.assets) {
                //console.log('name==', filename) 
            }
            compilation.chunks.forEach(function (chunk) {
                chunk.files.forEach(function (filename) {
                    // compilation.assets 存放当前所有即将输出的资源
                    // 调用一个输出资源的 source() 方法能获取到输出资源的内容
                    let source = compilation.assets[filename].source();
                    source = '/*这是我通过webpack plugin 插八的一行代码*/\n' + source
                    compilation.assets[filename] = {
                        source: function () {
                            return source
                        },
                        size: function () {
                            return source.length
                        }
                    }
                });
            })
            cb()
        });
        compiler.hooks.done.tap(pluginName, (compilation) => {
            console.log('webpack 构建完毕！');
        });
    }
}
 
module.exports = myTestPlugin;


// webpack.config.js
//引入webpack插件
const myTestPlugin = require('./webPackPlugin/index.js')
 
//在plugin中创建插件实例
module.exports = {
    ...
    plugins:[
        new myTestPlugin()
    ]
}

```

## 参考

1. [如何修改webpack输出的内容？](https://www.tangshuang.net/3030.html)
