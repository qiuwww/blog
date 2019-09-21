function increaseVerbosity(v, total) {
  console.log("increaseVerbosity", v, total);
  return total + 1;
}

module.exports = program =>
  program
    .usage("[options] <value ...>")
    // 给program添加属性
    .option(
      "-i, --verbose",
      "A value that can be increased",
      increaseVerbosity,
      0
    )
    .option("-f, --float <n>", "A float argument", parseFloat);

// console.log(" float: %j", program.float);
// console.log(" verbosity: %j", program.verbose);
