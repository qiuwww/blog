# note.md

## 项目的主要代码在 pell.js 文件中，其结构很简单，主要功能的实现依赖于以下的几个部分：

actions 对象
exec() 函数
init() 函数

```
Document.execCommand()

先从最简单的部分看起， exec() 函数只有下面三行：

export const exec = (command, value = null) => {
    document.execCommand(command, false, value);
};

它将 document.execCommand() 进行了一个简单的包装，Document.execCommand() 就是这个编辑器的核心，其语法如下

bool = document.execCommand(aCommandName, aShowDefaultUI, aValueArgument)
```

## 文件中定义了一个名为 actions 的对象，对应的是下图工具栏上的这一行按钮， actions 中的每个子对象都保存了一个按钮的属性。
```
const actions = {
    bold: {
        icon: '<b>B</b>',
        title: 'Bold',
        result: () => exec('bold')
    },
    italic: {
        icon: '<i>I</i>',
        title: 'Italic',
        result: () => exec('italic')
    },
    underline: {
        icon: '<u>U</u>',
        title: 'Underline',
        result: () => exec('underline')
    },
    // …
}
```
icon: 如何在工具栏中显示
title: 就是 title 啦
result: 一个函数，会赋给按钮作为点击事件，调用之前所提到的 exec() 函数来对文本进行操作


## 右键选中的文本，再点击左键，如果目标是button，是不会被取消选中的， 如果是一般的文本还是会被选中的;
类似的元素还有 input a ，非纯文本的标签应该都可以的