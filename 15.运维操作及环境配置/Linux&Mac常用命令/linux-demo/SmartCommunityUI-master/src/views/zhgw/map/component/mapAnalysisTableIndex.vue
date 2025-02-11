<template>
  <Modal v-model="modalShow" :title="modalTitle" :mask-closable="false" :mask="false" class="mapAnalysisTableIndex" width="800" draggable
         footer-hide @on-cancel="onCancel">

    <div ref="statisticChart" style="height: 230px;width: 700px;"></div>
    <Table border :columns="tableColums" :data="tableData" highlight-row @on-row-click="onRowClick"></Table>
    <Row type="flex" justify="end" class="page" style="height: 30px;">
      <Page :total="totalCount" show-sizer size="small" class-name="pageClass" :page-size="searchForm.pageSize"
            @on-change="changePage" show-total transfer
            @on-page-size-change="changePageSize" :page-size-opts="[10,20,30,50]"/>
    </Row>
  </Modal>
</template>

<script>
    import echarts from 'echarts';

    export default {
        name: "mapAnalysisTableIndex",
        props: {
            value: {
                type: Boolean,
                default: false,
            },
            modalTitle: {
                type: String,
                default: "",
            },
            allData: {
                type: Array,
                default: () => []
            }
        },
        data() {
            return {
                modalShow: this.value,
                totalCount: 0,
                tableData: [],
                tableColums: [],
                searchForm: {
                    pageSize: 10,
                    pageNumber: 1
                },
                totalAllData: [],
                pointGraphicArr: [],
                statisticChart: null,

                pslData: [],
                dllData: []
            };
        },
        methods: {
            //关闭表格界面
            onCancel() {
                this.$parent.$parent.itemIndexShow = false;
                this.tableColums = [];
                this.tableData = [];
                this.totalCount = 0;
            },
            //改变页码
            changePage(v) {
                this.searchForm.pageNumber = v;
                let data1 = this.getTableData(this.searchForm.pageNumber, this.searchForm.pageSize, this.totalAllData).data;
                this.tableData = [];
                for (let i = 0; i < data1.length; i++) {
                    let attributes = data1[i].pipeLine.attributes;
                    attributes.rowIndex = data1[i].rowIndex;
                    attributes.position = {
                        paths: data1[i].pipeLine.geometry.paths,
                        wkid: data1[i].pipeLine.geometry.spatialReference.wkid
                    };
                    this.tableData.push(attributes);
                }
            },
            //改变每页显示数据的条数
            changePageSize(v) {
                this.searchForm.pageSize = v;
                let data1 = this.getTableData(this.searchForm.pageNumber, this.searchForm.pageSize, this.totalAllData).data;
                this.tableData = [];
                for (let i = 0; i < data1.length; i++) {
                    let attributes = data1[i].pipeLine.attributes;
                    attributes.rowIndex = data1[i].rowIndex;
                    attributes.position = {
                        paths: data1[i].pipeLine.geometry.paths,
                        wkid: data1[i].pipeLine.geometry.spatialReference.wkid
                    };
                    this.tableData.push(attributes);
                }
            },
            //获取页码对应的数据
            getTableData(page = 1, pageSize = 10, totalData = []) {
                const {length} = totalData;
                const tableData = {
                    data: [],
                    page,
                    pageSize,
                    length,
                };
                if (pageSize >= length) { //pageSize大于等于总数据长度，说明只有1页数据或没有数据
                    tableData.data = totalData;
                    tableData.page = 1;//直接取第一页
                } else { //pageSize小于总数据长度，数据多余1页
                    const num = pageSize * (page - 1);//计算当前页（不含）之前的所有数据总条数
                    if (num < length) { //如果当前页之前所有数据总条数小于（不能等于）总的数据集长度，则说明当前页码没有超出最大页码
                        const startIndex = num;//当前页第一条数据在总数据集中的索引
                        const endIndex = num + pageSize - 1;//当前页最后一条数据索引
                        tableData.data = totalData.filter((_, index) => index >= startIndex && index <= endIndex);//当前页数据条数小于每页最大条数时，也按最大条数范围筛取数据
                    } else { //当前页码超出最大页码，则计算实际最后一页的page，自动返回最后一页数据
                        const size = parseInt(length / pageSize); //取商
                        const rest = length % pageSize; //取余数
                        if (rest > 0) { //余数大于0，说明实际最后一页数据不足pageSize，应该取size+1为最后一条的页码
                            tableData.page = size + 1;//当前页码重置，取size+1
                            tableData.data = totalData.filter((_, index) => index >= (pageSize * size) && index <= length);
                        } else if (rest === 0) { //余数等于0，最后一页数据条数正好是pageSize
                            tableData.page = size;//当前页码重置，取size
                            tableData.data = totalData.filter((_, index) => index >= (pageSize * (size - 1)) && index <= length);
                        } //注：余数不可能小于0
                    }
                }
                for (let i = 0; i < tableData.data.length; i++) {
                    tableData.data[i].rowIndex = (page - 1) * pageSize + (i + 1);
                }
                return tableData;
            },
            onRowClick(row, index) {
                //清除之前绘制
                for (let i = 0; i < this.polylineGraphicArr.length; i++) {
                    this.$parent.$parent.$parent.$parent.view.graphics.remove(this.polylineGraphicArr[i]);
                }

                let line = new this.$parent.$parent.$parent.$parent.Polyline({
                    hasZ: false,
                    hasM: true,
                    paths: row.position.paths,
                    spatialReference: row.position.wkid
                });

                // 生成绘制的图形
                let graphic = new this.$parent.$parent.$parent.$parent.Graphic({
                    geometry: line,
                    symbol: {
                        type: "simple-line",
                        color: [255, 0, 0],
                        style: "solid",
                        width: 3
                    }
                });
                // 将绘制的图形添加到view
                this.$parent.$parent.$parent.$parent.view.graphics.add(graphic);
                this.polylineGraphicArr.push(graphic);
                var opts = {
                    duration: 2000
                };
                this.$parent.$parent.$parent.$parent.view.goTo({
                    center: [Number(row.position.paths[0][0][0]), Number(row.position.paths[0][0][1])],
                    zoom: 30
                }, opts);
            },
            setEChartsData(data) {
                for (let i = 0; i < data.length; i++) {
                    let arr1 = [];
                    let arr2 = [];
                    if (data[i].layerInfo.name == "PSL") {
                        arr1.push(data[i].crossPtZ, data[i].crossPtX);
                        this.pslData.push(arr1);
                    } else if (data[i].layerInfo.name == "DLL") {
                        arr2.push(data[i].crossPtZ, data[i].crossPtX);
                        this.dllData.push(arr2);
                    }
                }
                let option = {
                    legend: {
                        left: 'right',
                        textStyle: {
                            color: "#fff",
                        },
                        data: [
                            {
                                name: 'PSL',
                                icon: 'circle'
                            },
                            {
                                name: 'DLL',
                                icon: 'circle'
                            }
                        ]
                    },
                    tooltip: {
                        trigger: 'axis',
                        formatter(params) {
                            for (var x in params) {
                                return "距离：" + params[x].data[0] + " 埋深：" + params[x].data[1];
                            }
                        }
                    },
                    xAxis: {
                        splitLine: {
                            show: false
                        },
                        name: '距离（米）',
                        nameTextStyle: {
                            color: "#fff",
                        },
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#fff'   //这里用参数代替了
                            },
                            lineStyle: {
                                color: '#fff',
                            }
                        },
                        splitLine: {
                            show: false,
                        }
                    },
                    yAxis: {
                        name: '埋深（米）',
                        nameTextStyle: {
                            color: "#fff",
                        },
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#fff'
                            }
                        },
                        splitLine: {
                            show: false
                        }
                    },
                    series: [{
                        name: 'PSL',
                        symbolSize: 10,
                        label: {
                            show: false,
                            fontSize: 16,
                            position: 'bottom',
                            textStyle: {
                                color: '#fff'
                            },
                            lineStyle: {
                                color: '#fff',
                            }
                        },
                        data: this.pslData,
                        type: 'scatter',
                        itemStyle: {
                            color: '#00a0e9'
                        }
                    },
                        {
                            name: 'DLL',
                            symbolSize: 10,
                            label: {
                                show: false,
                                fontSize: 16,
                                position: 'bottom',
                                textStyle: {
                                    color: '#fff'
                                },
                                lineStyle: {
                                    color: '#fff',
                                }
                            },
                            data: this.dllData,
                            type: 'scatter',
                            itemStyle: {
                                color: 'green'
                            }
                        }]
                };
                this.statisticChart.setOption(option);
            }
        },
        watch: {
            value(val) {
                this.modalShow = val;
                if (val) {
                    this.polylineGraphicArr = [];
                } else {
                    //清除之前绘制
                    for (let i = 0; i < this.polylineGraphicArr.length; i++) {
                        this.$parent.$parent.$parent.$parent.view.graphics.remove(this.polylineGraphicArr[i]);
                    }
                }
            },
            allData(val) {
                this.totalAllData = val;
                this.totalCount = this.totalAllData.length;
                this.tableData = [];
                let data1 = this.getTableData(this.searchForm.pageNumber, this.searchForm.pageSize, this.totalAllData).data;
                for (let i = 0; i < data1.length; i++) {
                    let attributes = data1[i].pipeLine.attributes;
                    attributes.rowIndex = data1[i].rowIndex;
                    attributes.position = {
                        paths: data1[i].pipeLine.geometry.paths,
                        wkid: data1[i].pipeLine.geometry.spatialReference.wkid
                    };
                    this.tableData.push(attributes);
                }
                if (this.tableData.length > 0) {
                    this.tableColums.push({
                        title: '序号',
                        align: "center",
                        key: "rowIndex",
                        width: 65,
                    });
                    for (let key in this.tableData[0]) {
                        if (key != 'rowIndex' && key != 'position') {
                            if (key == '权属单位') {
                                this.tableColums.push({
                                    title: key,
                                    key: key,
                                    minWidth: 200,
                                    align: "center",
                                })
                            } else {
                                this.tableColums.push({
                                    title: key,
                                    key: key,
                                    minWidth: 140,
                                    align: "center",
                                })
                            }

                        }
                    }
                }
                this.setEChartsData(this.totalAllData);
            }
        },
        mounted() {
            this.statisticChart = echarts.init(this.$refs.statisticChart);
        }
    };
</script>
<style lang="less">
  .mapAnalysisTableIndex {
    .ivu-modal {
      position: absolute;
      top: 340px;
      left: 15px !important;
      max-height: 40%;
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
      max-height: calc(30vh - 100px);
      overflow: auto;
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
      height: 48px !important;
    }

    .ivu-table th {
      background-color: rgba(30, 36, 50, 0.6);
      color: #fff;
    }

    .ivu-table-row-hover td {
      background-color: rgba(0, 191, 255) !important;
      color: #fff;
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
