


1. 父窗口调用子窗口：
document.getElementById("frameId").contentWindow.innerFunc();
2. iframe内部调用外部的方法:
window.parent.outerFunc()
