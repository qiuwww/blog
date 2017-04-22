

## 首页
http://lbsyun.baidu.com/
http://lbsyun.baidu.com/index.php?title=jspopular


## 实例
http://lbsyun.baidu.com/jsdemo.htm#f0_1


## API接口
http://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference.html#a0b0

## 定制
http://developer.baidu.com/map/custom/



## 基本的原理


1. 图片拼接;
2. 资源缓存；
3. 别的一些地图的对比；
4. 优缺点，相对于google地图；



## 基本使用

1. demo ；
2. 常用的接口；
3. 常用的操作；
4. 常用到的属性和事件（没有滚轮事件）；
# 基本实例

http://lbsyun.baidu.com/jsdemo.htm#b0_4


## 本次用到的一些方法和技术

初始化地图：

map.centerAndZoom(new BMap.Point(104.114129, 37.550339), 5); //定位中心，当前缩放等级
map.enableScrollWheelZoom(); //支持滚轮缩放
map.enableKeyboard(); //开启键盘控制地图缩放与位置
map.setMinZoom(5); // 最小||最大缩放等级
map.setMaxZoom(19);
// 缩放等级指示
var top_left_control = new BMap.ScaleControl({ anchor: BMAP_ANCHOR_TOP_LEFT }); // 左上角，添加比例尺
map.addControl(top_left_control);
var top_left_navigation = new BMap.NavigationControl(); //左上角，添加默认缩放平移控件 
map.addControl(top_left_navigation);

地图的当前窗口的信息

var bs = map.getBounds(); //获取可视区域
var bssw = bs.getSouthWest(); //可视区域左下角
var bsne = bs.getNorthEast(); //可视区域右上角
var center = map.getCenter();
var zoom = map.getZoom();

重新设置中心点和缩放等级
map.centerAndZoom(center, zoom);

地理解析器

// 创建地址解析器实例
var myGeo = new BMap.Geocoder();
// 将地址解析结果显示在地图上,并调整地图视野
myGeo.getPoint(place, function (point) {
	if (point) {
		map.centerAndZoom(point, 19); // 这里控制显示单个公司的缩放等级	
						// 自定义覆盖物 
						var myIcon = new BMap.Icon(myIcon_img, new BMap.Size(23, 53));
						var marker2 = new BMap.Marker(point, { icon: myIcon }); // 创建标注
						map.addOverlay(marker2); // 将标注添加到地图中
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
						marker2.setLabel(label);
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


创建label
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
			},