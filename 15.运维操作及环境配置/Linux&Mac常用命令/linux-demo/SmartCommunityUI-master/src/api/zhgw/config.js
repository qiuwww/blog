/*
*type代表地图服务类型:
0代表CSVLayer;
1代表FeatureLayer;
2代表ImageryLayer;
3代表MapImageLayer;
4 代表WebTileLayer;
5 代表TileLayer;
6 代表WMSLayer;
7 代表WMTSLayer;
8代表xyz;
*/
var MapConfig = {};
MapConfig.Layers = [{
  id: 1,
  name: "基础图层",
  checked: false,
  zIndex: 1,
  children: [{
    id: 101,
    name: "泸州影像2019",
    params: {
      url: "http://192.168.30.55:6080/arcgis/rest/services/DOM2018/MapServer",
      type: 3,
      zIndex: 2,
      alpha: 1 //透明度
    },
    checked: false,

  },

    {
      id: 102,
      name: "天地图影像地图",
      params: {
        url: "http://t0.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={col}&TILEROW={row}&TILEMATRIX={level}&tk=8bc8ba83cc36ea2049915ab81bd0cb6f",
        type: 4,
        zIndex: 3,
        alpha: 1 //透明度
      },
      checked: false,
    },
    {
      id: 103,
      name: "天地图影响注记",
      params: {
        url: "http://t0.tianditu.gov.cn/cia_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={col}&TILEROW={row}&TILEMATRIX={level}&tk=8bc8ba83cc36ea2049915ab81bd0cb6f",
        type: 4,
        zIndex: 4,
        alpha: 1 //透明度
      },
      checked: false,
    },

    {
      id: 104,
      name: "规划", //WMS-T
      params: {
        url: "http://192.168.30.55:6080/arcgis/rest/services/GHT/MapServer",
        type: 3,
        zIndex: 5,
        alpha: 1 //透明度
      },
      checked: false
    },
    {
      id: 105,
      name: "高德在线地图",
      params: {
        url: "http://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
        type: 8,
        zIndex: 6,
        server:"webst01.is.autonavi.com",
        alpha: 1 //透明度
      },
      checked: false,
    },
    {
      id: 106,
      name: "高德影像",
      params: {
        url: "https://webst01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=6&x={x}&y={y}&z={z}",
        type: 8,
        zIndex: 7,
        server:"webst01.is.autonavi.com",
        alpha: 1 //透明度
      },
      checked: false,
    },
    {
      id: 107,
      name: "谷歌电子地图",
      params: {
        url: "http://mt3.google.cn/vt/lyrs=m@207000000&hl=zh-CN&gl=CN&src=app&x={x}&y={y}&z={z}",
        type: 8,
        zIndex: 8,
        server:"https://mt3.google.cn/maps/vt",
        alpha: 1 //透明度
      },
      checked: false,
    },
    {
      id: 108,
      name: "谷歌影像",
      params: {
        url: "http://mt3.google.cn/maps/vt?lyrs=s&x={x}&y={y}&z={z}",
        type: 8,
        zIndex: 9,
        server:"mt3.google.cn",
        alpha: 1 //透明度
      },
      checked: false,
    },
    {
      id: 109,
      name: "谷歌影像标注",
      params: {
        url: "https://mt3.google.cn/maps/vt?lyrs=s,h&gl=cn&x={x}&y={y}&z={z}",
        type: 8,
        zIndex: 10,
        server:"mt3.google.cn",
        alpha: 1 //透明度
      },
      checked: false,
    },
    {
      id: 110,
      name: "arcgis卫星",
      params: {
        url: "https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/WMTS?service=WMTS&request=GetTile&layer=World_Imagery&style=default&tileMatrix={z}&tileRow={y}&tileCoL={x}",
        type: 8,
        zIndex: 11,
        server:"services.arcgisonline.com",
        alpha: 1 //透明度
      },
      checked: false,
    },
    {
      id: 111,
      name: "百度",
      params: {
        url: "http://online1.map.bdimg.com/tile/?qt=tile&x={x}&y={y}&z={z}&styles=pl",
        type: 10,
        zIndex: 12,
        server:"online1.map.bdimg.com",
        alpha: 1 //透明度
      },
      checked: false,
    },
  ]
},
  {
    id: 2,
    name: "专题图层",
    checked: false,
    zIndex: 12,
    children: [
      {
        id: 201,
        name: "管线",
        checked: false,
        zIndex: 4,
        children: [{
          id: 20101,
          name: "王氏骨科", //WMS-T
          params: {
            url: "http://192.168.1.200:6080/arcgis/rest/services/WSGK/MapServer",
            type: 3,
            zIndex: 13,
            alpha: 1 //透明度
          },
          checked: false
        },]
      },
      {
        id: 202,
        name: "其他",
        checked: false,
        zIndex: 4,
        children: [{
          id: 20201,
          name: "建筑物", //WMS-T
          params: {
            url: "http://192.168.30.55:6080/arcgis/services/建筑物/MapServer/WmsServer",
            type: 6,
            zIndex: 14,
            alpha: 1 //透明度
          },
          checked: false
        },{
          id: 20202,
          name: "淹没区", //WMS-T
          params: {
            url: "http://192.168.30.55:6080/arcgis/rest/services/%E6%B7%B9%E6%B2%A1%E5%8C%BA1/MapServer/WMTS",
            type: 7,
            zIndex: 15,
            alpha: 1 //透明度
          },
          checked: false
        }]
      }
    ]
  },

];
MapConfig.baselayers = [
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
    url: ['http://www.google.cn/maps/vt?lyrs=s&x={x}&y={y}&z={z}', 'http://192.168.30.55:6080/arcgis/rest/services/CADSJSJ/MapServer'],
    img: 'offline.png',
    desc: '有偏移，墨卡托投影',
    type: 3,
    maximumLevel: 18
  },
  {
    name: 'MAP',
    url: ['http://www.google.cn/maps/vt?lyrs=s&x={x}&y={y}&z={z}', 'http://192.168.30.55:6080/arcgis/rest/services/CADSJJG5/MapServer'],
    img: 'offline.png',
    desc: '有偏移，墨卡托投影',
    type: 3,
    maximumLevel: 18
  },
];
MapConfig.tool = [
  {
    id: "Layer",
    name: " 图层",
    icon: "md-menu",
    item: null
  },
  {
    id: "mapHandle",
    name: " 地图操作",
    icon: "md-map",
    item: [
      {
        id: "mapPoint",
        name: " 点选",
        icon: "md-paper-plane",
        item: null
      },
      {
        id: "mapEnlarge",
        name: " 放大",
        icon: "md-add",
        item: null
      },
      {
        id: "mapNarrow",
        name: " 缩小",
        icon: "md-remove",
        item: null
      },
      {
        id: "mapMove",
        name: " 移动",
        icon: "ios-hand",
        item: null
      },
      {
        id: "mapMeasurew",
        name: " 量算",
        icon: "md-calculator",
        item: null
      },

      {
        id: "viewpoint",
        name: " 视角书签",
        icon: "md-pricetags",
        item: null
      },
      {
        id: "mapAll",
        name: " 全图",
        icon: "md-home",
        item: null
      },
      {
        id: "mapPointFly",
        name: " 坐标点定位",
        icon: "md-pin",
        item: null
      }
    ]
  }, {
    id: "mapAnalysis",
    name: " 工具",
    icon: "md-apps",
    item: [{
      id: "poiSelect",
      name: " POI搜索",
      icon: "md-list",
      item: null
    },
      {
        id: "hierarchicalSelect",
        name: " 分层查询",
        icon: "md-keypad",
        item: null
      },
      {
        id: "sqlSelect",
        name: " SQL查询",
        icon: "md-search",
        item: null
      },
      {
        id: "mapStatistics",
        name: " 分类统计",
        icon: "md-stats",
        item: null
      },
       {
        id: "splitScreenComparison",
          name: " 分屏对比",
          icon: "md-quote",
          item: null
      },
      {
        id: "inspectionMaintenance",
        name: " 巡查养护",
        icon: "md-shuffle",
        item: null
      },
      {
        id: "mapPrint",
        name: " 地图打印",
        icon: "md-print",
        item: null
      },
      {
        id: "mapAnalysis",
        name: " 地图分析",
        icon: "md-bulb",
        item: null
      }
    ]
  }, {
    id: "在线监测",
    name: " 监测预警",
    icon: "md-baseball",
    item: [{
      id: "waterLoggingPoint",
      name: " 内涝点监测",
      icon: "logo-steam",
      item: null
    },
      {
        id: "drainagePoint",
        name: " 排水点监测",
        icon: "ios-water",
        item: null
      },
      {
        id: "flow",
        name: "  流量监测",
        icon: "md-wine",
        item: null
      },
      {
        id: "waterLevel",
        name: " 水位监测",
        icon: "md-water",
        item: null
      },
      {
        id: "waterQuality",
        name: " 水质监测",
        icon: "ios-wine",
        item: null
      },
      {
        id: "maintenanceWarning",
        name: " 设备管线维护预警",
        icon: "md-warning",
        item: null
      },
      {
        id: "wellCoverDisplacementAlarm",
        name: " 井盖位移报警",
        icon: "md-settings",
        item: null
      },
      {
        id: "waterLoggingPointWarning",
        name: " 内涝点水位预警",
        icon: "ios-snow",
        item: null
      }

    ]
  }
];

export {MapConfig};
