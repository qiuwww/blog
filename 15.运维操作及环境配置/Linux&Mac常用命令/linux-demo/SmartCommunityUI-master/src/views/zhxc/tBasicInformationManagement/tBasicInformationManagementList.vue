<style lang="less" scoped>
.tBasicInformationManagementList {
  .ivu-form .ivu-form-item-label {
    text-align: left;
    padding: 0px 0px 0px 0;
  }

  .ivu-select {
    width: 200px;
  }

  .ivu-input-wrapper {
    width: 200px !important;
  }

  .operation {
    margin-bottom: 10px;
  }

  .ivu-form-item-content > .ivu-btn {
    margin-right: 10px !important;
  }

  .ivu-col-span-20 {
    width: calc(100% - 275px);
  }

  .ivu-col-span-4 {
    width: 275px;
  }
}
</style>
<template>
  <div class="search tBasicInformationManagementList">
    <Card>
      <Row type="flex" justify="start">
        <Col span="4">
          <myLeftTree
            @onSelectChange="selectTree"
            @onCancelEdit="cancelEdit"
          ></myLeftTree>
        </Col>
        <Col span="20" style="padding-left: 20px">
          <Row v-show="openSearch" @keydown.enter.native="handleSearch">
            <Form ref="searchForm" :model="searchForm" inline :label-width="70">
              <Form-item label="区域名称">
                <Input v-model="searchForm.name" placeholder="请输入区域名称" />
              </Form-item>
              <Form-item label="所属区域">
                <Select v-model="searchForm.areaType" style="width:200px">
                    <Option v-for="(item, i)  in areaTypeArr" :value="item.id"  :key="item.id">{{ item.title }}</Option>
                </Select>
              </Form-item>
              <Form-item label="创建时间">
                <DatePicker
                  v-model="selectDate"
                  type="daterange"
                  format="yyyy-MM-dd HH:mm:ss"
                  clearable
                  @on-change="selectDateRange"
                  placeholder="选择起始时间"
                  style="width: 200px"
                ></DatePicker>
              </Form-item>
              <Form-item style="margin-left: -35px" class="br">
                <Button @click="handleSearch" type="primary" icon="ios-search"
                  >搜索</Button
                >
                <Button @click="handleReset">重置</Button>
                <!--<a class="drop-down" @click="dropDown">
                  {{dropDownContent}}
                  <Icon :type="dropDownIcon"></Icon>
                </a>-->
              </Form-item>
            </Form>
          </Row>
          <Row class="operation">
            <Button
              @click="addTBasicInformationManagement"
              type="primary"
              icon="md-add"
              >新增</Button
            >
            <Button @click="addShpFile" type="primary" icon="md-add"
              >批量新增</Button
            >
            <Button
              @click="updateBatch"
              type="primary"
              icon="ios-create-outline"
              >批量编辑</Button
            >
            <Dropdown @on-click="handleDropdown">
              <Button>
                更多操作
                <Icon type="md-arrow-dropdown" />
              </Button>
              <DropdownMenu slot="list">
                <DropdownItem name="refresh">
                  <Icon type="md-sync" />
                  刷新
                </DropdownItem>
                <DropdownItem name="removeAll">
                  <Icon type="md-trash" />
                  批量删除
                </DropdownItem>
                <DropdownItem name="export">
                  <Icon type="md-arrow-down" />
                  导出本页数据
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Button type="dashed" @click="openSearch = !openSearch">{{
              openSearch ? "关闭搜索" : "开启搜索"
            }}</Button>
            <Button type="dashed" @click="openTip = !openTip">{{
              openTip ? "关闭提示" : "开启提示"
            }}</Button>
            <div style="float: right">
              <Poptip
                transfer
                trigger="click"
                placement="bottom-end"
                title="动态列"
              >
                <Button icon="md-list"></Button>
                <div slot="content" style="position: relative; min-height: 5vh">
                  <Checkbox-group
                    v-model="colOptions"
                    @on-change="checkboxChange"
                  >
                    <Row v-for="(item, i)  in colSelect" :key="item">
                      <checkbox :label="item"></checkbox>
                    </Row>
                  </Checkbox-group>
                </div>
              </Poptip>
            </div>
          </Row>
          <Row v-show="openTip">
            <Alert show-icon>
              已选择
              <span class="select-count">{{ selectCount }}</span> 项
              <a class="select-clear" @click="clearSelectAll">清空</a>
              <span style="float: right">点击右上角按钮配置动态列↑</span>
            </Alert>
          </Row>
          <Row>
            <Table
              :loading="loading"
              border
              :columns="columns"
              sortable="custom"
              :data="data"
              @on-sort-change="changeSort"
              @on-selection-change="showSelect"
              ref="table"
            >
              <template slot-scope="{ row, index }" slot="action">
                <Button
                  type="info"
                  @click="handleLook(row, index)"
                  size="small"
                >
                  <Icon type="ios-eye-outline" />
                  查看
                </Button>
                <Button
                  type="primary"
                  size="small"
                  @click.native="handleEdit(row, index)"
                >
                  <Icon type="ios-create-outline" />
                  修改
                </Button>
                <Button
                  type="error"
                  size="small"
                  @click.native="deleteData(row, index)"
                >
                  <Icon type="md-trash"></Icon>
                  删除
                </Button>
                <!--<Dropdown :transfer=true>
                  <Button size="small">
                    更多操作
                    <Icon  type="md-arrow-dropdown"/>
                  </Button>
                  <DropdownMenu slot="list">
                    <DropdownItem name="edit" @click.native="handleEdit(row, index)"><Icon type="ios-create-outline" />修改</DropdownItem>
                    <DropdownItem name="delete" @click.native="deleteData(row, index)"><Icon type="md-trash"></Icon>删除</DropdownItem>
                  </DropdownMenu>
                </Dropdown>-->
              </template>
            </Table>
          </Row>
          <Row type="flex" justify="end" class="page">
            <Page
              :current="searchForm.pageNumber"
              :total="total"
              :page-size="searchForm.pageSize"
              @on-change="changePage"
              @on-page-size-change="changePageSize"
              :page-size-opts="[10, 20, 50, 100, 200, 500, 1000, 2000]"
              size="small"
              show-total
              show-elevator
              show-sizer
            ></Page>
          </Row>
        </Col>
      </Row>
    </Card>
    <updateTBasicInformationManagement
      v-model="updateShow"
      :menuId="searchForm.menuId"
      :menuName="searchForm.menuName"
      :TBasicInformationManagementId="TBasicInformationManagementId"
      :modalTitle="title"
      v-on:handleSearch="getDataList"
    ></updateTBasicInformationManagement>

    <batchUpdateTBasicInformationManagement
      v-model="batchUpdateShow"
      :menuId="searchForm.menuId"
      :menuName="searchForm.menuName"
      modalTitle="批量更新"
      v-on:handleSearch="getDataList"
    ></batchUpdateTBasicInformationManagement>
    <lookTBasicInformationManagement
      v-model="lookShow"
      :TBasicInformationManagementId="TBasicInformationManagementId"
      :modalTitle="title"
    ></lookTBasicInformationManagement>

    <!-- 地图弹窗 -->
    <mapLabel
      v-model="showMap"
      modalTitle="选择坐标点"
      @resultPoint="getPosition"
      divId="tBasicInformationManagementList"
      :objData="pointArr"
      :selectType="selectType"
      :menuId="String(searchForm.menuId)"
      :rgbaColor="rgbaColor"
    ></mapLabel>

    <uploadShp
      v-model="showShpFile"
      :menuId="searchForm.menuId"
      :title="title"
      :menuName="searchForm.menuName"
      objectType="polygon"
      v-on:handleSearch="handleSearch"
    ></uploadShp>
  </div>
</template>
<script>
import {
  deleteTBasicInformationManagement,
  queryTBasicInformationManagementList,
  updateTBasicInformationManagement as updateData,
} from "@/api/zhxc/tBasicInformationManagement/tBasicInformationManagement";
import updateTBasicInformationManagement from "./updateTBasicInformationManagement";
import batchUpdateTBasicInformationManagement from "./batchUpdateTBasicInformationManagement";
import lookTBasicInformationManagement from "./lookTBasicInformationManagement";
import myLeftTree from "../components/myLeftTree";
import mapLabel from "@/views/gismap/components/mapLabel";
import logVue from "../../system/timing/log.vue";

import uploadShp from "../components/uploadShp";
import { getDepts } from "@/api/system/dept";
export default {
  components: {
    updateTBasicInformationManagement,
    batchUpdateTBasicInformationManagement,
    lookTBasicInformationManagement,
    myLeftTree,
    mapLabel,
    uploadShp,
  },
  data() {
    return {
      drop: false,
      dropDownContent: "展开",
      dropDownIcon: "ios-arrow-down",
      search: "",
      data: [],
      csvData: [],
      columns: this.getTBasicInformationManagementColumns(),
      openSearch: true, //打开搜索
      openTip: true, //打开提示
      loading: true, // 表单加载状态
      selectCount: 0, // 多选计数
      selectList: [], // 多选数据
      areaTypeArr:[],//区域列表
      searchForm: {
        name: "",
        position: "",
        description: "",
        menuId: null,
        menuName: "",
        areaType:"",//区域名称
        // 搜索框对应data对象
        pageNumber: 1, // 当前页数
        pageSize: 10, // 页面大小
        startDate: null, //开始时间
        endDate: null, //结束时间
        sort: "createTime", // 默认排序字段
        order: "desc", // 默认排序方式
      },
      total: 0,
      title: "",
      TBasicInformationManagementId: "",
      updateShow: false,
      tableHeight: 200,
      colOptions: [
        "区域名称",
        "菜单名称",
        "显示状态",
        "所属区域",
        "区域位置",
        "创建人员",
        "创建时间",
        "操作",
      ],
      colSelect: [
        "区域名称",
        "菜单名称",
        "显示状态",
        "所属区域",
        "区域位置",
        "创建人员",
        "创建时间",
        "操作",
      ],
      selectDate: null,
      lookShow: false,
      isChildren: false,
      showMap: false,
      pointArr: [],
      selectType: "Polygon",
      tBasicInformationManagementForm: null,
      rgbaColor: "",
      showShpFile: false,
      batchUpdateShow: false,
    };
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
      let str = "";
      this.tBasicInformationManagementForm = row;
      if (row.isDisplayState == 0) {
        str = "显示";
        row.isDisplayState = 1;
      } else if (row.isDisplayState == 1) {
        str = "隐藏";
        row.isDisplayState = 0;
      }
      this.$Modal.confirm({
        title: "确认要" + str,
        content: "您是否要" + str + "?",
        loading: true,
        onOk: () => {
          updateData(this.tBasicInformationManagementForm).then((res) => {
            this.$Modal.remove();
            if (res && res.code == 200) {
              this.$Message.success("修改成功");
            } else {
              this.$Message.error(res.msg);
            }
          });
        },
        onCancel: () => {
          if (row.isDisplayState == 0) {
            row.isDisplayState = 1;
          } else if (row.isDisplayState == 1) {
            row.isDisplayState = 0;
          }
          this.$Message.info("取消了当前的操作行为！");
        },
      });
    },
    //颜色十六进制转变为rgba格式
    colorTransform(color, alpha) {
      // 16进制颜色值的正则
      var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
      // 把颜色值变成小写
      color = color.toLowerCase();
      if (reg.test(color)) {
        // 如果只有三位的值，需变成六位，如：#fff => #ffffff
        if (color.length === 4) {
          var colorNew = "#";
          for (var i = 1; i < 4; i += 1) {
            colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1));
          }
          color = colorNew;
        }
        // 处理六位的颜色值，转为RGB
        var colorChange = [];
        for (var i = 1; i < 7; i += 2) {
          colorChange.push(parseInt("0x" + color.slice(i, i + 2)));
        }
        return "rgba(" + colorChange.join(",") + "," + alpha + ")";
      } else {
        return color;
      }
    },
    //地图标注
    labelMap(row) {
      if (row.position) {
        this.pointArr = JSON.parse(row.position);
      } else {
        this.pointArr = [];
      }
      this.tBasicInformationManagementForm = row;
      this.rgbaColor = this.colorTransform(
        this.tBasicInformationManagementForm.polygonColor,
        this.tBasicInformationManagementForm.alpha
      );
      this.searchForm.menuId = Number(row.menuId);
      this.showMap = true;
    },
    //获取坐标点
    getPosition(obj, type) {
      if (this.tBasicInformationManagementForm) {
        if (obj.flatCoordinates) {
          this.tBasicInformationManagementForm.position = JSON.stringify(
            obj.flatCoordinates
          );
        } else {
          this.tBasicInformationManagementForm.position = "";
        }
        updateData(this.tBasicInformationManagementForm).then((res) => {
          if (res && res.code == 200) {
            this.$Message.success("修改成功");
          } else {
            this.$Message.error(res.msg);
          }
        });
      }
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
        if (menu.children == "") {
          this.isChildren = false;
        } else {
          this.isChildren = true;
        }
        this.searchForm.menuId = menu.id;
        this.searchForm.menuName = menu.name;
        this.getDataList();
      }
    },
    cancelEdit() {
      this.searchForm.menuId = null;
      this.searchForm.menuName = "";
      this.getDataList();
    },
    //列表上方更多操作
    handleDropdown(name) {
      if (name == "refresh") {
        this.getDataList();
      } else if (name == "removeAll") {
        this.delAll();
      } else if (name == "export") {
        let excolumns = this.columns.filter(function (v) {
          return v.title != "操作" && v.type != "selection";
        });
        this.$refs.table.exportCsv({
          filename: "本页数据",
          columns: excolumns,
          data: this.csvData,
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
    //时间选择事件
    selectDateRange(v) {
      if (v && v.length > 0) {
        if (v[0] != "") {
          this.searchForm.startDate = v[0];
        } else {
          this.searchForm.startDate = null;
        }
        if (v[1] != "") {
          this.searchForm.endDate = v[1];
        } else {
          this.searchForm.endDate = null;
        }
      }
    },
    //新增
    addTBasicInformationManagement() {
      if (!this.searchForm.menuId) {
        this.$Message.error("请先选择对应的菜单专题！");
        return;
      }
      if (!this.isChildren) {
        this.title = "新增";
        this.updateShow = true;
        this.TBasicInformationManagementId = "";
      } else {
        this.$Message.error("请选择其菜单的子节点！");
      }
    },
    //编辑
    handleEdit(row, index) {
      this.title = "编辑";
      this.TBasicInformationManagementId = row.id.toString();
      this.updateShow = true;
    },
    //查看
    handleLook(row, index) {
      this.title = "查看";
      this.TBasicInformationManagementId = row.id.toString();
      this.lookShow = true;
    },
    //分页查询
    getDataList() {
      this.loading = true;
      this.searchForm.id = null;
      queryTBasicInformationManagementList(this.searchForm).then((res) => {
        if (res && res.success) {
          this.loading = false;
          this.data = res.data.records;
          this.csvData = JSON.parse(JSON.stringify(res.data.records));
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
          this.$Message.info("取消了当前的操作行为！");
        },
      });
    },
    //批量删除
    delAll() {
      if (this.selectCount <= 0) {
        this.$Message.warning("您还未选择要删除的数据");
        return;
      }
      this.$Modal.confirm({
        title: "确认删除",
        content: "您确认要删除所选的 " + this.selectCount + "条数据?",
        loading: true,
        onOk: () => {
          let ids = [];
          this.selectList.forEach(function (e) {
            ids.push(e.id);
          });
          this.patchdeleteData(ids);
        },
        onCancel: () => {
          this.$Message.info("取消了当前的操作行为！");
        },
      });
    },
    //删除（后台）
    patchdeleteData(ids) {
      if (ids == undefined || ids == null || ids.length == 0) {
        this.$Message.error("没有选择的数据");
        return;
      }
      deleteTBasicInformationManagement({ ids: ids }).then((res) => {
        this.userLoading = false;
        this.$Modal.remove();
        if (res && res.success) {
          this.modalTaskVisible = false;
          this.$Message.success("删除成功");
          this.getDataList();
        } else {
          this.$Message.error("删除失败");
        }
      });
    },
    //批量更新
    updateBatch() {
      if (this.selectCount <= 0) {
        this.$Message.warning("您还未选择要编辑的数据");
        return;
      }
      this.$Modal.confirm({
        title: "确认编辑",
        content: "您确认要编辑所选的 " + this.selectCount + "条数据?",
        onOk: () => {
          this.batchUpdateShow = true;
        },
        onCancel: () => {
          this.$Message.info("取消了当前的操作行为！");
        },
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
      if (e.order == "normal") {
        this.searchForm.order = "";
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
      this.searchForm.name = "";
      this.searchForm.areaType = "";
      this.searchForm.position = "";
      this.searchForm.description = "";
      this.searchForm.pageNumber = 1;
      this.searchForm.pageSize = 10;
      this.searchForm.startDate = null;
      this.searchForm.endDate = null;
      this.selectDate = null;
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
    getTBasicInformationManagementColumns() {
      return [
        {
          type: "selection",
          width: 60,
          align: "center",
        },
        {
          title: "区域名称",
          align: "center",
          key: "name",
          sortable: false,
          tooltip: true,
        },
        {
          title: "菜单名称",
          align: "center",
          key: "menuName",
          sortable: false,
          tooltip: true,
        },
        {
          title: "显示状态",
          align: "center",
          key: "isDisplayState",
          sortable: false,
          tooltip: true,
          render: (h, params) => {
            let isDisplayState = params.row.isDisplayState ? "隐藏" : "显示";
            let datad = this.csvData.filter((item) => item.id == params.row.id);
            datad[0].position = isDisplayState;
            return h("div", [
              h("i-switch", {
                //数据库1是已处理，0是未处理
                props: {
                  type: "primary",
                  value: params.row.isDisplayState, //控制开关的打开或关闭状态，官网文档属性是value
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
                    this.displayState(params.row); //params.index是拿到table的行序列，可以取到对应的表格值
                  },
                },
              }),
            ]);
          },
        },
        {
          title: "所属区域",
          align: "center",
          key: "areaTypeName",
          sortable: false,
          tooltip: true,
          render: (h, params) => {
            let positions =
              params.row.areaType == "0" ? "首页" : params.row.areaTypeName;
            let datad = this.csvData.filter((item) => item.id == params.row.id);
            datad[0].position = positions;
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
        },
        {
          title: "区域位置",
          align: "center",
          key: "position",
          sortable: false,
          tooltip: true,
          render: (h, params) => {
            let positions = params.row.position ? "已标注" : "未标注";
            let datad = this.csvData.filter((item) => item.id == params.row.id);
            datad[0].position = positions;
            if (params.row.position) {
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "success",
                      size: "small",
                    },
                    on: {
                      click: () => {
                        this.labelMap(params.row);
                      },
                    },
                  },
                  "已标注"
                ),
              ]);
            } else {
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "error",
                      size: "small",
                    },
                    on: {
                      click: () => {
                        this.labelMap(params.row);
                      },
                    },
                  },
                  "未标注"
                ),
              ]);
            }
          },
        },
        {
          title: "创建人员",
          align: "center",
          key: "createName",
          sortable: false,
          tooltip: true,
        },
        {
          title: "创建时间",
          align: "center",
          key: "createTime",
          sortable: false,
          tooltip: true,
        },
        {
          title: "操作",
          align: "center",
          slot: "action",
          width: 250,
          fixed: "right",
        },
      ];
    },
    //动态列实现
    checkboxChange: function (data) {
      var columnss = this.getTBasicInformationManagementColumns();
      this.columns = columnss.filter(function (v) {
        return data.indexOf(v.title) > -1 || v.type == "selection";
      });
    },
    addShpFile() {
      if (!this.searchForm.menuId) {
        this.$Message.error("请先选择对应的菜单！");
        return;
      }
      if (!this.isChildren) {
        this.title = this.searchForm.menuName + "批量新增";
        this.showShpFile = true;
      } else {
        this.$Message.error("请选择其菜单的子节点！");
      }
    },
  },
  mounted() {
    this.getDataList();
    this.getlist();
    //this.tableHeight = window.innerHeight - this.$refs.tBasicInformationManagementTable.$el.offsetTop - 270
  },
};
</script>
