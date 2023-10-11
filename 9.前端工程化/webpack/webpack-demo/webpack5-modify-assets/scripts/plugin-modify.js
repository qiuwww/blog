const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const types = require('@babel/types');

const babel = require('@babel/core');

const pluginName = 'PluginModify';

/**
 * 这里似乎可以这样理解：
 * 1. assets代表的是原始的代码，修改了会影响到目标结果；=》 修改模块代码:在 compilation 阶段，你可以监听 optimize-chunk-assets 事件，它会提供输出的 chunk 对象。你可以遍历这些 chunk，获取模块的代码，然后修改代码，最后通过 compilation.assets 对象将修改后的代码重新写入到输出文件中。
 *   1.1 都是走到了compilation.assets[fileName]；
 * 2. chunks和modules修改了也只是修改了，没什么用；
 * 3. compiler.hooks.normalModuleFactory应该也是同样的问题
 * ! JavascriptParser Hook:https://xie.infoq.cn/article/e61d3035bd82680f71d6b9936
 */
class PluginModify {
  constructor(options = {}) {
    this.options = options;
  }

  apply(compiler) {
    // able
    // !直接修改编译的中间结果
    // emit将要生成code的时候
    compiler.hooks.emit.tapAsync(pluginName, (compilation, cb) => {
      //可遍历出所有的资源名
      for (var filename in compilation.assets) {
        // console.log('MyModifyOutput name==', filename);
      }

      // !chunk文件需要
      // 这里的chunks是compilation的属性，并不是compilation的钩子
      compilation.chunks.forEach(function (chunk) {
        chunk.files.forEach(function (filename) {
          // compilation.assets 存放当前所有即将输出的资源
          // 调用一个输出资源的 source() 方法能获取到输出资源的内容
          console.log('MyModifyOutput chunk name==', filename);

          // !这里的assets也是webpack处理过的
          let source = compilation.assets[filename].source();
          // 这里可以根据扩展名进行不同的操作
          // 可以借助babel去分析语法，然后去修改执行位置的代码

          // chunk name== modifyByPlugin-9f67e5.js，这种形式
          if (filename.includes('.js') && filename.includes('modifyByPlugin')) {
            // !直接拼接结果，这里是有效果的
            source =
              "console.log('哈哈哈哈哈😄');\n" +
              source +
              "\n;console.log('add by plugin-modify-1!');";
            // 通过babel分析后，结构化添加
            // source = babelModify(source);
            source = `${source}`;
          }

          // 这里修改的是assets
          compilation.assets[filename] = {
            source: function () {
              return source;
            },
            size: function () {
              return source.length;
            },
          };
        });
      });
      cb();
    });

    compiler.hooks.done.tap(pluginName, (compilation) => {
      console.log('webpack 构建完毕！！！');
    });

    // !对比 chunks 和 modules
    // 似乎智能修改assets，chunks和modules没法修改
    compiler.hooks.emit.tapAsync(pluginName, (compilation, cb) => {
      // 源文件
      const assets = compilation.assets;
      // 这个只是主要的js文件
      const chunks = compilation.chunks;
      // 包括所有的资源
      const modules = compilation.modules;
      // 更新模块的代码 module._source = modifiedCode;
      modules.forEach((module) => {
        if (module.source && module.rawRequest === './src/modify-by-plugin.js') {
          // 修改源代码
          const modifiedCode = module._source.source().replace('heiheihei', 'heiheihei1');
          console.log('modifiedCode', modifiedCode);
          // !这里暂时不知道怎么修改
          // !这里的修改没用
          module._source._value = modifiedCode;
        }
      });
      cb();
    });

    // test3
    // 使用 compilation 钩子注册插件逻辑
    // !这个会在emit前面添加

    compiler.hooks.compilation.tap(pluginName, (compilation) => {
      // 使用 optimize-chunk-assets 钩子监听资源生成事件
      // !在 optimizeChunkAssets 阶段，这个阶段拿到的 chunk 资源已经完成各种 Loader 的处理，这个时候如果新增源码内容是 ES6，将不会再被转化。
      compilation.hooks.optimizeChunkAssets.tapAsync(pluginName, (chunks, callback) => {
        chunks.forEach((chunk) => {
          // 遍历块的所有文件
          chunk.files.forEach((file) => {
            if (file.endsWith('.js')) {
              // 获取文件内容
              // webpack处理过的代码
              let source = compilation.assets[file].source();

              // 在文件开头添加自定义注释
              source = `/* ¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥¥ */\n${source}`;

              // 将修改后的内容写回文件
              compilation.assets[file] = {
                source: () => source,
                size: () => source.length,
              };
            }
          });
        });

        // 执行回调函数
        callback();
      });
    });

    // test2
    // compiler.hooks.emit.tapAsync(pluginName, (compilation, callback) => {
    //   // 遍历和修改AST
    //   compilation.modules.forEach((module) => {
    //     if (module._source && module._source._value) {
    //       const sourceCode = module._source._value;

    //       const ast = babel.parse(sourceCode, {
    //         sourceType: 'module',
    //       });

    //       // 在这里进行AST遍历和修改
    //       traverse(ast, {
    //         enter(path) {
    //           // if (path.node.type === 'Identifier' && path.node.name === 'square') {
    //           //   // 修改函数调用
    //           // path.node.name = 'newFunctionName';
    //           // }
    //           if ((path.node.name = 'Program')) {
    //             if (path.node.body) {
    //               // path.node.body.length = 4;
    //             }
    //           }
    //         },
    //       });

    //       // const ast2 = types.callExpression(types.identifier('console.log'), [
    //       //   types.stringLiteral('add by plugin-modify-2-2!'),
    //       // ]);

    //       const code = `function square(n) {
    //         return n * n;
    //       }`;

    //       const ast2 = parser.parse(code);

    //       // 将修改后的AST转换回代码
    //       const modifiedCode = babel.transformFromAstSync(ast2, sourceCode, {
    //         presets: ['@babel/preset-env'],
    //       });

    //       // 替换模块的源代码
    //       // !没有任何效果，这里有问题
    //       module._source._value = modifiedCode.code;
    //     }
    //   });

    //   callback();
    // });

    // !通过ast来修改
    // compiler.hooks.normalModuleFactory.tap(pluginName, (factory, moudle) => {
    //   factory.hooks.parser.for('javascript/auto').tap(pluginName, (parser, options) => {
    //     // test1

    //     parser.hooks.varDeclarationVar.for('num').tap(pluginName, (varDeclarationVar) => {
    //       // !同样的问题，修改了，但是没效果
    //       varDeclarationVar.name = 'number';
    //     });
    //   });
    // });

    // compiler.hooks.emit.tapAsync(pluginName, (compilation, callback) => {
    //   // 遍历和修改AST
    //   // 这里获取的代码还是源代码，没有加webpack包裹的
    //   compilation.modules.forEach((module) => {
    //     if (module._source && module._source._value) {
    //       const sourceCode = module._source._value;

    //       const ast = babel.parse(sourceCode, {
    //         sourceType: 'module',
    //       });

    //       // 在这里进行AST遍历和修改
    //       traverse(ast, {
    //         enter(path) {
    //           // if (path.node.type === 'Identifier' && path.node.name === 'hahaha') {
    //           //   // 修改函数调用
    //           //   path.node.name = 'hahahaha';
    //           // }

    //           // path.node.name = 'hahahaha';

    //           if (path.node.type === 'StringLiteral' && path.node.value === 'heiheihei') {
    //             path.node.value = 'hahahahah';
    //           }
    //         },
    //       });

    //       // 将修改后的AST转换回代码
    //       const modifiedCode = babel.transformFromAstSync(ast, sourceCode, {
    //         presets: ['@babel/preset-env'],
    //       });

    //       // 替换模块的源代码
    //       // !根本没效果
    //       module._source._value = modifiedCode.code;
    //     }
    //   });
    //   callback();
    // });
  }
}

// const newASTNode = types.callExpression(types.identifier('console.log'), [
//   types.stringLiteral('add by plugin-modify-2!'),
// ]); // 创建新的 AST 节点

// functionDeclaration.arguments.unshift(newASTNode); // 在函数参数前插入新节点

module.exports = PluginModify;
