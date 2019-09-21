// $$函数是现代浏览器提供的一个命令行API，它相当于document.querySelectorAll，可以将当前页面中的CSS选择器作为参数传给该方法，然后它会返回匹配的所有元素。
// 所以，如果想在浏览器控制台外使用上面这段代码，可以将$$('*')替换为document.querySelectorAll('*')。

[].forEach.call(document.querySelectorAll("*"), function(ele) {
  ele.style.border =
    "1px solid #" + (~~(Math.random() * (1 << 24))).toString(16);
  ele.style.transform = "skew(1deg, 1deg)";
});

// 随机颜色值
(~~(Math.random() * (1 << 24))).toString(16);

// 创建过去七天的数组

[...Array(7).keys()].map(days => new Date(Date.now() - 86400000 * days));


// 生成长度为11的随机字母数字字符串
Math.random().toString(36).substring(2);
// hg7znok52x

// 获取URL的查询参数
// 这个获取URL的查询参数代码，是我见过最精简的 QAQ

// ?foo=bar&baz=bing => {foo: bar, baz: bing}

// 获取URL的查询参数
q={};
// 这里的k、v对应于匹配到的第一个和第二个参数
location.search.replace(/([^?&=]+)=([^&]+)/g,(_,k,v)=>q[k]=v);
q;

// 创建本地时间
<body onload="setInterval(()=>document.body.innerHTML=new Date().toLocaleString().slice(10,19))"></body>


// 混淆数组

// 随机更改数组元素顺序，混淆数组
(arr) => arr.slice().sort(() => Math.random() - 0.5);
/*
let a = (arr) => arr.slice().sort(() => Math.random() - 0.5)
let b = a([1,2,3,4,5])
console.log(b)
*/

// 方便快捷创建特定大小的数组
[...Array(3).keys()];
// [0, 1, 2]

// 这是一个很难看懂的简洁代码，但是运行后你会惊呆的，他竟然返回一个图形键盘

// 用字符串返回一个键盘图形
(_=>[..."`1234567890-=~~QWERTYUIOP[]\\~ASDFGHJKL;'~~ZXCVBNM,./~"].map(x=>(o+=`/${b='_'.repeat(w=x<y?2:' 667699'[x=["BS","TAB","CAPS","ENTER"][p++]||'SHIFT',p])}\\|`,m+=y+(x+'    ').slice(0,w)+y+y,n+=y+b+y+y,l+=' __'+b)[73]&&(k.push(l,m,n,o),l='',m=n=o=y),m=n=o=y='|',p=l=k=[])&&k.join`
`)()

// [..."sdfsdf"]
// ["s", "d", "f", "s", "d", "f"]
