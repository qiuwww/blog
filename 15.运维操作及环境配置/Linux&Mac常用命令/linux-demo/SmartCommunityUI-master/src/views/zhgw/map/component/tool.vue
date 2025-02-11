<template>
  <!--工具-->
  <div class="arcgisTool">
    <div id="arcgisTool">
      <div class="toolBarRight animation-slide-top no-print-view">
        <Dropdown v-for="(item,index) in  tool" class="btn btn-link toolBarRight-btn" placement="bottom-end">
          <div v-if="item.item!=null && item.item.length>0">
            <Icon :type="item.icon"/>
            {{ item.name }}
            <Icon type="md-arrow-dropdown"/>
          </div>
          <div v-else v-on:[eventName]="handleClick(item.id+'Click',index)">
            <Icon :type="item.icon"/>
            {{ item.name }}
          </div>
          <DropdownMenu slot="list" v-if="item.item!=null && item.item.length>0">
            <row v-for="(chrItem,indexC)  in item.item" type="flex" justify="start">
              <DropdownItem :name="chrItem.id" @click.native="handleClick(chrItem.id+'Click',indexC)">
                <Icon :type="chrItem.icon"/>
                {{ chrItem.name }}
              </DropdownItem>
            </row>

          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
    <manager-layer ref="managerLayer" v-model="layersIndex"></manager-layer>
    <measure-layer :show="measureShow"></measure-layer>
    <searchLayer v-model="searchLayerShow"></searchLayer>
    <position v-model="positionShow"></position>
    <pointclick ref="pointclick"></pointclick>
    <sql-query v-model="sqlQueryShow"></sql-query>
    <statistics v-model="statisticsShow"></statistics>
    <mapAnalysis v-model="mapAnalysisShow"></mapAnalysis>
  </div>

</template>

<script>
    import {isUndefinedOrnull} from '@/api/tools/tool'
    import {MapConfig} from '@/api/zhgw/config'
    import managerLayer from "./managerLayer";
    import measureLayer from "./measureLayer";
    import searchLayer from "./searchLayer";
    import position from "./position";
    import pointclick from "./pointclick";
    import sqlQuery from "./sqlQuery";
    import statistics from "./statistics";
    import mapAnalysis from "./mapAnalysis";

    export default {
        name: "mapTool",
        components: {
            managerLayer,
            measureLayer,
            searchLayer,
            position,
            pointclick,
            sqlQuery,
            statistics,
            mapAnalysis
        },
        data() {
            return {
                baseMap: null,
                layersIndex: false,
                layersNode: null,
                layerList: [],
                mapConfig: MapConfig,
                tool: MapConfig.tool,
                options: null,
                zoom: null,
                measureShow: false,
                searchLayerShow: false,
                statisticsShow: false,
                pointclickShow: false,
                positionShow: false,
                view: null,
                sqlQueryShow: false,
                eventName: "click",
                mapAnalysisShow: false,
            }
        },
        methods: {
            //初始化
            initMap() {
                if (this.$parent) {
                    this.baseMap = this.$parent.baseMap;
                    this.options = this.$parent.options;
                    this.LayerClick();
                    this.zoom = this.$parent.zoom;
                    this.view = this.$parent.view;
                    this.$refs.pointclick.seachlayer();
                }
            },
            //触发点击事件
            handleClick(i, inedx) {
                let doSomes = i;
                this[doSomes](inedx);
            },
            toolInit() {
                if (isUndefinedOrnull(MapConfig.tool)) {
                    layer.alert('工具配置有错！！请联系管理员！', {
                        icon: 2
                    });
                    return;
                }
                if (MapConfig.tool.length == null) {
                    layer.alert('工具配置有错！！请联系管理员！', {
                        icon: 2
                    });
                    return;
                }
                this.tool = MapConfig.tool;
                //  $("#arcgisTool").html("");
                // var html = "<div class=\"toolBarRight animation-slide-top no-print-view\">";
                // for (var i in MapConfig.tool) {
                //     var tool = MapConfig.tool[i];
                //     var toolHtml = "";
                //     if (isUndefinedOrnull(tool) || isUndefinedOrnull(tool.id)) {
                //         continue;
                //     }
                //     if (isUndefinedOrnull(tool.item)) {
                //         toolHtml = '<button type="button" class="btn btn-link toolBarRight-btn " onclick="' + tool.id + 'Click()"> ' +
                //             '<i class="fa ' + tool.icon + ' "></i>' + tool.name +
                //             '</button>';
                //     } else {
                //         toolHtml = '<div class="btn-group">' +
                //             '<button type="button" class="btn btn-link toolBarRight-btn dropdown-toggle" data-toggle="dropdown" aria-expanded="false">' +
                //             '<i class="fa ' + tool.icon + '"></i>' + tool.name + ' <span class="caret"></span>' +
                //             '</button>' +
                //             '<ul class="dropdown-menu dropdown-menu-right toolBarRight-dropdown-menu" style="min-width: 110px;">';
                //         for (var j in tool.item) {
                //             var item = tool.item[j];
                //             var itemhtml = "";
                //             if (isUndefinedOrnull(item) || isUndefinedOrnull(item.id)) {
                //                 continue;
                //             }
                //             itemhtml = '<li class="widget-btn">' +
                //                 '<a href="javascript:void(0)" onclick="' + item.id + 'Click()"><i class="fa ' + item.icon + '"></i>' + item.name + '</a>' +
                //                 '</li>';
                //             toolHtml += itemhtml;
                //         }
                //         toolHtml += '</ul></div>';
                //     }
                //     html += toolHtml;
                //
                // }
                // html += '</div></div>';
                //  $("#arcgisTool").html(html);

            },
            //图层控制
            LayerClick() {
                if (this.layersIndex != undefined && this.layersIndex != null) {
                    this.layersIndex = !this.layersIndex;
                }
            },
            //放大按钮
            mapEnlargeClick() {
                this.zoom.zoomIn();
            },
            //缩小按钮
            mapNarrowClick() {
                this.zoom.zoomOut();
            },
            //量算按钮
            mapMeasurewClick() {
                this.measureShow = true;
            },
            //poi查询点击事件
            poiSelectClick() {
                this.$parent.setPoiSearchShow();
            },
            //分层查询
            hierarchicalSelectClick() {
                this.searchLayerShow = true;
            },
            //视角书签
            viewpointClick() {
                this.$parent.showBm = true;
                this.$parent.view.ui.add(this.$parent.bookmarks, "top-right");
            },
            //全图
            mapAllClick() {
                this.$parent.view.goTo({
                    center: [105.437583, 28.875387],
                    zoom: 13
                });
            },
            //坐标点定位
            mapPointFlyClick() {
                this.positionShow = true;
            },
            //分屏对比
            splitScreenComparisonClick() {
                this.$parent.showSplitScreen = !this.$parent.showSplitScreen;
            },
            //sql查询
            sqlSelectClick() {
                this.sqlQueryShow = true;
            },
            //分类统计
            mapStatisticsClick() {
                this.statisticsShow = true;
            },
            //点选
            mapPointClick() {
                this.pointclickShow = !this.pointclickShow;
            },
            //地图打印
            mapPrintClick() {
                this.$parent.showPrint = !this.$parent.showPrint;
                if (this.$parent.showPrint) {
                    this.$parent.view.ui.add(this.$parent.print, "top-right");
                }
            },
            //地图分析
            mapAnalysisClick() {
                this.mapAnalysisShow = true;
            },
            //获取树形选中的节点
            getZtreeNodes(){
                let ztreeNodes = this.$refs.managerLayer.getZtreeNodes();
                return ztreeNodes;
            }
        },
        mounted() {
            this.toolInit();
            // window.LayerClick = this.LayerClick;
            // window.mapEnlargeClick = this.mapEnlargeClick;
            // window.mapNarrowClick = this.mapNarrowClick;
            // window.mapMeasurewClick = this.mapMeasurewClick;
            // window.poiSelectClick = this.poiSelectClick;
            // window.hierarchicalSelectClick = this.hierarchicalSelectClick;
            // window.viewpointClick = this.viewpointClick;
            // window.mapAllClick = this.mapAllClick;
            // window.mapPointFlyClick = this.mapPointFlyClick;
            // window.splitScreenComparisonClick = this.splitScreenComparisonClick;
            // window.sqlSelectClick = this.sqlSelectClick;
        },
    }
</script>

<style lang="less">
  .arcgisTool {
    .toolBarRight {
      position: absolute;
      top: 20px;
      left: 15px;
      z-index: 11;
      background: rgba(43, 44, 47, 0.8);
      border-radius: 3px;
      box-shadow: 1px 2px 1px rgba(43, 44, 47, .15);
    }

    .btn-link {
      color: #f5f5f5 !important;
    }

    .toolBarRight-dropdown-menu {
      background: rgba(43, 44, 47, 0.8);
      border: 1px solid rgba(43, 44, 47, 0.8);
    }

    .dropdown-menu {
      padding: 1px 0;
      margin-top: 3px;
      border-radius: 0;
      -webkit-box-shadow: 0 3px 12px rgba(0, 0, 0, .05);
      box-shadow: 0 3px 12px rgba(0, 0, 0, .05);
      -webkit-transition: .25s;
      -o-transition: .25s;
      transition: .25s;
    }

    .dropdown-menu > li {
      padding: 3px 3px;
      margin: 2px 0;
    }

    .toolBarRight-btn {
      list-style-type: none;
      cursor: pointer;
      border-right: solid 1px #2b2c2f;
      color: #edffff;
    }

    .btn {
      padding: 4px 12px;
      font-size: 14px;
      line-height: 1.6;
      border-radius: 3px;
      -webkit-transition: border .2s linear, color .2s linear, width .2s linear, background-color .2s linear;
      -o-transition: border .2s linear, color .2s linear, width .2s linear, background-color .2s linear;
      transition: border .2s linear, color .2s linear, width .2s linear, background-color .2s linear;
    }

    .dark {
      color: #fff;
    }

    .toolBarRight-dropdown-menu {
      background: rgba(43, 44, 47, 0.8);
      border: 1px solid rgba(43, 44, 47, 0.8);
    }

    .toolBarRight-dropdown-menu > li > a {
      color: #edffff;
    }

    .ivu-dropdown {
      z-index: 10;

      .ivu-row-flex:hover {
        color: #edffff;
        background: rgba(43, 44, 47, 0.8);
      }
    }

    .ivu-dropdown .ivu-select-dropdown {
      background: rgba(43, 44, 47, 0.8);
      border: 1px solid rgba(43, 44, 47, 0.8);
    }

    .ivu-dropdown-item {
      color: #edffff;
    }

    .ivu-dropdown-item:hover {
      color: #edffff;
      background: rgba(43, 44, 47, 0.8);
    }

    .dropdown-menu {
      background-color: #45494d;
    }

    .toolBarRight-dropdown-menu > li > a:hover {
      color: #edffff;
      background: rgba(43, 44, 47, 0.8);
    }

    .dropdown-menu {
      background-color: #45494d !important;
    }

    .dropdown-menu > li > a {
      display: block;
      padding: 3px 20px;
      clear: both;
      font-weight: 400;
      line-height: 1.42857143;
      color: #edffff;
      white-space: nowrap;
    }

    .dropdown-menu > li > a :hover {
      color: #fff;
      /*background: #edffff;*/
    }
  }

</style>
