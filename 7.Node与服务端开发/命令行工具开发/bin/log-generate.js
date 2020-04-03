const { prompt } = require("inquirer");
const chalk = require("chalk");
const fs = require("fs");
const path = require("path");
const moment = require("moment");
const semver = require("semver");
const isMac = process.platform === "darwin";
const pkgUti = require("../scripts/pkg-util.js");
const platformKey = isMac ? "mac_version" : "windows_version";
// 这里的内容顺序执行
const inputLogList = function(cmd) {
  const optionsArr = cmd.options.map(item => ({
    name: item.description,
    value: item.description
  }));
  return [
    {
      type: "rawlist",
      message: "你要新增log类型:",
      name: "logType",
      // when: function() {
      //   return !cmd.page && !cmd.item;
      // },
      choices: optionsArr
    },
    {
      type: "input",
      message: "请输入增加的log内容:",
      name: "content"
      // when: function(answers) {
      //   return answers.template === "   页面模版" || cmd.page;
      // },
      // validate(val) {
      //   const reg = /^[a-zA-Z][a-zA-Z0-9]{0,15}$/;
      //   if (reg.test(val) === false) {
      //     return "\n ❌ 页面模版名称仅允许为：大小写字母和数字组合,且在 15 个以内";
      //   }
      //   return true;
      // }
    },
    {
      type: "confirm",
      message: "是否添加更多的log信息:",
      name: "addMore"
    }

    // {
    //   type: "input",
    //   message: "请输入项目模版名称:",
    //   name: "proName",
    //   when: function(answers) {
    //     return answers.template === "   项目模版" || cmd.item;
    //   },
    //   validate(val) {
    //     const reg = /^[a-zA-Z][a-zA-Z0-9]{0,15}$/;
    //     if (reg.test(val) === false) {
    //       return "\n ❌ 项目模版名称仅允许为：大小写字母和数字组合,且在 15 个以内";
    //     }
    //     return true;
    //   }
    // },
    // {
    //   type: "input",
    //   message: "请输入项目模版 git 地址:",
    //   name: "giturl",
    //   validate(val) {
    //     if (val === "") {
    //       return "\n ❌ 请输入 git 地址";
    //     }
    //     return true;
    //   }
    // }
  ];
};
// 这里调用这个就会重新打开对话输入框
const inputLogDetail = async (cmd, changelog) => {
  const { addMore, content, logType } = await prompt(inputLogList(cmd));
  const changelogItem = `${logType}: ${content}`;
  changelog.push(changelogItem);
  console.log("---------------------------------------");
  if (addMore) {
    return await inputLogDetail(cmd, changelog);
  } else {
    // 为false结束操作
    return changelog;
  }
};

// 这里给出选项，如果不能找到就自己输入
const selectVersion = function(cmd) {
  const currentVersion = pkgUti.get(platformKey);
  const c2 = semver.inc(currentVersion, "patch");
  return [
    {
      type: "list",
      message: `设置版本为:`,
      name: "version",
      choices: [c2, currentVersion]
    }
  ];
};
const getVersion = async cmd => {
  return await prompt(selectVersion(cmd));
};

// 处理日期的问题
const selectDate = function(cmd) {
  const now = moment().format("YYYY年MM月DD");
  const tomorrow = moment()
    .add(1, "day")
    .format("YYYY年MM月DD");
  const yesterday = moment()
    .subtract(1, "day")
    .format("YYYY年MM月DD");
  return [
    {
      type: "list",
      message: `请选择发布日期:`,
      name: "releaseDate",
      choices: [now, tomorrow, yesterday]
    }
  ];
};
const getDate = async cmd => {
  return await prompt(selectDate(cmd));
};

// 确认添加

// 处理日期的问题
const saveConfirm = async (cmd, pathname, content, item) => {
  return await prompt({
    type: "confirm",
    message: () => {
      console.log(chalk.cyan("是否按如下格式创建:\n"));
      console.log(chalk.yellow("保存路径: "));
      console.log(chalk.green(`${pathname}\n`));
      console.log(chalk.yellow("保存内容: "));
      console.log(chalk.green(`${content}\n`));
      console.log(chalk.yellow(`package.json的 ${platformKey} 修改为:`));
      console.log(chalk.green(`${item.version}\n`));
      return;
    },
    name: "isEnsure"
  });
};

module.exports = async cmd => {
  let changelog = [];
  const version = await getVersion(cmd);
  console.log("\n");
  changelog = await inputLogDetail(cmd, changelog);
  console.log("\n");
  const releaseDate = await getDate(cmd);
  console.log("\n");
  const platform = isMac ? "mac" : "windows";
  const item = {
    changelog,
    ...version,
    ...releaseDate,
    platform
  };
  // 这里是对数据的操作
  const pathname = path.resolve(
    __dirname,
    "../changelog",
    `${item.version}.${platform}.json`
  );
  const content = JSON.stringify(item, null, 2);
  // 确认创建信息
  const isEnsure = await saveConfirm(cmd, pathname, content, item);
  if (isEnsure.isEnsure) {
    fs.writeFileSync(pathname, JSON.stringify(item, null, 2));
    console.log(chalk.green("\n ✅ changelog创建成功"));
    pkgUti.save({
      [platformKey]: item.version
    });
    console.log(
      chalk.green(`\n ✅ package.json的 ${platformKey} 已修改为${item.version}`)
    );
  }
  // 这里来生成目标文件
  process.exit();
  // 得到的结果保存在program上
  // return true;
  // if (template === "   项目模版" || cmd.item) {
  //   key = "proTpl";
  //   key2 = proName;
  // }
  // process.exit();
  // if (config[key][key2]) {
  //   console.log(chalk.red("\n ❌ 该模版名已存在"));
  //   return;
  // }
  // config[key][key2] = giturl;

  // fs.writeFile(
  //   __dirname + "/templates.json",
  //   JSON.stringify(config, null, 4),
  //   err => {
  //     if (err) {
  //       console.log(chalk.red(`\n ❌ 模版保存失败了: ${err}`));
  //       process.exit();
  //     } else {
  //       console.log(chalk.white(`\n 👌 模版已保存！`));
  //       process.exit();
  //     }
  //   }
  // );
  // });
};
