//高度 POI查询 工具类
//参考文档：https://lbs.amap.com/api/webservice/guide/api/search

class GaodePOI {
    //构造方法
    constructor(opts) {
        if(!opts) opts = {};
        this._keys = opts.key || [
            "23da22d12b2f721a37bca7ca9547b05a",//2020-6-6
            "024fc5d6adfb0c931189432ca0bb6ffc",
            "904be00b0cd692bb9ef4b09a87f46bfb",
            "a3315817804e85a1ee4db88c764f9b55",
            "a5103e7e48f3a88dbaa750e4f284c6f0",
        ];
        this.isFileter = opts.isFileter === undefined ? true : opts.isFileter;
        this._key_index = 0;
    }

    //高德key
    get keys() {
        return this._keys;
    }
    set keys(val) {
        this._keys = val;
    }

    //取单个key（轮询）
    get key() {
        var thisidx = (this._key_index++) % (this._keys.length);
        return this._keys[thisidx];
    }

    //【内部】格式化返回的数据
    _formatPOIData(arr) {
        var arrNew = [];
        for (var i = 0; i < arr.length; i++) {
            var item = arr[i];
            var coor = [];
            if (item.location && item.location.length>0) coor = mars3d.pointconvert.gcj2wgs(item.location.split(",")); //坐标
            arrNew.push({
                id: item.id,
                name: item.name, //名称
                x: coor[0],
                y: coor[1],
                address: item.address, //地址
                xzqh: item.pname + item.cityname + item.adname, //行政区域
                type: item.type, //类别
                tel: item.tel || ""
            });
        }
        return arrNew;
    }
    //搜索，内部自动判断类别
    /*opt = {
           text: 关键字
           count：数量
           city: 城市
           page：分页
           entity:限定的区域，为空时不限定（根据entity类型走不同方法）
           error: function (data) //错误或无数据时回调方法
           success: function (data) //有数据时回调方法
   }*/
    query(opts) {
        var entity = opts.entity;
        var that = this;
        if (entity) {
            if (entity.rectangle) {
                var coors = mars3d.draw.attr.rectangle.getCoordinates(entity);
                opts.points = coors;
                that.queryPolygon(opts);
            }
            if (entity.polygon) {
                var coors = mars3d.draw.attr.polygon.getCoordinates(entity);
                opts.points = coors;
                that.queryPolygon(opts);
            }
            if (entity.ellipse) {
                var coor = mars3d.draw.attr.circle.getCoordinates(entity)[0];
                var r = entity.ellipse.semiMajorAxis.getValue(viewer.clock.currentTime);
                opts.x = coor[0];
                opts.y = coor[1];
                opts.radius = r;
                that.queryCircle(opts);
            }
        } else if (opts.points) {
            that.queryPolygon(opts);
        } else {
            this.queryText(opts);
        }
    }
    _getKeywords(text) {
        if (haoutil.isutil.isString(text)) {
            return text.replaceAll(" ", "|").replaceAll(",", "|");
        } else if (haoutil.isutil.isArray(text)) {
            return text.join("|");
        }
        return text;
    }

    //高德搜索提示
    autoTip(opt) {
        var filter = {
            "key": this.key, //请求服务权限标识
            "output": "json"
        };
        if (Cesium.defined(opt.city)) filter.city = opt.city;
        if (Cesium.defined(opt.citylimit)) filter.citylimit = opt.citylimit;
        if (opt.text) {
            filter.keywords = this._getKeywords(opt.text);
        } else { //无关键字时，指定类别(keywords和types两者至少必选其一)
            if (!filter.types)
                filter.types = "120000|130000|190000";
        }
        var that = this;
        $.ajax({
            url: "https://restapi.amap.com/v3/assistant/inputtips",
            type: "GET",
            dataType: "jsonp",
            timeout: 5000,
            contentType: "application/json;utf-8",
            data: filter,
            success: function (data) {
                // if (data.infocode !== "10000") {
                //     var meg = "POI 请求失败(" + data.infocode + ")：" + data.info;
                //     if (opt.error) opt.error(meg);
                //     return;
                // }
                if (!data.tips) {
                   // var msg = "未查询到相关结果！";
                   // if (opt.error) opt.error(msg);
                    return;
                }

                var arr = that._formatPOIData(data.tips);
                if (opt.success) opt.success({
                    allcount: data.count,
                    count: arr.length,
                    list: arr
                });
            },
            error: function (data) {
                var msg = "请求出错(" + data.status + ")：" + data.statusText;
                if (opt.error) opt.error(msg);
            }
        });
    }
    //【内部】 二次筛选 保证数据在查询范围内 依赖于turf.js
    //关键字搜索
    /*opt = {
           text: 关键字
           count：数量
           city: 城市
           page：分页
           error: function (data) //错误或无数据时回调方法
           success: function (data) //有数据时回调方法
   }*/
    queryText(opt) {
        var filter = {
            "key": this.key, //请求服务权限标识
            "output": "json",
            "page": opt.page || 1,
            "offset": opt.count || 25,
            "types": opt.types
        };

        if (Cesium.defined(opt.city)) filter.city = opt.city;
        if (Cesium.defined(opt.citylimit)) filter.citylimit = opt.citylimit;
        filter.citylimit = true;
        //关键字构造
        if (opt.text) {
            filter.keywords = this._getKeywords(opt.text);
        } else { //无关键字时，指定类别(keywords和types两者至少必选其一)
            if (!filter.types)
                filter.types = "120000|130000|190000";
        }

        var that = this;
        $.ajax({
            url: "https://restapi.amap.com/v3/place/text",
            type: "GET",
            dataType: "jsonp",
            timeout: 5000,
            contentType: "application/json;utf-8",
            data: filter,
            success: function (data) {
                if (data.infocode !== "10000") {
                    var meg = "POI 请求失败(" + data.infocode + ")：" + data.info;
                    if (opt.error) opt.error(meg);
                    return;
                }

                if (!data.pois) {
                    var msg = "未查询到相关结果！";
                    if (opt.error) opt.error(msg);
                    return;
                }

                var arr = that._formatPOIData(data.pois);
                if (opt.success) opt.success({
                    allcount: data.count,
                    count: arr.length,
                    list: arr
                });
            },
            error: function (data) {
                var msg = "请求出错(" + data.status + ")：" + data.statusText;
                if (opt.error) opt.error(msg);
            }
        });
    }

    //周边搜索(圆形搜索)
    /*opt = {
            x: 经度
            y: 纬度
            radius:半径
            count：数量
            text: 关键字
            types: 类别
            error: function (data) //错误或无数据时回调方法
            success: function (data) //有数据时回调方法
    }*/
    queryCircle(opt) {

        var filter = {
            "key": this.key, //请求服务权限标识
            "radius": opt.radius || 3,
            "output": "json",
            "page": opt.page || 1,
            "offset": opt.count || 25,
            "types": opt.types
        };

        //坐标构造 location
        var cartg = mars3d.pointconvert.wgs2gcj([opt.x, opt.y]);
        filter.location = cartg[0] + "," + cartg[1];

        //关键字构造
        if (opt.text) {
            filter.keywords = this._getKeywords(opt.text);
        } else { //无关键字时，指定类别(keywords和types两者至少必选其一)
            if (!filter.types)
                filter.types = "120000|130000|190000";
        }
        var that = this;
        $.ajax({
            url: "https://restapi.amap.com/v3/place/around",
            type: "GET",
            dataType: "jsonp",
            timeout: 5000,
            contentType: "application/json;utf-8",
            data: filter,
            success: function (data) {
                if (data.infocode !== "10000") {
                    var msg = "POI 请求失败(" + data.infocode + ")：" + data.info;
                    if (opt.error) opt.error(msg);
                    return;
                }

                if (!data.pois) {
                    var msg = "未查询到相关结果！";
                    if (opt.error) opt.error(msg);
                    return;
                }

                var arr = that._formatPOIData(data.pois);
                var resArr;
                if(that.isFileter){
                    resArr = that._filterPOIData_circle(arr, [opt.x, opt.y], filter.radius);
                }else{
                    resArr = arr
                }
                if (opt.success) opt.success({
                    allcount: data.count,
                    count: resArr.length,
                    list: resArr
                });
            },
            error: function (data) {
                var msg = "请求出错(" + data.status + ")：" + data.statusText;
                if (opt.error) opt.error(msg);
            }
        });

    }

    //圆形搜索筛选
    _filterPOIData_circle(arr, center, radius) {
        if (!arr || !center || !radius) return;
        center = Cesium.Cartesian3.fromDegrees(center[0], center[1]);
        var arrNew = [];
        for (var i = 0; i < arr.length; i++) {
            var item = arr[i];
            var c3 = Cesium.Cartesian3.fromDegrees(item.x, item.y);
            var distance = Cesium.Cartesian3.distance(c3, center);
            if (distance < radius) { //表示在圆内
                arrNew.push(item);
            }
        }
        return arrNew;
    }

    //多边形搜索
    /*opt = {
        points: 坐标数组 [[x1,y1],[x2,y2]]
        text: 关键字
        types: 类别
        error: function (data) //错误或无数据时回调方法
        success: function (data) //有数据时回调方法
    }*/
    queryPolygon(opt) {

        var filter = {
            "key": this.key, //请求服务权限标识
            "output": "json",
            "page": opt.page || 1,
            "offset": opt.count || 25,
            "types": opt.types
        };

        //坐标构造 polygon
        var coors = opt.points
        var coorArr = [];
        if (coors.length == 2) { //矩形
            var cartg1 = mars3d.pointconvert.wgs2gcj(coors[0]);
            var cartg2 = mars3d.pointconvert.wgs2gcj(coors[1]);
            filter.polygon = cartg1[0] + "," + cartg1[1] + "|" + cartg2[0] + "," + cartg2[1];
            coorArr = [
                coors[0],
                [coors[0][0], coors[1][1]],
                coors[1],
                [coors[1][0], coors[0][1]]
            ];
        } else { //多边形
            coorArr = coors;
            var polygon = "";
            var newCoors = coors.concat([coors[coors.length - 1]]);
            for (var i = 0; i < newCoors.length; i++) {
                var cartg = mars3d.pointconvert.wgs2gcj(newCoors[i]);
                if (i == newCoors.length - 1) {
                    polygon += cartg[0] + "," + cartg[1];
                } else {
                    polygon += cartg[0] + "," + cartg[1] + "|";
                }
            }
            filter.polygon = polygon;
        }

        //关键字构造
        if (opt.text) {
            filter.keywords = this._getKeywords(opt.text);
        } else { //无关键字时，指定类别(keywords和types两者至少必选其一)
            if (!filter.types)
                filter.types = "120000|130000|190000";
        }

        var that = this;
        $.ajax({
            url: "https://restapi.amap.com/v3/place/polygon",
            type: "GET",
            dataType: "jsonp",
            timeout: 5000,
            contentType: "application/json;utf-8",
            data: filter,
            success: function (data) {
                if (data.infocode !== "10000") {
                    var msg = "POI 请求失败(" + data.infocode + ")：" + data.info;
                    if (opt.error) opt.error(msg);
                    return;
                }

                if (!data.pois) {
                    if (opt.error) opt.error("未查询到相关结果！");
                    return;
                }
                var arr = that._formatPOIData(data.pois);
                var resArr;
                if(that.isFileter){
                    resArr = that._filterPOIData_polygon(arr, coorArr);
                }else{
                    resArr = arr
                }
                if (opt.success) opt.success({
                    allcount: data.count,
                    count: resArr.length,
                    list: resArr
                });
            },
            error: function (data) {
                var msg = "请求出错(" + data.status + ")：" + data.statusText
                if (opt.error) opt.error(msg);
            }
        });
    }

    //多边形与矩形的二次筛选
    _filterPOIData_polygon(arr, coors) {
        if (!arr || !coors) return;
        coors = coors.concat([coors[0]]);
        var turfPolygon = turf.polygon([coors]);
        var arrNew = [];
        for (var i = 0; i < arr.length; i++) {
            var item = arr[i];
            var turfPoint = turf.point([item.x, item.y]);
            if (turf.booleanPointInPolygon(turfPoint, turfPolygon)) {
                arrNew.push(item);
            }
        }
        return arrNew;
    }





}
