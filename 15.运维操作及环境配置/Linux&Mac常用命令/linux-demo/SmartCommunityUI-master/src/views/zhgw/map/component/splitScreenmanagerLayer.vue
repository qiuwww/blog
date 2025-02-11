<template>
  <Modal scrollable  v-bind:class="{'ivu-modal-move':isMousemove}" transfer footer-hide v-model="show" title="图层管理" :mask-closable="false"  :mask="false" class="splitScreen" width="280"
         @on-cancel="onCancel" >
    <ul id="splitScreenTree" class="ztree"></ul>
    <div slot="footer">
    </div>
  </Modal>
</template>

<script>
import {loadModules} from 'esri-loader';

export default {
  name: "splitScreen",
  props: {
    value: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      loading: false,
      show: this.value,
      splitScreenTree: null,
      hasSceneTree: false,
      dragId: null,
      isMousemove:false
    }
  },
  methods: {
    //窗口关闭
    onCancel() {
      this.$parent.layersIndex = !this.$parent.layersIndex;
    },
    //加载树
    loadLayers(layers) {

      for (var index in layers) {
        var chChildren = layers[index];
        if (chChildren != undefined && chChildren != null) {
          this.loadchildren(chChildren);
        }
      }
      this.initZTree(layers);
      this.copyNode(); //复制树
      this.addTrueNodeOpacityRangeDom();
    },
    //加载子节点
    loadchildren(children) {
      if (children != undefined && children != null) {
        if (children.type != undefined && children.layerurl != undefined && children.type != null && children.layerurl != null) {
          return;
        }
        if (children.children != undefined && children.children != null) {
          for (var index in children.children) {
            var chChildren = children.children[index];
            if (chChildren != undefined && chChildren != null) {
              this.loadchildren(chChildren);
            }
          }
        }
      }
    },
    copyNode() { //复制树
      var tree2 = $.fn.zTree.getZTreeObj("splitScreenTree");
      this.$parent.layersNode = tree2.getNodes();
    },

    //设置树展开节点的级别
    fillter(treeObj) {
      if (treeObj) {
        //获得树形图对象
        var nodeList = treeObj.getNodes();　　　　　　 //展开第一个根节点
        for (var i = 0; i < nodeList.length; i++) { //设置节点展开第二级节点
          treeObj.expandNode(nodeList[i], true, false, true);
          var nodespan = nodeList[i].children;
          for (var j = 0; j < nodespan.length; j++) { //设置节点展开第三级节点
            treeObj.expandNode(nodespan[j], true, false, true);
          }
        }
      }

    },
    initZTree(data) { //初始化树
      var self = this;

      var setting = {
        view: {
          //addDiyDom: self.addOpacityRangeDom,
          dblClickExpand: true,
          selectedMulti: true, //可以多选
          showLine: true
        },
        check: {
          enable: true, //显示复选框
          chkStyle: "checkbox"
        },
        edit: { //此属性添加后，树才可以被拖拽
          enable: true,
          showRemoveBtn: false,
          showRenameBtn: false,
          drag: {
 			autoExpandTrigger: true,
            prev: true,
            next: true,            inner: false //拖拽到目标节点时，设置是不允许成为目标节点的子节点
          }
        },
        callback: {
          onClick: self.zTreeOnClick,
          onCheck: self.zTreeOnCheck,
          beforeDrag: function (treeId, treeNodes) {
            for (var i = 0, l = treeNodes.length; i < l; i++) {
              if (treeNodes[i].drag === false) {
                return false;

              }
            }
            return true;
          }, beforeDrop: function (treeId, treeNodes, targetNode, moveType, isCopy) {
            if (treeNodes[0].children ||(treeNodes[0].params && treeNodes[0].params.parentNodeId)) {
              return false;
            }
            if (treeNodes[0].parentTId != targetNode.parentTId) {
              return false;
            }
            return true;
          }, onDrag: function () {
            //console.log("拖拽中");
            return true;
          },
          onDrop: self.zTreeOnCheckOnDrop
        }
      };
      var treeObj = $.fn.zTree.init($("#splitScreenTree"), setting, data);
      self.fillter(treeObj);
      this.splitScreenTree = $('#splitScreenTree');
      this.hasSceneTree = true;
    },
    //树点击事件
    zTreeOnClick(event, treeId, treeNode) {
      var node = treeNode;
      if (treeNode && treeNode.params) {
        if (treeNode.params.type && (this.$parent.layerList == undefined || this.$parent.layerList == null || this.$parent.layerList.length == 0 || this.$parent.layerList["" + treeNode.id] == undefined)) {
          return;
        }
        let layer = this.$parent.layerList["" + treeNode.id];
        let latitude =  (layer.sourceJSON.initialExtent.xmin + layer.sourceJSON.initialExtent.xmax)/2
        let longitude = (layer.sourceJSON.initialExtent.ymax + layer.sourceJSON.initialExtent.ymin)/2

        var opts = {
          duration: 4000  // Duration of animation will be 5 seconds
        };
        this.$parent.view.goTo({
          center: [latitude,longitude],
          zoom: 16
        },opts)
      }
    },
    //树选中/不选中事件
    zTreeOnCheck(event, treeId, treeNode) {
      if (treeNode && treeNode.id) {
        this.nodeLayerCheck(treeNode);
      }

      this.copyNode(); //复制树

    },
    //树选中/不选中事件(父节点影响的子节点)
    layerChildrenCheck(Children) {
      if (Children != undefined || Children != null) {
        for (var i = 0; i < Children.length; i++) {
          let treeNode = Children[i];
          this.nodeLayerCheck(treeNode);
        }
      }

    },
    //树节点选中/不选中
    nodeLayerCheck(treeNode) {
      if (treeNode.children) {
        this.layerChildrenCheck(treeNode.children);
      }
      if (treeNode.params && treeNode.params.type && treeNode.params.parentNodeId ==undefined && (this.$parent.layerList == undefined || this.$parent.layerList == null || this.$parent.layerList.length == 0 || this.$parent.layerList["" + treeNode.id] == undefined)) {
        this.loadServerTypeMap(treeNode.id, treeNode);
        return;
      }
      if(treeNode.params && treeNode.params.parentNodeId){
        let layer = this.$parent.layerList["" + treeNode.params.parentNodeId];
        for(let index in layer.allSublayers.items){
          let item = layer.allSublayers.items[index];
          if(item.id==treeNode.params.layerId){
            item.visible=treeNode.checked;
            break;
          }

        }
        return;
      }
      let layer = this.$parent.layerList["" + treeNode.id];
      if(layer){
        if (treeNode.checked) {
          treeNode.params.alpha = 1;
          layer.visible = true;

        } else {
          treeNode.params.alpha = 0;
          layer.visible = false;
        }
      }

      this.addOpacityRangeDom(treeNode.id, treeNode);
    },
    //加载子图层
    loadSubChildrenCheck(node,layer){
      if(node && layer && layer .allSublayers && layer.allSublayers.items && layer.allSublayers.items.length>0){
        let tree2 = $.fn.zTree.getZTreeObj("splitScreenTree");
        for(let index in layer.allSublayers.items){
          let item = layer.allSublayers.items[index];
          if(item && item.title){
            let childrenNode = {
              name:item.title,
              params:{
                layerId:item.id,
                parentLayerId:layer.id,
                parentNodeId:node.id,
              },
              checked: item.visible,
              id:layer.id + item.id
            }
            tree2.addNodes(node, childrenNode);
          }
        }
      }
    },
    //拖拽结束
    zTreeOnCheckOnDrop(event, treeId, treeNodes, targetNode, moveType, isCopy) {
      //console.log("拖拽完毕");
      if (treeNodes[0].parentTId && treeNodes[0].parentTId == this.dragId && targetNode.parentTId && targetNode.parentTId == this.dragId) {
        var tree2 = $.fn.zTree.getZTreeObj("splitScreenTree");
        this.$parent.layersNode = tree2.getNodes();
        var updateNode = tree2.getNodes();
        this.reorderNodeLayers(updateNode);
      }
      return true;
    },
    //重置图层层级
    reorderNodeLayers(updateNode, zIndex) {
      for (var i = 0; i < updateNode.length; i++) {
        let node = updateNode[i];
        if (node && node.id && node.params && node.params.type && this.$parent.layerList && this.$parent.layerList["" + node.id] != undefined && zIndex != undefined) {
          let layer = this.$parent.layerList["" + node.id];
          this.$parent.baseMap.reorder(layer, (zIndex + 1 + i));
        }
        if (node.children) {
          this.reorderNodeLayers(node.children, node.zIndex);
        }
      }
    },
    udpateLayerOpacity(layer, Opacity, type) { //更新透明度
      var no = 1;
      if (Opacity) {
        no = Opacity;
      }
      if (Opacity == 0) {
        no = 0.01;
      }
      if (layer == undefined || layer == null) {
        return;
      }
      if (type == undefined) {
        layer.opacity = no;
        return;
      }

    },
    addOpacityRangeDom(treeId, treeNode) { //添加滑块控制透明
      if (treeNode != null && treeNode.params && treeNode.params.type != undefined && treeNode.params.type != null) {

        if (this.$parent.layerList == undefined || this.$parent.layerList == null) {
          this.loadServerTypeMap(treeNode.id, treeNode);
        }
        var layer = this.$parent.layerList["" + treeNode.id];
        if (layer == undefined || layer == null) {
          return;
        }


        var r = $("#" + treeNode.tId);
        var ul = $("#" + treeNode.tId+"_ul");

        if ($("#" + treeNode.tId + "_range") == undefined || $("#" + treeNode.tId + "_range") == null || $("#" + treeNode.tId + "_range").html() == undefined) {

          let a = "<div id='" + treeNode.tId + "_range'  style = 'width:50px;margin:-16px 10px 3px 150px'></div>";
          if(ul && treeNode.children){
            ul.before(a);
          }
          else{
            r.append(a);
          }

        } else {
          $("#" + treeNode.tId + "_range").show();
        }
        if (!treeNode.checked)
          $("#" + treeNode.tId + "_range").hide();
        var self = this;


        this.udpateLayerOpacity(layer, treeNode.params.alpha, treeNode.params.type);
        var _this = this;
        treeNode.checked || $("#" + treeNode.tId + "_range").hide(),

          $("#" + treeNode.tId + "_range").slider({
            range: "min",
            value: 100,
            min: 0,
            max: 100,
            slide: function (event, ui) {
              var evalue = ui.value;
              var t = evalue / 100;
              r = layer;
              self.treeNode = treeNode;
              //设置图层的透明度
              _this.udpateLayerOpacity(layer, t);
            }
          });

        $("#" + treeNode.tId + "_range").range({
          min: 0,
          max: 100,
          step: 1,
          value: (layer.opacity || 1) * 100,
          onChange: function (value) {
            var opacity = value / 100;

            //设置图层的透明度
            _this.udpateLayerOpacity(layer, opacity);

          }
        });

      }
    },
    addTrueNodeOpacityRangeDom() { //初始化树后给选中的节点添加透明条
      var zTreeON = $.fn.zTree.getZTreeObj("splitScreenTree");
      if (zTreeON == undefined || zTreeON == null) {
        return;
      }
      var ztreenodes = zTreeON.getCheckedNodes(true); //获取选中的节点
      var ids = [];
      for (var index in ztreenodes) {
        var node = ztreenodes[index];

        this.loadServerTypeMap(node.id, node);
      }

    },
    addOldTrueNodeOpacityRangeDom() { //初始化树后给选中的节点添加透明条
      var zTreeON = $.fn.zTree.getZTreeObj("splitScreenTree");
      if (zTreeON == undefined || zTreeON == null) {
        return;
      }
      var ztreenodes = zTreeON.getCheckedNodes(true); //获取选中的节点
      var ids = [];
      for (var index in ztreenodes) {
        var node = ztreenodes[index];

        this.addOpacityRangeDom(node.id, node);
      }

    },
    /**
     * 加载不同类型地图服务的底图
     @ id 图层的id标识
     */
    loadServerTypeMap(id, node) {
      if (node && node.params && node.params.type) {
        let params = node.params;
        var _this = this;
        loadModules(["esri/Map",
          "esri/config",
          "esri/request",
          "esri/Color",
          "esri/views/SceneView",
          "esri/widgets/LayerList",
          "esri/layers/BaseTileLayer",
          "esri/layers/CSVLayer",
          "esri/layers/FeatureLayer",
          "esri/layers/ImageryLayer",
          "esri/layers/MapImageLayer",
          "esri/layers/WebTileLayer",
          "esri/layers/TileLayer",
          "esri/layers/WMSLayer",
          "esri/layers/WMTSLayer",
          "esri/layers/VectorTileLayer",
          "dojo/domReady!"], this.$parent.options)
          .then(([Map, esriConfig, esriRequest, Color,
                   SceneView, LayerList, BaseTileLayer, CSVLayer, FeatureLayer, ImageryLayer, MapImageLayer, WebTileLayer, TileLayer, WMSLayer, WMTSLayer, VectorTileLayer]) => {
            let TintLayer = BaseTileLayer.createSubclass({
              properties: {
                urlTemplate: null,
                tint: {
                  value: null,
                  type: Color
                }
              },

              // generate the tile url for a given level, row and column
              getTileUrl: function (level, row, col) {
                return this.urlTemplate.replace("{z}", level).replace("{x}",
                  col).replace("{y}", row);
              },

              // This method fetches tiles for the specified level and size.
              // Override this method to process the data returned from the server.
              fetchTile: function (level, row, col) {

                // call getTileUrl() method to construct the URL to tiles
                // for a given level, row and col provided by the LayerView
                var url = this.getTileUrl(level, row, col);

                // request for tiles based on the generated url
                // set allowImageDataAccess to true to allow
                // cross-domain access to create WebGL textures for 3D.
                return esriRequest(url, {
                  responseType: "image",
                  allowImageDataAccess: true
                })
                  .then(function (response) {
                    // when esri request resolves successfully
                    // get the image from the response
                    var image = response.data;
                    var width = this.tileInfo.size[0];
                    var height = this.tileInfo.size[0];

                    // create a canvas with 2D rendering context
                    var canvas = document.createElement("canvas");
                    var context = canvas.getContext("2d");
                    canvas.width = width;
                    canvas.height = height;


                    // Draw the blended image onto the canvas.
                    context.drawImage(image, 0, 0, width, height);

                    return canvas;
                  }.bind(this));
              }
            });


            let layer;
            let spatialReference = {
              wkid: 4326
            }
            switch (params.type) {
              case 0: //CSVLayer
                var curlayer = new CSVLayer({
                  url: params.url,//服务地址
                  spatialReference: spatialReference,//坐标系
                });
                layer = {
                  layer: curlayer,
                  id: id
                };
                break;
              case 1: //FeatureLayer
                var curlayer = new FeatureLayer({
                  url: params.url,//服务地址
                  spatialReference: spatialReference,//坐标系
                });
                layer = {
                  layer: curlayer,
                  id: id
                };
                break;
              case 2: //ImageryLayer
                var curlayer = new ImageryLayer({
                  url: params.url,//服务地址
                  spatialReference: spatialReference,//坐标系
                });
                layer = {
                  layer: curlayer,
                  id: id
                };
                break;
                break;
              case 3: //MapImageLayer
                var curlayer = new MapImageLayer({
                  url: params.url,//服务地址
                  spatialReference: spatialReference,//坐标系
                });
                layer = {
                  layer: curlayer,
                  id: id
                };
                break;

              case 4: //WebTileLayer
              {
                var curlayer = new WebTileLayer({
                  urlTemplate: params.url,//服务地址
                });
                layer = {
                  layer: curlayer,
                  id: id
                };
                break;
              }
              case 5: //TileLayer
                var curlayer = new TileLayer({
                  url: params.url,//服务地址
                  // spatialReference: spatialReference,//坐标系
                });
                layer = {
                  layer: curlayer,
                  id: id
                };
                break;
              case 6: //WMSLayer
                var curlayer = new WMSLayer({
                  url: params.url,//服务地址
                  spatialReference: spatialReference,//坐标系
                });
                layer = {
                  layer: curlayer,
                  id: id
                };
                break;
              case 7: //WMTSLayer
                var curlayer = new WMTSLayer({
                  url: params.url,//服务地址
                  spatialReference: spatialReference,//坐标系
                });
                layer = {
                  layer: curlayer,
                  id: id
                };
                break;
              case 8: //xyz
                if (!params.server) {
                  this.$message.error("参数错误请联系管理员！！！");
                  return;
                }
                esriConfig.request.corsEnabledServers.push(params.server);

                var curlayer = new TintLayer({
                    urlTemplate: params.url,
                    title: params.name
                  }
                );
                layer = {
                  layer: curlayer,
                  id: id
                };
                break;

              case 9: //VectorTileLayer
              {
                var curlayer = new VectorTileLayer({
                  url: params.url,//服务地址
                  spatialReference: spatialReference,//坐标系
                });
                layer = {
                  layer: curlayer,
                  id: id
                };
                break;
              }
              case 10: {

                if (!params.server) {
                  this.$message.error("参数错误请联系管理员！！！");
                  return;
                }
                esriConfig.request.corsEnabledServers.push(params.server);
                let BaiduMapLayer = BaseTileLayer.createSubclass({
                  properties: {
                    urlTemplate: null
                  },
                  getTileUrl: function (level, row, col) {
                    var zoom = level - 1;
                    var offsetX = Math.pow(2, zoom);
                    var offsetY = offsetX - 1;
                    var numX = col - offsetX;
                    var numY = (-row) + offsetY;
                    zoom = level + 1;
                    return this.urlTemplate.replace("{z}", zoom).replace("{x}",
                      numX).replace("{y}", numY);

                  },
                  fetchTile: function (level, row, col) {
                    var url = this.getTileUrl(level, row, col);
                    return esriRequest(url, {
                      responseType: "image"
                    })
                      .then(function (response) {

                        var image = response.data;
                        var width = this.tileInfo.size[0];
                        var height = this.tileInfo.size[0];

                        var canvas = document.createElement("canvas");
                        var context = canvas.getContext("2d");
                        canvas.width = width;
                        canvas.height = height;

                        context.drawImage(image, 0, 0, width, height);

                        return canvas;
                      }.bind(this));
                  }
                });

                var curlayer = new BaiduMapLayer({
                    urlTemplate: params.url,
                    title: params.name
                  }
                );
                layer = {
                  layer: curlayer,
                  id: id
                };
                break;

              }
            };
            let zIndex = 1000000;
            if (params.zIndex) {
              zIndex = params.zIndex
            }
            this.$parent.baseMap.add(layer.layer, zIndex)
            if (layer) {
              this.$parent.layerList["" + layer.id] = layer.layer;

            }
            _this.addOpacityRangeDom(node.id, node);
            //在视图中呈现后触发。
            layer.layer.when(function(){
              _this.loadSubChildrenCheck(node,layer.layer);
            }, function(error){
              // This function will execute if the promise is rejected due to an error
            });

          });
      }
    },
    /**
     * 删除指定ID的图层
     */
    deleteServerTypeMap(id) {
      switch (typeof (id)) {

        case "undefined":
          break;
      }
    },
  },
  watch: {
    value(val) {
      this.show = val;
    },
    show(val) {
      this.loading = false;
      if (this.$parent == undefined || this.$parent == null) {

        return;
      }
      // if (this.$parent.layersNode != undefined && this.$parent.layersNode != null) {
      //   var data = [];
      //   this.initZTree(data);
      //   var tree2 = $.fn.zTree.getZTreeObj("splitScreenTree");
      //   tree2.addNodes(null, this.$parent.layersNode, null);
      //   this.$parent.layersNode = tree2.getNodes();
      //   this.addOldTrueNodeOpacityRangeDom();
      // } else {
        this.loadLayers(this.$parent.mapConfig.Layers);
      // }

    }
  }
}
</script>

<style lang="less">
.splitScreen {
  .ztree{
    height:calc(100vh - 265px);
    overflow-y:auto;
    overflow-x:hidden;

  }
  /*-------滚动条整体样式----*/
  .ztree::-webkit-scrollbar {
    width:8px;
    height:8px;
  }
  /*滚动条里面小方块样式*/
  .ztree::-webkit-scrollbar-thumb {
    border-radius:100px;
    -webkit-box-shadow:inset 0 0 5px rgba(0,0,0,0.2);
    background: #212020;
  }
  /*滚动条里面轨道样式*/
  .ztree::-webkit-scrollbar-track {
    -webkit-box-shadow:inset 0 0 5px rgba(0,0,0,0.2);
    border-radius:0;
    background:rgba(0,0,0,0.1);
  }
  .ivu-modal-no-mask {
    z-index: 10 !important;
  }

  .ivu-modal {
    position:absolute;
    top: 125px;
    right: 15px;
    max-height: 600px;
  }


  .ivu-modal-content {
    color: #FFFFFF;
    background-color: rgba(30, 36, 50, 0.6);
    border: 1px solid rgba(32,160,255,0.6);
    border-radius: 5px !important;
  }

  .ivu-modal-header-inner {
    color: #FFFFFF;
  }
}
</style>
