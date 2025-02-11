//高德 路径规划  工具类
//参考文档：https://lbs.amap.com/api/webservice/guide/api/direction

var GaodeRouteType = {
    Walking: 1, //步行
    Bicycling: 2, //骑行
    Driving: 3, //驾车
}



class GaodeRoute {
    //构造方法
    constructor(opts) {
        this._keys = opts.key || [
            "23da22d12b2f721a37bca7ca9547b05a",//2020-6-6
            "024fc5d6adfb0c931189432ca0bb6ffc",
            "904be00b0cd692bb9ef4b09a87f46bfb",
            "a3315817804e85a1ee4db88c764f9b55",
            "a5103e7e48f3a88dbaa750e4f284c6f0",
        ];
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
    _formatRouteData(start, end, resultPaths) {
        var wgs_origin, wgs_destination;
        var paths = [];
        if (start) wgs_origin = mars3d.pointconvert.gcj2wgs(start.split(","));
        if (end) wgs_destination = mars3d.pointconvert.gcj2wgs(end.split(","));
        if (resultPaths && resultPaths.length > 0) {
            for (var i = 0; i < resultPaths.length; i++) {
                var route = [];
                route.push(wgs_origin); //连接起点
                var item = resultPaths[i];
                var steps = item.steps;
                var newSteps = [];
                var roadInfo = []; //途径地方
                for (var index = 0; index < steps.length; index++) {

                    var obj = {
                        instruction: steps[index].instruction, //路段步行指示
                        distance: steps[index].distance, //路段距离 米
                        duration: steps[index].duration, //路段预计时间 秒
                        points: [],
                        route: steps[index].road
                    };
                    var polyline = steps[index].polyline;
                    var polylineArr = polyline.split(";");
                    for (var ind = 0; ind < polylineArr.length; ind++) {
                        var one = polylineArr[ind];
                        var wgs = mars3d.pointconvert.gcj2wgs(one.split(","));
                        route.push(wgs);
                        obj.points.push(wgs);
                    }
                    roadInfo.push(obj.route);
                    newSteps.push(obj);
                }
                route.push(wgs_destination); //连接终点
                paths.push({
                    allDistance: item.distance, //总距离
                    allDuration: item.duration, //全部所需时间
                    steps: newSteps, //每一段的数据
                    points: route, //包含起点和终点的 完整路径的wgs84坐标数组
                    road: roadInfo
                });
            }
        }

        return {
            origin: wgs_origin, //起点
            destination: wgs_destination, //终点
            paths: paths //所有方案
        }
    }


    //按指定类别自动查询
    query(opt) {
        switch (opt.type) {
            default:
            case GaodeRouteType.Walking: //步行
                this.queryWalking(opt);
                break;
            case GaodeRouteType.Bicycling: //骑行
                this.queryBicycling(opt);
                break;
            case GaodeRouteType.Driving: //驾车
                this.queryDriving(opt);
                break;
        }
    }

    //按指定类别自动查询(多个路线数组，递归处理)
    queryArr(opt) {
        var that = this;
        var index = -1;

        var newOpts = {};
        for (var key in opt) {
            if (key == "points" || key == "success" || key == "error") continue;
            newOpts[key] = opt[key];
        }
        var arrPoints = opt.points;
        var arrResult = [];

        function queryNextLine() {
            index++;
            newOpts.points = arrPoints[index];
            newOpts.success = function (data) {
                if (data && data.paths && data.paths.length > 0)
                    arrResult.push(data.paths[0]);
                else
                    arrResult.push(null);

                if (index >= arrPoints.length - 1) {
                    if (opt.success) {
                        opt.success(arrResult);
                    }
                } else {
                    queryNextLine();
                }
            };
            newOpts.error = newOpts.success;

            that.query(newOpts);
        }
        queryNextLine();
    }

    //计算最短距离的线
    computeMindistanceLine(data) {
        var mindis = Number.MAX_VALUE;
        var lineData = null;
        var index = -1;
        for (var i = 0; i < data.length; i++) {
            var item = data[i];
            if (item) {
                if (item.allDistance <= mindis) {
                    lineData = item;
                    index = i;
                    mindis = item.allDistance;
                }
            }
        }
        return {
            lineData: lineData,
            index: index
        };
    }

    //步行路径规划(单个查询)
    /*opt = {
           points: 按起点、途经点、终点顺序的坐标数组 [[x1,y1],[x2,y2]]
           error: function (data) //错误或无数据时回调方法
           success: function (data) //有数据时回调方法
    }*/
    queryWalking(opt) {
        var filter = {
            "key": this.key, //请求服务权限标识
            "output": "json",
        };
        //坐标构造
        var startP = mars3d.pointconvert.wgs2gcj(opt.points[0]);
        var endP = mars3d.pointconvert.wgs2gcj(opt.points[opt.points.length - 1]);
        filter.origin = startP[0] + "," + startP[1];
        filter.destination = endP[0] + "," + endP[1];
        var that = this;
        $.ajax({
            url: "http://restapi.amap.com/v3/direction/walking",
            type: "GET",
            dataType: "json",
            timeout: "5000",
            contentType: "application/json;utf-8",
            data: filter,
            success: function (data) {
                if (data.infocode !== "10000") {
                    var msg = "路径规划 请求失败(" + data.infocode + ")：" + data.info;
                    if (opt.error) opt.error(msg);
                    return;
                }

                if (!data.route || !data.route.paths) {
                    var msg = "未查询到相关结果！";
                    if (opt.error) opt.error(msg);
                    return;
                }

                var result = that._formatRouteData(filter.origin, filter.destination, data.route.paths);

                if (opt.success) opt.success(result);
            },
            error: function (data) {
                var msg = "请求出错(" + data.status + ")：" + data.statusText;
                if (opt.error) opt.error(msg);
            }
        });
    }

    //骑行路径查询
    /*opt = {
           points: 按起点、途经点、终点顺序的坐标数组 [[x1,y1],[x2,y2]]
           error: function (data) //错误或无数据时回调方法
           success: function (data) //有数据时回调方法
       }*/
    queryBicycling(opt) {
        var filter = {
            "key": this.key, //请求服务权限标识
            "output": "json",
        };
        var startP = mars3d.pointconvert.wgs2gcj(opt.points[0]);
        var endP = mars3d.pointconvert.wgs2gcj(opt.points[opt.points.length - 1]);
        filter.origin = startP[0] + "," + startP[1];
        filter.destination = endP[0] + "," + endP[1];

        var that = this;
        $.ajax({
            url: "https://restapi.amap.com/v4/direction/bicycling",
            type: "GET",
            dataType: "jsonp",
            timeout: 5000,
            contentType: "application/json;utf-8",
            data: filter,
            success: function (data) {
                if (data.infocode !== "10000") {
                    var msg = "路径规划 请求失败(" + data.infocode + ")：" + data.info;
                    if (opt.error) opt.error(msg);
                    return;
                }

                if (!data.route || !data.route.paths) {
                    var msg = "未查询到相关结果！";
                    if (opt.error) opt.error(msg);
                    return;
                }
                var result = that._formatRouteData(filter.origin, filter.destination, data.route.paths);
                if (opt.success) opt.success(result);
            },
            error: function (data) {
                var msg = "请求出错(" + data.status + ")：" + data.statusText;
                if (opt.error) opt.error(msg);
            }
        });
    }




    //驾车路径规划查询
    /*opt = {
            points: 按起点、途经点、终点顺序的坐标数组 [[x1,y1],[x2,y2]]
            error: function (data) //错误或无数据时回调方法
            success: function (data) //有数据时回调方法
        }*/
    queryDriving(opt) {
        var filter = {
            "key": this.key, //请求服务权限标识
            "output": "json",
        };
        var startP = mars3d.pointconvert.wgs2gcj(opt.points[0]);
        var endP = mars3d.pointconvert.wgs2gcj(opt.points[opt.points.length - 1]);
        filter.origin = startP[0] + "," + startP[1];
        filter.destination = endP[0] + "," + endP[1];
        filter.extensions = opt.extensions || "base";
        filter.strategy = opt.strategy || 0; //默认返回一条速度优先的路径
        var that = this;
        $.ajax({
            url: "https://restapi.amap.com/v3/direction/driving",
            type: "GET",
            dataType: "jsonp",
            timeout: 5000,
            contentType: "application/json;utf-8",
            data: filter,
            success: function (data) {
                if (data.infocode !== "10000") {
                    var msg = "路径规划 请求失败(" + data.infocode + ")：" + data.info;
                    if (opt.error) opt.error(msg);
                    return;
                }

                if (!data.route || !data.route.paths || data.route.paths.length == 0) {
                    var msg = "未查询到相关结果！";
                    if (opt.error) opt.error(msg);
                    return;
                }
                var result = that._formatRouteData(filter.origin, filter.destination, data.route.paths);
                if (opt.success) opt.success(result);
            },
            error: function (data) {
                var msg = "请求出错(" + data.status + ")：" + data.statusText;
                if (opt.error) opt.error(msg);
            }
        });
    }


}
