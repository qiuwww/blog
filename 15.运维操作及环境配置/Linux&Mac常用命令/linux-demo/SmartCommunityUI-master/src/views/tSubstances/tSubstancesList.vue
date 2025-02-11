<style lang="less">
  .tSubstancesList{
    .ivu-form .ivu-form-item-label {
      text-align: left;
      padding: 0px 0px 0px 0;
    }

  }
  .ivu-form-item-content>.ivu-btn{
    margin-right: 10px !important;
  }



</style>
<template>
  <div class="search,tSubstancesList">
    <Card>
      <Row v-show="openSearch" @keydown.enter.native="handleSearch">
        <Form ref="searchForm" :model="searchForm" inline :label-width="70">
          <Form-item label="物质名称">
            <Input type="text" v-model="searchForm.name" placeholder="请输入" clearable style="width: 200px"/>
          </Form-item>
          <Form-item label="规格型号" v-if="drop">
            <Input type="text" v-model="searchForm.specificationModel" placeholder="请输入" clearable style="width: 200px"/>
          </Form-item>
          <Form-item label="所属单位" v-if="drop">
            <Input type="text" v-model="searchForm.affiliatedUnit" placeholder="请输入" clearable style="width: 200px"/>
          </Form-item>
          <Form-item label="存放位置" v-if="drop">
            <Input type="text" v-model="searchForm.parkingPosition" placeholder="请输入" clearable style="width: 200px"/>
          </Form-item>
          <Form-item label="创建时间">
            <DatePicker v-model="selectDate" type="daterange" format="yyyy-MM-dd" clearable @on-change="selectDateRange"
                        placeholder="选择起始时间" style="width: 200px"></DatePicker>
          </Form-item>
          <Form-item style="margin-left:-70px" class="br">
            <Button @click="handleSearch" type="primary" icon="ios-search">搜索</Button>
            <Button @click="handleReset">重置</Button>
            <a class="drop-down" @click="dropDown">
              {{dropDownContent}}
              <Icon :type="dropDownIcon"></Icon>
            </a>
          </Form-item>
        </Form>
      </Row>
      <Row class="operation">
        <Button @click="addTSubstances" type="primary" icon="md-add">新增</Button>

        <Dropdown @on-click="handleDropdown">
          <Button>
            更多操作
            <Icon type="md-arrow-dropdown"/>
          </Button>
          <DropdownMenu slot="list">
            <DropdownItem name="refresh"><Icon type="md-sync" />刷新</DropdownItem>
            <DropdownItem name="removeAll"> <Icon type="md-trash"/>批量删除</DropdownItem>
            <DropdownItem name="export"> <Icon type="md-arrow-down" />导出本页数据</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Button type="dashed" @click="openSearch=!openSearch">{{openSearch ? '关闭搜索' : '开启搜索'}}</Button>
        <Button type="dashed" @click="openTip=!openTip">{{openTip ? '关闭提示' : '开启提示'}}</Button>

        <div style="float: right;position: absolute;right: 10px;">
          <Poptip transfer trigger="click" placement="bottom-end" title="动态列">
            <Button icon="md-list"></Button>
            <div slot="content" style="position:relative;min-height:5vh">
              <Checkbox-group v-model="colOptions" @on-change="checkboxChange">
                <checkbox v-for="(item,i) in colSelect" :label="item" :key="item" ></checkbox>
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
            <Button type="primary" @click="handleLook(row, index)" size="small">查看</Button>
            <Dropdown :transfer=true>
              <Button size="small">
                更多操作
                <Icon  type="md-arrow-dropdown"/>
              </Button>
              <DropdownMenu slot="list">
                <DropdownItem name="edit" @click.native="handleEdit(row, index)"><Icon type="ios-create-outline" />修改</DropdownItem>
                <DropdownItem name="delete" @click.native="deleteData(row, index)"><Icon type="md-trash"></Icon>删除</DropdownItem>
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
    <updateTSubstances v-model="updateShow" :TSubstancesId="TSubstancesId" :modalTitle="title" v-on:handleSearch="handleSearch"></updateTSubstances>
    <lookTSubstances v-model="lookShow" :TSubstancesId="TSubstancesId" :modalTitle="title" v-on:handleSearch="handleSearch"></lookTSubstances>

  </div>
</template>
<script>
  import {deleteTSubstances, queryTSubstancesList} from '@/api/tSubstances/tSubstances'
  import {formartDate} from '@/api/tools/tool'
  import updateTSubstances from './updateTSubstances'
  import lookTSubstances from './lookTSubstances'

  export default {
    components: {
      updateTSubstances,
      lookTSubstances
    },
    data() {
      return {
        drop: false,
        dropDownContent: "展开",
        dropDownIcon: "ios-arrow-down",
        selectDate: null,//选择的时间
        search: '',
        data: [],
        columns: this.getTSubstancesColumns(),
        openSearch: true,//打开搜索
        openTip: true,//打开提示
        loading: true, // 表单加载状态
        selectCount: 0, // 多选计数
        selectList: [], // 多选数据
        searchForm: {
          // 搜索框对应data对象
          name: '',//名称
          specificationModel:'',//规格型号
          affiliatedUnit:'',//所属单位
          parkingPosition:'',//存放位置
          pageNumber: 1, // 当前页数
          pageSize: 10, // 页面大小
          startDate: null,//开始时间
          endDate: null,//结束时间
          sort: 'createTime', // 默认排序字段
          order: 'desc' // 默认排序方式
        },
        total: 0,
        title: '',
        TSubstancesId: '',
        updateShow: false,
        lookShow: false,
        tableHeight: 200,
        colOptions: ["物质名称", "规格型号","标准","数量","单位", "所属单位","存放位置","创建时间","操作"], //默认全选
        colSelect: ["物质名称", "规格型号","标准","数量","单位", "所属单位","存放位置","创建时间","操作"]
      }
    },
    methods: {
      //列表上方更多操作
      handleDropdown(name) {
        if (name == "refresh") {
          this.getDataList();
        } else if (name == "removeAll") {
          this.delAll();
        }else if (name == "export") {
          let excolumns = this.columns.filter(function(v){ return v.title!="操作" && v. type!= 'selection'});
          this.$refs.table.exportCsv({
            filename: '本页数据',
            columns: excolumns,
            data:this.data
          });
        }
      },
      //列表里的更多操作
      handleTabelDropdown(name, row, index) {
        if (name == "Edit") {
          this.handleEdit(row, index);
        } else if (name == "removeAll") {
          this.delAll();
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
      addTSubstances() {
        this.title = '新增';
        this.updateShow = true
        this.TSubstancesId = '';
      },
      //编辑
      handleEdit(row, index) {
        this.title = '编辑';
        this.TSubstancesId = row.id.toString();
        this.updateShow = true;
      },
      //查看
      handleLook(row, index) {
        this.title = '查看';
        this.TSubstancesId = row.id.toString();
        this.lookShow = true;
      },
      //分页查询
      getDataList() {
        this.loading = true;
        this.searchForm.id = null;
        queryTSubstancesList(this.searchForm).then(res => {
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
        deleteTSubstances({ids: ids}).then(res => {
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
        this.searchForm.name = '';
        this.selectDate = null;
        this.searchForm.startDate = null;
        this.searchForm.endDate = null;
        this.searchForm.specificationModel = '';
        this.searchForm.affiliatedUnit = '';
        this.searchForm.parkingPosition = '';
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
      getTSubstancesColumns() {
        return [
          {
            type: 'selection',
            width: 60,
            align: 'center',
          },
          {
            title: '物质名称',
            align: 'center',
            key: 'name',
            tooltip:true,
            sortable: false

          },
          {
            title: '规格型号',
            align: 'center',
            tooltip:true,
            key: 'specificationModel',
            sortable: false,

          },
          {
            title: '标准',
            align: 'center',
            key: 'standard',
            tooltip:true,
            sortable: false,

          },
          {
            title: '数量',
            align: 'center',
            key: 'number',
            tooltip:true,
            sortable: false,

          },
          {
            title: '单位',
            align: 'center',
            key: 'unit',
            tooltip:true,
            sortable: false,

          },
          {
            title: '所属单位',
            align: 'center',
            key: 'affiliatedUnit',
            tooltip:true,
            sortable: false,

          },
          {
            title: '存放位置',
            align: 'center',
            key: 'parkingPosition',
            tooltip:true,
            sortable: false,

          },
          // {
          //   title: '地图位置',
          //   align: 'center',
          //   key: 'mapLocation',
          //   width: 240,
          //   sortable: false
          // },
          {
            title: '创建时间',
            key: 'createTime',
            sortable: true,
            align: 'center',
            tooltip:true,
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
            width: 200,
            fixed: "right",
            slot: 'action'
          }
        ];
      },
      //动态列实现
      checkboxChange:function (data) {
        var columnss =  this.getTSubstancesColumns();
        this.columns= columnss.filter(function(v){ return data.indexOf(v.title) > -1 || v. type== 'selection'})
      },
    },
    mounted() {
      this.getDataList();
      //this.tableHeight = window.innerHeight - this.$refs.tSubstancesTable.$el.offsetTop - 270
    }

  }
</script>
<style scoped="less">
  .operation {
    margin-bottom: 10px;
  }
</style>
