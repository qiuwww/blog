const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const types = require('@babel/types');

const babel = require('@babel/core');

const pluginName = 'PluginModify';

class PluginModify {
  constructor(options = {}) {
    this.options = options;
  }

  apply(compiler) {
    // !直接修改编译的中间结果
    compiler.hooks.emit.tapAsync(pluginName, (compilation, cb) => {
      //可遍历出所有的资源名
      for (var filename in compilation.assets) {
        // console.log('MyModifyOutput name==', filename);
      }

      compilation.chunks.forEach(function (chunk) {
        chunk.files.forEach(function (filename) {
          // compilation.assets 存放当前所有即将输出的资源
          // 调用一个输出资源的 source() 方法能获取到输出资源的内容
          console.log('MyModifyOutput chunk name==', filename);

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

    // test2
    compiler.hooks.emit.tapAsync(pluginName, (compilation, callback) => {
      // 遍历和修改AST
      compilation.modules.forEach((module) => {
        if (module._source && module._source._value) {
          const sourceCode = module._source._value;

          const ast = babel.parse(sourceCode, {
            sourceType: 'module',
          });

          // 在这里进行AST遍历和修改
          traverse(ast, {
            enter(path) {
              // if (path.node.type === 'Identifier' && path.node.name === 'square') {
              //   // 修改函数调用
              // path.node.name = 'newFunctionName';
              // }
              if ((path.node.name = 'Program')) {
                if (path.node.body) {
                  // path.node.body.length = 4;
                }
              }
            },
          });

          // const ast2 = types.callExpression(types.identifier('console.log'), [
          //   types.stringLiteral('add by plugin-modify-2-2!'),
          // ]);

          const code = `function square(n) {
            return n * n;
          }`;

          const ast2 = parser.parse(code);

          // 将修改后的AST转换回代码
          const modifiedCode = babel.transformFromAstSync(ast2, sourceCode, {
            presets: ['@babel/preset-env'],
          });

          // 替换模块的源代码
          // !没有任何效果，这里有问题
          module._source._value = modifiedCode.code;
        }
      });

      callback();
    });

    // !通过ast来修改
    compiler.hooks.normalModuleFactory.tap(pluginName, (factory, moudle) => {
      factory.hooks.parser.for('javascript/auto').tap(pluginName, (parser, options) => {
        // test1
        parser.hooks.varDeclarationVar.for('num').tap(pluginName, (varDeclarationVar) => {
          // !同样的问题，修改了，但是没效果
          varDeclarationVar.name = 'number';
        });
      });
    });
  }
}

// const newASTNode = types.callExpression(types.identifier('console.log'), [
//   types.stringLiteral('add by plugin-modify-2!'),
// ]); // 创建新的 AST 节点

// functionDeclaration.arguments.unshift(newASTNode); // 在函数参数前插入新节点

module.exports = PluginModify;
