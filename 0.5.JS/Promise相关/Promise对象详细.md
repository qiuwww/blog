
# Promise对象

## what
Promise是CommonJS的规范之一，拥有resolve、reject、done、fail、then等方法，能够帮助我们控制代码的流程，避免函数的多层嵌套。

如今异步在web开发中越来越重要，对于开发人员来说，这种非线性执行的编程会让开发者觉得难以掌控，而Promise可以让我们更好地掌控代码的执行流程,

jQuery等流行的js库都已经实现了这个对象，ES6也将原生实现Promise。

## why

异步操作，代码更规范，看着更好看

## how

手动模拟实现Promise对象的方法

思路大致是这样的，用2个数组(doneList和failList)**分别存储成功时的回调函数队列和失败时的回调队列**。

- `state`: 当前执行状态，有`pending`、`resolved`、`rejected`3种取值
- `done`: 向`doneList`中添加一个成功回调函数
- `fail`: 向`failList`中添加一个失败回调函数
- `then`: 分别向`doneList`和`failList`中添加回调函数
- `always`: 添加一个无论成功还是失败都会调用的回调函数
- `resolve`: 将状态更改为`resolved`,并触发绑定的所有成功的回调函数
- `reject`: 将状态更改为`rejected`,并触发绑定的所有失败的回调函数
- `when`: 参数是多个异步或者延迟函数，返回值是一个Promise兑现，当所有函数都执行成功的时候执行该对象的`resolve`方法，反之执行该对象的`reject`方法

```
var Promise = function() {
    this.doneList = [];
    this.failList = [];
    this.state = 'pending';
};

Promise.prototype = {
    constructor: 'Promise',
    resolve: function() {
        this.state = 'resolved';
        var list = this.doneList;
        for(var i = 0, len = list.length; i < len; i++) {
            list[0].call(this);
            list.shift();
        }
    },
    reject: function() {
        this.state = 'rejected';
        var list = this.failList;
        for(var i = 0, len = list.length; i < len; i++){
            list[0].call(this);
            list.shift();
        }
    },
    done: function(func) {
        if(typeof func === 'function') {
            this.doneList.push(func);
        }
        return this;
    },
    fail: function(func) {
        if(typeof func === 'function') {
            this.failList.push(func);
        }
        return this;
    },
    then: function(doneFn, failFn) {
        this.done(doneFn).fail(failFn);
        return this;
    },
    always: function(fn) {
        this.done(fn).fail(fn);
        return this;
    }
};

function when() {
    var p = new Promise();
    var success = true;
    var len = arguments.length;
    for(var i = 0; i < len; i++) {
        if(!(arguments[i] instanceof Promise)) {
            return false;
        }
        else {
            arguments[i].always(function() {
                if(this.state != 'resolved'){
                    success = false;
                }
                len--;
                if(len == 0) {
                    success ? p.resolve() : p.reject();
                }
            });
        }
    }
    return p;
}
```



### detail

1、ES2015正式发布（也就是ES6，ES6是它的乳名），其中Promise被列为正式规范。作为ES6中最重要的特性之一，我们有必要掌握并理解透彻。

2、Promise是一个构造函数，自己身上有**all、reject、resolve**这几个眼熟的方法，原型上有then、catch等同样很眼熟的方法。这么说用Promise new出来的对象肯定就有then、catch方法喽，没错。

3、Promise的构造函数接收一个参数，是函数，并且传入两个参数：resolve，reject，分别表示异步操作执行**成功后的回调函数和异步操作执行失败后的回调函数**。

我们用Promise的时候一般是包在一个函数中，在需要的时候去运行这个函数，因为使用Promise实例化会执行。

```
var p = new Promise(function(resolve, reject){
    //做一些异步操作
    setTimeout(function(){
      	console.log('执行完成');
      	resolve('随便什么数据');
    }, 2000);
});
```

4、这就是Promise的作用了，简单来讲，就是能**把原来的回调写法分离出来**，在异步操作执行完后，用**链式调用**的方式执行回调函数。

5、从表面上看，Promise只是能够简化层层回调的写法，

而实质上，**Promise的精髓是“状态”，用维护状态、传递状态的方式来使得回调函数能够及时调用**，它比传递callback函数要简单、灵活的多。

```
runAsync1()

	.then(function(data){

		console.log(data);
		// 1完成就执行2，在异步操作2返回之后继续向后执行
		return runAsync2();
	})

	.then(function(data){

		console.log(data);
		// 2完成之后继续执行3，3的异步操作完成之后，继续向后执行
		return runAsync3();

	})

	.then(function(data){

		console.log(data);

	});
```

这样能**够按顺序**，每隔两秒输出每个异步回调中的内容，在runAsync2中传给resolve的数据，能在接下来的then方法中拿到。

```
function runAsync1(){

	var p = new Promise(function(resolve, reject){

		//做一些异步操作

		setTimeout(function(){

      		console.log('异步任务1执行完成');

      		resolve('随便什么数据1');

		}, 1000);

	});

	return p;
}


function runAsync2(){

	var p = new Promise(function(resolve, reject){

		//做一些异步操作

		setTimeout(function(){

			console.log('异步任务2执行完成');

			resolve('随便什么数据2');

		}, 2000);

	});

	return p;

}

function runAsync3(){

	var p = new Promise(function(resolve, reject){

		//做一些异步操作

		setTimeout(function(){

			console.log('异步任务3执行完成');

			resolve('随便什么数据3');

		}, 2000);

	});

	return p;

}
```

6、**对应于resolve的成功回调，在then中捕捉到，rejected表示错误回调**，这样我们在then中就能捕捉到，然后执行“失败”情况的回调。

**reject的作用就是把Promise的状态置为rejected，这样我们在then中就能捕捉到**，然后执行“失败”情况的回调。

reject被捕获到，如果不抛出错误，程序还会继续执行。



7、还有一个catch方法，它是做什么用的呢？（对then的简单封装）

其实它和then的第二个参数一样，**用来指定reject的回调**，

```
getNumber()

	.then(function(data){

		console.log('resolved');

		console.log(data);

	})

	.catch(function(reason){

		console.log('rejected');

		console.log(reason);

});
```

**效果和写在then的第二个参数里面一样。**

**不过它还有另外一个作用**：在执行resolve的回调（也就是上面then中的第一个参数）时，**如果抛出异常了（代码出错了），那么并不会报错卡死js，而是会进到这个catch方法中。**

8、Promise的all方法提供了**并行执行异步操作**的能力，并且在所有异步操作执行完后才执行回调。

### delay函数

```
const delay = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};

delay(1000).then(_ => {
  console.log('executed');
});
```
