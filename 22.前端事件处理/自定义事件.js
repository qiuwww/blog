//2017校招-网易内推笔试：简答题

var Event = {
    on: function(eventName, callback){
        //todo
        if(!this[eventName])//如果参数不存在，就实例一个eventName数组，并且添加callback
            this[eventName] = [];
            this[eventName].push(callback);
        }
    },
    emit: function(eventName){//发出; 发射; 颁布; 发表;
        //todo
        var self = this,//保存Event对象的信息传递给下面的函数调用
        param = arguments.length > 1 ? Array.prototype.slice.call(arguments, 1) : [];//实参数组
            if(this[eventName]){//如果传入了参数，执行如下，这里应该是函数柯里化
                Array.prototype.forEach.call(this[eventName], function(func){
                    func.apply(self, param);
                });
            }
    }
}

Event.on("one", function(){
    console.log("go");
});
Event.on("one", function(){
    console.log("gogo");
});

Event.emit("one");
/**
* 从一个对象复制所有的属性到另一个对象是一个常见的操作。
* Object.assign(target, ...sources)；
* Return value：The target object.
* var obj = { a: 1 };
* var copy = Object.assign({}, obj);
* console.log(copy); // { a: 1 }
* Warning for Deep Clone* 
*/

var person1 = Object.assign({}, Event);
var person2 = Object.assign({}, Event);

person1.on("666", function(){
    console.log("person1 666");
});
person2.on("777", function(){
    console.log("person2 777");
});

person1.emit("666");
person1.emit("777");
person2.emit("777");
person2.emit("666");