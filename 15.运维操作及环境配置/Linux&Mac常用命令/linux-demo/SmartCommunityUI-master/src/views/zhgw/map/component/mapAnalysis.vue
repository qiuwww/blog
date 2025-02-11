<template>
  <Modal v-model="modalShow" title="地图分析" :mask-closable="false" :mask="false" class="mapAnalysis" width="500" draggable
         footer-hide @on-cancel="onCancel">
    <div class="divBtnClass">
      <Row>
        <Col span="8">
          <Button @click="mapAnalysisClick($event,'横断面分析')">横断面分析</Button>
        </Col>
        <Col span="8">
          <Button @click="mapAnalysisClick($event,'纵断面分析')">纵断面分析</Button>
        </Col>
        <Col span="8">
          <Button @click="mapAnalysisClick($event,'爆管分析')">爆管分析</Button>
        </Col>
      </Row>
      <Row>
        <Col span="8">
          <Button @click="mapAnalysisClick($event,'连通性分析')">连通性分析</Button>
        </Col>
        <Col span="8">
          <Button @click="mapAnalysisClick($event,'缓冲区分析')">缓冲区分析</Button>
        </Col>
        <Col span="8">
          <Button @click="mapAnalysisClick($event,'剖面分析')">剖面分析</Button>
        </Col>
      </Row>
      <Row>
        <Col span="8">
          <Button @click="mapAnalysisClick($event,'间距分析')">间距分析</Button>
        </Col>
        <Col span="8">
          <Button @click="mapAnalysisClick($event,'交叉口分析')">交叉口分析</Button>
        </Col>
        <Col span="8">
          <Button @click="mapAnalysisClick($event,'水平近距分析')">水平近距分析</Button>
        </Col>
      </Row>
    </div>

    <div id="spanDiv"
         style="position: absolute;top:0;left:0;width: 120px; height: 30px;border:1px solid #00BFFF; display: none;background-color: #FFFAFA;text-align: center;">
      <span style="text-align: center;color: #000;line-height: 28px;margin: 5px;">
        点击以添加点
      </span>
    </div>

    <mapAnalysisTableIndex v-model="itemIndexShow" :allData="tableData" :modalTitle="modalTitle"></mapAnalysisTableIndex>
    <pipelineLayerTableIndex v-model="pipelineLayerTableShow" :allData="pipelineLayerTableData"></pipelineLayerTableIndex>
    <fieldTableIndex v-model="fieldTableIndexShow" :allData="fieldTableIndexData" :type="modalTitle" :valveData="valveData"></fieldTableIndex>
    <bufferIndex v-model="bufferIndexShow" :fieldColumnsData="bufferIndexData"></bufferIndex>
  </Modal>
</template>

<script>
    import axios from 'axios';
    import mapAnalysisTableIndex from "./mapAnalysisTableIndex";
    import pipelineLayerTableIndex from "./pipelineLayerTableIndex";
    import {layerConfig} from "@/api/zhgw/layerConfig";
    import fieldTableIndex from "./fieldTableIndex";
    import bufferIndex from "./bufferIndex";
    import {loadModules} from 'esri-loader';

    export default {
        name: "mapAnalysis",
        components: {
            mapAnalysisTableIndex,//横断面分析结果
            pipelineLayerTableIndex,//纵断面分析结果
            fieldTableIndex,//连通性分析结果
            bufferIndex,//缓冲区分析
        },
        props: {
            value: {
                type: Boolean,
                default: false,
            }
        },
        data() {
            return {
                modalShow: this.value,
                elementArr: [],
                itemIndexShow: false,
                tableData: [],
                modalTitle: '',
                pipelineLayerTableData: [],
                pipelineLayerTableShow: false,
                allPipelineLayerTableData: [],

                fieldTableIndexShow: false,
                fieldTableIndexData: [],

                valveData: {
                    valveTableData: [],
                    pipeData: []
                },

                polylineGraphicArr: [],
                pointGraphicArr: [],

                bufferIndexShow: false,
                bufferIndexData: [],
                bufferClick: false,
            };
        },
        methods: {
            //关闭图层搜索框
            onCancel() {
                this.$parent.mapAnalysisShow = false;
                this.itemIndexShow = false;
                this.pipelineLayerTableShow = false;
                this.fieldTableIndexShow = false;
                for (let i = 0; i < this.elementArr.length; i++) {
                    this.elementArr[i].className = "";
                }
                this.elementArr = [];
                document.removeEventListener("mousemove", this.mousemoveDiv);
            },
            //按钮点击事件
            mapAnalysisClick(element, type) {
                let _this = this;
                this.modalTitle = type;
                document.removeEventListener("mousemove", this.mousemoveDiv);
                if (element.target.className == "") {
                    for (let i = 0; i < this.elementArr.length; i++) {
                        this.elementArr[i].className = "";
                    }
                    this.elementArr = [];
                    element.target.className = "ivu-col ivu-col-span-8 active";
                    this.elementArr.push(element.target);

                    this.itemIndexShow = false;
                    this.pipelineLayerTableShow = false;
                    this.fieldTableIndexShow = false;
                    //清除之前绘制
                    this.$parent.$parent.view.graphics.removeAll();

                    if (type == '横断面分析') {
                        document.getElementById('arcgisMap').style.cursor = 'crosshair';
                        this.crossSectionalClick();
                    } else if (type == '纵断面分析') {
                        document.getElementById('arcgisMap').style.cursor = 'crosshair';
                        this.createRectanglePolygon();
                    } else if (type == '爆管分析') {
                        document.getElementById('arcgisMap').style.cursor = 'crosshair';
                        this.createRectanglePolygon();
                    } else if (type == '连通性分析') {
                        document.getElementById('arcgisMap').style.cursor = 'crosshair';
                        this.createRectanglePolygon();
                    } else if (type == '缓冲区分析') {
                        document.getElementById('arcgisMap').style.cursor = 'default';
                        document.addEventListener("mousemove", this.mousemoveDiv);
                        this.createPoint();
                        this.bufferClick = true;
                    } else if (type == '剖面分析') {

                    } else if (type == '间距分析') {

                    } else if (type == '交叉口分析') {

                    } else if (type == '水平近距分析') {

                    }
                } else {
                    element.target.className = "";
                    document.getElementById('arcgisMap').style.cursor = 'default';
                    this.$parent.$parent.view.graphics.removeAll();
                    document.getElementById('spanDiv').style.display = 'none';
                }
            },
            //缓冲区分析，点击添加点
            createPoint() {
                loadModules(["esri/Map",
                    "esri/views/MapView",
                    "esri/layers/TileLayer",
                    "esri/tasks/IdentifyTask",
                    "esri/tasks/support/IdentifyParameters"])
                    .then(([Map, MapView, TileLayer, IdentifyTask, IdentifyParameters]) => {
                        var identifyTask, params;
                        var view = this.$parent.view
                        var _this = this;
                        view.when(function () {
                            view.on("click", executeIdentifyTask);
                        });

                        function executeIdentifyTask(event) {
                            if (!_this.bufferClick) {
                                return;
                            }
                            _this.bufferClick = false;
                            document.getElementById("arcgisMap").style.cursor = "wait";
                            var soilURL = layerConfig.layers[0].url;
                            identifyTask = new IdentifyTask(soilURL);
                            params = new IdentifyParameters();
                            params.width = view.width;
                            params.tolerance = 5;
                            params.returnGeometry = true;
                            params.layerOption = IdentifyParameters.LAYER_OPTION_ALL;
                            params.height = view.height;
                            params.geometry = event.mapPoint;
                            params.mapExtent = view.extent;
                            identifyTask.execute(params).then(function (response) {
                                var results = response.results;
                                if (results.length > 0) {
                                    //高亮点击的点或者线
                                    //for (let i = 0; i < results.length; i++) {
                                    let feature = results[0].feature;
                                    if (feature.geometry.type == 'polyline') {
                                        //清除之前绘制
                                        for (let i = 0; i < _this.polylineGraphicArr.length; i++) {
                                            _this.$parent.$parent.view.graphics.remove(_this.polylineGraphicArr[i]);
                                        }

                                        let line = new _this.$parent.$parent.Polyline({
                                            hasZ: false,
                                            hasM: true,
                                            paths: feature.geometry.paths,
                                            spatialReference: feature.geometry.spatialReference.wkid
                                        });

                                        // 生成绘制的图形
                                        let graphic = new _this.$parent.$parent.Graphic({
                                            geometry: line,
                                            symbol: {
                                                type: "simple-line",
                                                color: [255, 99, 20],
                                                style: "solid",
                                                width: 3
                                            }
                                        });
                                        // 将绘制的图形添加到view
                                        _this.$parent.$parent.view.graphics.add(graphic);
                                        _this.polylineGraphicArr.push(graphic);
                                    } else if (feature.geometry.type == 'point') {
                                        //高亮选中的点
                                        //清除之前绘制
                                        for (let i = 0; i < _this.pointGraphicArr.length; i++) {
                                            _this.$parent.$parent.view.graphics.remove(_this.pointGraphicArr[i]);
                                        }
                                        let point = new _this.$parent.$parent.Point({
                                            hasZ: false,
                                            hasM: true,
                                            longitude: feature.geometry.longitude,
                                            latitude: feature.geometry.latitude,
                                            spatialReference: feature.geometry.spatialReference.wkid
                                        });
                                        // 生成绘制的图形
                                        let graphic = new _this.$parent.$parent.Graphic({
                                            geometry: point,
                                            symbol: {
                                                type: "simple-marker",
                                                color: [255, 0, 0],
                                                width: 8
                                            }
                                        });
                                        // 将绘制的图形添加到view
                                        _this.$parent.$parent.view.graphics.add(graphic);
                                        _this.pointGraphicArr.push(graphic);
                                    }

                                    _this.bufferIndexData = [];
                                    for (let key in feature.attributes) {
                                        _this.bufferIndexData.push({
                                            name: key,
                                            value: feature.attributes[key]
                                        })
                                    }
                                    _this.bufferIndexShow = true;
                                    //}
                                } else {
                                    _this.$Notice.error({
                                        desc: '没有选中管段！'
                                    });
                                }
                                document.getElementById("arcgisMap").style.cursor = "default";
                                document.removeEventListener("mousemove", _this.mousemoveDiv);
                                document.getElementById('spanDiv').style.display = 'none';
                            });
                        }
                    });
            },
            //缓冲区分析，点击鼠标后面显示小尾巴
            mousemoveDiv(e) {
                let elementById = document.getElementById('spanDiv');
                elementById.style.display = 'block';
                elementById.style.left = e.pageX + "px";
                if (e.pageY > 64) {
                    elementById.style.top = e.pageY - 130 + "px";
                }
            },
            //绘制横断面
            crossSectionalClick() {
                this.enableCreateArea(this.$parent.$parent.Draw, this.$parent.$parent.view);
            },

            //绘制面
            enableCreateArea(Draw, view) {
                var draw = new Draw({
                    view: view
                });
                let _this = this;
                let action = draw.create("polyline", {
                    mode: "click"//点击方式加点
                });
                // 获取焦点
                view.focus();
                // 顶点添加事件
                action.on("vertex-add", _this.createPolyline);
                //顶点移除事件
                action.on("vertex-remove", _this.createPolyline);
                // 鼠标移动事件
                action.on("cursor-update", _this.createPolyline);
                // 绘制完成事件
                action.on("draw-complete", _this.createPolyline);
            },
            //根据点坐标生成新的线
            createPolyline(event) {
                let _this = this;
                //获取所有顶点
                var vertices = event.vertices;
                //清除之前绘制
                _this.$parent.$parent.view.graphics.removeAll();
                var line = new _this.$parent.$parent.Polyline({
                    hasZ: false,
                    hasM: true,
                    paths: [vertices],
                    spatialReference: {wkid: _this.$parent.$parent.view.spatialReference}
                });

                // 生成绘制的图形
                var graphic = new _this.$parent.$parent.Graphic({
                    geometry: line,
                    symbol: {
                        type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                        color: [51, 51, 204, 0.5],
                        style: "solid",
                        outline: {  // autocasts as new SimpleLineSymbol()
                            color: "red",
                            width: 1
                        }
                    }
                });
                // 将绘制的图形添加到view
                _this.$parent.$parent.view.graphics.add(graphic);
                if (event.type == "draw-complete") {
                    //_this.createBuffer(polygon);
                    document.getElementById('arcgisMap').style.cursor = 'default';
                    let geographic = _this.$parent.$parent.webMercatorUtils.webMercatorToGeographic(graphic.geometry);
                    _this.tableData = [];
                    _this.$Spin.show({
                        render: (h) => {
                            return h('div', [
                                h('Icon', {
                                    'class': 'demo-spin-icon-load',
                                    props: {
                                        type: 'ios-loading',
                                        size: 18
                                    }
                                }),
                                h('div', '数据分析中...')
                            ])
                        }
                    });
                    //调取接口，获取返回数据
                    axios({
                        method: 'get',
                        url: "http://192.168.1.200:6080/arcgis/rest/services/WSGK/MapServer/exts/pipelineSpatialAnalysis/transverseSection?inputLine={paths:" + JSON.stringify(geographic.paths) + "}&pipelineTypes=3,4&isJWD=true&f=json"
                    }).then(res => {
                        _this.tableData = res.data.result;
                        _this.itemIndexShow = true;
                    }).catch(res => {
                        _this.$Notice.error({
                            title: '分析失败！' + res,
                        });
                    }).finally(res => {
                        _this.$Spin.hide();
                    });
                }
            },
            //纵断面分析 画矩形筛选管线
            createRectanglePolygon() {
                let Draw = this.$parent.$parent.Draw;
                let view = this.$parent.$parent.view;
                var draw = new Draw({
                    view: view
                });
                let _this = this;

                // 获取焦点
                view.focus();
                let action = draw.create("rectangle", {
                    mode: "click"//点击方式加点
                });
                // 顶点添加事件
                action.on("vertex-add", _this.drawRectangle);
                // 鼠标移动事件
                action.on("cursor-update", _this.drawRectangle);
                // 绘制完成事件
                action.on("draw-complete", _this.drawRectangle);
            },
            drawRectangle(event) {
                let _this = this;
                let view = this.$parent.$parent.view;
                //清除之前绘制
                view.graphics.removeAll();
                let vertices = event.vertices;
                if (vertices.length < 2) {
                    return;
                }
                let rings = [[vertices[0], [vertices[1][0], vertices[0][1]], vertices[1], [vertices[0][0], vertices[1][1]]]];
                let line = {
                    type: "polygon",
                    rings: rings,
                    spatialReference: view.spatialReference
                };
                let lineSymbol = {
                    type: "simple-fill",
                    color: [207, 207, 207, 0.4],
                    style: "solid",
                    outline: {
                        color: "red",
                        width: 1
                    }
                };
                let inputPolygon = new this.$parent.$parent.Graphic({
                    geometry: line,
                    symbol: lineSymbol
                });
                // 将绘制的图形添加到view
                view.graphics.add(inputPolygon);
                if (event.type == "draw-complete") {
                    document.getElementById('arcgisMap').style.cursor = 'default';
                    this.$Spin.show({
                        render: (h) => {
                            return h('div', [
                                h('Icon', {
                                    'class': 'demo-spin-icon-load',
                                    props: {
                                        type: 'ios-loading',
                                        size: 18
                                    }
                                }),
                                h('div', '数据分析中...')
                            ])
                        }
                    });

                    //如果是爆管分析，需要查询阀门
                    if (this.modalTitle.indexOf("爆管分析") > -1) {
                        let geographic = this.$parent.$parent.webMercatorUtils.webMercatorToGeographic(inputPolygon.geometry);
                        this.valveData.valveTableData = [];
                        this.valveData.pipeData = [];
                        axios({
                            method: 'get',
                            url: "http://192.168.1.200:6080/arcgis/rest/services/WSGK/MapServer/exts/pipelineSpatialAnalysis/pipelineburst?inputPolygon={rings:" + JSON.stringify(geographic.rings) + "}&pipelineTypes=3,4&f=json"
                        }).then(res => {
                            if (res.data.error) {
                                _this.$Notice.error({
                                    title: '分析失败！' + res,
                                    desc: res.data.error.message
                                });
                            } else {
                                _this.valveData.valveTableData = res.data.ClosedValve;
                                _this.valveData.pipeData = res.data.PipeLine;
                            }
                            _this.getData(line, view);
                        });
                    } else {
                        _this.getData(line, view);
                    }
                }
            },
            //根据勾选的图层，分析
            getData(line, view) {
                let ztreeNodes = this.$parent.getZtreeNodes();
                //读取配置的管线图层和树形中所勾选的对比，只查询已勾选的管线图层
                let pipelineLayer = [];

                for (let i = 0; i < ztreeNodes.length; i++) {
                    let t = layerConfig.LineLayer.find(item => item.name == ztreeNodes[i].name);
                    if (t) {
                        pipelineLayer.push(t.id);
                    }
                }

                if (pipelineLayer.length > 0) {
                    this.queryPipelineLayer(line, pipelineLayer, 0, []);
                } else {
                    this.$Notice.error({
                        title: "请选择图层进行分析！",
                    });
                    this.$Spin.hide();
                    view.graphics.removeAll();
                }
            },
            queryPipelineLayer(line, pipelineLayer, index, data) {
                let _this = this;
                //定义查询对象
                var queryTask = new this.$parent.$parent.QueryTask(layerConfig.layers[0].url + "/" + pipelineLayer[index]);
                //定义查询参数对象
                var query = new this.$parent.$parent.Query();
                query.geometry = line;
                query.returnGeometry = true;
                query.outFields = ["*"];
                queryTask.execute(query).then(function (results) {
                    data.push(results.features);
                    index = index + 1;
                    if (index < pipelineLayer.length) {
                        _this.queryPipelineLayer(line, pipelineLayer, index, data);
                    } else {
                        //查询完成，展示结果表格
                        _this.$parent.$parent.view.graphics.removeAll();
                        _this.pipelineLayerTableData = [];
                        _this.allPipelineLayerTableData = [];

                        for (let i = 0; i < data.length; i++) {
                            if (data[i] && data[i].length > 0) {
                                for (let j = 0; j < data[i].length; j++) {
                                    var webMercatorToGeographic = _this.$parent.$parent.webMercatorUtils.webMercatorToGeographic(data[i][j].geometry);
                                    _this.pipelineLayerTableData.push({
                                        name: data[i][j].attributes['管线编号'],
                                        position: webMercatorToGeographic.paths[0],
                                        attributes: data[i][j].attributes
                                    });
                                }
                            }
                        }

                        if (_this.modalTitle.indexOf("纵断面") > -1) {
                            if (_this.pipelineLayerTableData.length > 0) {
                                _this.getAllPipelineLayerData(_this.pipelineLayerTableData, 0, []);
                            }
                        } else if (_this.modalTitle.indexOf("连通性") > -1 || _this.modalTitle.indexOf("爆管") > -1) {
                            _this.pipelineLayerTableShow = true;
                            _this.$Spin.hide();
                        }
                    }
                }).catch(res => {
                    console.error(res);
                    this.$Notice.error({
                        title: "分析失败！" + res,
                    });
                    _this.$Spin.hide();
                });
            },
            getAllPipelineLayerData(arr, index, data) {
                let _this = this;
                //调取接口，获取返回数据
                axios({
                    method: 'get',
                    url: "http://192.168.1.200:6080/arcgis/rest/services/WSGK/MapServer/exts/pipelineSpatialAnalysis/transverseSection?inputLine={paths:" + JSON.stringify([arr[index].position]) + "}&pipelineTypes=3,4&isJWD=true&f=json"
                }).then(res => {
                    data.push({
                        name: arr[index].name,
                        data: res.data.result
                    });
                    index = index + 1;
                    if (index < arr.length) {
                        _this.getAllPipelineLayerData(arr, index, data);
                    } else {
                        _this.allPipelineLayerTableData = data;
                        _this.pipelineLayerTableShow = true;
                        _this.$Spin.hide();
                    }
                });
            },
            //高亮图层线
            setLineHeight(row) {
                this.itemIndexShow = false;
                //清除之前绘制
                for (let i = 0; i < this.polylineGraphicArr.length; i++) {
                    this.$parent.$parent.view.graphics.remove(this.polylineGraphicArr[i]);
                }
                let line = new this.$parent.$parent.Polyline({
                    hasZ: false,
                    hasM: true,
                    paths: [row.position],
                });
                // 生成绘制的图形
                let graphic = new this.$parent.$parent.Graphic({
                    geometry: line,
                    symbol: {
                        type: "simple-line",  // autocasts as new SimpleFillSymbol()
                        color: [255, 0, 0],
                        style: "solid",
                        width: 5
                    }
                });
                // 将绘制的图形添加到view
                this.$parent.$parent.view.graphics.add(graphic);
                this.polylineGraphicArr.push(graphic);
                if (this.modalTitle.indexOf("纵断面") > -1) {
                    let ts = this.allPipelineLayerTableData.find((item, index, arr) => {
                        return item.name == row.name
                    });
                    this.tableData = ts.data;
                    this.itemIndexShow = true;
                } else if (this.modalTitle.indexOf("连通性") > -1 || this.modalTitle.indexOf("爆管") > -1) {
                    let find = this.pipelineLayerTableData.find((item, index, arr) => {
                        return item.name == row.name
                    });

                    if (find) {
                        this.fieldTableIndexData = [];
                        for (let key in find.attributes) {
                            this.fieldTableIndexData.push({
                                name: key,
                                value: find.attributes[key]
                            })
                        }
                        this.fieldTableIndexShow = true;
                    }
                }
                var opts = {
                    duration: 2000  // Duration of animation will be 5 seconds
                };
                this.$parent.$parent.view.goTo({
                    center: [Number(row.position[0][0]), Number(row.position[0][1])],
                    zoom: 30
                }, opts);
            }
        },
        watch: {
            value(val) {
                this.modalShow = val;
                if (val) {
                    this.elementArr = [];
                    this.tableData = [];
                    this.modalTitle = '';
                    this.itemIndexShow = false;
                } else {
                    //清除之前绘制
                    for (let i = 0; i < this.polylineGraphicArr.length; i++) {
                        this.$parent.$parent.view.graphics.remove(this.polylineGraphicArr[i]);
                    }
                }
            }
        }
    };
</script>
<style lang="less">
  .demo-spin-icon-load {
    animation: ani-demo-spin 1s linear infinite;
  }

  .mapAnalysis {
    .ivu-modal {
      position: absolute;
      top: 125px;
      left: 15px !important;
    }

    .ivu-modal-content {
      color: #FFFFFF;
      background-color: rgba(30, 36, 50, 0.6);
      border: 1px solid rgba(32, 160, 255, 0.6);
      border-radius: 5px !important;
    }

    .ivu-modal-header-inner {
      color: #FFFFFF;
    }

    .divBtnClass .ivu-row {
      text-align: center;
      padding: 5px;
    }

    .divBtnClass button {
      width: 90%;
      padding: 0;
      color: #fff !important;
      background-color: rgba(30, 36, 50, 0.6) !important;
    }

    .divBtnClass button :hover {
      width: 100%;
      padding: 0;
      color: #fff;
      background-color: #00a0e9;
    }

    .active {
      color: #fff;
      background-color: #00a0e9;
    }

    .divBtnClass {
      .ivu-btn span {
        padding: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .ivu-col-span-8 {
        text-align: center;
      }
    }
  }
</style>
