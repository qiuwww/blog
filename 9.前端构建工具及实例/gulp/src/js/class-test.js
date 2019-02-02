// class-test.js


// 测试import与moudle
import {
  log
} from './common/common.js'


log('test', '123');

class dog {
  constructor(name) {
    this.name = name;
    return this;
  }
  ddd() {
    console.log(this.name);
  }
}

new dog('hhhh').ddd();
