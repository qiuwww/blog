<template>
  <el-row type="flex" class="app-warp" justify="space-around">
    <el-col :span="24">
      <el-row
        v-if="theDetail.cycleFixed == 1"
        type="flex"
        justify="space-around"
        class="mb10"
      >
        <el-col class="bg-white console">
          <header class="p10" style="border-bottom: 1px solid #efefef">
            <div class="title inline-block fs16">{{ "任务描述" }}</div>
            <div class="options inline-block fr" />
          </header>
          <div class="p20">
            <div style="width: 50%" class="fl mb15">
              <i class="label ml20">发布人</i>
              <span class="bold ml20">{{ description.sbmtUserName }}</span>
            </div>
            <div style="width: 50%" class="fl mb15">
              <i class="label ml20">发布时间</i>
              <span class="bold ml20">{{ description.smbtDate }}</span>
            </div>
            <div style="width: 50%" class="fl mb15">
              <i class="label ml20">任务属性</i>
              <span class="bold ml20">{{
                description.cycleFixed == 2 ? "临时" : "周期"
              }}</span>
            </div>
            <div style="width: 50%" class="fl mb15">
              <i class="label ml20">任务类型</i>
              <span class="bold ml20">{{ description.categoryName }}</span>
            </div>
            <div style="width: 50%" class="fl mb15">
              <i class="label ml20">任务描述</i>
              <span class="bold ml20">{{ description.remark }}</span>
            </div>
          </div>
        </el-col>
      </el-row>

      <el-row v-if="!isCycleFixed" type="flex" justify="space-around">
        <el-col :span="24">
          <div class="bg-white console h100 border-box">
            <header class="p20" style="border-bottom: 1px solid #efefef">
              <div class="title inline-block fs16 titletaksstle">任务详情</div>
              <div class="options inline-block fr titletaksstle">
                <span class="bold theme">
                  {{ status.msg }}
                </span>
              </div>
            </header>
            <el-row type="flex" justify="center">
              <el-col :span="21">
                <section class="mb20">
                  <div
                    v-for="(item, index) in list"
                    :key="index"
                    style="overflow: hidden"
                    class="line_bottom p20"
                  >
                    <div
                      v-for="el in item"
                      class="fl flexDiv"
                      :style="
                        el.photo
                          ? 'min-width:100%;overflow:hidden;'
                          : 'min-width:33.33%;overflow:hidden;'
                      "
                      :key="item.photo"
                    >
                      <div
                        class="fl ml20"
                        style="height: 50px; line-height: 50px"
                      >
                        <i class="label mr20 fs13">{{ el.name }}</i>
                      </div>
                      <div v-if="el.name == '工时建议'" class="form-inp">
                        <el-input v-model="form.repairTime" type="number">
                          <template slot="suffix">分钟</template>
                        </el-input>
                      </div>

                      <div v-else>
                        <p
                          style="
                            font-weight: Bold;
                            height: 50px;
                            line-height: 50px;
                          "
                        >
                          {{ el.content }}
                        </p>

                        <div
                          v-if="el.photo"
                          class="flexDiv justify-around"
                          style="min-width: 51%"
                        >
                          <el-image
                            v-for="(photo, index) in el.photo"
                            :key="index"
                            style="width: 180px; height: 140px"
                            :src="photo"
                            :preview-src-list="el.photo"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
      <el-row v-else type="flex" justify="space-around">
        <el-col :span="24">
          <div class="bg-white console h100 border-box">
            <header class="p20" style="border-bottom: 1px solid #efefef">
              <div class="title inline-block fs16">最新情况</div>
            </header>
            <section class="mb20">
              <div
                v-for="(item, index) in list"
                :key="index"
                style="overflow: hidden"
                class="line_bottom p20"
              >
                <div
                  v-for="el in item"
                  class="fl flexDiv"
                  :style="
                    el.photo
                      ? 'min-width:51%;overflow:hidden;'
                      : 'min-width:50%;overflow:hidden;'
                  "
                >
                  <div class="fl ml20" style="height: 50px; line-height: 50px">
                    <i class="label mr20 fs13">{{ el.name }}</i>
                  </div>
                  <div v-if="el.name == '工时建议'">
                    <el-input v-model="form.repairTime" type="number">
                      <template slot="suffix">分钟</template>
                    </el-input>
                  </div>
                  <div v-else>
                    <p
                      style="font-weight: Bold; height: 50px; line-height: 50px"
                    >
                      {{ el.content }}
                    </p>
                    <div
                      v-if="el.photo"
                      class="flexDiv justify-around"
                      style="min-width: 51%"
                    >
                      <el-image
                        v-for="(photo, index) in el.photo"
                        :key="index"
                        class="mr10"
                        style="width: 180px; height: 140px"
                        :src="photo"
                        :preview-src-list="el.photo"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </el-col>
      </el-row>
      <el-row class="bg-white pb20" style="background-color: rgba(0, 0, 0, 0)">
        <Row v-if="theDetail.status === 4" class="mt20 bg-white">
          <Col :type="'align-center'">
            <div>
              <el-button
                v-if="permitIds.includes('renwu_mine_bohu')"
                v-loading="loading"
                @click="handleReject"
                >驳回</el-button
              >
              <el-button
                v-if="permitIds.includes('renwu_mine_tongguo')"
                v-loading="loading"
                class="theme-btn"
                @click="handlePass"
                >通过</el-button
              >
            </div>
          </Col>
          <Col :type="'col-right'">
            <div />
          </Col>
        </Row>

        <Row v-if="theDetail.status == 6" class="mt20 bg-white">
          <Col :type="'align-center'">
            <div v-if="permitIds.includes('renwu_mine_pinjia')">
              <el-button v-loading="loading" @click="handleScoring"
                >评 价</el-button
              >
            </div>
          </Col>
          <Col :type="'col-right'">
            <div />
          </Col>
        </Row>

        <Row v-if="theDetail.status" class="mt20">
          <Col v-if="theDetail.status === 1" :type="'align-center'">
            <div>
              <el-button
                v-if="permitIds.includes('renwu_mine_wuxiao')"
                v-loading="loading"
                @click="handleInvalid"
                >标记无效
              </el-button>
              <el-button
                v-if="
                  permitIds.includes('renwu_mine_paidan') &&
                  !userId &&
                  !isCycleFixed
                "
                v-loading="loading"
                class="theme-btn"
                @click="handleDispatch"
                >分派工单
              </el-button>
              <el-button
                v-if="permitIds.includes('renwu_mine_paidan') && userId"
                v-loading="loading"
                class="theme-btn"
                @click="handleConfirm"
                >提交
              </el-button>
              <span
                v-if="status.msg == '待派单' && userId && permitIds.includes('renwu_mine_paidan')"
                class="width:200px;"
                style="margin-left: 10px"
              >
                <span class="label"> 建议工时 </span>
                <el-input type='number' v-model="form.repairTime"> </el-input>
              </span>
            </div>
          </Col>
          <Col
            v-if="theDetail.status === 2 || theDetail.status === 3"
            :type="'col-right'"
          >
            <div class="bg-white revokeBtnstyle">
              <el-button
                v-if="permitIds.includes('renwu_mine_wuxiao') && !userId"
                v-loading="loading"
                class="theme-btn"
                @click="handleInvalid"
                >撤销任务
              </el-button>
              <el-button
                v-if="
                  permitIds.includes('work_task_cuiban') &&
                  theDetail.status == 3
                "
                v-loading="loading"
                class="theme-btn"
                @click="handleReminderDispatch"
                >催办
              </el-button>
            </div>
          </Col>
        </Row>
      </el-row>
      <el-row type="flex">
        <el-button
          type=""
          class="detbtn"
          v-if="status.msg == '处理中' || status.msg == '待派单'"
          @click="handleModifyDegree"
          >修改紧急程度</el-button
        >
      </el-row>
    </el-col>

    <HistoryMore
      :detail-dialog="historyMore"
      :loading="loading"
      @close="handleHistoryMore"
    />
    <PhotoDialog
      :show-pic="showPic"
      :is-show-pic="isShowPic"
      @showPic="handleShowPic"
    />
    <ReminderDialog
      :ids="ids"
      :title="title"
      :reminder-form="reminderForm"
      :reminder-dialog="reminderDialog"
      :reminder-objects-name="reminderObjectsName"
      @close="hanleClose"
      @update="handleUpdate"
      @dispatch="hanleDispatch"
      @getReminderInfo="handleGetReminderInfo"
    />
    <ReminderDispatchDialog
      :id="$route.query.id"
      :dispatch-dialog="reminderDispatch"
      :depatch-type="'RWLB'"
      @closeDispatch="handleReminderDispatch"
      @setReminder="reminder"
    />
    <DispatchDialog
      :dispatch-dialog="dispatchDialog"
      :depatch-type="4"
      :grid-id="theDetail.gridId"
      @closeDispatch="handleDispatch"
    />
    <NoticeDialog
      :title="title"
      :notice-list="noticeList"
      :notice-dialog="noticeDialog"
      @close="hanleClose"
      @getNotice="handleGetNotice"
    />
    <el-dialog
      title="修改紧急程度"
      :visible.sync="modifyDegree"
      width="30%"
      :before-close="handleModifyDegree"
    >
      <el-select v-model="urgentType" clearable placeholder="请选择紧急程度">
        <el-option
          v-for="(item, index) in urgentTypeList"
          :key="index"
          :label="item.name"
          :value="item.number"
        />
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleModifyDegree" class="cancelbtn"
          >取 消</el-button
        >
        <el-button type="primary" @click="handleConfirmModify" class="submitbtn"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <AuditScoringDialog
      :repair-id="$route.query.id"
      :repair-type="'RWLB'"
      :audit-scoring-dialog="auditScoringDialog"
      :category-id="theDetail.categoryId"
      @close="handleScoring"
      @update="getTaskManagerDetails"
    />
  </el-row>
</template>

<script>
import {
  editTask,
  cancelTask,
  taskExamine,
  getCycleInfo,
  getTaskComment,
  getTaskManager,
  getRepairTrack,
  getTaskManagerDetails,
  getAllTaskCategoryByselect,
  setTesk_Dispath,
  teskExamine,
  getLoadOne,
  setReminderDispatch,
  teskExamineHistory,
  setAllTask,
} from "@/api/engineering";
import { mapGetters } from "vuex";
import Row from "@/components/MyComponents/row";
import Col from "@/components/MyComponents/col";
import { vlength } from "@/utils/verification.js";
import PhotoDialog from "@/components/MyComponents/photo_dialog";
import { getAllDictionary } from "@/api/dictionary";
import NoticeDialog from "@/components/MyComponents/notice_dialog";
import ReminderDialog from "@/components/MyComponents/reminder_dialog";
import DispatchDialog from "@/components/DispatchDialog";
import HistoryMore from "./components/history_more_dialog";
import ReminderDispatchDialog from "@/components/MyComponents/reminder_dispatch_dialog";
import AuditScoringDialog from "./components/audit_scoring_dialog";

export default {
  name: "TaskDetail",
  data() {
    return {
      ids: [],
      title: "",
      showPic: "",
      deptIds: "",
      userScore: 0,
      userNames: [],
      description: {},
      cycleInfo: {},
      systemScore: 0,
      taskComment: {},
      reminderForm: {},
      taskReminder: {},
      isShowPic: false,
      idEditTask: false,
      userEvaluation: [],
      labelWidth: "130px",
      noticeDialog: false,
      auditScoringDialog: false,
      taskManagerForm: {},
      genjinList: [],
      list: [],
      form: {
        urgentType: "",
        repairType: "",
        repairHomeType: "",
        repairTime: "",
      },
      theDetail: {},
      userId: "",
      reminderDispatch: false,
      modifyDegree: false,
      urgentType: "",
      urgentTypeList: [],
      historyMore: false,

      taskCategoryList: [],
      taskProgressList: [],
      reminderDialog: false,
      dispatchDialog: false,
      systemEvaluation: [],
      reminderObjectIds: [],
      taskManagerDetailId: 0,
      reminderObjectsName: [],
      taskManagerDetailsForm: {},
      noticeList: [
        "任务未完成",
        "任务完成情况未达到预期",
        "任务核查未通过",
        "其他",
      ],
      rules: {
        remark: {
          validator: vlength(2, 400, "请输入任务描述"),
          trigger: "blur",
        },
      },
    };
  },
  async created() {
    this.getTaskHistory();
    this.getCycleDetail();
    this.getCycleInfo();
    await this.getTaskManagerDetails();
    this.setProposalAndDegree();
    this.taskManagerDetailsForm.status === 7 && this.getTaskCommentList();

    this.getUrgentTypeList();
  },
  computed: {
    ...mapGetters(["pageSize", "pageNum", "queryStr", "permitIds", "loading"]),
    cycleFixed() {
      return this.theDetail.cycleFixed === 1 ? "周期" : "临时";
    },
    isCycleFixed() {
      return this.theDetail.cycleFixed === 1;
    },
    genjin() {
      if (this.genjinList.length) {
        return true;
      } else {
        return false;
      }
    },
    totalScore() {
      return this.systemScore + this.userScore;
    },
    showBig() {
      return [24, 0];
    },
    currStatus() {
      const status = this.taskManagerDetailsForm.status;
      switch (status) {
        case 1:
          return { status: 1, msg: "待派单" };
          break;
        case 2:
          return { status: 2, msg: "待接单" };
          break;
        case 3:
          return { status: 3, msg: "处理中" };
          break;
        case 4:
          return { status: 4, msg: "待审核" };
          break;
        case 5:
          return { status: 5, msg: "驳回" };
          break;
        case 6:
          return { status: 6, msg: "完成" };
          break;
        case 7:
          return { status: 7, msg: "评价" };
          break;
        case 9:
          return { status: 9, msg: "搁置" };
          break;
        default:
          return { status: 8, msg: "无效" };
          break;
      }

    },
    status() {
      const status = this.taskManagerDetailsForm.status;
      switch (status) {
        case 1:
          return { status: 1, msg: "待派单" };
          break;
        case 2:
          return { status: 2, msg: "待接单" };
          break;
        case 3:
          return { status: 3, msg: "处理中" };
          break;
        case 4:
          return { status: 4, msg: "待审核" };
          break;
        case 5:
          return { status: 5, msg: "驳回" };
          break;
        case 6:
          return { status: 6, msg: "完成" };
          break;
        case 7:
          return { status: 7, msg: "评价" };
          break;
        case 9:
          return { status: 9, msg: "搁置" };
          break;
        default:
          return { status: 8, msg: "无效" };
          break;
      }
    },
    photoList() {
      return this.taskManagerForm.photos
        ? this.taskManagerForm.photos.split(",")
        : [];
    },
    completePhotoList() {
      return this.taskManagerDetailsForm.completePhotos
        ? this.taskManagerDetailsForm.completePhotos.split(",")
        : [];
    },
    taskManagerId() {
      return this.$route.query.id;
    },
  },
  methods: {
    handleScoring() {
      this.auditScoringDialog = !this.auditScoringDialog;
    },
    handleHistory(id) {
      this.$router.push({
        name: "taskDetail",
        query: { id },
      });
      this.$router.go(0);
    },
    async getUrgentTypeList() {
      const { data } = await getAllDictionary({
        fieldName: "urgentType",
      });
      this.urgentTypeList = data;
    },
    // // 修改紧急程度 ！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
    handleModifyDegree() {
      this.modifyDegree = !this.modifyDegree;
    },
    async handleConfirmModify() {
      const o = await setAllTask({
        id: +this.$route.query.id,
        urgentType: this.urgentType,
      });
      if (o && o.code == 200) {
        this.$notify({
          title: o.msg,
          type: "success",
        });
      } else {
        this.$notify({
          title: o.msg,
          type: "fail",
        });
      }
      this.handleModifyDegree();
      this.getTaskManagerDetails();
    },
    // 查看历史记录
    handleHistoryMore() {

      this.historyMore = !this.historyMore;
    },
    // handleReject() {
    //   this.title = "维修驳回";
    //   this.noticeDialog = !this.noticeDialog;
    // },
    // 催办
    handleReminderDispatch() {
      this.reminderDispatch = !this.reminderDispatch;
    },
    async reminder(userIds) {
      const o = await setReminderDispatch({
        id: this.$route.query.id,
        cood: "RWLB",
        userIds,
      });
      if (o && o.code == 200) {
        this.$notify({
          title: "催办成功！！",
        });
      }
    },
    async handleInvalid() {
      // 标记无效
      this.$confirm(`确定标记无效, 是否继续?`, "提示", {
        type: "warning",
        cancelButtonText: "取消",
        confirmButtonText: "确定",
      })
        .then(() => {
          const params = {
            id: this.$route.query.id,
            status: 8,
          };
          const formData = new FormData();
          formData.append("id", this.$route.query.id);
          formData.append("status", 8);

          this.$router.go(-1);
          //新加的
          teskExamine(formData).then((res) => {
            if (res && res.code === "200") {
              this.$router.go(-1);
              this.$notify({
                title: res.msg,
                type: "success",
              });
            }
          });
        })
        .catch(() => {
          this.$message("已取消标记无效");
        });
      // this.$router.go(-1)
    },
    handleDispatch(p) {
      typeof p == "string" || typeof p == "number" ? (this.userId = p) : "";
      this.dispatchDialog = !this.dispatchDialog;
    },
    // 派单提交
    async handleConfirm() {
      if (!this.form.repairTime) {
        return this.$notify({
          title: "请输入工时建议",
        });
      }
      const params = {
        id: this.$route.query.id,
        userId: this.userId,
        urgentType: this.form.urgentType,
        repairTime: this.form.repairTime,
      };
      setTesk_Dispath(params).then((res) => {
        if (res && res.code === "200") {
          this.$notify({
            title: res.msg,
            type: "success",
          });
          this.userId = "";
        }
      });

      // this.setRepairType()
      this.getTaskManagerDetails();
      // this.getCommentList();
    },
    //  插入工时建议
    setProposalAndDegree() {
      if (
        this.theDetail.status == 1 &&
        this.permitIds.includes("work_task_dispatch")
      ) {
        this.list[0].splice(3, 0, { name: "工时建议" });
      }
    },

    handleShowPic(data) {
      this.showPic = data;
      this.isShowPic = !this.isShowPic;
    },

    async getCycleInfo() {
      const { data } = await getCycleInfo({
        taskManagerId: this.taskManagerId,
      });
      this.cycleInfo = data;
      this.userNames = data
        ? data.userNames
          ? data.userNames.split(",")
          : []
        : [];
    },
    async getCycleDetail() {
      const o = await getLoadOne({
        taskManagerId: this.$route.query.id,
      });
      if (o && o.code == 200) {
        this.description = o.data;
      }
    },
    // 获取详情
    async getTaskManagerDetails() {
      const { data } = await getTaskManagerDetails({
        noApp: 1,
        cood: "RWLB",
        id: this.$route.query.id,
        userId: +sessionStorage.getItem("userId"),
      });
      this.form.urgentType = data.urgentType;
      this.theDetail = data;
      this.list = data.result;
      this.list.forEach((i) => {
        i.forEach((el) => {
          el.photo = el.photo ? el.photo.split(",") : "";
        });
      });

      this.taskManagerDetailsForm = data || {};
      this.taskManagerDetailId = data ? data.id : 0;
    },
    async getTaskHistory() {
      const o = await teskExamineHistory({
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        gridId: sessionStorage.getItem("gridId"),
        masterId: this.$route.query.id,
      });
      this.taskProgressList = o.data.records;
    },
    handleUpdate() {
      this.getTaskManagerDetails();
    },
    async getTaskCommentList() {
      const { data } = await getTaskComment({
        taskManagerId: this.taskManagerId,
      });
      this.taskComment = data;
      this.userEvaluation = [];
      this.systemEvaluation = [];
      if (data) {
        data.systemEvaluation.forEach((item) => {
          this.systemScore += item.score ? +item.score : 0;
          this.systemEvaluation.push(item);
        });
      }
    },

    handleGetNotice(props) {
      const params = {
        userId: sessionStorage.getItem("userId"),
        detailsId: this.$route.query.id,
        remark: props.notice === "其他" ? props.noticeTextArea : props.notice,
        type: 2,
      };
      taskExamine(params).then((res) => {
        if (res && res.code === "200") {
          this.$router.go(-1);
          this.$notify({
            title: res.msg,
            type: "success",
          });
        }
      });
    },
    handleEditReminder() {
      this.title = "任务周期";
      this.reminderForm = {
        beginDate: this.cycleInfo.beginDate,
        cycleNum: this.cycleInfo.cycleNum,
        cycleType: String(this.cycleInfo.cycleType),
      };
      this.deptIds = this.cycleInfo.departmentIds;
      this.reminderObjectsName = this.userNames;
      this.reminderDialog = !this.reminderDialog;
    },
    handleGetReminderInfo({ beginDate, cycleNum, cycleType }) {
      let reminderObjectIds = null;
      if (this.reminderObjectIds.length) {
        reminderObjectIds = this.reminderObjectIds.map((item) => item.id);
      } else {
        reminderObjectIds = this.cycleInfo.userIds;
      }

      const formData = new FormData();
      formData.append("cycleNum", cycleNum);
      formData.append("cycleType", cycleType);
      formData.append(
        "beginDate",
        this.$moment(beginDate).format("YYYY-MM-DD HH:mm:ss")
      );
      formData.append("id", this.taskManagerId);
      formData.append("userIds", reminderObjectIds.join(","));
      editTask(formData).then((res) => {
        if (res && res.code === "200") {
          this.$notify({
            title: res.msg,
            type: "success",
          });
          this.getCycleInfo();
        }
      });
    },

    handleCancelTask() {
      this.$confirm("此操作将取消该任务, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          cancelTask({ taskManagerId: this.taskManagerId }).then((res) => {
            if (res && res.code === "200") {
              this.$router.go(-1);
              this.$notify({
                title: res.msg,
                type: "success",
              });
            }
          });
        })
        .catch(() => {
          this.$message("已取消操作");
        });
    },
    hanleClose() {
      this.noticeDialog = false;
      this.reminderDialog = false;
    },
    handlePass() {
      const params = {
        type: 1,
        detailsId: this.$route.query.id,
        userId: sessionStorage.getItem("userId"),
      };

      taskExamine(params).then((res) => {
        if (res && res.code === "200") {
          this.$router.go(-1);
          this.$notify({
            title: res.msg,
            type: "success",
          });
        }
      });
    },
    handleReject() {
      this.title = "任务驳回";
      this.noticeDialog = !this.noticeDialog;
    },
    hanleDispatch() {
      this.$refs.dispatch.reset();
      this.reminderObjectIds = [];
      this.dispatchDialog = !this.dispatchDialog;
    },
  },
  components: {
    Row,
    Col,
    PhotoDialog,
    NoticeDialog,
    ReminderDialog,
    DispatchDialog,
    ReminderDispatchDialog,
    HistoryMore,
    AuditScoringDialog,
  },
};
</script>

<style scoped lang="scss">
.flexDiv {
  display: flex;
}
.justify-around {
  justify-content: space-between;
}
.detbtn {
  width: 140px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 32px 200px 24px 200px;
  border-radius: 16px;
}
.cancelbtn {
  width: 80px;
  height: 32px;
  background: #ffffff;
  border: 1.3px solid #c3c3c3;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.submitbtn {
  width: 120px;
  height: 32px;
  background: #3083f2;
  line-height: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  letter-spacing: 5px;
}
.dialog-footer {
  display: flex;
  justify-content: flex-end;
}
.revokeBtnstyle {
  margin-left: -300px;
}
.titletaksstle {
  margin: 6px 6px;
}
</style>
