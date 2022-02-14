console.log('main');
const { log } = require('../utils/utils');
// 全局注入_
log(_.map([1, 2, 3], item => item * 2));

let filename = 'dynamicModule.js';
// 真的可以呀，之前在umi内使用，应该是没有开启这个功能
import('./' + filename)
  .then(module => {
    console.log('dynamicModule', module);
    // 运行模块
    module.default();
  })
  .catch(err => {
    console.error(err.message);
  });
// 测试import()<拷贝> 与 import <引用> 的区别
import('./' + filename).then(({ counter, incCounter }) => {
  console.log(counter); //3
  incCounter();
  console.log(counter); //3
});
