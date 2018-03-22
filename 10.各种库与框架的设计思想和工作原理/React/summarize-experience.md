


## 一定不要把js原生方法用在mobx的可观察对象上，这样会导致不会报错，也不会达到想要的效果

```
this.observableObj = Object.assign(mobx.toJS(this.observableObj), changeObj);
```

## autorun的使用
1. 调用函数需要是一个纯函数；

```
class Store {
  @observable count = 0;
  @action add () {
    this.count = this.count + 1;
  }
};

const mstore = new Store();

setInterval(() => {
 mstore.add();
}, 2000);

autorun(() => {
  console.log(mstore.count);
});
// 或者在构造函数内部使用

constructor() {
    setInterval(() => {
        this.a += 5;
    }. 2000);
    autorun(() => {
        console.log(this.aToJS);
    });
}


@observable a = 1;
@computed get 
aToJS() {
    return mobx.toJS(this.a);
}

```