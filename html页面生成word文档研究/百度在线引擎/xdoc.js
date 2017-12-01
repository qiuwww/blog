/*---------------*\
 * XDOC 客户端
\*---------------*/
var XDoc = {};
//版本
XDoc.version = "10.8.5";
//XDocServer地址
XDoc.server = "";
//XDocBuilderServer地址
XDoc.bserver = "";
//账号
XDoc.key = "";
/**
 * 运行XDOC
 * @param xdoc xdoc模板，可以是xdoc、json、html或指向这些格式的url
 * @param tarFormat 目标格式，可以是：flash、pdf、docx、html、png等
 * @param param 其它参数，用对象方式传递多个参数
 * @param target 目标类型，可以是：_blank、_self等
 */
XDoc.run = function(xdoc, tarFormat, param, target) {
	XDoc._invoke("run", xdoc, tarFormat, param, target);
};
/**
 * 转换XDOC
 * @param xdoc xdoc模板，可以是xdoc、json、html或指向这些格式的url
 * @param tarFormat 目标格式，可以是：flash、pdf、docx、html、png等
 * @param param 其它参数，用对象方式传递多个参数
 * @param target 目标类型，可以是：_blank、_self等
 */
XDoc.to = function(xdoc, tarFormat, param, target) {
	XDoc._invoke("to", xdoc, tarFormat, param, target);
};
/**
 * 显示参数文档，用户可以输入参数运行
 * @param xdoc xdoc模板，可以是xdoc、json、html或指向这些格式的url
 * @param param 其它参数，用对象方式传递多个参数
 * @param target 目标类型，可以是：_blank、_self等
 */
XDoc.pdoc = function(xdoc, param, target) {
	XDoc._invoke("pdoc", xdoc, "flash", param, target);
};
/**
 * 创建或获取表单
 * @param id html元素ID，表单容器
 * @param xdoc xdoc模板，未指定xdoc返回id对应的表单对象
 * @param param 表单参数
 *		onInit(form) 初始化
 *		onLoad(form) 表单加载完成
 *		onSave(form) 保存
 *		onChange(form,item) 数据改变
 *		onSelect(form,item) 外部弹出选择
 * @param xparam 运行参数（传值后以运行结果做表单）
 */
XDoc.form = function(id, xdoc, param, xparam) {
	if (!xdoc) { //未指定xdoc，获取表单
		var form = document.getElementById(XDoc._formId(id) + "__");
		if (form == null
				|| navigator.appName == "Microsoft Internet Explorer"
					&& navigator.appVersion.match(/MSIE (9|10)\./i) != null)  {
			form = document.getElementById(XDoc._formId(id));
	 	}
	 	if (form == null) {
	 		alert(XDoc._format(XDoc.msg.FormNotFound, id));
	 	}
	 	return form;
 	}
 	if (!param) {
 		param = {};
 	}
	if (typeof(xdoc) == "object") { //json式xdoc，转换为json串
		xdoc = JSON.stringify(xdoc);
	}
	xdoc = XDoc._trim(xdoc);
	if (!(xdoc.length > 4 && xdoc.substring(xdoc.length - 4) == ".fpd") //fpd直接打开
		&& !XDoc._isJsonOrXml(xdoc)
		&& !XDoc._isServerURL(xdoc)) {
		//url地址，用Ajax获取xdoc
		XDoc._ajax.get({"url":xdoc,"xtra":{"url":xdoc,"param":param,"xparam":xparam,"id":id},"callback":function(success, http, xtra) {
			if (success) {
				var text = http.responseText;
				text = XDoc._trim(text);
				if (!XDoc._isJsonOrXml(text)) {
					text = xtra.url;
				}
			} else {
				text = xtra.url;
			}
			XDoc._form(xtra.id, text, xtra.param, xtra.xparam);
		}});
		return;
	}
	XDoc._form(id, xdoc, param, xparam);
};
/**
 * 设计器
 * @param id html元素ID，编辑器容器
 * @param params
 */
XDoc.builder = function(id, param) {
	var container = document.getElementById(id);
	if (container) {
		if (param) {
			param.libServerUrl = XDoc.bserver;
			if (param.libServerUrl.length == 0) {
				param.libServerUrl = XDoc.server;
			}
			var archive = param.libServerUrl + "/_lib/xdoc.jar,"
						+ param.libServerUrl + "/_lib/jfreechart.jar,"
						+ param.libServerUrl + "/_lib/rsyntax.jar";
			var names = ["xdoc", "tdoc", "clib"];
			if (param.tdoc == "") {
				param.tdoc = {};
			}
			for (var i = 0; i < names.length; i++) {
				if (param[names[i]]) {
					var xdoc = param[names[i]];
					if (typeof(xdoc) == "object") {
						xdoc = JSON.stringify(xdoc);
					}
					xdoc = XDoc._trim(xdoc);
					if (XDoc._isJsonOrXml(xdoc)) {
						xdoc = "data:application/json;base64," + XDoc._B64.encode(xdoc);
					}
					param[names[i]] = xdoc;
				}
			}
			names = ["xdoc", "tdoc", "clib", "xformat", "libServerUrl", "locale"]; 
			var html = "<object id='" + id + "__builder" + "' classid='clsid:8AD9C840-044E-11D1-B3E9-00805F499D93'"
				+ " codebase='http://java.sun.com/update/1.7.0/jinstall-7u60-windows-i586.cab'"
				+ " width='100%' height='100%'>"
				+ "<param name='type' value='application/x-java-applet'>"
				+ "<param name='code' value='com.hg.xdoc.XDocApplet.class'>"
				+ "<param name='archive' value='" + archive + "'>"
				+ "<param name='serverUrl' value='" + XDoc.server + "'>"
				+ "<param name='serverKey' value='" + XDoc.key + "'>";
			for (var i = 0; i < names.length; i++) {
				if (param[names[i]]) {
					html += "<param name='" + names[i] + "' value='" + param[names[i]] + "'>";
				}
			}
			html += "<param name='scriptable' value='true'>"
				+ "<comment>"
				+ "<embed id='" + id + "__builder__" + "' type='application/x-java-applet' code='com.hg.xdoc.XDocApplet.class'"
				+ " archive='" + archive + "'"
				+ " serverUrl='" + XDoc.server + "'"
				+ " serverKey='" + XDoc.key + "'";
			for (var i = 0; i < names.length; i++) {
				if (param[names[i]]) {
					html += " " + names[i] + "='" + param[names[i]] + "'";
				}
			}
			html += " width='100%' height='100%' scriptable='true'"
				+ " pluginspage='http://java.sun.com/products/plugin/index.html#download'>"
				+ "</embed>"
				+ "</comment>"
				+ "</object>";
			container.innerHTML = html;
		} else {
			var bld = document.getElementById(id + "__builder__");
			if (bld == null
					|| navigator.appName == "Microsoft Internet Explorer"
						&& navigator.appVersion.match(/MSIE (9|10)\./i) != null) {
				bld = document.getElementById(id + "__builder");
		 	}
		 	if (bld == null) {
		 		alert(XDoc._format(XDoc.msg.BuilderNotFound, id));
		 	}
		 	return bld;
		}
	} else {
		alert(XDoc._format(XDoc.msg.BuilderContainerNotFound, id));
	}
};
/**
 * 渲染XDOC的元素
 */
XDoc.render = function() {
    var eles = document.getElementsByTagName('script');
    for (var i = 0; i < eles.length; i++ ){
        if (eles[i].getAttribute("type") == "text/xdoc") {
    		var xdoc = eles[i].getAttribute("_xdoc");
    		if (!xdoc) {
    			xdoc = eles[i].innerHTML;
    		}
    		var func = eles[i].getAttribute("_func");
    		if (!func) {
    			func = "to";
    		}
    		var format = eles[i].getAttribute("_format");
    		if (!format) {
    			format = "";
    		}
    		var iframe = document.createElement("iframe");
    		var atts = eles[i].attributes;
    		var params = {};
    		for (var j = 0; j < atts.length; j++) {
    			if (atts[j].name != "style"
    				&& atts[j].name != "type"
    				&& atts[j].name != "_xdoc"
    				&& atts[j].name != "_func"
    				&& atts[j].name != "_format") {
    				params[atts[j].name] = atts[j].value;
    			}
    			if (atts[j].name != "type") {
    				iframe.setAttribute(atts[j].name, atts[j].value);
    			}
    		}
    		var iframeName;
    		if (iframe.getAttribute("id")) {
    			iframeName = "_xdoc_" + iframe.getAttribute("id");
    		} else {
    			iframeName = "_xdoc_" + XDoc._iframe++;
    		}
    		iframe.setAttribute("name", iframeName);
    		iframe.setAttribute("frameborder", "0");
    		eles[i].parentNode.replaceChild(iframe, eles[i]);
    		iframe._params = params;
    		if (func == "run") {
    			XDoc.run(xdoc, format, params, iframeName);
				iframe.to = function(tarFormat, target) {
					XDoc.run(this._params._xdoc, tarFormat, this._params, target);
				};
    		} else {
    			XDoc.to(xdoc, format, params, iframeName);
				iframe.to = function(tarFormat, target) {
					XDoc.to(this._params._xdoc, tarFormat, this._params, target);
				};
    		}
        }
    }
};
//信息
XDoc.msg = {
	BuilderContainerNotFound:"找不到设计器容器:{0}",
	BuilderNotFound:"找不到设计器:{0}",
	FormContainerNotFound:"找不到表单容器:{0}",
	FormNotFound:"找不到表单:{0}",
	XDocServerIsNull:"XDoc.server未设置"
};
/*------------------------------------------------*\
 * XDOC 基础JS，不要直接引用
\*------------------------------------------------*/
XDoc._form = function(id, xdoc, param, xparam) {
	if (xparam) { //动态表单
		if (xparam instanceof Array) {
			xparam = {_xdata:xparam};
		}
		xparam._func = "run";
		xparam._key = XDoc.key;
		xparam._format= "xdoc";
		xparam._xdoc= xdoc;
		XDoc._ajax.post({"url":XDoc.server + "/xdoc","params":xparam,"xtra":{"url":xdoc,"param":param,"id":id},"callback":function(success, http, xtra) {
			if (success) {
				var text = http.responseText;
				text = XDoc._trim(text);
				if (!XDoc._isJsonOrXml(text)) {
					text = xtra.url;
				}
			} else {
				text = xtra.url;
			}
			XDoc._form(xtra.id, text, xtra.param);
		}});
		return;
	}
	var container = document.getElementById(id);
	if (container) {
		var formId = XDoc._formId(id);
		var fvar = "id=_xform_&cid=" + encodeURIComponent(id)
			+ (param._id ? "&xid=" + param._id : "")
			+ "&xdocServer=" + encodeURIComponent(XDoc.server) 
			+ "&key=" + encodeURIComponent(XDoc.key) 
			+ (param.locale ? "&locale=" + encodeURIComponent(param.locale) : "") 
			+ "&readFormat=xdoc%2Cjson%2Cdoc%2Cdocx%2Cepub%2Crtf%2Chtml%2Chtm%2Ctxt%2Cppt%2Cpptx%2Cxls%2Cxlsx%2Czip%2Cpdf%2Cjar%2Cjpd%2Ccsv%2Cgif%2Cpng%2Cjpg%2Cwps%2Cdot%2Cfpd%2Cmd%2Cas%2Cc%2Ccpp%2Ccs%2Ccss%2Cpas%2Cdtd%2Cfor%2Cgrv%2Cjava%2Cjs%2Cjsp%2Cmxml%2Cperl%2Cphp%2Cproperties%2Cpy%2Crb%2Csql%2Csh%2Cbat%2Cxml&writeFormat=pdf%2Cdocx%2Cxls%2Chtm%2Ctxt%2Cpng%2Cxdoc";
		container._xdoc = {xdoc:xdoc,param:param};
		container.innerHTML = "<object id='" + formId + "' classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000' codebase='http://fpdownload.macromedia.com/get/flashplayer/current/swflash.cab' width='100%' height='100%'>"
			+ "<param name='movie' value='" + XDoc.server + "/" + "fpd.swf'>"
			+ "<param name='FlashVars' value='" + fvar + "'>"
			+ "<param name='quality' value='high'>"
			+ "<param name='bgcolor' value='#869ca7'>"
			+ "<param name='allowScriptAccess' value='always'>"
			+ "<param name='allowFullScreen' value='true'>"
			+ "<comment>"
			+ "<embed id='" + formId + "__' src='" + XDoc.server + "/" + "fpd.swf' quality='high' bgcolor='#869ca7'"
			+ "width='100%' height='100%' name='" + formId + "' align='middle'"
			+ "play='true' loop='false' allowScriptAccess='always' allowFullScreen='true' type='application/x-shockwave-flash'"
			+ "FlashVars='" + fvar + "'"
			+ "pluginspage='http://www.adobe.com/go/getflashplayer'>"
			+ "</embed>"
			+ "</comment>"
			+ "</object>";
	} else {
		alert(XDoc._format(XDoc.msg.FormContainerNotFound, id));
	}
};
//表单ID
XDoc._formId = function(id) {
	return "_xform_" + id;
};
//表单参数
XDoc._formParam = function(id) {
	var container =	document.getElementById(id);
	if (container && container._xdoc) {
		return container._xdoc.param;
	} else {
		return {};
	}
};
//fpd.swf初始化完成后调用
function on_xform_Init(id) {
	var form = XDoc.form(id);
	if (form) {
		var param = XDoc._formParam(id);
		form.open(document.getElementById(id)._xdoc.xdoc);
		if (param.onInit) {
			param.onInit(form);
		}
	}
}
//fpd初始化完成后调用
function on_xform_Open(id) {
	var param = XDoc._formParam(id);
	if (param.onSave) {
		XDoc.form(id).setAction("js:on_xform_Save('" + id + "')")
	}
	if (param.onLoad) {
		param.onLoad(XDoc.form(id));
	}
}
//fpd保存时调用
function on_xform_Save(id) {
	var param = XDoc._formParam(id);
	if (param.onSave) {
		param.onSave(XDoc.form(id));
	}
}
//fpd数据改变时调用
function on_xform_DataChange(item, id) {
	var param = XDoc._formParam(id);
	if (param.onChange) {
		param.onChange(XDoc.form(id), item);
	}
}
//fpd外部选择调用
function on_xform_Select(item, id) {
	var param = XDoc._formParam(id);
	if (param.onSelect) {
		param.onSelect(XDoc.form(id), item);
	}
}
XDoc._isJsonOrXml = function(str) {
	return str.length > 0 
		&& (str.charAt(0) == "{"
			|| str.charAt(0) == "["
			|| str.charAt(0) == "<");
};
XDoc._isServerURL = function(url) {
	return url.length > 2 && url.charAt(0) == "." && url.charAt(1) == "/"
		|| url.length > 5 && (url.substring(0, 5) == "data:" || url.substring(0, 5) == "text:");
};
XDoc._trim = function(str) { 
	str = str.replace(/^\s\s*/, '');
	ws = /\s/;
	i = str.length;
	while (ws.test(str.charAt(--i)));
	return str.slice(0, i + 1);
};
XDoc._invoke = function(func, xdoc, tarFormat, param, target) {
	if (!param) {
		param = {};
	} else if (param instanceof Array) {
		param = {_xdata:param};
	}
	param._func = func;
	param._key = XDoc.key;
	if (tarFormat) {
		param._format = tarFormat;
	}
	if (!xdoc) {
		xdoc = "";
	}
	if (typeof(xdoc) == "object") { //json式xdoc，转换为json串
		xdoc = JSON.stringify(xdoc);
	}
	xdoc = XDoc._trim(xdoc);
	if (!XDoc._isJsonOrXml(xdoc) && !XDoc._isServerURL(xdoc)) {
		//url地址，用Ajax获取xdoc
		XDoc._ajax.get({"url":xdoc,"xtra":{"url":xdoc,"param":param,"target":target},"callback":function(success, http, xtra) {
			if (success) {
				var text = http.responseText;
				if (text) {
					text = XDoc._trim(text);
					if (!XDoc._isJsonOrXml(text)) {
						xtra.param._xdoc = xtra.url;
					} else {
						xtra.param._xdoc = text;
					}
				} else {
					xtra.param._xdoc = xtra.url;
				}
			} else {
				xtra.param._xdoc = xtra.url;
			}
			XDoc._submit(xtra.param, xtra.target);
		}});
		return;
	}
	param._xdoc = xdoc;
	XDoc._submit(param, target);
};
XDoc._submit = function(param, target) {
	if (XDoc.server != "") {
		if (!param.__ajaxXData
		    && typeof(param._xdata) == "string") {
			param._xdata = XDoc._trim(param._xdata);
			if (param._xdata.length > 0
					&& !XDoc._isJsonOrXml(param._xdata)) {
				//url地址，用Ajax获取内容
				XDoc._ajax.get({"url":param._xdata,"xtra":{"param":param,"target":target},"callback":function(success, http, xtra) {
					if (success) {
						var text = http.responseText;
						if (text) {
							text = XDoc._trim(text);
							if (XDoc._isJsonOrXml(text)) {
								xtra.param._xdata = text;
							}
						}
					}
					//防止嵌套
					xtra.param.__ajaxXData = true;
					XDoc._submit(xtra.param, xtra.target);
				}});
				return;
			}
		}
		delete param.__ajaxXData;
		var formId = "__xdocform";
		var form = document.getElementById(formId);
		if (form == null) {
			form = document.createElement("form");
			form.id = formId;
			form.style.display = "none";
			document.body.appendChild(form);
			form.method = 'post';
			//使用utf-8
			form.acceptCharset = "UTF-8";
			if (!+[1,]) {
				//让IE支持acceptCharset
				var el = document.createElement("input");
				el.setAttribute("name", "_charset_");
				el.setAttribute("value", "♥");
				form.appendChild(el);
			}
		} else {
			form.innerHTML = "";
		}
		form.action = XDoc.server + "/xdoc";
		if (target == undefined) {
			target = "_self";
		} else if (typeof(target) == "object") {
			var iframeName = "_xdoc_" + (XDoc._iframe++);
			target.innerHTML = "<iframe name='" + iframeName + "' frameborder=0 style='width:100%;height:100%'></iframe>";
			target = iframeName;
		}
		form.target = target;
		if (param) {
			param._de = "true";
			for(a in param) {
				var el = document.createElement("input");
				el.setAttribute("id", formId + a);
				el.setAttribute("name", a);
				el.setAttribute("type", "hidden");
				form.appendChild(el);
				if (typeof(param[a]) == "object") {
					document.getElementById(formId + a).value = JSON.stringify(param[a]);
				} else {
					document.getElementById(formId + a).value = param[a];
				}
				if (a != "_de") {
					document.getElementById(formId + a).value = encodeURIComponent(document.getElementById(formId + a).value);
				}
			}
		}
		form.submit();
	} else {
		alert(XDoc._format(XDoc.msg.XDocServerIsNull));
	}
};
XDoc._format = function(msg, p0, p1, p2) {
	if (msg == undefined) {
		return "";
	}
    var key = "";
    var str = "";
    for (var i = 0; i < msg.length; i++) {
        if (msg.charAt(i) == '{') {
            i++;
            key = "";
            while (i < msg.length) {
                if (msg.charAt(i) == '}') {
                	if (key == "0") {
                		str += p0 == undefined ? "" : p0;
                	} else if (key == "1") {
                		str += p1 == undefined ? "" : p1;
                	} else if (key == "2") {
                		str += p2 == undefined ? "" : p2;
                	}
                    break;
                } else {
                    key += msg.charAt(i++);
                }
            }
        } else {
            str += msg.charAt(i);
        }
    }
    return str;
};
XDoc._ajax = {
    /**
     * Starts a request
     * args = {};
     * @param string args.method        GET or POST
     * @param string args.url           Request URL
     * @param integer args.tries        Maximum request tries
     * @param mixed args.params         Params that will be sent to URL
     * @param function args.callback    Function that will receive the request object
     * @param function args.filter      Function that will receive every param you send
     * @param function args.onload
     * @param function args.onrequest
     * @param function args.xtra        Callback arguments
     */
    'request': function(args)
    {
        var http = this.create(), self = this, tried = 0, tmp, i, j;
        var onload, onrequest, filter, callback, tries, url, method, xtra, params;
        
        onload = args.onload;
        onrequest = args.onrequest;
        filter = args.filter;
        callback = args.callback;
        tries = args.tries;
        url = args.url;
        method = args.method;
        xtra = args.xtra;
        params = args.params;
        method = method.toLowerCase();
        if (params) {
            if (typeof params == 'object') {
                tmp = [];
                for (i in params) {
                    j = params[i];
                    tmp.push(i + '=' + (typeof filter == 'function'? filter.call(null, j) : encodeURIComponent(j)));
                }
                params = tmp.join('&');
            }
            if (method == 'get') {
				url += url.indexOf('?') == -1? '?' + params : '&' + params;
			}
        }
        try {
	        http.open(method, url, true);
	        if (method == 'post') {
				http.setRequestHeader('Method', 'POST ' + url + ' HTTP/1.1');
				http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
			} else {
				params = null;
			}
	        http.onreadystatechange = function()
	        {
	            if (http.readyState != 4) {
	                return;
	            }
	            if (typeof onload == 'function') {
					onload.call();
				}
	            if (http.status == 200) {
	                if (typeof callback == 'function') {
	                    callback.call(null, true, http, xtra);
	                }
	            } else {
	                if (tries > 0) {
	                    if (tried < tries) {
							tried++;
							http.abort();
							http.send(params);
						}
	                } else if (typeof callback == 'function') {
	                	if (typeof callback == 'function') {
	    					callback.call(null, false, http, xtra);
	    				}
					}
	            }
	        };
	        if (typeof onrequest == 'function') {
				onrequest.call();
			}
	        http.send(params);
        } catch (e) {
        	if (typeof callback == 'function') {
				callback.call(null, false, http, xtra);
			}
        }
        return http;
    }
    ,
    /**
     * Creates XMLHttpRequest
     */
    'create': function()
    {
        var http;
        try {
            http = new XMLHttpRequest();
        } catch (e) {
            try {
                http = new ActiveXObject('Msxml2.XMLHTTP');
            } catch (f) {
                try {
                    http = new ActiveXObject('Microsoft.XMLHTTP');
                } catch (g) { null; }
            }
        }
        return http;
    }
    ,
    'get': function(args)
    {
        args.method = 'GET';
        this.request(args);
    }
    ,
    'post': function(args)
    {
        args.method = 'POST';
        this.request(args);
    }
};
/*
    json2.js
    2013-05-26
*/

// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

if (typeof JSON !== 'object') {
    JSON = {};
}

(function () {
    'use strict';

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function () {

            return isFinite(this.valueOf())
                ? this.getUTCFullYear()     + '-' +
                    f(this.getUTCMonth() + 1) + '-' +
                    f(this.getUTCDate())      + 'T' +
                    f(this.getUTCHours())     + ':' +
                    f(this.getUTCMinutes())   + ':' +
                    f(this.getUTCSeconds())   + 'Z'
                : null;
        };

        String.prototype.toJSON      =
            Number.prototype.toJSON  =
            Boolean.prototype.toJSON = function () {
                return this.valueOf();
            };
    }

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        },
        rep;


    function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c === 'string'
                ? c
                : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) + '"' : '"' + string + '"';
    }


    function str(key, holder) {

// Produce a string from holder[key].

        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

        if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

// What happens next depends on the value's type.

        switch (typeof value) {
        case 'string':
            return quote(value);

        case 'number':

// JSON numbers must be finite. Encode non-finite numbers as null.

            return isFinite(value) ? String(value) : 'null';

        case 'boolean':
        case 'null':

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.

            return String(value);

// If the type is 'object', we might be dealing with an object or an array or
// null.

        case 'object':

// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.

            if (!value) {
                return 'null';
            }

// Make an array to hold the partial results of stringifying this object value.

            gap += indent;
            partial = [];

// Is the value an array?

            if (Object.prototype.toString.apply(value) === '[object Array]') {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                v = partial.length === 0
                    ? '[]'
                    : gap
                    ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']'
                    : '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }

// If the replacer is an array, use it to select the members to be stringified.

            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    if (typeof rep[i] === 'string') {
                        k = rep[i];
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            } else {

// Otherwise, iterate through all of the keys in the object.

                for (k in value) {
                    if (Object.prototype.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

            v = partial.length === 0
                ? '{}'
                : gap
                ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}'
                : '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
    }

// If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

            var i;
            gap = '';
            indent = '';

// If the space parameter is a number, make an indent string containing that
// many spaces.

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }

// If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === 'string') {
                indent = space;
            }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                    (typeof replacer !== 'object' ||
                    typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }

// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.

            return str('', {'': value});
        };
    }


// If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with '()' and 'new'
// because they can cause invocation, and '=' because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
// replace all simple value tokens with ']' characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or ']' or
// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

            if (/^[\],:{}\s]*$/
                    .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
                        .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                        .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                j = eval('(' + text + ')');

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                return typeof reviver === 'function'
                    ? walk({'': j}, '')
                    : j;
            }

// If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError('JSON.parse');
        };
    }
}());
XDoc._B64 = {
    alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
    lookup: null,
    ie: /MSIE /.test(navigator.userAgent),
    ieo: /MSIE [67]/.test(navigator.userAgent),
    encode: function (s) {
        var buffer = XDoc._B64.toUtf8(s),
            position = -1,
            len = buffer.length,
            nan0, nan1, nan2, enc = [, , , ];
        if (XDoc._B64.ie) {
            var result = [];
            while (++position < len) {
                nan0 = buffer[position];
                nan1 = buffer[++position];
                enc[0] = nan0 >> 2;
                enc[1] = ((nan0 & 3) << 4) | (nan1 >> 4);
                if (isNaN(nan1))
                    enc[2] = enc[3] = 64;
                else {
                    nan2 = buffer[++position];
                    enc[2] = ((nan1 & 15) << 2) | (nan2 >> 6);
                    enc[3] = (isNaN(nan2)) ? 64 : nan2 & 63;
                }
                result.push(XDoc._B64.alphabet.charAt(enc[0]), XDoc._B64.alphabet.charAt(enc[1]), XDoc._B64.alphabet.charAt(enc[2]), XDoc._B64.alphabet.charAt(enc[3]));
            }
            return result.join('');
        } else {
            var result = '';
            while (++position < len) {
                nan0 = buffer[position];
                nan1 = buffer[++position];
                enc[0] = nan0 >> 2;
                enc[1] = ((nan0 & 3) << 4) | (nan1 >> 4);
                if (isNaN(nan1))
                    enc[2] = enc[3] = 64;
                else {
                    nan2 = buffer[++position];
                    enc[2] = ((nan1 & 15) << 2) | (nan2 >> 6);
                    enc[3] = (isNaN(nan2)) ? 64 : nan2 & 63;
                }
                result += XDoc._B64.alphabet[enc[0]] + XDoc._B64.alphabet[enc[1]] + XDoc._B64.alphabet[enc[2]] + XDoc._B64.alphabet[enc[3]];
            }
            return result;
        }
    },
    toUtf8: function (s) {
        var position = -1,
            len = s.length,
            chr, buffer = [];
        if (/^[\x00-\x7f]*$/.test(s)) while (++position < len)
            buffer.push(s.charCodeAt(position));
        else while (++position < len) {
            chr = s.charCodeAt(position);
            if (chr < 128) 
                buffer.push(chr);
            else if (chr < 2048) 
                buffer.push((chr >> 6) | 192, (chr & 63) | 128);
            else 
                buffer.push((chr >> 12) | 224, ((chr >> 6) & 63) | 128, (chr & 63) | 128);
        }
        return buffer;
    }
};
XDoc._ready = function(func){
    if ( document.addEventListener ) {
        window.addEventListener( "load", func, false );
    }else  if ( document.attachEvent ){
        window.attachEvent( "onload", func);
    }
};
if (XDoc.server == "") {
	var eles = document.getElementsByTagName('script');
	for (var i = 0; i < eles.length; i++ ){
		var src = eles[i].getAttribute("src");
		if (src && src.length > 7 && src.substring(src.length - 8) == "/xdoc.js") {
			XDoc.server = src.substring(0, src.length - 8);
			break;
		}
	}
}
XDoc._iframe = 0;
XDoc._ready(function(){
	XDoc.render();
});