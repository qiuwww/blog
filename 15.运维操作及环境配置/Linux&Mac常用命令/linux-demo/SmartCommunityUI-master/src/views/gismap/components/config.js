/*

				 *type代表地图服务类型:
				 0代表ArcGisMapServerImageryProvider;
				 1代表createOpenStreetMapImageryProvider;
				 2代表WebMapTileServiceImageryProvider;
				 3代表createTileMapServiceImageryProvider;
				 4 代表UrlTemplateImageryProvider;
				 5 代表WebMapServiceImageryProviderr(WMS);
				 6 代表kml,kmz;
				 7 代表geoJson;
				 8代表3dtiles;
				 */
/*
 * 实例：{
 * 	id: 212,//树ID 必填
	name: "万象汇", //树显示名 必填
	layerurl: "http://192.168.30.55:9002/api/folder/b1fd5e3af02447eab78b9e2d3dfd4398",//图层url（3dTile 图层url 不添加后面的 title.json） 必填
	layerid: "NAD_ZDZK",//图层ID
	IsWebMercatorTilingScheme: true, //是否创建摩卡托投影坐标系,默认是地理坐标系 必填
	type: 8,//图层类型 必填
	params: {
		tx: 105.40713, //模型中心X轴坐标（经度，单位：十进制度）
		ty: 28.89712, //模型中心Y轴坐标（纬度，单位：十进制度）
		tz: 250, //模型中心Z轴坐标（高程，单位：米）
		rx: 0, //X轴（经度）方向旋转角度（单位：度）
		ry: 0, //Y轴（纬度）方向旋转角度（单位：度）
		rz: 85 //Z轴（高程）方向旋转角度（单位：度）
	},//3dTile 图层偏转参数
	checked: false,//是否 选中   必填
	alpha: 1 ,//图层透明度
	ishide: true//是否添加滑块(控制统明度)
 * }
 */

var mapConfig = {};
mapConfig.data=[];
mapConfig.data[1] = [{
	hei: -0.01934417858479506,
	lat: 28.94006988304184,
	lon: 105.40471130200652
},
{
	hei: -0.04480997288655153,
	lat: 28.931544993989665,
	lon: 105.39900350334871
},
{
	hei: 264.99595884198544,
	lat: 28.926038237677396,
	lon: 105.39882601304838
},

{
	hei: 263.56262403413524,
	lat: 28.91976570272088,
	lon: 105.4015655828841,
},
{
	hei: 256.9224984480623,
	lat: 28.913060918897045,
	lon: 105.40476865196973,
},
{
	hei: 281.78554249562575,
	lat: 28.91622417510723,
	lon: 105.41216918046085,
},
{
	hei: 289.45577494999384,
	lat: 28.919415071296534,
	lon: 105.41437540238466,
},
{
	hei: 293.0358834632802,
	lat: 28.924127007658434,
	lon: 105.42095144768786,
},

{
	hei: 270.297004178454,
	lat: 28.923538076967994,
	lon: 105.42331109076869,
},
{
	hei: 283.75291899047977,
	lat: 28.930520844384276,
	lon: 105.43153424675332,
},
{
	hei: 335.40467389637354,
	lat: 28.929310981919162,
	lon: 105.45778537361373,
},
{
	hei: 304.1383919633466,
	lat: 28.926703331827593,
	lon: 105.48015817220094
},
{
	hei: 289.1379465704496,
	lat: 28.921606264971345,
	lon: 105.48806479031715
},

{
	hei: 324.0161662290016,
	lat: 28.914360574458048,
	lon: 105.49567716990987
},
{
	hei: 315.42466864779743,
	lat: 28.900144430039962,
	lon: 105.51066932671009
},
{
	hei: 280.91795097921533,
	lat: 28.88933496145783,
	lon: 105.52071848849586
},
{
	hei: 240.71310160445844,
	lat: 28.884571262864608,
	lon: 105.52559199558597,
},
{
	hei: 239.65674041181398,
	lat: 28.8931356103778,
	lon: 105.5347358437446,
}

];
mapConfig.data[0] = [
// 		{
//
// 			hei: -0.025610347471141017,
// 			lat: 28.939241514014903,
// 			lon: 105.40744144592752
// 		},
{
	hei: -0.04589526734323625,
	lat: 28.931747243581622,
	lon: 105.39853886601193
},
{
	hei: -0.06523703048428238,
	lat: 28.925882110241137,
	lon: 105.39721844337936
},

{
	hei: 265.44802736556477,
	lat: 28.917062661366202,
	lon: 105.40258092743369
},
{
	hei: 290.50989228854843,
	lat: 28.918385435502056,
	lon: 105.40854531422251
},
{
	hei: 288.89515610566053,
	lat: 28.919648414710174,
	lon: 105.41473068808469
},
{
	hei: 307.01985328629337,
	lat: 28.9202762027651,
	lon: 105.41607819515279
},
{
	hei: 308.7999443160104,
	lat: 28.922836887286305,
	lon: 105.41939036827223
},

{
	hei: 291.7647585757142,
	lat: 28.924384525952707,
	lon: 105.42142391021098
},
{
	hei: 284.51981082545683,
	lat: 28.92304620478763,
	lon: 105.42324162877287
},
{
	hei: 271.645751335189,
	lat: 28.926175040297416,
	lon: 105.42687431875055
},
{
	hei: 278.9278102592104,
	lat: 28.925262746274658,
	lon: 105.42832799263515
},
{
	hei: 286.5710960620163,
	lat: 28.927344502246854,
	lon: 105.43040619994834
},

{
	hei: 294.723753767535,
	lat: 28.92279155757282,
	lon: 105.43735799022637
},
{
	hei: 321.7168875169792,
	lat: 28.930694523812825,
	lon: 105.44291115049462
},
{
	hei: 306.0955095928314,
	lat: 28.9276969765369,
	lon: 105.477081799573
},
{
	hei: 308.67973619274153,
	lat: 28.923345422909346,
	lon: 105.48543977339455
},
{
	hei: 321.32642132335815,
	lat: 28.90575063547329,
	lon: 105.5042826349009
},
{
	hei: 275.7690634026266,
	lat: 28.889321245432757,
	lon: 105.5210383344418
},
{
	hei: 232.97144779420756,
	lat: 28.88259430795183,
	lon: 105.52950611456654
},
{
	hei: 227.86458721492033,
	lat: 28.882576228137953,
	lon: 105.53001144164675
},
{
	hei: 227.86458721492033,
	lat: 28.88433,
	lon: 105.53214
},
{
	hei: 232.70527331599138,
	lat: 28.886365643251835,
	lon: 105.53380800818361
},
{
	hei: 240.03975956346048,
	lat: 28.89179291005546,
	lon: 105.53203712640799
},
{
	hei: 275.09694037279706,
	lat: 28.894751907546645,
	lon: 105.53468524942647
}

];
mapConfig.demurl = "http://192.168.30.55:9002/api/wmts/terrain/a5f50935f73a456e87f7ee07df08348f";
mapConfig.Layers = [{
		id: 1,
		name: "基础图层",
		checked: false,
		children: [{
				id: 11,
				name: "泸州影像2019", //WMS-T
				layerurl: "https://webst04.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=6&x={x}&y={y}&z={z}",
				layerid: "NAD_DL",
				IsWebMercatorTilingScheme: false, //是否创建摩卡托投影坐标系,默认是地理坐标系
				type: 0,
				checked: false,
				alpha: 1 //透明度
			},
			{
				id: 12,
				name: "谷歌影像（2018）", //WMS-T
				layerurl: "http://192.168.10.60:6080/arcgis/services/MAP/map1/MapServer/WMSServer",
				layerid: "0",
				IsWebMercatorTilingScheme: false, //是否创建摩卡托投影坐标系,默认是地理坐标系
				type: 5,
				checked: false,
				alpha: 1 //透明度
			},
//			{
//				id: 13,
//				name: "地形", //WMS-T
//				layerurl: "http://192.168.30.55:6080/arcgis/rest/services/CADSJSJ/MapServer",
//				layerid: "0",
//				IsWebMercatorTilingScheme: false, //是否创建摩卡托投影坐标系,默认是地理坐标系
//				type: 0,
//				checked: true,
//				alpha: 1 //透明度
//			},
			{
				id: 14,
				name: "天地图高清影像", //WMS-T
				layerurl: "http://192.168.30.55:6080/arcgis/services/DOM2016/MapServer/WMSServer",
				layerid: "0",
				IsWebMercatorTilingScheme: false, //是否创建摩卡托投影坐标系,默认是地理坐标系
				type: 5,
				checked: false,
				alpha: 1 //透明度
			},
			{
 					id: 15,
 					name: "建筑物二维", //WMS-T
 					layerurl: "http://192.168.30.56:6080/arcgis/rest/services/build/build/MapServer",
 					layerid: 0,
 					IsWebMercatorTilingScheme: false, //是否创建摩卡托投影坐标系,默认是地理坐标系
 					type: 0,
 					checked: false,
 					isArcgisLayer:true,
 					searchFeilds:["OB_NAME","OB_ADDR","OB_CODE"],
 					alpha: 1 //透明度
 				},
			{
 					id: 16,
 					name: "规划", //WMS-T
 					layerurl: "http://192.168.30.55:6080/arcgis/rest/services/GHT/MapServer",
 					layerid: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41],
 					IsWebMercatorTilingScheme: false, //是否创建摩卡托投影坐标系,默认是地理坐标系
 					type: 0,
 					checked: false,
 					isArcgisLayer:true,
 					searchFeilds:["FID","Id","地块性质"],
 					alpha: 1 //透明度
 			},
 			{
 					id: 17,
 					name: "cad切片", //WMS-T
 					layerurl: "http://192.168.30.55:6080/arcgis/rest/services/cad2/MapServer/tile/{z}/{x}/{y}",
 					layerid: "0",
 					IsWebMercatorTilingScheme: false, //是否创建摩卡托投影坐标系,默认是地理坐标系
 					type: 4,
 					checked: false,
 					isArcgisLayer:false,
 					searchFeilds:["OB_NAME","OB_ADDR","OB_CODE"],
 					alpha: 1 //透明度
 				},
 				{
 					id: 18,
 					name: "tms", //WMS-T
 					layerurl: "http://172.1.4.90/Tms",
 					layerid: "0",
 					IsWebMercatorTilingScheme: false, //是否创建摩卡托投影坐标系,默认是地理坐标系
 					type: 3,
 					checked: false,

 					alpha: 1 //透明度
 				},
				{
 					id: 19,
 					name: "测试", //WMS-T
 					layerurl: "http://webrd04.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
 					layerid: "0",
 					IsWebMercatorTilingScheme: false, //是否创建摩卡托投影坐标系,默认是地理坐标系
 					type: 4,
 					checked: false,
 					isArcgisLayer:false,
 					searchFeilds:["OB_NAME","OB_ADDR","OB_CODE"],
 					alpha: 1 //透明度
 				},
		]
	},
	{
		id: 2,
		name: "专题图层",
		checked: false,
		children: [{
				id: 21,
				name: "bim图层",
				checked: false,
				children: [{
						id: 211,
						name: "万达", //WMS-T
						layerurl: "http://192.168.30.55:9002/api/folder/a965379d2cc04962a627e8485084de25",
						layerid: "TILE_DL",
						IsWebMercatorTilingScheme: false, //是否创建摩卡托投影坐标系,默认是地理坐标系
						type: 8,
						params: {
							tx: 105.414575, //模型中心X轴坐标（经度，单位：十进制度）
							ty: 28.913365, //模型中心Y轴坐标（纬度，单位：十进制度）
							tz: 280, //模型中心Z轴坐标（高程，单位：米）
							rx: 0, //X轴（经度）方向旋转角度（单位：度）
							ry: 0, //Y轴（纬度）方向旋转角度（单位：度）
							rz: 28.9 //Z轴（高程）方向旋转角度（单位：度）
						},
						checked: false,
						alpha: 1 //透明度
					},
					{
						id: 212,
						name: "万象汇", //WMS-T
						layerurl: "http://192.168.30.55:9002/api/folder/b1fd5e3af02447eab78b9e2d3dfd4398",
						layerid: "NAD_ZDZK",
						IsWebMercatorTilingScheme: true, //是否创建摩卡托投影坐标系,默认是地理坐标系
						type: 8,
						params: {
							tx: 105.40713, //模型中心X轴坐标（经度，单位：十进制度）
							ty: 28.89712, //模型中心Y轴坐标（纬度，单位：十进制度）
							tz: 250, //模型中心Z轴坐标（高程，单位：米）
							rx: 0, //X轴（经度）方向旋转角度（单位：度）
							ry: 0, //Y轴（纬度）方向旋转角度（单位：度）
							rz: 85 //Z轴（高程）方向旋转角度（单位：度）
						},
						checked: false,
						alpha: 1 //透明度
					},

					{
						id: 214,
						name: "万达排水",
						checked: false,
						children: [{
								id: 2141,
								name: "万达排水f1", //WMS-T
								layerurl: "http://172.1.4.158:9002/api/folder/bb9debf6409d40d08ac9516b76f09be3",
								layerid: "TILE_DL1",
								IsWebMercatorTilingScheme: false, //是否创建摩卡托投影坐标系,默认是地理坐标系
								type: 8,
								params: {
									tx: 105.414575, //模型中心X轴坐标（经度，单位：十进制度）
									ty: 28.913365, //模型中心Y轴坐标（纬度，单位：十进制度）
									tz: 290, //模型中心Z轴坐标（高程，单位：米）
									rx: 0, //X轴（经度）方向旋转角度（单位：度）
									ry: 0, //Y轴（纬度）方向旋转角度（单位：度）
									rz: 28.9 //Z轴（高程）方向旋转角度（单位：度）
								},
								checked: false,
								alpha: 1 //透明度
							},
							{
								id: 2142,
								name: "万达排水f2", //WMS-T
								layerurl: "http://172.1.4.158:9002/api/folder/5425f0e0adc5453ab527dfc045805c5e",
								layerid: "TILE_DL2",
								IsWebMercatorTilingScheme: false, //是否创建摩卡托投影坐标系,默认是地理坐标系
								type: 8,
								params: {
									tx: 105.414575, //模型中心X轴坐标（经度，单位：十进制度）
									ty: 28.913365, //模型中心Y轴坐标（纬度，单位：十进制度）
									tz: 280, //模型中心Z轴坐标（高程，单位：米）
									rx: 0, //X轴（经度）方向旋转角度（单位：度）
									ry: 0, //Y轴（纬度）方向旋转角度（单位：度）
									rz: 28.9 //Z轴（高程）方向旋转角度（单位：度）
								},
								checked: false,
								alpha: 1 //透明度
							}
						]
					},
					{
						id: 213,
						name: "万达",
						checked: false,
						children: [{
								id: 2131,
								name: "万达f1", //WMS-T
								layerurl: "http://172.1.4.158:9002/api/folder/e35391a484f9420a9a0bf42ba7ec4286",
								layerid: "TILE_DL1",
								IsWebMercatorTilingScheme: false, //是否创建摩卡托投影坐标系,默认是地理坐标系
								type: 8,
								params: {
									tx: 105.414575, //模型中心X轴坐标（经度，单位：十进制度）
									ty: 28.913365, //模型中心Y轴坐标（纬度，单位：十进制度）
									tz: 280, //模型中心Z轴坐标（高程，单位：米）
									rx: 0, //X轴（经度）方向旋转角度（单位：度）
									ry: 0, //Y轴（纬度）方向旋转角度（单位：度）
									rz: 28.9 //Z轴（高程）方向旋转角度（单位：度）
								},
								checked: false,
								alpha: 1 //透明度
							},
							{
								id: 2132,
								name: "万达f2", //WMS-T
								layerurl: "http://172.1.4.158:9002/api/folder/e67b8325edbb40779e9867468e182ff9",
								layerid: "TILE_DL2",
								IsWebMercatorTilingScheme: false, //是否创建摩卡托投影坐标系,默认是地理坐标系
								type: 8,
								params: {
									tx: 105.414575, //模型中心X轴坐标（经度，单位：十进制度）
									ty: 28.913365, //模型中心Y轴坐标（纬度，单位：十进制度）
									tz: 270, //模型中心Z轴坐标（高程，单位：米）
									rx: 0, //X轴（经度）方向旋转角度（单位：度）
									ry: 0, //Y轴（纬度）方向旋转角度（单位：度）
									rz: 28.9 //Z轴（高程）方向旋转角度（单位：度）
								},
								checked: false,
								alpha: 1 //透明度
							}
						]
					}
				]
			},
			{
				id: 22,
				name: "倾斜模型",
				checked: false,
				children: [{
						id: 221,
						name: "倾斜", //WMS-T
						layerurl: "http://192.168.30.55:9002/api/folder/2238c7f5f0ff4c48bc3f3f847c729aa4",
						layerid: "NAD_DL",
						IsWebMercatorTilingScheme: false, //是否创建摩卡托投影坐标系,默认是地理坐标系
						type: 8,
						checked: false
					},
					{
						id: 222,
						name: "单体化", //WMS-T
						layerurl: "http://192.168.30.55:9002/api/folder/52cfb98e79d04ffa9b26ba10c6731011",
						layerid: "NAD_ZDZK",
						IsWebMercatorTilingScheme: true, //是否创建摩卡托投影坐标系,默认是地理坐标系
						type: 8,
						checked: false,
						ishide: true, //是否添加滑块控制统明度
						isHistory: true
					},
					{
						id: 223,
						name: "自贸区", //WMS-T
						layerurl: "http://117.174.153.152:809/data/fabu",
						layerid: "NAD_ZDZK",
						IsWebMercatorTilingScheme: true, //是否创建摩卡托投影坐标系,默认是地理坐标系
						type: 8,
						checked: false,
						ishide: false, //是否添加滑块控制统明度
						isHistory: false
					}

				]
			},
			{
				id: 23,
				name: "三维单体化模型",
				checked: false,

			},
			{
				id: 24,
				name: "其他地图",
				checked: false,
				children: [{
						id: 241,
						name: "企业poi", //WMS-T
						layerurl: "http://117.174.153.153:88/imap/imapserver/defaultrest/services/cj_lzzmq/searchData?layerID=0&whereClause=STATUS=%27%E5%B7%B2%E6%88%90%E7%AB%8B%27%20and%20REG_ZB%3E=2000&StartIndex=0&StopIndex=1000",
						layerid: "TILE_DL1",
						IsWebMercatorTilingScheme: false, //是否创建摩卡托投影坐标系,默认是地理坐标系
						type: 8,
						checked: false,
						isQyPoi: true//是否是企业poi图层

					},
					{
						id: 242,
						name: "全景点", //WMS-T
						layerurl: "http://117.174.153.153:88/imap/imapserver/defaultrest/services/cj_lzzmq/searchData?layerID=0&whereClause=STATUS=%27%E5%B7%B2%E6%88%90%E7%AB%8B%27%20and%20REG_ZB%3E=2000&StartIndex=0&StopIndex=1000",
						layerid: "TILE_DL1",
						IsWebMercatorTilingScheme: false, //是否创建摩卡托投影坐标系,默认是地理坐标系
						type: 8,
						checked: false,
						isQjPoi: true//是否是全景点图层

					},
					{
						id: 243,
						name: "测试las", //WMS-T
						layerurl: "http://172.1.4.90:8021/output_data",
						layerid: "TILE_DL",
						IsWebMercatorTilingScheme: false, //是否创建摩卡托投影坐标系,默认是地理坐标系
						type: 8,
						idPointClound: true,
						checked: false,
						alpha: 1 //透明度
					},
					{
						id: 244,
						name: "测试arcgisPoi", //WMS-T
						layerurl: "http://192.168.30.56:6080/arcgis/rest/services/build/build/MapServer/1/query?where=1=1&outFields=*&returnGeometry=true&returnIdsOnly=false&returnCountOnly=false&returnZ=false&returnM=false&f=pjson",
						layerid: "0",
						IsWebMercatorTilingScheme: false, //是否创建摩卡托投影坐标系,默认是地理坐标系
						type: 8,
						checked: false,
						nameField:"OB_NAME",//名称字段
						imgUrl:"images/red.png",//图标url
						glimgUrl:"images/0.png",//高亮时图标url
						heightField:"OB_DOOR_NUM",//高度字段
						Fields:["OB_ID","OB_NAME","OB_CODE","OB_ADDR","OB_LD_AREA","OB_FLOOR_AREA","OB_USAGE","OB_BASE_FORM","OB_STRU","OB_UP_FLOOR","OB_DOWN_FLOOR","OB_FLOOR_HEIGHT","OB_HEIGHT","OB_DOOR_NUM","OB_ELEVATOR_INFO","OB_DOWN_INFO","OB_AIR_DEFENCE_INFO","OB_FIRE_CONTROL_INFO","OB_PROPERTY_UNIT","OB_ADD_TIME","OB_UP_INFO","OB_AREA"],//要显示的字段
						isArcgisPoi: true//是否是arcgisPoi图层

					},
					{
						id: 245,
						name: "大气", //WMS-T
						layerurl: "http://192.168.30.56:6080/arcgis/rest/services/MAP/daqi/MapServer/0/query?where=1=1&outFields=*&returnGeometry=true&returnIdsOnly=false&returnCountOnly=false&returnZ=false&returnM=false&f=pjson",
						layerid: "0",
						IsWebMercatorTilingScheme: false, //是否创建摩卡托投影坐标系,默认是地理坐标系
						type: 8,
						checked: false,
						nameField:"监测点名称",//名称字段
						imgUrl:"images/mark1.png",//图标url
						glimgUrl:"images/0.png",//高亮时图标url
						heightField:20,//高度字段或者高度
						Fields:["监测点编号","监测点名称","监测点种类","监测点类型","省份","城市","区县","地址","经度","纬度","杆号","电表","备注","绑定设备编","绑定后监测"],//要显示的字段
						isArcgisPoi: true//是否是arcgisPoi图层

					},
				]
			}
		]
	},

];
mapConfig.dynamicData = {
	"245":{"id":"监测点编号","dataTime":null,"dataJosn":null}
};
mapConfig.dynamicDataUrls={
	"245":{"url":"../config/data.json","data":{"accessKey":"3b7a3bd9d03a4516b75ac398674fdd67","startDate":"2020-03-10 08:00:00","endDate":"2020-03-10 08:00:01"}}
};
mapConfig.dynamicDataFeilds={
	"245":{"stationId":"设备编号","pm25":"PM2.5","pm10":"PM10","co":"SO2","so2":"SO2","o3":"O3","no2":"NO2","temperature":"温度","humidity":"湿度","pressure":"气压","windDirection":"风向","windPower":"风力","insTime":"数据时间"}
};
mapConfig.baselayers2 = [
{
	name: '谷歌影像',
	url: 'http://www.google.cn/maps/vt?lyrs=s&x={x}&y={y}&z={z}',
	img: "google_img.png",
	maximumLevel: 20,
	type: 0
}, {
	name: '谷歌影像标注',
	url: 'http://www.google.cn/maps/vt?lyrs=s,h&gl=cn&x={x}&y={y}&z={z}',
	img: "google_img.png",
	type: 0,
	maximumLevel: 20
}, {
	name: '谷歌电子地图',
	url: 'http://mt2.google.cn/vt/lyrs=m@207000000&hl=zh-CN&gl=CN&src=app&x={x}&y={y}&z={z}',
	img: "google_vec.png",
	type: 0,
	maximumLevel: 18
}, {
	name: '天地图影像',
	url: ['http://t1.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=8bc8ba83cc36ea2049915ab81bd0cb6f', 'http://t1.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=8bc8ba83cc36ea2049915ab81bd0cb6f'],
	img: 'tdt_img.png',
	type: 0,
	desc: '无偏移，墨卡托投影',
	maximumLevel: 18
}, {
	name: '天地图地图',
	url: ['http://t1.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=8bc8ba83cc36ea2049915ab81bd0cb6f', 'http://t1.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=8bc8ba83cc36ea2049915ab81bd0cb6f'],
	img: 'tdt_vec.png',
	type: 0,
	desc: '无偏移，墨卡托投影',
	maximumLevel: 18
}, {
	name: '高德在线地图',
	url: 'http://webrd04.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
	img: 'gaode_vec.png',
	type: 0,
	desc: '有偏移，墨卡托投影',
	maximumLevel: 18
}, {
	name: '高德在线影像',
	url: 'https://webst04.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=6&x={x}&y={y}&z={z}',
	img: 'gaode_img.png',
	type: 0,
	desc: '有偏移，墨卡托投影',
	maximumLevel: 18
}, {
	name: 'ArcGIS卫星',
	url: 'https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/WMTS?service=WMTS&request=GetTile&layer=World_Imagery&style=default&tileMatrix={TileMatrix}&tileRow={TileRow}&tileCoL={TileCol}',
	img: 'esriWorldImagery.png',
	desc: '有偏移，墨卡托投影',
	type: 1,
	maximumLevel: 18
}];
mapConfig.baselayers = [
//{
//	name: '谷歌影像本地',
//	url: 'http://172.1.4.90/CesiumTool/data/google/wp/{x}_{y}_{z}.jpg',
//	img: "google_img.png",
//	maximumLevel: 5,
//	type: 0
//},
{
	name: '谷歌影像',
	url: 'http://www.google.cn/maps/vt?lyrs=s&x={x}&y={y}&z={z}',
	img: "google_img.png",
	maximumLevel: 20,
	type: 0
}, {
	name: '谷歌影像标注',
	url: 'http://www.google.cn/maps/vt?lyrs=s,h&gl=cn&x={x}&y={y}&z={z}',
	img: "google_img.png",
	type: 0,
	maximumLevel: 20
}, {
	name: '谷歌电子地图',
	url: 'http://mt2.google.cn/vt/lyrs=m@207000000&hl=zh-CN&gl=CN&src=app&x={x}&y={y}&z={z}',
	img: "google_vec.png",
	type: 0,
	maximumLevel: 18
}, {
	name: '天地图影像',
	url: ['http://t1.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=8bc8ba83cc36ea2049915ab81bd0cb6f', 'http://t1.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=8bc8ba83cc36ea2049915ab81bd0cb6f'],
	img: 'tdt_img.png',
	type: 0,
	desc: '无偏移，墨卡托投影',
	maximumLevel: 18
}, {
	name: '天地图地图',
	url: ['http://t1.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=8bc8ba83cc36ea2049915ab81bd0cb6f', 'http://t1.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=8bc8ba83cc36ea2049915ab81bd0cb6f'],
	img: 'tdt_vec.png',
	type: 0,
	desc: '无偏移，墨卡托投影',
	maximumLevel: 18
}, {
	name: '高德在线地图',
	url: 'http://webrd04.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
	img: 'gaode_vec.png',
	type: 0,
	desc: '有偏移，墨卡托投影',
	maximumLevel: 18
}, {
	name: '高德在线影像',
	url: 'https://webst04.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=6&x={x}&y={y}&z={z}',
	img: 'gaode_img.png',
	type: 0,
	desc: '有偏移，墨卡托投影',
	maximumLevel: 18
}, {
	name: 'ArcGIS卫星',
	url: 'https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/WMTS?service=WMTS&request=GetTile&layer=World_Imagery&style=default&tileMatrix={TileMatrix}&tileRow={TileRow}&tileCoL={TileCol}',
	img: 'esriWorldImagery.png',
	desc: '有偏移，墨卡托投影',
	type: 1,
	maximumLevel: 18
}, {
	name: '单张图片',
	url: 'images/basemaps/world.jpg',
	img: 'offline.png',
	desc: '有偏移，墨卡托投影',
	type: 2,
	maximumLevel: 18
}, {
	name: '水街管线竣工图',
	url: ['http://www.google.cn/maps/vt?lyrs=s&x={x}&y={y}&z={z}','http://192.168.30.55:6080/arcgis/rest/services/CADSJSJ/MapServer'],
	img: 'offline.png',
	desc: '有偏移，墨卡托投影',
	type: 3,
	maximumLevel: 18
},
{
	name: 'MAP',
	url: ['http://www.google.cn/maps/vt?lyrs=s&x={x}&y={y}&z={z}','http://192.168.30.55:6080/arcgis/rest/services/CADSJJG5/MapServer'],
	img: 'offline.png',
	desc: '有偏移，墨卡托投影',
	type: 3,
	maximumLevel: 18
},
];
mapConfig.features = [{
		x: 105.41607,
		y: 28.92008,
		z: 300.19,
		name: "自贸区管委会",
		url: "https://7a125ko2m.720think.com/t/7a125ko2m?def_sid=97552&ath=-0.9025&atv=13.902500000000002",
		videoUrl: "http://172.1.4.162:8015/zimaoqu.mp4"
	},
	{
		x: 105.41086,
		y: 28.91907,
		z: 292.43,
		name: "客运中心站",
		url: "https://2b8hv4y0o.720think.com/t/2b8hv4y0o?def_sid=95305"
	},
	{
		x: 105.53214,
		y: 28.88433,
		z: 234.91,
		name: "航运物流核心区",
		url: "https://09fm2te5v.720think.com/t/09fm2te5v?def_sid=98277"
	},
	{
		x: 105.41565,
		y: 28.91971,
		z: 293.39,
		name: "川南临港片区规划展示厅",
		url: "https://6daafnyy5.720think.com/t/6daafnyy5?def_sid=300748"
	},
];
mapConfig.tool = [{
		id: "changgeDiMap",
		name: " 底图",
		icon: "fa-map",
		item: null
	},
	{
		id: "Layer",
		name: " 图层",
		icon: "fa-tasks",
		item: null
	},
	{
		id: "mapHandle",
		name: " 地图操作",
		icon: "fa-list",
		item: [{
				id: "mapRoam",
				name: " 漫游",
				icon: "fa-hand-paper-o",
				item: null
			},
			{
				id: "mapPoint",
				name: " 点选",
				icon: "fa-mouse-pointer",
				item: null
			},
			{
				id: "transparent",
				name: " 高程遮挡",
				icon: "fa-transgender",
				item: null
			},
			{
				id: "mapMeasure",
				name: " 图上量算",
				icon: "fa-calculator",
				item: null
			},
			{
				id: "mapDraw",
				name: " 图上标绘",
				icon: "fa-pencil-square-o",
				item: null
			},
			{
				id: "printImg",
				name: " 地图输出",
				icon: "fa-print",
				item: null
			},
			{
				id: "printHtml",
				name: " 地图打印",
				icon: "fa-print",
				item: null
			},

			{
				id: "c_edit",
				name: " 鼠标拖拽",
				icon: "fa-hand-rock-o",
				item: null
			},

			{
				id: "c_firstperson",
				name: " 键盘漫游",
				icon: "fa-keyboard-o",
				item: null
			},
			{
				id: "rollingShutter",
				name: " 卷帘对比",
				icon: "fa-columns",
				item: null
			},
			{
				id: "viewpoint",
				name: " 视角书签",
				icon: "fa-tags",
				item: null
			},
			{
				id: "roamingClick",
				name: " 路径漫游",
				icon: "fa-send-o",
				item: null
			}
		]
	}, {
		id: "mapAnalysis",
		name: " 地图分析",
		icon: "fa-cubes",
		item: [{
				id: "Rizhaofenxi",
				name: " 日照分析",
				icon: "fa-sun-o",
				item: null
			},
			{
				id: "visibilityAnalysis",
				name: " 视域分析",
				icon: "fa-eye",
				item: null
			},
			{
				id: "skylineAnalysis",
				name: " 天际线分析",
				icon: "fa-certificate",
				item: null
			},
			{
				id: "historyAnalysis",
				name: " 历史变迁",
				icon: "fa-history",
				item: null
			},
			{
				id: "profileAnalysis",
				name: " 剖面分析",
				icon: "fa-desktop",
				item: null
			},
			{
				id: "ClearAnalysis",
				name: " 清除分析",
				icon: "fa-minus-square-o",
				item: null
			}

		]
	}, {
		id: "login",
		name: " ",//登录
		icon: "fa-user-circle-o",

	}
];
var cesiumApi = "http://172.1.4.90/CesiumTool";
var requestUrl = {
    loginUrl: cesiumApi + "/user/login",//登录验证
    saveViewPoint: cesiumApi + "/viewpoint/save",//视点保存
    getViewPoint: cesiumApi + "/viewpoint/findByUserId",//获取视点
    deleteViewPoint: cesiumApi + "/viewpoint/delete",//删除视点
};
export { mapConfig,requestUrl,cesiumApi}
