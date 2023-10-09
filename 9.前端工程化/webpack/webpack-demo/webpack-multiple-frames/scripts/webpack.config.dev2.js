devServer: {
  contentBase: path.resolve(__dirname, 'dist'),
  open:true,
  port:8888,             // 第三部分会使用 portfinder 自动获取可用端口号            
  hot:true,
  hotOnly:true,
},


const base = require('./webpack.base.js');
const merge = require('webpack-merge');


const devConfig = merge(base, {