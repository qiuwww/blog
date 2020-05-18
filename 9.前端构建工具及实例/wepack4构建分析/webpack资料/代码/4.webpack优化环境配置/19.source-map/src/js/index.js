// 引入
import print from './print';
import '../css/iconfont.css';
import '../css/index.less';

console.log('index.js文件被加载了~');

print();

function add(x, y) {
  return x + y;
}

console.log(add(1, 3));

if (module.hot) {
  // 一旦 module.hot 为true，说明开启了HMR功能。 --> 让HMR功能代码生效
  module.hot.accept('./print.js', function() {
    // 方法会监听 print.js 文件的变化，一旦发生变化，其他模块不会重新打包构建。
    // 会执行后面的回调函数
    print();
  });
}
