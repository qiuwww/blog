//模块：模型库
mars3d.widget.bindClass(mars3d.widget.BaseWidget.extend({
    options: {
        //弹窗
        view: {
            type: "window",
            url: "view.html",
            windowOptions: {
                width: 250,
                position: {
                    "top": 50,
                    "right": 5,
                    "bottom": 5
                }
            }
        },
    },
    drawControl: null,
    getServerURL: function () {
        return this.viewer.mars.config.serverURL;
    },
    //初始化[仅执行1次]
    create: function () {
        Cesium.ExpandByMars.occlusionOpen = false;

        var that = this;

        this.drawControl = new mars3d.Draw(this.viewer, {
            hasEdit: false,
            nameTooltip: true,
        });

        //事件监听  
        this.drawControl.on(mars3d.draw.event.DrawCreated, function (e) {
            var entity = e.entity;
            that.startEditing(entity);
        });
        this.drawControl.on(mars3d.draw.event.EditStart, function (e) {
            var entity = e.entity;
            that.startEditing(entity);
        });
        this.drawControl.on(mars3d.draw.event.EditMovePoint, function (e) {
            var entity = e.entity;
            that.startEditing(entity);
        });
        this.drawControl.on(mars3d.draw.event.EditRemovePoint, function (e) {
            var entity = e.entity;
            that.startEditing(entity);
        });
        this.drawControl.on(mars3d.draw.event.EditStop, function (e) {
            var entity = e.entity;
            that.stopEditing(entity);
            that.saveEntity(entity);
        });

        this.drawControl.on(mars3d.draw.event.Delete, function (e) {
            //var entity = e.entity;
            that.showTable();
        });

        this.getList();
    },
    viewWindow: null,
    //每个窗口创建完成后调用
    winCreateOK: function (opt, result) {
        this.viewWindow = result;
    },
    //激活插件
    activate: function () {
        this.drawControl.hasEdit(true);
    },
    //释放插件
    disable: function () {
        this.stopEditing();

        this.viewWindow = null;
        this.drawControl.stopDraw();
        this.drawControl.hasEdit(false);
        //this.deleteAll();  

        //从图层控制中 移除
        //  if(this.layerWork){
        //     unbindLayerControl(this.layerWork);
        // }
    },
    getDefStyle: function (type) {
        return mars3d.draw.util.getDefStyle(type)
    },
    //开始标记
    startDraw: function (defval) {
        if (defval && defval.type === "model") {
            haoutil.msg("模型根据其大小需要一点加载时间，请稍等片刻。");
        }

        // console.log(JSON.stringify(defval));
        this.drawControl.startDraw(defval);
    },
    //结束绘制、等同双击完成绘制，比如手机端无法双击结束
    endDraw: function () {
        this.drawControl.endDraw();
    },
    startEditingById: function (id) {
        var entity = this.drawControl.getEntityById(id);
        if (entity == null) return;
        this.viewer.mars.flyTo(entity);
        entity.startEditing();
    },
    startEditing: function (entity) {
        var that = this;
        if (this.viewWindow == null) return;
        var lonlats = this.drawControl.getCoordinates(entity);

        clearTimeout(this.timeTik);

        var plotAttr = mars3d.widget.getClass('widgets/plotAttr/widget.js');
        if (plotAttr && plotAttr.isActivate) {
            plotAttr.startEditing(entity, lonlats);
        }
        else {
            mars3d.widget.activate({
                uri: 'widgets/plotAttr/widget.js',
                entity: entity,
                lonlats: lonlats,
                deleteEntity: function (entity) {
                    that.deleteCurrentEntity(entity);
                },
                updateAttr: function (attr) {
                    that.updateAttr2map(attr);
                },
                updateGeo: function (positions) {
                    that.updateGeo2map(positions);
                },
                centerAt: function (entity) {
                    that.centerCurrentEntity(entity);
                },
            });
        }
    },
    stopEditing: function () {
        this.timeTik = setTimeout(function () {
            mars3d.widget.disable('widgets/plotAttr/widget.js');
        }, 200);
    },
    //更新图上的属性
    updateAttr2map: function (attr) {
        this.drawControl.updateAttribute(attr);
    },
    //更新图上的几何形状、坐标等
    updateGeo2map: function (positions) {
        this.drawControl.setPositions(positions); //更新当前编辑的entity

        if (positions.length <= 3) {
            var entity = this.drawControl.getCurrentEntity();
            this.centerCurrentEntity(entity);
        }

        return positions;
    },
    centerCurrentEntity: function (entity) {
        //参数解释：线面数据：scale控制边界的放大比例，点数据：radius控制视距距离
        this.viewer.mars.flyTo(entity, { scale: 0.5, radius: 1000 });
    },
    //文件处理
    getGeoJson: function () {
        return this.drawControl.toGeoJSON();
    },
    getCurrentEntityGeoJson: function () {
        var entity = this.drawControl.getCurrentEntity();
        if (entity == null) return;

        return this.drawControl.toGeoJSON(entity);
    },
    jsonToLayer: function (json, isClear, isFly) {
        if (json == null) return;

        this.showTable(json);

        return this.drawControl.loadJson(json, {
            clear: isClear,
            flyTo: isFly
        });
    },
    deleteAll: function () {
        this.drawControl.deleteAll();

        //本地存储
        haoutil.storage.del(this.storageName);


        this.showTable();
    },
    deleteEntity: function (id) {
        var entity = this.drawControl.getEntityById(id);
        if (entity == null) return;

        this.drawControl.deleteEntity(entity);
    },

    isOnDraw: false,
    deleteCurrentEntity: function (entity) {
        var entity = entity || this.drawControl.getCurrentEntity();
        if (entity == null) return;

        this.drawControl.deleteEntity(entity);
        if (window.hasServer) {
            //后台删除
            var entityId = entity.attribute.attr.id;
            if (!entityId) { //表示绘制过程中删除
                this.isOnDraw = true;
                return;
            }
            sendAjax({
                url: "map/plot/" + entityId,
                data: JSON.stringify({}),
                type: "delete",
                contentType: "application/json",
                success: function (result) {

                },
            });

        } else {
            var storagedata = JSON.stringify(this.getGeoJson());
            haoutil.storage.add(this.storageName, storagedata);
        }
    },
    hasEdit: function (val) {
        this.drawControl.hasEdit(val);
    },
    //搜索
    query: function (text, maxcount) {
        var arrEntity = this.drawControl.getEntitys();

        var arr = [];
        var counts = 0;
        for (var i = 0; i < arrEntity.length; i++) {
            var entity = arrEntity[i];

            var name;
            if (entity.attribute.type === "label") {
                name = entity.attribute.style.text;
            } else if (entity.attribute.attr) {
                name = entity.attribute.attr.name;
            }

            if (name == null || name.indexOf(text) == -1) continue;

            arr.push({
                name: name,
                type: '标绘 - ' + entity.attribute.name,
                _datatype: 'plot',
                _entity: entity
            });

            if (maxcount) {
                counts++;
                if (counts > maxcount) break;
            }
        }
        return arr;
    },
    //弹窗属性编辑处理
    last_window_param: null,
    showEditAttrWindow: function (param) {
        this.last_window_param = param;

        //layer.open({
        //    type: 2,
        //    title: '选择数据',
        //    fix: true,
        //    shadeClose: false,
        //    maxmin: true,
        //    area: ["100%", "100%"],
        //    content: "test.html?name=" + param.attrName + "&value=" + param.attrVal,
        //    skin: "layer-mars-dialog animation-scale-up",
        //    success: function (layero) {

        //    }
        //});
    },
    saveWindowEdit: function (attrVal) {
        this.viewWindow.plotEdit.updateAttr(this.last_window_param.parname, this.last_window_param.attrName, attrVal);
        layer.close(layer.index);
    },
    storageName: "marsgis_plot_model",
    getList: function () {
        var that = this;
        if (window.hasServer) {
            //读取后台存储
            sendAjax({
                url: 'map/plot/list',
                type: 'get',
                success: function (arr) {
                    var arrjson = [];
                    for (var i = 0; i < arr.length; i++) {
                        var geojson = JSON.parse(arr[i].geojson);
                        geojson.properties.attr.id = arr[i].id;
                        arrjson.push(geojson);
                    }
                    var entitys = that.drawControl.loadJson({
                        type: "FeatureCollection",
                        features: arrjson
                    }, {
                        clear: true,
                        flyTo: false
                    });
                }
            });
        } else {
            //读取本地存储
            var laststorage = haoutil.storage.get(this.storageName); //读取localStorage值  
            if (laststorage == null || laststorage == 'null') {
            
                 
            } else {
                var json = JSON.parse(laststorage);
                that.jsonToLayer(json, true, true);
            }
        }
    },
    saveEntity: function (entity) {
        if (this.isOnDraw) {
            this.isOnDraw = false;
            return;
        }
        if (this.viewWindow == null) return;

        entity.attribute.attr = entity.attribute.attr || {};
        var entityId = entity.attribute.attr.id;
        var geojsonObj = this.getGeoJson();
        var geojson = JSON.stringify(geojsonObj);
        if (window.hasServer) {
            //服务端存储
            //var geojson = this.drawControl.toGeoJSON(entity);
            if (!entity.attribute.attr.name) {
                this.drawControl.deleteEntity(entity);
                haoutil.msg("名称不可为空！");
                return;
            }
            //新增
            if (!entityId) {
                sendAjax({
                    url: "map/plot/add",
                    type: "post",
                    data: JSON.stringify({
                        name: entity.attribute.attr.name || "", //名称	
                        geojson: geojson || "", //geojson	
                        type: entity.attribute.type, //类型	
                        remark: entity.attribute.attr.remark || "", //备注	
                    }),
                    contentType: "application/json",
                    success: function (data) {

                        entity.attribute.attr.id = data.id;
                    }
                });
            } else {
                //修改
                sendAjax({
                    url: "map/plot/update",
                    data: JSON.stringify({
                        id: entityId,
                        geojson: geojson,
                    }),
                    contentType: "application/json",
                    success: function (result) { },
                });
            }
        } else {
            //本地存储
            //var storagedata = JSON.stringify(this.getGeoJson());
            haoutil.storage.add(this.storageName, geojson);
        }

        this.showTable(geojsonObj);
    },

    showTable: function (json) {
        json = json || this.getGeoJson();

        var arr = [];
        if (json && json.features) {
            for (var i = 0, len = json.features.length; i < len; i++) {
                var feature = json.features[i];

                arr.push({
                    index: i,
                    name: feature.properties.attr.name || feature.properties.name,
                    type: feature.properties.type,
                });
            }
        }
        this.arrList = arr;

        if (this.viewWindow)
            this.viewWindow.tableWork.loadData(arr);
    },
    showTableItem: function (item) {
        var entity = this.drawControl.getEntitys()[item.index];
        this.viewer.mars.flyTo(entity);
    },
    delTableItem: function (item) {
        var entity = this.drawControl.getEntitys()[item.index];
        this.drawControl.deleteEntity(entity);
    }



}));