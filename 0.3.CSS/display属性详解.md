## display属性详解.md
### display:inline-block;
```1. 使用inline-block之前先处理点小障碍：inline-block元素会有4px左右的空隙，这个是因为我们写代码时候的换行符所致。
2. 解决办法很简单：在inline-block的父元素中设置样式font-size：0；letter-spacing: -4px; 然后设置inline-block的所有兄弟元素 font-size：值；letter-spacing: 值px;  恢复正常的显示。
