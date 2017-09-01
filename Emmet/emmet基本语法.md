# emmet基本语法.md

> sublime 3插件


## Emmet常用技巧：（输入下面简写，按Tab键可触发效果）

### 生成 HTML 文档初始结构
    html:5 或者 ! 生成 HTML5 结构
    html:xt 生成 HTML4 过渡型
    html:4s 生成 HTML4 严格型
`
html:5
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	
</body>
</html>
`

### 生成带有 id 、class 的 HTML 标签

    Emmet 默认的标签为 div ，如果我们不给出标签名称的话，默认就生成 div 标签。

    编写一个 class 为 bbb 的 span 标签，我们需要编写下面指令：
        `span.bbb`
    编写一个 id 为 ccc 的 class 为 ddd 的 ul 标签
        `ul#ccc.ddd`

### 生成后代：>

    大于号表示后面要生成的内容是当前标签的后代。

    要生成一个无序列表，而且被 class 为 aaa 的 div 包裹
        `div.aaa>ul>li`
    生成一个有序列表
        `.abc>ol>li`

### 生成兄弟：+

    上面是生成下级元素，如果想要生成平级的元素，就需要使用 + 号
        `div+p+bq`

### 生成上级元素：^

    上级 （Climb-up）元素是什么意思呢？前面咱们说过了生成下级元素的符号“>”，当使用 div>ul>li 的指令之后，再继续写下去，那么后续内容都是在 li 下级的。如果我想编写一个跟 ul 平级的 span 标签，那么我需要先用 “^” 提升一下层次; 写两个可以提升两级;
       `div>ul>li^span`

### 重复生成多份：*

    重复生成多份：*
    特别是一个无序列表，ul 下面的 li 肯定不只是一份，通常要生成很多个 li 标签。那么我们可以直接在 li 后面 * 上一些数字：
        `ul>li*5`
        `table>thead>tr>th*10^^tbody>tr*10>td*10`

### 生成分组：()

    用括号进行分组，这样可以更加明确要生成的结构，特别是层次关系
        `div>(header>ul>li*2>a)+footer>p`
        `table>(thead>tr>th*5)+(tbody>tr*2>td*5>span.ableClick)`

### 生成自定义属性：[attr]

    a 标签中往往需要附带 href 属性和 title 属性，如果我们想生成一个 href 为 “http://blog.wpjam.com” ，title 为“我爱水煮鱼”的 a 标签
        `a[href="http://blog.wpjam.com" title="我爱水煮鱼"]`

### 对生成内容编号：$

    如无序列表，我想为五个 li 增加一个 class 属性值 item1 ，然后依次递增从 1-5，那么就需要使用 $ 符号：
        `ul>li.item$*5`
    $ 就表示一位数字，只出现一个的话，就从1开始。如果出现多个，就从0开始。如果我想生成三位数的序号，那么要写三个 $
        `ul>li.item$$$*5`
    只能这样单调的生成序号？对于强大的 Emmet 来说，肯定不会会了，我们也可以在 $ 后面增加 @- 来实现倒序排列
        `ul>li.item$@-*5`
    同样，我们也可以使用 @N 指定开始的序号：
        `ul>li.item$@3*5`

### 生成文本内容：{}  

    上面讲解了如何生成 HTML 标签，那里面的内容呢？当然也可以生成了：
        `a[href="http://blog.wpjam.com"]{点击这里到 我爱水煮鱼}`
    在生成内容的时候，特别要注意前后的符号关系，虽然 a>{Click me} 和 a{Click me} 生成的结构是相同的，但是加上其他的内容就不一定了
        `<!-- a{click}+b{here} -->
        <a href="">click</a><b>here</b>
        <!-- a>{click}+b{here} -->
        <a href="">click<b>here</b></a>`

### 不要有空格
    在写指令的时候，你可能为了代码的可读性，使用一些空格什么的排版一下。这就会导致代码无法使用。


    