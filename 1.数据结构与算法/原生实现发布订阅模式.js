


(function (window, undefined) {
    // 执行任务数组
    var taskList = [];
    // 类
    function LazyMan() { };
    // 定义三种行为
    LazyMan.prototype.eat = function (str) {
        subscribe("eat", str);
        return this;
    };
    LazyMan.prototype.sleep = function (num) {
        subscribe("sleep", num);
        return this;
    };
    LazyMan.prototype.sleepFirst = function (num) {
        subscribe("sleepFirst", num);
        return this;
    };
    // 订阅
    function subscribe() {
        // 将前面的行为解析为一个对象参数，便于后边的执行
        var param = {},
            args = Array.prototype.slice.call(arguments);
        if (args.length < 1) {
            throw new Error("subscribe 参数不能为空!");
        }
        param.msg = args[0];
        // slice() 方法返回一个从开始到结束（ 不包括结束）选择的数组的一部分浅拷贝到一个新数组对象。原始数组不会被修改。
        param.args = args.slice(1); // 函数的参数列表
        if (param.msg == "sleepFirst") {
            // 前边加入
            taskList.unshift(param);
        } else {
            // 后边加入
            taskList.push(param);
        }
    }


    // 发布，也就是执行，使用run来执行
    function publish() {
        if (taskList.length > 0) {
            // 从低往高取，先放进去的先执行，队列
            run(taskList.shift());
        }
    }
    // 鸭子叫
    function run(option) {
        // 拿到参数
        var msg = option.msg,
            args = option.args;
        // 针对不同的行为执行不同的函数
        switch (msg) {
            case "lazyMan": lazyMan.apply(null, args); break;
            case "eat": eat.apply(null, args); break;
            case "sleep": sleep.apply(null, args); break;
            case "sleepFirst": sleepFirst.apply(null, args); break;
            default: ;
        }
    }
    // 具体方法，具体函数执行
    function lazyMan(str) { // 这个函数每次都最先被执行
        lazyManLog("Hi!This is " + str + "!");
        publish();
    }
    function eat(str) {
        lazyManLog("Eat " + str + "~");
        publish();
    }
    function sleep(num) {
        setTimeout(function () {
            // 延时执行
            lazyManLog("Wake up after " + num);
            publish();
        }, num * 1000);
    }
    function sleepFirst(num) {
        setTimeout(function () {
            lazyManLog("Wake up after " + num);
            // 当前的任务执行完成之后，使用publish来向后执行
            publish();
        }, num * 1000);
    }

    // 输出文字， 公共方法
    function lazyManLog(str) {
        console.log(str);
    }
    // 暴露接口
    window.LazyMan = function (str) {
        subscribe("lazyMan", str);
        setTimeout(function () {
            // 接口LazyMan里面的publish方法必须使用setTimeout进行调用。
            // 这样能让publish()执行的线程延后，挂起。
            // 等链式方法都执行完毕后，线程空闲下来，再执行该publish()。
            // 执行在new方法之后
            publish();
        }, 0);
        // 第一次会执行new方法，之后，返回一个LazyMan，然后后续的链式调用， 不断的传入行为和描述
        return new LazyMan();
    };
})(window, undefined);

// 调用
LazyMan("Hank") // 生成一个实例，并未订阅layMan方法，这个时候这个对象就有了三个方法
.sleepFirst(5) // 执行这个实力的sleepFirst方法，参数num是5
.eat("supper"); // 执行eat方法，参数是supper


// 关键点就是使用publish来控制依次执行函数；
// 订阅就是添加到函数执行数组中去