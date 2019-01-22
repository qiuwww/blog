
#js的时间消耗
>摘要: 更少的代码 = 更少的解析/编译(时间) + 更少的传输(时间) + 更少的解压(时间)





## 减少传输时间

开发者需要想办法减少 JavaScript 在网络上的**传输时间**. 我这提供一些参考的方式:

- 通过**代码分割(Code Splitting)**, 只传输用户需要的代码.
- **减少代码体积**(对于 ES5 可以使用 Uglify; 对于 ES2015, 可以使用 babel-minify 或 uglify-es)
- **压缩代码**(可以使用 Brotli ~ q11, Zopfli 或 gzip). Brotli 在压缩比上优于 gzip. 这种方式帮助 CertSimple 网站把脚本体积减少了 17%, 并帮助 LinkedIn 节省了 4% 的脚本加载时间.
- **移除无用的代码.** **可以通过 DevTools 查看代码覆盖率情况**. 对于代码分离, 可以了解 tree-shaking、Closure Compiler等高级优化方式. 对于公共库则可以使用一些代码优化插件, 如针对 lodash 的代码优化插件 lodash-babel-plugin, 可用于像 Moment.js 一类库的优化插件 ContextReplacementPlugin. 此外, 使用 babel-preset-env & browserlist 可以避免编译现代浏览器已经支持的功能. 部分更高级的开发者可能会细心分析 Webpack bundles 来帮助确定不必要的依赖.
- **通过缓存来优化网络传输.** 通过 `max-age` 和 `Etag` 等方式来缓存脚本, 减少字节的传输. Service Worker 缓存技术能使你的应用具备网络弹性, 并且能使用像 V8 code cache 一样的特性. 同时, 也可以了解下通过 文件哈希名 实现长久缓存.

## 解析/编译

在 Chrome DevTools 的性能面板中, JS 的解析和编译是 `Scripting time` 中的黄色部分.

从 Bottom-Up/Call Tree 可以看到更精确的解析/编译时间.

移除页面上的非关键脚本不仅能减少传输时间, 也能减少 CPU 的解析/编译时间和潜在的内存开销, 这可提高页面可交互的速度.



## 执行时间

如果脚本的执行时间超过 50ms, 那么可交互时间的延迟将是脚本下载、编译和执行脚本所花费时间的总和. — Alex Russell

为减少脚本的执行时间, 可以将脚本分成小块来执行, 以避免锁住主线程. 可以考虑是否能减少脚本在执行过程中需要完成的工作量, 如果工作量很多, 就将脚本分成小块来分解工作量, 以提高页面可交互的速度.



## 降低 JavaScript 交付成本的模式

当你尝试着降低 JavaScript 的解析/编译和网络传输时间时, 也可以试试基于路由的代码分割或 PRPL 模式来降低 JavaScript 的交付成本.





## 除上述方式外, JavaScript 还能通过如下方式影响页面性能:

- 内存. 由于 GC(garbage collection), 页面可能会频繁的出现闪现或者卡顿. 当浏览器回收内存时, JS 的执行会被暂停, 所以 JS 被暂停执行的频率和浏览器回收内存的频率是正相关的, 因此需要避免内存泄漏和频繁的内存回收导致的 JS 执行暂停, 保持页面的流畅度.
- 在运行期间, 长时间的脚本执行会阻塞主线程而导致页面没有响应. 将脚本的工作量分成多个小块来执行(使用 `requestAnimationFrame()` 或 `requestIdleCallback()` 进行任务调度)可以最小化响应性问题.







