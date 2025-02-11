<style lang="less" scoped>
  .dataOverviewIndex {
    .expand {
      left: 300px;
      position: absolute;
      height: calc(100vh - 66px);
      line-height: calc(100vh - 66px);
      background-color: rgba(30, 36, 50, 0.2) !important;
      width: 5px;
    }

    .leftTree {
      min-width: 220px;
      height: calc(100vh - 66px);
      width: 300px;
      padding: 5px 10px;
      float: left;
      display: block;
      overflow: auto;
    }


    /* 右侧信息容器 */

    .info-content {
      flex: 1;
      width: 100%;
      height: calc(100vh - 66px);
      margin-left: 25px;
      display: flex;
    }

    /* 左半部分 */

    .info-left {
      margin-top: 50px;
      padding: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    /* 左侧三个实时数据大容器 */

    .info-left-up {
      height: 25vh;
      margin-bottom: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    /*三个实时数据小容器*/

    .left-small-block {
      font-size: 15px;
      font-weight: bold;
      color: white;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      width: 32%;
      height: 100%;
      border-radius: 8px;
    }

    /*三个小容器中的状态样式*/

    .left-small-block .device-info-status {
      padding-left: 10px;
    }

    /*时间字体*/

    .device-info-time {
      font-size: 14px;
    }

    /* 左侧视频信息容器 */

    .info-left-middle {
      background: #ddd9d9;
      height: 65vh;
      margin-bottom: 8px;
      position: relative;
    }

    /*视频显示容器 和 提示信息*/

    .info-left-middle .myVideo {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    .device-image {
      width: 100%;
      height: 100%;
      position: relative;
    }

    .image-time {
      position: absolute;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.6);
      color: #fff;
      font-size: 15px;
      padding: 3px 5px;
    }

    /* 提示内容 */

    .info-left-middle .no-videoData {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    /* 右侧折线图容器 */

    .info-right {
      margin-top: 50px;
      padding: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .mt-container {
      display: flex;
      flex-wrap: nowrap !important;
    }
  }
</style>
<template>
  <div class="dataOverviewIndex">
    <Card :padding="0">
      <Row type="flex" justify="space-between" class="mt-container">
        <div class="leftTree" v-if="expand">
          <Input v-model="searchKey" suffix="ios-search" @on-change="searchTreeData" placeholder="输入部门名称搜索" clearable/>
          <div class="tree-bar" style="height: 95%">
            <Tree ref="tree" :data="treeData" @on-select-change="selectTree"></Tree>
            <Spin size="large" fix v-if="treeLoading"></Spin>
          </div>
        </div>
        <div class="expand" :style="{left:marginLeft}">
          <Icon :type="expandIcon" size="25" @click="changeExpand" style="background-color: rgba(30, 36, 50, 0.2);height: 50px;line-height: 50px;"/>
        </div>

        <div class="info-content">
          <Alert style="position: absolute;margin-top: 10px;" :style="{width: alertMargin}">
            动态数据总览：
            <span class="select-title">编号：{{selectTreeNumber}}&emsp;&emsp;名称：{{selectTreeTitle}}</span>
          </Alert>

          <!-- 左侧信息容器 -->
          <div class="info-left col-md-6">
            <!-- 三个实时数据容器 -->
            <div class="info-left-up">
              <div class="left-small-block" id="info_level_id" style="background: rgb(231, 76, 60);">
                <div class="info-line">
                  <span class="device-info-title">水位: </span>
                  <span class="device-info-status" id="info_level_status_id">高报警</span>
                </div>
                <div class="info-line">
                  <span class="device-info-num" id="info_level_num_id" style="color: #fff;">3.437(m)</span>
                </div>
                <div class="info-line">
                  <span class="device-info-time" id="info_level_time_id">{{currentTime}}</span>
                </div>
              </div>
              <div class="left-small-block" id="info_dec_id" style="background: #6495ED;">
                <div class="info-line">
                  <span class="device-info-title">流量: </span>
                  <span class="device-info-status" id="info_dec_status_id">正常</span>
                </div>
                <div class="info-line">
                  <span class="device-info-num" id="info_dec_num_id">0(m³/s)</span>
                </div>
                <div class="info-line">
                  <span class="device-info-time" id="info_dec_time_id">{{currentTime}}</span>
                </div>
              </div>
              <div class="left-small-block" id="info_v_id" style="background: #6495ED">
                <div class="info-line">
                  <span class="device-info-title">电压: </span>
                  <span class="device-info-status" id="info_v_status_id">正常</span>
                </div>
                <div class="info-line">
                  <span class="device-info-num" id="info_v_num_id">12.1(V)</span>
                </div>
                <div class="info-line">
                  <span class="device-info-time" id="info_v_time_id">{{currentTime}}</span>
                </div>
              </div>
            </div>
            <!-- 左侧视频容器 -->
            <div class="info-left-middle video-content" id="info_content_id">
              <video class="myVideo" id="myVideo" controls="" autoplay=""
                     src="http://data.marsgis.cn/video/lukou.mp4"></video>
            </div>
            <!--            &lt;!&ndash;左侧底部信息容器&ndash;&gt;-->
            <!--            <div class="info-left-bottom" style="display: none">-->
            <!--              <table class="layui-hide" id="demo"></table>-->
            <!--            </div>-->
          </div>
          <!-- 折线图数据 -->
          <div class="info-right col-md-6">
            <div ref="waterLevelCharts" style="height: 45vh;width: 98%;overflow: hidden;"></div>
            <div ref="flowCharts" style="height: 45vh;width: 98%;overflow: hidden;"></div>
          </div>
        </div>
      </Row>
    </Card>
  </div>
</template>
<script>

    import {getDeptAndEquipmentPacketTreeData} from "@/api/zhgw/dataOverview/dataOverview";
    import echarts from 'echarts';

    export default {
        data() {
            return {
                expand: true,
                treeLoading: false, // 树加载状态
                expandIcon: "ios-arrow-back",
                selectTreeTitle: '',
                selectTreeNumber: '',
                searchKey: "", // 搜索树
                treeData: [],
                rightSpan: 18,
                marginLeft: '300px',
                alertMargin : 'calc(100% - 342px)',
                waterLevelCharts: {},
                flowCharts: {},
                currentTime:''
            }
        },
        methods: {
            changeExpand() {//扩展 收缩按钮
                this.expand = !this.expand;
                if (this.expand) {
                    this.expandIcon = "ios-arrow-back";
                    this.marginLeft = '300px';
                    this.alertMargin = 'calc(100% - 342px)';
                } else {
                    this.expandIcon = "ios-arrow-forward";
                    this.marginLeft = '0px';
                    this.alertMargin = 'calc(100% - 42px)';
                }
            },
            selectTree(v) {//选择树
                if (v.length > 0) {
                    this.selectTreeTitle = v[0].title;
                    this.selectTreeNumber = v[0].number;
                    // 重新加载右侧数据
                    this.initRightData();
                } else {
                    this.cancelEdit();
                }
            },
            cancelEdit() {//取消选择
                let data = this.$refs.tree.getSelectedNodes()[0];
                if (data) {
                    data.selected = false;
                }
                this.selectTreeTitle = "";
                this.selectTreeNumber = "";
            },
            searchTreeData() {// 加载树形数据
                getDeptAndEquipmentPacketTreeData({searchKey: this.searchKey}).then(res => {
                    if (res && res.success) {
                        this.treeData = res.data;
                        //默认加载第一条设备数据
                        let equipment = this.getFirstChildEquipmentData(res.data, true);
                        if(equipment) {
                            this.selectTreeTitle = equipment.title;
                            this.selectTreeNumber = equipment.number;
                        }
                    }
                });
            },
            getFirstChildEquipmentData(data, flag) {
                for (let i = 0; i < data.length; i++) {
                    if(data[i].equipmentFlag == flag){
                        return data[i];
                    }
                    if(data[i].children){
                        let childEquipmentData = this.getFirstChildEquipmentData(data[i].children, flag);
                        if(childEquipmentData) {
                            return childEquipmentData;
                        }
                    }
                }
            },
            initRightData() {
                this.waterLevelCharts.setOption({
                    title: {
                        text: '水位图形',
                        left: 'center',
                        align: 'right'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'line',
                            animation: true,
                            label: {
                                backgroundColor: '#505765'
                            }
                        }
                    },
                    grid: {
                        bottom: 80
                    },
                    dataZoom: [
                        {
                            show: true,
                            realtime: true,
                            start: 65,
                            end: 85
                        },
                        {
                            type: 'inside',
                            realtime: true,
                            start: 65,
                            end: 85
                        }
                    ],
                    xAxis:
                        {
                            type: 'category',
                            boundaryGap: false,
                            data: [
                                '2009/6/12 2:00',
                                '2009/6/12 3:00',
                                '2009/6/12 4:00',
                                '2009/6/12 5:00',
                                '2009/6/12 6:00',
                                '2009/6/12 7:00',
                                '2009/6/12 8:00',
                                '2009/6/12 9:00',
                                '2009/6/12 10:00',
                                '2009/6/12 11:00',
                                '2009/6/12 12:00',
                                '2009/6/12 13:00',
                                '2009/6/12 14:00',
                                '2009/6/12 15:00',
                                '2009/6/12 16:00',
                                '2009/6/12 17:00',
                                '2009/6/12 18:00',
                                '2009/6/12 19:00',
                                '2009/6/12 20:00',
                                '2009/6/12 21:00',
                                '2009/6/12 22:00',
                                '2009/6/12 23:00',
                                '2009/6/13 0:00',
                                '2009/6/13 1:00',
                                '2009/6/13 2:00',
                                '2009/6/13 3:00',
                                '2009/6/13 4:00',
                                '2009/6/13 5:00',
                                '2009/6/13 6:00',
                                '2009/6/13 7:00',
                                '2009/6/13 8:00',
                                '2009/6/13 9:00',
                                '2009/6/13 10:00',
                                '2009/6/13 11:00',
                                '2009/6/13 12:00',
                                '2009/6/13 13:00',
                                '2009/6/13 14:00',
                                '2009/6/13 15:00',
                                '2009/6/13 16:00'
                            ].map(function (str) {
                                return str.replace(' ', '\n');
                            })
                        }
                    ,
                    yAxis:
                        {
                            name: '单位（m）',
                            type: 'value',
                            max: 5
                        }
                    ,
                    series: [{
                        name: '水位',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {
                            color: '#76BEE2'
                        },
                        // 折线线条颜色
                        lineStyle: {color: '#00BFFF'},
                        // 折线点颜色（散点图颜色描边等样式）
                        itemStyle: {color: '#00BFFF'},
                        data: [3.42, 3.42, 3.42, 3.42, 3.42, 3.42, 3.42, 3.42, 3.42, 3.42, 3.42, 3.42, 3.42, 3.42, 3.42, 3.42, 3.42, 3.42, 3.42, 3.42, 3.42, 3.42, 3.42, 3.42, 3.42, 3.42, 3.42, 3.42, 3.42, 3.42, 3.42, 3.42, 3.42, 3.42, 3.42, 3.42, 3.42, 3.42, 3.42, 3.42],
                        markLine: {
                            label: {
                                position: "end",         //将警示值放在哪个位置，三个值“start”,"middle","end"  开始  中点 结束
                                formatter: "上限（2.5）"
                            },
                            data: [{
                                silent: true,             //鼠标悬停事件  true没有，false有
                                lineStyle: {               //警戒线的样式  ，虚实  颜色
                                    type: "solid",
                                    color: "rgba(238, 99, 99)",
                                    width: 3, // 线的宽度
                                },
                                yAxis: 2.5
                            }]
                        }
                    }]
                });
                this.flowCharts.setOption({
                    title: {
                        text: '流量图形',
                        left: 'center',
                        align: 'right'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'line',
                            animation: true,
                            label: {
                                backgroundColor: '#505765'
                            }
                        }
                    },
                    grid: {
                        bottom: 80
                    },
                    dataZoom: [
                        {
                            show: true,
                            realtime: true,
                            start: 65,
                            end: 85
                        },
                        {
                            type: 'inside',
                            realtime: true,
                            start: 65,
                            end: 85
                        }
                    ],
                    xAxis: {
                        type: 'category',
                        data: [
                            '2009/6/12 2:00',
                            '2009/6/12 3:00',
                            '2009/6/12 4:00',
                            '2009/6/12 5:00',
                            '2009/6/12 6:00',
                            '2009/6/12 7:00',
                            '2009/6/12 8:00',
                            '2009/6/12 9:00',
                            '2009/6/12 10:00',
                            '2009/6/12 11:00',
                            '2009/6/12 12:00',
                            '2009/6/12 13:00',
                            '2009/6/12 14:00',
                            '2009/6/12 15:00',
                            '2009/6/12 16:00',
                            '2009/6/12 17:00',
                            '2009/6/12 18:00',
                            '2009/6/12 19:00',
                            '2009/6/12 20:00',
                            '2009/6/12 21:00',
                            '2009/6/12 22:00',
                            '2009/6/12 23:00',
                            '2009/6/13 0:00',
                            '2009/6/13 1:00',
                            '2009/6/13 2:00',
                            '2009/6/13 3:00',
                            '2009/6/13 4:00',
                            '2009/6/13 5:00',
                            '2009/6/13 6:00',
                            '2009/6/13 7:00',
                            '2009/6/13 8:00',
                            '2009/6/13 9:00',
                            '2009/6/13 10:00',
                            '2009/6/13 11:00',
                            '2009/6/13 12:00',
                            '2009/6/13 13:00',
                            '2009/6/13 14:00',
                            '2009/6/13 15:00',
                            '2009/6/13 16:00'
                        ].map(function (str) {
                            return str.replace(' ', '\n');
                        })
                    },
                    yAxis: {
                        name: '流量m³/s',
                        type: 'value'
                    },
                    series: [{
                        data: [0, 0, 0, 0.78, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        type: 'line',
                        smooth: true,
                        areaStyle: {
                            color: '#76BEE2'
                        },
                        // 折线线条颜色
                        lineStyle: {color: '#00BFFF'},
                        // 折线点颜色（散点图颜色描边等样式）
                        itemStyle: {color: '#00BFFF'}
                    }]
                });
            },

        },
        mounted() {
            this.searchTreeData();
            this.waterLevelCharts = echarts.init(this.$refs.waterLevelCharts);
            this.flowCharts = echarts.init(this.$refs.flowCharts);
            this.initRightData();
            let _this = this;
            this.timer = setInterval(function() {
                _this.currentTime = //修改数据date
                    new Date().getFullYear() +
                    "-" +
                    (new Date().getMonth() + 1) +
                    "-" +
                    new Date().getDate() +
                    " " +
                    new Date().getHours() +
                    ":" +
                    new Date().getMinutes() +
                    ": " +
                    new Date().getSeconds();
            }, 1000);
        },
        destroyed() {
            if (this.timer) {
                clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
            }
        }
    }
</script>
