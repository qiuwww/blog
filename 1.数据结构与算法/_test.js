class MyPromise {
  // 创建MyPromise实例需要传入的参数fn
  // fn = (resolve, reject) => {}
  constructor(fn) {
    // 定义Promise 三种状态
    this.states = {
      PENDING: 'PENDING',
      RESOLVED: 'RESOLVED',
      REJECTED: 'REJECTED',
    };
    // 执行过程中，定义传递到then的value
    this.value = null;
    // 定义当前Promise运行状态，初始化为pending
    this.state = this.states.PENDING;
    // 定义Promise失败状态的回调函数集合

    this.resolvedCallBacks = [];
    // 定义Promise成功状态的回调函数集合
    this.rejectedCallBacks = [];
    // 为静态方法定义其内部使用的指向实例的that
    MyPromise.that = this;
    // new 方法调用的时候，会走到constructor，这个时候会调用fn函数
    // 也就是向实例传递了resolve和reject方法
    try {
      // 执行 new MyPromise() 内传入的方法
      fn(MyPromise.resolve, MyPromise.reject);
    } catch (error) {
      // 出错就直接reject
      MyPromise.reject(this.value);
    }
  }
  // 静态resolve方法，MyPromise实例不可访问（但是前面通过contructor传入）；
  // 支持类MyPromise访问，例：MyPromise.resolve('success').then(e=>e)
  static resolve(value) {
    // 由于静态方法内部的this指向 类 而不是 实例，所以用下面的方法访问实例对象
    // that指向当前的类的实例，如constructor中的this
    const that = MyPromise.that;
    // 判断是否是MyPromise实例访问resolve
    const f = that instanceof MyPromise;
    // MyPromise实例对象访问resolve
    if (f && that.state == that.states.PENDING) {
      that.state = that.states.RESOLVED;
      that.value = value;
      // resolve的时候执行所有resolvedCallBacks注册的事件，中间状态保存在value中，可以继续传递
      that.resolvedCallBacks.map((cb) => (that.value = cb(that.value)));
    }
    // MyPromise类访问resolve，这个时候还是要创建一个类
    if (!f) {
      const obj = new MyPromise();
      return Object.assign(obj, {
        state: obj.states.RESOLVED,
        value,
      });
    }
  }
  // reject与resolve基本一致
  // 静态reject方法，MyPromise实例不可访问；
  //支持类MyPromise访问，例：MyPromise.reject('fail').then(e=>e)
  static reject(value) {
    const that = MyPromise.that;
    const f = that instanceof MyPromise;
    if (f && that.state == that.states.PENDING) {
      that.state = that.states.REJECTED;
      that.value = value;
      // 这里如果出错，错误得到处理还是会向后执行rejectedCallBacks的回调的
      that.rejectedCallBacks.map((cb) => (that.value = cb(that.value)));
    }
    if (!f) {
      const obj = new MyPromise();
      return Object.assign(obj, {
        state: obj.states.REJECTED,
        value,
      });
    }
  }
  // 事件注册方法，复合方法，同时注册resolve事件和reject事件
  // 定义在MyPromise原型上的then方法
  then(onFulfilled, onRejected) {
    const { PENDING, RESOLVED, REJECTED } = this.states;
    const f = typeof onFulfilled == 'function' ? onFulfilled : (c) => c;
    const r =
      typeof onRejected == 'function'
        ? onRejected
        : (c) => {
            throw c;
          };
    // 三种情形
    switch (this.state) {
      case PENDING:
        // ‘PENDING’状态下向回调函数集合添加callback
        this.resolvedCallBacks.push(f);
        this.rejectedCallBacks.push(r);
        break;
      case RESOLVED:
        // 将回调函数的返回值赋值给 实例的 value，满足链式调用then方法时传递value
        this.value = f(this.value);
        break;
      case REJECTED:
        // 同上
        this.value = r(this.value);
        break;
      default:
        break;
    }
    // 满足链式调用then，返回MyPromise实例对象
    return this;
  }
}

// 先then注册，后resolve直接触发
console.log(1);
var p1 = MyPromise.resolve('success')
  .then((e) => {
    console.log('MyPromise.resolve 1:', e);
    return e + 1;
  })
  .then((res) => {
    console.log('MyPromise.resolve 2:', res);
  });
console.log(2);
