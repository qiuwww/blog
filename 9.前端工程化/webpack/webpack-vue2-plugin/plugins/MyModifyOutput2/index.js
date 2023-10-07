const pluginName = 'MyModifyOutput2';
// const ConcatSource = require('webpack-sources').ConcatSource;
console.log('MyModifyOutput2 load');

const fs = require('fs');
const types = require('@babel/types');
// const parser = require('@babel/parser');
// const t = require('@babel/types');
const g = require('@babel/generator').default;
// const ConstDependency = require('webpack/lib/dependencies/ConstDependency');
// const BasicEvaluatedExpression = require('webpack/lib/javascript/BasicEvaluatedExpression');
class MyModifyOutput2 {
  apply(compiler) {
    // !这个生命周期是可以获取到ast的结果的
    compiler.hooks.normalModuleFactory.tap(pluginName, (factory, moudle) => {
      // !这里可以过滤需要处理的文件，踢掉不需要处理的
      // factory.hooks.beforeResolve.tap(pluginName, (resolveData) => {
      //   // 仅仅解析../views/AboutView.vue，忽略其他引入的模块
      //   return resolveData.request === '../views/AboutView.vue';
      // });

      // !https://webpack.docschina.org/api/normalmodulefactory-hooks/#parser
      // 在创建 Parser 实例后触发。
      // 钩子参数：identifier
      // 回调参数：parser parserOptions

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
            // console.log('parser.hooks.import：', source);
          }
        });

        parser.hooks.program.tap(pluginName, (ast, comments) => {
          const { buildInfo } = parser.state.module;
          if (!buildInfo.valueDependencies) {
            // buildInfo.valueDependencies = new Map();
            // console.log('program：', buildInfo);
          }
        });

        // 这里只是处理了肩头函数的函数体
        parser.hooks.evaluate
          .for('ArrowFunctionExpression')
          .tap(pluginName, (expression, module) => {
            if (expression.params.map((item) => item.name).join('') === 'ab') {
              fs.writeFileSync(__dirname + '/output/expression.json', JSON.stringify(expression));

              // 这里的expression就是ast
              expression.params.push(types.identifier('c'));

              const logAst = types.expressionStatement(
                types.callExpression(types.identifier('console.log'), [
                  types.identifier('a'),
                  types.identifier('b'),
                  types.identifier('c'),
                ]),
              );
              fs.writeFileSync(__dirname + '/output/expression2.js', g(logAst).code);

              // expression.body.body.push(logAst);

              // !这里已经修改了函数的参数个数，然后的问题就是如何将修改反应到代码中
              // ! 这里的问题是如何将想要修改的内容添加进去，将修改的ast填进去

              // 这里可能是因为要动态操作的问题
              // !这里的修改也是没什么效果，就当有效果吧，反正也没在网上看到有什么有效的方法
              // 具体的修改与勾子有关系，还需要具体分析，这里暂不处理了
              // const res = new BasicEvaluatedExpression()
              //   .setRange(expression.range)
              //   .setExpression(expression);

              // const res = parser.evaluate(expression);
              // res.setRange(expression.range);

              fs.writeFileSync(
                __dirname + '/output/expression-modified.json',
                JSON.stringify(expression),
              );

              // return res;
            }
          });
      });
    });
  }
}

module.exports = MyModifyOutput2;
// 遇到一个问题：TypeError: result.setExpression is not a function
