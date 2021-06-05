# 同时兼容 PC 与 Phone 的样式页面

## 实现方式

1. 最好的办法是使用 bootstrap 之类的 css 框架，可以根据浏览器自适应显示，一套模板自动支持 PC 端和手机端。

2. 媒体查询加载不同的 css；
   1. 这里应该是处理及其精细的样式，大体上的 pc 与 phone 的样式还是差别不大的；

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />

    <meta name="keywords" content="" />
    <title>智能家居</title>
    <link rel="stylesheet" href="./css/common.css" />
    <link rel="stylesheet" href="./css/home.css" media="screen and (min-width: 480px)" />
    <link rel="stylesheet" href="./css/homeMobile.css" media="screen and (max-width: 479px)" />
  </head>

  <body></body>
</html>
```

3. 新近的栅格布局（grid）更加强大（其实也不新了，只是兼容性还不够好[1]），可以同时定义行和列，**并通过 fr 弹性单位或 minmax()函数实现响应式布局**。虽然栅格布局更灵活，写起来却一点也不比弹性盒简单。

   1. uni-app 的 gird 是固定的，没啥用，需要自己来设置 grid 布局；
   2.

4. 弹性盒（flex）布局是目前最流行的响应式布局方式。弹性盒是一维的，也就是说，它排布元素只能一行一行或一列一列地排，需要嵌套弹性盒或合理利用换行才能实现二维布局。具体的用法这里就不谈了。学习 flex 相关属性的时候需要注意各种属性的初始值。

   1. 这里如果需要换行什么的，需要合理设置宽度，自动挤到下一行，**渐变比较细腻**；

5. @media
   1. 设备类型少的时候，这样写或许没什么问题，但设备类型一多这就是噩梦了。

```css
@media (max-width: 320px) {
  .article {
    width: 320px;
  }
}
```

## 最终选择的方案

使用 flex+@media 来处理比较好。
