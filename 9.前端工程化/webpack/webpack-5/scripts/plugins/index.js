const webpack = require('webpack'); // 用于访问内置插件

const CompilerCompilation = require('./CompilerCompilation.js');
const ModifyAssets = require('./ModifyAssets.js');

const plugins = [];

plugins.push(new CompilerCompilation());
plugins.push(new ModifyAssets({}));

module.exports = plugins;
