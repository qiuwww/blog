<template>
  <Modal v-model="show" :title="editTitle" :mask-closable="false" class="looktZhsqTaskList" :width="1200">
  <el-row type="flex" justify="space-around">
    <el-col :span="showBig[0]">
      <el-row type="flex" justify="space-around" class="mb10" v-if="theDetail.cycleFixed == 1">
        <el-col class="bg-white console">
          <header class="p10" style="border-bottom: 1px solid #efefef;">
            <div class="title inline-block fs16">{{ '任务描述' }}</div>
            <div class="options inline-block fr">
              <el-button class="theme-btn">修改任务</el-button>
            </div>
          </header>
          <div class="p20">
            <div style="width:50% ;" class="fl mb15">
              <i class="label ml20">发布人</i>
              <span class="bold ml20">{{ description.sbmtUserName }}</span>
              <!-- <b class="bold">|</b>
              <b class="bold">{{ description.phone }}</b> -->
            </div>
            <div style="width:50% ;" class="fl mb15">
              <i class="label ml20">发布时间</i>
              <span class="bold ml20">{{ description.smbtDate }}</span>
            </div>
            <div style="width:50% ;" class="fl mb15">
              <i class="label ml20">任务属性</i>
              <span class="bold ml20">{{ description.cycleFixed == 2 ? '临时' : '周期' }}</span>
            </div>
            <div style="width:50% ;" class="fl mb15">
              <i class="label ml20">任务类型</i>
              <span class="bold ml20">{{ description.categoryName }}</span>
            </div>
            <div style="width:50% ;" class="fl mb15">
              <i class="label ml20">任务描述</i>
              <span class="bold ml20">{{ description.remark }}</span>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex" v-if="!isCycleFixed" justify="space-around">
        <el-col :span="24">
          <div class="bg-white console h100 border-box">
            <header class="p20" style="border-bottom: 1px solid #efefef;">
              <div class="title inline-block fs16">任务详情</div>
              <div class="options inline-block fr">
                <i class="bold theme">
                  {{ status.msg }}
                </i>
              </div>
            </header>
            <section class="mb20">
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
                    style="height:50px;line-height:50px;"
                  >
                    <i class="label mr20 fs13">{{ el.name }}</i>
                  </div>
                  <div v-if="el.name == '工时建议'" class="form-inp">
                    <el-input type="number" v-model="form.repairTime">
                      <template slot="suffix">分钟</template>
                    </el-input>
                  </div>

                  <div v-else>
                    <p style="font-weight:Bold;height:50px;line-height:50px;">
                      {{ el.content }}
                    </p>
                    <el-button v-if="el.name == '紧急程度'" @click="handleModifyDegree">
                      修 改
                    </el-button>
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
      <el-row type="flex" justify="space-around" v-else>
        <el-col :span="24">
          <div class="bg-white console h100 border-box">
            <header class="p20" style="border-bottom: 1px solid #efefef;">
              <div class="title inline-block fs16">最新情况</div>
            </header>
            <section class="mb20">
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
      <el-row class="bg-white pb20">
        <Row class="mt20 bg-white" v-if="theDetail.status === 4">
          <Col :type="'align-center'">
            <div v-if="permitIds.includes('work_task_review')">
              <el-button @click="handleReject">驳回</el-button>
              <el-button class="theme-btn" @click="handlePass">通过</el-button>
            </div>
          </Col>
          <Col :type="'col-right'">
            <div></div>
          </Col>
        </Row>


        <Row class="mt20 bg-white" v-if="theDetail.status === 6">
          <Col :type="'align-center'">
            <div v-if="permitIds.includes('work_task_review')">
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
                v-if="permitIds.includes('work_task_invalidWEB')"
              >标记无效
              </el-button
              >
              <el-button
                class="theme-btn"
                v-if="permitIds.includes('work_task_dispatch') && !userId && !isCycleFixed"
                @click="handleDispatch"
              >分派工单
              </el-button
              >
              <el-button v-if="permitIds.includes('work_task_dispatch')&&userId" class="theme-btn"
                         @click="handleConfirm"
              >提交
              </el-button
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
                v-if="permitIds.includes('work_task_invalidWEB') && !userId"
              >撤销任务
              </el-button
              >
              <el-button
                class="theme-btn"
                @click="handleReminderDispatch"
                v-if="
                  permitIds.includes('work_task_cuiWEB') &&
                    theDetail.status == 3
                "
              >催办
              </el-button
              >
            </div>
          </Col>
        </Row>
      </el-row>
    </el-col>
    <el-col :span="showBig[1]" class="ml20">
      <!-- 评价打分 -->
      <el-row
        type="flex"
        justify="space-around"
        v-if="currStatus.status === 7 && !isCycleFixed"
      >
        <el-col :span="24">
          <div class="bg-white console h100 border-box">
            <header class="p20" style="border-bottom: 1px solid #efefef;">
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
                ></el-progress>
              </div>
              <div class="p20">
                <div
                  v-for="(item, i) in systemEvaluation"
                  :key="i"
                  class="mt15"
                >
                  <el-tag type="info" class="mr10">系统</el-tag>
                  {{ item.remark  }}
                  <span class="fr" v-if="item.status">
                    <i class="fa fa-check" aria-hidden="true"></i>
                    +{{ item.score }}分
                  </span>
                </div>
              </div>
              <div class="p20" style="border-bottom: 1px solid #efefef;">
                <div v-for="(item, i) in userEvaluation" :key="i" class="mt15">
                  {{ item.remark  }}
                  <span class="fr">
                    <i class="fa fa-check" aria-hidden="true"></i>
                    +{{ item.score }}分
                  </span>
                </div>
              </div>
              <div class="mt20 p20">
                <div class="inline-block">
                  <img
                    alt
                    v-if="taskComment.userHeadPhoto"
                    :src="taskComment.userHeadPhoto"
                    width="60px"
                    height="60px"
                  />

                </div>
                <span class="fr">
                   <span>{{ taskComment.userName  }}</span>
                  <span>{{ taskComment.evaluationDate  }}
                    </span>
                </span>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
      <!-- 任务周期 -->
      <el-row
        type="flex"
        justify="space-around"

        v-if="isCycleFixed"
      >
        <el-col :span="24">
          <el-row type="flex" justify="space-around">
            <el-col :span="24">
              <div class="bg-white console h100 border-box">
                <header class="p20" style="border-bottom: 1px solid #efefef;">
                  <div class="title inline-block fs16">任务周期</div>

                  <div class="options inline-block fr">
                    <el-button
                      class="theme-btn"
                      style="width: 120px;"
                      v-if="permitIds.includes('work_task_update')"
                      @click="handleEditReminder"
                    >修 改
                    </el-button
                    >
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
                        <span></span>
                        <el-tag
                          type="info"
                          :key="item"
                          class="mr15"
                          v-for="(item, i)  in userNames"
                        >{{ item  }}
                        </el-tag
                        >
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
        type="flex"
        justify="space-around"
        :class="{ mt20: currStatus.status === 7 }"
        v-if="genjin"
      >
        <el-col :span="24">
          <el-row type="flex" justify="space-around">
            <el-col :span="24">
              <div class="bg-white console h100 border-box">
                <header class="p20" style="border-bottom: 1px solid #efefef;">
                  <div class="title inline-block fs16">跟进进度</div>
                </header>
                <el-timeline class="mt20 p20 ml20">
                  <el-timeline-item
                    v-for="(item, index) in genjinList"
                    :key="index"
                  >
                    <div class="inline-block mr20 pr10 vertical-top">
                      {{ item.createDate  }}
                    </div>
                    <div class="inline-block ml20 pl20">
                      <div>{{ item.content  }}</div>
                      <div>
                        <!-- {{ item.userName  }} -->
                        <span class="theme ml10">
                          <!-- {{ item.userPhone  }} -->
                        </span>
                      </div>
                    </div>
                  </el-timeline-item>
                </el-timeline>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row
        type="flex"
        class="mt20"
        v-if="isCycleFixed"
        justify="space-around"
        :class="{ mt20: currStatus.status === 7 }"
      >
        <el-col :span="24">
          <el-row type="flex" justify="space-around">
            <el-col :span="24">
              <div class="bg-white console h100">
                <header class="p20" style="border-bottom: 1px solid #efefef;">
                  <div class="title inline-block fs16">历史记录</div>
                  <div
                    class="options inline-block fr hand"
                    @click.prevent="handleHistoryMore"
                  >
                    <span class="label">
                      查看更多
                      <i class="el-icon-arrow-right"></i>
                    </span>
                  </div>
                </header>
                <el-timeline class="mt20 pt10 ml20">
                  <el-timeline-item
                    v-for="(item, index) in taskProgressList"
                    :key="index"
                  > <span @click="handleHistory(item.id)">
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
                    </div></span>
                  </el-timeline-item>
                </el-timeline>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-col>
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
    <el-dialog
      title="修改紧急程度"
      :visible.sync="modifyDegree"
      width="30%"
      :before-close="handleModifyDegree" append-to-body>
      <el-select  clearable placeholder="请选择紧急程度" v-model="urgentType">
        <el-option
          :key="index"
          :label="item.name"
          :value="item.number"
          v-for="(item, index) in urgentTypeList"
        ></el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
    <el-button @click="handleModifyDegree">取 消</el-button>
    <el-button type="primary" @click="handleConfirmModify">确 定</el-button>
  </span>
    </el-dialog>
    <AuditScoringDialog
      @close="handleScoring"
      :repairId="$route.query.id"
      :repairType="'RWLB'"
      :auditScoringDialog="auditScoringDialog"
      :categoryId="theDetail.categoryId"
      @update="getTaskManagerDetails"
    ></AuditScoringDialog>
  </el-row>
    <div slot="footer">
      <Button type="text" @click="show=false">取消</Button>
    </div>
  </Modal>
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
    setAllTask
  } from '@/api/engineering'
  import { mapGetters } from 'vuex'
  import Row from '@/components/MyComponents/row'
  import Col from '@/components/MyComponents/col'
  import { vlength } from '@/utils/verification.js'
  import PhotoDialog from '@/components/MyComponents/photo_dialog'
  import { getAllDictionary } from '@/api/dictionary'
  import NoticeDialog from '@/components/MyComponents/notice_dialog'
  import ReminderDialog from '@/components/MyComponents/reminder_dialog'
  import DispatchDialog from '@/components/MyComponents/dispatch_dialog'
  import HistoryMore from '@/views/zhsq/tasks/dailyTasks/dailyTasksList/components/history_more_dialog'
  import ReminderDispatchDialog from '@/components/MyComponents/reminder_dispatch_dialog'
  import AuditScoringDialog from '@/views/zhsq/tasks/dailyTasks/dailyTasksList/components/audit_scoring_dialog'

  export default {
    name: 'Task_detail',
    props: {
      value: {
        type: Boolean,
        default: false
      },
      TZhsqTaskListId: {
        type: String
      },
      modalTitle: {
        type: String
      }
    },
    data() {
      return {
        show: this.value,
        editTitle: this.modalTitle,
        ids: [],
        title: '',
        showPic: '',
        deptIds: '',
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
        labelWidth: '130px',
        noticeDialog: false,
        auditScoringDialog: false,
        taskManagerForm: {},
        genjinList: [],
        list: [],
        form: {
          urgentType: '',
          repairType: '',
          repairHomeType: '',
          repairTime: ''
        },
        theDetail: {},
        userId: '',
        reminderDispatch: false,
        modifyDegree: false,
        urgentType: '',
        urgentTypeList: [],
        historyMore: false,
        eventId:this.TZhsqTaskListId,
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
         '任务未完成',
        '任务完成情况未达到预期',
        '任务核查未通过',
        '其他'
        ],
        rules: {
          remark: {
            validator: vlength(2, 400, '请输入任务描述'),
            trigger: 'blur'
          }
        }
      }
    },
    computed: {
      ...mapGetters(['pageSize', 'pageNum', 'queryStr', 'permitIds', 'loading']),
      cycleFixed() {
        return this.theDetail.cycleFixed === 1 ? '周期' : '临时'
      },
      isCycleFixed() {
        return this.theDetail.cycleFixed === 1 ? true : false
      },
      genjin() {
        if (this.genjinList.length) {
          return true
        } else {
          return false
        }
      },
      totalScore() {
        return this.systemScore + this.userScore
      },
      showBig() {
        if (!(this.theDetail.cycleFixed === 1)) {
          if (this.taskCategoryList.length) {
            return [17, 7]
          } else if (this.genjinList.length) {
            return [17, 7]
          } else {
            return [24, 0]
          }
        } else {
          return [17, 7]
        }
      },
      currStatus() {
        const status = this.taskManagerDetailsForm.status
        switch (status) {
          case 1:
            return { status: 1, msg: '待派单' }
            break
          case 2:
            return { status: 2, msg: '处理中' }
            break
          case 3:
            return { status: 3, msg: '维修中' }
            break
          case 4:
            return { status: 4, msg: '待审核' }
            break
          case 5:
            return { status: 5, msg: '驳回' }
            break
          case 6:
            return { status: 6, msg: '完成' }
            break
          case 7:
            return { status: 7, msg: '评价' }
            break
          case 9:
            return { status: 9, msg: '搁置' }
            break
          default:
            return { status: 8, msg: '无效' }
            break
        }
      },
      status() {
        const status = this.taskManagerDetailsForm.status
        switch (status) {
          case 1:
            return { status: 1, msg: '待派单' }
            break
          case 2:
            return { status: 2, msg: '处理中' }
            break
          case 3:
            return { status: 3, msg: '维修中' }
            break
          case 4:
            return { status: 4, msg: '待审核' }
            break
          case 5:
            return { status: 5, msg: '驳回' }
            break
          case 6:
            return { status: 6, msg: '完成' }
            break
          case 7:
            return { status: 7, msg: '评价' }
            break
          case 9:
            return { status: 9, msg: '搁置' }
            break
          default:
            return { status: 8, msg: '无效' }
            break
        }
      },
      photoList() {
        return this.taskManagerForm.photos
          ? this.taskManagerForm.photos.split(',')
          : []
      },
      completePhotoList() {
        return this.taskManagerDetailsForm.completePhotos
          ? this.taskManagerDetailsForm.completePhotos.split(',')
          : []
      },
      // taskManagerId() {
      //   return this.taskManagerId;
      // }
    },
    methods: {
      handleScoring() {
        this.auditScoringDialog = !this.auditScoringDialog
      },
      handleHistory(id) {
        this.$router.push({
          name: 'taskDetail',
          query: { id }
        })
        this.$router.go(0)
      },
      async getUrgentTypeList() {
        const { data } = await getAllDictionary({
          fieldName: 'urgentType'
        })
        this.urgentTypeList = data
      },
      //// 修改紧急程度 ！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
      handleModifyDegree() {
        this.modifyDegree = !this.modifyDegree
      },
      async handleConfirmModify() {
        const o = await setAllTask({
          id: this.eventId,
          urgentType: this.urgentType
        })
        if (o && o.code == 200) {
          this.$notify({
            title: o.msg,
            type: 'success'
          })
        } else {
          this.$notify({
            title: o.msg,
            type: 'fail'
          })
        }
        this.handleModifyDegree()
        this.getTaskManagerDetails()
      },
      // 查看历史记录
      handleHistoryMore() {
        this.historyMore = !this.historyMore
      },
      // handleReject() {
      //   this.title = "维修驳回";
      //   this.noticeDialog = !this.noticeDialog;
      // },
      //催办
      handleReminderDispatch() {
        this.reminderDispatch = !this.reminderDispatch
      },
      async reminder(userIds) {
        const o = await setReminderDispatch({
          id: this.TZh,
          cood: 'RWLB',
          userIds
        })
        if (o && o.code == 200) {
          this.$notify({
            title: '催办成功！！'
          })
        }
      },
      async handleInvalid() {
        // 标记无效
        this.$confirm(`确定标记无效, 是否继续?`, '提示', {
          type: 'warning',
          cancelButtonText: '取消',
          confirmButtonText: '确定'
        })
          .then(() => {
            const params = {
              id: this.eventId,
              status: 8
            }
            let formData = new FormData()
            formData.append('id',this.eventId)
            formData.append('status', 8)

            teskExamine(formData).then(res => {
              if (res && res.code === '200') {
                this.$router.go(-1)
                this.$notify({
                  title: res.msg,
                  type: 'success'
                })
              }
            })
          })
          .catch(() => {
            this.$message('已取消标记无效')
          })
      },
      handleDispatch(p) {
        typeof p == 'string' ? (this.userId = p) : ''
        this.dispatchDialog = !this.dispatchDialog
      },
      // 派单提交
      async handleConfirm() {
        if (!this.form.repairTime) {
          return this.$notify({
            title: '请输入工时建议'
          })
        }
        const params = {
          id: this.eventId,
          userId: this.userId,
          urgentType: this.form.urgentType,
          repairTime: this.form.repairTime
        }
        setTesk_Dispath(params).then(res => {
          if (res && res.code === '200') {
            this.$notify({
              title: res.msg,
              type: 'success'
            })
          }
        })

        // this.setRepairType()
        this.getTaskManagerDetails()
        // this.getCommentList();
        this.getProgressStatusList()
      },
      //  插入工时建议
      setProposalAndDegree() {
        if (this.theDetail.status == 1 && this.permitIds.includes('work_task_dispatch')) {
          this.list[0].splice(3, 0, { name: '工时建议' })
        }
      },

      handleShowPic(data) {
        this.showPic = data
        this.isShowPic = !this.isShowPic
      },
      async getProgressStatusList() {
        //跟进
        const { data } = await getRepairTrack({
          cood: 'RWLB',
          detailsId: this.eventId
        })
        this.genjinList = data
      },
      async getCycleInfo() {
        const { data } = await getCycleInfo({
          taskManagerId: this.eventId
        })
        this.cycleInfo = data
        this.userNames = data.userNames ? data.userNames.split(',') : []
      },
      async getCycleDetail() {
        const o = await getLoadOne({
          taskManagerId: this.eventId
        })
        if (o && o.code == 200) {
          this.description = o.data
        }
      },
      // 获取详情
      async getTaskManagerDetails() {
        const { data } = await getTaskManagerDetails({
          noApp: 1,
          cood: 'RWLB',
          id: this.eventId,
          userId: +sessionStorage.getItem('userId')
        })
        this.form.urgentType = data.urgentType
        this.theDetail = data
        this.list = data.result
        this.list.forEach(i => {
          i.forEach(el => {
            el.photo = el.photo ? el.photo.split(',') : ''
          })
        })

        this.taskManagerDetailsForm = data || {}
        this.taskManagerDetailId = data ? data.id : 0
      },
      async getTaskHistory() {
        const o = await teskExamineHistory({
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          gridId: +sessionStorage.getItem('gridId'),
          masterId: this.eventId
        })
        this.taskProgressList = o.data.records
      },
      handleUpdate() {
        this.getTaskManagerDetails()
      },
      async getTaskCommentList() {
        const { data } = await getTaskComment({
          taskManagerId: this.eventId
        })
        this.taskComment = data
        this.userEvaluation = []
        this.systemEvaluation = []
        if (data) {
          data.systemEvaluation.forEach(item => {
            this.systemScore += item.score ? +item.score : 0
            this.systemEvaluation.push(item)
          })

        }
      },

      handleGetNotice(props) {
        const params = {
          userId: sessionStorage.getItem('userId'),
          detailsId: this.eventId,
          remark: props.notice === '其他' ? props.noticeTextArea : props.notice,
          type: 2
        }
        taskExamine(params).then(res => {
          if (res && res.code === '200') {
            this.$router.go(-1)
            this.$notify({
              title: res.msg,
              type: 'success'
            })
          }
        })
      },
      handleEditReminder() {
        this.title = '任务周期'
        this.reminderForm = {
          beginDate: this.cycleInfo.beginDate,
          cycleNum: this.cycleInfo.cycleNum,
          cycleType: String(this.cycleInfo.cycleType)
        }
        this.deptIds = this.cycleInfo.departmentIds
        this.reminderObjectsName = this.userNames
        this.reminderDialog = !this.reminderDialog
      },
      handleGetReminderInfo({ beginDate, cycleNum, cycleType }) {
        let reminderObjectIds = null
        if (this.reminderObjectIds.length) {
          reminderObjectIds = this.reminderObjectIds.map(item => item.id)
        } else {
          reminderObjectIds = this.cycleInfo.userIds
        }

        const formData = new FormData()
        formData.append('cycleNum', cycleNum)
        formData.append('cycleType', cycleType)
        formData.append(
          'beginDate',
          this.$moment(beginDate).format('YYYY-MM-DD HH:mm:ss')
        )
        formData.append('id', this.eventId)
        formData.append('userIds', reminderObjectIds.join(','))
        editTask(formData).then(res => {
          if (res && res.code === '200') {
            this.$notify({
              title: res.msg,
              type: 'success'
            })
            this.getCycleInfo()
          }
        })
      },

      handleCancelTask() {
        this.$confirm('此操作将取消该任务, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            cancelTask({ taskManagerId: this.eventId }).then(res => {
              if (res && res.code === '200') {
                this.$router.go(-1)
                this.$notify({
                  title: res.msg,
                  type: 'success'
                })
              }
            })
          })
          .catch(() => {
            this.$message('已取消操作')
          })
      },
      hanleClose() {
        this.noticeDialog = false
        this.reminderDialog = false
      },
      handlePass() {
        const params = {
          type: 1,
          detailsId: this.eventId,
          userId: sessionStorage.getItem('userId')
        }

        taskExamine(params).then(res => {
          if (res && res.code === '200') {
            this.$router.go(-1)
            this.$notify({
              title: res.msg,
              type: 'success'
            })
          }
        })
      },
      handleReject() {
        this.title = '任务驳回'
        this.noticeDialog = !this.noticeDialog
      },
      hanleDispatch() {
        this.$refs.dispatch.reset()
        this.reminderObjectIds = []
        this.dispatchDialog = !this.dispatchDialog
      },
      closeModal(val) {
        this.$emit('input', val)
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
      AuditScoringDialog
    },
    watch: {
      value(val) {
        this.show = val
      },
      show(val) {
        this.editTitle = this.modalTitle
        if (val) {
          if (this.TZhsqTaskListId != null && this.TZhsqTaskListId.trim().length > 0) {
            this.eventId =this.TZhsqTaskListId;
            this.getProgressStatusList()
            this.getTaskHistory()
            this.getCycleDetail()
            this.getTaskManagerDetails()
            this.setProposalAndDegree()
            this.getCycleInfo()
            this.taskManagerDetailsForm.status === 7 && this.getTaskCommentList()
            this.getUrgentTypeList()
          }
        } else {
          this.closeModal(val)
        }
      }
    }
  }
</script>

<style scoped lang="less"></style>
