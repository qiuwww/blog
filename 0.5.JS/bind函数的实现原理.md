

Function.prototype.bind = function (context) {  
    // 调用Array的方法来切割伪数组对象arguments  
    // 由此获此bing()方法传进来的第二个及以后的参数  
    var args = Array.prototype.slice.call(arguments, 1);  
    return function () {  
        return this.apply(context, args.concat(Array.prototype.slice.call(arguments)));  
    };  
};  