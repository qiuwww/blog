<template>
  <el-row type="flex" class="app-warp eventSelf" justify="center">
    <el-col :span="24">
      <el-row style="margin-top: 20px">
        <Form ref="searchForm"  inline :label-width="110" onSubmit="return false">
<!--          <Button @click="addTBuildingArchives" type="primary" icon="md-add">新增</Button>-->
          <!--<el-button
            class="m10 addbtn"
            type="primary"
            size="small"
            @click="addTBuildingArchives">
            +  添加
          </el-button>-->

          <Form-item label="创建时间" :label-width="110">
            <el-date-picker v-model="createTime" size="small" align="right" value-format="yyyy-MM-dd" type="date"
                            :picker-options="pickerOptions" placeholder="选择日期" @change="handleUpdate" style="width: 200px"/>
          </Form-item>
          <Form-item label="所属辖区">
<!--            <Grid size="small" @grid="handleGrid"/>-->
            <TreeSelect v-model="gridId" v-bind:disabled="disabled" :data="gridPriority" v-width="200" />
          </Form-item>
          <Form-item label="事件来源" v-show="drop">
            <el-select v-model="originSelect" clearable size="small" @change="handleUpdate" style="width: 200px">
              <el-option label="居民app" :value="1"/>
              <el-option label="街道app" :value="2"/>
            </el-select>
          </Form-item>
          <Form-item label="事件类型" v-show="drop">
            <TreeSelect v-model="eventType" v-bind:disabled="disabled" :data="eventsTypeList" v-width="200" />
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
      <!-- <el-row >
        <GridMatch />
      </el-row> -->
      <el-row class="tablebox" >
        <el-col :span="24">
          <el-table :header-cell-style="{
              'font-size': '13px',
              'font-weight': 'bold',
              'color':'#000000',

            }"
                    stripe :data="tableData"  v-loading="tableLoading">
            <el-table-column class="sizestyle" prop="code" label="事件编号"/>
            <el-table-column prop="eventsTypeName" label="事件类型"/>
            <el-table-column prop="title" label="事件内容"/>
            <el-table-column prop="status" label="处理状态">
              <template slot-scope="scope">
                {{ eventStatus(scope.row.status) }}
              </template>
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间"/>
            <el-table-column prop="dataFrom" label="事件来源">
              <template slot-scope="scope">{{ scope.row.dataFrom == 1 ? "居民app" : "街道app" }}
              </template>
            </el-table-column>
            <el-table-column prop="gridName" label="所属辖区"/>
<!--            <el-table-column prop="userName" label="登记人"/>-->
            <el-table-column prop="option" label="操作">
              <template slot-scope="scope">

                <!--v-if="permitIds.includes('shijian_event_details')"-->
                <el-tooltip content="查看详情" placement="top" popper-class="atooltip">
                  <el-button  v-loading="loading"
                             class="m10 btn-icon chakan"
                             @click="handleDetail(scope.row)"/>
                </el-tooltip>

                <!--<el-tooltip content="编辑" placement="top" popper-class="atooltip">
                  <el-button v-loading="loading"
                             class="bianji"
                             @click="handleEdit(scope.row)"/>
                </el-tooltip>

                <el-tooltip content="删除" placement="top" popper-class="atooltip">
                  <el-button v-loading="loading"
                             class="shanchu"
                             @click="handleDelete(scope.row.id)"/>
                </el-tooltip>-->


              </template>
            </el-table-column>
            <div slot="empty" class="sqt">
              <!-- 暂无数据图-->
              <p><img src="../../../../assets/imgs/qsy.png"></p>
            </div>

          </el-table>
          <Pagination class="numsize":page-total="pageTotal" @paginationChange="handleUpdate"/>
        </el-col>
      </el-row>
    </el-col>
<!--    <taskDetail v-model="eventShow" :t-zhsq-task-list-id="tEventListId" modal-title="事件详情" />-->
    <eventDetail v-model="eventShow" :is-event-self="isEventSelf" :proc-inst-id="procInstId" :t-zhsq-task-list-id="tEventListId" v-on:handleSearch="handleBackDetail" modal-title="事件详情"></eventDetail>
    <editandAddEvent v-model="updateShow" :TZhsqEventListId="TZhsqEventListId" :modalTitle="title" v-on:handleSearch="handleSearch"></editandAddEvent>
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
  import updateTZhsqEventList from "../../tZhsqEventList/updateTZhsqEventList";
  import lookTZhsqEventList from "../../tZhsqEventList/lookTZhsqEventList";
  import {
    loadGridDeptTreeByPage,
    loadGridDeptTreeNotPage
  } from '@/api/zhsq/system'
  import store from '@/store'
  export default {
    data() {
      return {
        gridPriority:[],
        disabled: false,
        dropDownContent: "展开",
        dropDownIcon: "ios-arrow-down",
        showSearch: false,
        drop: false,
        isEventSelf: false,
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
        eventShow:false,
        tEventListId:"",
        procInstId:"",
        tableLoading:false,
        title: '',
        TZhsqEventListId: '',
        updateShow: false,
        //用户
        nowUserId: '',
        nowUserName: '',
      }
    },
    computed: {
      ...mapGetters(['pageSize', 'pageNum', 'queryStr', 'permitIds', 'loading'])
    },
    created() {
      this.handleGetEventsType()
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
        // 重新加载数据
        setTimeout(() => {
          this.handleReset();
        },400)
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
        loadGridDeptTreeNotPage({
          attribute: 1
        }).then(res => {
          if(res && res.success) {
            if (res.data) {
              this.gridPriority = this.getTreeData(res.data);
            }
          }
        }).catch(err => {
          this.loading = false
        });
      },
      handleGrid(val) {
        this.gridId = val
        this.handleUpdate()
      },
      eventStatus(status) {
        switch (status) {
          case 0:
            return '待自办'
            break
          case 1:
            return '发现上报'
            break
          case 2:
            return '处理反馈'
            break
          case 3:
            return '事件接收'
            break
          case 4:
            return '事件审核'
            break
          case 5:
            return '办结审核'
            break
          case 6:
            return '异议审核'
            break
          case 7:
            return '事件结束'
            break
          case 8:
            return '分级上报'
            break
          default:
            return '办理完成'
        }
      },
      async handleGetEventsType() {
        // const {
        //   data
        // } = await getEventsTypeList()
        // this.eventsTypeList = data
        queryEventsTypeTreeNotPage({
          // pageSize: this.pageSize,
          // pageNum: this.pageNum,
          // name: this.queryStr
        }).then(res => {
          if(res && res.success) {
            if (res.data) {
              //展开第一层
              // for(let i in res.data.records ){
              //   let item = res.data.records[i];
              //   if(item && item.children){
              //     item._showChildren = true;
              //   }
              // }
              this.eventsTypeList = this.getTreeData(res.data);
            }
          }
        }).catch(err => {
          this.loading = false
        });
      },
      async handleGetAllEvents() {
        this.tableLoading = true;
        const {
          data
        } = await getAllLoad({
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          queryStr: this.queryStr,
          dataFrom: this.originSelect,
          eventsTypeId: this.eventType,
          createTime: this.createTime,
          gridId: this.gridId,
          handleSelf: this.nowUserId,//当前用户负责的 待自办事件
          status: 0,
        });
        this.tableLoading = false
        this.tableData = data.records
        this.pageTotal = data.total
      },
      //生成部门
      getTreeData(data) {
        if (data) {

          for (let i in data) {
            var item = data[i];

            if(data[i].label == null || !data[i].label){
              data[i].title = data[i].name;
            }
            if(data[i].label != null && data[i].label){
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
        this.eventShow=true;
        this.isEventSelf=true;
        this.tEventListId=row.id.toString();
        if(row.procInstId){
          this.procInstId=row.procInstId.toString();
        }
      },
      //获取用户信息
      getUserInfo(){
        store.dispatch('GetInfo').then((res) => {
          // console.log('获取用户信息');
          // console.log(res);
          this.nowUserName = res.nickName;
          this.nowUserId = res.id;
        })
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
    created(){
      //获取用户信息
      this.getUserInfo();
    },
    mounted() {
      //查询分页数据
      this.tableLoading = true;
      setTimeout(() => {
        this.handleGetAllEvents();
      },300)
      this.getJurisdiction();
    }
  }
</script>


<style lang="scss">
  .eventSelf {

    .ivu-select .ivu-select-dropdown {
      width: 200px;
    }

    span {
      display: inline-block;
    }

    .addbtn{
      width: 100px;

      background: #3083f2;
      border-radius: 4px;
      line-height: 10px;

      margin-left: 30px;

    }
    .inputstyle{
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
      margin: 0px ;
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
