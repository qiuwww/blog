<style lang="less">
  .tPointIconList {
    .ivu-form .ivu-form-item-label {
      text-align: left;
    }

    .ivu-form-item-content > .ivu-btn {
      margin-right: 10px !important;
    }
  }

</style>
<template>
  <div class="search tPointIconList">
    <Card>
      <Row v-show="openSearch" @keydown.enter.native="handleSearch">
        <Form ref="searchForm" :model="searchForm" inline :label-width="70">
          <FormItem label="图片名称" prop="name">
            <Input  type="text" :maxlength=50 v-model="searchForm.name"
                    placeholder="请输入图片名称"/>
          </FormItem>
          <Form-item label="创建时间">
            <DatePicker v-model="selectDate" type="daterange" format="yyyy-MM-dd" clearable @on-change="selectDateRange"
                        placeholder="选择起始时间" style="width: 200px"></DatePicker>
          </Form-item>
          <Form-item style="margin-left:-35px" class="br">
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
        <Button @click="addTPointIcon" type="primary" icon="md-add">新增</Button>
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
    <updateTPointIcon v-model="updateShow" :TPointIconId="TPointIconId" :modalTitle="title"
                      v-on:handleSearch="getDataList"></updateTPointIcon>
  </div>
</template>
<script>
  import {deleteTPointIcon, queryTPointIconList,updateTPointIcon as update} from '@/api/zhxc/tPointIcon/tPointIcon'
  import {formartDate} from '@/api/tools/tool'
  import updateTPointIcon from './updateTPointIcon'

  export default {
    components: {
      updateTPointIcon
    },
    data() {
      return {
        drop: false,
        dropDownContent: "展开",
        dropDownIcon: "ios-arrow-down",
        search: '',
        data: [],
        columns: this.getTPointIconColumns(),
        openSearch: true,//打开搜索
        openTip: true,//打开提示
        loading: true, // 表单加载状态
        selectCount: 0, // 多选计数
        selectList: [], // 多选数据
        searchForm: {
          // 搜索框对应data对象
          pageNumber: 1, // 当前页数
          type:'1',
          pageSize: 10, // 页面大小
          startDate: null,//开始时间
          endDate: null,//结束时间
          sort: 'createTime', // 默认排序字段
          order: 'desc' // 默认排序方式
        },
        total: 0,
        title: '',
        TPointIconId: '',
        updateShow: false,
        tableHeight: 200,
        colOptions: ["icon地址", "备注", "是否显示", "创建时间", "操作"],
        colSelect: ["icon地址", "备注", "是否显示", "创建时间", "操作"],
        csvData: [],//导出用到的data
        selectDate:null,//选中的时间
      }
    },
    methods: {
      //列表上方更多操作
      handleDropdown(name) {
        if (name == "refresh") {
          this.getDataList();
        } else if (name == "removeAll") {
          this.delAll();
        } else if (name == "export") {
          let exColumns = this.columns.filter(function (v) {
            return v.title != "操作" && v.type != 'selection'
          });
          this.$refs.table.exportCsv({
            filename: '本页数据',
            columns: exColumns,
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
      addTPointIcon() {
        this.title = '新增';
        this.updateShow = true
        this.TPointIconId = '';
      },
      //编辑
      handleEdit(row, index) {
        this.title = '编辑';
        this.TPointIconId = row.id.toString();
        this.updateShow = true;
      },
      //查看
      handleLook(row, index) {
        this.title = '查看';
        this.TPointIconId = row.id.toString();
        this.updateShow = true;
      },
      //分页查询
      getDataList() {
        this.loading = true;
        this.selectCount = 0;
        this.searchForm.id = null;
        queryTPointIconList(this.searchForm).then(res => {
          if (res && res.success) {
            this.loading = false;
            this.data = res.data.records;
            this.total = res.data.total;
            this.csvData = JSON.parse(JSON.stringify(res.data.records));
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
        deleteTPointIcon({ids: ids}).then(res => {
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
      displayState(row) {
        if (row.isShow == "0") {
          row.isShow = "1"
        } else {
          row.isShow = "0"
        }
        update(row).then(res => {
          this.loading = false;
          if (res) {
            if (res && res.code == 200) {
              this.$Message.success('保存成功');
            } else {
              this.$Message.error(res.msg);
            }
          } else {
            this.$Message.error('保存失败');
          }
        }).catch(err => {
          this.loading = false;
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
      getTPointIconColumns() {
        return [
          {
            type: 'selection',
            width: 60,
            align: 'center',
          },
          {
            title: '图片名称',
            align: 'center',
            key: 'name',
            tooltip: true,
            sortable: false
          },
          {
            title: 'icon地址',
            align: 'center',
            key: 'icon',
            tooltip: true,
            sortable: false
          },
          {
            title: '是否显示',
            align: 'center',
            key: 'isShow',
            sortable: false,
            render: (h, params) => {
              // let checked = params.row.checked && params.row.checked != "1" ? '隐藏' : '显示';
              // let datad = this.csvData.filter(item => item.id == params.row.id);
              // datad[0].checked = checked;
              return h('div', [
                h('i-switch', { //数据库1是显示，0是不显示
                  props: {
                    type: 'primary',
                    value: params.row.isShow,  //控制开关的打开或关闭状态，官网文档属性是value
                    trueValue: '1',
                    falseValue: '0',
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
            title: '备注',
            align: 'center',
            key: 'remarks',
            sortable: false
          },

          {
            title: '创建时间',
            key: 'createTime',
            sortable: true,
            align: 'center',
            width: 180,
            render: (h, params) => {
              let newTime = formartDate(params.row.createTime, 'yyyy-MM-dd HH:mm:ss');
              let datad = this.csvData.filter(item => item.id == params.row.id);
              datad[0].createTime = '="' + newTime + '"';
              return h("Tooltip", {
                props: {
                  content: newTime,
                  placement: 'bottom',
                  transfer: true
                }
              }, newTime)
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
        var columnss = this.getTSubstancesColumns();
        this.columns = columnss.filter(function (v) {
          return data.indexOf(v.title) > -1 || v.type == 'selection'
        })
      }
    },
    mounted() {
      this.getDataList();
      //this.tableHeight = window.innerHeight - this.$refs.tPointIconTable.$el.offsetTop - 270
    }
  }
</script>
<style scoped="less">
  .operation {
    margin-bottom: 10px;
  }
</style>
