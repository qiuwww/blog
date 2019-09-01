// 鼠标右键事件操作.js


第一步我们要屏蔽浏览器默认的右键点击行为，即阻止弹出框。

首先要将阻止弹出函数绑定到目标元素上：

//阻止浏览器默认右键点击事件
$("div").bind("contextmenu", function(){
    return false;
})
1
2
3
4
如此一来，div元素的右击事件就被屏蔽了，而浏览器其他区域不受影响，如果你想在整个页面屏蔽右击事件，只需这样做：

document.oncontextmenu = function() {
    return false;
}
1
2
3
接下来就可以为元素绑定右击响应函数了：

$("div").mousedown(function(e) {
    console.log(e.which);
    //右键为3
    if (3 == e.which) {
        $(this).css({
            "font-size": "-=2px"
        });
    } else if (1 == e.which) {
        //左键为1
        $(this).css({
            "font-size": "+=3px"
        });
    }
})