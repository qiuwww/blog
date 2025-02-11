<style lang="less">
  .siteDetail {
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
      background: #eee;
      flex: 1;
      width: 100%;
      height: calc(100vh - 66px);
      margin-left: 25px;
      display: flex;
    }

    /* 左半部分 */

    .info-left {
      margin-top: 40px;
      min-width: 465px;
      padding: 20px;
      display: flex;
      flex-direction: column;
      justify-content: start;

      .ivu-card-body {
        height: calc(100% - 70px);
        overflow-y: auto;
      }

      .ivu-table-tip {
        overflow-x: hidden !important;
      }
    }

    /* 右侧折线图容器 */

    .info-right {
      margin-top: 40px;
      padding: 20px;
      display: flex;
      flex-direction: column;
      justify-content: start;

      .ivu-card-body {
        height: calc(100% - 70px);
        overflow-y: auto;
      }

      .listul {
        margin-left: 18px;
        overflow: hidden;
        display: flex;
        flex-wrap: wrap;
        justify-content: left;
      }

      .listul li {
        margin: 10px 15px;
        width: 160px;
        position: relative;
      }

      .listul li span {
        position: absolute;
        bottom: 0px;
        width: 100%;
        text-align: center;
        background: rgba(0, 0, 0, 0.6);
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#99000000, endColorstr=#99000000);
        color: #fff;
        font-size: 15px;
        padding: 3px 0;
      }

      .listul img {
        width: 100%;
        height: auto;
      }

      .piclist {
        width: 100%;
        height: 98%;
        margin: 0 auto;
        overflow: auto;
      }
    }

    .ivu-row-flex {
      flex-wrap: nowrap;
    }

    .ivu-table td {
      height: 35px;
    }
  }
</style>
<template>
  <div class="siteDetail">
    <Card :padding="0">
      <Row type="flex" justify="space-between">
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
          <Alert style="position: absolute;margin-left: 20px;margin-right: 20px;margin-top: 10px;" :style="{width: alertMargin}">
            站点详情：
            <span class="select-title">编号：{{selectTreeNumber}}&emsp;&emsp;名称：{{selectTreeTitle}}</span>
          </Alert>
          <!-- 左侧信息容器 -->
          <div class="info-left col-md-6">
            <Card style="height: 100%;">
              <p slot="title" style="height: 30px;">
                实时数据
                <Tag color="success">正常</Tag>
                <Tag color="error">异常</Tag>
              </p>
<!--              <a href="#" slot="extra" @click.prevent="refreshData">-->
<!--                <Icon type="md-refresh" size="20"/>-->
<!--              </a>-->
              <Table border width="100%" :columns="tableColumns" :data="tableData"></Table>
            </Card>
          </div>
          <!-- 又侧信息容器 -->
          <div class="info-right col-md-6">
            <Card style="height: 100%;">
              <p slot="title" style="height: 30px;">
                最新图片
              </p>
<!--              <a href="#" slot="extra" @click.prevent="refreshImg">-->
<!--                <Icon type="md-refresh" size="20"/>-->
<!--              </a>-->

              <div class="piclist">
                <ul class="listul">
                  <li>
                    <img
                      src="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1600941546&di=70614fb4ebf4c0f2fe5835ca7f77de1d&src=http://a0.att.hudong.com/56/12/01300000164151121576126282411.jpg"/>
                    <span>2020-09-24 15:18:53</span>
                  </li>
                  <li>
                    <img
                      src="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1600941546&di=70614fb4ebf4c0f2fe5835ca7f77de1d&src=http://a0.att.hudong.com/56/12/01300000164151121576126282411.jpg"/>
                    <span>2020-09-24 15:18:53</span>
                  </li>
                  <li>
                    <img
                      src="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1600941546&di=70614fb4ebf4c0f2fe5835ca7f77de1d&src=http://a0.att.hudong.com/56/12/01300000164151121576126282411.jpg"/>
                    <span>2020-09-24 15:18:53</span>
                  </li>

                  <li>
                    <img
                      src="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1600941546&di=70614fb4ebf4c0f2fe5835ca7f77de1d&src=http://a0.att.hudong.com/56/12/01300000164151121576126282411.jpg"/>
                    <span>2020-09-24 15:18:53</span>
                  </li>
                  <li>
                    <img
                      src="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1600941546&di=70614fb4ebf4c0f2fe5835ca7f77de1d&src=http://a0.att.hudong.com/56/12/01300000164151121576126282411.jpg"/>
                    <span>2020-09-24 15:18:53</span>
                  </li>
                  <li>
                    <img
                      src="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1600941546&di=70614fb4ebf4c0f2fe5835ca7f77de1d&src=http://a0.att.hudong.com/56/12/01300000164151121576126282411.jpg"/>
                    <span>2020-09-24 15:18:53</span>
                  </li>

                  <li>
                    <img
                      src="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1600941546&di=70614fb4ebf4c0f2fe5835ca7f77de1d&src=http://a0.att.hudong.com/56/12/01300000164151121576126282411.jpg"/>
                    <span>2020-09-24 15:18:53</span>
                  </li>
                  <li>
                    <img
                      src="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1600941546&di=70614fb4ebf4c0f2fe5835ca7f77de1d&src=http://a0.att.hudong.com/56/12/01300000164151121576126282411.jpg"/>
                    <span>2020-09-24 15:18:53</span>
                  </li>
                  <li>
                    <img
                      src="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1600941546&di=70614fb4ebf4c0f2fe5835ca7f77de1d&src=http://a0.att.hudong.com/56/12/01300000164151121576126282411.jpg"/>
                    <span>2020-09-24 15:18:53</span>
                  </li>

                  <li>
                    <img
                      src="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1600941546&di=70614fb4ebf4c0f2fe5835ca7f77de1d&src=http://a0.att.hudong.com/56/12/01300000164151121576126282411.jpg"/>
                    <span>2020-09-24 15:18:53</span>
                  </li>
                  <li>
                    <img
                      src="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1600941546&di=70614fb4ebf4c0f2fe5835ca7f77de1d&src=http://a0.att.hudong.com/56/12/01300000164151121576126282411.jpg"/>
                    <span>2020-09-24 15:18:53</span>
                  </li>
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </Row>
    </Card>
  </div>
</template>
<script>

    import {getDeptAndEquipmentPacketTreeData} from "@/api/zhgw/dataOverview/dataOverview";
    import {getEquipmentHistoryRecordLatestData} from "@/api/zhgw/tEquipmentHistoryRecord/tEquipmentHistoryRecord";

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
                alertMargin: 'calc(100% - 362px)',
                tableColumns: [
                    {
                        title: '序号',
                        align: 'center',
                        type: 'index',
                        width: 65
                    },
                    {
                        title: '要素',
                        align: 'center',
                        key: 'element',
                        minWidth: 100
                    },
                    {
                        title: '值',
                        align: 'center',
                        key: 'value',
                        minWidth: 200
                    },
                    {
                        title: '单位',
                        align: 'center',
                        key: 'unit',
                        minWidth: 100
                    }
                ],
                tableData: [
                    {
                        element: '采集时间',
                        value: '-',
                        unit: '',
                        field: 'collectionTime'
                    },
                    {
                        element: '水位 1',
                        value: '-',
                        unit: '米',
                        field: 'waterLevel1'
                    }
                    ,
                    {
                        element: '水位 2',
                        value: '-',
                        unit: '米',
                        field: 'waterLevel2'
                    }
                    ,
                    {
                        element: '气温',
                        value: '-',
                        unit: '摄氏度',
                        field: 'airTemperature'
                    }
                    ,
                    {
                        element: '湿度',
                        value: '-',
                        unit: '百分比',
                        field: 'humidity'
                    }
                    ,
                    {
                        element: '流速 1',
                        value: '-',
                        unit: '米/秒',
                        field: 'currentSpeed1'
                    }
                    ,
                    {
                        element: '流速 2',
                        value: '-',
                        unit: '米/秒',
                        field: 'currentSpeed2'
                    },
                    {
                        element: '流量 1',
                        value: '-',
                        unit: '立方米/秒',
                        field: 'flowRate1'
                    }
                    ,
                    {
                        element: '流量 2',
                        value: '-',
                        unit: '立方米/秒',
                        field: 'flowRate2'
                    }
                    ,
                    {
                        element: '电源电压',
                        value: '-',
                        unit: '伏特',
                        field: 'voltage'
                    }
                    ,
                    {
                        element: '累计流量 1',
                        value: '-',
                        unit: '立方米',
                        field: 'cumulativeFlow1'
                    }
                    ,
                    {
                        element: '累计流量 2',
                        value: '-',
                        unit: '立方米',
                        field: 'cumulativeFlow2'
                    }
                    ,
                    {
                        element: '水温',
                        value: '-',
                        unit: '摄氏度',
                        field: 'waterTemperature'
                    }
                    ,
                    {
                        element: '设备温度',
                        value: '-',
                        unit: '摄氏度',
                        field: 'equipmentTemperature'
                    }
                    ,
                    {
                        element: '信号强度',
                        value: '-',
                        unit: '百分比',
                        field: 'signalIntensity'
                    }
                    ,
                    {
                        element: 'PM2.5',
                        value: '-',
                        unit: '微克/立方米',
                        field: 'pm25'
                    }
                    ,
                    {
                        element: 'PM10',
                        value: '-',
                        unit: '微克/立方米',
                        field: 'pm10'
                    }
                    ,
                    {
                        element: '闸门开启高度',
                        value: '-',
                        unit: '米',
                        field: 'gateOpeningHeight'
                    }
                ]
            }
        },
        methods: {
            changeExpand() {//扩展 收缩按钮
                this.expand = !this.expand;
                if (this.expand) {
                    this.expandIcon = "ios-arrow-back";
                    this.marginLeft = '300px';
                    this.alertMargin = 'calc(100% - 362px)';
                } else {
                    this.expandIcon = "ios-arrow-forward";
                    this.marginLeft = '0px';
                    this.alertMargin = 'calc(100% - 62px)';
                }
            },
            selectTree(v) {//选择树
                if (v.length > 0) {
                    if (v[0].equipmentFlag) {
                        this.selectTreeTitle = v[0].title;
                        this.selectTreeNumber = v[0].number;
                        // 根据设备id，查询最新记录
                        getEquipmentHistoryRecordLatestData({equipmentId: v[0].value}).then(res => {
                            if (res && res.success && res.data) {
                                for (let i = 0; i < this.tableData.length; i++) {
                                    this.tableData[i].value = res.data[this.tableData[i].field];
                                }
                            }else {
                                for (let i = 0; i < this.tableData.length; i++) {
                                    this.tableData[i].value = '-';
                                }
                            }
                        });
                    }
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
                        if (!this.searchKey) {
                            //默认加载第一条设备数据
                            let equipment = this.getFirstChildEquipmentData(res.data, true);
                            if(equipment) {
                                this.selectTreeTitle = equipment.title;
                                this.selectTreeNumber = equipment.number;
                                // 根据设备id，查询最新记录
                                getEquipmentHistoryRecordLatestData({equipmentId: equipment.value}).then(res => {
                                    if (res && res.success && res.data) {
                                        for (let i = 0; i < this.tableData.length; i++) {
                                            this.tableData[i].value = res.data[this.tableData[i].field];
                                        }
                                    }
                                });
                            }
                        }
                    }
                });
            },
            refreshData() {

            },
            refreshImg() {

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
            }
        },
        mounted() {
            this.searchTreeData();
        }
    }
</script>
