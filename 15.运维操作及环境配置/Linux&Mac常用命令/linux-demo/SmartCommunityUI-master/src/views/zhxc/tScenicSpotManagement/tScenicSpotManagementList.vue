<style lang="less" scoped>
  .tScenicSpotManagementList {
    .ivu-col-span-20 {
      display: block;
      width: calc(100% - 275px);
    }
    .ivu-col-span-4 {
      display: block;
      width: 275px;
    }
    .ivu-form .ivu-form-item-label {
      text-align: left;
      padding: 0px 0px 0px 0;
    }

    .ivu-form-item-content > .ivu-btn {
      margin-right: 10px !important;
    }
  }

</style>

<template>

  <div class="search tScenicSpotManagementList">
    <Card>
      <Row type="flex" justify="start">
        <Col span="4">
          <myLeftTree @onSelectChange="selectTree" @onCancelEdit="cancelEdit"></myLeftTree>
        </Col>
        <Col span="20" style="padding-left: 20px;">
          <Row v-show="openSearch" @keydown.enter.native="handleSearch" @submit.native.prevent>
            <Form ref="searchForm" :model="searchForm" inline :label-width="70" >
              <Form-item label="点位名称">
                <Input type="text" v-model="searchForm.name" placeholder="请输入点位名称"/>
              </Form-item>
              <Form-item label="区域名称">
                <Select v-model="searchForm.pointType" style="width:200px">
                    <Option v-for="(item, i)  in areaTypeArr" :value="item.id"  :key="item.id">{{ item.title }}</Option>
                </Select>
              </Form-item>
              <!--					<Form-item label="创建时间">-->
              <!--					   <DatePicker v-model="selectDate" type="daterange" format="yyyy-MM-dd" clearable @on-change="selectDateRange"-->
              <!--					placeholder="选择起始时间" style="width: 200px"></DatePicker>-->
              <!--					</Form-item>-->
              <Form-item style="margin-left:-35px" class="br">
                <Button @click="handleSearch" type="primary" icon="ios-search">搜索</Button>
                <Button @click="handleReset">重置</Button>
                <!--						<a class="drop-down" @click="dropDown">-->
                <!--							{{dropDownContent}}-->
                <!--							<Icon :type="dropDownIcon"></Icon>-->
                <!--						</a>-->
              </Form-item>
            </Form>
          </Row>
          <Row class="operation">
            <Button @click="addTScenicSpotManagement" type="primary" icon="md-add">新增</Button>
            <Button @click="addShpFile" type="primary" icon="md-add">批量新增</Button>
            <Button @click="updateBatch" type="primary" icon="ios-create-outline">批量编辑</Button>
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
                    <row v-for="(item, i)  in colSelect">
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
                <Button type="info" @click="handleLook(row, index)" size="small">
                  <Icon type="ios-eye-outline"/>
                  查看
                </Button>
                <Button type="primary" @click.native="handleEdit(row, index)" size="small">
                  <Icon type="ios-eye-outline"/>
                  修改
                </Button>
                <Button type="error" @click.native="deleteData(row, index)" size="small">
                  <Icon type="md-trash"/>
                  删除
                </Button>
              </template>
            </Table>

          </Row>
          <Row type="flex" justify="end" class="page">
            <Page :current="searchForm.pageNumber" :total="total" :page-size="searchForm.pageSize" @on-change="changePage"
                  @on-page-size-change="changePageSize" :page-size-opts="[10,20,50,100,200,500,1000,2000]" size="small" show-total show-elevator show-sizer></Page>
          </Row>
        </Col>
      </Row>
    </Card>
    <updateTScenicSpotManagementPage v-model="updateShow" :menuId="menuId" :menuName="menuNames" :TScenicSpotManagementId="TScenicSpotManagementId"
                                     :modalTitle="title" v-on:handleSearch="getDataList"></updateTScenicSpotManagementPage>
    <lookTScenicSpotManagement v-model="lookShow" :TScenicSpotManagementId="TScenicSpotManagementId" :modalTitle="title"
                               v-on:handleSearch="handleSearch"></lookTScenicSpotManagement>
    <plot v-model="mapShow" @resultPoint="getResultPoint" :iconPath="icon" :menuId="this.menuIdMap" :objData="pointArr" :selectType="selectType"
          divId="TScenicSpotManagementId" modalTitle="选择坐标点"></plot>

    <uploadShp v-model="showShpFile" :menuId="menuId" :title="title" :menuName="menuNames" objectType="point"
               v-on:handleSearch="handleSearch"></uploadShp>
    <batchUpdateTScenicSpotManagement v-model="batchUpdateShow" :menuId="menuId" :menuName="menuNames" :TScenicSpotManagementId="TScenicSpotManagementId"
                                     modalTitle="批量修改" v-on:handleSearch="getDataList"></batchUpdateTScenicSpotManagement>
  </div>
</template>
<script>
    import {
        deleteTScenicSpotManagement,
        isNotHaveChildren,
        updateTScenicSpotManagement,
        getTScenicSpotManagementListByTree,
    } from '@/api/zhxc/tScenicSpotManagement/tScenicSpotManagement'
    import myLeftTree from "../components/myLeftTree";
    import updateTScenicSpotManagementPage from './updateTScenicSpotManagement'
    import batchUpdateTScenicSpotManagement from './batchUpdateTScenicSpotManagement'
    import lookTScenicSpotManagement from './lookTScenicSpotManagement'
    import {mapGetters} from "vuex";
    import show from "./show";
    import plot from "../../gismap/components/mapLabel";
    import uploadShp from "../components/uploadShp";
    import { getDepts } from "@/api/system/dept";

    export default {
        components: {
            updateTScenicSpotManagementPage,
            lookTScenicSpotManagement,
            batchUpdateTScenicSpotManagement,
            myLeftTree,
            plot,
            show,
            uploadShp,
            ...mapGetters(["permitIds"])
        },
        data() {
            return {
                showShpFile:false,
                drop: false,
                selectType: "Point",
                dropDownContent: "展开",
                dropDownIcon: "ios-arrow-down",
                search: '',
                editPosition: '',
                editId: '',
                icon: '/img/scenicSpotIcon/1.png',
                data: [],
                pointArr: [],
                menuIdMap:'',
                mapShow: false,
                menuId: null,
                menuNames: "",
                columns: this.getTScenicSpotManagementColumns(),
                openSearch: true,//打开搜索
                openTip: true,//打开提示
                loading: true, // 表单加载状态
                selectCount: 0, // 多选计数
                selectList: [], // 多选数据
                areaTypeArr:[],//区域列表
                searchForm: {
                    menuId: null,
                    name: '',
                    pointType:'',
                    // 搜索框对应data对象
                    pageNumber: 1, // 当前页数
                    pageSize: 10, // 页面大小
                    startDate: null,//开始时间
                    endDate: null,//结束时间
                    sort: 'createTime', // 默认排序字段
                    order: 'desc' // 默认排序方式
                },
                total: 0,
                title: '',
                TScenicSpotManagementId: '',
                lookShow: false,
                lookShowMin: false,
                lookIdMin: '',
                updateShow: false,
                tScenicSpotManagementFrom: '',
                tableHeight: 200,
                colOptions: ["点位名称", "菜单名称", "所属区域","显示状态","点位位置", "创建时间", "操作"],
                colSelect: ["点位名称", "菜单名称", "所属区域","显示状态", "点位位置", "创建时间", "操作"],
                isChildren: false,
                batchUpdateShow:false,
            }
        },
        methods: {
             // 获取区域数据
			getlist() {
				getDepts({ enabled: true }).then((res) => {
                    this.areaTypeArr=[]
					this.getTreeData(res.content,0);
					this.areaTypeArr.unshift({
						title: "首页",
						value: "0",
						id:"0",
						expand: false,
						selected: false,
						checked: false,
					});
				});
			},
			//转为tree使用的数据
			getTreeData(data,level) {
				level++;
				if (data) {
                        for (var i=0;i<data.length;i++) {
                        var item = data[i];
                        if(level>2){
                            data[i].title = data[i].label;
                            data[i].value = data[i].id;
                            data[i].expand = true;
                            data[i].selected= false;
                            data[i].checked=false;
                            this.areaTypeArr.push(data[i])
                        }
                        if (data[i].children) {
                            data[i].children = this.getTreeData(data[i].children,level);
                        }
                    }
                }
			},
            //显示状态
            displayState(row) {
                let str = '';
                this.tScenicSpotManagementFrom = row;
                if (row.display == 0) {
                    str = '显示';
                    row.display = '1';
                } else if (row.display == 1) {
                    str = '隐藏';
                    row.display = '0';
                }
                this.$Modal.confirm({
                    title: "确认要" + str,
                    content: "您是否要" + str + "?",
                    loading: true,
                    onOk: () => {
                        updateTScenicSpotManagement(this.tScenicSpotManagementFrom).then(res => {
                            this.$Modal.remove();
                            if (res && res.code == 200) {
                                this.$Message.success('修改成功');
                            } else {
                                this.$Message.error(res.msg);
                            }
                        });
                    },
                    onCancel: () => {
                        if (row.display == 0) {
                            row.display = '1';
                        } else if (row.display == 1) {
                            row.display = '0';
                        }
                        this.$Message.info('取消了当前的操作行为！');
                    },
                });
            },
            //选择树
            selectTree(v) {
                if (v.length > 0) {
                    // 转换null为""
                    for (let attr in v[0]) {
                        if (v[0][attr] == null) {
                            v[0][attr] = "";
                        }
                    }
                    let str = JSON.stringify(v[0]);
                    let menu = JSON.parse(str);
                    if (menu.children == '') {
                        this.isChildren = false;
                    } else {
                        this.isChildren = true;
                    }
                    this.menuId = menu.id;
                    this.menuNames = menu.name;
                    this.getDataList();
                }
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
                    this.$refs.table.exportCsv({
                        filename: '本页数据',
                        columns: excolumns,
                        data: this.data
                    });
                }
            },
            cancelEdit() {
                this.menuId = null;
                this.editTitle = "";
                this.getDataList();

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
            //时间选择事件
            selectDateRange(v) {
                if (v) {
                    this.searchForm.startDate = v[0];
                    this.searchForm.endDate = v[1];
                }
            },
            //新增
            addTScenicSpotManagement() {
                if (!this.menuId) {
                    this.$Message.error("请先选择对应的菜单专题！");
                    return;
                }
              if (!this.isChildren) {
                this.title = '新增';
                this.updateShow = true;
                this.TScenicSpotManagementId = '';
              } else {
                this.$Message.error("请选择其菜单的子节点！");
              }
            },
            //批量更新
            updateBatch() {
                if (this.selectCount <= 0) {
                    this.$Message.warning('您还未选择要编辑的数据');
                    return;
                }
                if (!this.searchForm.menuId) {
                    this.$Message.error("请先选择对应的菜单专题！");
                    return;
                }
                if (!this.isChildren) {
                    this.$Modal.confirm({
                        title: '确认编辑',
                        content: '您确认要编辑所选的 ' + this.selectCount + '条数据?',
                        onOk: () => {
                           this.batchUpdateShow = true;
                        },
                        onCancel: () => {
                          this.$Message.info('取消了当前的操作行为！');
                        }
                    });
                } else {
                    this.$Message.error("请选择其菜单的子节点！");
                }
            },
            //编辑
            handleEdit(row, index) {
                this.title = '编辑';
                this.TScenicSpotManagementId = row.id.toString();
                this.updateShow = true;
            },
            //查看
            handleLook(row, index) {
                this.title = '查看';
                this.TScenicSpotManagementId = row.id.toString();
                this.lookShow = true;
            },
            //分页查询
            getDataList() {
                this.loading = true;
                this.searchForm.menuId = this.menuId;
                this.searchForm.id = null;
              getTScenicSpotManagementListByTree(this.searchForm).then(res => {
                    if (res && res.success) {
                        this.loading = false;
                        this.data = res.data.records;
                        this.total = res.data.total;
                    }
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
                deleteTScenicSpotManagement({ids: ids}).then(res => {
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
                this.icon = '';
                this.$refs.searchForm.resetFields();
                this.searchForm.pageNumber = 1;
                this.searchForm.pageSize = 10;
                this.searchForm.startDate = null;
                this.searchForm.endDate = null;
                this.selectDate = null;
                this.searchForm.name = '',
                this.searchForm. pointType='',
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
            getTScenicSpotManagementColumns() {
                return [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center',
                    },

                    {
                        title: '点位名称',
                        align: 'center',
                        key: 'name',
                        tooltip: true,
                        sortable: false
                    },
                    {
                        title: '菜单名称',
                        align: 'center',
                        tooltip: true,
                        ellipsis: true,
                        key: 'menuName',
                        sortable: false
                    },
                    {
                        title: '所属区域',
                        align: 'center',
                        tooltip: true,
                        ellipsis: true,
                        key: 'typeName',
                        render: (h, params) => {
                        let positions =
                        params.row.pointType == "0" ? "首页" : params.row.typeName;
                        // let datad = this.csvData.filter((item) => item.id == params.row.id);
                        // datad[0].position = positions;
                        return h(
                        "Tooltip",
                        {
                            props: {
                            content: positions,
                            placement: "bottom",
                            transfer: true,
                            },
                        },
                        positions
                        );
                    },
                        sortable: false
                    },
                    {
                        title: '显示状态',
                        align: 'center',
                        tooltip: true,
                        key: 'display',
                        sortable: false,
                        render: (h, params) => {
                            return h('div', [
                                h('i-switch', { //数据库1是显示，0是隐藏
                                    props: {
                                        type: 'primary',
                                        trueValue: '1',
                                        falseValue: '0',
                                        value: params.row.display //控制开关的打开或关闭状态，官网文档属性是value

                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        'on-change': (value) => {//触发事件是on-change,用双引号括起来，
                                            //参数value是回调值，并没有使用到
                                            this.displayState(params.row); //params.index是拿到table的行序列，可以取到对应的表格值
                                        }
                                    }
                                },)
                            ]);
                        }
                    },
                    {
                        title: '点位位置',
                        align: 'center',
                        key: 'position',
                        sortable: false,
                        render: (h, params) => {
                          this.menuIdMap = params.row.menuId;
                            if (params.row.position != "") {
                                return h('div', [
                                    h('Button', {
                                        props: {
                                            type: 'success',
                                            size: 'small'
                                        },
                                        on: {
                                            click: () => {
                                                this.editRow(params.row)
                                            },
                                        },
                                    }, "已标注"),
                                ])

                            } else {
                                return h('div', [
                                    h('Button', {
                                        props: {
                                            type: 'error',
                                            size: 'small'
                                        },
                                        on: {
                                            click: () => {
                                                this.editRow(params.row)
                                            },
                                        },
                                    }, '未标注')])
                            }
                        }
                    },
                    // {
                    //     title: '图标',
                    //     align: 'center',
                    //     key: 'icon',
                    //     tooltip: true,
                    //     sortable: false,
                    //     render: (h, params) => {
                    //         let icon = params.row.icon;
                    //         if (params.row.display == 1) {
                    //             return h('div', {
                    //                 domProps: {
                    //                     innerHTML: "<img style='height: 40px;width: 40px' src='" + icon + "'>"
                    //                 },
                    //             })
                    //         } else {
                    //             return h('div', [
                    //                 h('div', {}, '')])
                    //         }
                    //     },
                    // },


                    // {
                    // 	title: '描述',
                    // 	align: 'center',
                    //   tooltip:true,
                    //   ellipsis:true,
                    // 	key: 'describes',
                    // 	sortable: false
                    // },
                    {
                        title: '创建时间',
                        key: 'createTime',
                        tooltip: true,
                        sortable: true,
                        align: 'center',
                        width: 180,
                    },
                    {
                        title: '操作',
                        align: 'center',
                        slot: 'action',
                        width: 250,
                        fixed: 'right',
                    }
                ]
            },
            //动态列实现
            checkboxChange: function (data) {
                var columnss = this.getTScenicSpotManagementColumns();
                this.columns = columnss.filter(function (v) {
                    return data.indexOf(v.title) > -1 || v.type == 'selection'
                })
            },
            //点击列表标注 修改坐标点
            editRow(row) {
                this.editId = row.id;
                this.icon = row.icon;
                this.editPosition = row.position;
                if (row.position) {
                    try {
                        this.pointArr = JSON.parse(row.position);
                    } catch (e) {
                    }
                } else {
                    this.pointArr = [];
                }
                this.mapShow = true;
            },
            getResultPoint(obj, type) {
                let arr = obj.flatCoordinates;
                let position = JSON.stringify(arr);
                //修改当前行
                updateTScenicSpotManagement({id: this.editId, position: position}).then(res => {
                    if (res && res.code == 200) {
                        this.pointArr = [];
                        this.$Message.success('保存成功');
                        this.getDataList();
                    } else {
                        this.$Message.error(res.msg);
                    }
                })
            },
            addShpFile() {
                if (!this.menuId) {
                    this.$Message.error("请先选择对应的菜单！");
                    return;
                }
                if (!this.isChildren) {
                    this.title = this.menuNames + '批量新增';
                    this.showShpFile = true;
                } else {
                    this.$Message.error("请选择其菜单的子节点！");
                }

            },
        },
        mounted() {
            this.getDataList();
            this.getlist();
            //this.tableHeight = window.innerHeight - this.$refs.tScenicSpotManagementTable.$el.offsetTop - 270
        },
    }
</script>
<style scoped="less">
  .operation {
    margin-bottom: 10px;
  }
</style>
