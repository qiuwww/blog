/* 2017-12-5 14:28:44 | 修改 木遥（微信:  http://marsgis.cn/weixin.html ） */
//此方式：弹窗非iframe模式
mars3d.widget.bindClass(mars3d.widget.BaseWidget.extend({
    options: {
        resources: ['view.css'],
        view: [
            { type: "append", url: "view.html", parent: '#centerDiv' }
        ],
    },
    //此数据也可以放在widget.json的配置中，但是发现很多人容易引起同名误解，所以还是放在这里
    data: [
        { "name": "底图", "icon": "fa fa-map", "widget": "widgets/manageBasemaps/widget.js" },
        { "name": "图层", "icon": "fa fa-tasks", "widget": "widgets/manageLayers/widget.js" },
        {
            "name": "工具",
            "icon": "fa fa-cubes",
            "children": [
                { "name": "图上量算", "icon": "fa fa-calculator", "widget": "widgets/measure/widget.js" },
                { "name": "空间分析", "icon": "fa fa-bar-chart", "widget": "widgets/analysis/widget.js" },

                { "name": "坐标定位", "icon": "fa fa-map-pin", "widget": "widgets/centerXY/widget.js" },
                { "name": "视角书签", "icon": "fa fa-tags", "widget": "widgets/bookmark/widget.js" },
                { "name": "图上标绘", "icon": "fa fa-tags", "widget": "../widgets/plot/widget-emerg.js" }
            ]
        }
    ],
    //初始化[仅执行1次]
    create: function () {

    },
    //每个窗口创建完成后调用
    winCreateOK: function (viewopt, html) {
        if (viewopt.type != "append") return;

        var arr = this.config.data || this.data;

        //移动设备上，处理下菜单层次
        if (!haoutil.system.isPCBroswer()) {
            var item1 = arr.shift();
            var item2 = arr.shift();
            arr[0].children.insert(item2,0);
            arr[0].children.insert(item1,0);
        }

        this.initMenu(arr);


    },
    //构造 菜单
    initMenu: function (arr) {
        var widgetObj = {};

        var inhtml = "";
        for (var i = 0, len = arr.length; i < len; i++) {
            var item = arr[i];
            if (item.hasOwnProperty("visible") && !item.visible) continue;
            if (item.children) { //分组

                inhtml += '<div class="btn-group">\
                                <button type="button" class="btn btn-link toolBarRight-btn dropdown-toggle" data-toggle="dropdown" aria-expanded="false">\
                                    <i class="' + item.icon + '"></i>' + item.name + ' <span class="caret"></span>\
                                </button>\
                                <ul class="dropdown-menu dropdown-menu-right toolBarRight-dropdown-menu" >';
                for (var j = 0, jlen = item.children.length; j < jlen; j++) {
                    var children_item = item.children[j];
                    if (children_item.hasOwnProperty("visible") && !children_item.visible) continue;

                    var ex = "";
                    if (children_item.onclick)
                        ex = 'onclick="' + children_item.onclick + '"';
                    else if (children_item.widget)
                        ex = 'data-widget="' + children_item.widget + '"';

                    inhtml += '<li class="widget-btn" ' + ex + '><a href="javascript:void(0)"><i class="' + children_item.icon + '"></i>' + children_item.name + '</a></li>';
                    widgetObj[children_item.widget] = children_item;
                }
                inhtml += ' </ul></div>';
            }
            else {//不是分组
                var ex = "";
                if (item.onclick)
                    ex = 'onclick="' + item.onclick + '"';
                else if (item.widget)
                    ex = 'data-widget="' + item.widget + '"';

                inhtml += '<button type="button" class="widget-btn btn btn-link toolBarRight-btn " ' + ex + '>\
                            <i class="' + item.icon + '"></i>' + item.name + '\
                        </button>';
                widgetObj[item.widget] = item;
            }
        }
        $(".toolBarRight").html(inhtml);


        $(".toolBarRight .widget-btn").click(function (e) {
            var uri = $(this).attr('data-widget');
            if (haoutil.isutil.isNull(uri)) return;

            if (mars3d.widget.isActivate(uri)) {
                mars3d.widget.disable(uri);
            }
            else {
                var opt = widgetObj[uri] || {};
                opt.uri = uri;

                mars3d.widget.activate(opt);
            }
        });

    },

    //激活插件
    activate: function () {

    },
    //释放插件
    disable: function () {

    },



}));
