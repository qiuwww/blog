<style lang="less">
  .quartzLogList {
    .ivu-form-item-content > .ivu-btn {
      margin-right: 10px !important;
    }
  }


</style>
<template>
  <Modal v-model="show" title="任务日志" :mask-closable="false" fullscreen >
    <div class="search quartzLogList" >
      <Card>
        <Row v-show="openSearch" @keydown.enter.native="handleSearch">
          <Form ref="searchForm" :model="searchForm" inline :label-width="70">
            <Form-item label="任务名称">
              <Input type="text" v-model="searchForm.baenName" placeholder="请输入" clearable style="width: 200px"/>
            </Form-item>
            <Form-item label="状态" v-if="drop">
              <Input type="text" v-model="searchForm.isSuccess" placeholder="请输入" clearable style="width: 200px"/>
            </Form-item>
            <Form-item label="创建时间" v-if="drop">
              <DatePicker v-model="selectDate" type="daterange" format="yyyy-MM-dd" clearable
                          @on-change="selectDateRange"
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
          <Button @click="getDataList" type="dashed" icon="md-sync">刷新</Button>
          <Button @click="exportData" type="dashed" icon="md-arrow-down">导出</Button>
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
          <Table :loading="loading" border :columns="columns" sortable="custom" :data="data"
                 @on-sort-change="changeSort" @on-selection-change="showSelect" ref="table">
          </Table>
        </Row>
        <Row type="flex" justify="end" class="page">
          <Page :current="searchForm.pageNumber" :total="total" :page-size="searchForm.pageSize" @on-change="changePage"
                @on-page-size-change="changePageSize" :page-size-opts="[10,20,50,100]" size="small" show-total show-elevator
                show-sizer></Page>
        </Row>
      </Card>
    </div>
  </Modal>
</template>
<script>
  import {queryJobsLogList,exportJobsLogExcel} from '@/api/system/timing'
  import {formartDate} from '@/api/tools/tool'

  export default {
    name:"jobsLog",
    props: {
      value: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        screenWidth: document.body.clientWidth-200,     // 屏幕宽
        screeHeight: document.body.clientHeight-200,    // 屏幕高
        show:this.value,
        drop: false,
        dropDownContent: "展开",
        dropDownIcon: "ios-arrow-down",
        search: '',
        data: [],
        columns: this.getQuartzLogColumns(),
        openSearch: true,//打开搜索
        openTip: true,//打开提示
        loading: true, // 表单加载状态
        selectCount: 0, // 多选计数
        selectList: [], // 多选数据
        searchForm: {
          // 搜索框对应data对象
          baenName: '',
          isSuccess: '',
          pageNumber: 1, // 当前页数
          pageSize: 10, // 页面大小
          startDate: null,//开始时间
          endDate: null,//结束时间
          sort: 'createTime', // 默认排序字段
          order: 'desc' // 默认排序方式
        },
        total: 0,
        title: '',
        QuartzLogId: '',
        updateShow: false,
        tableHeight: 200,
        selectDate:null,
        colOptions: ["方法名称", "Bean名称", "cron表达式", "异常详情", "状态", "任务名称", "参数", "耗时（毫秒）", "创建时间"],
        colSelect: ["方法名称", "Bean名称",  "cron表达式", "异常详情", "状态", "任务名称", "参数", "耗时（毫秒）", "创建时间"],
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

      //分页查询
      getDataList() {
        this.loading = true;
        this.searchForm.id = null;
        queryJobsLogList(this.searchForm).then(res => {
          if (res) {
            this.loading = false;
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
        deleteQuartzLog({ids: ids}).then(res => {
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
        this.searchForm.baenName = '',
          this.searchForm.isSuccess = '',
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
      getQuartzLogColumns() {
        return [
          {
            type: 'selection',
            width: 60,
            align: 'center',
          },
          {
            title: '任务名称',
            align: 'center',
            key: 'jobName',
            tooltip:true,
            sortable: false
          },
          {
            title: 'Bean名称',
            align: 'center',
            key: 'baenName',
            tooltip:true,
            sortable: false
          },

          {
            title: 'cron表达式',
            align: 'center',
            key: 'cronExpression',
            tooltip:true,
            sortable: false
          },
          {
            title: '异常详情',
            align: 'center',
            key: 'exceptionDetail',
            tooltip:true,
            sortable: false
          },
          {
            title: '状态',
            align: 'center',
            key: 'isSuccess',
            tooltip:true,
            sortable: false,
            render: (h, params) => {
              if (params.row.isSuccess) {
                return h("div", [
                  h("Badge", {
                    props: {
                      status: "success",
                      text: "成功"
                    }
                  })
                ]);
              } else {
                return h("div", [
                  h("Badge", {
                    props: {
                      status: "error",
                      text: "失败"
                    }
                  })
                ]);
              }
            },
          },

          {
            title: '方法名称',
            align: 'center',
            key: 'methodName',
            tooltip:true,

            sortable: false
          },
          {
            title: '参数',
            align: 'center',
            key: 'params',
            tooltip:true,
            sortable: false
          },
          {
            title: '耗时（毫秒）',
            align: 'center',
            key: 'time',
            tooltip:true,
            sortable: false,
            render: (h, params) => {
              if (params.row.time <= 300) {
                return  h('Tag',{
                  props: {
                    color:"success"
                  },

                },params.row.time + "ms")

              } else if (params.row.time <= 1000) {
                return  h('Tag',{
                  props: {
                    color:"warning"
                  },

                },params.row.time + "ms")
              } else {
                return  h('Tag',{
                  props: {
                    color:"error"
                  },
                },params.row.time + "ms")
              }
            }
          },
          {
            title: '创建时间',
            key: 'createTime',
            sortable: true,
            tooltip:true,
            align: 'center',
            render: (h, params) => {
              return h('div',
                formartDate(params.row.createTime, 'yyyy-MM-dd HH:mm:ss')
              )
            }
          },
        ]
      },
      //动态列实现
      checkboxChange: function (data) {
        var columnss = this.getQuartzLogColumns();
        this.columns = columnss.filter(function (v) {
          return data.indexOf(v.title) > -1 || v.type == 'selection'
        })
      },
      closeModal(val) {
        this.$emit('input', val);
      },

      exportData() {
        var _this = this;
        exportJobsLogExcel(_this.searchForm).then(res => {
          const content = res;
          const blob = new Blob([content], { type: 'application/ms-excel' });
          const fileName = '定时任务日志.xlsx';
          if ('download' in document.createElement('a')) { // 非IE下载
            const elink = document.createElement('a');
            elink.download = fileName;
            elink.style.display = 'none';
            elink.href = URL.createObjectURL(blob);
            document.body.appendChild(elink);
            elink.click();
            URL.revokeObjectURL(elink.href); // 释放URL 对象
            document.body.removeChild(elink);
          } else { // IE10+下载
            navigator.msSaveBlob(blob, fileName);
          }
          _this.isExportShow = false;
        }).catch(function(error) {
          _this.$Message.error('数据导出失败');
          _this.isExportShow = false;
        });
      }
    },
    watch: {
      value(val) {
        this.show = val;
      },
      show(val) {
        if (val) {
          this.$refs['searchForm'].resetFields();
          this.getDataList();
        } else {
          this.closeModal(val);
        }
      }
    }
  }
</script>
<style scoped="less">
  .operation {
    margin-bottom: 10px;
  }
</style>
