# js实现延迟加载

网页中通常在head中包含script标签加载js文件，但有些js文件不是很重要，比如网页数据统计的js脚本，就可以在网页显示完之后再慢慢加载，这样也有利于网页的显示效率，别在加载js脚本的过程中，页面显示一片空白。

**实现延迟加载的方式有很多种：**

1. 直接将script节点放置在</body>之前，这样js脚本就会在页面显示出来之后再加载。

2. 使用script标签的**defer和async属性**，**defer属性为延迟加载，是在页面渲染完成之后再进行加载的**，**而async属性则是和文档并行加载**，这两种解决方案都不完美，原因在于不是所有浏览器都支持。

3. 通过监听页面onload事件，也就是页面加载完成之后动态添加，动态添加script节点：

   ```
   // Firefox，Opera，Chrome，Safari的方式
   [javascript] view plain copy
   var script = document.createElement ("script")  
   script.type = "text/javascript";  
     
   //Firefox, Opera, Chrome, Safari 3+  
   script.onload = function(){  
       alert("Script loaded!");  
   };  
     
   script.src = "script1.js";  
   document.getElementsByTagName("head")[0].appendChild(script);  
   //IE的方式
   [javascript] view plain copy
   var script = document.createElement("script")  
   script.type = "text/javascript";  
     
   //Internet Explorer  
   script.onreadystatechange = function(){  
        if (script.readyState == "loaded" || script.readyState == "complete"){  
              script.onreadystatechange = null;  
              alert("Script loaded.");  
        }  
   };  
     
   script.src = "script1.js";  
   document.getElementsByTagName("head")[0].appendChild(script);  
   其实IE和其它浏览器加载添加节点的方式都一样，只是加载之后监听是否成功的事件不一样，其实这个不需要也无所谓。
   ```

4. 通过ajax下载js脚本，动态添加script节点，这种方式与第二种类似，区别就在与js脚本的自动下载还是通过ajax下载，ajax的方式显然可控制性更好一点，它可以先下载js文件，但不立即执行。

   ```
   // 完整的ajax请求
   var xhr =null;//创建对象  
   if(window.XMLHttpRequest) { // 兼容性创建xhr对象
   	xhr = new XMLHttpRequest(); 
   }else{
   	xhr = new ActiveXObject("Microsoft.XMLHTTP");
   }
   xhr.open("get", "script1.js", true);  
   xhr.onreadystatechange = function(){  
       if (xhr.readyState == 4){  
           if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304){  
               var script = document.createElement ("script");  
               script.type = "text/javascript";  
               script.text = xhr.responseText;  
               document.body.appendChild(script);  
           }  
       }  
   };  
   xhr.send(null); 
   ```

   但是ajax有一个缺点，就是无法引用使用CDN方式提供的js文件，因为这种方式下，你即时通过xhr.open下载了js文件，而向body中注入script节点时还是需要向CDN请求js文件。

   具体使用哪种方式就得看具体情况了，有几个原则：**如果使用延迟加载技术，那么js脚本应该不能对页面的元素进行更改；js脚本文件的数量应该尽量少，可以将多个合并在一起。**

