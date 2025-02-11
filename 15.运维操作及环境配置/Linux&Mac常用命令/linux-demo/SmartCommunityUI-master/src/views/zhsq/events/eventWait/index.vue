<template>
  <el-row type="flex" class="app-warp eventQuery" justify="center">
    <el-col :span="24">
      <el-row style="margin-top: 20px">
        <Form ref="searchForm" inline :label-width="110" onSubmit="return false">

          <Form-item label="创建时间" :label-width="110">
            <el-date-picker v-model="createTime" size="small" align="right" value-format="yyyy-MM-dd" type="date"
                            :picker-options="pickerOptions" placeholder="选择日期" @change="handleUpdate"
                            style="width: 200px"/>
          </Form-item>
          <Form-item label="所属辖区">
            <!--            <Grid size="small" @grid="handleGrid"/>-->
            <TreeSelect v-model="gridId"  :data="gridPriority" v-width="200" @on-change="onGridChange" v-if="gridIdShow"/>
          </Form-item>
          <Form-item label="事件来源" v-show="drop">
            <Select v-model="originSelect" placeholder="请选择事件来源" clearable style="width: 200px"
                    @on-change="handleUpdate">
              <Option v-for="(item, i) in dataFromPriority" :key="item.id" :value="item.value">{{item.label}}
              </Option>
            </Select>
          </Form-item>
          <Form-item label="事件类型" v-show="drop">
            <TreeSelect v-model="eventType" v-bind:disabled="disabled" :data="eventsTypeList" v-width="200"/>
          </Form-item>

          <Form-item :label-width="10">
            <Search class="inputstyle" size="small" :query-str="queryStr" :placeholder="'请输入标题、登记编号'"
                    @update="handleUpdate"/>
          </Form-item>

          <Form-item :label-width="40">
            <Button @click="handleReset">重置查询</Button>

            <a class="drop-down" @click="dropDown">
              {{ dropDownContent }}
              <Icon :type="dropDownIcon"></Icon>
            </a>
          </Form-item>

        </Form>

      </el-row>
      <Row>
        <Table
          ref="table"
          :loading="tableLoading"
          stripe :columns="columns"
          sortable="custom"
          :data="tableData"
        >
          <template slot="action" slot-scope="{ row, index }">
            <Row type="flex" justify="center" align="middle" :gutter="2">
              <Col span="14" justify="right">
                <Tooltip content="查看详情" transfer placement="top">
                  <Button class="btnPrimary" icon="md-eye" @click="handleDetail(row)"></Button>
                </Tooltip>
              </Col>
            </Row>
          </template>
        </Table>
      </Row>
      <Row type="flex" justify="center"  class="page">
        <Page transfer
              :current="pageNum"
              :total="pageTotal"
              :page-size="pageSize"
              :page-size-opts="[10,20,50,100]"
              size="small"
              show-total
              show-elevator
              show-sizer
              @on-change="changePage"
              @on-page-size-change="changePageSize"
        />
      </Row>
    </el-col>
    <eventDetail v-model="eventShow" :is-event-wait="isEventWait" :isEventSelf="true" :proc-inst-id="procInstId"
                 :t-zhsq-task-list-id="tEventListId" v-on:handleSearch="handleBackDetail"
                 modal-title="事件详情"></eventDetail>
    <editandAddEvent v-model="updateShow" :TZhsqEventListId="TZhsqEventListId" :modalTitle="title"
                     v-on:handleSearch="handleSearch"></editandAddEvent>
  </el-row>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  import Search from '@/components/Search'
  import Pagination from '@/components/Pagination'
  import {
    getAllLoad,
    deleteEvent,
    getEventsTypeList,
    addEvents,
    queryEventsTypeTreeNotPage
  } from '@/api/events'
  import Grid from '@/components/Ascription/gridSelect'
  import GridMatch from '@/components/Ascription/gridSelectMatch'
  import taskDetail from '@/views/zhsq/tZhsqEventList/taskDetail'
  import editandAddEvent from '../eventQuery/editandAddEvent'
  import eventDetail from '../eventQuery/eventDetail'
  import {transData} from '@/api/tools/tool'
  import {queryAllList, queryAllGridsTree} from '@/api/zhsq/basicGrids/basicGrids'
  import {getDictDataByType} from '@/api/index';
  import store from '@/store'

  export default {
    data() {
      return {
        gridPriority: [],
        gridValuePriority:[],
        disabled: false,
        dropDownContent: "展开",
        dropDownIcon: "ios-arrow-down",
        showSearch: false,
        isEventWait: false,
        drop: false,
        pageTotal: 0,
        createTime: '',
        eventType: '',
        eventsTypeList: [],
        originSelect: '',
        tableData: [],
        gridId: '',
        svg: true,
        pickerOptions: {
          disabledDate: (time) => {
            return this.dealDisabledDate(time);
          }
        },
        eventShow: false,
        tEventListId: "",
        procInstId: "",
        tableLoading: false,
        title: '',
        TZhsqEventListId: '',
        updateShow: false,
        //用户
        nowUserId: '',
        nowUserName: '',
        pageSize: 0,
        pageNum: 10,
        queryStr: "",
        gridIdShow:true,
        dataFromPriority:[],//事件来源
        columns: this.getEventColumns(),
      }
    },
    computed: {
      ...mapGetters(['permitIds', 'loading'])
    },
    created() {
      this.handleGetEventsType();
    },
    methods: {
      //新增
      addTBuildingArchives() {
        this.title = '事件新增';
        this.updateShow = true;
        this.TZhsqEventListId = '';
      },
      //编辑
      handleEdit(row) {
        this.title = '事件编辑';
        this.updateShow = true;
        this.TZhsqEventListId = row.id.toString();
      },
      //查询
      handleSearch() {
        // 重新加载数据
        this.handleReset();
      },
      handleBackDetail() {
        this.tableLoading = true;
        this.pageNum = 1;
        this.pageSize = 10;
        this.queryStr = "";
        // 重新加载数据
        setTimeout(() => {
          this.handleReset();
        }, 400)
      },
      //重置
      handleReset() {
        this.pageNum = 1;
        this.pageSize = 10;
        this.queryStr = "";
        this.originSelect = "";
        this.eventType = "";
        this.createTime = '';
        this.gridId = "";
        this.gridIdShow = false;
        setTimeout(() => {
          this.gridIdShow = true;
        }, 100)
        this.tableLoading = true;
        // 重新加载数据
        this.handleGetAllEvents();
      },
      //展开 收起
      dropDown() {
        if (this.drop) {
          this.dropDownContent = "展开";
          this.dropDownIcon = "ios-arrow-down";
          this.showSearch = true;
        } else {
          this.dropDownContent = "收起";
          this.dropDownIcon = "ios-arrow-up";
          this.showSearch = false;
        }
        this.drop = !this.drop;
      },
      dealDisabledDate(time) {
        var times = Date.now()
        return time.getTime() > times;
      },
      handleSvgEnter() {
        this.svg = true
      },
      handleSvgLeave() {
        this.svg = false
      },
      //辖区查询
      getJurisdiction() {
        let _this = this;
        queryAllGridsTree({}).then(res => {
          if (res && res.success) {
            if (res.data) {
              _this.gridValuePriority = JSON.parse(JSON.stringify(res.data))
              _this.gridPriority = transData(res.data, 'id', 'pid', 'children');
            }
          }
        }).catch(err => {
          this.tableLoading = false
        });
      },
      //辖区选择
      onGridChange(e) {
        if (e) {
          this.gridId = e;
          let grid = this.gridValuePriority.filter(item => item.id == e)
          if (grid == null || grid == undefined || grid.length <= 0) {
            this.$Message.error('选择辖区失败，请联系管理员');
            return
          }
          //没有选择网格
          if (grid[0].lel != 2 && grid[0].lel != '2') {
            this.$Message.error('请选择网格！！！');
            this.gridId = "";
            this.gridIdShow = false;
            setTimeout(() => {
              this.gridIdShow = true;
            }, 100)
            return
          }
        }
      },
      handleGrid(val) {
        this.gridId = val
        this.handleUpdate()
      },
      /**
       * 事件状态匹配
       *  @param status
       * @returns {string}
       */
      eventStatus(status) {
        switch (status) {
          case 0:
            return '待审核'
            break
          case 1:
            return '未完成'
            break
          case 2:
            return '已完成'
            break
        }
      },
      /**
       * 事件来源匹配
       * @param status
       * @returns {string}
       */
      eventDataFrom(status) {
        if (status == null || status == undefined || status.toString().trim().length <= 0
          || this.dataFromPriority == null || this.dataFromPriority == undefined || this.dataFromPriority.length == 0) {
          this.$Message.error('事件来源匹配异常，请联系管理员！！！');
          return "暂无";
        }
        let dataFrom = this.dataFromPriority.filter(item => item.value+"" == status+"");
        if (dataFrom != null && dataFrom != undefined && dataFrom.length > 0) {
          return dataFrom[0].label;
        }
        return "暂无";
      },
      async handleGetEventsType() {
        queryEventsTypeTreeNotPage({
        }).then(res => {
          if (res && res.success) {
            if (res.data) {
              this.eventsTypeList = this.getTreeData(res.data);
            }
          }
        }).catch(err => {
          this.tableLoading = false
        });
      },
      handleGetAllEvents() {
        this.tableLoading = true;
        getAllLoad({
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          queryStr: this.queryStr,
          dataFrom: this.originSelect,
          eventsTypeId: this.eventType,
          createTime: this.createTime,
          gridId: this.gridId,
          status:1,
          executor: this.nowUserId,//当前用户负责的 待审批事件
        }).then(res => {
          this.tableLoading = false
          this.tableData = res.data.records
          this.pageTotal = res.data.total
        });
      },
      //生成部门
      getTreeData(data) {
        if (data) {
          for (let i in data) {
            if (data[i].label == null || !data[i].label) {
              data[i].title = data[i].name;
            }
            if (data[i].label != null && data[i].label) {
              data[i].title = data[i].label;
            }
            data[i].value = data[i].id;
            data[i].expand = true;
            if (data[i].children) {
              data[i].children = this.getTreeData(data[i].children);
            }
          }
        }
        return data;
      },
      handleUpdate() {
        this.handleGetAllEvents()
      },
      handleDelete(id) {
        this.$confirm('事件删除之后，所有相关数据都将不可查询')
          .then(async _ => {
            const data = await deleteEvent({
              gridEventsId: id
            })
            if (data && data.code == 200) {
              this.$notify({
                title: data.msg,
                type: 'success'
              })
            } else {
              this.$notify({
                title: data.msg,
                type: 'fail'
              })
            }
            this.handleUpdate()
          })
          .catch(e => {
          })
      },
      handleDetail(row) {
        this.eventShow = true;
        this.isEventWait = true;
        this.tEventListId = row.id.toString();
        if (row.procInstId) {
          this.procInstId = row.procInstId.toString();
        }
      },
      //获取用户信息
      getUserInfo() {
        store.dispatch('GetInfo').then((res) => {
          // console.log('获取用户信息');
          // console.log(res);
          this.nowUserName = res.nickName;
          this.nowUserId = res.id;
        })
      },
      // 改变页码
      changePage(v) {
        this.pageNum = v
        this.handleGetAllEvents()
      },
      // 改变每页显示数据的条数
      changePageSize(v) {
        this.pageSize = v
        this.handleGetAllEvents()
      },
      // 改变排序方式
      changeSort(e) {

        this.handleGetAllEvents()
      },
      //清空选择
      clearSelectAll() {
        this.$refs.table.selectAll(false);
      },
      //获取列表字段
      getEventColumns() {
        return [
          {
            title: '事件编号',
            align: 'center',
            key: 'code',
            tooltip: true,
            sortable: false,
            minWidth: 100
          },
          {
            title: '事件类型',
            align: 'center',
            key: 'eventsTypeName',
            tooltip: true,
            sortable: false,
            minWidth: 100
          },
          {
            title: '事件内容',
            align: 'center',
            key: 'title',
            tooltip: true,
            sortable: false,
            minWidth: 100
          },
          {
            title: '事件来源',
            align: 'center',
            key: 'dataFrom',
            sortable: false,
            tooltip: true,
            minWidth: 100,
            render: (h, param) => {
              if (param.row.dataFrom) {
                let tempArr =this.eventDataFrom(param.row.dataFrom);
                if (tempArr && tempArr.length > 0) {
                  return h('Tooltip', {
                    props: {
                      content: tempArr,
                      placement: 'bottom',
                      transfer: true
                    }
                  }, tempArr)
                } else {
                  // return h('span', '暂无');
                  return h('Tooltip', {
                    props: {
                      content: '暂无',
                      placement: 'bottom',
                      transfer: true
                    }
                  }, '暂无')
                }
              } else {
                // return h('span', '暂无');
                return h('Tooltip', {
                  props: {
                    content: '暂无',
                    placement: 'bottom',
                    transfer: true
                  }
                }, '暂无')
              }
            }
          },
          {
            title: '处理状态',
            align: 'center',
            key: 'status',
            sortable: false,
            tooltip: true,
            minWidth: 100,
            render: (h, param) => {
              if (param.row.status) {
                let tempArr =this.eventStatus(param.row.status);
                if (tempArr && tempArr.length > 0) {
                  return h('Tooltip', {
                    props: {
                      content: tempArr,
                      placement: 'bottom',
                      transfer: true
                    }
                  }, tempArr)
                } else {
                  // return h('span', '暂无');
                  return h('Tooltip', {
                    props: {
                      content: '暂无',
                      placement: 'bottom',
                      transfer: true
                    }
                  }, '暂无')
                }
              } else {
                // return h('span', '暂无');
                return h('Tooltip', {
                  props: {
                    content: '暂无',
                    placement: 'bottom',
                    transfer: true
                  }
                }, '暂无')
              }
            }
          },
          {
            title: '所属辖区',
            align: 'center',
            key: 'gridName',
            sortable: false,
            tooltip: true,
            minWidth: 100
          },

          {
            title: '创建时间',
            key: 'createTime',
            sortable: false,
            align: 'center',
            minWidth: 180,
            tooltip: true,
          },
          {
            title: '操作',
            align: 'center',
            slot: 'action',
            width: 240,
          }
        ]
      },
    },
    components: {
      Search,
      Pagination,
      Grid,
      GridMatch,
      taskDetail,
      editandAddEvent,
      eventDetail
    },
    created() {
      //获取用户信息
      this.getUserInfo();
    },
    mounted() {
      this.handleGetEventsType();
      //查询分页数据
      this.tableLoading = true;
      setTimeout(() => {
        this.handleReset();
      }, 800)
      this.getJurisdiction();

      //事件来源 数据字典加载数据
      getDictDataByType("eventFrom", {}).then(res => {
        if (res && res.success) {
          this.dataFromPriority = res.data;
        }
      });
    }

  }
</script>


<style lang="scss">
  .eventQuery {

    .ivu-select .ivu-select-dropdown {
      width: 200px;
    }

    span {
      display: inline-block;
    }

    .addbtn {
      width: 100px;

      background: #3083f2;
      border-radius: 4px;
      line-height: 10px;

      margin-left: 30px;

    }

    .inputstyle {
      margin-left: 20px;

    }

    .label {
      width: 80px;
      line-height: 42px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .flex {
      /*justify-content: space-around;*/
      margin: 0px;
      margin-left: 10px;
    }

    .el-input {
      width: 200px;
      /* font-weight: bold; */
    }

    .tableHeaderOne {
      display: flex;
      margin-top: 10px;
      align-items: center;
      justify-content: space-between;
    }

    .tablebox {
      margin: 20px 20px 0 20px;
      border-top: 2px solid #e8e8ea;
      //表格上面的线条
    }

    .inputstyle {
      width: 340px;
      background: #f0f3f7;
      /*margin-top: 18px;*/
    }

    .numsize {
      margin-top: 15px;
      margin-bottom: 15px;
    }

    .sizestyle {
      font-weight: bold;
      font-size: 13px;
      overflow: visible;
    }
  }

  .el-input__icon {

    line-height: 23px;
    height: 33px;
  }

  /* .tablebox ::v-deep .cell{
  font-size: 14px;
  font-weight: bold;
  color: #000000;
} */
  // .atooltip{
  // 	background: #0086B3 !important;
  // 	overflow: visible !important;
  // }
</style>
