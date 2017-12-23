

1. input输入框只能输入数字，只能输入字母数字组合.js
2. 限制input的输入内容的长度，使用maxLength

输入大小写字母、数字、下划线：
<input type="text" onkeyup="this.value=this.value.replace(/1/g,'');">

输入小写字母、数字、下划线：
<input type="text" onkeyup="this.value=this.value.replace(/2/g,'');">

输入数字和点
<input type="text" onkeyup="value=value.replace(/3/g,'')">

输入中文: 
<input type="text" onkeyup="this.value=this.value.replace(/4/g,'')">

输入数字: 
<input type="text" onkeyup="this.value=this.value.replace(/D/g,'')">

输入英文: 
<input type="text" onkeyup="this.value=this.value.replace(/5/g,'')">

输入中文、数字、英文: 
<input onkeyup="value=value.replace(/6/g, '')">

输入数字和字母：
<input onKeyUp="value=value.replace(/[W]/g,'')">

除了英文的标点符号以外，其他的都可以中文，英文字母，数字，中文标点
<input type="text" onkeyup="this.value=this.value.replace(/^7/g,'')">

只能输入数字代码(小数点也不能输入)
<input onkeyup="this.value=this.value.replace(/D/g,'')" onafterpaste="this.value=this.value.replace(/D/g,'')">

只能输入数字,能输小数点.
<input onkeyup="if(isNaN(value))execCommand('undo')" onafterpaste="if(isNaN(value))execCommand('undo')">
<input name=txt1 onchange="if(/D/.test(this.value)){alert('只能输入数字');this.value='';}">

数字和小数点方法二
<input type=text t_value="" o_value="" onkeypress="if(!this.value.match(/^[+-]?d?.?d?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[+-]?d+(?:.d+)?)?$/))this.o_value=this.value" onkeyup="if(!this.value.match(/^[+-]?d?.?d?$/))this.value=this.t_value;else this.t_value=this.value;if(this.value.match(/^(?:[+-]?d+(?:.d+)?)?$/))this.o_value=this.value" onblur="if(!this.value.match(/^(?:[+-]?d+(?:.d+)?|.d*?)?$/))this.value=this.o_value;else{if(this.value.match(/^.d+$/))this.value=0+this.value;if(this.value.match(/^.$/))this.value=0;this.o_value=this.value}">

只能输入字母和汉字
<input onkeyup="value=value.replace(/[d]/g,'') "onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[d]/g,''))" maxlength=10 name="Numbers">

只能输入英文字母和数字,不能输入中文
<input onkeyup="value=value.replace(/8/ig,'')">

只能输入数字和英文
<input onKeyUp="value=value.replace(/9/g,'')">

小数点后只能有最多两位(数字,中文都可输入),不能输入字母和运算符号:
<input onKeyPress="if((event.keyCode<48 || event.keyCode>57) && event.keyCode!=46 || /.dd$/.test(value))event.returnValue=false">

小数点后只能有最多两位(数字,字母,中文都可输入),可以输入运算符号:
<input onkeyup="this.value=this.value.replace(/^(-)(d+).(dd).$/,'$1$2.$3')">

w_ ↩
a-z0-9_ ↩
d. ↩
u4e00-u9fa5 ↩
a-zA-Z ↩
wu4E00-u9FA5 ↩
!@#$%^&*()-=+ ↩
w./ ↩
d|chun ↩