# 浏览器页面加载

1. 用户输入地址;
2. 地址解析；
3. 浏览器根据uri来加载HTML/CSS/JS，图片等资源；
4. 浏览器将代码解析，构建cssom树，构建dom树，页面呈现；
5. html交互操作等；

**js->style->layout->paint->composite**

### 像素渲染流水线

- 下载HTML文档
- 解析HTML文档，生成DOM
- 下载文档中引用的CSS、JS
- 解析CSS样式表，生成CSSOM
- **将JS代码交给JS引擎执行**
- 合并DOM和CSSOM，生成Render Tree
- 根据Render Tree进行布局layout（为每个元素计算尺寸和位置信息）
- 绘制（Paint）每个层中的元素（绘制每个瓦片，瓦片这个词与GIS中的瓦片含义相同）
- **执行图层合并（Composite Layers）**

**使用Chrome的DevTools – Timing，可以很容易的获取一个页面的渲染情况，比如在Event Log页签上，我们可以看到每个阶段的耗时细节。**

**Devtools中有一个选项：Rendering - Layers Borders，打开这个选项之后，你可以看到每个层，每个瓦片的边界。浏览器可能会启动多个线程来绘制不同的层/瓦片。**

### 针对浏览器的解析的优化

1. 分割css
   CSS规则越复杂，在构建Render Tree时，浏览器花费的时间越长。CSS规则有自己的优先级，不同的写法对效率也会有影响，特别是当规则很多的时候。不要多层嵌套，减少嵌套层级。

2. 针对图形的GPU加速执行

3. 异步JAvaScript

   > 因此浏览器会等等待JS引擎的执行，执行结束之后，再恢复DOM的构建。但是并不是所有的JavaScript都会设计DOM操作，比如审计信息，WebWorker等，对于这些脚本，我们可以显式地指定该脚本是不阻塞DOM渲染的。
   >
   > > <script src="worker.js" async></script>

4. 除了上边的两种之外，有一些特别的属性可以在不同的层中单独绘制，然后再合并图层。对这种属性的访问（如果正确使用了CSS）不会触发Layout - Paint，
   而是直接进行Compsite Layers:  transform, opacity
