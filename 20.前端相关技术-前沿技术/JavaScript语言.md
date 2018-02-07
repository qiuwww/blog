


# JavaScript语言发展

> **Javascript ，也叫Ecma script,  是用了 10 天时间赶出来的。**

## js语言缺陷

- 解释性语言
- 无强制类型
- ...

## 发展史

**JS 领域的发展史，都可以说是填坑史。**

### 解释性语言特点就是太慢

虽然你是解释型语言，但是我可以偷偷的编译你，在程序运行前的一刹那编译即将运行的代码。

**JIT**
于是 Google 在 2009 年在 V8 中引入了 **JIT 技术 (Just in time compiling 江湖人称即时编译)**。 有了这个buff, Javascript 瞬间提升了 20 － 40 倍的速度。直接导致一大波大型网页应用的出现。从此 Javascript 一骑绝尘。
JIT 基于运行期分析编译，**而 Javascript 是一个没有类型的语言，于是， 大部分时间，JIT 编译器其实是在猜测 Javascript 中的类型。**所以最好依照原来的编译规则来写函数。

**把用的类型都标注出来的处理思路**

1. 一种是 Typescript,  Dart, JSX 为代表的，基本思想是， 我搞个其他的语言，这个语言是强类型的，所以程序猿们需要指定类型，然后我把它编译成 Javacript 不就行了嘛。
2. 另一种是火狐的  **Asm.js** 为代表的， 做一个 javascript 子集， 同时试图利用标注的方法，加上变量类型。**Web Assembly 就是这种方式。**
   Web Assembly 比 asm.js 要激进很多。 Web Assembly 连标注 Js 这种事情都懒得做了，不是要 AOT 吗？ 我直接给字节码好不好？（后来改成 AST 树）。**对于不支持 Web Assembly 的浏览器， 会有一段 Javascript 把 Web Assembly 重新翻译为 Javascript 运行， 这个技术叫 polyfill**, HTML5 刚出来的时候很常用的一个技术。

**WebAssembly的好处**

1. 大幅度提高 Javascript 的性能，希望能把性能这个坑填完，同时也不损失安全性。Webapp 和 原生 App 的性能差距变得很小。
2. 基本之前需要插件来提高速度这种技术已经没有必要了， 网页应用的移植性会变得更好。
3. WebAssembly 其实允许任何语言编译到它制定的AST tree， 这样子，各位就可以开开脑洞了， 因为，你可以用C/C++写网页了。。



