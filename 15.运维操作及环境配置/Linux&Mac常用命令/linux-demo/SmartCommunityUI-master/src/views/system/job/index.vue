<style lang="less">
  .jobList {
    .ivu-form .ivu-form-item-label {
      text-align: left;

    }
    .ivu-form-item-content > .ivu-btn {
      margin-right: 10px !important;
    }
    .ivu-form-item-content{
      margin-left: 0px !important;
      float: left;
    }
  }


</style>
<template>
  <div class=" jobList" >
    <Card>
      <Row v-show="openSearch" @keydown.enter.native="handleSearch">
        <Form ref="searchForm" :model="searchForm" inline :label-width="70" onSubmit="return false">
          <Form-item label="岗位名称">
            <Input type="text" v-model="searchForm.name" placeholder="请输入" clearable style="width: 200px"/>
          </Form-item>
          <Form-item label="创建时间">
            <DatePicker v-model="selectDate" type="daterange" format="yyyy-MM-dd" clearable @on-change="selectDateRange"
                        placeholder="选择起始时间" style="width: 200px"></DatePicker>
          </Form-item>
          <FormItem label="岗位状态" prop="enabled" v-if="drop" >
            <Select   v-model="searchForm.enabled" placeholder="请选择" clearable  style=" width: 200px;">
              <Option v-for="(item, i) in enabledRadio" :key="i" :value="item.value">{{item.label}}</Option>
            </Select>
          </FormItem>
          <Form-item style="margin-left:0px" class="br">
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
        <Button @click="addJob" type="primary" icon="md-add">新增</Button>
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
                <checkbox v-for="(item,i) in colSelect" :label="item" :key="item"></checkbox>
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
    <updateJob v-model="updateShow" :JobId="JobId" :modalTitle="title" v-on:handleSearch="handleSearch"></updateJob>
  </div>
</template>
<script>
  import {deleteByIds,edit, queryJobList} from '@/api/system/job'
  import {formartDate} from '@/api/tools/tool'
  import { getDictDataByType } from '@/api/index'
  import updateJob from './updateJob'

  export default {
    components: {
      updateJob
    },
    data() {
      return {
        drop: false,
        dropDownContent: "展开",
        dropDownIcon: "ios-arrow-down",
        search: '',
        data: [],
        columns: this.getJobColumns(),
        openSearch: true,//打开搜索
        openTip: true,//打开提示
        loading: true, // 表单加载状态
        selectCount: 0, // 多选计数
        selectList: [], // 多选数据
        selectDate: null,
        searchForm: {
          // 搜索框对应data对象
          pageNumber: 1, // 当前页数
          pageSize: 10, // 页面大小
          startDate: null,//开始时间
          endDate: null,//结束时间
          sort: 'createTime', // 默认排序字段
          order: 'desc' ,//默认排序方式
          enabled:null,
          name:null
        },
        total: 0,
        title: '',
        JobId: '',
        updateShow: false,
        tableHeight: 200,
        enabledRadio: [],
        colOptions: ["名称", "状态", "排序", "所属部门", "操作"],
        colSelect: ["名称", "状态", "排序", "所属部门", "操作"],
      }
    },
    methods: {
      //获取岗位状态
      getEnabledRadio(){
        getDictDataByType('job_status').then(res => {
          if (res && res.success) {
            this.enabledRadio = res.data;
          }
        });
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
      addJob() {
        this.title = '新增';
        this.updateShow = true
        this.JobId = '';
      },
      //编辑
      handleEdit(row, index) {
        this.title = '编辑';
        this.JobId = row.id.toString();
        this.updateShow = true;
      },
      //查看
      handleLook(row, index) {
        this.title = '查看';
        this.JobId = row.id.toString();
        this.updateShow = true;
      },
      //分页查询
      getDataList() {
        this.loading = true;
        this.searchForm.id = null;
        queryJobList(this.searchForm).then(res => {
          this.loading = false;
          if (res) {

            this.data = res.content;
            this.total = res.totalElements;
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
            this.loading = true;
            var ids = [];
            ids.push(row.id);
            this.patchdeleteData(ids);
          },
          onCancel: () => {
            this.$Message.info('取消了当前的操作行为！');
            this.loading = false;
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
            this.loading = false;
          }
        });
      },
      //删除（后台）
      patchdeleteData(ids) {
        if (ids == undefined || ids == null || ids.length == 0) {
          this.$Message.error('没有选择的数据');
          return;
        }
        deleteByIds({ids: ids}).then(res => {
          this.loading = false;
          this.$Modal.remove();
          if (res!=null) {
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
        this.enabled = null;
        this.name = null;
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
      getJobColumns() {
        return [
          {
            type: 'selection',
            width: 60,
            align: 'center',
          },
          {
            title: '名称',
            align: 'center',
            key: 'name',
            sortable: false,
            tooltip:true
          },
          {
            title: '所属部门',
            align: 'center',
            key: 'deptId',
            width: 250,
            sortable: false,
            render: (h, params) => {
              let depName = "";
              if(params.row.deptSuperiorName){
                depName = params.row.deptSuperiorName +"/"+ params.row.dept.name;
              }
              else{
                depName =  params.row.dept.name;
              }
              return h('div', [
                h('span', {
                  style: {
                    display: 'inline-block',
                    width: '100%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  },
                  domProps: {
                    title: depName
                  }
                },  depName)
              ])
            }
          },
          {
            title: '排序',
            align: 'center',
            key: 'sort',
            tooltip:true,
            sortable: false
          },
          {
            title: '状态',
            align: 'center',
            key: 'enabled',
            sortable: false,
            render:(h, params) => {
              return h('div', [
                h('i-switch', { //数据库1是已处理，0是未处理
                  props: {
                    type: 'primary',
                    value: params.row.enabled  //控制开关的打开或关闭状态，官网文档属性是value
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    'on-change': (value) => {//触发事件是on-change,用双引号括起来，
                      //参数value是回调值，并没有使用到
                      this.changeEnabled(params) //params.index是拿到table的行序列，可以取到对应的表格值
                    }
                  }
                }, )
              ]);
            }
          },

          {
            title: '操作',
            align: 'center',
            slot: 'action',
            width: 200,
          }
        ];
      },
      //动态列实现
      checkboxChange: function (data) {
        var columnss = this.getJobColumns();
        this.columns = columnss.filter(function (v) {
          return data.indexOf(v.title) > -1 || v.type == 'selection'
        })
      },
      //title提示
      initTableColumn(columnss) {
        //  title提示
        for (let i = 0; i < columnss.length; i++) {
          if (columnss[i].type != 'selection' && columnss[i].title != '操作' && columnss[i].title.indexOf("时间") == -1) {
            if (!columnss[i].render) {
              this.$set(columnss[i], 'render', (h, params) => {
                return h('div', [
                  h('span', {
                    style: {
                      display: 'inline-block',
                      width: '100%',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    },
                    domProps: {
                      title: params.row[params.column.key]
                    }
                  }, params.row[params.column.key])
                ])

              });
            }
            this.$set(columnss[i], 'renderHeader', (h, params) => {
              return h('div', [
                h('span', {
                  style: {
                    display: 'inline-block',
                    width: '100%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    marginBottom: '-6px'
                  },
                  domProps: {
                    title: params.column.title
                  }
                }, params.column.title)
              ])

            })
          }

        }
      },
      // 改变状态
      changeEnabled(params) {
        let label = "";
        params.row.enabled = !params.row.enabled;
        for(var index in this.enabledRadio){
          let item = this.enabledRadio[index];
          if(item.value == params.row.enabled+""){
            label = item.label;
          }
        }
        this.$Modal.confirm({
          title: '提示',
          content: '此操作将 "' + label + '" ' + params.row.name + '岗位, 是否继续？',
          onOk: () => {
            this.loading = true;
            edit(params.row).then(() => {
              this.loading = false;
              this.$Message.success('操作成功');
            }).catch(err => {
              this.loading = false;
              this.$Message.error('操作失败');
              params.row.enabled = !params.row.enabled;
            })
          },
          onCancel: () => {
            params.row.enabled = !params.row.enabled;
          }
        });
      }
    },
    mounted() {
      this.getDataList();
      this.getEnabledRadio();
      //this.tableHeight = window.innerHeight - this.$refs.jobTable.$el.offsetTop - 270
    }
  }
</script>
<style scoped="less">
  .operation {
    margin-bottom: 10px;
  }
</style>
