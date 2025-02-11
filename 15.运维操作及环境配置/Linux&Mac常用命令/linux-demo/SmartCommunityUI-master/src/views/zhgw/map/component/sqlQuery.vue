<template>
  <Modal v-model="modalShow" title="SQL查询" :mask-closable="false" :mask="false" class="sqlQuery" width="500" draggable
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
            <Col span="8" style="margin-left: 4px;width: 137px;border: 0;">
              <Select v-model="searchForm.layer" @on-select="onLayerSelectChange" transfer>
                <Option v-for="(item, i) in layersArr" :key="i" :value="item.url">{{ item.label}}</Option>
              </Select>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="字段信息" v-show="fieldArr.length > 0">
          <div class="fieldDivClass">
            <Row v-for="(item,i) in fieldArr" :key="i">
              <Col span="8" @click.native="setClassName($event,fieldArr[i * 3])" v-if="(i * 3 < fieldArr.length)">
                {{JSON.parse(JSON.stringify(fieldArr[i * 3])).name}}
              </Col>
              <Col span="8" @click.native="setClassName($event,fieldArr[i * 3+1])" v-if="(i * 3+1 < fieldArr.length)">
                {{JSON.parse(JSON.stringify(fieldArr[i * 3+1])).name}}
              </Col>
              <Col span="8" @click.native="setClassName($event,fieldArr[i * 3+2])" v-if="(i * 3+2 < fieldArr.length)">
                {{JSON.parse(JSON.stringify(fieldArr[i * 3+2])).name}}
              </Col>
            </Row>
          </div>
        </FormItem>
        <FormItem label="条件匹配" class="conditionClass" v-show="fieldArr.length > 0">
          <Row>
            <Col span="5">
              <Button @click.native="setCondition('=')"> =</Button>
            </Col>
            <Col span="5">
              <Button @click.native="setCondition('<>')"> <></Button>
            </Col>
            <Col span="5">
              <Button @click.native="setCondition('LIKE')">LIKE</Button>
            </Col>
            <Col span="5">
              <Button @click.native="setCondition('>')"> ></Button>
            </Col>
            <Col span="4">
              <Button @click.native="setCondition('<')"> <</Button>
            </Col>
          </Row>
          <Row style="margin-bottom: 5px;">
            <Col span="5">
              <Button @click.native="setCondition('>=')"> >=</Button>
            </Col>
            <Col span="5">
              <Button @click.native="setCondition('<=')"> <=</Button>
            </Col>
            <Col span="5">
              <Button @click.native="setCondition('AND')">AND</Button>
            </Col>
            <Col span="5">
              <Button @click.native="setCondition('OR')">OR</Button>
            </Col>
            <Col span="4">
              <Button @click.native="setCondition('%')"> %</Button>
            </Col>
          </Row>
          <Row>
            <Col span="5">
              <Button @click.native="setCondition('()')"> ()</Button>
            </Col>
            <Col span="5">
              <Button @click.native="setCondition('NOT')">NOT</Button>
            </Col>
            <Col span="5">
              <Button @click.native="setCondition('IS')">IS</Button>
            </Col>
            <Col span="5">
              <Button @click.native="setCondition('IN')">IN</Button>
            </Col>
            <Col span="4">
              <Button @click.native="setCondition('NULL')">NULL</Button>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="SQL预览" v-show="fieldArr.length > 0">
          <Input id="sqlWhere" type="textarea" v-model="searchForm.sqlWhere" class="address_class"/>
        </FormItem>

        <FormItem label="操作按钮" class="operationButtonClass" v-show="fieldArr.length > 0">
          <Row>
            <Col span="6">
              <Button @click="executeSql">执行SQL</Button>
            </Col>
            <Col span="6">
              <Button @click="saveSql">保存SQL</Button>
            </Col>
            <Col span="6">
              <Button @click="verifySql">验证SQL</Button>
            </Col>
            <Col span="6">
              <Button @click="clearSql">清除SQL</Button>
            </Col>
          </Row>
        </FormItem>
      </Form>
    </div>
    <div slot="footer">
    </div>
  </Modal>
</template>

<script>

    import {layerConfig} from "@/api/zhgw/layerConfig";

    export default {
        name: "sqlQuery",
        props: {
            value: {
                type: Boolean,
                default: false,
            }
        },
        data() {
            return {
                layerConfig: layerConfig,
                modalShow: this.value,
                queryLoading: false,
                elementArr: [],
                fieldArr: [],
                layersArr: [],
                pointArr: [],
                columnsArr: [],
                searchForm: {
                    url: '',
                    layer: '',
                    sqlWhere: ''
                }
            };
        },
        methods: {
            //清除坐标点
            clearPointArr() {
                for (let i = 0; i < this.pointArr.length; i++) {
                    this.$parent.$parent.view.graphics.remove(this.pointArr[i]);
                }
            },
            //执行SQL
            executeSql() {
                this.clearPointArr();
                let _this = this;
                this.getSQLResult(this.searchForm.url + this.searchForm.layer, this.searchForm.sqlWhere, true).then(function (results) {
                    if (results.features) {
                        for (let i = 0; i < results.features.length; i++) {
                            let geometry = results.features[i].geometry;
                            var markerSymbol = {
                                type: "picture-marker",
                                url: '/img/fxy.png',//https://static.arcgis.com/images/Symbols/Shapes/BlackStarLargeB.png
                                contentType: "image/png",
                                width: 20,
                                height: 20
                            }


                            //设置点的位置
                            let position = {
                                type: 'point',
                                longitude: geometry.x,
                                latitude: geometry.y,
                            };
                            //将点的样式和位置放在Graphic里面
                            let pointGraphic = new _this.$parent.$parent.Graphic({
                                geometry: position,
                                symbol: markerSymbol,
                                popupTemplate: {
                                    title: results.features[i].attributes[_this.columnsArr[0]],
                                    content: results.features[i].attributes[_this.columnsArr[1]],
                                }
                            });
                            //显示图标
                            _this.$parent.$parent.view.graphics.add(pointGraphic);
                            _this.pointArr.push(pointGraphic);
                            if (i == results.features.length - 1) {
                                _this.$parent.$parent.view.goTo([geometry.x, geometry.y]).then(function () {
                                    if (_this.columnsArr) {
                                        _this.$parent.$parent.view.popup.open({
                                            title: results.features[i].attributes[_this.columnsArr[0]],
                                            content: results.features[i].attributes[_this.columnsArr[1]],
                                            location: [geometry.x, geometry.y]
                                        });
                                    }
                                });
                            }
                        }
                        _this.$Notice.success({
                            title: 'SQL 执行成功！',
                        });
                    }
                }).catch(res => {
                    console.error(res)
                })
            },
            //保存SQL
            saveSql() {

            },
            //验证SQL
            verifySql() {
                let _this = this;
                this.getSQLResult(this.searchForm.url + this.searchForm.layer, this.searchForm.sqlWhere, false).then(function (results) {
                    _this.$Notice.success({
                        title: 'SQL 验证成功！',
                    });
                }).catch(res => {
                    console.error(res)
                    _this.$Notice.error({
                        title: 'SQL 验证失败！',
                    });
                })
            },
            //清除SQL
            clearSql() {
                this.searchForm.sqlWhere = '';
                for (let i = 0; i < this.elementArr.length; i++) {
                    this.elementArr[i].className = "ivu-col ivu-col-span-8";
                }
                this.elementArr = [];
            },
            //关闭图层搜索框
            onCancel() {
                this.$parent.sqlQueryShow = false;
                this.clearPointArr();
            },
            //清除坐标点
            clearPointArr() {
                for (let i = 0; i < this.pointArr.length; i++) {
                    this.$parent.$parent.view.graphics.remove(this.pointArr[i]);
                }
            },
            //图层选择后查询加载对应的字段
            onUrlSelectChange(e) {
                if (e) {
                    let item = layerConfig.layers.find((value, index, arr) => {
                        return value.url == e.value;
                    });
                    if (item && item != undefined && item != "undefined") {
                        this.layersArr = item.layers;
                    } else {
                        this.fieldArr = [];
                        this.layersArr = [];
                    }
                } else {
                    this.fieldArr = [];
                    this.layersArr = [];
                }
            },
            setClassName(element, item) {
                if (element.target.className == "ivu-col ivu-col-span-8") {
                    element.target.className = "ivu-col ivu-col-span-8 active";
                    //this.searchForm.sqlWhere += " '" + item.name + "'" + "  ";
                    this.insertTextAreaTxt(" '" + item.name + "'" + " ");
                    this.elementArr.push(element.target);
                } else {
                    element.target.className = "ivu-col ivu-col-span-8";
                }
            },
            //向指定位置插入字符串
            insertTextAreaTxt(insertTxt) {
                let elementById = document.getElementById("sqlWhere");
                let selectionStart = elementById.children[0].selectionStart;
                let selectionEnd = elementById.children[0].selectionEnd;
                if (selectionStart == undefined || selectionEnd == undefined) {
                    selectionStart = 0;
                }
                let result = this.searchForm.sqlWhere.substring(0, selectionStart) + insertTxt + this.searchForm.sqlWhere.substring(selectionStart, this.searchForm.sqlWhere.length);
                this.searchForm.sqlWhere = result;
                elementById.children[0].focus();
                elementById.children[0].selectionStart = selectionStart + insertTxt.length;
                elementById.children[0].selectionEnd = selectionStart + insertTxt.length;
            },
            //选择子图层后加载字段
            onLayerSelectChange(e) {
                let _this = this;
                if (e) {
                    let item = this.layersArr.find((value, index, arr) => {
                        return value.url == e.value;
                    });

                    this.columnsArr = item.field;
                    _this.getSQLResult(this.searchForm.url + e.value, "", false).then(function (results) {
                        if (results.fields) {
                            _this.fieldArr = results.fields;
                        } else {
                            _this.fieldArr = [];
                        }
                    }).catch(res => {
                        _this.fieldArr = [];
                    })
                }
            },
            setCondition(item) {
                this.insertTextAreaTxt(" " + item + " ");
            },
            //执行SQL，查询数据
            getSQLResult(url, where, flag) {
                //定义查询对象
                var queryTask = new this.$parent.$parent.QueryTask(url);
                //定义查询参数对象
                var query = new this.$parent.$parent.Query();
                //查询条件，类似于sql语句的where子句
                query.where = "1 = 1";
                if (where) {
                    query.where += " AND " + where;
                }
                //返回的字段信息：*代表返回全部字段
                query.outFields = ["*"];
                //是否返回几何形状
                query.returnGeometry = flag;
                //执行属性查询
                return queryTask.execute(query);
            }
        },
        watch: {
            value(val) {
                this.modalShow = val;
                if (val) {
                    this.fieldArr = [];
                    this.layersArr = [];
                    this.searchForm.url = '';
                    this.searchForm.layer = '';
                    this.searchForm.sqlWhere = '';
                    this.elementArr = [];
                    this.pointArr = [];
                    this.columnsArr = [];
                }
            }
        }
    };
</script>
<style lang="less">
  .sqlQuery {

    .ivu-form-item-content .address_class textarea {
      height: 100px;
      background-color: rgba(30, 36, 50, 0.2) !important;
      color: #fff;
    }

    .operationButtonClass {
      .ivu-col-span-6 .ivu-btn span {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    .operationButtonClass button {
      padding: 0;
      width: 90%;
      color: #fff !important;
      background-color: rgba(30, 36, 50, 0.6) !important;
    }

    .operationButtonClass button :hover {
      padding: 0;
      color: #fff;
      background-color: #00a0e9;
    }


    .conditionClass {
      .ivu-col-span-5 .ivu-btn span, .ivu-col-span-4 .ivu-btn span {
        padding: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    .conditionClass button {
      padding: 0;
      width: 60px;
      color: #fff !important;
      background-color: rgba(30, 36, 50, 0.6) !important;
    }

    .conditionClass button :hover {
      padding: 0;
      color: #fff;
      background-color: #00a0e9;
    }

    .ivu-page-item a {
      color: #fff;
    }

    .ivu-form .ivu-form-item-label {
      color: #fff;
    }

    .ivu-select-placeholder {
      background-color: rgba(30, 36, 50, 0.6) !important;
      color: #fff !important;
    }

    .ivu-select-selected-value {
      background-color: rgba(30, 36, 50, 0.6) !important;
      color: #fff !important;
    }


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

    .fieldDivClass {
      max-height: 100px;
      overflow-x: hidden;
      overflow-y: auto;
      border: 1px solid #fff;

      .ivu-col-span-8 {
        border: 1px solid #fff;
        text-align: center;
      }

      .ivu-col-span-8:hover {
        color: #fff;
        background-color: #00a0e9;
      }

      .active {
        color: #fff;
        background-color: #00a0e9;
      }
    }

    /*-------滚动条整体样式----*/

    .fieldDivClass::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }

    /*滚动条里面小方块样式*/

    .fieldDivClass::-webkit-scrollbar-thumb {
      border-radius: 100px;
      -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      background: #fff;
    }

    /*滚动条里面轨道样式*/

    .fieldDivClass::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      border-radius: 0;
      background: rgba(0, 0, 0, 0.1);
    }

    .ivu-select-selection i {
      color: #fff !important;
    }
  }
</style>
