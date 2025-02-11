<style lang="less">
  .tEquipmentPacketList {
    .ivu-form .ivu-form-item-label {
      text-align: left;
      padding: 10px 10px 10px 10;
    }
  }

  .ivu-form-item-content > .ivu-btn {
    margin-right: 10px !important;
  }

</style>
<template>
  <div class="search tEquipmentPacketList">
    <Card>
      <Row v-show="openSearch" @keydown.enter.native="handleSearch">
        <Form ref="searchForm" :model="searchForm" inline :label-width="70">
          <!-- <Form-item label="创建时间">
             <DatePicker v-model="selectDate" type="daterange" format="yyyy-MM-dd" clearable @on-change="selectDateRange"
          placeholder="选择起始时间" style="width: 200px"></DatePicker>
          </Form-item> -->
          <Form-item label="分组名称">
            <Input type="text" v-model="searchForm.packetName" placeholder="请输入分组名称"/>
          </Form-item>
          <FormItem label="所属地区" prop="region">
            <i-input v-model="selectModel" placeholder="请选择" readonly>
            </i-input>
            <Dropdown trigger="custom" :visible="departVisible" placement="bottom-end" style="position: absolute;margin: 0px -18px;
    padding: 0px 0px;">
              <a href="javascript:void(0)" @click="departVisible=!departVisible">
                <Icon type="ios-arrow-down" v-bind:class="{departVisibleSelectIcon:departVisible}"></Icon>
              </a>
              <DropdownMenu slot="list" style="position: absolute; will-change: top, left; transform-origin: center top;
              top: 0px; left: -181px;box-shadow: 0 1px 6px rgba(0,0,0,.2);background-color: #fff;width: 185px;">
                <Tree v-bind:data="pidPriority" @on-select-change="handleCheckChange" style="top: 0px; left: 10px;">
                </Tree>
              </DropdownMenu>
            </Dropdown>
          </FormItem>
          <Form-item label="责任人">
            <Input type="text" v-model="searchForm.responsiblePerson" placeholder="请输入责任人姓名"/>
          </Form-item>
          <!-- <Form-item label="设备数量" v-if="drop">
          	<Input type="text" v-model="searchForm.equipmentNumber" placeholder="请输入设备数量"/>
          </Form-item> -->
          <Form-item style="margin-left:-35px" class="br">
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
        <Button @click="addTEquipmentPacket" type="primary" icon="md-add">新增</Button>
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
                <DropdownItem name="bind" @click.native="bindingEquipment(row, index)">
                  <Icon type="ios-create-outline"></Icon>
                  绑定设备
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
              show-sizer></Page>
      </Row>
    </Card>
    <updateTEquipmentPacket v-model="updateShow" :TEquipmentPacketId="TEquipmentPacketId" :modalTitle="title"
                            v-on:handleSearch="handleSearch"></updateTEquipmentPacket>
    <lookTEquipmentPacket v-model="lookShow" :TEquipmentPacketId="TEquipmentPacketId" :modalTitle="title"
                          v-on:handleSearch="handleSearch"></lookTEquipmentPacket>
    <tEquipmentManagementSelectList v-model="equipmentShow" :TEquipmentPacketId="TEquipmentPacketId" :modalTitle="title"
                                    v-on:handleSearch="handleSearch"></tEquipmentManagementSelectList>
    <tEquipmentManagementSelectNumber v-model="equipmentNumberShow" :TEquipmentPacketId="TEquipmentPacketId"
                                      :modalTitle="title"></tEquipmentManagementSelectNumber>
  </div>
</template>
<script>
  import {deleteTEquipmentPacket, queryTEquipmentPacketList} from '@/api/zhgw/tEquipmentPacket/tEquipmentPacket'
  import {formartDate, nginxUrl} from '@/api/tools/tool'
  import updateTEquipmentPacket from './updateTEquipmentPacket'
  import lookTEquipmentPacket from './lookTEquipmentPacket'
  import tEquipmentManagementSelectList from '../tEquipmentManagement/tEquipmentManagementSelectList'
  import tEquipmentManagementSelectNumber from '../tEquipmentManagement/tEquipmentManagementSelectNumber'
  import {getAllDepList,getDept} from '@/api/system/dept'

  export default {
    components: {
      updateTEquipmentPacket,
      lookTEquipmentPacket,
      tEquipmentManagementSelectList,
      tEquipmentManagementSelectNumber
    },
    data() {
      return {
        pidPriority: [],
        departVisible: false,
        selectModel:"",
        equipmentNumberShow: false,
        equipmentShow: false,
        lookShow: false,
        numberShow: false,
        drop: false,
        dropDownContent: "展开",
        dropDownIcon: "ios-arrow-down",
        search: '',
        data: [],
        columns: this.getTEquipmentPacketColumns(),
        openSearch: true,//打开搜索
        openTip: true,//打开提示
        loading: true, // 表单加载状态
        selectCount: 0, // 多选计数
        selectList: [], // 多选数据
        regionPriority: [],
        csvData: [],
        searchForm: {
          // 搜索框对应data对象
          pageNumber: 1, // 当前页数
          pageSize: 10, // 页面大小
          startDate: null,//开始时间
          endDate: null,//结束时间
          sort: 'createTime', // 默认排序字段
          order: 'desc', // 默认排序方式
          packetName: "",
          // regionName: "",
          region:"",
          responsiblePerson: "",
          equipmentNumber: "",
        },
        avatarPath: "",
        imageUrlList: [],
        total: 0,
        title: '',
        TEquipmentPacketId: '',
        updateShow: false,
        tableHeight: 200,
        colOptions: [
          "分组名称", "所属区域", "责任人", "手机号码", "设备数量", "创建时间", "操作"],
        colSelect: [
          "分组名称", "所属区域", "责任人", "手机号码", "设备数量", "创建时间", "操作"],
      }
    },
    methods: {
      // //所属地区
      // getRegionPriority() {
      //   getAllDepList().then(res => {
      //     if (res && res.success) {
      //       this.regionPriority = res.data;
      //     }
      //   });
      // },
      //获取上级部门
      getPidPriority() {
        getDept('').then(res => {
          if (res.content) {
            this.pidPriority = this.getTreeData(res.content);
          }
        });
      },
      //生成部门
      getTreeData(data) {
        if (data) {
          for (let i in data) {
            var item = data[i];
            data[i].title = data[i].label;
            data[i].value = data[i].id;
            data[i].expand = true;
            if (data[i].children) {
              data[i].children = this.getTreeData(data[i].children);
            }
          }
        }
        return data;
      },
      //部门树点击事件
      handleCheckChange(data) {
        this.searchForm.region = data[0].value;
        this.departVisible = false;
        this.selectModel = data[0].title;
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
            data: this.csvData
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
        if (v) {
          this.searchForm.startDate = v[0];
          this.searchForm.endDate = v[1];
        }
      },
      //新增
      addTEquipmentPacket() {
        this.title = '新增';
        this.updateShow = true;
        this.TEquipmentPacketId = '';
      },
      //编辑
      handleEdit(row, index) {
        this.title = '编辑';
        this.TEquipmentPacketId = row.id.toString();
        this.updateShow = true;
      },
      //查看
      handleLook(row, index) {
        this.title = '查看';
        this.TEquipmentPacketId = row.id.toString();
        this.lookShow = true;
      },
      //绑定设备
      bindingEquipment(row, index) {
        this.TEquipmentPacketId = row.id.toString();
        this.equipmentShow = true;
      },
      //分页查询
      getDataList() {
        this.loading = true;
        this.searchForm.id = null;
        queryTEquipmentPacketList(this.searchForm).then(res => {
          if (res && res.success) {
            this.loading = false;
            this.data = res.data.records;
            this.csvData = JSON.parse(JSON.stringify(this.data));
            this.total = res.data.total;
            // console.log(params.row.avatarPath);
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
            this.getDataList();
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
        deleteTEquipmentPacket({ids: ids}).then(res => {
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
        this.$refs.searchForm.resetFields();
        this.searchForm.pageNumber = 1;
        this.searchForm.pageSize = 10;
        this.searchForm.startDate = null;
        this.searchForm.endDate = null;
        this.selectDate = null;
        this.searchForm.packetName = "",
          this.searchForm.region = "",
          this.searchForm.responsiblePerson = "",
          this.searchForm.equipmentNumber = "",
          this.selectModel=""
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
      getTEquipmentPacketColumns() {
        return [
          {
            type: 'selection',
            width: 60,
            align: 'center',
          },
          {
            title: '分组名称',
            align: 'center',
            key: 'packetName',
            sortable: false
          },
          {
            title: '所属区域',
            align: 'center',
            key: 'regionName',
            sortable: false,
          },
          {
            title: '责任人',
            align: 'center',
            key: 'responsiblePerson',
            sortable: false,
            render: (h, params) => {
              if (params.row.responsiblePerson) {
                return h("div", {
                  domProps: {
                    innerHTML: "<img style='height: 40px;width: 40px' src='" + nginxUrl + params.row.avatarPath + "'>" + params.row.responsiblePerson//渲染html内容
                  },
                });
              }
            }
          },
          {
            title: '手机号码',
            align: 'center',
            key: 'phone',
            sortable: false
          },
          {
            title: '设备数量',
            align: 'center',
            key: 'equipmentNumber',
            sortable: false,
            render: (h, params) => {
              if (params.row.equipmentNumber) {
                return h("div", {
                  domProps: {
                    innerHTML: '<a>' + params.row.equipmentNumber + '台' + '</ a>'//渲染html内容
                  },
                  on: {
                    click: () => {
                      this.TEquipmentPacketId = params.row.id.toString();
                      this.equipmentNumberShow = true;
                    }
                  }
                })
              }
            }
          },
          {
            title: '创建时间',
            key: 'createTime',
            sortable: true,
            align: 'center',
            width: 180,
            render: (h, params) => {
              return h('div',
                formartDate(params.row.createTime, 'yyyy-MM-dd HH:mm:ss')
              )
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
        var columnss = this.getTEquipmentPacketColumns();
        this.columns = columnss.filter(function (v) {
          return data.indexOf(v.title) > -1 || v.type == 'selection'
        })
      }
    },

    mounted() {
      this.getDataList();
      // this.getRegionPriority();
      this.getPidPriority();
      //this.tableHeight = window.innerHeight - this.$refs.tEquipmentPacketTable.$el.offsetTop - 270
    }
  }
</script>
<style scoped="less">
  .operation {
    margin-bottom: 10px;
  }
</style>
