
## 自定义指令

## 混入

## 插件

```
插件util.jsexport default{
  install(Vue,options)
  {
    Vue.prototype.getData = function () {
      console.log('我是插件中的方法');
    }
  }
}

main.js 

引入 并且全局注册import util from './util'
Vue.use(util);


其他组件中使用this.getData();

```


## 设置全局变量或者方法

全局函数放filters里, 用的时候Vue.filter('filtername')

全局变量放到单独文件，export出去，用的时候import就

写个插件，给Vue.prototype挂上常量，比如Vue.prototype.Const = 你的那坨常量，甚至再来个Vue.prototype.utils。