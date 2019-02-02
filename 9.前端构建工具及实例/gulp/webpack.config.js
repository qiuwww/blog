
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const srcDir = path.resolve(process.cwd(), './src');
// 获取多页面的每个入口文件，用于配置中的entry
// 可以的，刚好符合
function getEntry() {
    var jsPath = path.resolve(srcDir, 'js');
    var dirs = fs.readdirSync(jsPath);
    var matchs = [], files = {};
    dirs.forEach(function (item) {
        matchs = item.match(/(.+)\.js$/);
        console.log(matchs);
        if (matchs) {
            files[matchs[1]] = path.resolve(srcDir, 'js', item);
        }
    });
    console.log(JSON.stringify(files));
    return files;
}

module.exports = {
  entry: getEntry(),
  output: {
      path: path.join(__dirname, "dist/js/"),
      filename: "[name].js",
  },
  // 外部引用，不打包进源代码
  externals: {
    "jquery": "jQuery"
  },
  module: {
    loaders: [
      {
        test: /\.ejs$/,
        exclude: /node_modules/,
        loader: 'ejs-compiled'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  devtool: '#source-map'
}

