

var sn = window.sn || {};
sn.tool = sn.tool || {};
/*
工具函数列表：
addFavorite(url,title):		让浏览器以title指定名称收藏url指定网址的站点；
domScrollFlag(sel):		判断sel指定的容器是否有横向滚动条、纵向滚动条，返回值是一个拥有level/vertical两个布尔型属性的对象；
getCookie(name):	按name取cookie
htmlDecode(str):	将字符串中的HTML实体转换为对应的普通符号
inputMoveEnd(obj):	将一个文本输入框的DOM元素焦点移动到内容的最后
setCookie(name,value,time):		设定name指定名称、value指定值、time指定失效时间（单位：毫秒）的cookie设置函数
setHomepage(url)：	让浏览器设置url指定的网页为浏览器首页
*/


/**--加入收藏夹函数
 * url：收藏目标url
 * title：收藏夹中显示的名称
 * 这个方法能兼容IE和FF，其他浏览器中会提示Ctrl+D收藏当前页面
 */
function addFavorite(url,title){
	if (document.all){
		window.external.addFavorite(url,title);
	}else{
		try{
			window.sidebar.addPanel(title,url,"");
		}catch (e){
			alert("加入收藏失败，请使用Ctrl+D进行添加!");
		}
	}
}

//所以应该是，收藏本站函数，这样应该更好，所有的浏览器总共就提供这两种方式，故而都试一下。
function AddFavorite(title, url) {
    try {
        window.external.addFavorite(url, title);
    }
    catch (e) {
        try {
            window.sidebar.addPanel(title, url, "");
        }
        catch (e) {
            alert("抱歉，您所使用的浏览器无法完成此操作。\n\n加入收藏失败，请使用Ctrl+D进行添加");
        }
    }
}

/*--设置首页函数
url:设置为浏览器首页的目标站点URL
*/
function setHomepage(url){
	if(!url){
		url = "http://"+document.location.host+"/";
	}
	if (document.all){
		document.body.style.behavior='url(#default#homepage)';
		document.body.setHomePage(url);
	}else if (window.sidebar){
		if(window.netscape){
			try{
				netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
			}catch(e){   
				alert( "该操作被浏览器拒绝，如果想启用该功能，请在地址栏内输入 about:config,然后将项 signed.applets.codebase_principal_support 值该为true" );
			}
		}
		var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components. interfaces.nsIPrefBranch);
		prefs.setCharPref('browser.startup.homepage',url);
	}else{
		alert("设置首页失败，请手动进行设置!");
	} 
}

/*--识别一个html元素是否有滚动条，有level和vertical两个方向标识*/
function domScrollFlag(sel){
	var elem = $(sel),flag = {},sw;
	if(elem.length == 0){
		return false;
	}	
	if(bom.ie8 && elem.children().length == 0 && elem.children(":first").css("border-collapse") == "collapse"){
		sw = elem.get(0).scrollWidth - 1;
	}else{
		sw = elem.get(0).scrollWidth;
	}
	flag.level = elem.innerWidth() < sw ? true : false;
	flag.vertical = elem.innerHeight() < elem.get(0).scrollHeight ? true : false;
	flag.left = elem.scrollLeft() > 0 ? true :false;
	flag.right = elem.get(0).scrollWidth > (elem.innerWidth() + elem.scrollLeft()) ? true :false;
	return flag;
}

/*两个参数，一个是cookie的名子，一个是值*/
function setCookie(name,value,time)
{
	if(!time){
		time =30*24*60*60*1000;
	}
	var exp  = new Date();
	exp.setTime(exp.getTime() + time);
	document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}

/*取cookies函数*/
function getCookie(name){
	var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
	if(arr != null) return unescape(arr[2]);
	return null;
}
/*将字符串中一些特殊HTML实体替换成对应的符号*/
function htmlDecode(str){
	var s = "";
	if(str.length == 0)return "";
	s = str.replace(/&amp;/g,"&");
	s = s.replace(/&lt;/g,"<");
	s = s.replace(/&gt;/g,">");
	s = s.replace(/&#040;/g,"(");
	s = s.replace(/&#041;/g,")");
	s = s.replace(/&nbsp;/g," ");
	s = s.replace(/'/g,"\'");
	s = s.replace(/&quot;/g,"\"");
	s = s.replace(/<br>/g,"\n");
	return s;
}
function inputMoveEnd(obj,num){
/*文本框光标移动到最末函数，参数必须是一个文本输入框的DOM元素*/
//	obj.focus();
	var len =typeof num != "undefined" ? num : obj.value.length;
	/*IE*/
	if (!!window.ActiveXObject){ 
		var sel = obj.createTextRange(); 
		sel.moveStart('character',len); 
		sel.collapse(); 
		sel.select(); 
	}
	/*FF*/
	if(window.navigator.userAgent.indexOf("Firefox") != -1){
		obj.selectionStart = obj.selectionEnd = len;
	}
	/*Chrome*/
	if(window.navigator.userAgent.indexOf("Chrome") !== -1){
		var val = obj.value;
		//obj.value = "";
		function reSetValue(){
			obj.value = val;
		}
		setTimeout(reSetValue,10);
	}
}
sn.tool.flickerTip = function(elem, oriOpt) {
	if (!$(elem).length) {
		return;
	}
	//是否在闪动，已经在闪动则退出
	if ($(elem).data('tipping')) {
		return;
	}
	
	//设置闪动状态
	$(elem).data('tipping', true);
	
	var highLightFun, //高亮方法
		unHighLightFun, //取消高亮方法
		defaultOpt = {
			cls: '',			//高亮时的class
			bgColor: '#FDCECE',	//高亮时的背景色, 当颜色与class都有传入时，优先使用背景色
			interval: 300,		//闪动间隔时间
			num: 3				//闪动次数
		},
		oriOpt = oriOpt || {},
		opt = $.extend(true, defaultOpt, oriOpt), //生成配置项
		tCount = 0,	//已闪动次数
		oriStatus = {	//dom原始状态
			bgColor: $(elem).css('background-color'),
			cls: $(elem).attr('class')
		};
	
	//如果传入了背景色 或 背景色与class都没传入 或 生成的配置项中class值为空，则采用背景色高亮方法，否则采用class高亮方法
	if (oriOpt.bgColor || (!oriOpt.bgColor && !oriOpt.cls) || !opt.cls) {
		highLightFun = function() {
			$(elem).css('background-color', opt.bgColor);
		};
		unHighLightFun = function() {
			$(elem).css('background-color', oriStatus.bgColor);
		};
	} else {
		highLightFun = function() {
			$(elem).addClass(opt.cls);
		};
		unHighLightFun = function() {
			$(elem).removeClass(opt.cls);
		};
	}
	
	var validTip = setInterval(function() {
		//高亮
		highLightFun();
		setTimeout(function() {
			//取消高亮
			unHighLightFun();
			
			tCount++;
			if (tCount >= opt.num) {
				//闪动结束
				clearInterval(validTip);
				//重设闪动状态
				$(elem).data('tipping', false);
			}
		}, opt.interval);
	}, opt.interval * 2);
};
/*解决IE6下页面的min-width无效问题
这个方法只纠正IE6下的问题，所以还要在body上显示的定义min-width属性，属性值与调用方法时传递的参数值要一致 
*/
function minBodyWidth(m_width){
	if(m_width>0){
		$("body").css("min-width",m_width+"px");
		if(bom.ie6){
			function reset_body_width(){
				if($(window).width() < m_width){
					$("body").css("width",m_width+"px");
				}else{
					$("body").css("width","auto");
				}

			}
			reset_body_width();
			$(window).resize(function(){
				reset_body_width();
			});
		}
	}
}
/*对象转字符串方法*/
sn.obj2str = function(o){
	var r = []; 
	if(typeof o =="string") return "\""+o.replace(/([\'\"\\])/g,"\\$1").replace(/(\n)/g," \\n").replace(/(\r)/g,"\\r").replace(/(\t)/g,"\\t")+"\"";
	if(typeof o =="undefined") return "";
	if(typeof o == "object"){
		if(o===null) return "null";
		else if(!o.sort){
			for(var i in o){
				r.push("\""+i+"\":"+sn.obj2str(o[i]))
			}
			r="{"+r.join()+"}"
		}else{
			for(var i =0;i<o.length;i++)
				r.push(sn.obj2str(o[i]))
			r="["+r.join()+"]"
		}
		return r;
	}
	return o.toString();

};
sn.initObjColVal = function(opt){
	if(typeof(opt) == "object"){
		this._setting = $.extend({},sn.initObjColVal.defaultSetting,opt);
	}else{
		this._setting = $.extend({},sn.initObjColVal.defaultSetting);
	}
	this._init();
}
sn.initObjColVal.defaultSetting  = {
	obj:{},
	filterReg:/^\d+$/,
	k_flag:true,
	k_filter:true,
	v_flag:true,
	v_filter:true,
	split_char:"_"
};
sn.initObjColVal.prototype = {
	_init:function(){
		this.v_arr = [];
		this.k_arr = [];
		this.createArr(this._setting.obj);
	},
	createArr:function(o,key){
		var self = this;
		var new_key;
		for(var i in o){
			if(typeof(o[i])=="object"){
				new_key = key;
				if((self._setting.k_filter && !self._setting.filterReg.test(i)) || !self._setting.k_filter){
					if(key){
						new_key =  key + self._setting.split_char + i;
					}else{
						new_key = i;
					}
				}
				self.createArr(o[i],new_key);
			}else{
				self.v_arr.push(o[i]);
				if(self._setting.v_flag){
					if((self._setting.v_filter && !self._setting.filterReg.test(i)) || !self._setting.v_filter){
						if(key){
							new_key =  key + self._setting.split_char + i;
						}else{
							new_key = i;
						}
					}else{
						new_key = key;
					}
				}
				self.k_arr[self.v_arr.length-1] = new_key;
			}
		}
	},
	getColVal:function(num){
		return this.v_arr[num];
	},
	getColKey:function(num){
		return this.k_arr[num];
	}
};
