# XSS

**跨站脚本攻击(Cross Site Scripting)**，为不和层叠样式表(Cascading Style Sheets, CSS)的缩写混淆，故将跨站脚本攻击缩写为XSS。**恶意攻击者往Web页面里插入恶意Script代码**，当用户浏览该页之时，嵌入其中Web里面的Script代码会被执行，从而达到恶意攻击用户的目的。

**对比概念：**

**跨站请求伪造（英语：Cross-site request forgery）**，也被称为one-click attack 或者session riding，通常缩写为**CSRF** 或者**XSRF**， 是一种挟制用户在当前已登录的Web应用程序上执行非本意的操作的攻击方法。

## 攻击场景

### 反射型（url注入代码（如需要解析的代码），获取服务器上的一些信息）

XSS往往在**“查询（search部分）”**部分发现漏洞构造攻击代码实施攻击，**所谓“反射”可以理解为hacker并不会直接攻击客户，而是通过URL植入代码通过服务器获取并植入到用户页面完成攻击。**

### 存储型（存在于网站服务器，当别的用户交互的时候，攻击用户）

存储型存储型攻击方式和反射型最大的区别就是**不通过URL来传播**，而是利用站点**本身合法的存储结构**，比如评论。任何用户都可以通过站点提供的接口提交评论内容，这些评论内容都被存储到服务器的数据库。当用户访问这些评论的时候，服务器从数据库提取内容插入到页面反馈给用户。如果评论内容本身是具备攻击性内容，用户无一幸免。

## **XSS的防范措施**

**编码**

对于反射型的代码，**服务端代码要对查询进行编码，主要目的就是将查询文本化，避免在浏览器解析阶段转换成DOM和CSS规则及JavaScript解析。**具体就是进行**实体转码**。



**DOM Parse和过滤**

为了杜绝悲剧发生，**我们需要在浏览器解析之后进行解码，得到的文本进行DOM parse拿到DOM Tree，对所有的不安全因素进行过滤，最后将内容交给浏览器，达到避免XSS感染的效果。**



**这里要研究一下，为什么要这样做，以及这样做的效果如何**

```
1.解码
		var unescape = function(html, options) {
            options = merge(options, decode.options);
            var strict = options.strict;
            if (strict && regexInvalidEntity.test(html)) {
                parseError('malformed character reference');
            }
            return html.replace(regexDecode, function($0, $1, $2, $3, $4, $5, $6, $7) {
                var codePoint;
                var semicolon;
                var decDigits;
                var hexDigits;
                var reference;
                var next;
                if ($1) {
                    // Decode decimal escapes, e.g. ``.
                    decDigits = $1;
                    semicolon = $2;
                    if (strict && !semicolon) {
                        parseError('character reference was not terminated by a semicolon');
                    }
                    codePoint = parseInt(decDigits, 10);
                    return codePointToSymbol(codePoint, strict);
                }
                if ($3) {
                    // Decode hexadecimal escapes, e.g. ``.
                    hexDigits = $3;
                    semicolon = $4;
                    if (strict && !semicolon) {
                        parseError('character reference was not terminated by a semicolon');
                    }
                    codePoint = parseInt(hexDigits, 16);
                    return codePointToSymbol(codePoint, strict);
                }
                if ($5) {
                    // Decode named character references with trailing `;`, e.g. `©`.
                    reference = $5;
                    if (has(decodeMap, reference)) {
                        return decodeMap[reference];
                    } else {
                        // Ambiguous ampersand. https://mths.be/notes/ambiguous-ampersands
                        if (strict) {
                            parseError(
                                'named character reference was not terminated by a semicolon'
                            );
                        }
                        return $0;
                    }
                }
                // If we’re still here, it’s a legacy reference for sure. No need for an
                // extra `if` check.
                // Decode named character references without trailing `;`, e.g. `&amp`
                // This is only a parse error if it gets converted to `&`, or if it is
                // followed by `=` in an attribute context.
                reference = $6;
                next = $7;
                if (next && options.isAttributeValue) {
                    if (strict && next == '=') {
                        parseError('`&` did not start a character reference');
                    }
                    return $0;
                } else {
                    if (strict) {
                        parseError(
                            'named character reference was not terminated by a semicolon'
                        );
                    }
                    // Note: there is no need to check `has(decodeMapLegacy, reference)`.
                    return decodeMapLegacy[reference] + (next || '');
                }
            });
        };

2.DOM Parse和过滤

var parse=function(str){  
    var results='';
    try {
        HTMLParser(str,{
            start:function(tag,attrs,unary){
                if(tag=='script' || tag=='style'|| tag=='img'|| tag=='link'){
                    return
                }
                results+="";
            },
            end:function(tag){
                results+=""+tag+">";
            },
            chars:function(text){
                results+=text;
            },
            comment:function(){
                results+="';
            }
        })
        return results;
    } catch (e) {
 
    } finally {
 
    }
};
 
var dst=parse(str);

其中DOM Parse可以采用第三方的Js库来完成。
```

