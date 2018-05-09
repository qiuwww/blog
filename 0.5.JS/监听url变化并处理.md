

## hashChange事件，这里只能监听hash是不是改变了

```
//监听触发操作
function hashChange(){
    alert("URL产生了变化")
}

//url变化监听器
if( ('onhashchange' in window) && ((typeof document.documentMode==='undefined') || document.documentMode==8)) {
    // 浏览器支持onhashchange事件
    window.onhashchange = hashChange;  // TODO，对应新的hash执行的操作函数
} else {
    // 不支持则用定时器检测的办法
    setInterval(function() {
        // 检测hash值或其中某一段是否更改的函数， 在低版本的iE浏览器中通过window.location.hash取出的指和其它的浏览器不同，要注意
        var ischanged = isHashChanged();
        if(ischanged) {
            hashChange();  // TODO，对应新的hash执行的操作函数
        }
    }, 150);
}
```

## 应用

现在SPA（single page application）单页面应用很火，就是一个页面加载所有的东西，如果一个网站有新闻中心，有数据中心，有个人中心，还能发布文章等功能，然而这个网页竟然只有一个页面，是不是很神奇。

单页面应用就是在干这样一件事情，传统的网站点击一个连接然后出现个空白页面刷新出来进入下一个页面，而单页面应用依靠Ajax或者websocket通信，通过各种tab切换或者类似弹窗（装扮的像真的网页一样，还带url）来实现功能的切换，而用户以为进入了一个新的页面。

so，就可以用hashchange来解决这件事情：

先设定hashchange事件
当要切换页面或者tab或者弹窗的时候，通过location.hash来改变hash值
此时hashchange捕捉到该变化，触发事件。


## 使用pushState和replaceState来实现

HTML5还提供了pushState和replaceState新接口，不仅可以实现替换URL，还可以输出新的标题，这样才完美的形成一个应用。
```
$('.a').on('click', function() {// 创建新history实体
    history.pushState({a:'aa'}, '', location.href+'?'+Math.random());
});
$('.b').on('click', function() {// 修改新history实体(虽然浏览记录确实生成了2条，但是实际你只能找到被修改后的{a:'bb'})
    history.replaceState({a:'bb'}, '', location.href+'?'+Math.random()+'------');
});
window.addEventListener('popstate', function() {// 前进后退触发
    console.log(history); 
    console.log(history.state);// 这里是你设置的{a:'aa'}
});
```


## 其他方案
### history.js


