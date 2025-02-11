import {Icon, Style} from "ol/style";
import {Feature} from "ol";
import {Point} from "ol/geom";
import {Vector as VectorSource} from "ol/source";
import {Vector as VectorLayer} from "ol/layer";

var formartDate = function(date, fmt) {
	if(date == undefined || date == null||date.toString().trim().length<=0) {
		return "";
	}
  if(typeof date === 'string'){
    date = new Date(date);
  }
  date = date == undefined ? new Date() : date;
  date = typeof date == 'number' ? new Date(date) : date;
  if(date == undefined || date == null||date.toString().trim().length<=0) {
    return "";
  }
  if(date.length==6 && typeof date == 'object' ){
    let res =  date[0] +"-"+date[1] +"-"+date[2] +" "+date[3] +":"+date[4] +":"+date[5];
    return  res;
  }
	fmt = fmt || 'yyyy-MM-dd HH:mm:ss';
	var obj = {
		'y': date.getFullYear(), // 年份，注意必须用getFullYear
		'M': date.getMonth() + 1, // 月份，注意是从0-11
		'd': date.getDate(), // 日期
		'q': Math.floor((date.getMonth() + 3) / 3), // 季度
		'w': date.getDay(), // 星期，注意是0-6
		'H': date.getHours(), // 24小时制
		'h': date.getHours() % 12 == 0 ? 12 : date.getHours() % 12, // 12小时制
		'm': date.getMinutes(), // 分钟
		's': date.getSeconds(), // 秒
		'S': date.getMilliseconds() // 毫秒
	};
	var week = ['天', '一', '二', '三', '四', '五', '六'];
	for(var i in obj) {
		fmt = fmt.replace(new RegExp(i + '+', 'g'), function(m) {
			var val = obj[i] + '';
			if(i == 'w') return(m.length > 2 ? '星期' : '周') + week[val];
			for(var j = 0, len = val.length; j < m.length - len; j++) val = '0' + val;
			return m.length == 1 ? val : val.substring(val.length - m.length);
		});
	}
	return fmt;
};
var nginxUrl="/tempfile";
//var nginxUrl="http://localhost:8807/";



/**
 *
 * @param res 数据
 * @param layerName 图层名称
 * @param IconName 图标代理位置
 * @constructor
 */
var mapPointShow = function(res,layerName,IconPath) {
  var _this = this;
    if(!IconPath){
      IconPath="/img/wzsb.png";
    }
    if(layerName){
      layerName="";
    }
    if(res.data && res.data.length>0){
      let datas = res.data;
      //坐标点样式
      let pointStyle = new Style({
        image: new Icon({
          anchor: [0.5, 46],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          src: IconPath
        })
      });
      //存放读取的坐标点
      let pointSourceArr = [];
      for (let i = 0; i < datas.length ; i++) {
        if(datas[i].coordinate || datas[i].position ||datas[i].mapLocation){
          //统一坐标字段
          if(datas[i].position){
            datas[i].coordinate=datas[i].position;
          }
          if(datas[i].mapLocation){
            datas[i].coordinate=datas[i].mapLocation;
          }
          //将三位点转换为二维点
          let jsonCoordinate = JSON.parse(datas[i].coordinate);
          let data = [];
          data.push(jsonCoordinate[0]);
          data.push(jsonCoordinate[1]);
          //创建图标特性
          var feature = new Feature({
            geometry: new Point(data),
            name: datas[i].name,
            type:"icon",
          });
          feature.setStyle(pointStyle);
          //将图标特性添加进矢量中
          pointSourceArr.push(feature);
        }

      }
      var vectorSource = new VectorSource({
        features: pointSourceArr,
      });
      //创建矢量层
        let vectorLayer = new VectorLayer({
        source: vectorSource,
        style: pointStyle,
        name:layerName,
      });
      //返回图层
      return vectorLayer;
    }else {
      _this.$Message.error("无数据");
    }

};
function isUndefinedOrnull(item){
  if(item==undefined||item==null){
    return true;
  }
  return false;
}

function json_format(txt, compress) {
  var indentChar = '    ';
  if (/^\s*$/.test(txt)) {
    console.log('数据为空,无法格式化! ');
    return;
  }
  try {
    var data = eval('(' + txt + ')');
  } catch (e) {
    console.log('数据源语法错误,格式化失败! 错误信息: ' + e.description, 'err');
    return;
  }
  var draw = [], last = false, This = this, line = compress ? '' : '\n', nodeCount = 0, maxDepth = 0;

  var notify = function (name, value, isLast, indent/*缩进*/, formObj) {
    nodeCount++;
    /*节点计数*/
    for (var i = 0, tab = ''; i < indent; i++)tab += indentChar;
    /* 缩进HTML */
    tab = compress ? '' : tab;
    /*压缩模式忽略缩进*/
    maxDepth = ++indent;
    /*缩进递增并记录*/
    if (value && value.constructor == Array) {/*处理数组*/
      draw.push(tab + (formObj ? ('"' + name + '":') : '') + '[' + line);
      /*缩进'[' 然后换行*/
      for (var i = 0; i < value.length; i++)
        notify(i, value[i], i == value.length - 1, indent, false);
      draw.push(tab + ']' + (isLast ? line : (',' + line)));
      /*缩进']'换行,若非尾元素则添加逗号*/
    } else if (value && typeof value == 'object') {/*处理对象*/
      draw.push(tab + (formObj ? ('"' + name + '":') : '') + '{' + line);
      /*缩进'{' 然后换行*/
      var len = 0, i = 0;
      for (var key in value)len++;
      for (var key in value)notify(key, value[key], ++i == len, indent, true);
      draw.push(tab + '}' + (isLast ? line : (',' + line)));
      /*缩进'}'换行,若非尾元素则添加逗号*/
    } else {
      if (typeof value == 'string') value = '"' + value + '"';
      draw.push(tab + (formObj ? ('"' + name + '":') : '') + value + (isLast ? '' : ',') + line);
    }
  };
  var isLast = true, indent = 0;
  notify('', data, isLast, indent, false);
  return draw.join('');
}

function format(txt, compress) {
  var indentChar = ' ';
  if (/^\s*$/.test(txt)) {
    console.log('数据为空,无法格式化! ');
    return;
  }
  try {
    var data = eval('(' + txt + ')');
  }
  catch (e) {
    console.log('数据源语法错误,格式化失败! 错误信息: ' + e.description, 'err');
    return;
  }
  var draw = [], last = false, This = this, line = compress ? '' : '\n', nodeCount = 0, maxDepth = 0;

  var notify = function (name, value, isLast, indent/*缩进*/, formObj) {
    nodeCount++;
    /*节点计数*/
    for (var i = 0, tab = ''; i < indent; i++)tab += indentChar;
    /* 缩进HTML */
    tab = compress ? '' : tab;
    /*压缩模式忽略缩进*/
    maxDepth = ++indent;
    /*缩进递增并记录*/
    if (value && value.constructor == Array) {/*处理数组*/
      draw.push(tab + (formObj ? ('"' + name + '":') : '') + '[' + line);
      /*缩进'[' 然后换行*/
      for (var i = 0; i < value.length; i++)
        notify(i, value[i], i == value.length - 1, indent, false);
      draw.push(tab + ']' + (isLast ? line : (',' + line)));
      /*缩进']'换行,若非尾元素则添加逗号*/
    } else if (value && typeof value == 'object') {/*处理对象*/
      draw.push(tab + (formObj ? ('"' + name + '":') : '') + '{' + line);
      /*缩进'{' 然后换行*/
      var len = 0, i = 0;
      for (var key in value)len++;
      for (var key in value)notify(key, value[key], ++i == len, indent, true);
      draw.push(tab + '}' + (isLast ? line : (',' + line)));
      /*缩进'}'换行,若非尾元素则添加逗号*/
    } else {
      if (typeof value == 'string') value = '"' + value + '"';
      draw.push(tab + (formObj ? ('"' + name + '":') : '') + value + (isLast ? '' : ',') + line);
    }
  }
  var isLast = true, indent = 0;
  notify('', data, isLast, indent, false);
  return draw.join('');
}

/**
 * @description 转换时间
 * @param {String} time 时间
 */
function timeFormat(time, format = 'YYYY-MM-DD') {
  let newTime = require('dayjs')(time).format(format)
  if (!time) {
    newTime = ''
  }
  return newTime
}
/**
 * 根据身份证号码获取性别

 * @param idCard
 */
let getBirth = function (idCard) {
  var birthday = "";
  if(idCard != null && idCard != ""){
    if(idCard.length == 15){
      birthday = "19"+idCard.slice(6,12);
    } else if(idCard.length == 18){
      birthday = idCard.slice(6,14);
    }
    birthday = birthday.replace(/(.{4})(.{2})/,"$1-$2-");
    //通过正则表达式来指定输出格式为:1990-01-01
  }
  return birthday;
}
/**
 *  根据身份证号码获取出生日期
 * @param idCard
 */
let  getSex = function (idCard) {
  var sexStr = '';
  if (parseInt(idCard.slice(-2, -1)) % 2 == 1) {
    sexStr = '男';
  }
  else {
    sexStr = '女';
  }
  return sexStr;
}
/**
 * json格式转树状结构
 * @param   {json}      json数据
 * @param   {String}    id的字符串
 * @param   {String}    父id的字符串
 * @param   {String}    children的字符串
 * @return  {Array}     数组
 */
function transData(a, idStr, pidStr, chindrenStr){
  var r = [], hash = {}, id = idStr, pid = pidStr, children = chindrenStr, i = 0, j = 0, len = a.length;
  for(; i < len; i++){
    hash[a[i][id]] = a[i];
  }
  for(; j < len; j++){

    var aVal = a[j], hashVP = hash[aVal[pid]];
    a[j].value = a[j][id];
    if(hashVP){
      !hashVP[children] && (hashVP[children] = []);
      hashVP[children].push(aVal);
    }else{
      r.push(aVal);
    }
  }
  return r;
}
let center = [105.438274, 28.885871]//泸州
export {formartDate,nginxUrl,mapPointShow,isUndefinedOrnull,json_format,format,timeFormat,getBirth,getSex,center,transData};
