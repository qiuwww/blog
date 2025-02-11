<template>
  <Modal  v-model="show" :title="editTitle" :mask-closable="false" class="looktZhsqTaskList" width="60%">
    <el-row v-loading="modalLoading">
    <el-row class="app-warp">
      <el-col>
        <el-row type="flex" justify="center">
          <el-col :span="22">
            <el-steps :active="statusStep" finish-status="success">
              <el-step title="发现上报" />
              <el-step title="受理派遣" />
              <el-step title="处理反馈" />
              <el-step title="任务审核" />
              <el-step title="事件结束" />
            </el-steps>

          </el-col>
        </el-row>
        <el-row class="app-warp">
          <el-col :span="16" class="leftEvent">
            <el-row class="origin" style="border: 0px;">
              <el-row class="header">
                <span>
                  登记信息
                </span>
              </el-row>
              <el-row type="flex" justify="center">
                <el-col :span="12">
                  <i class="label"> 登记编号 </i>
                  <i class="bold">{{ theDetail.code  }}</i>
                </el-col>
                <el-col :span="12">
                  <i class="label"> 登记人 </i>
                  <i class="bold">{{ theDetail.userName  }}</i>
                </el-col>
              </el-row>
              <el-row type="flex" justify="center">
                <el-col :span="12">
                  <i class="label"> 登记时间 </i>
                  <i class="bold">{{ theDetail.createTime  }}</i>
                </el-col>
                <el-col :span="12">
                  <i class="label"> 联系电话 </i>
                  <i class="bold">{{ theDetail.userPhone }}</i>
                </el-col>
              </el-row>
            </el-row>

            <el-row class="origin">
              <el-row class="header">
                <span>
                  基本信息
                </span>
              </el-row>
              <el-row type="flex" justify="center">
                <el-col :span="12">
                  <i class="label"> 所属网格 </i>
                  <i class="bold">{{ theDetail.gridName  }}</i>
                </el-col>
                <el-col :span="12">
                  <i class="label"> 事件类型 </i>
                  <i class="bold">{{ theDetail.eventsTypeName  }}</i>
                </el-col>

              </el-row>
              <el-row type="flex" justify="center">

                <el-col :span="12">
                  <i class="label"> 发生日期 </i>
                  <i class="bold">{{ theDetail.happenDate  }}</i>
                </el-col>
                <el-col :span="12">
                  <i class="label"> 事件标题 </i>
                  <i class="bold">{{ theDetail.title  }}</i>
                </el-col>
              </el-row>

              <el-row type="flex" justify="center">
                <el-col :span="12" class="flex">
                  <i class="label"> 事件来源 </i>
                  <i class="bold">{{
                    theDetail.dataFrom
                      ? theDetail.dataFrom == 1
                        ? "居民APP"
                        : "街道APP"
                      : "--"
                  }}</i>
                </el-col>
                <el-col :span="12">
                  <i class="label"> 事件位置 </i>
                  <i class="bold">{{ theDetail.address  }}</i>
                </el-col>
              </el-row>
              <el-row type="flex" justify="center">
                <el-col :span="24" class="flex">
                  <i class="label"> 事件描述 </i>

                  <i class="bold">
                    {{ theDetail.remark  }}
                  </i>
                </el-col>
              </el-row>
              <el-row type="flex" justify="center">
              <el-col :span="24" class="flex">
                <i class="label">图片/视频</i>
                <div
                  v-for="(item, index) in theDetail.mediaAddress"
                  :key="index"
                  class="media m10"
                >
                  <!-- <img
                    v-if="item.type == 2"
                    :src="item.address"
                    alt="图片加载失败"
                    width="100px"
                    height="80px"
                  />  -->
                  <el-image
                    v-if="item.type == 2"
                    style="width: 100px; height: 80px"
                    :src="item.address"
                    :preview-src-list="mediaAddress"
                  />

                  <div v-else class="media playWarper">
                    <div
                      style="line-height:80px;text-align:center;"
                      @click="handlePlay(item.address)"
                    >
                      <i class="el-icon-video-play player mt20" />
                    </div>
                  </div>
                </div>
                <!-- <img src="" alt="" width="100px" height="70px" /> -->
              </el-col>
              </el-row>
              <el-row type="flex" justify="center">
              <el-col v-if="theDetail.audioMediaAddress && theDetail.audioMediaAddress.url" :span="24">
                <i class="label">语音</i>
                <span class="audioMedia">
                 <audio controls class="audiobox" style="margin-left: 2px">
                <source
                  :show-duration="true"
                  :block="true"
                  style="margin-top: 20px"
                  :src="theDetail.audioMediaAddress.url"
                  type="audio/ogg"
                />
                您的浏览器不支持播放音频文件.......
              </audio>
                </span>
              </el-col>
              </el-row>

            </el-row>

            <el-row v-if="theDetail.dataForm == 2" class="origin">
              <el-row class="header">
                <span>
                  更多信息
                </span>
              </el-row>
              <el-row type="flex" justify="center">
                <el-col :span="16">
                  <i class="label"> 发生地点 </i>
                  <i class="bold">{{ theDetail.address  }}</i>
                </el-col>
                <el-col :span="8">
                  <i class="label"> 规模 </i>
                  <i class="bold">{{ theDetail.scaleName  }}</i>
                </el-col>
              </el-row>

              <el-row type="flex" justify="space-between">
                <el-col :span="8">
                  <i class="label"> 涉及人数 </i>
                  <i class="bold">{{ theDetail.persons  }}人</i>
                </el-col>
                <el-col :span="8">
                  <i class="label"> 涉及单位 </i>
                  <i class="bold">{{ theDetail.unitsInvolved  }}</i>
                </el-col>

                <el-col :span="8">
                  <i class="label"> 等级 </i>
                  <i class="bold">{{ theDetail.eventsGradeName  }}</i>
                </el-col>
              </el-row>
            </el-row>
            <el-row v-if="theDetail.dataForm == 2" class="origin">
              <el-row class="header">
                <span>
                  主要当事人
                </span>
              </el-row>
              <el-row>
                <el-col>
                  <i class="label">主要当事人姓名</i>
                  <i class="bold"> {{ theDetail.partName  }}</i>
                </el-col>
              </el-row>
            </el-row>

            <el-row
              v-for="(item, index) in theDetail.gridHandles"
              :key="index"
              class="origin"
            >
              <el-row class="header">
                <el-col :span="4">
                  {{ item.name  }}
                </el-col>
                <el-col :span="12">
                  {{ item.date  }}
                </el-col>
              </el-row>
              <el-row>
                <el-col
                  v-for="(element, index) in item.result"
                  :key="index"
                  :span="24"
                >
                  <i class="label">{{ element.name }}</i>
                  <!-- <i class="bold" v-if="element.content "> {{ element.content }}</i> -->

                  <span
                    v-if="
                      (element.mediaAddress && element.mediaAddress.length > 0) ||
                        (element.audioMediaAddress &&
                          element.audioMediaAddress.length > 0)
                    "
                    class="mediaSpan"
                  >
                    <el-image
                      v-for="(item, index) in element.mediaAddress"
                      :key="index"
                      :src="item.address"
                      style="width: 100px; height: 80px"
                      :preview-src-list="element.mediaAddress"
                    />
                    <div
                      v-if="element.audioMediaAddress && element.audioMediaAddress.url"
                      class="media playWarper"
                    >
                      <div
                        style="line-height:80px;text-align:center;"
                        @click="handlePlay(element.audioMediaAddress.url)"
                      >
                        <i class="el-icon-video-play player mt20" />
                      </div>
                    </div>
                  </span>
                  <i v-else class="bold"> {{ element.content }}</i>
                </el-col>
              </el-row>
            </el-row>

            <el-row v-if="$route.query.status">
              <!-- 分级上报 -->
              <el-row v-if="theDetail.status == 11" type="flex" justify="center">
                <el-col :span="4">
                  <el-button
                    v-if="permitIds.includes('shijian_procedure_fenjishangbao_dispatch')"
                    @click="handleHierarchicalReporting"
                  >
                    派 遣
                  </el-button>
                  <el-button @click="handleHierarchicalReportingReject">
                    驳 回
                  </el-button>
                  <el-button @click="handleFallBack">
                    返回
                  </el-button>
                </el-col>

                <HierarchicalReporting
                  :alevent-type="theDetail.eventsTypeId"
                  :grid-id="theDetail.gridId"
                  :completion-review="hierarchicalReporting"
                  @close="handelClose"
                />
                <HierarchicalReportingReject
                  :alevent-type="theDetail.eventsTypeId"
                  :completion-review="hierarchicalReportingReject"
                  @close="handelClose"
                />
              </el-row>
              <!-- shangbao? -->
              <el-row v-if="theDetail.status == 2" type="flex" justify="center">
                <el-col :span="4">
                  <el-button @click="handleShangbao">
                    处理
                  </el-button>

                  <el-button @click="handleFallBack">
                    返回
                  </el-button>
                </el-col>
                <Shangbao :handle-shangbao="shangbao" @close="handelClose" />
              </el-row>

              <el-row v-if="theDetail.status == 10" type="flex" justify="center">
                <el-col :span="4">
                  <el-button
                    v-if="permitIds.includes('shijian_procedure_dissent_yiyi')"
                    @click="handleEnd"
                  >
                    结束
                  </el-button>
                  <el-button @click="handleFallBack">
                    返回
                  </el-button>
                </el-col>
              </el-row>
              <!--      属实、不属实-->
              <el-row v-if="theDetail.status == -1" type="flex" justify="center">
                <el-col :span="6">
                  <el-button @click="handleBeVerifiedDialog">
                    属实
                  </el-button>
                  <el-button @click="handleBeVerified">
                    不属实
                  </el-button>
                  <el-button @click="handleFallBack">
                    返回
                  </el-button>
                </el-col>
              </el-row>

              <BeVerified
                :be-verified="beVerified"
                :event="Number(theDetail.eventsTypeId)"
                :not-be-verified="notBeVerified"
                @close="handelClose"
              />
              <!--        处理反馈、异常转派-->
              <el-row v-if="theDetail.status == -3" type="flex" justify="center">
                <el-col :span="8">
                  <el-button @click="handleHandlingAssignment">
                    处理反馈
                  </el-button>
                  <el-button @click="handleAbnormalTransfer">
                    异常转派申请
                  </el-button>
                  <el-button @click="handleFallBack">
                    返回
                  </el-button>
                </el-col>
              </el-row>
              <HandlingAssignment
                :handling-assignment="handlingAssignment"
                @close="handelClose"
              />
              <AbnormalTransfer
                :abnormal-transfer="abnormalTransfer"
                @close="handelClose"
              />
              <!--      派遣、驳回-->
              <!-- theDetail.status == 9 -->
              <el-row v-if="theDetail.status == 4" type="flex" justify="center">

                  <el-button
                    v-if="permitIds.includes('shijian_procedure_examine_dispatch')"
                    @click="handleAccept"
                  >
                    派遣
                  </el-button>
                  <el-button
                    v-if="permitIds.includes('shijian_procedure_examine_reject')"
                    @click="handleReject"
                  >
                    驳回
                  </el-button>
                  <el-button @click="handleFallBack">
                    返回
                  </el-button>

              </el-row>
              <!-- 不属实，审核 -->
              <el-row v-if="theDetail.status == 9" type="flex" justify="center">

                  <el-button
                    v-if="permitIds.includes('shijian_procedure_examine_dispatch')"
                    @click="handleNotReallyEvent"
                  >
                    审核
                  </el-button>
                  <!-- <el-button v-if="permitIds.includes('shijian_procedure_examine_reject')" @click="handleReject">
                    驳回
                  </el-button> -->
                  <el-button @click="handleFallBack">
                    返回
                  </el-button>

              </el-row>

              <NotReallyEvent
                :the-detail="theDetail"
                :accept="notReallyEvent"
                @close="handelClose"
              />
              <!--      办结审核-->
              <el-row
                v-if="theDetail.status == 5 "
                type="flex"
                justify="center"
              >

                  <el-button
                    v-if="permitIds.includes('shijian_procedure_finish_xiangiqng')"
                    @click="handleCompletionReview"
                  >
                    上传办结审核结果
                  </el-button>
                  <el-button @click="handleFallBack">
                    返回
                  </el-button>

              </el-row>
              <CompletionReview
                :completion-review="completionReview"
                @close="handelClose"
              />

              <!--      分级上报 -->

              <!--      异议审核-->
              <el-row v-if="theDetail.status == 7" type="flex" justify="center">
                <el-col :span="4">
                  <el-button
                    v-if="permitIds.includes('shijian_procedure_dissent_yiyi')"
                    @click="handleObjectionReview"
                  >
                    上传异议审核结果
                  </el-button>
                  <el-button @click="handleFallBack">
                    返回
                  </el-button>
                </el-col>
              </el-row>
              <ObjectionReview
                :grid-id="theDetail.gridId"
                :completion-review="objectionReview"
                @close="handelClose"
              />
            </el-row>

          </el-col>
          <el-col :span="8" class="leftEvent">
            <el-row class="origin" style="border: 0;">
              <el-row class="header">
                <span>
                  事件记录
                </span>
              </el-row>
              <el-row>
                <el-col>
                  <el-timeline>
                    <el-timeline-item
                      v-for="(item, index) in theDetail.gridRecords"
                      :key="index"
                      :timestamp="item.createTime"
                      placement="top"
                    >
                      <el-card>
                        <p>
                          <i>
                            {{
                              `【${item.statusName}】 ${timeLineItemText(
                                item.content,
                                item.keyWords,
                                true
                              )}`
                            }}
                          </i>
                          <i class="bold importantFont">
                            {{ item.keyWords }}
                          </i>
                          <i>
                            {{ timeLineItemText(item.content, item.keyWords, false) }}
                          </i>
                        </p>
                      </el-card>
                    </el-timeline-item>
                  </el-timeline>
                </el-col>
              </el-row>
            </el-row>
          </el-col>
        </el-row>
      </el-col>
      <DialogUI :title="'播放'" :dialog-visible="player" @close="handelClose">
        <el-row type="flex" justify="center">
          <el-col :span="22">
            <video-player class="vjs-custom-skin" :options="playerOptions" />
          </el-col>
        </el-row>
      </DialogUI>
    </el-row>
    <div slot="footer">
      <Button type="text" @click="show=false">取消</Button>
    </div>
    </el-row>
  </Modal>
</template>

<script>
import { getOrderDetails, handlingEndEvents, isAuthenticity } from '@/api/events'
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
export default {
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
    TZhsqTaskListId: {
      type: String
    },
    modalTitle: {
      type: String
    }
  },
  data() {
    return {
      eventId: this.TZhsqTaskListId,
      show: this.value,
      editTitle: this.modalTitle,
      theDetail: {
        eventsTypeId: 0,
        audioMediaAddress: { url: '' },
        gridId: ''
      },
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
    }
  },
  computed: {
    ...mapGetters(['loading', 'permitIds']),
    statusStep() {
      switch (this.theDetail.status) {
        case 1:
          return 1
          break
        case 2:
          return 2
          break
        case 3:
          return 3
          break
        case 4:
          return 2
          break
        case 5:
          return 4
          break
        case 6:
          return 4
          break
        case 7:
          return 4
          break
        case 8:
          return 5
          break
        case 11:
          return 5
          break
        default:
          return 3
          break
      }
    }
  },
  watch: {
    value(val) {
      this.show = val
    },
    show(val) {
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
  async created() {
  },

  methods: {
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
      this.modalLoading=true
      const { data } = await getOrderDetails({
        gridEventsId: this.TZhsqTaskListId
      })
      this.modalLoading=false
      this.theDetail = data
      this.theDetail.audioMediaAddress = this.theDetail.audioMediaAddress
        ? JSON.parse(this.theDetail.audioMediaAddress)
        : {}
      this.theDetail.mediaAddress = JSON.parse(this.theDetail.mediaAddress)
      data.mediaAddress.map(i => {
        i.type == 2
          ? this.mediaAddress.push(i.address) : ''
      })
      this.theDetail.gridHandles.map(i => {
        i.result.map(element => {
          if (element.mediaAddress && element.mediaAddress.length > 0) {
            element.mediaAddress = JSON.parse(element.mediaAddress)
          }
          if (element.audioMediaAddress && element.audioMediaAddress.length > 0) {
            element.audioMediaAddress = JSON.parse(element.audioMediaAddress)
          }
        })
      })
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
      this.$emit('input', val)
    }
  }
}
</script>

<style lang="scss" >

.looktZhsqTaskList{
	.label {
    width: 80px;
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
  }
  .el-row {
    box-sizing: border-box;
  }

  .el-col {
    box-sizing: border-box;
    padding: 10px;
  }

  .flex {
    display: flex;
  }

  .w60 {
    width: 60%;
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

    &:hover {
      box-shadow: #ccc 3px 3px 5px 3px;

      .player {
        color: #b8f2e6;
      }
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
  .leftEvent{
    max-height: 65vh;
    overflow:hidden;
    background: #ffffff;
  }
  .leftEvent:hover{
    overflow-y:scroll;
  }
  .leftEvent:hover::-webkit-scrollbar {
    /*滚动条整体样式*/
    width : 6px;  /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }
  .leftEvent:hover::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 6px;
    box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.0);
    background   : #e4e4e4;
  }
  .leftEvent:hover::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.0);
    border-radius: 5px;
    background   : #ededed00;
  }
  .el-step__title{
    margin-left: -10px;
  }
  .el-step__icon {
    width: 38px;
    height: 38px;
    margin-top: -6px;
  }
  .el-step__head.is-success {
    color: #3083f2;
    border-color: #3083f2;
    .el-step__icon.is-text {
      background: #3083f2;
      color: white;
    }
  }
  .el-step__head .is-wait {

    .el-step__icon.is-text {
      border: 1px solid #d8dde4;
    }
  }
  .el-step__head.is-success {
    color: #3083f2;
    border-color: #3083f2;
    .el-step__icon.is-text {
      background: #3083f2;
      color: white;
    }
  }
  .el-icon-check{
    background: #3083f2;
    font-size: 23px;
  }
  .el-step__title.is-success {

    font-size: 14px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    color: #3e3e3e;
  }
  .el-step__title.is-wait {

    font-size: 14px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    color: #a0a8b5;
  }
  .el-step__icon.is-text {

    border: 1px solid;
  }
  .el-step__head.is-process {
    color: #3083f2;
    border-color: #3083f2;
  }
  .el-step__title.is-process {
    font-weight: bold;
    color: #3083f2;
  }
  .bold {
    display: inline-block;
    height: 100%;
    font-size: 14px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    text-align: left;
    color: #3e3e3e;
    line-height: 20px;
  }
   .label {
    display: inline-block;
    height: 100%;
    font-size: 13px;
    font-family: Microsoft YaHei, Microsoft YaHei-Bold;
    font-weight: 700;
    text-align: right;
    color: #3e3e3e;
  }
  .el-icon-circle-close {
    top: 40px;
    right: 40px;
    width: 40px;
    height: 40px;
    font-size: 40px;
  }
}

</style>
