
# Interview questions

## JS

### 原型与原型链的理解



### 手写深度赋值函数
1. 借助JSON对象的方法，主要是复制了数据，对象上的引用类型无法复制

```
function clone_JSON(obj){
    return JSON.parse(JSON.stringify(obj));
}
var testObj = {a:1,b:2, c: function() {return 123}};
var copyObj = clone_JSON(testObj);
testObj.a = 100;
console.log(copyObj.a);
console.log(copyObj.c());
// 结果，复制的对象没有了c方法
copyObj
{a: 1, b: 2}
testObj
{a: 100, b: 2, c: ƒ}
```
2. 需要考虑基本类型与引用类型，如果是引用类型还要考虑引用类型内部是否还嵌套有引用类型

```
function clone(obj)
{
    var o,i,j,k;
    if(typeof(obj)!="object" || obj===null) return obj;//基本类型Undefined，string，number，boolean，null排除，就剩下array和object（测试都是object）
    if(obj instanceof(Array))//array类型，循环遍历
    {
        o=[];
        i=0;j=obj.length;
        for(;i<j;i++)
        {
            if(typeof(obj[i])=="object" && obj[i]!=null)//如果内嵌引用类型
            {
                o[i]=arguments.callee(obj[i]);//对当前的值使用该函数clone
            }
            else
            {
                o[i]=obj[i];//基本类型，非object和null就直接复制引用，方法的重用是没有什么关系的
            }
        }
    }
    else  //object类型
    {
        o={};
        for(i in obj)//使用for in 來遍历
        {
            if(typeof(obj[i])=="object" && obj[i]!=null)//同样的道理
            {
                o[i]=arguments.callee(obj[i]);
            }
            else
            {
                o[i]=obj[i];
            }
        }
    }
 
    return o;
}
var testObj = {a:1,b:2, c: function() {return 123}};
var copyObj = clone(testObj);
testObj.a = 100;
console.log(copyObj.a);
console.log(copyObj.c());

testObj.c === copyObj.c // true, 复制了指向
```

### GET与POST请求的联系与区别

@8.数据请求/GET请求与POST请求.md

## CSS

### position属性的理解

### 盒子模型理解





## HTML



## 常用到的英文名称

| 缩写   | 完整                          | 中文对应       | 备注   |
| :--- | :-------------------------- | :--------- | :--- |
| DNS  | domain name system          | --         | --   |
| HTTP | Hypertext Transfer Protocol | 协议即超文本传送协议 | --   |
| HTML | sss


## 网络与数据请求


### web性能优化的方法

**总结起来主要是以下个方面的优化：**

1. 减少HTTP请求

   > 减少了网络连接与等待的时间
   >
   > 减少图片的请求、减少脚本文件与样式表的请求

   - 减少图片请求
   - 合并js脚本与css样式表
   - 内联图片（base64）

2. 页面内部优化

   > 主要方向：样式表放在顶部、脚本文件放在底部、避免css表达式、把脚本的样式表放在外部、移除重复脚本。

3. 启用缓存

   > 两套方案：`expires/If-Modified-Since`、`Cache-Control/Etag`；前者是HTTP1.0中的缓存方案，后者是HTTP1.1中缓存方案，若http头部中同时出现二者，后者的优先级更高。

4. 减少下载量

   > 开启GZIP压缩

5. 网络连接上的优化

   > 使用CDN加速、减少DNS查找、避免重定向。