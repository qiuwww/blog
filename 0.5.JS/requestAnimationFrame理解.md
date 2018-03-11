# requestAnimationFrame理解

**window.requestAnimationFrame()** 方法告诉浏览器您希望执行动画并请求浏览器在下一次重绘之前调用指定的函数来更新动画。该方法使用一个回调函数作为参数，这个回调函数会在**浏览器重绘之前调用**。

> ```
> window.requestAnimationFrame(callback);
> ```

**callback**

一个指定函数的参数，**该函数在下次重新绘制动画时调用**。这个回调函数只有一个传参，DOMHighResTimeStamp，指示requestAnimationFrame() 开始触发回调函数的当前时间（performance.now() 返回的时间）。

**return**

一个 long 整数，请求 ID ，是回调列表中唯一的标识。是个非零值，没别的意义。**你可以传这个值给 window.cancelAnimationFrame() 以取消回调函数**。

