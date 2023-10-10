const { getOptions } = require('loader-utils');

module.exports = function loader(source) {
  const options = getOptions(this);
  // 获取options参数
  // console.log('\n\n##################modify-loader：', source, options);

  if (this.resourcePath.endsWith('ast.js')) {
    console.log('source path: ', this.resourcePath);

    // return `export default ${JSON.stringify(source)} \n console.log("loader-modify add")`;

    // !这里也可以进行ast分析，然后修改代码
    // !这里的修改只会被执行一次
    // source = source.replace(/\[name\]/g, options.name);

    return `${source} \n console.log("loader-modify add")`;
  }

  // 在目标文件后边追加内容
  // return `export default ${JSON.stringify(source)}`;

  return source;
};
