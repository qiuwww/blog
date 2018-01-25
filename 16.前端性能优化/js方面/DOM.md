# DOM.md

## 总的来说，有三个主要因素会导致 DOM 性能不佳。

一是使用脚本进行了大量的 DOM 操作，比如通过收到的数据创建一棵树。

二是脚本触发了太多重排或者重绘。

三是脚本使用了低性能的方法来定位 DOM 树中的节点。

第二点和第三点非常普遍，也非常重要，所以首先解决它们。

## 重绘和重排

有东西从不可见变为可见，或者反之，`但没有改变文档布局`，就会触发`重绘`。

比如为某个元素添加轮廓线，改变背景色或者改变 visibility 样式等。

`重绘很耗性能`，**因为它需要引擎搜索所有元素来决定什么是可见的，什么应该显示出来**。

**重排带来更大的变化。**

如果对 DOM 树进行了操作，或者某个样式改变了`布局`，比如元素的 className 属性改变时，

或者`浏览器窗口大小改变的时候`。引擎必须对相关元素进行重排，以确定现在各个部分应该显示在哪里。

`子元素也会因父元素的变化重排`。显示某个被重排的元素之后的元素也需要重新计算新的布局，

与最开始的布局不同。`由于子孙元素大小的改变，祖先元素也需要重排以适应新的大小`。

最后还需要对所有元素进行重绘。

`重排特别消耗性能，它是造成 DOM 脚本缓慢的主要原因之一`，这对处理器性能不高的设备，比如电话，尤其显著。

多数情况下它相当于重新布局整个页面。

## 将重排数量降到最低

很多时候脚本都需要做一些引起重绘或者重排的事情。`动画就是基于重排的`，而大家仍然希望看到它。

因此在 Web 开发中，重排不可避免，要保证脚本跑得飞快，**就必须在保证相同整体效果的前提下将重排保持在最低限度**。

`浏览器可以选择在脚本线程完成后进行重排，显示变化`。

Opera 会等到发生了足够多的变化，经过了一定的时间，或者脚本线程结束。

也就是说，如果在同一个线程中发生的变化足够快，它们就只会触发一次重排。

然而，考虑到 Opera 运行在不同速度的设备上，这种现象并不保证一定会发生。

`注意某些元素在重排时显示慢于其它元素。比如重排一个 table 需要 3 倍于等效块元素显示的时间。`

## 最小重排

一般的重排会影响到整文档。文档中需要重排的东西越多，重排花的时间就越长。

`绝对(absolute)定位和固定(fixed)定位的元素不会影响主文档的布局，所以对它们的重排不会引起其它部分的连锁反应。`

文档中在它们之后的内容可能需要重绘来呈现变化，但这也远比一个完整的重排好得多。

因此，`动画不需要应用于整个文档，它最好只应用在一个固定位置的元素上`。

大多数动画都只需要考虑这个问题。

## 修改文档树

`修改文件树 会 导致重排。`

在 DOM 中添加新的元素、改变文本节点的值、或者修改各种属性，都足以引起重排。

`多次连续地改变可能导致多次重排`。

因此，总的来说，`最好在一段未显示出来的 DOM 树片段上进行多次改变，然后用一个单一的操作把改变应用在文档的 DOM 中。`
```
var docFragm = document.createDocumentFragment();
var elem, contents;for(var i = 0; i < textlist.length; i++) {
  elem = document.createElement('p');
  contents = document.createTextNode(textlist[i]);
  elem.appendChild(contents);
  docFragm.appendChild(elem);
}
document.body.appendChild(docFragm);
```
**修改文档树也可以通过克隆一个元素实现，在修改完成之后将之替换掉文档树中的某个元素，这样只会导致一次重排。**

注意，`如果元素中包含任何形式的控制，就不要使用这个方法`，因为如果用户修改了它们的值不会反映在主要的 DOM 树上。

如果你需要依赖附加在这个元素或其子元素上的`事件处理函数`，那么也不要使用这个方法，因为这些附着关系不会被克隆。
```
var original = document.getElementById('container');
var cloned = original.cloneNode(true);
cloned.setAttribute('width', '50%');
var elem, contents;for(var i = 0; i < textlist.length; i++) {
  elem = document.createElement('p');
  contents = document.createTextNode(textlist[i]);
  elem.appendChild(contents);
  cloned.appendChild(elem);
}
original.parentNode.replaceChild(cloned, original);
```
## 修改不可见的元素

**如果某个元素的 display 样式设置为 none，就不会对其进行重绘，哪怕它的内容发生改变。**

这都是因为它不可见，这是一种优势。

**如果需要对某个元素或者它的子元素进行改变，而且这些改变又不能合并在一个单独的重绘中，那就可以先设置这个元素的样式为 display:none，然后改变它，再把它设置为普通的显示状态。**

不过这会造成两次额外的重排，
一次是在隐藏元素的时候，另一次是它再次显示出来的时候，不过整体效果会快很多。
这样做也可能意外导致滚动条跳跃。不过把这种方式应用于固定位置的元素就不会导致难看的效果。
```
用于需要样式很多的改变的时候：
var posElem = document.getElementById('animation');
posElem.style.display = 'none';
posElem.appendChild(newNodes);
posElem.style.width = '10em';
// Other changes…
posElem.style.display = 'block';
```

## 测量

如前所述，`浏览器会缓存一些变化，然后在这些变化都完成之后只进行一次重排。`

不过，`测量元素会导致其强制重排`。这种变化可能会，也可能不会引起明显地重绘，但重排仍然会在幕后发生。

这种影响发生在使用像 offsetWidth 这样的属性，或者 getComputedStyle 这样的方法进行测量的时候。

即使不使用这些数字，只要使用了它们，浏览器仍然会缓存改变，这足以触发隐藏的重排。

如果这些测量需要重复进行，你就得考虑只测量一次，然后将结果保存起来以备后用。
```
var posElem = document.getElementById('animation');
var calcWidth = posElem.offsetWidth;
posElem.style.fontSize = (calcWidth / 10) + 'px';
posElem.firstChild.style.marginLeft = (calcWidth / 20) + 'px';
posElem.style.left = ((-1 * calcWidth) / 2) + 'px';
// Other changes…
``
## 一次改变多项样式

就像改变 DOM 树一样，也可以`同时进行几项相关样式的改变，以尽可能减少重绘或重排次数`。

常见的方法是一次设置一个样式：
```
var toChange = document.getElementById('mainelement');
toChange.style.background = '#333';
toChange.style.color = '#fff';
toChange.style.border = '1px solid #00f';
```
那种方式会造成多次重排或重绘。主要有两种方法可以做得更好。

`如果元素本身需要应用的几个样式，而它们的值都是已知的，那就可以修改元素的 class，`

并在这个 class 中定义所有新样式：
```
div {
  background: #ddd;
  color: #000;
  border: 1px solid #000;}
div.highlight {
  background: #333;
  color: #fff;
  border: 1px solid #00f;}
…
document.getElementById('mainelement').className = 'highlight';
```
第二种方法是对为元素定义一个新的样式属性，而不是一个个地指定样式。

多数情况下这适用于像动画这样的动态变化，新的样式预先并不知道。

这通过 style 对象的 cssText 属性实现，或者通过 setAttribute 实现。
Internet Explorer 不支持第二种方式，所以只能使用第一种。一些旧的浏览器，包括 Opera 8，要使用第二种方式，不能使用第一种。

因此，简单的办法是检查是否支持第一种方式，如果支持，使用它，否则使用第二种。
```
var posElem = document.getElementById('animation');
var newStyle = 'background: ' + newBack + ';' +  'color: ' + newColor + ';' +  'border: ' + newBorder + ';';

if(typeof(posElem.style.cssText) != 'undefined') {
  posElem.style.cssText = newStyle;
} else {
  posElem.setAttribute('style', newStyle);
}
```
## 平滑度换速度

开发者总是希望通过使用更小的间隔时间和更小的变化，让动画尽可能平滑。比如，使用 10ms 的时间间隔，每次移动 1 个像素实现移动动画。

快速运行的动画在某些 PC 或某些浏览器中会运行良好。但是，10ms 几乎已经是浏览器能在不 100% 占用大多数台式机 CPU 的情况能实现的最小时间间隔。

有一些浏览器实现不了 —— 对于多数浏览器来说，每秒进行 100 次重排实在太多了。低功耗计算机或低功耗设备上的浏览器无法以这样的速度执行，动画会给人以缓慢和卡顿的感觉。

有必要使用违背一下开发者的意愿，使用动画的平滑度来换取速度。将时间间隔改变为 50ms，动画每次移动 5 个像素，这样需要的处理能力更少，也会让动画在低功耗处理器上运行起来快得多。

## 避免检索大量节点,缓存节点，减小搜索范围

在试图找到某个特定节点，或者某个节点的子集时，`应该使用内置的方法和 DOM 集合来缩小搜索范围`，使之在尽可能少的节点内进行搜索。

比如，如果你想在文档中找到一个具有某个特定属性的未知的元素，可能这样做：
```
var allElements = document.getElementsByTagName('*');
for(var i = 0; i < allElements.length; i++) {  
    if(allElements[i].hasAttribute('someattr')) {
    // …
  }
}
```
即使我们忽略像 `XPath` 这样的高级技术，那个例子中仍然存在两个使之变慢的问题。

首先，它搜索了每一个元素，根本没有尝试缩小范围。
第二，它在找到了需要的元素之后`并没有中止搜索`。

假如已经知道那个未知的元素在一个 id 为 inhere 的 div 中，下面的代码会好很多：
```
var allElements = document.getElementById('inhere').getElementsByTagName('*');
for(var i = 0; i < allElements.length; i++) {  
    if(allElements[i].hasAttribute('someattr')) {
    // …    break;
  }
}
```
如果那个未知的元素是那个 div 的直接子级，这种方法可能会更快，这取决于 div 的子孙元素的数量，将之与 childNodes 集合的 length 比较：
```
var allChildren = document.getElementById('inhere').childNodes;
for(var i = 0; i < allChildren.length; i++) {  
    if(allChildren[i].nodeType == 1 && allChildren[i].hasAttribute('someattr')) {
    // …    break;
  }
}

**基本的思路是尽可能避免手工步入 DOM。**

有许多在各种情况下表现更好的东西来代替 DOM，比如 DOM 2 Traversal TreeWalker，可用于代替递归遍历 childNodes 集合。

## 通过 XPath 提升速度

一个简单的示例是在 HTML 文档中使用 H2 - H4 创建一个目录，这些元素可以出现在不同的地方，没有任何适当的结构，所以不能用递归来获得正确的顺序。传统的 DOM 会采用这样的方法：
```
var allElements = document.getElementsByTagName('*');
for(var i = 0; i < allElements.length; i++) {  
    if(allElements[i].tagName.match(/^h[2-4]$/i)) {
    // …
  }
}
```
在可能包含了 2000 个元素的文档，这会导致显著的延迟，因为需要分别检查它们每一个。
XPath，当它得到原生支持的时候，能提供更快的方法。
对 XPath 查询引擎的优化可以比直接解释 JavaScript 快得多。
在某些情况下，甚至高达两个数量级的速度提升。下面的示例与上面的传统示例等效，但使用 XPath 提升了速度。
```
var headings = document.evaluate('//h2|//h3|//h4', document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
var oneheading;while(oneheading = headings.iterateNext()) {
  // …
}
```
下面的代码综合了上面的两个版本，在 XPath 可用的时候使用 XPath，否则回到传统 DOM 方法：
```
if( document.evaluate ) {
  var headings = document.evaluate('//h2|//h3|//h4', document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
  var oneheading;  while(oneheading = headings.iterateNext()) {
    // …
  }
} else {
  var allElements = document.getElementsByTagName('*');  for(var i = 0; i < allElements.length; i++) {    if(allElements[i].tagName.match(/^h[2-4]$/i)) {
      // …
    }
  }
}
```
## 避免在遍历 DOM 的时候进行修改

对于某些类型的 DOM 集合，如果你的脚本在这些集合中检索的时候改变了相关元素，`集合会立即发生变化而不会等你的脚本运行结束。`

这包含 childNodes 集合，以及 getElementsByTagName 返回的节点列表。

如果你的脚本在像这样的集合中检索，同时又在向里面添加元素，那你可能进入一个无限循环，因为在到达终点前不断的往集合内添加项。

不过，这不是唯一的问题。这些集合可能被优化以提升性能。它们能记住长度和脚本引用的最后一个索引，以便在增加索引的时候，能迅速引用下一个节点。

如果你修改了 DOM 树的任意部分，哪怕它不在集合中，集合也必须重新寻找新的条目。
`这样做的话，它就不能记住最后的索引或长度，因为这些可能已经变化，之前所做的优化也就失效了：`
```
var allPara = document.getElementsByTagName('p');
for(var i = 0; i < allPara.length; i++) {
  allPara[i].appendChild(document.createTextNode(i));
}
```
在 Opera 中，下面等效的代码性能要好十倍，一些当今的浏览器，比如 Internet Explorer 也是如此。它的工作原理是先建立一个静态元素列表用于修改，然后遍历这个静态列表来进行修改。以此避免对 getElementsByTagName 返回的列表进行修改。
```
var allPara = document.getElementsByTagName('p');
var collectTemp = [];for(var i = 0; i < allPara.length; i++) {
  collectTemp[collectTemp.length] = allPara[i];
}for(i = 0; i < collectTemp.length; i++) {
  collectTemp[i].appendChild(document.createTextNode(i));
}
collectTemp = null;
```
## 在脚本中用变量缓存 DOM 的值

`DOM 返回的某些值是不缓存的，它们会在再次调用的时候重新计算。`
getElementById 方法就是其中之一，下面的代码就比较浪费性能：
```
document.getElementById('test').property1 = 'value1';
document.getElementById('test').property2 = 'value2';
document.getElementById('test').property3 = 'value3';
document.getElementById('test').property4 = 'value4';
```
这段代码对同一个对象查找了四次。下面的代码只会查找一次并保存下来。
对于单独一个请求来说，这样的速度可能没有变化，或者会因此赋值变得稍慢一点。
但在后续操作中使用缓存值之后，对当今的浏览器来说，命令运行的速度会快五到十倍。
下面的命令与上面示例中的等效：
```
var sample = document.getElementById('test');
sample.property1 = 'value1';
sample.property2 = 'value2';
sample.property3 = 'value3';
sample.property4 = 'value4';
```