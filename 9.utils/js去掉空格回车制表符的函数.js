




str = str.replace(/<\/?[^>]*>/g,''); //去除HTML tag
str = str.replace(/[ | ]*\n/g,'\n'); //去除行尾空白
str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
str=str.replace(/ /ig,'');//去掉 
str=str.replace(/^[\s　]+|[\s　]+$/g, "");//去掉全角半角空格
str=str.replace(/[\r\n]/g,"");//去掉回车换行


