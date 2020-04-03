const program = require("commander");
const { globalHelp, execHelp } = require("./help.js");
const pkg = require("../package.json");
const registryOptions = require("./options.js");
const logGenerate = require("./log-generate.js");
program.on("--help", globalHelp);
program.version(pkg.version);
// 需要在version之后，不然就不能注册-v了
registryOptions(program);
program.description("用于生成changelog文件的cli");

// 选择增加log的类型，这里只有一个操作，所以只会有一个命令
program
  .command("logGenerate")
  .alias("a")
  .description("选择增加log的类型")
  .option("-n, --new", "新增功能")
  .option("-f, --feature", "增加特性")
  .option("-o, --optimization", "功能优化")
  .option("-b, --bugFix", "修复bug")
  .action(cmd => {
    logGenerate(cmd);
  });

// 添加命令
program
  .command("setup [env]")
  .description("run setup commands for all envs")
  .option("-s, --setup_mode [mode]", "Which setup mode to use")
  .action(function(env, options) {
    const mode = options.setup_mode || "normal";
    env = env || "all";
    console.log("setup for %s env(s) with %s mode", env, mode);
  });

program
  .command("exec <cmd>")
  .alias("ex")
  .description("execute the given remote cmd")
  .option("-e, --exec_mode <mode>", "Which exec mode to use")
  .action(function(cmd, options) {
    console.log('exec "%s" using %s mode', cmd, options.exec_mode);
  })
  // 这里属于命令的help
  .on("--help", execHelp);

program.command("*").action(function(env) {
  console.log('deploying "%s"', env);
});
// 添加的变量一定要在parse前面
program.parse(process.argv);
