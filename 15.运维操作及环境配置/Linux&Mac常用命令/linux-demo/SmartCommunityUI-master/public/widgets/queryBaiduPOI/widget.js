/* 2017-12-7 13:23:59 | 修改 木遥（微信:  http://marsgis.cn/weixin.html ） */
//模块：
var widget_queryBaiduPOI = mars3d.widget.bindClass(mars3d.widget.BaseWidget.extend({
    map: null,//框架会自动对map赋值
    options: {
        resources: [
            'view.css'
        ],
        //直接添加到index
        view: {
            type: "append",
            url: 'view.html',
            parent:'#centerDiv'
        },
    },
    configBaidu: {
        "key": [
            "c3qarrKcqnB9HbCOPfKOHgneH6AGXCVU",//2020-6-6
            "6g6evLsHT4M0DVZnRXRpXDDq1t95ESrg",
            "4j0HA8IeuvAPCl62ni8xCZkBhc2YGr67",
            "F4CZ3cvHf8vbL8rkuTNtx8w2eflpdzj5",
            "qObioeG8HeeQVrOVAGScPVhDzlmv6rL9",
            "bsk3zdnMp02wb7EINNEglNswf7pvKb8S", //mq
            "k9STYeKE6GX8LqQvzFNPANtXimmzGG4R",
        ],
        "url": "http://api.map.baidu.com/place/v2/search",
        "region": "全国"
    },
    //初始化[仅执行1次]
    create: function () {
    },
    //每个窗口创建完成后调用
    winCreateOK: function (opt, result) {
        if (opt.type != "append") return;
        var that = this;
        var img = $('#map-querybar img');
        img.each(function (index, item) {
            $(item).attr('src', that.path + $(item).attr('src'));
        });

        if (that.config.position)
            $("#map-querybar").css(that.config.position);
        if (that.config.style)
            $("#map-querybar").css(that.config.style);
        // 搜索框
        $("#txt_querypoi").click(function () {
            // 文本框内容为空
            if ($.trim($(this).val()).length == 0) {
                that.hideAllQueryBarView();
                that.showHistoryList(); // 显示历史记录
            }
        });
        var timetik = 0;
        // 搜索框绑定文本框值发生变化,隐藏默认搜索信息栏,显示匹配结果列表
        $("#txt_querypoi").bind("input propertychange", function () {
            clearTimeout(timetik);
            timetik = setTimeout(function () {
                that.hideAllQueryBarView();
                that.clearLayers();

                var queryVal = $.trim($("#txt_querypoi").val());
                if (queryVal.length == 0) {
                    // 文本框内容为空,显示历史记录
                    that.showHistoryList();
                } else {
                    that.autoTipList(queryVal, true);
                }

            }, 500);
        });

        // 点击搜索查询按钮
        $("#btn_querypoi").click(function () {
            clearTimeout(timetik);
            that.hideAllQueryBarView();

            var queryVal = $.trim($("#txt_querypoi").val());
            that.strartQueryPOI(queryVal, true);
        });
        //绑定回车键
        $("#txt_querypoi").bind('keydown', function (event) {
            if (event.keyCode == "13") {
                $("#btn_querypoi").click();
            }
        });

        // 返回查询结果面板界面
        $("#querybar_detail_back").click(function () {
            that.hideAllQueryBarView();
            $("#querybar_resultlist_view").show();
        });
    },
    //打开激活
    activate: function () {
        var that = this;

        //单击事件
        this.handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);
        this.handler.setInputAction(function () {
            // 点击地图区域,隐藏所有弹出框
            if ($.trim($("#txt_querypoi").val()).length == 0) {
                that.hideAllQueryBarView();
                $("#txt_querypoi").blur();
            }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    },
    //关闭释放
    disable: function () {
        if (this.handler) {
            this.handler.destroy();
            delete this.handler
        }

        this.hideAllQueryBarView();
        this.clearLayers();
    },


    hideAllQueryBarView: function () {
        $("#querybar_histroy_view").hide();
        $("#querybar_autotip_view").hide();
        $("#querybar_detail_view").hide();
        $("#querybar_resultlist_view").hide();
    },

    // 点击面板条目,自动填充搜索框,并展示搜索结果面板
    autoSearch: function (name) {
        $("#txt_querypoi").val(name);
        $("#btn_querypoi").trigger("click");
    },

    _key_index: 0,
    getKey: function () {
        var thisidx = (this._key_index++) % (this.configBaidu.key.length);
        return this.configBaidu.key[thisidx];
    },
    //===================与后台交互========================

    //显示智能提示搜索结果

    autoTipList: function (text, queryEx) {
        //输入经纬度数字时
        if (this.isLonLat(text)) return;

        //查询外部widget
        if (this.hasExWidget() && queryEx) {
            var qylist = this.autoExTipList(text);
            return;
        }
        //查询外部widget

        var key = this.getKey();

        $.ajax({
            url: this.configBaidu.url,
            type: "GET",
            dataType: "jsonp",
            timeout: "5000",
            contentType: "application/json;utf-8",
            data: {
                "output": "json",
                "ak": key,
                "scope": 1,         //检索结果详细程度。取值为1 或空，则返回基本信息；取值为2，返回检索POI详细信息
                "page_size": 10,
                "page_num": 0,
                "query": text,
                "city_limit": true,
                "region": this.config.region || this.configBaidu.region
            },
            success: function (data) {
                if (data.status !== 0) {
                    toastr.error("请求失败(" + data.status + ")：" + data.message);
                    return;
                }
                var pois = data.results;

                var inhtml = "";
                for (var index = 0; index < pois.length; index++) {
                    var name = pois[index].name;
                    var num = pois[index].num;
                    if (num > 0) continue;

                    inhtml += "<li><i class='fa fa-search'></i><a href=\"javascript:widget_queryBaiduPOI.autoSearch('" + name + "');\">" + name + "</a></li>";
                }

                if (inhtml.length > 0) {
                    $("#querybar_ul_autotip").html(inhtml);
                    $("#querybar_autotip_view").show();
                }
            },
            error: function (data) {
                toastr.error("请求出错(" + data.status + ")：" + data.statusText);
            }
        });

    },


    // 根据输入框内容，查询显示列表
    queryText: null,
    queryRegion: null,
    strartQueryPOI: function (text, queryEx) {
        if (text.length == 0) {
            toastr.warning('请输入搜索关键字！');
            return;
        }

        // TODO:根据文本框输入内容,从数据库模糊查询到所有匹配结果（分页显示）
        this.addHistory(text);

        this.hideAllQueryBarView();

        //输入经纬度数字时
        if (this.isLonLat(text)) {
            this.centerAtLonLat(text);
            return;
        }

        //查询外部widget
        if (this.hasExWidget() && queryEx) {
            var qylist = this.queryExPOI(text);
            return;
        }
        //查询外部widget


        this.thispage = 1;
        this.queryText = text;
        this.queryRegion = this.config.region || this.configBaidu.region;
        this.queryPOI();
    },
    queryPOIForCity: function (city) {
        this.thispage = 1;
        this.queryRegion = city;
        this.queryPOI();
    },
    queryPOI: function () {
        var that = this;
        var key = this.getKey();

        // 从数据库查询获取数据
        $.ajax({
            url: this.configBaidu.url,
            type: "GET",
            dataType: "jsonp",
            timeout: "5000",
            contentType: "application/json;utf-8",
            data: {
                "output": "json",
                "ak": key,
                "scope": 2,         //检索结果详细程度。取值为1 或空，则返回基本信息；取值为2，返回检索POI详细信息
                "page_size": this.pageSize,
                "page_num": (this.thispage - 1),
                "query": this.queryText,
                "region": this.queryRegion
            },
            success: function (data) {
                if (!that.isActivate) return;

                if (data.status !== 0) {
                    toastr.error("请求失败(" + data.status + ")：" + data.message);
                    return;
                }
                var pois = data.results;
                if (pois && pois.length > 0 && pois[0].num > 0)
                    that.workShowCitys.showResult(pois);
                else
                    that.showPOIPage(pois, data.total);
            },
            error: function (data) {
                toastr.error("请求出错(" + data.status + ")：" + data.statusText);
            }
        });
    },
    //===================大数据时，显示城市列表结果========================
    workShowCitys: {
        pageSize: 10,
        arrdata: [],
        counts: 0,
        allpage: 0,
        thispage: 0,
        showResult: function (data) {
            this.arrdata = data;
            this.counts = data.length;
            this.allpage = Math.ceil(this.counts / this.pageSize);
            this.thispage = 1;
            this.showPOIPage();
        },
        showPOIPage: function () {
            var inhtml = "";

            var startIdx = (this.thispage - 1) * this.pageSize;
            var endIdx = startIdx + this.pageSize;
            if (endIdx >= this.counts) {
                endIdx = this.counts;
            }

            for (var index = startIdx; index < endIdx; index++) {
                var item = this.arrdata[index];
                item.index = (index + 1);

                var _id = index;
                var _mc = item.name;

                inhtml += '<div class="querybar-site" onclick="widget_queryBaiduPOI.queryPOIForCity(\'' + _mc + '\')"> <div class="querybar-sitejj"> <div style=" float: left;">'
                    + _mc + '</div> <div style=" float: right;  ">约' + item.num + '个结果</div></div> </div>';
            };

            //分页信息
            inhtml += '<div class="querybar-page"><div class="querybar-fl">找到<strong>'
                + this.counts + '</strong>个结果</div><div class="querybar-ye querybar-fr">'
                + this.thispage + '/' + this.allpage + '页  <a href="javascript:widget_queryBaiduPOI.workShowCitys.showFirstPage()">首页</a> <a href="javascript:widget_queryBaiduPOI.workShowCitys.showPretPage()">&lt;</a>  <a href="javascript:widget_queryBaiduPOI.workShowCitys.showNextPage()">&gt;</a> </div></div>';

            $("#querybar_resultlist_view").html(inhtml);
            $("#querybar_resultlist_view").show();
        },
        showFirstPage: function () {
            this.thispage = 1;
            this.showPOIPage();
        },
        showNextPage: function () {
            this.thispage = this.thispage + 1;
            if (this.thispage > this.allpage)
                this.thispage = this.allpage;
            this.showPOIPage();
        },

        showPretPage: function () {
            this.thispage = this.thispage - 1;
            if (this.thispage < 1)
                this.thispage = 1;
            this.showPOIPage();
        }

    },

    //===================显示查询结果处理========================
    pageSize: 6,
    arrdata: [],
    counts: 0,
    allpage: 0,
    thispage: 0,
    showPOIPage: function (data, counts) {
        this.arrdata = data;
        this.counts = counts;
        if (this.counts < data.length) this.counts = data.length;
        this.allpage = Math.ceil(this.counts / this.pageSize);

        var inhtml = "";
        if (this.counts == 0) {
            inhtml += '<div class="querybar-page"><div class="querybar-fl">没有找到"<strong>' + this.queryText + '</strong>"相关结果</div></div>';
        }
        else {
            for (var index = 0; index < this.arrdata.length; index++) {
                var item = this.arrdata[index];
                var startIdx = (this.thispage - 1) * this.pageSize;
                item.index = startIdx + (index + 1);

                var _id = index;
                var _mc;
                if (item.detail_info && item.detail_info.detail_url) {
                  //href="' + item.detail_info.detail_url + '" 跳转百度
                    _mc = '<a target="_black" style="color: #ffffff; ">' + item.name + '</a>';
                }
                else {
                    _mc = item.name;
                }


                inhtml += '<div class="querybar-site" onclick="widget_queryBaiduPOI.showDetail(\'' + _id + '\')"> <div class="querybar-sitejj"> <h3>'
                    + item.index + '、' + _mc + '</h3> <p>' + (item.address || '') + '</p> </div> </div>';

                this.objResultData[_id] = item;
            };




            //分页信息
            var _fyhtml;
            if (this.allpage > 1)
                _fyhtml = '<div class="querybar-ye querybar-fr">' + this.thispage + '/' + this.allpage + '页  <a href="javascript:widget_queryBaiduPOI.showFirstPage()">首页</a> <a href="javascript:widget_queryBaiduPOI.showPretPage()">&lt;</a>  <a href="javascript:widget_queryBaiduPOI.showNextPage()">&gt;</a> </div>';
            else
                _fyhtml = '';

            //底部信息
            inhtml += '<div class="querybar-page"><div class="querybar-fl">找到<strong>' + this.counts + '</strong>条结果</div>' + _fyhtml + '</div>';
        }
        $("#querybar_resultlist_view").html(inhtml);
        $("#querybar_resultlist_view").show();


        this.showPOIArr(this.arrdata);
        if (this.counts == 1) {
            this.showDetail('0');
        }
    },
    showFirstPage: function () {
        this.thispage = 1;
        this.queryPOI();
    },
    showNextPage: function () {
        this.thispage = this.thispage + 1;
        if (this.thispage > this.allpage) {
            this.thispage = this.allpage;
            toastr.warning('当前已是最后一页了');
            return;
        }
        this.queryPOI();
    },

    showPretPage: function () {
        this.thispage = this.thispage - 1;
        if (this.thispage < 1) {
            this.thispage = 1;
            toastr.warning('当前已是第一页了');
            return;
        }
        this.queryPOI();
    },
    //点击单个结果,显示详细
    objResultData: {},
    showDetail: function (id) {
        //$("#querybar_resultlist_view").hide(); // 隐藏匹配结果列表
        //$("#querybar_detail_view").show();

        var item = this.objResultData[id];

        ////根据实际字段名修改。
        //var name = item.name;
        //if (name.length > 12)
        //    name = name.substring(0, 11) + "..";
        //$("#lbl_poi_name").html(name);

        ////==================构建查询详情div=================
        //var inHtml = '<p>名称：' + item.name + '</p>'; //详情
        //if (item.telephone)
        //    inHtml += '<p>电话：' + item.telephone + '</p>';
        //if (item.address)
        //    inHtml += '<p>地址：' + item.address + '</p>';
        //if (item.detail_info) {
        //    if (item.detail_info.tag)
        //        inHtml += '<p>类别：' + item.detail_info.tag + '</p>';


        //    //if (item.detail_info.detail_url)
        //    //    inHtml += '<p>详情：<a href="' + item.detail_info.detail_url + '"  target="_black">单击链接</a></p>';
        //}

        ////====================================================

        //$("#poi_detail_info").html(inHtml);

        //if (item.detail_info && item.detail_info.detail_url) {
        //    $("#btnShowDetail").show();
        //    $("#btnShowDetail").attr('href', item.detail_info.detail_url);
        //}
        //else {
        //    $("#btnShowDetail").hide();
        //}

        this.centerAt(item);
    },
    dataSource: null,
    getWorkLayer: function () {
        if (this.dataSource == null) {
            this.dataSource = new Cesium.CustomDataSource();
            this.viewer.dataSources.add(this.dataSource);
        }
        return this.dataSource;
    },
    clearLayers: function () {
        if (this.dataSource == null) return;
        this.dataSource.entities.removeAll();
        this.viewer.mars.popup.close();
    },
    showPOIArr: function (arr) {
        var that = this;
        this.clearLayers();


        var dataSource = this.getWorkLayer();
        $(arr).each(function (i, item) {

            var jd = item.location.lng;
            var wd = item.location.lat;
            //var z = 0;


            //===========无坐标数据===========
            if (isNaN(jd) || jd == 0 || isNaN(wd) || wd == 0)
                return;

            var wgsMpt = mars3d.pointconvert.bd2wgs([jd, wd]);
            wgsMpt = that.viewer.mars.point2map({ x: wgsMpt[0], y: wgsMpt[1] });
            jd = wgsMpt.x;
            wd = wgsMpt.y;

            item.JD = jd;
            item.WD = wd;

            //==================构建图上目标单击后显示div=================
            var name;
            if (item.detail_info && item.detail_info.detail_url) {
                name = '<a href="' + item.detail_info.detail_url + '"  target="_black" style="color: #ffffff; ">' + item.name + '</a>';
            }
            else {
                name = item.name;
            }

            var inHtml = '<div class="mars-popup-titile">' + name + '</div><div class="mars-popup-content" >';

            var phone = $.trim(item.telephone);
            if (phone != '') inHtml += '<div><label>电话</label>' + phone + '</div>';

            var dz = $.trim(item.address);
            if (dz != '') inHtml += '<div><label>地址</label>' + dz + '</div>';

            if (item.detail_info) {
                var fl = $.trim(item.detail_info.tag);
                if (fl != '') inHtml += '<div><label>类别</label>' + fl + '</div>';

            }
            inHtml += '</div>';
            //==============================================================

            //添加实体
            var entity = dataSource.entities.add({
                name: item.name,
                position: Cesium.Cartesian3.fromDegrees(jd, wd),
                point: {
                    color: new Cesium.Color.fromCssColorString("#3388ff"),
                    pixelSize: 10,
                    outlineColor: new Cesium.Color.fromCssColorString("#ffffff"),
                    outlineWidth: 2,
                    heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,     //贴地
                    scaleByDistance: new Cesium.NearFarScalar(1000, 1, 1000000, 0.1),
                    disableDepthTestDistance: Number.POSITIVE_INFINITY //不被遮挡
                },
                label: {
                    text: item.name,
                    font: '20px 楷体',
                    style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                    fillColor: Cesium.Color.AZURE,
                    outlineColor: Cesium.Color.BLACK,
                    outlineWidth: 2,
                    horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                    verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                    pixelOffset: new Cesium.Cartesian2(1000, 100),   //偏移量  
                    heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND, //是地形上方的高度
                    distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0.0, 200000),
                    disableDepthTestDistance: Number.POSITIVE_INFINITY //不被遮挡
                },
                data: item,
                popup: {
                    html: inHtml,
                    anchor: [0, -12],
                }
            });

            item._entity = entity;
        });

        if (arr.length > 1)
            that.viewer.flyTo(that.dataSource.entities, { duration: 3 });

    },
    centerAt: function (item) {
        var entity = item._entity;
        if (entity == null) {
            toastr.warning(item.name + " 无经纬度坐标信息！");
            return;
        }

        this.viewer.mars.centerAt({ x: item.JD, y: item.WD, minz: 2500 });

        var that = this;
        setTimeout(function () {
            that.viewer.mars.popup.show(entity);
        }, 3000);
    },

    //===================坐标定位处理========================
    isLonLat: function (text) {
        var reg = /^-?((0|1?[0-7]?[0-9]?)(([.][0-9]*)?)|180(([.][0]*)?)),-?((0|[1-8]?[0-9]?)(([.][0-9]*)?)|90(([.][0]*)?))$/;   /*定义验证表达式*/
        return reg.test(text);     /*进行验证*/
    },
    centerAtLonLat: function (text) {
        var arr = text.split(",");
        if (arr.length != 2) return;

        var jd = Number(arr[0]);
        var wd = Number(arr[1]);
        if (isNaN(jd) || isNaN(wd)) return;

        this.viewer.mars.centerAt({ x: jd, y: wd, minz: 2500 });

        var dataSource = this.getWorkLayer();

        var inHtml = '<div class="mars-popup-titile">坐标定位</div>\
                      <div class="mars-popup-content" >\
                        <div><label>经度</label>' + jd + '</div>\
                        <div><label>纬度</label>' + wd + '</div>\
                      </div>';

        //添加实体
        var entity = dataSource.entities.add({
            name: "坐标定位",
            position: Cesium.Cartesian3.fromDegrees(jd, wd),
            point: {
                color: new Cesium.Color.fromCssColorString("#3388ff"),
                pixelSize: 10,
                outlineColor: new Cesium.Color.fromCssColorString("#ffffff"),
                outlineWidth: 2,
                heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,     //贴地
                scaleByDistance: new Cesium.NearFarScalar(1000, 1, 1000000, 0.1),
                disableDepthTestDistance: Number.POSITIVE_INFINITY //不被遮挡
            },
            popup: {
                html: inHtml,
                anchor: [0, -12],
            }
        });

        var that = this;
        setTimeout(function () {
            that.viewer.mars.popup.show(entity);
        }, 3000);
    },

    //===================历史记录相关========================

    cookieName: 'querypoi_gis',
    arrHistory: [],
    showHistoryList: function () {
        $("#querybar_histroy_view").hide();

        var lastcookie = haoutil.cookie.get(this.cookieName); //读取cookie值
        if (lastcookie == null) return;

        this.arrHistory = eval(lastcookie);
        if (this.arrHistory == null || this.arrHistory.length == 0) return;

        var inhtml = "";
        for (var index = this.arrHistory.length - 1; index >= 0; index--) {
            var item = this.arrHistory[index];
            inhtml += "<li><i class='fa fa-history'/><a href=\"javascript:widget_queryBaiduPOI.autoSearch('" + item + "');\">" + item + "</a></li>";
        }
        $("#querybar_ul_history").html(inhtml);
        $("#querybar_histroy_view").show();
    },

    clearHistory: function () {
        this.arrHistory = [];
        haoutil.cookie.del(this.cookieName);

        $("#querybar_ul_history").html("");
        $("#querybar_histroy_view").hide();
    },

    //记录历史值
    addHistory: function (data) {
        this.arrHistory = [];
        var lastcookie = haoutil.cookie.get(this.cookieName); //读取cookie值
        if (lastcookie != null) {
            this.arrHistory = eval(lastcookie);
        }
        //先删除之前相同记录
        this.arrHistory.remove(data);

        this.arrHistory.push(data);

        if (this.arrHistory.length > 10)
            this.arrHistory.splice(0, 1);

        lastcookie = JSON.stringify(this.arrHistory);
        haoutil.cookie.add(this.cookieName, lastcookie);
    },


    //======================查询非百度poi，联合查询处理=================
    //外部widget是否存在或启用
    exWidget: null,
    hasExWidget: function () {
        if (window["queryBarWidget"] == null)
            return false;
        else {
            this.exWidget = queryBarWidget;
            return true;
        }
    },
    autoExTipList: function (text) {
        var that = this;
        this.exWidget.autoTipList(text, function () {
            that.autoTipList(text, false);
        });
    },
    //调用外部widget进行查询
    queryExPOI: function (text) {
        var layer = this.getWorkLayer();

        var that = this;
        this.exWidget.strartQueryPOI(text, layer, function () {
            that.strartQueryPOI(text, false);
        });
    }




}));
