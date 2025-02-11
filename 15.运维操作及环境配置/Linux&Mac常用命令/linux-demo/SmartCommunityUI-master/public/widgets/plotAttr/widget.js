/* 2019-08-24 11:11:44 | 修改 木遥（微信:  http://marsgis.cn/weixin.html ） */
//模块：
mars3d.widget.bindClass(mars3d.widget.BaseWidget.extend({
    options: {
        //弹窗
        view: {
            type: "window",
            url: "view.html",
            "style": "dark",
            "windowOptions": {
                "skin": "layer-mars-dialog animation-scale-up",
                "width": 250,
                "position": {
                    "top": 10,
                    "right": 5,
                    "bottom": 30
                }
            }
        },
    },
    //初始化[仅执行1次]
    create: function () {
        var that = this;
        $.getJSON(this.path + "config/attr.json", function (data) {
            that.attrConfig = data;

            // that.getDefaultVal();//测试用
            // that.getReadmeTxt(); //测试用


            that.attrConfig["curve"] = that.attrConfig["polyline"]
            that.startEditing();
        });

    },
    //获取所有可配置属性的默认值
    getDefaultVal: function () {
        var data = this.attrConfig;

        //标号默认样式
        var attrDefConfig = {};
        for (var i in data) {
            var defstyle = {};
            for (var idx = 0; idx < data[i].style.length; idx++) {
                var item = data[i].style[idx];
                if (item.defval === "" ) continue;
                defstyle[item.name] = item.defval;
            }
            attrDefConfig[i] = defstyle;
        }
    },
    //获取所有可配置属性的说明文档
    getReadmeTxt: function () {
        var data = this.attrConfig;

        //标号可配置的属性
        var strAPI = '';
        for (var i in data) {
            var strAPIItem = ''
            for (var idx = 0; idx < data[i].style.length; idx++) {
                var item = data[i].style[idx];
                if (haoutil.isutil.isString(item.defval))
                    item.defval = '"' + item.defval + '"'

                strAPIItem += `        "${item.name}": ${item.defval},      //${item.label}  \n`

            }
            strAPI += `{
    "type": "${i}",
    "style": {
${strAPIItem}
    }
}
`;
        }
        haoutil.file.downloadFile("标绘属性配置.txt", strAPI);
    },

    viewWindow: null,
    //每个窗口创建完成后调用
    winCreateOK: function (opt, result) {
        this.viewWindow = result;


    },
    //激活插件
    activate: function () {

    },
    //释放插件
    disable: function () {

    },

    getMinPointNum: function () {
        var entity = this.config.entity;
        if (entity && entity.editing && entity.editing._minPointNum)
            return entity.editing._minPointNum
        return 3;
    },
    getMaxPointNum: function () {
        var entity = this.config.entity;
        if (entity && entity.editing && entity.editing._maxPointNum)
            return entity.editing._maxPointNum
        return 999;
    },
    defaultAttrList: [
        { "name": "id", "label": "主键", "type": "hidden", "defval": "" },
        { "name": "name", "label": "名称", "type": "text", "defval": "" },
        { "name": "remark", "label": "备注", "type": "textarea", "defval": "" }
    ],
    getAttrList: function () {
        return this.config.attrList || this.defaultAttrList;
    },

    startEditing: function (entity, lonlats) {
        if (entity) this.config.entity = entity
        if (lonlats) this.config.lonlats = lonlats

        if (this.viewWindow == null) return;

        var entity = this.config.entity;
        var lonlats = this.config.lonlats;//this.drawControl.getCoordinates(entity);
        this.viewWindow.plotEdit.startEditing(entity.attribute, lonlats);
    },
    //更新图上的属性
    updateAttr2map: function (attr) {
        if (this.config.updateAttr) this.config.updateAttr(attr);
    },
    //更新图上的几何形状、坐标等
    updateGeo2map: function (coords, withHeight) {
        var positions = [];
        if (withHeight) {
            for (var i = 0; i < coords.length; i += 3) {
                var point = Cesium.Cartesian3.fromDegrees(coords[i], coords[i + 1], coords[i + 2]);
                positions.push(point);
            }
        } else {
            for (var i = 0; i < coords.length; i += 2) {
                var point = Cesium.Cartesian3.fromDegrees(coords[i], coords[i + 1], 0);
                positions.push(point);
            }
        }

        if (this.config.updateGeo) this.config.updateGeo(positions);

        return positions;
    },
    centerCurrentEntity: function () {
        var entity = this.config.entity;
        if (this.config.centerAt) this.config.centerAt(entity);
    },
    deleteEntity: function () {
        var entity = this.config.entity;
        if (this.config.deleteEntity) this.config.deleteEntity(entity);
        this.disableBase();
    },

    //文件处理
    getGeoJson: function () {
        var entity = this.config.entity;
        return mars3d.draw.attr.toGeoJSON(entity);
    },



}));
