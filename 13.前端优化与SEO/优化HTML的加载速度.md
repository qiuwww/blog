
## 优化HTML的加载速度

如何加快HTML页面加载速度 （优化加载）

1. 页面减肥： 

　　a. 页面的肥瘦是影响加载速度最重要的因素。 

　　b. 删除不必要的空格、注释。 

　　c. 将inline的script和css移到外部文件。 

　　d. 可以使用HTML Tidy来给HTML减肥，还可以使用一些压缩工具来给JavaScript减肥。 

2. 减少文件数量： 

　　a. 减少页面上引用的文件数量可以减少HTTP连接数。 

　　b. 许多JavaScript、CSS文件可以合并最好合并，人家财帮子都把自己的JavaScript. functions和Prototype.js合并到一个base.js文件里去了。 

3. 减少域名查询： 

　　a. DNS查询和解析域名也是消耗时间的，所以要减少对外部JavaScript、CSS、图片等资源的引用，不同域名的使用越少越好。（但是这里有个问题，就是同时下载的文件数目是有限制的，不能超过6个吧，所以有的时候，还要主动把他们放到不同的域下，用以更快的加载）。 

4. 缓存重用数据： 

　　a. 对重复使用的数据进行缓存。 （get的数据自动缓存，post的数据需要设置主动缓存）

5. 优化页面元素加载顺序： 

　　a. 首先加载页面最初显示的内容和与之相关的JavaScript和CSS，然后加载HTML相关的东西，像什么不是最初显示相关的图片、flash、视频等很肥的资源就最后加载。 

6. 减少inline JavaScript的数量： 

　　a. 浏览器parser会假设inline JavaScript会改变页面结构，所以使用inline JavaScript开销较大。 

　　b. 不要使用document.write()这种输出内容的方法，使用现代W3C DOM方法来为现代浏览器处理页面内容。 

7. 使用现代CSS和合法的标签： 

　　a. 使用现代CSS来减少标签和图像，例如使用现代CSS+文字完全可以替代一些只有文字的图片。 

　　b. 使用合法的标签避免浏览器解析HTML时做“error correction”等操作，还可以被HTML Tidy来给HTML减肥。 

8. Chunk your content： 

　　a. 不要使用嵌套table，而使用非嵌套table或者div。将基于大块嵌套的table的layout分解成多个小table，这样就不需要等到整个页面（或大table）内容全部加载完才显示。 

9. 指定图像和table的大小： 

　　a. 如果浏览器可以立即决定图像或table的大小，那么它就可以马上显示页面而不要重新做一些布局安排的工作。 

　　b. 这不仅加快了页面的显示，也预防了页面完成加载后布局的一些不当的改变。 

　　c. image使用height和width。 
