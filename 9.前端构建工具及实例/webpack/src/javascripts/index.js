// 文件引用 requier 按照文件引用的顺序打包  文件依赖
// require('./style.less')
require('../styles/normalize') //通用的ressa
require('../styles/index.less')
// utils ? 没有相对路径  回想@  => 别名
const format = require('utils/format')
const {
  log
} = require('../utils/utils')

log('hello world')
log(format('hello webpack'))
