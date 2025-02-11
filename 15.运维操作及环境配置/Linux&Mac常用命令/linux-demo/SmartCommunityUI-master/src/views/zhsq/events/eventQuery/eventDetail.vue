<template>
  <Modal  v-model="show" :title="editTitle" :mask-closable="false" class="eventDetail" width="63%">
    <Row v-loading="modalLoading">
    <Row class="app-warp">
      <Col span="24">
        <Row type="flex" justify="center">
          <Col span="12">
            <div class="headTitleEvent">
              基本信息
            </div>
          </Col>
          <Col span="12" style="text-align: right;">
            <div v-if="(isEventWait && isExecutor) || isEventSelf" style="padding-top: 1.2vh;padding-bottom: 0.5vh;">
              <el-button
                class="m10 addbtn"
                type="primary"
                size="small"
                @click="execuButton()">
                处理事件
              </el-button>
            </div>

          </Col>
        </Row>

        <Row class="app-warp">
          <Col span="24" class="leftEvent">

            <Row class="origin">
              <Row style="width: 100%;" class="elrowStyle">
                <Col span="12" style="display: flex;" class="elcolStyle">
                  <Col span="8" class="elcolLabelStyle">
                    <i class="label"> 创建时间 </i>
                  </Col>
                  <Col span="16" class="elcolBoldStyle">
                    <i class="bold">{{theDetail.createTime}}</i>
                  </Col>
                </Col>
                <Col span="12" style="display: flex;">
                  <Col span="8" class="elcolLabelStyle">
                    <i class="label"> 事件编号 </i>
                  </Col>
                  <Col span="16" class="elcolBoldStyle">
                    <i class="bold">{{theDetail.code}}</i>
                  </Col>
                </Col>
              </Row>
              <Row style="width: 100%;" class="elrowStyle">
                <Col span="12" style="display: flex;" class="elcolStyle">
                  <Col span="8" class="elcolLabelStyle">
                    <i class="label"> 事件类型 </i>
                  </Col>
                  <Col span="16" class="elcolBoldStyle">
                    <i class="bold">{{theDetail.eventsTypeName}}</i>
                  </Col>
                </Col>
                <Col span="12" style="display: flex;">
                  <Col span="8" class="elcolLabelStyle">
                    <i class="label"> 所属辖区 </i>
                  </Col>
                  <Col span="16" class="elcolBoldStyle">
                    <i class="bold">{{theDetail.gridName}}</i>
                  </Col>
                </Col>
              </Row>
              <Row style="width: 100%;" class="elrowStyle">
                <Col span="12" style="display: flex;" class="elcolStyle">
                  <Col span="8" class="elcolLabelStyle">
                    <i class="label"> 网格员 </i>
                  </Col>
                  <Col span="16" class="elcolBoldStyle">
                    <i class="bold">{{theDetail.gridMember ? theDetail.gridMember : "--"}}</i>
                  </Col>
                </Col>
                <Col span="12" style="display: flex;">
                  <Col span="8" class="elcolLabelStyle">
                    <i class="label"> 当事人 </i>
                  </Col>
                  <Col span="16" class="elcolBoldStyle">
                    <i class="bold">{{theDetail.partyName ? theDetail.partyName : "--"}}</i>
                  </Col>
                </Col>
              </Row>
              <Row style="width: 100%;" class="elrowStyle">
                <Col span="12" style="display: flex;" class="elcolStyle">
                  <Col span="8" class="elcolLabelStyle">
                    <i class="label"> 事件状态 </i>
                  </Col>
                  <Col span="16" class="elcolBoldStyle">
                    <i class="bold">{{eventStatus(theDetail.status)}}</i>
                  </Col>
                </Col>
                <Col span="12" style="display: flex;">
                  <Col span="8" class="elcolLabelStyle">
                    <i class="label"> 要求/办结时间 </i>
                  </Col>
                  <Col span="16" class="elcolBoldStyle">
                    <i class="bold">{{theDetail.requirementDate ? theDetail.requirementDate : "--"}}</i>
                  </Col>
                </Col>
              </Row>
              <Row style="width: 100%;" class="elrowStyle">
                <Col span="12" style="display: flex;" class="elcolStyle">
                  <Col span="8" class="elcolLabelStyle">
                    <i class="label"> 联系电话 </i>
                  </Col>
                  <Col span="16" class="elcolBoldStyle">
                    <i class="bold">{{theDetail.telephone ? theDetail.telephone : "--"}}</i>
                  </Col>
                </Col>
                <Col span="12" style="display: flex;">
                  <Col span="8" class="elcolLabelStyle">
                    <i class="label"> 事件来源 </i>
                  </Col>
                  <Col span="16" class="elcolBoldStyle">
                    <i class="bold">{{eventDataFrom(theDetail.dataFrom)
                      }}</i>
                  </Col>
                </Col>
              </Row>
              <Row style="width: 100%;" class="elrowStyle">
                <Col span="24" style="display: flex;">
                  <Col span="4" class="elcolLabelStyle">
                    <i class="label"> 当前处理人 </i>
                  </Col>
                  <Col span="20" class="elcolBoldStyle">
                    <div v-if="theDetail.isHandleSelf != 1">
                      <i class="bold">{{theDetail.executor ? executorNowArray : "--"}}</i>
                    </div>
                    <div v-if="theDetail.isHandleSelf == 1">
                      <i class="bold">{{theDetail.handleSelf ? handleSelfName : "--"}}</i>
                    </div>
                  </Col>
                </Col>
              </Row>
              <Row style="width: 100%;" class="elrowStyle">
                <Col span="24" style="display: flex;">
                  <Col span="4" class="elcolLabelStyle">
                    <i class="label"> 发生地址 </i>
                  </Col>
                  <Col span="20" class="elcolBoldStyle">
                    <i class="bold">{{theDetail.address ? theDetail.address : "--"}}</i>
                  </Col>
                </Col>
              </Row>
              <Row style="width: 100%;" class="elrowStyle">
                <Col span="24" style="display: flex;">
                  <Col span="4" class="elcolLabelStyle">
                    <i class="label"> 事件描述 </i>
                  </Col>
                  <Col span="20" class="elcolBoldStyle">
                    <i class="bold">{{theDetail.remark}}</i>
                  </Col>
                </Col>
              </Row>
              <Row style="width: 100%;" class="elrowStyle">
                <Col span="24" style="display: flex;">
                  <Col span="4" class="elcolLabelStyle" style="height: auto;">
                    <i class="label"> 相关语音 </i>
                  </Col>
                  <Col span="20" class="elcolBoldStyle" style="height: auto;">
                    <i class="bold" style="padding-top: 1.4vh;padding-bottom: 1.4vh;">
                      <div v-if="theDetail.audioMediaAddress" style="height: 2.8vh;">
                        <audio :src="theDetail.audioMediaAddress" class="audiobox" style="margin-left: 2px" controls="controls"></audio>
                      </div>
                      <div v-if="!theDetail.audioMediaAddress" style="height: 100%;">
                        无
                      </div>
                    </i>
                  </Col>
                </Col>
              </Row>
              <Row style="width: 100%;" class="elrowStyle">
                <Col span="24" style="display: flex;">
                  <Col span="4" class="elcolLabelStyle" style="height: auto;">
                    <i class="label"> 图片视频 </i>
                  </Col>
                  <Col span="20" class="elcolBoldStyle" style="height: auto;padding-top: 1.4vh;">
                    <i class="bold" style="height: 100%;">
                      <div v-if="uploadFileArray.length > 0" style="height: 100%;">
                        <div class="demo-upload-list" style="width: 65px;height: 65px;" v-for="(item, i)  in uploadFileArray" v-viewer="{movable: false}">
                          <template v-if="item.url.indexOf('.mp4') == -1" @click.native="handleView(item.url)">
                            <img :src="item.url">
                          </template>
                          <template v-else>
                            <video :src="item.url" :direction="0" style="width: 100%;height: 100%;object-fit:fill;" ref="myVideo" controls></video>
                          </template>
                        </div>
                      </div>
                      <div v-if="uploadFileArray.length <= 0" style="">无</div>
                      <Modal title="View Image" v-model="visible">
                        <img :src="imgName" v-if="visible" style="width: 100%">
                      </Modal>
                    </i>
                  </Col>
                </Col>
              </Row>
              <Row style="width: 100%;">
                <Col span="24" style="display: flex;">
                  <Col span="4" class="elcolLabelStyle">
                    <i class="label"> 上报类型 </i>
                  </Col>
                  <Col span="20" class="elcolBoldStyle">
                    <i class="bold">{{
                      theDetail.reportType
                      ? theDetail.reportType == 1
                      ? "流程审批"
                      : "自办自结"
                      : "--"
                      }}</i>
                  </Col>
                </Col>
              </Row>

            </Row>

          </Col>
        </Row>


          <el-row type="flex" justify="center">
            <el-col :span="12">
              <div class="headTitleEvent" style="padding-bottom: 2vh;">
                处理记录
              </div>
            </el-col>
            <el-col :span="12" style="text-align: right;">
            </el-col>
          </el-row>

          <el-row class="app-warp">
            <el-col :span="24" class="leftEvent">

              <Table :loading="loading" border :columns="columns" :data="data" ref="table" class="tableEventRecords"></Table>

            </el-col>
          </el-row>

          <el-row type="flex" justify="center">
            <el-col :span="12">
              <div class="headTitleEvent" style="padding-bottom: 0px;padding-top: 3vh;">
                所处流程
              </div>
            </el-col>
            <el-col :span="12" style="text-align: right;">
            </el-col>
          </el-row>

          <el-row type="flex" justify="center">
            <el-col :span="24">

              <Row style="position:relative">
                <!--              <div class="img-title">实时流程图</div>-->
                <Row style="position:relative;display: flex;justify-content: center;">
                  <img :src="imgUrl" style="max-width: 100%;" />
                  <Spin size="large" fix v-if="loadingImg"></Spin>
                </Row>
                <Spin size="large" fix v-if="loading"></Spin>
              </Row>

            </el-col>
          </el-row>
      </Col>
    </Row>
    <div slot="footer">
      <Button type="text" @click="show=false">取消</Button>
    </div>

      <!-- 处理审批 -->
      <Modal v-model="commentShow" title="处理审批" class="processingApproval">
        <Form ref="proForm" :model="passFrom" inline style="border: none;margin-bottom: 0px;" :label-width="80" :rules="commentRule">
          <Form-item label="审批意见" prop="comment">
            <textarea v-model="passFrom.comment" placeholder="请输入审批意见" style="width: 20vw;height: 10vh;border-color: #dcdee2;padding: 0.2vw;line-height: 2.2vh;"/>
          </Form-item>
          <FormItem label="图片视频">
            <div style="display: flex;">
              <div v-if="uploadFileArrayUrl.length > 0" style="display: flex;">
                <div class="demo-upload-list" id="demoUploadList" v-for="(item, i)  in uploadFileArrayUrl"  v-viewer="{movable: false}">
                  <template v-if="item.indexOf('.mp4') == -1" @click.native="handleView(item)">
                    <img :src="item" style="width: 58px;height: 58px;margin-top: 4px;margin-right: 0px;">
                    <div class="img-delete" id="imgDelete" @click.stop="handleRemove(item)" >x</div>
                  </template>
                  <template v-else>
                    <video :src="item" :direction="0" style="width: 58px;height: 58px;margin-top: 4px;margin-right: 0px;object-fit:fill;" ref="myVideo" controls></video>
                    <div class="img-delete" id="vioDelete" @click.stop="handleRemove(item)" >x</div>
                  </template>
                </div>
              </div>
              <Upload
                ref="upload"
                :show-upload-list="false"
                :default-file-list="defaultList"
                :on-success="handleSuccess"
                :format="['jpg','jpeg','png','mp4']"
                :max-size="2048"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleMaxSize"
                :before-upload="handleBeforeUpload"
                multiple
                type="drag"
                action="/api/download/fileUpload"
                style="display: inline-block;width:58px;margin-top: 4px;">
                <div style="width: 58px;height:58px;line-height: 58px;">
                  <Icon type="ios-camera" size="20"></Icon>
                </div>
              </Upload>
              <Modal title="View Image" v-model="visible">
                <img :src="imgName" v-if="visible" style="width: 100%">
              </Modal>
            </div>
          </FormItem>
        </Form>
        <div slot="footer">
          <Button type="text" @click="commentShow=false">取消</Button>
          <Button type="primary" :loading="commentLoading" @click="handelSubmitComment">提交</Button>
        </div>
      </Modal>
    </Row>
  </Modal>
</template>

<script>
import {
  getOrderDetails,
  handlingEndEvents,
  isAuthenticity ,
  historicFlow,
  modifyEvent,
  pass,
} from '@/api/events'
import DialogUI from '@/components/DialogUI'
import BeVerified from '@/views/zhsq/events/eventsDetail/components/BeVerified'
import HandlingAssignment from '@/views/zhsq/events/eventsDetail/components/HandlingAssignments'
import Accept from '@/views/zhsq/events/eventsDetail/components/AcceptDispatch'
import NotAccept from '@/views/zhsq/events/eventsDetail/components/ReJectAccept'
import AbnormalTransfer from '@/views/zhsq/events/eventsDetail/components/abnormalTransferApplication'
import CompletionReview from '@/views/zhsq/events/eventsDetail/components/CompletionReview'
import ObjectionReview from '@/views/zhsq/events/eventsDetail/components/ObjectionReview'
import HierarchicalReporting from '@/views/zhsq/events/eventsDetail/components/HierarchicalReporting'
import { mapGetters } from 'vuex'
import NotReallyEvent from '@/views/zhsq/events/eventsDetail/components/notReallyEvent'
import Shangbao from '@/views/zhsq/events/eventsDetail/components/shangbao'
import HierarchicalReportingReject from '@/views/zhsq/events/eventsDetail/components/HierarchicalReportingReject'
import {
  getHighlightImg,
  // historicFlow,
  getProcessNode,
  getNextNode,
  getNode,
  getProcessByKey
} from "@/api/activiti";
import {
  deletImg as fileDelete,
} from "@/api/utils"
import util from "@/libs/util";
import store from '@/store'
import {add, edit, getAllUsers, deleteUser, patchUpdateState, getDeptTree} from "@/api/system/user"
import {getDictDataByType} from '@/api/index';
export default {
  name: "eventDetail",
  components: {
    HierarchicalReporting,
    DialogUI,
    BeVerified,
    HandlingAssignment,
    NotAccept,
    Accept,
    AbnormalTransfer,
    CompletionReview,
    ObjectionReview,
    handlingEndEvents,
    NotReallyEvent,
    Shangbao,
    HierarchicalReportingReject
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    isEventWait: {
      type: Boolean,
      default: false
    },
    isEventSelf: {
      type: Boolean,
      default: false
    },
    TZhsqTaskListId: {
      type: String
    },
    modalTitle: {
      type: String
    },
    procInstId: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      uploadList: [],
      uploadFileArray: [],
      uploadFileArrayUrl: [],
      userForm: {//用户查询
        blurry: '',
        // deptId: 0,//部门id
        page: 1, // 当前页数
        size: 10, // 页面大小
        sort: "username", // 默认排序字段
      },
      executorNowArray: [],//当前节点处理人集合(取事件)
      usersData: [],//用户查询
      commentShow: false,//是否显示处理审批
      commentLoading: false,//处理审批提交时的等待
      commentRule: this.getCommentRule(),//处理审批验证规则
      isExecutor: false,//是否是执行人
      loading: false, // 表单加载状态
      loadingImg: false,
      eventId: this.TZhsqTaskListId,
      show: this.value,
      editTitle: this.modalTitle,
      theDetail: {
        eventsTypeId: '',
        title: '',
        gridId: '',
        createUser: '',
        happenDate: null,
        endDate: null,
        executor: '',
        nodeId: '',
        nodeName: '',
        dataFrom: '',
        status: '',
        position: '',
        eventsTypes: {
          procDefId: '',
        },
        reportType: '',
        mediaAddress: '',
        audioMediaAddress: '',
        remark: '',
        telephone: '',
        gridMember: '',
        partyName: '',
        requirementDate: null,
        address: '',
        isHandleSelf: ''
      },
      procDefId: '',
      status: '',
      player: false,
      shangbao: false,
      beVerified: false,
      notBeVerified: false,
      reject: false,
      accept: false,
      modalLoading:false,
      abnormalTransfer: false,
      completionReview: false,
      objectionReview: false,
      hierarchicalReporting: false,
      hierarchicalReportingReject: false,
      notReallyEvent: false,
      mediaAddress: [],
      index: '',
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], // 播放速度
        autoplay: false, // 如果true,浏览器准备好时开始回放。
        controls: true, // 控制条
        preload: 'auto', // 视频预加载
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: 'video/mp4',
            src: '' // 你所放置的视频的地址，最好是放在服务器上
          }
        ],
        // poster: "", //你的封面地址（覆盖在视频上面的图片）
        width: document.documentElement.clientWidth,
        notSupportedMessage: '此视频暂无法播放，请稍后再试' // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
      },
      handlingAssignment: false,
      id: "",
      imgUrl: "",
      backRoute: "",
      dictNodeType: [],
      handleSelfName: "",
      columns: [
        // 表头
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "任务名称",
          key: "name",
          minWidth: 120,
          align: "center",
          sortable: true
        },
        {
          title: "处理人",
          key: "assignees",
          align: "center",
          sortable: true,
          minWidth: 100,
          render: (h, params) => {
            let _this = this;
            // let item = this.getItem(params.row.componentType,this.pidPriority);
            // let dataD = _this.csvData.filter(item => item.id == params.row.id);
            // dataD[0].componentType = item;
            if (params.row.assignee) {
              let item;
              for(let i =0;i < _this.usersData.length;i ++){
                if(_this.usersData[i].id == params.row.assignee){
                  item = _this.usersData[i].nickName;
                }
              }
              return h('Tooltip', {
                props: {
                  content: item,
                  placement: 'bottom',
                  transfer: true
                }
              }, item);
            }else{
              let item;
              /*for(let i =0;i < _this.usersData.length;i ++){
                if(_this.usersData[i].id == _this.nowUserId){
                  item = _this.usersData[i].nickName;
                }
              }*/
              item = '';
              return h('Tooltip', {
                props: {
                  content: item,
                  placement: 'bottom',
                  transfer: true
                }
              }, item);
            }
          }
        },
        {
          title: "审批操作",
          key: "deleteReason",
          align: "center",
          minWidth: 150,
          sortable: true
        },
        {
          title: "审批意见",
          key: "comment",
          align: "center",
          minWidth: 120,
          sortable: true
        },
        {
          title: "耗时",
          key: "duration",
          align: "center",
          width: 100,
          sortable: true,
          render: (h, params) => {
            return h("div", util.millsToTime(params.row.duration));
          }
        },
        {
          title: "创建时间",
          key: "createTime",
          width: 170,
          sortType: "asc",
          sortable: true
        },
        {
          title: "完成时间",
          key: "endTime",
          width: 170,
          sortable: true
        },
        {
          title: "状态",
          align: "center",
          width: 120,
          render: (h, params) => {
            let text = "",
              color = "";
            if (params.row.endTime) {
              color = "blue";
              text = "已办理";
            } else {
              color = "default";
              text = "待处理";
            }
            return h("div", [
              h(
                "Tag",
                {
                  props: {
                    color: color
                  }
                },
                text
              )
            ]);
          }
        }
      ],
      imgName: '',
      visible: false,
      dataProcessNode: [],//进程节点
      data: [],
      users: [],
      nowUserName: '',
      nowUserId: '',
      passFrom: {
        comment: '',//评论意见
      },
      nodeNowId: '',//节点id 当前任务
      //审批通过后 存入事件
      nodeId: '',//节点id 下一任务
      nodeName: '',//节点名 下一任务
      executorId: '',//执行人id 下一任务
      //审批任务通过
      taskId: '',//任务id 当前任务
      // procInstId: '',//流程实例id
      usersNext: [],//下个节点审批人
      priority: '',//优先级
      comment: '',//评论意见
      handleSelfOpinion: '',//自结意见
      //图片视频上传
      defaultList: [],
      dataFromPriority:[],//事件来源
    }
  },
  computed: {
  },
  created(){

  },
  watch: {
    value(val) {
      this.show = val
    },
    show(val) {
      this.executorNowArray = [];
      //事件来源 数据字典加载数据
      getDictDataByType("eventFrom", {}).then(res => {
        if (res && res.success) {
          this.dataFromPriority = res.data;
        }
      });
      this.getAllUsersData();
      //获取用户信息
      this.getUserInfo();
      let _this = this;
      this.passFrom.comment = '';
      this.editTitle = this.modalTitle
      if (val) {
        if (this.TZhsqTaskListId != null && this.TZhsqTaskListId.trim().length > 0) {
          this.eventId = this.TZhsqTaskListId
          this.handleGetDetail()
        }
      } else {
        this.closeModal(val)
      }

    }
  },
  methods: {
    fileRemove(url){
      fileDelete({
        url:url
      }).then(res =>{
        if (res.code == 200) {
          this.$Message.success('删除成功');
        } else {
          this.$Message.error('删除失败');
        }
      });
    },
    handleRemove (url) {
      this.fileRemove(url);
      const uploadFileArrayUrl = this.uploadFileArrayUrl;
      this.uploadFileArrayUrl.splice(uploadFileArrayUrl.indexOf(url), 1);
    },
    handleSuccess (res, file) {
      this.uploadFileArrayUrl.push(res.data);
    },
    handleFormatError (file) {
      this.$Notice.warning({
        title: '文件格式不正确',
        desc: '文件 ' + file.name + ' 的格式是不正确的i, 请选择jpg、jpeg、png、mp4文件'
      });
    },
    handleMaxSize (file) {
      this.$Notice.warning({
        title: '超过文件大小限制',
        desc: '文件  ' + file.name + ' 太大, 不能超过2M'
      });
    },
    handleBeforeUpload () {
      const check = this.uploadFileArrayUrl.length < 5;
      if (!check) {
        this.$Notice.warning({
          title: '最多可上传五个文件'
        });
      }
      return check;
    },
    getAllUsersData(){
      getAllUsers(this.userForm).then(res => {
        if (res && res.success) {
          this.usersData = res.data.content;
        }
      });
    },
    // 审批任务通过
    passNode(taskId,procInstId,assigneeId,assignees,priority,comment){
      let _this =this
      pass({
        id: taskId,//任务id 必需
        procInstId: procInstId,//流程实例id 必需
        assigneeId: assigneeId,//受理人 必需
        assignees: assignees,//下个节点审批人 必需
        priority: priority,//优先级 必需
        comment: comment,//意见评论 必需
        sendMessage: false,//是否发送站内消息 默认false
        sendSms: false,//是否发送短信通知 默认false
        sendEmail: false,//是否发送邮件通知 默认false
      }).then(res => {
        this.commentLoading = false;
        this.commentShow = false;
        //将节点id、节点名 存入事件
        let dataNowH = _this.nodeName;
        let data = _this.dataProcessNode;
        for(let i = 0;i < data.length;i ++){
          if (data[i].title && data[i].title == dataNowH) {
            _this.nodeId = data[i].id;
          }
        }
        // _this.status = _this.status + 1;
        let modifyForm = {};
        let uploadFileArrayUrlNew = _this.theDetail.mediaAddress;
        for(let i =0;i < _this.uploadFileArrayUrl.length;i ++){
          uploadFileArrayUrlNew += "'nodeId':'"+_this.nodeNowId+"','nodeName':'"+_this.data[0].name+"','url':'"+_this.uploadFileArrayUrl[i]+"';";
        }
        if(!_this.nodeId || _this.nodeId == null || _this.nodeId == undefined){
          modifyForm = {
            id: _this.TZhsqTaskListId,
            nodeId: " ",
            nodeName: " ",
            mediaAddress: uploadFileArrayUrlNew,
          };
        }else{
          modifyForm = {
            id: _this.TZhsqTaskListId,
            nodeId: _this.nodeId,
            nodeName: _this.nodeName,
            mediaAddress: uploadFileArrayUrlNew,
          };
        }
        modifyEvent(modifyForm).then(res => {
          if (res && res.code == 200) {
            this.$Message.success('保存成功');
          }else{
            this.$Message.error(res.msg);
          }
        }).catch(error => {
          this.$Message.error('保存失败');
        })
        //关闭
        this.closeModal(false);
        this.$emit('handleSearch');
      });
    },
    getCommentRule() {
      return {
        comment: [
          {required: true, message: '审批意见不能为空！', trigger: 'blur'},
          // {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
        ]
      }
    },
    handelSubmitComment(){
      this.commentLoading = true;
      // 审批任务通过
      this.assignees = this.usersNext;
      this.priority = 50;
      this.comment = this.passFrom.comment;
      this.passNode(this.taskId,this.procInstId,this.nowUserId,this.assignees,this.priority,this.comment);
    },
    execuButton(){
      this.passFrom.comment = '';
      this.commentShow = true;
    },
    //图片视频上传 查看器
    handleView (url) {
      const viewer = this.$el.querySelector('.demo-upload-list').$viewer;
      viewer.show();
      // this.imgName = url;
      // this.visible = true;
    },
    //获取用户信息
    getUserInfo(){
      store.dispatch('GetInfo').then((res) => {
        this.nowUserName = res.nickName;
        this.nowUserId = res.id;
      })
    },
    init() {

      this.imgUrl = "";
      this.id = this.procInstId;
      this.imgUrl =
        getHighlightImg +
        this.id +
        "?accessToken=" +
        "" +
        "&time=" +
        new Date();
      this.getDataList();
    },
    //获取任务节点信息
    getNowProcessNode(processId){
      let _this = this;
      getProcessNode(processId).then(res => {
        if (res && res.success) {
          // 转换null为""
          let v = res.data;
          for (let attr in v) {
            if (v[attr] == null) {
              v[attr] = "";
            }
          }
          let str = JSON.stringify(v);
          let data = JSON.parse(str);
          _this.dataProcessNode = data;
          let dataNowH = _this.data[0].name;
          for(let i = 0;i < data.length;i ++){
            if (data[i].title && data[i].title == dataNowH) {
              _this.nodeNowId = data[i].id;
              //当前节点
              _this.getNode(data[i].id);
              //下个节点
             _this.getNowNextNode(_this.procDefId,data[i].id);
            }
          }
        }
      });
    },
    // 通过节点id获取审批人
    getNode(v){
      let _this = this;
      getNode(v).then(res => {
        if (res && res.success) {
          //当前节点 审批人(审批人集合)
          _this.users = [];
          if (res.data.users && res.data.users.length > 0) {
            _this.users = res.data.users;
          }
          let dataLet = _this.data;//处理记录
          //获取当前处理人集合(取事件)
          let executorIds = [];
          executorIds = _this.theDetail.executor.split(',');
          let executors = [];
          for(let i =0;i < executorIds.length;i ++){
            let item;
            for(let j =0;j < _this.usersData.length;j ++){
              if(_this.usersData[j].id == executorIds[i]){
                item = _this.usersData[j].nickName;
                executors.push(item);
              }
            }
          }
          _this.executorNowArray = executors;
          //若当前用户 是审批人(审批人之一) 则显示审批按钮
          let isExecutor = false;
          if(_this.users && _this.users != null){
            for(let i = 0;i < _this.users.length;i ++){
              if(_this.users[i].id == _this.nowUserId){
                isExecutor = true;
              }
            }
          }
          _this.isExecutor = isExecutor;

          _this.data = dataLet;//处理记录
          console.log(_this.data);
        }
      });
    },
    //获取下一个任务节点+任务处理人id
    getNowNextNode(procDefId,nodeId){
      let _this = this;
      getNextNode(procDefId, nodeId).then(res => {
        if (res && res.success) {
          _this.nodeName = res.data.title;
          _this.usersNext = [];
          /*if (res.data.users && res.data.users.length > 0) {
            _this.usersNext = res.data.users;
          }*/
        }
      });
    },
    getDataList() {
      let _this =this;
      this.loading = true;
      this.data = [];
      historicFlow(this.id).then(res => {
        this.loading = false;
        if (res && res.success) {
          if (!res.data || res.data.length == 0) {
            this.$Modal.info({
              title: "未找到该记录审批历史数据",
              content: "历史数据可能已被删除"
            });
          }
          this.data = res.data;
          this.taskId = this.data[0].id;

          if(this.theDetail.reportType != 2){
            //若当前执行人存在，则表示仍在办理中，流程未结束，继续获取节点信息
            if(this.theDetail.executor && this.theDetail.executor != null && this.theDetail.executor != " " && this.theDetail.executor != undefined){
              _this.getNowProcessNode(_this.theDetail.eventsTypes.procDefId);
            }
          }else{
            //若当前执行人存在，则表示仍在办理中，流程未结束，继续获取节点信息
            if(this.theDetail.executor && this.theDetail.executor != null && this.theDetail.executor != " " && this.theDetail.executor != undefined){
              _this.getNowProcessNode(_this.theDetail.eventsTypes.procDefId);
            }
            for(let i =0;i < _this.usersData.length;i ++){
              if(_this.usersData[i].id == _this.theDetail.handleSelf){
                _this.handleSelfName = _this.usersData[i].nickName;
              }
            }
          }
        }
      });
    },
    // 关闭当前页面
    close() {
      if (this.$route.query.id) {
        this.$store.commit("removeTag", "historic_detail");
        localStorage.pageOpenedList = JSON.stringify(
          this.$store.state.app.pageOpenedList
        );
        this.$router.push({
          name: this.backRoute
        });
      } else {
        this.$emit("close", true);
      }
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
        return "--";
      }
      let dataFrom = this.dataFromPriority.filter(item => item.value+"" == status+"");
      if (dataFrom != null && dataFrom != undefined && dataFrom.length > 0) {
        return dataFrom[0].label;
      }
      return "--";
    },
    handleShangbao() {
      this.shangbao = true
    },
    handleUpdate() {
      this.handleUpdate()
    },
    handleHierarchicalReportingReject() {
      this.hierarchicalReportingReject = true
    },
    handleHierarchicalReporting() {
      this.hierarchicalReporting = true
    },
    timeLineItemText(textAll, importantFont, isbegin) {
      const allText = textAll.split(importantFont)
      if (isbegin) {
        return allText[0]
      } else {
        return allText[1]
      }
    },
    handlePlay(address) {
      this.playerOptions.sources[0].src = address
      this.player = true
    },
    handleNotReallyEvent() {
      this.notReallyEvent = true
    },
    handleAccept() {
      this.accept = true
    },
    handleReject() {
      this.reject = true
    },
    handelClose() {
      this.index = ''
      this.player = false
      this.beVerified = false
      this.notBeVerified = false
      this.accept = false
      this.reject = false
      this.abnormalTransfer = false
      this.handlingAssignment = false
      this.completionReview = false
      this.objectionReview = false
      this.hierarchicalReporting = false
      this.hierarchicalReportingReject = false
      this.notReallyEvent = false
      this.shangbao = false
    },
    handleObjectionReview() {
      this.objectionReview = true
    },
    handleCompletionReview() {
      this.completionReview = true
    },
    handleBeVerified() {
      this.notBeVerified = true
    },
    handleBeVerifiedDialog() {
      this.beVerified = true
    },
    handleHandlingAssignment() {
      this.handlingAssignment = true
    },
    handleAbnormalTransfer() {
      this.abnormalTransfer = true
    },
    async handleGetDetail() {
      let _this = this;
      this.modalLoading=true;
      const { data } = await getOrderDetails({
        gridEventsId: this.TZhsqTaskListId
      })
      this.modalLoading=false;
      this.theDetail = data;
      this.status = data.status;
      _this.uploadFileArray = [];
      //图片视频 数据拼接
      if(this.theDetail.mediaAddress){
        let dataMediaAddressAll = this.theDetail.mediaAddress.split(';');
        for(let i = 0;i < dataMediaAddressAll.length - 1;i ++){
          let dataMediaAddress = dataMediaAddressAll[i].split(',');
          //属性值数组
          let valueArray = [];
          for(let j = 0;j < dataMediaAddress.length;j ++){
            let data = dataMediaAddress[j].split(':');
            //属性名
            let dataName = data[0].split("'")[1];
            //属性值
            let dataValue = data[1].split("'")[1];
            valueArray.push(dataValue);//存入属性值
          }
          //上传的图片视频 文件数组
          _this.uploadFileArray.push({
            nodeId: valueArray[0],//节点id
            nodeName: valueArray[1],//节点名
            url: valueArray[2],//图片视频的 文件地址
          });
        }
      }
      //获取节点
      this.procDefId = data.eventsTypes.procDefId;
      this.init();
    },
    handleEnd() {
      this.$confirm('确定结束吗？', { type: 'warning' })
        .then(async _ => {
          const data = await handlingEndEvents({
            detailsId: this.$route.query.id
          })
          if (data && data.code == 200) {
            this.$notify({
              title: data.msg,
              type: data.success ? 'success' : 'warning'
            })
            this.$router.go(-1)
          }
        })
        .catch(e => {})
    },
    handleFallBack() {
      this.$router.go(-1)
    },
    closeModal(val) {
      // location.reload();
      this.$emit('input', val)
    }
  }
}
</script>

<style lang="scss">

.eventDetail{
  .elrowStyle{
    border-bottom: #ccc solid 1px;
    border-color: #dcdee2;
  }
  .elcolStyle{
    border-right: #ccc solid 1px;
    border-color: #dcdee2;
  }
  .elcolLabelStyle{
    background-color: rgb(250,250,250);
    height: 4vh;
    line-height: 4vh;
    border-right: #ccc solid 1px;
    border-color: #dcdee2;
  }
  .elcolBoldStyle{
    height: 4vh;
    line-height: 4vh
  }
  .origin {
    border-radius: 2px;
    border: #ccc solid 1px;
    border-color: #dcdee2;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .tableEventRecords{
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 0;
      /*隐藏滚轮*/
      display: none;
    }
  }

  .headTitleEvent{
    width: 100%;
    height: 100%;
    /*font-size: 16px;*/
    font-size: 0.82vw;
    color: #17233d;
    font-weight: bolder;
    padding-top: 1.8vh;
    padding-bottom: 0.5vh;
  }
	.label {
    width: 80px;
    text-align: left;
    /*padding-left: 30px;*/
    padding-left: 1vw;
    }
  .ivu-modal {
    top: 16px !important;
  }
  i {
    font-size: 15px;
    font-style: normal;
  }
  .bold {
    display: inline-block;
    height: 100%;
    text-align: left;
    /*padding-left: 10px;*/
    padding-left: 1vw;
  }

  .flex {
    display: flex;
  }

  .importantFont {
    color: #014fa2;
  }

  .media {
    display: inline-block;
    width: 100px;
    height: 80px;
  }

  .audioMedia {
    display: inline-block;
  }

  .playWarper {
    background: #5e6472;
    transition: box-shadow 0.3s;

    .player {
      color: #faf3dd;
      font-size: 40px;
      transition: color 0.3s;
    }

  }

  .mediaSpan {
    display: flex;
    float: right;
    width: 100%;
  }

  .label {
    display: inline-block;
    height: 100%;

    //vertical-align: text-top;
  }

  .bold {
    display: inline-block;
    height: 100%;
    /*font-size: 14px;*/
    font-size: 0.72vw;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    text-align: left;
    color: #3e3e3e;
    line-height: 20px;
  }
   .label {
    display: inline-block;
    height: 100%;
    /*font-size: 14px;*/
     font-size: 0.72vw;
    font-family: Microsoft YaHei, Microsoft YaHei-Bold;
    font-weight: 700;
    text-align: left;
    color: #3e3e3e;
  }


  .ivu-modal-body {
    padding: 16px;
    padding-top: 0px;
    font-size: 14px;
    line-height: 1.5;

    overflow-y: auto;
    max-height: 83vh;

    &::-webkit-scrollbar {
      width: 0;
      /*隐藏滚轮*/
      display: none;
    }
    .ivu-table-body{
      max-height: 19.5vh;
      overflow: auto;
    }
  }

  .app-warp {
    background: #ffffff;
    border-radius: 2px;
    overflow: hidden;
  }
  .ivu-table {
    width: inherit;
    height: 100%;
    max-width: 100%;
    overflow: hidden;
    color: #515a6e;
    font-size: 14px;
    font-size: 0.73vw;
    background-color: #fff;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }


  //图片视频上传
  .img-delete {
    display: inline-block;
    position: absolute;
    border-radius: 50%;
    z-index: 20;
    width: 10px;
    height: 10px;
    line-height: 10px;
    right: 0px;
    top: 0px;
    text-align: center;
    background: #31435C;
    color: #fff;

    cursor: pointer;
  }

  .demo-upload-list{
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    /*box-shadow: 0 1px 1px rgba(0,0,0,.2);*/
    margin-right: 4px;
  }
  .demo-upload-list img{
    width: 100%;
    height: 100%;
  }
  .demo-upload-list-cover{
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.6);
  }
  .demo-upload-list:hover .demo-upload-list-cover{
    display: block;
  }
  .demo-upload-list-cover i{
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }

  .ivu-form-item-content {
    position: relative;
    line-height: 32px;
    font-size: 14px;
    display: flex;
  }


  .audiobox {
    width: 240px;
    height: 30px;
    height: 100%;
    /*margin-top: 20px;*/
  }
}

#demoUploadList{
  width: 65px;height: 65px;
  display: inline-block;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  margin-right: 4px;
}
#imgDelete{
  display: inline-block;
  position: absolute;
  border-radius: 50%;
  z-index: 20;
  width: 10px;
  height: 10px;
  line-height: 10px;
  right: 0px;
  top: 0px;
  text-align: center;
  background: #31435C;
  color: #fff;
  cursor: pointer;
}
#vioDelete{
  display: inline-block;
  position: absolute;
  border-radius: 50%;
  z-index: 20;
  width: 10px;
  height: 10px;
  line-height: 10px;
  right: 0px;
  top: 0px;
  text-align: center;
  background: #31435C;
  color: #fff;
  cursor: pointer;
}

</style>
