<style lang="less">
  .tFormGeneratorList {
    .ivu-form .ivu-form-item-label {
      text-align: left;
    }

    .ivu-form-item-content > .ivu-btn {
      margin-right: 10px !important;
    }

  }

  .ivu-tooltip-inner {
    max-height: 600px;
    overflow: hidden;
  }

  .ivu-tooltip-inner:hover {
    overflow-y: scroll;
  }

  .ivu-tooltip-inner:hover::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }

  .ivu-tooltip-inner:hover::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 5px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #aaa;
  }

  .ivu-tooltip-inner:hover::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    background: #ededed;
  }

  .ele-form-dynamic-delimiter {
    display: none;
  }
</style>
<style lang="less">
  .formModal {
    .ivu-modal-wrap {
      background-color: #fff;
    }

    ::-webkit-scrollbar {
      width: 5px;
    }

    /*滚动条小方块*/

    ::-webkit-scrollbar-thumb {
      border-radius: 5px;
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      background: #aaa;
    }

    /*滚动条轨道*/

    ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      border-radius: 5px;
      background: #ededed;
    }

    .head-img {
      width: 100%;
      height: 200px;
    }
  }
</style>
<template>
  <div class="search tFormGeneratorList">
    <Card>
      <Row v-show="openSearch" @keydown.enter.native="handleSearch">
        <Form ref="searchForm" :model="searchForm" inline :label-width="90">
          <Form-item label="表名称">
            <Input
              type="text"
              v-model="searchForm.formName"
              placeholder="请输入表名称"
              clearable
              style="width: 200px"
            />
          </Form-item>
          <Form-item label="创建时间">
            <DatePicker v-model="selectDate" type="daterange" format="yyyy-MM-dd" clearable @on-change="selectDateRange"
                        placeholder="选择起始时间" style="width: 200px"></DatePicker>
          </Form-item>
          <Form-item label="绑定的流程">
            <Select v-model="searchForm.procDefId" clearable placeholder="请选择流程" label-in-value style="width: 200px">
              <Option v-for="(item, i) in accProcess" :key="item.id" :value="item.id">{{ item.name }}</Option>
            </Select>
          </Form-item>
          <Form-item style="margin-left:-69px" class="br">
            <Button @click="handleSearch" type="primary" icon="ios-search">搜索</Button>
            <Button @click="handleReset">重置</Button>
            <!--            <a class="drop-down" @click="dropDown">-->
            <!--              {{dropDownContent}}-->
            <!--              <Icon :type="dropDownIcon"></Icon>-->
            <!--            </a>-->
          </Form-item>
        </Form>
      </Row>
      <Row class="operation">
        <Button @click="addTFormGenerator" type="primary" icon="md-add">新增</Button>
        <Dropdown @on-click="handleDropdown">
          <Button>
            更多操作
            <Icon type="md-arrow-dropdown"/>
          </Button>
          <DropdownMenu slot="list">
            <DropdownItem name="refresh">
              <Icon type="md-sync"/>
              刷新
            </DropdownItem>
            <DropdownItem name="removeAll">
              <Icon type="md-trash"/>
              批量删除
            </DropdownItem>
            <DropdownItem name="export">
              <Icon type="md-arrow-down"/>
              导出本页数据
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Button type="dashed" @click="openSearch=!openSearch">{{openSearch ? '关闭搜索' : '开启搜索'}}</Button>
        <Button type="dashed" @click="openTip=!openTip">{{openTip ? '关闭提示' : '开启提示'}}</Button>
        <div style="float: right;position: absolute;right: 10px;">
          <Poptip transfer trigger="click" placement="bottom-end" title="动态列">
            <Button icon="md-list"></Button>
            <div slot="content" style="position:relative;min-height:5vh">
              <Checkbox-group v-model="colOptions" @on-change="checkboxChange">
                <row v-for="(item ,i) in colSelect" :key="i">
                  <checkbox :label="item" :key="item"></checkbox>
                </row>
              </Checkbox-group>
            </div>
          </Poptip>
        </div>
      </Row>
      <Row v-show="openTip">
        <Alert show-icon>
          已选择
          <span class="select-count">{{selectCount}}</span> 项
          <a class="select-clear" @click="clearSelectAll">清空</a>
          <span style="float: right;">点击右上角按钮配置动态列↑</span>
        </Alert>
      </Row>
      <Row>
        <Table :loading="loading" border :columns="columns" sortable="custom" :data="data" @on-sort-change="changeSort"
               @on-selection-change="showSelect" ref="table">
          <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" @click="handleLook(row, index)" size="small">
              <Icon type="ios-eye-outline"/>
              查看
            </Button>
            <Dropdown :transfer=true>
              <Button size="small">
                更多操作
                <Icon type="md-arrow-dropdown"/>
              </Button>
              <DropdownMenu slot="list">
                <DropdownItem name="edit" @click.native="handleEdit(row, index)">
                  <Icon type="ios-create-outline"/>
                  修改
                </DropdownItem>
                <DropdownItem name="process" @click.native="bindingProcess(row, index)">
                  <Icon type="ios-key-outline"/>
                  绑定流程
                </DropdownItem>
                <DropdownItem name="delete" @click.native="deleteData(row, index)">
                  <Icon type="md-trash"></Icon>
                  删除
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </template>
        </Table>
      </Row>
      <Row type="flex" justify="end" class="page">
        <Page :current="searchForm.pageNumber" :total="total" :page-size="searchForm.pageSize" @on-change="changePage"
              @on-page-size-change="changePageSize" :page-size-opts="[10,20,50,100]" size="small" show-total show-elevator
              show-sizer transfer></Page>
      </Row>
    </Card>
    <!--    表单查看-->
    <Modal v-model="preViewShow" :width="814" title="表单查看" class="formModal">
      <img v-if="headImgUrl" class="head-img" :src="headImgUrl">
      <f-render
        v-model="selectFormData"
        :formDesc="selectFormConfig"
        @request-success="getDataList"
        :visible="preViewShow"
        :config="selectFormConfig"
        pure
      />
    </Modal>
    <!--    表单新增、编辑-->
    <updateTFormGenerator v-model="updateShow" :TFormGeneratorId="TFormGeneratorId" :modalTitle="title"
                          v-on:handleSearch="getDataList"></updateTFormGenerator>
    <!--    绑定流程-->
    <Modal v-model="procDefShow" title="绑定流程">
      <Form ref="proForm" :model="proForm" inline :label-width="120" :rules="tFormGeneratorFormRule">
        <Form-item label="绑定的流程" prop="procDefId">
          <Select v-model="proForm.procDefId" clearable placeholder="请选择流程" label-in-value style="width: 200px"
                  @on-change="changeProcess">
            <Option v-for="(item, i) in accProcess" :key="item.id" :value="item.id" :label="item.name">{{ item.name }}
            </Option>
          </Select>
        </Form-item>
      </Form>
      <div slot="footer">
        <Button type="text" @click="show=false">取消</Button>
        <Button type="primary" :loading="proFormLoading" @click="handelSubmit">提交</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
    import {
        deleteTFormGenerator,
        queryTFormGeneratorList,
        addTFormGenerator,
        updateTFormGenerator as update
    } from '@/api/tFormGenerator/tFormGenerator'
    import {formartDate, json_format} from '@/api/tools/tool'
    import updateTFormGenerator from './updateTFormGenerator'
    import {getAllProcess} from '@/api/activiti'

    export default {
        components: {
            updateTFormGenerator
        },
        data() {
            return {
                selectDate: null,
                preViewShow: false,
                formConfig: {},
                drop: false,
                formName: '',
                dropDownContent: "展开",
                dropDownIcon: "ios-arrow-down",
                search: '',
                data: [],
                diaShow: false,
                columns: this.getTFormGeneratorColumns(),
                openSearch: true,//打开搜索
                openTip: true,//打开提示
                loading: true, // 表单加载状态
                selectCount: 0, // 多选计数
                selectList: [], // 多选数据
                searchForm: {
                    // 搜索框对应data对象
                    formName: '',//表单
                    procDefId: '',//流程Id
                    pageNumber: 1, // 当前页数
                    pageSize: 10, // 页面大小
                    startDate: null,//开始时间
                    endDate: null,//结束时间
                    sort: 'createTime', // 默认排序字段
                    order: 'desc' // 默认排序方式
                },
                total: 0,
                title: '',
                TFormGeneratorId: '',
                updateShow: false,
                tableHeight: 200,
                colOptions: ["表单名称", "表单配置", "状态", "绑定流程名", "创建人", "创建时间", "操作"],
                colSelect: ["表单名称", "表单配置", "状态", "绑定流程名", "创建人", "创建时间", "操作"],
                selectRow: {},
                selectFormData: {},
                selectFormConfig: {},
                csvData: [],//导出csv文件的 数据源
                isNumber: false,//判断导出csv文件的 数据源 是否需要处理
                accProcess: [],//流程集合
                procDefShow: false,//是否显示绑定流程
                proForm: {//绑定流程
                    id: "",//表单ID
                    procDefId: "",//绑定流程id
                    procDefName: "",//绑定流程名
                },
                proFormLoading: false,//提交时的等待
                tFormGeneratorFormRule: this.getTFormGeneratorFormRule(),//绑定流程表单验证规则
                headImgUrl: '',
            }
        },
        methods: {
            //查询所有流程
            getAllProcess() {
                let _this = this;
                getAllProcess().then(res => {
                    if (res && res.data) {
                        _this.accProcess = res.data;
                    }
                }).catch(err => {

                });
            },
            handleSave(res) {
                // 这里是保存到 localStorage，你可以保存到服务器
                localStorage.setItem("form-config", res);
                if (this.formName != undefined && this.formName != null && this.formName.trim().length <= 0) {
                    this.$Message.error("表单名称为空");
                    return;
                }

                addTFormGenerator({"jsonStr": res, "formName": this.formName}).then(res => {
                    this.loading = false;

                    if (res) {
                        if (res && res.code == 200) {
                            this.diaShow = false;
                            this.getDataList();
                            this.$Message.success('保存成功');
                        } else {
                            this.$Message.error(res.msg);
                        }
                    } else {
                        this.$Message.error('保存失败');
                    }
                })
            },
            //编辑保存
            handleUpdateSave(res) {
                // 这里是保存到 localStorage，你可以保存到服务器
                localStorage.setItem("form-config", res);
                if (this.formName != undefined && this.formName != null && this.formName.trim().length <= 0) {
                    this.$Message.error("表单名称为空");
                    return;
                }
                if (this.tableName != undefined && this.tableName != null && this.tableName.trim().length <= 0) {
                    this.$Message.error("关联的表名为空");
                    return;
                }

                update({"id": this.TFormGeneratorId, "jsonStr": res, "formName": this.formName}).then(res => {
                    this.loading = false;

                    if (res) {
                        if (res && res.code == 200) {
                            this.updateShow = false;
                            this.getDataList();
                            this.$Message.success('保存成功');
                        } else {
                            this.$Message.error(res.msg);
                        }
                    } else {
                        this.$Message.error('保存失败');
                    }
                })
            },

            // 绑定流程
            bindingProcess(row) {
                this.proForm.id = row.id
                this.procDefShow = true;
                this.proForm.procDefId = row.procDefId
                this.proForm.procDefName = row.procDefName
            },
            //绑定流程改变时间
            changeProcess(e) {
                if (e) {
                    // 网格
                    this.proForm.procDefId = e.value
                    this.proForm.procDefName = e.label
                }
            },
            //绑定流程提交
            handelSubmit() {
                this.$refs['proForm'].validate((valid) => {
                    if (valid) {
                        if (this.proForm && this.proForm.id && this.proForm.procDefId && this.proForm.procDefName) {
                            if (this.proForm.id.trim().length == 0 || this.proForm.procDefId.trim().length == 0 || this.proForm.procDefName.trim().length == 0) {
                                this.$Message.error("参数错误请联系管理员！！！")
                                return
                            }
                        }
                        this.proFormLoading = true
                        update(this.proForm).then(res => {
                            this.proFormLoading = false;
                            if (res) {
                                if (res && res.code == 200) {
                                    this.procDefShow = false;
                                    this.getDataList();
                                    this.proForm.id = "";
                                    this.proForm.procDefId = "";
                                    this.proForm.procDefName = "";
                                    this.$Message.success('绑定成功');
                                } else {
                                    this.$Message.error(res.msg);
                                }
                            } else {
                                this.$Message.error('绑定失败');
                            }
                        })
                    } else {
                        this.$Message.error('表单验证不通过！');
                    }
                })

            },
            //列表上方更多操作
            handleDropdown(name) {
                if (name == "refresh") {
                    this.getDataList();
                } else if (name == "removeAll") {
                    this.delAll();
                } else if (name == "export") {
                    let excolumns = this.columns.filter(function (v) {
                        return v.title != "操作" && v.type != 'selection'
                    });
                    let _this = this;
                    if (_this.isNumber) {
                        _this.csvData.forEach(item => {
                            item.jsonStr = json_format(JSON.parse(JSON.stringify(item.jsonStr)), true).replace(/\"/g, "'")
                        })
                        console.log(_this.csvData)
                    }
                    _this.isNumber = false;
                    _this.$refs.table.exportCsv({
                        filename: '本页数据',
                        columns: excolumns,
                        data: _this.csvData,
                        quoted: true
                    });
                }
            },
            //展开 收起
            dropDown() {
                if (this.drop) {
                    this.dropDownContent = "展开";
                    this.dropDownIcon = "ios-arrow-down";
                } else {
                    this.dropDownContent = "收起";
                    this.dropDownIcon = "ios-arrow-up";
                }
                this.drop = !this.drop;
            },
            //新增
            addTFormGenerator() {
                this.title = '新增';
                this.updateShow = true
                this.diaShow = true;
                this.TFormGeneratorId = '';
                this.selectRow = {};
                this.selectFormConfig = {};
                this.selectFormData = {};
            },
            //编辑
            handleEdit(row, index) {
                this.title = '编辑';
                this.TFormGeneratorId = row.id.toString();
                this.updateShow = true;
                this.selectRow = row;
                this.selectFormConfig = row.jsonStr;
            },
            //查看
            handleLook(row, index) {
                this.title = '查看';
                this.TFormGeneratorId = row.id.toString();
                this.preViewShow = true;
                this.selectRow = row;
                this.selectFormConfig = row.jsonStr;
                this.headImgUrl = JSON.parse(this.selectFormConfig).headImgUrl;//表单头部图片地址
            },
            //分页查询
            getDataList() {
                this.loading = true;
                this.selectCount = 0;
                this.searchForm.id = null;
                queryTFormGeneratorList(this.searchForm).then(res => {
                    if (res && res.success) {
                        this.loading = false;
                        this.data = res.data.records;
                        this.csvData = JSON.parse(JSON.stringify(res.data.records));
                        this.isNumber = true;
                        this.total = res.data.total;
                    }
                }).catch(err => {
                    this.loading = false
                });
            },
            //单一删除
            deleteData(row, index) {
                this.$Modal.confirm({
                    title: "确认删除",
                    content: "您确认要删除所点击选的数据?",
                    loading: true,
                    onOk: () => {
                        this.userLoading = true;
                        var ids = [];
                        ids.push(row.id);
                        this.patchdeleteData(ids);
                    },
                    onCancel: () => {
                        this.$Message.info('取消了当前的操作行为！');
                    },
                });
            },
            //批量删除
            delAll() {
                if (this.selectCount <= 0) {
                    this.$Message.warning('您还未选择要删除的数据');
                    return;
                }
                this.$Modal.confirm({
                    title: '确认删除',
                    content: '您确认要删除所选的 ' + this.selectCount + '条数据?',
                    loading: true,
                    onOk: () => {
                        let ids = [];
                        this.selectList.forEach(function (e) {
                            ids.push(e.id);
                        });
                        this.patchdeleteData(ids);
                    },
                    onCancel: () => {
                        this.$Message.info('取消了当前的操作行为！');
                    }
                });
            },
            //删除（后台）
            patchdeleteData(ids) {
                if (ids == undefined || ids == null || ids.length == 0) {
                    this.$Message.error('没有选择的数据');
                    return;
                }
                deleteTFormGenerator({ids: ids}).then(res => {
                    this.userLoading = false;
                    this.$Modal.remove();
                    if (res && res.success) {
                        this.modalTaskVisible = false;
                        this.$Message.success('删除成功');
                        this.getDataList();
                    } else {
                        this.$Message.error('删除失败');
                    }
                });
            },
            //编辑状态
            displayStatus(row) {
                let str = "";
                if (row.status == 0) {
                    str = "显示";
                    row.status = 1;
                } else if (row.status == 1) {
                    str = "隐藏";
                    row.status = 0;
                }
                this.$Modal.confirm({
                    title: "确认要" + str,
                    content: "您是否要" + str + "此条记录?",
                    loading: true,
                    onOk: () => {
                        update(row).then((res) => {
                            this.$Modal.remove();
                            if (res) {
                                if (res && res.code == 200) {
                                    this.$Message.success("修改成功");
                                } else {
                                    if (row.status == 0) {
                                        row.status = 1;
                                    } else if (row.status == 1) {
                                        row.status = 0;
                                    }
                                    this.$Message.error(res.msg);
                                }
                            } else {
                                if (row.status == 0) {
                                    row.status = 1;
                                } else if (row.status == 1) {
                                    row.status = 0;
                                }
                                this.$Message.error("修改状态失败！！")
                            }

                        });
                    },
                    onCancel: () => {
                        if (row.status == 0) {
                            row.status = 1;
                        } else if (row.status == 1) {
                            row.status = 0;
                        }
                        this.$Message.info("取消了当前的操作行为！");
                    },
                });
            },
            //时间选择事件
            selectDateRange(v) {
                if (v) {
                    this.searchForm.startDate = v[0];
                    this.searchForm.endDate = v[1];
                }
            },
            //改变页码
            changePage(v) {
                this.searchForm.pageNumber = v;
                this.getDataList();
                this.clearSelectAll();
            },
            //改变每页显示数据的条数
            changePageSize(v) {
                this.searchForm.pageSize = v;
                this.getDataList();
            },
            //改变排序方式
            changeSort(e) {
                this.searchForm.sort = e.key;
                this.searchForm.order = e.order;
                if (e.order == 'normal') {
                    this.searchForm.order = '';
                }
                this.getDataList();
            },
            //查询
            handleSearch() {
                this.searchForm.pageNumber = 1;
                this.searchForm.pageSize = 10;
                this.getDataList();
            },
            //重置
            handleReset() {
                this.$refs.searchForm.resetFields();
                this.searchForm.pageNumber = 1;
                this.searchForm.pageSize = 10;
                this.searchForm.startDate = null;
                this.searchForm.endDate = null;
                this.selectDate = null;
                this.searchForm.formName = "";
                this.searchForm.procDefId = "";

                this.proForm.procDefName = "";
                this.proForm.procDefId = "";
                this.formName = null;
                // 重新加载数据
                this.getDataList();
            },
            //显示选择
            showSelect(e) {
                this.selectList = e;
                this.selectCount = e.length;
            },
            //清空选择
            clearSelectAll() {
                this.$refs.table.selectAll(false);
            },
            //获取列表字段
            getTFormGeneratorColumns() {
                return [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center',
                    },
                    {
                        title: '表单名称',
                        align: 'center',
                        key: 'formName',
                        minWidth: 180,
                        sortable: false,
                        tooltip: true,
                    },
                    {
                        title: '表单配置',
                        align: 'center',
                        key: 'jsonStr',
                        sortable: false,
                        minWidth: 180,
                        tooltip: true,
                    },


                    {
                        title: '状态',
                        align: 'center',
                        key: 'status',
                        sortable: false,
                        minWidth: 180,
                        render: (h, params) => {
                            let isDisplayState = params.row.status ? "隐藏" : "显示";
                            let datad = this.csvData.filter((item) => item.id == params.row.id);
                            datad[0].status = isDisplayState;
                            return h("div", [
                                h("i-switch", {
                                    //数据库1是已处理，0是未处理
                                    props: {
                                        type: "primary",
                                        value: params.row.status, //控制开关的打开或关闭状态，官网文档属性是value
                                        trueValue: 1,
                                        falseValue: 0,
                                    },
                                    style: {
                                        marginRight: "5px",
                                    },
                                    on: {
                                        "on-change": (value) => {
                                            //触发事件是on-change,用双引号括起来，
                                            //参数value是回调值，并没有使用到
                                            this.displayStatus(params.row); //params.index是拿到table的行序列，可以取到对应的表格值
                                        },
                                    },
                                }),
                            ]);

                        }
                    },
                    {
                        title: '绑定流程名',
                        align: 'center',
                        key: 'procDefName',
                        sortable: false,
                        minWidth: 180,
                        tooltip: true,
                    },
                    {
                        title: '创建人',
                        align: 'center',
                        key: 'username',
                        sortable: false,
                        minWidth: 180,
                        tooltip: true,
                    },
                    {
                        title: '创建时间',
                        align: 'center',
                        key: 'createTime',
                        minWidth: 180,
                        sortable: false,
                        render: (h, params) => {
                            if (params.row.createTime) {
                                let createTime = formartDate(params.row.createTime, 'yyyy-MM-dd HH:mm:ss');
                                let dataF = this.csvData.filter(item => item.id == params.row.id);
                                dataF[0].createTime = '"' + createTime + ' "';
                                return h('Tooltip', {
                                    props: {
                                        content: createTime,
                                        placement: 'bottom',
                                        transfer: true
                                    }
                                }, createTime)
                            }


                        }
                    },
                    {
                        title: '操作',
                        align: 'center',
                        slot: 'action',
                        width: 200,
                    }
                ]
            },
            //动态列实现
            checkboxChange: function (data) {
                var columnss = this.getTFormGeneratorColumns();
                this.columns = columnss.filter(function (v) {
                    return data.indexOf(v.title) > -1 || v.type == 'selection'
                })
            },
            getTFormGeneratorFormRule() {
                return {
                    procDefId: [
                        {required: true, message: '绑定的流程不能为空！', trigger: 'blur'},
                        {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
                    ]
                }
            }
        },
        mounted() {
            // 模拟异步加载
            this.loading = true;
            setTimeout(() => {
                this.loading = false;
                this.formConfig = localStorage.getItem("form-config") || "";
            }, 1000);
            this.getDataList();
            this.getAllProcess();
            //this.tableHeight = window.innerHeight - this.$refs.tFormGeneratorTable.$el.offsetTop - 270
        }
    }
</script>
<style scoped="less">
  .operation {
    margin-bottom: 10px;
  }
</style>
