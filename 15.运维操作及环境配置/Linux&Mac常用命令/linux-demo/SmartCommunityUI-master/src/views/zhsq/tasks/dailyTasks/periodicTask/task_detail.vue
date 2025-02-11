<template>
  <el-row type="flex" class="bg-gray" justify="space-around">
    <el-row>
      <el-row type="flex" justify="space-around" class="mb10 radius">
        <el-col class="bg-white ">
          <header class="p10" style="border-bottom: 1px solid #efefef;">
            <div class="title inline-block fs16">{{ "任务描述" }}</div>
          </header>
          <div class="p20">
            <div style="width:33% ;" class="fl mb15">
              <i class="label ml20">发布人</i>
              <span class="bold ml20">{{ description.sbmtUserName }}</span>
              <!-- <b class="bold">|</b>
              <b class="bold">{{ description.phone }}</b> -->
            </div>
            <div style="width:43% ;" class="fl mb15">
              <i class="label ml20">发布时间</i>
              <span class="bold ml20">{{ description.smbtDate }}</span>
            </div>
            <div style="width:33% ;" class="fl mb15">
              <i class="label ml20">任务属性</i>
              <span class="bold ml20">{{
                description.cycleFixed == 2 ? "临时" : "周期"
              }}</span>
            </div>
            <div style="width:33% ;" class="fl mb15">
              <i class="label ml20">任务类型</i>
              <span class="bold ml20">{{ description.categoryName }}</span>
            </div>
            <div style="width:33% ;" class="fl mb15">
              <i class="label ml20">所属网格</i>
              <span class="bold ml20">{{ description.gridName }}</span>
            </div>
            <div style="width:33% ;" class="fl mb15">
              <i class="label ml20">所属社区</i>
              <span class="bold ml20">{{ description.communityName }}</span>
            </div>
            <div style="width:33% ;" class="fl mb15">
              <i class="label ml20">所属街道</i>
              <span class="bold ml20">{{ description.streetName }}</span>
            </div>

            <div style="width:100% ;display:flex;" class="fl mb15">
              <i class="label ml20">任务描述</i>
              <div>
                <p style="width:100% ;" class="bold ml20">
                  {{ description.remark }}
                </p>
				<el-image
                  class="mt10"
                  v-for="(item, i)  in description.photo"
                  :key="item"
                  style="width: 210px; height: 140px"
                  :src="item"
                  :preview-src-list="description.photo"
                >
                </el-image>

              </div>
            </div>
          </div>
        </el-col>
      </el-row>

      <el-row v-if="list.length" type="flex" justify="space-around" class="mb10 radius">
        <el-col :span="24">
          <div class="bg-white  h100 border-box">
            <header class="p20" style="border-bottom: 1px solid #efefef;">
              <div class="title inline-block fs16 p10">执行情况</div>
            </header>
            <section style class="mb20">
              <div
                v-for="(item, index) in list"
                :key="index"
                style="overflow:hidden;"
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
                  <div
                    class="fl ml20"
                    style="height:50px;line-height:50px;
              "
                  >
                    <i class="label mr20 fs13">{{ el.name }}</i>
                  </div>
                  <div v-if="el.name == '工时建议'">
                    <el-input type="number" v-model="form.repairTime">
                      <template slot="suffix">分钟</template>
                    </el-input>
                  </div>
                  <div v-else>
                    <p style="font-weight:Bold;height:50px;line-height:50px;">
                      {{ el.content }}
                    </p>
                    <div
                      v-if="el.photo"
                      class="flexDiv justify-around"
                      style="min-width:51%"
                    >
                      <img
                        v-for="(photo, index) in el.photo"
                        :key="index"
                        :src="photo"
                        alt
                        width="180"
                        height="140"
                        @click="handleShowPic(photo)"
                        class="mr10"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </el-col>
      </el-row>
      <el-row v-else type="flex" justify="space-around" class="bg-white mb10 radius">
          <el-col :span="24">
          <div class="bg-white  h100 border-box">
            <header class="p20" style="border-bottom: 1px solid #efefef;">
              <div class="title inline-block fs16 p10">执行情况</div>
            </header>
            <el-row type="flex" justify="center">
              <div class="zanwushuju">

              </div>
          </el-row>
          </div>

          </el-col>


      </el-row>
      <el-row v-if="$route.query.sta" class="bg-white">
        <Row class="mt20 bg-white" v-if="theDetail.status === 4">
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
                >通过</el-button
              >
            </div>
          </Col>
          <Col :type="'col-right'">
            <div></div>
          </Col>
        </Row>

        <Row class="mt20 bg-white" v-if="theDetail.status === 6">
          <Col :type="'align-center'">
            <div v-if="permitIds.includes('renwu_mine_pinjia')">
              <el-button @click="handleScoring">评 价</el-button>
            </div>
          </Col>
          <Col :type="'col-right'">
            <div></div>
          </Col>
        </Row>

        <Row class="mt20" v-if="theDetail.status">
          <Col :type="'align-center'" v-if="theDetail.status === 1">
            <div>
              <el-button
                @click="handleInvalid"
                v-if="permitIds.includes('renwu_mine_wuxiao')"
                >标记无效</el-button
              >
              <el-button
                class="theme-btn"
                v-if="
                  permitIds.includes('renwu_mine_paidan') &&
                    !userId &&
                    !isCycleFixed
                "
                @click="handleDispatch"
                >分派工单</el-button
              >
              <el-button
                v-if="permitIds.includes('renwu_mine_paidan') && userId"
                class="theme-btn"
                @click="handleConfirm"
                >提交</el-button
              >
            </div>
          </Col>
          <Col
            :type="'col-right'"
            v-if="theDetail.status === 2 || theDetail.status === 3"
          >
            <div class="bg-white">
              <el-button
                class="theme-btn"
                @click="handleInvalid"
                v-if="permitIds.includes('renwu_mine_wuxiao') && !userId"
                >撤销任务</el-button
              >
              <!-- <el-button
                class="theme-btn"
                @click="handleReminderDispatch"
                v-if="
                  permitIds.includes('work_task_cuiWEB') &&
                    theDetail.status == 3
                "
                >催办</el-button
              > -->
            </div>
          </Col>
        </Row>
      </el-row>
    </el-row>
    <el-row class="ml20">
      <!-- 任务周期 class="mb10 radius" -->
      <el-row type="flex" justify="space-around">
        <el-col :span="24">
          <div class="bg-white  h100 renwu radius">
            <header class="p20" style="border-bottom: 1px solid #efefef;">
              <div class="title inline-block fs16 p10">任务周期</div>

              <div class="options inline-block fr">
                <!-- <el-button
                      class="theme-btn m10"
                      style="width: 120px;"
                      v-if="permitIds.includes('renwu_cyclicity_xiugai')"
                      @click="handleEditReminder"
                      >修 改</el-button> -->

                <section
                  class="theme-btn m10"
                  style="width: 120px;display:flex; cursor:pointer;justify-content: center;"
                  @click="handleEditReminder"
                >
                  <i
                    class="el-icon-edit mr10 fs14"
                    style="color:#a8a9ad;line-height:21px;"
                  ></i>
                  <i class="fs14" style="font-style:normal;color: #3083F2;">修 改</i>
                </section>
              </div>
            </header>
            <el-form
              ref="cycleInfo"
              class="mt20 overflow p20"
              label-position="right"
            >
              <el-row type="flex" justify="space-around">
                <el-col :span="12" class="mb15">
                  <el-form-item
                    label="开始时间："
                    prop="beginDate"
                    :label-width="labelWidth"
                  >
                    <span>{{ cycleInfo.beginDate  }}</span>
                  </el-form-item>
                </el-col>

                <el-col :span="12" class="mb15">
                  <el-form-item
                    label="重复周期："
                    prop="cycle"
                    :label-width="labelWidth"
                  >
                    <span>{{ cycleInfo.cycle  }}</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-col>
      </el-row>

      <el-row type="flex" class="mt20 radius" justify="space-around">
        <el-col :span="24">
          <el-row type="flex" justify="space-around">
            <el-col :span="24">
              <div class=" h100">
                <header class="p20">
                  <div class="title inline-block fs16 p10">历史记录</div>
                  <div
                    class="options inline-block fr hand"
                    @click.prevent="handleHistoryMore"
                  >
                    <span class="label LookMorre" v-if='taskProgressList==[]'>
                      查看更多
                      <i class="el-icon-arrow-right"></i>
                    </span>
                  </div>
                </header>
                <el-timeline v-if="taskProgressList.length" class="mt20 pt10 ml20">
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
                <el-row type="flex" justify="center">
                  <div class="zanwushuju"

                  ></div>
                </el-row>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-row>
    <HistoryMore
      :detailDialog="historyMore"
      @close="handleHistoryMore"
      :loading="loading"
    ></HistoryMore>
    <PhotoDialog
      @showPic="handleShowPic"
      :showPic="showPic"
      :isShowPic="isShowPic"
    ></PhotoDialog>
    <ReminderDialog
      :ids="ids"
      :title="title"
      @close="hanleClose"
      @update="handleUpdate"
      @dispatch="hanleDispatch"
      :reminderForm="reminderForm"
      :reminderDialog="reminderDialog"
      @getReminderInfo="handleGetReminderInfo"
      :reminderObjectsName="reminderObjectsName"
      :theRow='{id:this.$route.query.id}'
    ></ReminderDialog>
    <ReminderDispatchDialog
      :dispatchDialog="reminderDispatch"
      :depatchType="'RWLB'"
      :id="$route.query.id"
      @closeDispatch="handleReminderDispatch"
      @setReminder="reminder"
    />
    <DispatchDialog
      :dispatchDialog="dispatchDialog"
      :depatchType="'RWLB'"
      @closeDispatch="handleDispatch"
    />
    <NoticeDialog
      :title="title"
      @close="hanleClose"
      :noticeList="noticeList"
      :noticeDialog="noticeDialog"
      @getNotice="handleGetNotice"
    ></NoticeDialog>

    <AuditScoringDialog
      @close="handleScoring"
      :repairId="$route.query.id"
      :repairType="'RWLB'"
      :auditScoringDialog="auditScoringDialog"
      :categoryId="theDetail.categoryId"
      @update="getTaskManagerDetails"
    ></AuditScoringDialog>
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
  getCycTask,
  getLoadOne,
  setReminderDispatch,
  teskExamineHistory,
  setAllTask
} from "@/api/engineering";
import { mapGetters } from "vuex";
import Row from "@/components/MyComponents/row";
import Col from "@/components/MyComponents/col";
import { vlength } from "@/utils/verification.js";
import PhotoDialog from "@/components/MyComponents/photo_dialog";
import { getAllDictionary } from "@/api/dictionary";
import NoticeDialog from "@/components/MyComponents/notice_dialog";
import ReminderDialog from "@/components/MyComponents/reminder_dialog";
import DispatchDialog from "@/components/MyComponents/dispatch_dialog";
import HistoryMore from "./components/history_more_dialog";
import ReminderDispatchDialog from "@/components/MyComponents/reminder_dispatch_dialog";
import AuditScoringDialog from "./components/audit_scoring_dialog";

export default {
  name: "Task_detail",
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
      labelWidth: "90px",
      noticeDialog: false,
      auditScoringDialog: false,
      taskManagerForm: {},
      genjinList: [],
      list: [],
      form: {
        urgentType: "",
        repairType: "",
        repairHomeType: "",
        repairTime: ""
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
      reminderDialog: false,
      dispatchDialog: false,
      systemEvaluation: [],
      reminderObjectIds: [],
      taskManagerDetailId: 0,
      reminderObjectsName: [],
      taskManagerDetailsForm: {},
      noticeList: [
       '任务未完成',
        '任务完成情况未达到预期',
        '任务核查未通过',
        '其他'
      ],
      rules: {
        remark: {
          validator: vlength(2, 400, "请输入任务描述"),
          trigger: "blur"
        }
      }
    };
  },
  filters:{
    DataFiterl(val){
  	  let str=val.toString()
  	  return str.substring(0,10)+ '  '+ str.substring(11,19)
    }
  },
  async created() {
    this.getProgressStatusList();

    this.getCycleDetail();
    this.getCycleInfo();
    await this.getTaskId();
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
      return this.theDetail.cycleFixed === 1 ? true : false;
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
      return [17, 7];
    },
    currStatus() {
      const status = this.taskManagerDetailsForm.status;
      switch (status) {
        case 1:
          return { status: 1, msg: "待派单" };
          break;
        case 2:
          return { status: 2, msg: "处理中" };
          break;
        case 3:
          return { status: 3, msg: "维修中" };
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
      const status = this.theDetail.status;
      switch (status) {
        case 1:
          return { status: 1, msg: "待派单" };
          break;
        case 2:
          return { status: 2, msg: "待接单" };
          break;
        case 3:
          return { status: 3, msg: "维修中" };
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
    }
  },
  methods: {
    handleScoring() {
      this.auditScoringDialog = !this.auditScoringDialog;
    },
    handleHistory(id) {
      this.$router.push({
        name: "taskDetail",
        query: { id }
      });
      this.$router.go(0);
    },
    async getUrgentTypeList() {
      const { rows } = await getAllDictionary({
        fieldName: "urgentType"
      });
      this.urgentTypeList = rows;
    },
    //// 修改紧急程度 ！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
    handleModifyDegree() {
      this.modifyDegree = !this.modifyDegree;
    },
    async handleConfirmModify() {
      const o = await setAllTask({
        detailsId: this.$route.query.id,
        type: 3,
        urgentType: this.urgentType
      });
      if (o && o.code == 200) {
        this.$notify({
          title: o.msg,
          type: "success"
        });
      } else {
        this.$notify({
          title: o.msg,
          type: "fail"
        });
      }
      this.handleModifyDegree();
      this.getTaskManagerDetails();
    },
    // 查看历史记录
    handleHistoryMore() {
      //
      this.historyMore = !this.historyMore;
    },
    handleReject() {
      this.title = "维修驳回";
      this.noticeDialog = !this.noticeDialog;
    },
    //催办
    handleReminderDispatch() {
      this.reminderDispatch = !this.reminderDispatch;
    },
    async reminder(userIds) {
      const o = await setReminderDispatch({
        id: this.$route.query.id,
        cood: "RWLB",
        userIds
      });
      if (o && o.code == 200) {
        this.$notify({
          title: "催办成功！！"
        });
      }
    },
    async handleInvalid() {
      // 标记无效
      this.$confirm(`确定标记无效, 是否继续?`, "提示", {
        type: "warning",
        cancelButtonText: "取消",
        confirmButtonText: "确定"
      })
        .then(() => {
          const params = {
            id: this.$route.query.id,
            status: 8
          };
          let formData = new FormData();
          formData.append("id", this.$route.query.id);
          formData.append("status", 8);

          teskExamine(formData).then(res => {
            if (res && res.code === "200") {
              this.$router.go(-1);
              this.$notify({
                title: res.msg,
                type: "success"
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
          title: "请输入工时建议"
        });
      }
      const params = {
        id: this.$route.query.id,
        userId: this.userId,
        urgentType: this.form.urgentType,
        repairTime: this.form.repairTime
      };
      setTesk_Dispath(params).then(res => {
        if (res && res.code === "200") {
          this.$notify({
            title: res.msg,
            type: "success"
          });
        }
      });

      // this.setRepairType()
      this.getTaskManagerDetails();
      // this.getCommentList();
      this.getProgressStatusList();
    },
    //  插入工时建议
    setProposalAndDegree() {
      if (
        this.theDetail.status == 1 &&
        this.permitIds.includes("work_task_dispatch")
      )
        this.list[0].splice(3, 0, { name: "工时建议" });
    },
    handleEditTask() {
      this.idEditTask = !this.idEditTask;
    },
    handleShowPic(data) {
      this.showPic = data;
      this.isShowPic = !this.isShowPic;
    },
    async getProgressStatusList() {
      //跟进
      const { rows } = await getRepairTrack({
        cood: "RWLB",
        detailsId: this.$route.query.id
      });
      this.genjinList = rows;
    },
    async getCycleInfo() {
      const { data } = await getCycleInfo({
        taskManagerId: this.taskManagerId
      });
      this.cycleInfo = data;
      this.userNames = data.userNames ? data.userNames.split(",") : [];
    },
    async getCycleDetail() {
      const o = await getLoadOne({
        taskManagerId: this.$route.query.id
      });
	  this.description = o.data;
      if (o && o.code == 200 && o.data.photos!= []) {
        this.description.photo = o.data.photos.split(",");
      }

    },
    async getTaskId() {
      const { data } = await getCycTask({
        taskManagerId: this.$route.query.id
      });
      if(data > 0 ){
      this.getTaskManagerDetails(data);
      this.getTaskHistory(data);
      }else{

      }


    },
    // 获取详情
    async getTaskManagerDetails(id) {
      const { data } = await getTaskManagerDetails({
        noApp: 1,
        cood: "RWLB",
        id,
        userId: +sessionStorage.getItem("userId")
      });
      this.form.urgentType = data.urgentType;
      this.theDetail = data;
      this.list = data.result;
      this.list.forEach(i => {
        i.forEach(el => {
          el.photo = el.photo ? el.photo.split(",") : "";
        });
      });

      this.taskManagerDetailsForm = data || {};
      this.taskManagerDetailId = data ? data.id : 0;
    },
    async getTaskHistory(masterId) {
      const o = await teskExamineHistory({
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        // propertyId: +sessionStorage.getItem("propertyId"),
        masterId
      });
      this.taskProgressList = o.data.records;
    },
    handleUpdate() {
      this.getTaskManagerDetails();
    },
    async getTaskCommentList() {
      const { data } = await getTaskComment({
        taskManagerId: this.taskManagerId
      });
      this.taskComment = data;
      this.userEvaluation = [];
      this.systemEvaluation = [];
      if (data) {
        data.systemEvaluation.forEach(item => {
          this.systemScore += item.score ? +item.score : 0;
          this.systemEvaluation.push(item);
        });
        data.userEvaluation.forEach(item => {
          this.userScore += item.status ? +item.score : 0;
          this.userEvaluation.push(item);
        });
      }
    },
    async getImportantLevelList() {
      const res = await getAllDictionary({
        fieldName: "importantLevel"
      });
      this.importantLevelList = res.rows;
    },
    handleGetNotice(props) {
      const params = {
        userId: sessionStorage.getItem("userId"),
        detailsId: this.$route.query.id,
        remark: props.notice === "其他" ? props.noticeTextArea : props.notice,
        type: 2
      };
      taskExamine(params).then(res => {
        if (res && res.code === "200") {
          this.$router.go(-1);
          this.$notify({
            title: res.msg,
            type: "success"
          });
        }
      });
    },
    handleEditReminder() {
      this.title = "任务周期";
      this.reminderForm = {
        id:this.$route.query.id,
        beginDate: this.cycleInfo.beginDate,
        cycleNum: this.cycleInfo.cycleNum,
        cycleType: String(this.cycleInfo.cycleType)
      };
      this.deptIds = this.cycleInfo.departmentIds;
      this.reminderObjectsName = this.userNames;
      this.reminderDialog = !this.reminderDialog;
    },
    handleGetReminderInfo({ beginDate, cycleNum, cycleType }) {
      // let reminderObjectIds = null;
      // if (this.reminderObjectIds.length) {
      //   reminderObjectIds = this.reminderObjectIds.map(item => item.id);
      // } else {
      //   reminderObjectIds = this.cycleInfo.userIds;
      // }

      const formData = new FormData();
      formData.append("cycleNum", cycleNum);
      formData.append("cycleType", cycleType);
      formData.append(
        "beginDate",
        beginDate + ' 00:00:00'
      );
      formData.append("id", this.taskManagerId);
      // formData.append("userIds", reminderObjectIds.join(","));
      editTask(formData).then(res => {
        if (res && res.code == "200") {
          this.$notify({
            title: res.msg,
            type: "success"
          });
          this.getCycleInfo();
        }
      });
    },
    hanleCloseDispatch(props) {
      this.dispatchDialog = false;
      this.reminderObjectIds = props ? props : [];
      this.reminderObjectsName = props ? props.map(item => item.name) : [];
    },
    handleCancelTask() {
      this.$confirm("此操作将取消该任务, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          cancelTask({ taskManagerId: this.taskManagerId }).then(res => {
            if (res && res.code === "200") {
              this.$router.go(-1);
              this.$notify({
                title: res.msg,
                type: "success"
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
        userId: sessionStorage.getItem("userId")
      };

      taskExamine(params).then(res => {
        if (res && res.code === "200") {
          this.$router.go(-1);
          this.$notify({
            title: res.msg,
            type: "success"
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
    }
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
    AuditScoringDialog
  }
};
</script>

<style scoped>
.zanwushuju{
  margin: 10px;
  width: 220px;
  height: 200px;
  background:url(./qsy.svg) no-repeat center ;
}
.radius {
  border-radius: 12px;
  overflow: hidden;
}
.renwu {
  width: 420px;
  height: 140px;
  background: #ffffff;
}
.bianji_i {
  background: url(./btn_edit1.svg);
}
.bianji_i :hover {
  background: url(./btn_edit2.svg);
}

.bg-gray {
  background: #f0f3f7;
}
.title {
  font-size: 13px;
  font-family: Microsoft YaHei, Microsoft YaHei-Bold;
  font-weight: 700;
  text-align: left;
  color: #3e3e3e;
}
.LookMorre{
	font-size: 12px;
}
</style>
