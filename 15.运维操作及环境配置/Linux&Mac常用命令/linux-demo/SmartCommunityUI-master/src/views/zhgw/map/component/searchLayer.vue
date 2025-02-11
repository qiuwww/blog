<template>
  <Modal v-model="modalShow" title="图层查询" :mask-closable="false" :mask="false" class="searchLayer" width="500" draggable
         @on-cancel="onCancel">
    <div class="content">
      <Form :label-width="70" :model="searchForm" label-position="left">
        <FormItem label="查询图层">
          <Row>
            <Col span="15">
              <Select v-model="searchForm.url" @on-select="onUrlSelectChange" transfer>
                <Option v-for="(item, i) in layerConfig.layers" :key="i" :value="item.url">{{ item.name}}</Option>
              </Select>
            </Col>
            <Col span="8" style="margin-left: 4px;width: 137px;">
              <Select v-model="searchForm.layer" @on-select="onLayerSelectChange" transfer>
                <Option v-for="(item, i) in layersArr" :key="i" :value="item.url">{{ item.label}}</Option>
              </Select>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="查询条件">
          <Row>
            <Col span="6">
              <Select v-model="searchForm.field" transfer>
                <Option v-for="(item, i) in fieldArr" :key="i" :value="item">{{ item}}</Option>
              </Select>
            </Col>
            <Col span="6" style="margin-left: 4px;">
              <Select v-model="searchForm.mode" transfer>
                <Option value="like">模糊匹配</Option>
                <Option value="=">等于</Option>
              </Select>
            </Col>
            <Col span="7" style="margin-left: 4px;">
              <Input v-model="searchForm.condition"></Input>
            </Col>
            <Col span="3" style="margin-left: 8px;">
              <Button :loading="queryLoading" @click="searchLayer">查询</Button>
            </Col>
          </Row>
        </FormItem>
      </Form>

      <Table :loading="queryLoading" border :columns="tableColums" :data="tableData" @on-row-click="rowClick"></Table>
      <Row type="flex" justify="end" class="page" style="height: 30px;">
        <Page :total="totalCount" show-sizer size="small" class-name="pageClass" :page-size="searchForm.pageSize"
              @on-change="changePage" show-total transfer
              @on-page-size-change="changePageSize" :page-size-opts="[10,20,30,50]"/>
      </Row>
    </div>


    <div slot="footer">
    </div>
  </Modal>
</template>

<script>

    import {layerConfig} from "@/api/zhgw/layerConfig";

    export default {
        name: "searchLayer",
        props: {
            value: {
                type: Boolean,
                default: false,
            }
        },
        data() {
            return {
                layersArr:[],
                layerConfig: layerConfig,
                modalShow: this.value,
                searchForm: {
                    url: "",
                    layer:"",
                    field: "",
                    mode: "",
                    condition: "",
                    pageSize: 10,
                    pageNumber: 1
                },
                queryLoading: false,
                tableColums: [],
                tableData: [],
                allData: [],
                pointArr: [],
                totalCount: 0,
                fieldArr: [],
                tableHeight: 300
            };
        },
        methods: {
            //关闭图层搜索框
            onCancel() {
                this.$parent.searchLayerShow = false;
                this.clearPointArr();
                this.layersArr = [];
                this.fieldArr = [];
                this.searchForm.url = '';
                this.searchForm.layer = '';
                this.searchForm.field = '';
                this.searchForm.mode = '';
                this.searchForm.condition = '';
                this.searchForm.pageSize = 10;
                this.searchForm.pageNumber = 1;
            },
            searchLayer() {
                if (!this.searchForm.url || !this.searchForm.layer) {
                    this.$Notice.error({
                        title: '请选择需要查询的图层！',
                    });
                    return;
                }
                this.queryLoading = true;
                let _this = this;
                //定义查询对象
                var queryTask = new this.$parent.$parent.QueryTask(this.searchForm.url + this.searchForm.layer);
                //定义查询参数对象
                var query = new this.$parent.$parent.Query();
                //查询条件，类似于sql语句的where子句
                query.where = "1 = 1";

                if (this.searchForm.field && this.searchForm.condition && this.searchForm.mode) {
                    if (this.searchForm.mode == "like") {
                        query.where += " AND " + this.searchForm.field + " " + this.searchForm.mode + " " + "'%" + this.searchForm.condition.trim() + "%'";
                    } else {
                        query.where += " AND " + this.searchForm.field + " " + this.searchForm.mode + "'" + this.searchForm.condition.trim() + "'";
                    }
                }
                //返回的字段信息：*代表返回全部字段
                query.outFields = ["*"];
                //是否返回几何形状
                query.returnGeometry = true;
                //执行属性查询
                queryTask.execute(query).then(function (results) {
                    //清除之前的坐标点
                    _this.clearPointArr();
                    _this.allData = [];
                    _this.tableData = [];
                    if (results.features) {
                        for (let i = 0; i < results.features.length; i++) {
                            let geometry = results.features[i].geometry;
                            let obj = results.features[i].attributes;
                            obj.x = geometry.x;
                            obj.y = geometry.y;
                            _this.allData.push(obj);
                        }

                        _this.totalCount = _this.allData.length;
                        _this.tableData = _this.getTableData(_this.searchForm.pageNumber, _this.searchForm.pageSize, _this.allData).data;

                        _this.showPointArr(_this.tableData);
                    }
                }).finally(res => {
                    _this.queryLoading = false;
                });
            },
            showPointArr(tableData) {
                this.clearPointArr();
                let _this = this;
                for (let i = 0; i < tableData.length; i++) {
                    let geometry = tableData[i];
                    var markerSymbol = {
                        type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
                        color: [226, 119, 40],
                        outline: {
                            // autocasts as new SimpleLineSymbol()
                            color: [255, 255, 255],
                            width: 2
                        }
                    };
                    //设置点的位置
                    let position = {
                        type: 'point',
                        longitude: geometry.x,
                        latitude: geometry.y,
                    };
                    //将点的样式和位置放在Graphic里面
                    let pointGraphic = new this.$parent.$parent.Graphic({
                        geometry: position,
                        symbol: markerSymbol,
                        popupTemplate: {
                            title: _this.fieldArr ? _this.fieldArr[0] + "：" + geometry[_this.fieldArr[0]] : '',
                            content: _this.fieldArr ? _this.fieldArr[0] + "：" + geometry[_this.fieldArr[1]] : ''
                        }
                    });
                    //显示图标
                    this.$parent.$parent.view.graphics.add(pointGraphic);
                    this.pointArr.push(pointGraphic);
                }
            },
            //清除坐标点
            clearPointArr() {
                for (let i = 0; i < this.pointArr.length; i++) {
                    this.$parent.$parent.view.graphics.remove(this.pointArr[i]);
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
                    tableData.data[i].rowIndex = (page -1) * pageSize + (i + 1);
                }
                return tableData;
            },
            //改变页码
            changePage(v) {
                this.searchForm.pageNumber = v;
                this.tableData = this.getTableData(this.searchForm.pageNumber, this.searchForm.pageSize, this.allData).data;
                this.showPointArr(this.tableData);
            },
            //改变每页显示数据的条数
            changePageSize(v) {
                this.searchForm.pageSize = v;
                this.tableData = this.getTableData(this.searchForm.pageNumber, this.searchForm.pageSize, this.allData).data;
                this.showPointArr(this.tableData);
            },
            //行点击事件，飞到指定点位
            rowClick(row, index) {
                let _this = this;
                this.$parent.$parent.view.goTo([row.x, row.y]).then(function () {
                    if(_this.fieldArr){
                        _this.$parent.$parent.view.popup.open({
                            title: row[_this.fieldArr[0]],
                            content: row[_this.fieldArr[1]],
                            location: [row.x, row.y]
                        });
                    }
                })
            },
            //图层选择后加载对应的字段条件
            onUrlSelectChange(e) {
                if(e){
                    let item = layerConfig.layers.find((value, index, arr) => {
                        return value.url == e.value;
                    });
                    if (item && item != undefined && item != "undefined") {
                        this.layersArr = item.layers;
                    } else {
                        this.fieldArr = [];
                    }
                }else {
                    this.fieldArr = [];
                    this.layersArr = [];
                }
            },
            onLayerSelectChange(e){
                if (e) {
                    let item = this.layersArr.find((value, index, arr) => {
                        return value.url == e.value;
                    });

                    if (item && item != undefined && item != "undefined") {
                        this.fieldArr = item.field;
                        this.tableColums = item.tableColumns;
                    }else {
                        this.fieldArr = [];
                        this.tableColums = [];
                    }
                } else {
                    this.fieldArr = [];
                    this.tableColums = [];
                }
            }
        },
        watch: {
            value(val) {
                this.modalShow = val;
                if (val) {
                    this.searchForm = {
                        layer: "",
                        field: "",
                        mode: "",
                        condition: "",
                        pageSize: 10,
                        pageNumber: 1
                    };

                    this.tableData = [];
                    this.allData = [];
                    this.pointArr = [];
                    this.totalCount = 0;
                    this.fieldArr = [];
                    this.tableColums = [];
                }
            }
        }
    };
</script>
<style lang="less">
  .searchLayer {

    /*.pageClass {*/
    /*  position: absolute;*/
    /*  right: 5px !important;*/
    /*  margin-top: 5px;*/
    /*}*/

    .pageClass li {
      background-color: rgba(30, 36, 50, 0.2);
      color: #fff !important;
    }

    .pageClass li i {
      color: #fff !important;
    }

    .pageClass {
      .ivu-select-dropdown {
        background-color: rgba(30, 36, 50, 0.6) !important;
        color: #fff !important;
      }

      .ivu-select-item-selected, .ivu-select-item-selected:hover {
        background-color: #2d8cf0 !important;
        color: #fff !important;
      }
    }

    .ivu-select-selection i {
      color: #fff !important;
    }

    .ivu-page-item a {
      color: #fff;
    }

    .ivu-page-item-active a {
      color: #2d8cf0 !important;
    }

    .ivu-table-tip {
      overflow-x: hidden !important;
    }

    .ivu-input {
      background-color: rgba(30, 36, 50, 0) !important;
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

    /*.ivu-select-item{*/
    /*  background-color: rgba(30, 36, 50, 0.6) !important;*/
    /*  color: #fff !important;*/
    /*}*/

    /*.ivu-select-dropdown{*/
    /*  background-color: rgba(30, 36, 50, 0.6) !important;*/
    /*  color: #fff !important;*/
    /*}*/

    .ivu-col-span-3 button {
      background-color: rgba(30, 36, 50, 0) !important;
      color: #fff !important;
    }

    .ivu-col-span-3 button :hover {
      background-color: rgba(30, 36, 50, 0) !important;
      color: rgba(0, 191, 255) !important;
      text-decoration: underline !important;
    }

    .ivu-table {
      height: calc(80% - 100px);
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

    .ivu-form .ivu-form-item-label {
      color: #fff;
    }

    /*.ivu-modal-no-mask {*/
    /*  z-index: 10 !important;*/
    /*}*/

    .ivu-modal {
      position: absolute;
      top: 125px;
      left: 15px !important;
      height: 70%;
    }

    .ivu-modal-footer {
      display: none;
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

    .divClass {
      height: 20px;
      width: 100%;
    }


    .content {
      max-height: calc(100vh - 350px);
      overflow-y: auto;
      overflow-x: hidden;
    }

    /*-------滚动条整体样式----*/

    .content::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }

    /*滚动条里面小方块样式*/

    .content::-webkit-scrollbar-thumb {
      border-radius: 100px;
      -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      background: #212020;
    }

    /*滚动条里面轨道样式*/

    .content::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      border-radius: 0;
      background: rgba(0, 0, 0, 0.1);
    }
  }
</style>
