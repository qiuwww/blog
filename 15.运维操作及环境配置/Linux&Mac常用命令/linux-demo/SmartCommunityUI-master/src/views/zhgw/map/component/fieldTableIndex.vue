<template>
  <Modal v-model="modalShow" title="分析结果" :mask-closable="false" :mask="false" class="fieldTableIndex"
         :width="modalWidth" @on-cancel="onCancel">
    <Tabs type="card" v-if="checkType == '爆管分析'" @on-click="onTabsClick">
      <TabPane label="爆破管线" style="margin-top: 5px;">
        <Table border :columns="tableColumns" :data="tableData"></Table>
      </TabPane>
      <TabPane label="待关阀门" style="margin-top: 5px;">
        <Table border :columns="valveTableColumns" :data="valveTableData" highlight-row
               @on-row-click="onRowClick"></Table>
        <!--        <Row type="flex" justify="end" class="page" style="height: 30px;">-->
        <!--          <Page :total="totalCount" show-sizer size="small" class-name="pageClass" :page-size="searchForm.pageSize"-->
        <!--                @on-change="changePage" show-total transfer-->
        <!--                @on-page-size-change="changePageSize" :page-size-opts="[10,20,30,50]"/>-->
        <!--        </Row>-->
      </TabPane>
    </Tabs>
    <Table v-else border :columns="tableColumns" :data="tableData" highlight-row></Table>

    <div slot="footer">
      <Button v-if="checkType == '爆管分析'" type="primary" @click="showInfluencePipe">影响管段</Button>
    </div>
  </Modal>
</template>

<script>
    export default {
        name: "pipelineLayerTableIndex",
        props: {
            value: {
                type: Boolean,
                default: false,
            },
            allData: {
                type: Array,
                default: () => []
            },
            type: {
                type: String,
                default: ''
            },
            valveData: {
                type: Object,
                default: {}
            }
        },
        data() {
            return {
                modalShow: this.value,
                tableData: [],
                modalWidth: 400,
                checkType: '',
                tableColumns: [
                    {
                        align: "center",
                        title: '字段名称',
                        key: 'name',
                        width: 140
                    },
                    {
                        align: "center",
                        title: '字段值',
                        key: 'value',
                    }
                ],

                valveTableColumns: [
                    {
                        align: "center",
                        title: '系统编号',
                        key: 'OBJECTID',
                        width: 100
                    },
                    {
                        align: "center",
                        title: '物探点号',
                        key: '物探点号',
                        width: 200
                    },
                    {
                        align: "center",
                        title: '地面高层',
                        key: '地面高程',
                        width: 100
                    },
                    {
                        align: "center",
                        title: '附属物',
                        key: '附属物',
                    },
                    {
                        align: "center",
                        title: '备注',
                        key: '备注',
                    }
                ],
                valveTableData: [],

                pipeData: [],

                totalCount: 0,
                searchForm: {
                    pageSize: 10,
                    pageNumber: 1
                },

                pointGraphicArr: [],
                polylineGraphicArr: [],
            };
        },
        methods: {
            //关闭表格界面
            onCancel() {
                this.$parent.$parent.fieldTableIndexShow = false;
            },
            onTabsClick(name) {
                if (name == 1) {
                    this.modalWidth = 600;
                } else {
                    this.modalWidth = 400;
                }
            },
            //改变页码
            changePage(v) {
                this.searchForm.pageNumber = v;

            },
            //改变每页显示数据的条数
            changePageSize(v) {
                this.searchForm.pageSize = v;

            },
            //阀门列表，行点击事件
            onRowClick(row, index) {
                //高亮选中的点
                //清除之前绘制
                for (let i = 0; i < this.pointGraphicArr.length; i++) {
                    this.$parent.$parent.$parent.$parent.view.graphics.remove(this.pointGraphicArr[i]);
                }
                let point = new this.$parent.$parent.$parent.$parent.Point({
                    hasZ: false,
                    hasM: true,
                    longitude: row.position.x,
                    latitude: row.position.y,
                    spatialReference: row.position.wkid
                });
                // 生成绘制的图形
                let graphic = new this.$parent.$parent.$parent.$parent.Graphic({
                    geometry: point,
                    symbol: {
                        type: "simple-marker",  // autocasts as new SimpleFillSymbol()
                        color: [255, 0, 0],
                        width: 8
                    }
                });
                // 将绘制的图形添加到view
                this.$parent.$parent.$parent.$parent.view.graphics.add(graphic);
                this.pointGraphicArr.push(graphic);
            },
            //显示受影响管道
            showInfluencePipe() {
                //清除之前绘制
                for (let i = 0; i < this.polylineGraphicArr.length; i++) {
                    this.$parent.$parent.$parent.$parent.view.graphics.remove(this.polylineGraphicArr[i]);
                }

                for (let i = 0; i < this.pipeData.length; i++) {
                    let line = new this.$parent.$parent.$parent.$parent.Polyline({
                        hasZ: false,
                        hasM: true,
                        paths: this.pipeData[i].position.paths,
                        spatialReference: this.pipeData[i].position.wkid
                    });

                    // 生成绘制的图形
                    let graphic = new this.$parent.$parent.$parent.$parent.Graphic({
                        geometry: line,
                        symbol: {
                            type: "simple-line",
                            color: [255, 99, 20],
                            style: "solid",
                            width: 3
                        }
                    });
                    // 将绘制的图形添加到view
                    this.$parent.$parent.$parent.$parent.view.graphics.add(graphic);
                    this.polylineGraphicArr.push(graphic);
                }

            }
        },
        watch: {
            value(val) {
                this.modalShow = val;
                if (val) {
                    this.pointGraphicArr = [];
                    this.polylineGraphicArr = [];
                } else {
                    //清除之前绘制
                    for (let i = 0; i < this.polylineGraphicArr.length; i++) {
                        this.$parent.$parent.$parent.$parent.view.graphics.remove(this.polylineGraphicArr[i]);
                    }

                    for (let i = 0; i < this.pointGraphicArr.length; i++) {
                        this.$parent.$parent.$parent.$parent.view.graphics.remove(this.pointGraphicArr[i]);
                    }
                }
            },
            allData(val) {
                this.tableData = val;
            },
            type(val) {
                this.checkType = val;
            },
            valveData: {
                handler: function (val, oldVal) {
                    this.valveTableData = [];
                    this.pipeData = [];
                    //未关闭阀门
                    for (let i = 0; i < val.valveTableData.length; i++) {
                        let attributes = val.valveTableData[i].attributes;
                        let geometry = val.valveTableData[i].geometry;
                        attributes.position = {
                            x: geometry.x,
                            y: geometry.y,
                            z: geometry.z,
                            wkid: geometry.spatialReference.wkid
                        };
                        this.valveTableData.push(attributes);
                    }

                    //受影响的管道
                    for (let i = 0; i < val.pipeData.length; i++) {
                        let attributes = val.pipeData[i].attributes;
                        let geometry = val.pipeData[i].geometry;
                        attributes.position = {
                            paths: geometry.paths,
                            wkid: geometry.spatialReference.wkid
                        };
                        this.pipeData.push(attributes);
                    }
                },
                deep: true
            }
        }
    };
</script>
<style lang="less">
  .fieldTableIndex {
    .ivu-modal {
      position: absolute;
      top: 340px;
      left: 15px !important;
      max-height: 40%;
    }

    .ivu-table-tip {
      overflow: hidden;
    }

    .ivu-page-total {
      color: #fff;
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

    .ivu-table-body {
      max-height: calc(50vh - 100px);
      overflow-y: auto;
      overflow-x: hidden;
    }

    /*-------滚动条整体样式----*/

    .ivu-table-body::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }

    /*滚动条里面小方块样式*/

    .ivu-table-body::-webkit-scrollbar-thumb {
      border-radius: 100px;
      -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      background: #212020;
    }

    /*滚动条里面轨道样式*/

    .ivu-table-body::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      border-radius: 0;
      background: rgba(0, 0, 0, 0.1);
    }

    .ivu-page-item a {
      color: #fff;
    }

    .ivu-page-item-active a {
      color: #2d8cf0 !important;
    }


    .ivu-table-header {
      background-color: rgba(30, 36, 50, 0.6);
      color: #fff;
    }

    .ivu-table td {
      background-color: rgba(30, 36, 50, 0.6);
      color: #fff;
    }

    .ivu-table th {
      background-color: rgba(30, 36, 50, 0.6);
      color: #fff;
    }

    .ivu-table-row-hover td {
      background-color: rgba(0, 191, 255) !important;
      color: #fff;
    }

    .ivu-table-row-highlight {
      background-color: rgba(0, 191, 255) !important;
    }

    .ivu-table-row-highlight td {
      background-color: rgba(0, 191, 255) !important;
    }

    .ivu-form .ivu-form-item-label {
      color: #fff;
    }

    .ivu-select-dropdown {
      background-color: rgba(30, 36, 50, 0.6) !important;
      color: #fff !important;
    }

    .ivu-select-item-selected, .ivu-select-item-selected:hover {
      background-color: #2d8cf0 !important;
      color: #fff !important;
    }

    .pageClass li {
      background-color: rgba(30, 36, 50, 0.2);
      color: #fff !important;
    }

    .pageClass li i {
      color: #fff !important;
    }

    .ivu-select-placeholder {
      background-color: rgba(30, 36, 50, 0.6) !important;
      color: #fff !important;
    }

    .ivu-select-selected-value {
      background-color: rgba(30, 36, 50, 0.6) !important;
      color: #fff !important;
    }
  }
</style>
