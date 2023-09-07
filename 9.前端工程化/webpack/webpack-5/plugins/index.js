const webpack = require('webpack'); // 用于访问内置插件

/**
 * 打印webpack
 */

// const compiler = new webpack.Compiler();
// console.log('compiler', compiler);

const ConsoleLogOnBuildWebpackPlugin = require('./ConsoleLogOnBuildWebpackPlugin.js');
// const ModifyOutput = require('./ModifyOutput/index.js');
const CompilerCompilation = require('./CompilerCompilation.js');
const ExamplePlugin = require('./ExamplePlugin.js');
const GzipPlugin = require('./GzipPlugin.js');

const plugins = [];

// plugins.push(new ModifyOutput());
plugins.push(new ConsoleLogOnBuildWebpackPlugin());
plugins.push(new CompilerCompilation());
plugins.push(
  new ExamplePlugin({
    name: 123,
  }),
);

plugins.push(
  new GzipPlugin({
    //设置压缩等级
    level: 9,
  }),
);

module.exports = plugins;
