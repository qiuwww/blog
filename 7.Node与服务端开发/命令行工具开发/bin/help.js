const chalk = require("chalk");

module.exports.globalHelp = () => {
  // 这里是全局的help
  console.log("");
  console.log(chalk.cyan("Examples:"));
  console.log(chalk.white("create 使用："));
  console.log(
    chalk.yellow("使用 name 名新建模版项目（list 选择）："),
    chalk.magenta("    $ ecli create name")
  );
  console.log(
    chalk.yellow("使用 name 名新建默认模版项目         ："),
    chalk.magenta("    $ ecli create name -d")
  );
  console.log(
    chalk.yellow("使用 name 名新建page页面（list 选择）："),
    chalk.magenta("    $ ecli create name -p")
  );
  console.log(
    chalk.yellow("使用 name 名新建默认page页面         ："),
    chalk.magenta("    $ ecli create name -p -d")
  );
  console.log(chalk.white("add 使用："));
  console.log(
    chalk.yellow("增加页面模版："),
    chalk.magenta("    $ ecli add -p")
  );
  console.log(
    chalk.yellow("增加项目模版："),
    chalk.magenta("    $ ecli add -i")
  );
  console.log(chalk.white("list 使用："));
  console.log(
    chalk.yellow("显示页面模版列表："),
    chalk.magenta("    $ ecli list -p")
  );
  console.log(
    chalk.yellow("显示项目模版列表："),
    chalk.magenta("    $ ecli list -i")
  );
  console.log("");
};

module.exports.execHelp = () => {
  console.log("");
  console.log("Examples:");
  console.log("");
  console.log("  $ deploy exec sequential");
  console.log("  $ deploy exec async");
};
