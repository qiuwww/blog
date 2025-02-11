<template>
  <el-row type="flex" justify="space-around">
    <el-col :span="showBig[0]">
      <el-row type="flex" justify="space-around" class="mb10">
        <el-col class="bg-white console">
          <header class="p10" style="border-bottom: 1px solid #efefef">
            <div class="title inline-block fs16">{{ "任务描述" }}</div>
            <div class="options inline-block fr">
              <!-- <el-button class="theme-btn">修改任务</el-button> -->
            </div>
          </header>
          <div class="p20">
            <div style="width: 50%" class="fl mb15">
              <i class="label ml20">单号</i>
              <span class="bold ml20">{{ theDetail.code }}</span>
            </div>
            <div style="width: 50%" class="fl mb15">
              <i class="label ml20">任务类型</i>
              <span class="bold ml20">{{ theDetail.categoryName }}</span>
            </div>
            <!-- <div style="width:50% ;" class="fl mb15">
              <i class="label ml20">紧急程度</i>
              <span class="bold ml20">{{ theDetail.streetName }}</span>
            </div> -->

            <div style="width: 50%" class="fl mb15">
              <i class="label ml20">任务属性</i>
              <span class="bold ml20">{{
                theDetail.cycleFixed == 1 ? "周期" : "临时"
              }}</span>
            </div>
            <div style="width: 50%" class="fl mb15">
              <i class="label ml20">所属街道</i>
              <span class="bold ml20">{{ theDetail.streetName }}</span>
            </div>
            <div style="width: 50%" class="fl mb15">
              <i class="label ml20">所属社区</i>
              <span class="bold ml20">{{ theDetail.communityName }}</span>
            </div>
            <!-- <div style="width:50% ;" class="fl mb15">
              <i class="label ml20">所属街道</i>
              <span class="bold ml20">{{ theDetail.streetName }}</span>
            </div> -->
            <div style="width: 50%" class="fl mb15">
              <i class="label ml20">所属网格</i>
              <span class="bold ml20">{{ theDetail.gridName }}</span>
            </div>

            <div style="width: 50%" class="fl mb15">
              <i class="label ml20">发布人</i>
              <span class="bold ml20">{{ theDetail.sbmtUserName }}</span>
            </div>

            <div style="width: 50%" class="fl mb15">
              <i class="label ml20">发布时间</i>
              <span class="bold ml20">{{ theDetail.createDate }}</span>
            </div>
            <div style="width: 50%" class="fl mb15">
              <i class="label ml20">状态</i>
              <span class="bold ml20">{{
                theDetail.status ? "停用" : "启用"
              }}</span>
            </div>

            <div style="width: 50%" class="fl mb15">
              <i class="label ml20">任务描述</i>
              <span class="bold ml20">{{ theDetail.remark }}</span>
            </div>
            <!-- <div style="width:50% ;" class="fl mb15">
              <i class="label ml20">任务描述</i>
              <span class="bold ml20">{{ description.remark }}</span>
            </div> -->
          </div>
        </el-col>
      </el-row>

      <el-row class="bg-white pb20">
        <Row v-if="theDetail.status === 4" class="mt20 bg-white">
          <Col :type="'align-center'">
            <div>
              <el-button
                v-if="permitIds.includes('renwu_mine_bohu')"
                @click="handleReject"
                >驳回</el-button
              >
              <el-button
                v-if="permitIds.includes('renwu_mine_tongguo')"
                class="theme-btn"
                @click="handlePass"
                >通过
              </el-button>
            </div>
          </Col>
          <Col :type="'col-right'">
            <div />
          </Col>
        </Row>

        <Row v-if="theDetail.status === 6" class="mt20 bg-white">
          <Col :type="'align-center'">
            <div v-if="permitIds.includes('renwu_mine_pinjia')">
              <el-button @click="handleScoring">评 价</el-button>
            </div>
          </Col>
          <Col :type="'col-right'">
            <div />
          </Col>
        </Row>

        <Row v-if="theDetail.status === 1" class="">
          <Col :type="'align-center'">
            <div class="mt20">
              <el-button
                v-if="permitIds.includes('renwu_mine_wuxiao')"
                @click="handleInvalid"
                >标记无效
              </el-button>
              <el-button
                v-if="
                  permitIds.includes('renwu_mine_paidan') &&
                  !userId &&
                  !isCycleFixed
                "
                class="theme-btn"
                @click="handleDispatch"
                >分派工单
              </el-button>
              <el-button
                v-if="permitIds.includes('renwu_mine_paidan') && userId"
                class="theme-btn"
                @click="handleConfirm"
                >提交
              </el-button>
            </div>
          </Col>
          <Col
            v-if="theDetail.status === 2 || theDetail.status === 3"
            :type="'col-right'"
          >
            <div class="bg-white">
              <el-button
                v-if="permitIds.includes('renwu_mine_wuxiao') && !userId"
                class="theme-btn"
                @click="handleInvalid"
                >撤销任务
              </el-button>
              <el-button
                v-if="
                  permitIds.includes('work_task_cuiban') &&
                  theDetail.status == 3
                "
                class="theme-btn"
                @click="handleReminderDispatch"
                >催办
              </el-button>
            </div>
          </Col>
        </Row>
      </el-row>
    </el-col>
    <el-col :span="showBig[1]" class="ml20">
      <!-- 评价打分 -->
      <el-row
        v-if="currStatus.status === 7 && !isCycleFixed"
        type="flex"
        justify="space-around"
      >
        <el-col :span="24">
          <div class="bg-white console h100 border-box">
            <header class="p20" style="border-bottom: 1px solid #efefef">
              <div class="title inline-block fs16">评价打分</div>
            </header>
            <div class="p20">
              <div class="p20" style="border-bottom: 2px solid #000">
                <span class="fs16">本次服务打分</span>
                <span class="bold fs20 ml10">{{ totalScore }}</span>
                <span class="bold fs20">分</span>
              </div>
              <div class="mt20 p20">
                <el-progress
                  :text-inside="true"
                  :stroke-width="26"
                  :percentage="totalScore"
                />
              </div>
              <div class="p20">
                <div
                  v-for="(item, i) in systemEvaluation"
                  :key="i"
                  class="mt15"
                >
                  <el-tag type="info" class="mr10">系统</el-tag>
                  {{ item.remark  }}
                  <span v-if="item.status" class="fr">
                    <i class="fa fa-check" aria-hidden="true" />
                    +{{ item.score }}分
                  </span>
                </div>
              </div>
              <div class="p20" style="border-bottom: 1px solid #efefef">
                <div v-for="(item, i) in userEvaluation" :key="i" class="mt15">
                  {{ item.remark  }}
                  <span class="fr">
                    <i class="fa fa-check" aria-hidden="true" />
                    +{{ item.score }}分
                  </span>
                </div>
              </div>
              <div class="mt20 p20">
                <div class="inline-block">
                  <img
                    v-if="taskComment.userHeadPhoto"
                    alt
                    :src="taskComment.userHeadPhoto"
                    width="60px"
                    height="60px"
                  />
                </div>
                <span class="fr">
                  <span>{{ taskComment.userName  }}</span>
                  <span>{{ taskComment.evaluationDate  }} </span>
                </span>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
      <!-- 任务周期 -->
      <el-row v-if="isCycleFixed" type="flex" justify="space-around">
        <el-col :span="24">
          <el-row type="flex" justify="space-around">
            <el-col :span="24">
              <div class="bg-white console h100 border-box">
                <header class="p20" style="border-bottom: 1px solid #efefef">
                  <div class="title inline-block fs16">任务周期</div>

                  <div class="options inline-block fr">
                    <el-button
                      class="theme-btn"
                      style="width: 120px"
                      @click="handleEditReminder"
                      >修 改
                    </el-button>
                  </div>
                </header>
                <el-form
                  ref="cycleInfo"
                  class="mt20 overflow p20"
                  label-position="right"
                >
                  <el-row type="flex" justify="space-around">
                    <el-col :span="24" class="mb15">
                      <el-form-item
                        label="开始时间："
                        prop="beginDate"
                        :label-width="labelWidth"
                      >
                        <span>{{ cycleInfo.beginDate  }}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row type="flex" justify="space-around">
                    <el-col :span="24" class="mb15">
                      <el-form-item
                        label="重复周期："
                        prop="cycle"
                        :label-width="labelWidth"
                      >
                        <span>{{ cycleInfo.cycle  }}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row type="flex" justify="space-around">
                    <el-col :span="24" class="mb15">
                      <el-form-item
                        label="派单对象："
                        prop="maintenanceUsers"
                        :label-width="labelWidth"
                      >
                        <span />
                        <el-tag
                          v-for="(item, i)  in userNames"
                          :key="item"
                          type="info"
                          class="mr15"
                          >{{ item  }}
                        </el-tag>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <!-- 跟进进度 -->

      <el-row
        v-if="isCycleFixed"
        type="flex"
        class="mt20"
        justify="space-around"
        :class="{ mt20: currStatus.status === 7 }"
      >
        <el-col :span="24">
          <el-row type="flex" justify="space-around">
            <el-col :span="24">
              <div class="bg-white console h100">
                <header class="p20" style="border-bottom: 1px solid #efefef">
                  <div class="title inline-block fs16">历史记录</div>
                  <div
                    class="options inline-block fr hand"
                    @click.prevent="handleHistoryMore"
                  >
                    <span class="label">
                      查看更多
                      <i class="el-icon-arrow-right" />
                    </span>
                  </div>
                </header>
                <el-timeline class="mt20 pt10 ml20">
                  <el-timeline-item
                    v-for="(item, index) in taskProgressList"
                    :key="index"
                  >
                    <span @click="handleHistory(item.id)">
                      <div class="inline-block mr20 pr10 vertical-top">
                        {{ item.createDate  }}
                      </div>
                      <div class="inline-block ml20">
                        <div>
                          {{ item.userInFo }}
                          <!-- <span class="ml10">{{ item.phone }}</span> -->
                        </div>
                        <div>
                          <span>工单得分 {{ item.evaluationStarLevel }}分</span>
                        </div>
                      </div></span
                    >
                  </el-timeline-item>
                </el-timeline>
              </div>
            </el-col>
          </el-row>
        </el-col>
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
      :grid-id="taskManagerDetailsForm.gridId"
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
      <el-select clearable v-model="urgentType" placeholder="请选择紧急程度">
        <el-option
          v-for="(item, index) in urgentTypeList"
          :key="index"
          :label="item.name"
          :value="item.number"
        />
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleModifyDegree">取 消</el-button>
        <el-button type="primary" @click="handleConfirmModify">确 定</el-button>
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
  getCycTaskManagerDetails,
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
    await this.getTaskManagerDetails();
    this.setProposalAndDegree();
    this.taskManagerDetailsForm.status === 7 && this.getTaskCommentList();
    this.getCycleInfo();
    this.getUrgentTypeList();
  },
  computed: {
    ...mapGetters(["pageSize", "pageNum", "queryStr", "permitIds", "loading"]),
    cycleFixed() {
      return "周期";
    },
    isCycleFixed() {
      if (this.description.cycleFixed == 1) {
        return true;
      } else {
        return false;
      }
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
      if (this.description.cycleFixed == 1) {
        return [17, 7];
      } else {
        return [24];
      }
    },
    currStatus() {
      const status = this.taskManagerDetailsForm.status;
      switch (status) {
        case 1:
          return { status: 1, msg: "待处理" };
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
          return { status: 1, msg: "待处理" };
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
    },
    handleDispatch(p) {
      typeof p == "string" ? (this.userId = p) : "";
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
      this.userNames = data.userNames ? data.userNames.split(",") : [];
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
      const { data } = await getCycTaskManagerDetails({
        taskManagerId: this.$route.query.id,
        // userId: +sessionStorage.getItem('userId')
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

<style scoped lang="less"></style>
