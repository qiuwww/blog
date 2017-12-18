// events-test.js
// on 函数用于绑定事件函数，emit 属性用于触发一个事件。
// 自定义事件


//event.js 文件
// var EventEmitter = require('events').EventEmitter; 
// var event = new EventEmitter(); 
// event.on('some_event', function() { 
//     console.log('some_event 事件触发'); 
// }); 
// setTimeout(function() { 
//     event.emit('some_event'); 
// }, 1000); 

// 其原理是 event 对象注册了事件 some_event 的一个监听器，
// 然后我们通过 setTimeout 在 1000 毫秒以后向 event 对象发送事件 some_event，
// 此时会调用some_event 的监听器。



//event.js 文件
// var events = require('events'); 
// var emitter = new events.EventEmitter(); 
// emitter.on('someEvent', function(arg1, arg2) { 
//     console.log('listener1', arg1, arg2); 
// }); 
// emitter.on('someEvent', function(arg1, arg2) { 
//     console.log('listener2', arg1, arg2); 
// }); 
// emitter.emit('someEvent', 'arg1 参数', 'arg2 参数'); 

// emitter 为事件 someEvent 注册了两个事件监听器，然后触发了 someEvent 事件。


var events = require('events');
var eventEmitter = new events.EventEmitter();

// 监听器 #1
var listener1 = function listener1() {
   console.log('监听器 listener1 执行。');
}

// 监听器 #2
var listener2 = function listener2() {
   console.log('监听器 listener2 执行。');
}

// 绑定 connection 事件，处理函数为 listener1 
eventEmitter.addListener('connection', listener1);

// 绑定 connection 事件，处理函数为 listener2
eventEmitter.on('connection', listener2);

var eventListeners = require('events').EventEmitter.listenerCount(eventEmitter,'connection');
console.log(eventListeners + " 个监听器监听连接事件。");

// 处理 connection 事件 
eventEmitter.emit('connection');

// 移除监绑定的 listener1 函数
eventEmitter.removeListener('connection', listener1);
console.log("listener1 不再受监听。");

// 触发连接事件
eventEmitter.emit('connection');

eventListeners = require('events').EventEmitter.listenerCount(eventEmitter,'connection');
console.log(eventListeners + " 个监听器监听连接事件。");

console.log("程序执行完毕。");



// weight表示质量的数组
// value对应的质量
// size表示总的质量
function packageMaxValue(weight, value, size){
    // 省略参数合法性校验
    let bagMatrix = []
    for(let w = 0; w <= size; w++) {// w表示weight，添加的质量逐渐增加
        // js不能直接创建二维数组，所以在此初始化数组
        bagMatrix[w] = []
        for (let j = 0; j < 5; j++) {// 价值，随着质量的增加逐渐获取当前的最大值
            // 背包的容量为0，那么一个东西也装不下，此时的值肯定也是为0
            if(w === 0) {// 如果质量为0，什么也装不下，返回0
                bagMatrix[w][j] = 0
                continue
            }
            // 背包的容量小于物品j的重量，那么就没有上述情况a了
            if(w < weight[j]){ // 判断j物品的质量与剩余的质量对比
                bagMatrix[w][j] = bagMatrix[w][j-1] || 0
                continue
            }            
            bagMatrix[w][j] = Math.max((bagMatrix[w-weight[j]][j-1] || 0) + value[j], bagMatrix[w][j-1] || 0)
            console.log("物品总质量%s,%s号物品：bagMatrix[w][j]", w, j, bagMatrix[w][j])
        }
        console.log("---------------------------------------")
    }
    return bagMatrix
}
    
let weight = [4, 5, 6, 2, 2]
let value = [6, 4, 5, 3, 6]
 
console.log(packageMaxValue(weight, value, 10))