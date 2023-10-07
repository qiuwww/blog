const pluginName = 'MyModifyOutput2';
const ConcatSource = require('webpack-sources').ConcatSource;
console.log('MyModifyOutput2 load');
const fs = require('fs');
const types = require('@babel/types');
const parser = require('@babel/parser');

const t = require('@babel/types');
const g = require('@babel/generator').default;
const ConstDependency = require('webpack/lib/dependencies/ConstDependency');
const BasicEvaluatedExpression = require('webpack/lib/javascript/BasicEvaluatedExpression');
class MyModifyOutput2 {
  apply(compiler) {
    // compiler.hooks.parse.tap(pluginName, (params) => {
    //   console.log('以同步方式触及 compile 钩子。', params);
    // });

    // !这个生命周期是可以获取到ast的结果的

    compiler.hooks.normalModuleFactory.tap(pluginName, (factory, moudle) => {
      // !
      // factory.hooks.beforeResolve.tap(pluginName, (resolveData) => {
      //   console.log(resolveData, 'resolveData');
      //   // 仅仅解析目录为./src/index.js 忽略其他引入的模块
      //   return resolveData.request === './src/index.js';
      // });

      factory.hooks.beforeResolve.tap(pluginName, function (resolveData) {
        // console.log('factory beforeResolve', resolveData.request);
      });

      // !https://webpack.docschina.org/api/normalmodulefactory-hooks/#parser
      // 在创建 Parser 实例后触发。
      // 钩子参数：identifier
      // 回调参数：parser parserOptions

      // parser.hooks.varDeclaration.tap(pluginName, (node) => {
      //   console.log(`Declared variable: ${node.id.name}`);
      // });

      factory.hooks.parser.for('javascript/auto').tap(pluginName, (parser, options) => {
        // parser

        // const banner = '/* My custom banner */';
        // console.log('#$#$#$#$#$parser', parser.program);
        // const program = parser.program;
        // program.body.unshift(banner);

        // fs.writeFileSync(__dirname + '/source/parser.json', JSON.stringify(parser));

        // parser.program.body.unshift(`// Copyright (c) 2023 Your Company`);

        // parser.hooks.someHook.tap();
        // 这里会处理所有的资源引用的部分
        parser.hooks.import.tap(pluginName, (_stmt, source) => {
          if (!parser.state?.module?.resource.includes('node_modules')) {
            console.log('parser.hooks.import', source);
            // if (/@xforce\/.*\/mlib/.test(source)) {
            //   const dep = new ModifyDependency(`添加一点注释: ${source}`);
            //   parser.state.current.addDependency(dep);
            // }
          }
        });

        // parser.hooks.statementIf.tap('pluginA', (statementNode) => {
        //   const { code } = g(t.booleanLiteral(false));
        //   const dep = new ConstDependency(code, statementNode.test.range);
        //   dep.loc = statementNode.loc;
        //   parser.state.current.addDependency(dep);
        //   return statementNode;
        // });

        // parser.hooks.evaluate.for('CallExpression').for('MyPlugin', (expr) => {
        //   return new BasicEvaluatedExpression().setString('hello world').setRange(expr.range);
        // });

        // parser.hooks.statementIf.tap(pluginName, (statementNode) => {
        //   const { code } = g(t.booleanLiteral(false));

        //   const dep = new ConstDependency(code, statementNode.test.range);

        //   dep.loc = statementNode.loc;
        //   parser.state.current.addDependency(dep);

        //   fs.writeFileSync(__dirname + '/source/dep.json', JSON.stringify(dep));

        //   return statementNode;
        // });

        parser.hooks.program.tap(pluginName, (ast, comments) => {
          const { buildInfo } = parser.state.module;

          if (!buildInfo.valueDependencies) {
            // buildInfo.valueDependencies = new Map();
            console.log('buildInfo', buildInfo);

            // buildInfo.valueDependencies.set('[REPLACE_ID]', 'mainValue');
          }
        });

        //   parser.hooks.program.tap("DefinePlugin", () => {
        //     const { buildInfo } = parser.state.module;
        //     if (!buildInfo.valueDependencies)
        //         buildInfo.valueDependencies = new Map();
        //     buildInfo.valueDependencies.set(VALUE_DEP_MAIN, mainValue);
        // });

        // 这里只是处理了肩头函数的函数体
        parser.hooks.evaluate
          .for('ArrowFunctionExpression')
          .tap(pluginName, (expression, module) => {
            if (expression.params.map((item) => item.name).join('') === 'ab') {
              // console.log('expression params:', expression.params.map((item) => item.name).join(''));

              // 这里的expression就是ast
              expression.params.push(types.identifier('c'));

              const code = `console.log("data")`;

              // const node = t.importDeclaration(
              //   [t.importDefaultSpecifier(t.identifier('A'))],
              //   t.stringLiteral('a'),
              // );

              const node = t.variableDeclaration('const', [
                t.variableDeclarator(t.identifier('url'), t.stringLiteral('init')),
              ]);

              expression.body.body.push(node);

              // !这里已经修改了函数的参数个数，然后的问题就是如何将修改反应到代码中

              fs.writeFileSync(
                __dirname + '/source/###' + expression.start + '.json',
                JSON.stringify(expression),
              );

              // fs.writeFileSync(__dirname + '/source/module.js', JSON.stringify(parser.state.module));

              // ! 这里的问题是如何将想要修改的内容添加进去，将修改的ast填进去
              // ???
              for (let key in parser.state.module) {
                console.log('parser', key);
              }

              // return expression;

              // 这里可能是因为要动态操作的问题
              // !这里的修改也是没什么效果，就当有效果吧，反正也没在网上看到有什么有效的方法
              // 具体的修改与勾子有关系，还需要具体分析，这里暂不处理了
              // const res = new BasicEvaluatedExpression()
              //   .setRange(expression.range)
              //   .setExpression(expression);

              // return parser.state.module;

              const res = parser.evaluate(code);
              res.setRange(expression.range);

              console.log('res', res);

              fs.writeFileSync(__dirname + '/source/###2222.json', JSON.stringify(res));

              return res;
            }
          });
      });
    });

    // compiler.hooks.compilation.tap(pluginName, (compilation, { normalModuleFactory, parser }) => {
    //   // console.log('evaluateTypeof', normalModuleFactory.hooks.parser.for('javascript/auto'));

    //   normalModuleFactory.hooks.parser.for('javascript/auto').tap(pluginName, (expression) => {
    //     console.log('evaluateTypeof', expression);
    //   });

    //   // normalModuleFactory.hooks.parser
    //   //   .for('javascript/auto')
    //   //   .tap(pluginName, (parser, options) => {

    //   //     parser

    //   //   });
    // });

    // compiler.hooks.emit.tap(pluginName, (compilation) => {
    //   // 查看compilation
    //   for (var filename in compilation.assets) {
    //     console.log('MyModifyOutput2 name==', filename);

    //     fs.writeFileSync(__dirname + '/source/' + filename, compilation.assets[filename].source());
    //   }
    // });

    // 为编译(compilation)创建附加资源(asset)。这个钩子可以用来下载图像，例如：

    // compiler.hooks.emit.tap(pluginName, (compilation) => {
    //   compilation.hooks.additionalAssets.tapAsync('MyPlugin', (callback) => {

    //     // download('https://img.shields.io/npm/v/webpack.svg', function (resp) {
    //     //   if (resp.status === 200) {
    //     //     compilation.assets['webpack-version.svg'] = toAsset(resp);
    //     //     callback();
    //     //   } else {
    //     //     callback(new Error('[webpack-example-plugin] Unable to download the image'));
    //     //   }
    //     // });
    //   });
    // });
  }
}

module.exports = MyModifyOutput2;

// 遇到一个问题：TypeError: result.setExpression is not a function
