#! /usr/bin/env node
// 在代码的开头第一行，必须指定我们的脚本执行所需要的解释程序。在这里，我们使用node来作为脚本的解释程序。而我们#! /usr/bin/env node这样写，目的是使用env来找到node，并使用node来作为程序的解释程序。
// 这里每次都会顺序执行一次
"use strict";
const chalk = require("chalk");
const semver = require("semver");
// 测试semver的使用
// semver.valid(semver.coerce('42.6.7.9.3-alpha')) // '42.6.7'
// semver.gt('1.2.3', '9.8.7') // false
// semver.lt('1.2.3', '9.8.7') // true
// semver.clean('  =v1.2.3   ') // 1.2.3

const currentNodeVersion = process.versions.node;
const requireVersion = semver.clean("v10.0.0");
const versionDetail = semver.coerce(currentNodeVersion);
// console.log("当前node的执行信息", versionDetail);

if (semver.gt(requireVersion, semver.clean(currentNodeVersion))) {
  console.error(
    chalk.red(
      `当前现在运行的 node 版本是${currentNodeVersion}。\n我们要求 node 版本在 ${requireVersion} 以上。\n请升级版本后重试`
    )
  );
  process.exit(1);
}
require("./bin/index.js");
