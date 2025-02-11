<template>
  <Modal v-model="show" :title="editTitle" :mask-closable="false" class="tShooting_add">
    <Form>
      <Row>
        <Col :span="24">
          <video-player class="video-player vjs-custom-skin" ref="videoPlayer" :playsinline="true"
                        :options="playerOptions">
          </video-player>
        </Col>
      </Row>
    </Form>
    <div slot="footer" v-if="!disabled">
      <Button type="text" @click="show=false">取消</Button>
    </div>
  </Modal>
</template>
<script>
    import {videoPlayer} from 'vue-video-player';
    export default {
        name: "myVideo",
        components: {
            videoPlayer
        },
        props: {
            value: {
                type: Boolean,
                default: false
            },
            videoUrl: {
                type: String
            },
            modalTitle: {
                type: String
            }
        },
        data() {
            return {
                playerOptions: {},
                player: '',
                vUrl: this.videoUrl,
                videoTitle: '',
                show: this.value,
                editTitle: this.modalTitle,
                loading: true,
                disabled: false,
            }
        },
        methods: {
            closeModal(val) {
                this.$emit('input', val);
            }
        },
        watch: {
            value(val) {
                this.show = val;
                this.playerOptions = {
                    playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
                    autoplay: true, //如果true,浏览器准备好时开始回放。
                    muted: false, // 默认情况下将会消除任何音频。
                    loop: false, // 导致视频一结束就重新开始。
                    preload: 'auto',
                    // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。
                    // auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                    language: 'zh-CN',
                    aspectRatio: '16:9',
                    // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。
                    // 值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                    fluid: true,
                    // 当fluid为true时，Video.js player将拥有流体大小。
                    // 换句话说，它将按比例缩放以适应其容器。
                    sources: [{
                        type: "video/mp4",
                        src: this.videoUrl
                    }],
                    poster: "poster.jpg", //你的封面地址
                    width: document.documentElement.clientWidth,
                    notSupportedMessage: '此视频暂无法播放，请稍后再试',
                    //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                    controlBar: {
                        timeDivider: true,
                        durationDisplay: true,
                        remainingTimeDisplay: false,
                        fullscreenToggle: true  //全屏按钮
                    }
                }
            },
            show(val) {
                this.loading = false;
                this.editTitle = this.modalTitle;
                if (!val) {
                    this.closeModal(val);
                }
            }
        }
    }
</script>
