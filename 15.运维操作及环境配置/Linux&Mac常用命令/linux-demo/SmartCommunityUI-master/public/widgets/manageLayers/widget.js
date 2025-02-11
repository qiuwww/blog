/* 2017-12-4 08:27:25 | 修改 木遥（微信:  http://marsgis.cn/weixin.html ） */
//模块：
mars3d.widget.bindClass(mars3d.widget.BaseWidget.extend({
    options: {
        //弹窗
        view: {
            type: "window",
            url: "view.html",
            windowOptions: {
                width: 250,
                height: 500
            }
        }
    },
    hasManagerBaseMaps: true, //是否对基础底图做做控制
    //初始化[仅执行1次]
    create: function () {

    },
    viewWindow: null,
    //每个窗口创建完成后调用
    winCreateOK: function (opt, result) {
        this.viewWindow = result;
    },
    //打开激活
    activate: function () {


    },
    //关闭释放
    disable: function () {
        this.viewWindow = null;

    },

    _layers: null,
    //绑定自定义的非配置图层到图层控制控件中
    addOverlay: function (item) {

        if (!item.name)
            item.name = "未命名";
        if (!item.id)
            item.id = viewer.mars.getNextId();
        if (!item.pid)
            item.pid = -1;

        //计算层次顺序
        var order = Number(item.order);
        if (isNaN(order))
            order = this._layers.length + 1;
        item.order = order;

        //主键，用于存储取图层用，防止有重复
        item._key = this._layers.length + "_" + item.id + "_" + item.name;

        this._layers.push(item);

        if (this.isActivate && this.viewWindow) {
            this.viewWindow.addNode(item);
        }
    },



    //从图层控制控件中删除指定的图层
    removeLayer: function (name) {
        for (var i = 0; i < this._layers.length; i++) {
            var item = this._layers[i];

            if (item.name == name) {
                this._layers.splice(i, 1);

                if (this.isActivate && this.viewWindow) {
                    this.viewWindow.removeNode(item);
                }
                break;
            }
        }
    },

    getLayers: function () {

        if (this._layers == null) {
            var layers = [];
            var basemapsCfg = this.hasManagerBaseMaps ? this.viewer.mars.config.basemaps : [];
            var operationallayersCfg = this.viewer.mars.config.operationallayers;


            //构建集合，预处理相关数据  
            for (var i = 0; i < basemapsCfg.length; i++) {
                var item = basemapsCfg[i];
                layers.push(item);

                // if (item.type == "group" && item.layers) { //group是否打开控制子图层，是的话取消注释
                //     for (var idx = 0; idx < item.layers.length; idx++) {
                //         var childitem = item.layers[idx];

                //         if (!childitem.name)
                //             childitem.name = item.name + '-' + (idx + 1);

                //         childitem._parent = item;
                //         layers.push(childitem);
                //     }
                // }
            }

            for (var i = 0; i < operationallayersCfg.length; i++) {
                var item = operationallayersCfg[i];
                layers.push(item);

                // if (item.type == "group" && item.layers) {//group是否打开控制子图层，是的话取消注释
                //     for (var idx = 0; idx < item.layers.length; idx++) {
                //         var childitem = item.layers[idx];

                //         if (!childitem.name)
                //             childitem.name = item.name + '-' + (idx + 1);

                //         childitem._parent = item;
                //         layers.push(childitem);
                //     }
                // }
            }

            //初始化顺序字段,
            for (var i = 0; i < layers.length; i++) {
                var item = layers[i];

                //主键，用于存储取图层用，防止有重复
                item._key = i + "_" + item.id + "_" + item.name;
            }
            this._layers = layers;
        }
        return this._layers;
    },
    //定位
    getLayar: function (item) {
        return this.viewer.mars.getLayer(item);
    },
    centerAt: function (item) {
        var model = this.getLayar(item);
        model && model.centerAt();
    },
    getLayerVisible: function (item) {
        var model = this.getLayar(item);
        return model && model.getVisible();
    },
    //更新图层:显示隐藏状态
    updateLayerVisible: function (item, visible) {
        var model = this.getLayar(item);

        model.config.visible = visible; //修改配置中的值

        model.setVisible(visible);


        if (visible && this.config.autoCenter
            && !model.config.noCenter)//在对应config.json图层节点配置noCenter:true 可以不定位
            model.centerAt();

        //存在关联widget时 
        if (item.onWidget) {
            if (visible) {
                mars3d.widget.activate({
                    uri: item.onWidget,
                    layerItem: item,
                    disableOther: false
                });
            } else {
                mars3d.widget.disable(item.onWidget);
            }
        }

        //更新到分屏对比
        // var mapCompare = mars3d.widget.getClass('widgets/mapCompare/widget.js');
        // if (mapCompare) {
        //     mapCompare.updateLayerVisible(model.config, visible);
        // } 
    },
    //更新图层:透明度
    udpateLayerOpacity: function (item, opacity) {
        var model = this.getLayar(item);
        model.setOpacity(opacity);
    },
    //更新图层:顺序
    udpateLayerZIndex: function (item, order) {
        var model = this.getLayar(item);
        model.setZIndex(order);
    }
}));
