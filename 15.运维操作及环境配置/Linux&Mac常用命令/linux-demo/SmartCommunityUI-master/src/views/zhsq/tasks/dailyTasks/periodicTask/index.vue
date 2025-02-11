<template>
  <div class="periodicTask">
    <el-row class="app-warp">
      <div class="p20 bg-white h100">
        <div class="ml10">
          <el-row type="flex" justify="left" class="rowone mb10">
          <span class="m10">
            <i class="label">发布时间</i>
            <el-date-picker
              v-model="createDateFrom"
              size="small"
              type="date"
              class="filter-time"
              placeholder="选择时间"
              value-format="yyyy-MM-dd"
              :picker-options="disabledNewAfterDate"
              @change="handleUpdate"
            />
          </span>

            <span class="m10">
            <i class="zhi">至 </i>
            <el-date-picker
              v-model="createDateTo"
              size="small"
              type="date"
              class="filter-time"
              placeholder="选择时间"
              value-format="yyyy-MM-dd"
              :picker-options="disabledNewAfterDate"
              @change="handleUpdate"
            />
          </span>

            <span class="m10">
            <i class="label">任务类型</i>
            <el-select
              v-model="categoryId"
              size="small"
              clearable
              @change="handleUpdate"
            >
              <el-option
                v-for="(item, index) in taskCategoryList"
                :key="index"
                :value="item.id"
                :label="item.name"
              />
            </el-select>
          </span>

            <!-- <div v-if="permitIds.includes('renwu_daochu')" class="ml10">
              <el-button @click="handlExportExcel">导出</el-button>
            </div> -->
            <span class="m10">
		    <i class="label">所属网格</i>
		       <Grid size="small" @grid="handGetGridId"/>
		  </span>

            <!-- <span class="m10">
              <i class="label">所属网格</i>
              <span style="width: 160px; height: 32px; display: inline-block">
                <Grid size="small" @grid="handGetGridId" />
              </span>
            </span> -->
            <span class="ml10">
            <Search
              :placeholder="placeholder"
              :refresh="refresh"
              @update="handleUpdate"
            />

            <el-button class="dellBTn" @click="handleRefresh">
              重置查询
            </el-button>
          </span>

            <!-- <el-col :span="6" class="m10 form-inp">
            <i class="label">所属街道</i>
            <Street @push="handleGetStreet" />
          </el-col>

          <el-col :span="6" class="m10 form-inp">
            <i class="label">所属社区</i>
            <CommunityId :street-id="streetId" @push="handleGetCommunity" />
          </el-col> -->
          </el-row>
        </div>
        <TaskDialog
          :user-id="userId"
          :loading="loading"
          :task-dialog="taskDialog"
          :task-category-list="taskCategoryList"
          @close="handleClose"
          @update="handleUpdate"
          @dispatchDialog="handleDispatchDialog"
        />
        <DispatchDialog
          :dispatch-dialog="dispatchDialog"
          :depatch-type="4"
          @closeDispatch="handleDispatchDialog"
        />
        <TaskCategoryDialog
          :loading="loading"
          :task-category-dialog="taskCategoryDialog"
          @close="handleClose"
          @update="handleUpdate"
        />
        <el-table
          ref="multipleTable"
          v-loading="tableLoading"
          :header-cell-style="{
          'font-size': '13px',
          'font-weight': 'bold',
          color: '#000000',

        }"
          class="tablebox"
          stripe
          :data="tableData"
          element-loading-text="拼命加载中"
          @selection-change="handlSelect"
        >
          <el-table-column type="selection"/>
          <el-table-column label="序号" type="index"/>
          <el-table-column prop="code" label="任务单号" width="200px"/>
          <el-table-column prop="categoryName" label="任务类型"/>
          <el-table-column prop="submitUserName" label="发布人"/>
          <el-table-column prop="createDate" label="发布时间" width="150px"/>
          <el-table-column prop="cycleFixed" label="任务属性">
            <template slot-scope="scope">
              {{ scope.row.cycleFixed == 1 ? "周期" : "临时" }}
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="任务描述">
            <template slot-scope="scope">
              <div class="w100 h100">
                <el-popover
                  placement="top-start"
                  title="任务描述"
                  width="400"
                  trigger="hover"
                  :content="scope.row.remark"
                >
                  <div slot="reference">
                    {{ handleRander(scope.row.remark) }}
                  </div>
                </el-popover>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="streetName" label="所属街道"/>
          <el-table-column prop="communityName" label="所属社区"/>
          <el-table-column prop="gridName" label="所属网格"/>
          <el-table-column prop="status" style="color: pink" label="状态">
            <template slot-scope="scope">
              <i
                :style="{
                color: scope.row.status == 1 ? '#F3538A' : '#11B3B9',
                'font-style': 'normal',
              }"
              >
                {{ scope.row.status == 1 ? "停用" : "启用" }}
              </i>
            </template>
          </el-table-column>
          <el-table-column prop="operation" label="操作" width="280">
            <template slot-scope="scope">
              <el-tooltip
                content="查看详情"
                placement="top"
                popper-class="atooltip"
              >
                <el-button
                  v-if="permitIds.includes('task_list_particulars')"
                  class="chakan"
                  @click="handleDetail(scope.row.id)"
                />
              </el-tooltip>
              <el-tooltip content="启用" placement="top" popper-class="atooltip">
                <el-button
                  v-if="
                  permitIds.includes('task_list_particulars') &&
                  scope.row.status == 1
                "
                  size="mini"
                  class="qiyong"
                  @click="handleCancelTask(scope.row.id, '启用', 0)"
                />
              </el-tooltip>
              <el-tooltip content="停用" placement="top" popper-class="atooltip">
                <el-button
                  v-if="
                  permitIds.includes('task_list_particulars') &&
                  scope.row.status == 0
                "
                  size="mini"
                  class="tinyong"
                  @click="handleCancelTask(scope.row.id, '停用', 1)"
                />
              </el-tooltip>
              <el-tooltip content="删除" placement="top" popper-class="atooltip">
                <el-button
                  v-if="permitIds.includes('task_list_particulars') && scope.row.status==1"
                  class="shanchu"
                  @click="
                DetalCancelTask(scope.row.id, '删除', 2, scope.row.status)
                "
                />
              </el-tooltip>
            </template>
          </el-table-column>
          <div slot="empty" class="sqt">
            <p><img src="../../../../../assets/imgs/qsy.png"/></p>
          </div>
        </el-table>
        <Pagination
          class="numsize"
          :page-total="pageTotal"
          @paginationChange="handleUpdate"
        />
      </div>
    </el-row>
  </div>
</template>

<script>
  import {
    getAllTask,
    getAllPeriodicTask,
    editStatusTask,
    getAllTaskCategoryByselect,
  } from "@/api/engineering";
  import {mapGetters} from "vuex";
  import Search from "@/components/Search";
  import Pagination from "@/components/Pagination";
  import TaskDialog from "./components/task_dialog";
  import {getAllDictionary} from "@/api/dictionary";
  import {disabledNewAfterDate} from "@/utils/picker_options";
  import TaskCategoryDialog from "./components/task_category_dialog";
  import DispatchDialog from "@/components/DispatchDialog";
  import CommunitySelect from "@/components/Ascription/communitySelect";
  import Street from "@/components/Ascription/streetSelecr";
  import CommunityId from "@/components/Ascription/communitySelect";
  import Grid from "@/components/Ascription/gridSelect";

  export default {
    name: "Task",
    data() {
      return {
        communityId: 0,
        streetId: 0,
        userId: "",
        dispatchDialog: false,
        refresh: "",
        status: "",
        street: "",
        community: "",
        gridId: sessionStorage.getItem("gridId"),
        pageTotal: 0,
        tableData: [],
        categoryId: "",
        createDateTo: "",
        taskDialog: false,
        createDateFrom: "",
        exportExcelData: [],
        disabledNewAfterDate,
        taskCategoryList: [],
        toggleSelectionArr: [],
        taskCategoryDialog: false,
        placeholder: "输入发布人/任务单号搜索",
        tHeader: [
          "任务单号",
          "任务类型",
          "发布人",
          "发布时间",
          "任务属性",
          "任务描述",
          "执行人",
          "处理状态",
        ],
        filterVal: [
          "code",
          "taskType",
          "submitUserName",
          "createDate",
          "cycleFixed",
          "remark",
          "execUserName",
          "statusStr",
        ],
        tableLoading: false,
      };
    },
    created() {
      // this.$store.dispatch("loading/setLoading", true);
      this.getTaskCategoryList();
      this.$store.dispatch("search/resetSearch");
      this.$store.dispatch("pagination/resetPage");
      this.getTasks(this.pageSize, this.pageNum);
    },
    computed: {
      ...mapGetters(["pageSize", "pageNum", "queryStr", "permitIds", "loading"]),
    },
    methods: {
      handleRander(val) {
        if (val.length < 10) {
          return val;
        } else {
          return val.substr(0, 7) + "...";
        }
      },
      handleGetStreet(val) {
        this.street = val;
      },
      handleGetCommunity(val) {
        this.communityId = val;
      },
      handGetGridId(val) {
        this.gridId = val;
        if (val) {
          this.getTasks(this.pageSize, this.pageNum);
        }
      },
      handleDispatchDialog(p) {
        p ? (this.userId = p) : "";
        this.dispatchDialog = !this.dispatchDialog;
      },
      async getTaskCategoryList() {
        const {data} = await getAllTaskCategoryByselect({
          type: 1,
          gridId: sessionStorage.getItem("gridId"),
        });
        this.taskCategoryList = data;
      },
      async getTasks(pageSize, pageNum) {
        this.tableLoading = true;
        const {data} = await getAllPeriodicTask({
          pageNum,
          pageSize,
          status: this.status,
          queryStr: this.queryStr,
          categoryId: this.categoryId,
          createDateTo: this.createDateTo,
          createDateFrom: this.createDateFrom,
          gridId: this.gridId ? this.gridId : "",
        });
        this.tableLoading = false;
        this.pageTotal = data.total;
        this.tableData = data.records;
        this.tableData.forEach((i) => {
          switch (i.status) {
            case 1:
              return (i.statusStr = "停用");
              break;
            case 2:
              return (i.statusStr = "已删除");
              break;

            default:
              return (i.statusStr = "启用");
              break;
          }
        });
        this.$store.dispatch("loading/setLoading", false);
        this.$nextTick(() => {
          this.toggleSelection(this.toggleSelectionArr);
        });
      },
      handleUpdate() {
        this.getTasks(this.pageSize, this.pageNum);
        this.getTaskCategoryList();
      },
      handleAddTask() {
        this.taskDialog = !this.taskDialog;
      },
      handleAddTaskCategory() {
        this.taskCategoryDialog = !this.taskCategoryDialog;
      },
      handleAdd() {
        this.$router.push({name: "addNotice"});
      },
      handleDetail(id) {
        this.$router.push({
          name: "taskCycDetail",
          query: {
            id,
            sta: 0,
          },
        });
      },
      handleCancelTask(id, type, status, typecode) {
        if (status == 1 || status == 0) {
          this.$confirm(`此操作将${type}该任务, 是否继续?`, "提示", {
            cancelButtonText: "取消",
            confirmButtonText: "确定",
            type: "warning",
          })
            .then(() => {
              this.$store.dispatch("loading/setLoading", true);
              editStatusTask({id, status}).then((res) => {
                if (res && res.code == "200") {
                  this.$notify({
                    title: res.msg,
                    type: "success",
                  });
                  this.$store.dispatch("loading/setLoading", true);
                  this.handleUpdate();
                }
              });
            })
            .catch(() => {
              this.$message("已取消操作");
            });
        } else {

        }
      },
      handlExportExcel() {
        if (!this.exportExcelData.length) {
          this.$confirm("是否导出所有数据？", {
            distinguishCancelAndClose: true,
            confirmButtonText: "确定",
            type: "warning",
            cancelButtonText: "取消",
          })
            .then(async (_) => {
              this.$store.dispatch("exportExcel/setExportExcel", {
                tHeader: this.tHeader,
                filterVal: this.filterVal,
                exportExcelData: this.tableData,
              });
            })
            .catch((action) => {
              this.$message({
                type: "info",
                message: "取消导出所有操作",
              });
            });
        } else {
          this.$store.dispatch("exportExcel/setExportExcel", {
            tHeader: this.tHeader,
            filterVal: this.filterVal,
            exportExcelData: this.exportExcelData,
          });
        }
      },
      DetalCancelTask(id, type, status, typecode) {
        this.$confirm(`此操作将${type}该任务, 是否继续?`, "提示", {
          cancelButtonText: "取消",
          confirmButtonText: "确定",
          type: "warning",
        })
          .then(() => {
            this.$store.dispatch("loading/setLoading", true);
            editStatusTask({id, status}).then((res) => {
              if (res && res.code == "200") {
                this.$notify({
                  title: res.msg,
                  type: "success",
                });
                this.$store.dispatch("loading/setLoading", true);
                this.handleUpdate();
              }
            });
          })
          .catch(() => {
            this.$message("已取消操作");
          });

      },
      handlSelect(selection) {
        this.exportExcelData = selection;

        selection.length &&
        selection.forEach((item) => {
          item.id && this.toggleSelectionArr.push(item.id);
        });
      },
      toggleSelection(ids) {
        const $findItem = (id) => {
          const res = this.tableData.find((item) => item.id === id);
          return res;
        };

        if (ids) {
          ids.forEach((id) => {
            const $row = $findItem(id);
            $row && this.$refs.multipleTable.toggleRowSelection($row, true);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleClose() {
        this.taskDialog = false;
        this.taskCategoryDialog = false;
        this.$store.dispatch("loading/setLoading", false);
      },
      handleRefresh() {
        this.status = "";
        this.refresh = parseInt(Math.random() * 5 + 1, 500);
        this.categoryId = "";
        this.createDateTo = "";
        this.createDateFrom = "";
        this.gridId = sessionStorage.getItem("gridId");
        this.handleUpdate();
      },
    },
    components: {
      CommunitySelect,
      Search,
      TaskDialog,
      Pagination,
      TaskCategoryDialog,
      DispatchDialog,
      Street,
      CommunityId,
      Grid,
    },
  };
</script>

<style scoped lang="less">
  .periodicTask {
    .label {
      font-style: normal;
      font-weight: bold;
      width: 80px;
      font-size: 14px;
    }

    .zhi {
      font-style: normal;
      font-weight: bold;
      width: 20px;
      font-size: 14px;
      color: #909399;
    }

    .el-select {
      width: 160px;
      height: 32px;
    }

    .reset {
      width: 95px;
      height: 32px;
      margin-top: -2px;
      background: #ffffff;
      border: 1px solid #cccccc;
      border-radius: 4px;
      letter-spacing: 2px;
    }

    .rowone {
      margin-top: 20px;
      margin-bottom: 20px;
      display: inline-block;
    }

    .rowtwo {
      margin-bottom: 10px;
    }

    .tablebox {
      margin: 10px 20px 0 20px;
      border-top: 2px solid #e8e8ea;
    }

    .filter-time {
      width: 120px;
      height: 32px;
      background: #ffffff;
      border: 1px solid #f2f2f2;
      border-radius: 4px;
    }

    .ml10 {
      isplay: inline-block;
      justify-content: space-between;
    }

    span {
      display: inline-block;
      line-height: 33px;
      overflow: hidden;
    }

    /* .label {
      width: 80px;
      line-height: 23px;
        height: 33px;
    }
    .inputstyle {
      width: 240px;
      margin-top: -2px;
      background: #f0f3f7;
    }*/
    /* .tablebox ::v-deep .cell{
      font-size: 13px;
      font-weight: bold;
      color: #000000;
    } */

    .selectstyle {
      width: 140px;
    }

    .searchInput ::v-deep .el-input__inner {
    }

    .numsize {
      margin: 20px 0 24px 0;
    }

    .el-input--small .el-input__inner {
      height: 31px;
      line-height: 31px;
    }
    .dellBTn{
      margin-left: 10px;
    }
  }
</style>
