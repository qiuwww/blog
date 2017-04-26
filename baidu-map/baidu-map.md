
# 百度地图开发

[TOC]

## 开发首页
http://lbsyun.baidu.com/index.php

## 自定义地图代码
http://api.map.baidu.com/lbsapi/createmap/index.html

## 实例
http://lbsyun.baidu.com/jsdemo.htm#f0_1

## API接口
http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference.html#a0b0
Map:此类是地图API的核心类，用来实例化一个地图。包括地图实例上的各种事件，click，dblclick，zoomend，moveend，dragend。

## 定制地图的样式
http://developer.baidu.com/map/custom/

## 检索实例
http://lbsyun.baidu.com/jsdemo.htm#i1_1

## 定位实例  都不准
http://lbsyun.baidu.com/jsdemo.htm#i8_1
基于HTML5的 navigator.geolocation 
这里 BMap.Geolocation 

## 百度地图的原理   
1. 加载图片示例 
http://online4.map.bdimg.com/tile/?qt=tile&x=1582&y=587&z=13&styles=pl&scaler=1&udt=20170420

2. 加载当前的地图的信息 
http://api.map.baidu.com/?qt=cen&b=12951635.02%2C4815295.77%3B12964594.98%2C4838495.85&l=13&ie=utf-8&oue=1&fromproduct=jsapi&callback=BMap._rd._cbk55919&ak=E4805d16520de693a3fe707cdc962045

3. 查询poi事件的信息 
http://online1.map.bdimg.com/js/?qt=vQuest&styles=pl&x=1581&y=589&z=13&v=056&fn=MPC_Mgr.TANGRAM__1.getPoiData

4. 加载api.js
插入一个script标签来加载script代码，请求添加了一些用户的信息
**可用ak**
6usbEbwRrAoG37xItcWMdwZM6aq6tBty

5. 地图的坐标系统
百度地图坐标转换说明：http://lbsyun.baidu.com/index.php?title=jspopular/guide/coorinfo
百度地图开发坐标问题总结：https://segmentfault.com/a/1190000008549028
坐标系转换实例：http://lbsyun.baidu.com/jsdemo.htm#a5_1
6. 百度地图的缩放等级
**百度地图，比例尺分别为：**
[1:20米（简称20米，后同），50米，100米，200米，500米，1公里，2公里，5公里，10公里，20公里，25公里，50公里，100公里，200公里，500公里，1000公里，2000公里，5000公里，10000公里]
**分别对应：**
[19级，18级，17级，16级，15级，14级，13级，12级，11级，10级，9级，8级，7级，6级，5级，4级，3级，2级，1级]
**提供的api可以支持3~19级，17个等级**
**根据实际情况限制缩放等级**
map.setMinZoom(5); // 设置最小缩放等级
map.setMaxZoom(19); // 设置最小缩放等级
7. 控件
```
// 缩放比例控件
var top_left_control = new BMap.ScaleControl({ anchor: BMAP_ANCHOR_TOP_LEFT }); // 左上角，添加比例尺
map.addControl(top_left_control);
var top_left_navigation = new BMap.NavigationControl(); //左上角，添加默认缩放平移控件 
map.addControl(top_left_navigation);
实例：http://lbsyun.baidu.com/jsdemo.htm#b0_2
```
8. 初始化地图：
```
map.centerAndZoom("中国",5);  // 初始化地图,设置中心点坐标和地图级别
map.enableScrollWheelZoom(); //支持滚轮缩放
map.enableKeyboard(); //开启键盘控制地图缩放与位置
map.setMinZoom(5); // 最小||最大缩放等级
map.setMaxZoom(19); // 缩放等级指示
// 地图的当前窗口的信息
var bs = map.getBounds(); //获取可视区域 
var bssw = bs.getSouthWest(); //可视区域左下角
var bsne = bs.getNorthEast(); //可视区域右上角
var center = map.getCenter();
var zoom = map.getZoom();
```
9. 地理解析器，解析地址信息为地图信息
批量地址解析实例: http://lbsyun.baidu.com/jsdemo.htm#i7_3
```
// 创建地址解析器实例
var myGeo = new BMap.Geocoder();
// 将地址解析结果显示在地图上,并调整地图视野
myGeo.getPoint(place, function (point) {
	if (point) {
		map.centerAndZoom(point, 19); // 这里控制显示单个公司的缩放等级	
			// 自定义覆盖物 
			var myIcon = new BMap.Icon(myIcon_img, new BMap.Size(23, 53));
			var marker = new BMap.Marker(point, { icon: myIcon }); // 创建标注
			map.addOverlay(marker); // 将标注添加到地图中
			var opts = {
				position: point, // 指定文本标注所在的地理位置
				offset: new BMap.Size(0, 0) //设置文本偏移量
			};
			var title = place;
			// place  = place.length > 20 ? place.substring(0,19) +"..." : place; 
			var html = '<div id="label">' + '<div class="label-header">' + '<div class="title ellipsis-display" title="' + name + '">' + name + '</div>' + '<div class="cancle">×</div>' + '</div>' + '<div class="addr-det">' + '<div class="addr" title = "' + title + '">' + place + '</div>' + '<div class="det popupIframe" data-href = "' + url + '">查看详情</div>' + '</div>' + '<div class="triangle">' + '</div>' + '</div>';

			var label = new BMap.Label(html, opts);

			label.setStyle({
				border: "none",
				borderRadius: "5px",
				boxShadow: "0 0 20px #666",
				transform: "translate(-120px,-160px)"
			});
			marker.setLabel(label);
			$("#label .cancle").click(function () {
				$(this).parents("#label").remove();
			});
			$("#label .det").click(function () {
				enterprise_map.open_iframe(url);
			});
		} else {
			alert("您选择地址没有解析到结果!");
		}
	}, place);
}

```

9. 创建label,位置-公司数量显示
```
map.clearOverlays();
var point, label;
data.forEach(function (item, index) {
var _label$setStyle;
point = new BMap.Point(item.lng, item.lat);
var opts = {
	position: point, // 指定文本标注所在的地理位置
	offset: new BMap.Size(0, 0) //设置文本偏移量
};
label = new BMap.Label("<p data-area='" + item.name + "' data-lat ='" + item.lat + "' data-lng ='" + item.lng + "'>" + item.num + "</p>", opts);
label.setStyle((_label$setStyle = {
	color: "#fff",
	fontSize: "16px",
	height: "18px",
	lineHeight: "18px",
	fontWeight: "blod",
	border: "none",
	backgroundColor: color
}, _defineProperty(_label$setStyle, 'height', r + "px"), _defineProperty(_label$setStyle, 'width', r + "px"), _defineProperty(_label$setStyle, 'lineHeight', r + "px"), _defineProperty(_label$setStyle, 'textAlign', "center"), _defineProperty(_label$setStyle, 'borderRadius', r / 2 + "px"), _defineProperty(_label$setStyle, 'opacity', "0.8"), _defineProperty(_label$setStyle, 'boxShadow', "0 0 20px " + color), _defineProperty(_label$setStyle, 'transform', "translate(-50%,-50%)"), _label$setStyle));

var timeIdLabel,
    flag = true;
label.addEventListener("click", function (e) {
	var target = e.target;
	flag = true;
	timeIdLabel = setTimeout(function () {
		if (flag) {
			// debugger
			var center = $(target.content).data("area");
			render_listAndMap(center, true); //不刷新右侧的地图
		}
	}, 200);
});
label.addEventListener("dblclick", function (e) {
	var target = e.target;
	clearTimeout(timeIdLabel);
	clearTimeout(baidu_map.state.moveTimeID);
	// debugger
	flag = false;
	var center = $(target.content).data("area");
	var lat = $(target.content).data("lat");
	var lng = $(target.content).data("lng");
	render_listAndMap(center, false, lat, lng); //同时刷新地图与公司列表
});
map.addOverlay(label);
// 缩放事件
zoomend: function zoomend(map) {
	var that = this;
	map.addEventListener("zoomend", function (e) {
		that.state.moveTimeID = setTimeout(function () {
			console.log("zoomend");
			var detail = baidu_map.detailMessage();
			if (baidu_map.state.isMouseOver) {
				// debugger
				enterprise_map.area_get_data();
			}
		}, 200);
	});
},
dragend: function dragend() {
	var map = this.map;
	map.addEventListener("dragend", function (e) {
		if (baidu_map.state.isMouseOver) {
			// debugger
			enterprise_map.area_get_data();
		}
	});
}
});
```
## 静态图API
http://lbsyun.baidu.com/index.php?title=static
实例：http://api.map.baidu.com/staticimage/v2?ak=6usbEbwRrAoG37xItcWMdwZM6aq6tBty&mcode=666666&center=116.403874,39.914888&width=500&height=500&zoom=11

## 覆盖物信息 overlay  主要就是标注物，lable提示框，自定义信息窗口，自定义图层
1. marker || polyline 
	**在地图的下一层，可以透过覆盖物点击下边的poi点的事件**
	map.addOverlay(marker);            //增加点
	map.addOverlay(polyline);          //增加折线
	map.addOverlay(circle);            //增加圆
	map.addOverlay(polygon);           //增加多边形
	map.addOverlay(rectangle);         //增加矩形
	**当然也可以自定义** 
	http://lbsyun.baidu.com/jsdemo.htm#c1_16
2. label 在地图地图图层的上一层
```
	var opts = {
	  position : point,    // 指定文本标注所在的地理位置
	  offset   : new BMap.Size(30, -30)    //设置文本偏移量
	}
	var html = "欢迎使用百度地图，这是一个简单的文本标注哦~" || <h4>"欢迎使用百度地图，这是一个简单的文本标注哦~"</h4>; 
	var label = new BMap.Label(, opts);  // 创建文本标注对象
		label.setStyle({
			 color : "red",
			 fontSize : "12px",
			 height : "20px",
           	 border:"none",
             backgroundColor:"none",
			 lineHeight : "20px",
			 fontFamily:"微软雅黑"
		 });
	map.addOverlay(label); 
	marker.setLabel(label); 为marker添加文字标签
```
3. overlay 添加，获取目标与清除地图上的覆盖物
	map.addOverlay(label); 
	map.getOverlays();
	map.clearOverlays();
4. 点聚合
http://lbsyun.baidu.com/jsdemo.htm#c1_4
http://lbsyun.baidu.com/jsdemo.htm#c1_5

5. 信息窗口  支持html内容
```
var opts = {
	  width : 200,     // 信息窗口宽度
	  height: 100,     // 信息窗口高度
	  title : "海底捞王府井店" , // 信息窗口标题
	  enableMessage:true,//设置允许信息窗发送短息
	  message:"亲耐滴，晚上一起吃个饭吧？戳下面的链接看下地址喔~"
	}
	var infoWindow = new BMap.InfoWindow("地址：北京市东城区王府井大街88号乐天银泰百货八层", opts);  // 创建信息窗口对象 
	map.openInfoWindow(infoWindow,point); //开启信息窗口
```
6. 自定义图层 TileLayer
路况信息 http://lbsyun.baidu.com/jsdemo.htm#g0_3
## 地图类型 MapType
http://lbsyun.baidu.com/jsdemo.htm#k0_2