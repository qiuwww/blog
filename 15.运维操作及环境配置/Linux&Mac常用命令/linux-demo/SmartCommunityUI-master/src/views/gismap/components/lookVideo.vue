<style lang="less" scoped>
.lookVideo {
  .noImg {
    width: 80px;
    border: 1px dashed rgb(204, 204, 204);
    margin-left: 20px;
    height: 100px;
    line-height: 93px;
    margin-top: 10px;
    text-align: center;
    color: #ccc;
    user-select: none;
  }

  .img {
    width: 85px;
    margin-top: 10px;
    border: 1px dashed #ccc;
    padding: 2px;
  }

  .ivu-form-item {
    margin-bottom: 0px !important;
  }
}
</style>
<template>
  <Modal v-model="show" :title="editTitle" :mask-closable="false" class="lookVideo"
         :width="500">
    <Form ref="lookForm" :model="lookForm" :label-width="125">

      <Divider style="margin:0 auto;color:#2d8cf0;" orientation="left">基本信息</Divider>

      <FormItem label="摄像头名称" prop="merchantSort">
        沙河湾小区摄像头1
        <!--              {{ lookForm.merchantSort }}-->
      </FormItem>

      <FormItem label="编号" prop="legalId">
        ka2a004
        <!--              {{ lookForm.legalId }}-->
      </FormItem>
      <FormItem label="是否在线" prop="businessScope">
        是
        <!--              {{ lookForm.businessScope }}-->
      </FormItem>

      <FormItem label="所属小区" prop="merchantName">
        桃源新股
        <!--              {{ lookForm.merchantName }}-->
      </FormItem>

      <FormItem label="详细地址" prop="legalEntity">
        合江亭大道23号桃源新股2栋3单元2303号
        <!--              {{ lookForm.legalEntity }}-->
      </FormItem>
      <Divider style="margin:0 auto;color:#2d8cf0;" orientation="left">视频</Divider>


      <video-player class="video-player vjs-custom-skin"
                    ref="videoPlayer"
                    :playsinline="true"
                    :options="playerOptions"
                    @play="onPlayerPlay($event)"
      ></video-player>


    </Form>
    <div slot="footer">
      <Button type="text" @click="show=false">取消</Button>
    </div>
  </Modal>
</template>
<script>
import {formartDate, nginxUrl} from '@/api/tools/tool';
import {getDictionary} from '@/api/index'

export default {

  name: 'lookVideo',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    modalTitle: {
      type: String
    },
    lookVideoId: {
      type: String
    },
  },
  data() {
    return {
      loading: false,
      updateShow: false,
      show: this.value,
      imageUrlList: [],
      editTitle: this.modalTitle,
      lookForm: {
        houseName: '',
        merchantSort: '',
        merchantName: '',
        merchantAddress: '',
        businessScope: '',
        legalEntity: '',
        legalPhone: '',
        street: '',
        legalId: '',
        location: '',
        legalCommunity: '',
        legalGrid: '',
        headPortrait: '',
      },
      merchantSortPriority: [],
      // 视频播放
      playerOptions: {
        playbackRates: [0.5, 1.0, 1.5, 2.0], //可选择的播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          type: "",
          src: '/video/VID20201009102221.MOV'//url地址
        }],
        poster: "", //你的封面地址
        // width: document.documentElement.clientWidth,
        notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,//当前时间和持续时间的分隔符
          durationDisplay: true,//显示持续时间
          remainingTimeDisplay: false,//是否显示剩余时间功能
          fullscreenToggle: true  //全屏按钮
        }
      }
    }

  },
  methods: {
    //点击编辑
    handelSubmit() {
      this.updateShow = true;
    },
    getMerchantSortPriority() {//获取商户类别
      getDictionary({"fieldName": "merchantSortData"}).then(res => {
        if (res && res.success) {
          this.merchantSortPriority = res.data;
        }
      })
    },
    //初始化表单
    initForm() {
      this.imageUrlList = [];
      this.lookForm = {
        houseName: '',
        merchantSort: '',
        merchantName: '',
        merchantAddress: '',
        businessScope: '',
        legalEntity: '',
        legalPhone: '',
        legalId: '',
        location: '',
        street: '',
        legalCommunity: '',
        legalGrid: '',
        headPortrait: '',
      };
      this.getMerchantSortPriority();
    },
    //提交数据
    closeModal(val) {
      this.$emit('input', val);
    },
    //方法
    full(element) {
      //做兼容处理
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      } else if (element.oRequestFullscreen) {
        element.oRequestFullscreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullScreen();
      } else {
        document.IsFullScreen = true;
      }
    },
    onPlayerPlay(player) {
      this.full(player)
    },
  },
  watch: {
    value(val) {
      this.show = val;
    },
    show(val) {
      this.initForm();
      this.editTitle = this.modalTitle;
      if (val) {
        // if (this.TZhsqMerchantProfileId != null && this.TZhsqMerchantProfileId.trim().length > 0) {
        //   getTZhsqMerchantProfile({id: this.TZhsqMerchantProfileId}).then(res => {
        //     if (res && res.code == 200) {
        //       let sort = this.merchantSortPriority.filter(item => item.number == res.data.merchantSort);
        //       if (sort.length > 0) {
        //         this.lookForm.merchantSort = sort[0].name;
        //       }
        //       // this.lookForm.merchantSort = res.data.merchantSort;
        //       this.lookForm.merchantName = res.data.merchantName;
        //       this.lookForm.houseName = res.data.houseName;
        //       this.lookForm.merchantAddress = res.data.merchantAddress;
        //       this.lookForm.businessScope = res.data.businessScope;
        //       this.lookForm.legalEntity = res.data.legalEntity;
        //       this.lookForm.legalPhone = res.data.legalPhone;
        //       this.lookForm.legalId = res.data.legalId;
        //       if (res.data.location == null || res.data.location == '') {
        //         this.lookForm.location = '未标注';
        //       } else if (res.data.location != null || res.data.location != '') {
        //         this.lookForm.location = '已标注';
        //       }
        //       this.lookForm.legalCommunity = res.data.legalCommunity;
        //       this.lookForm.legalGrid = res.data.legalGrid;
        //       this.lookForm.street = res.data.street;
        //       this.lookForm.headPortrait = res.data.headPortrait;
        //     } else {
        //       this.$Message.error(res.msg);
        //     }
        //   });
        // }
      } else {
        this.closeModal(val);
      }
    }
  },
}
</script>
