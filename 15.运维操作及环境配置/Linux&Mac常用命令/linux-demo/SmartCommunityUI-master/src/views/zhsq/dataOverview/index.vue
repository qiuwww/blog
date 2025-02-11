<style lang="less">
  .dataOverviewDetailLists {
    /* 右侧信息容器 */
    display: flex;

    @keyframes scroll
    {
      0% {transform:rotate(0deg);}
      100% {transform:rotate(360deg);}
    }
    .vjs-loading-spinner{
      animation:scroll 2s infinite linear;
    }


    .buttonStyle {
      background: #098cff;
      margin-right: 24px;
      color: #FFFFFF;
      font-size: 14px;
      font-weight: 400;
      text-align: left;
      color: #ffffff;
    }

    .leftTree {
      ::-webkit-scrollbar {
        width: 0px;
      }

      width: 320px;
      height: calc(100vh - 70px);
      min-height: 650px;
      opacity: 1;
      background: #ffffff;
      border-radius: 4px;
      text-align: center;
      position: relative;
      margin: 0 16px 19px 16px;
      box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
    }

    .head_div {
      margin-bottom: -9px;
      width: 320px;
    }

    .noValue {
      font-size: 22px;
      font-family: Microsoft YaHei, Microsoft YaHei-Regular;
      font-weight: 400;
      text-align: center;
      margin-top: 8px;
      color: #292929;
    }

    .noValueMovies {
      line-height: 65vh;
      opacity: 1;
      font-size: 22px;
      font-family: Microsoft YaHei, Microsoft YaHei-Regular;
      font-weight: 400;
      text-align: center;
      color: #292929;
    }

    .mt-container {
      width: calc(100% - 320px);
      height: calc(100vh - 70px);
      min-width: 950px;
      max-width: 1580px;
      min-height: 650px;
      opacity: 1;
      background: #ffffff;
      border-radius: 4px;
    }

    .alertMovies {
      width: calc(100% - 50px);
      max-height: calc(100% - 20px);
      margin: 20px 25px 0 25px;
    }

    .beforeDiv {
      border-left: 5px solid rgba(0, 0, 0, 0);
      height: 79px;
    }

    .activeDiv {
      border-left: 4px solid #098cff;
      height: 79px;

      /deep/ .ivu-list-item-meta-title,
      /deep/ .ivu-list-item-meta-description {
        color: #2f87eb;
      }
    }

    .video-player {
      /deep/ .vjs-modal-dialog-content {
        line-height: 55vh;
        font-size: 30px;
        font-family: Microsoft YaHei, Microsoft YaHei-Regular;
      }

      /deep/ .vjs-modal-dialog,
      /deep/ .vjs-tech,
      /deep/ #vjs_video_3 {
        border-radius: 10px;
      }
    }

    .mt-container {
      /deep/ .ivu-alert-info {
        border: none;
        background-color: white;
      }
    }

    .ivu-list {
      /deep/ .ivu-list-item-meta-title {
        font-size: 16px;
        font-family: Microsoft YaHei, Microsoft YaHei-Regular;
        font-weight: bold;
      }

      /deep/ .ivu-list-item-meta-description {
        font-size: 8px;
        font-family: Microsoft YaHei, Microsoft YaHei-Regular;
      }
    }

    .beforeDiv:hover {
      /deep/ .ivu-list-item-meta-title,
      /deep/ .ivu-list-item-meta-description {
        color: #2f87eb;
      }
    }

    .ivu-list-item {
      /deep/ .ivu-tag-dot {
        border: 0px solid #e8eaec !important;
        margin: 0;
      }
    }

    .updateTag {
      /deep/ .ivu-tag-text {
        color: #098cff;
      }
    }

    .deleteTag {
      /deep/ .ivu-tag-text {
        color: #eb0400;
      }
    }

    .ivu-page.mini {
      /deep/ .ivu-page-next,
      /deep/ .ivu-page-item,
      /deep/ .ivu-page-prev {
        border: 1px solid #b5b5b5;
      }

      /deep/ .ivu-page-item-active {
        background: #098cff;
      }

      /deep/ .ivu-page-item-active a {
        color: #ffffff;
      }
    }

    .leftTreeBody {

      height: calc(100% - 122px);
      overflow-y: auto;

      ::-webkit-scrollbar {
        width: 0px;
      }
    }
  }
</style>
<template>

  <div class="dataOverviewDetailLists" style="background-color: #dfe5ec;overflow: auto;min-height: 680px">
    <div class="leftTree">
      <div class="head_div">
        <Row type="flex" justify="center">
          <Input v-model="tMoviesManagementForm.name" icon="ios-search" placeholder="请输入需要查询的设备名称" inline
                 @on-click="searchByName" @keydown.enter.prevent.native="searchByName"
                 style="width: 180px;height: 30px;margin: 21px 99px 0 16px"/>
          <div style="margin:16px 99px 0 4px">
            <Button type="text" class="buttonStyle" @click="addMovies">添加</Button>
            <Button type="text" class="buttonStyle" @click="resetData">刷新</Button>
          </div>
          <Divider style="margin: 14px 0 8px 0"/>
        </Row>
      </div>
      <div class="leftTreeBody">
        <div v-if="menuItemList.length<1" class="noValue">暂无设备</div>
        <List v-for="(menuItem, menuIndex) in menuItemList" :key="menuIndex" :loading="getListLoding"
              style="height: 79px;border-bottom: 1px solid rgba(204, 204, 204, 0.4);text-align: left">
          <div class="beforeDiv"
               @click="changeEquipment(menuIndex)"
               :class="{activeDiv:currentLi==menuIndex}"
          >
            <ListItem style="padding-top: 25px">
              <ListItemMeta style="margin-left: 20px" :title="menuItem.name"
                            :description="menuItem.name"/>
              <div style="margin-top: -21px">
                <Tag type="dot" color="primary" class="updateTag" @click.native="updateData(menuItem.id)">修改</Tag>
                <Tag type="dot" color="error" class="deleteTag" @click.native="deleteData(menuItem.id)">删除</Tag>
              </div>
            </ListItem>
          </div>
        </List>
        <div style="position: absolute;bottom: 98px;width: 100%">
          <Page :total="total" size="small" :page-size="tMoviesManagementForm.pageSize" v-if="menuItemList.length >=1"
                :current="tMoviesManagementForm.pageNumber" @on-change="equimentPageChange"/>
        </div>
      </div>
    </div>

    <div class="mt-container">

      <div v-if="menuItemList.length < 1" class="noValueMovies">暂无设备</div>
      <div class="alertMovies" v-if="menuItemList.length >=1 && !ys" :loading="moviesLoading">

        <video class="video-js" style="width:100%;height: 0px" ref="player" muted preload controls>监控视频播放错误</video>
        <div class="vjs-loading-spinner" style="left:65%;top:45%" dir="ltr" ref="spinVideo"><span class="vjs-control-text"></span></div>
        <video-player class="vjs-custom-skin"
                      :options="playerOptions"
                      @ready="playerReadied"
                      @waiting="onPlayerWaiting"
                      v-if="rtsp==null"
        >
        </video-player>

      </div>
      <div class="alertMovies" v-if="menuItemList.length >=1 && ys":loading="moviesLoading" id="alertMovies">
        <div id="video-container" style="width:100%;height:100%"></div>
      </div>
    </div>

    <updateMovies v-model="addMoviesShow" v-on:handleSearch="getData"
                  :tMoviesManagementId="tMoviesManagementId"></updateMovies>
  </div>
</template>
<script>
  import {
    cameraInfoAdd,
    cameraInfoDelete,
    cameraInfoModify,
    loadAllBySelectFromGrid,
    cameraInfo,
  } from "@/api/wulian";
  import updateMovies from './updateMovies'
  import {videoPlayer} from 'vue-video-player'
  import axios from 'axios'
  import 'videojs-contrib-hls'
  import videojs from 'video.js'
  import flvjs from "flv.js"
  window.videojs = videojs

  export default {
    created() {

    },
    components: {
      updateMovies,
      videoPlayer
    },
    data() {
      return {
        id: "1",
        rtsp:"",
        ys:false,
        player: null,
        moviesLoading:false,
        mWidth: '',//计算右边视频容器宽度
        aWidth: '',//计算视频宽度
        overflowApp: '',//窗体缩小滚动条
        addMoviesShow: false,//添加摄像头显示
        tMoviesManagementId: '',//修改删除id
        isActive: false,//是否选中设备
        currentLi: '',
        getListLoding: true,//设备列表加载
        menuItemList: [],//设备列表
        playTime: '',
        timer:'',//加载定时器
        current: '',
        playerOptions: {
          // videojs and plugin options
          height: '720',
          autoplay: true,
          muted: true,
          language: 'en',
          // playbackRates: [0.7, 1.0, 1.5, 2.0],
          sources: [{
            withCredentials: false,
            type: "application/x-mpegURL",
            src: ''
            // src: "https://logos-channel.scaleengine.net/logos-channel/live/biblescreen-ad-free/playlist.m3u8"
            // src: "http://ivi.bupt.edu.cn/hls/cctv3hd.m3u8"
            // src: "http://207.238.82.115/live/ch0.m3u8"
          }],
          controlBar: {
            timeDivider: false,
            durationDisplay: false
          },
          flash: { hls: { withCredentials: false }},
          html5: { hls: { withCredentials: false }},
          poster: ""
        },

        tMoviesManagementForm: {
          // id: null,
          // 搜索框对应data对象
          pageNum: 1, // 当前页数
          pageSize: 7, // 页面大小
          startDate: null,//开始时间
          endDate: null,//结束时间
          sort: 'createTime', // 默认排序字段
          order: 'desc', // 默认排序方式
          name: '',
          // type: '',
          // moviesNumber: '',
          // appKey: '',
          // appSecret: '',
          url: '',
          queryStr: "",
          gridId: null,
        },
        total: 1,//监控设备条数

      }
    },
    methods: {
      //准备好播放
      playerReadied(player) {
        var hls = player.tech({ IWillNotUseThisInPlugins: true }).hls
        player.tech_.hls.xhr.beforeRequest = function(options) {
          // console.log(options)
          return options
        }
      },
      //视频等待
      onPlayerWaiting(){
        // this.$refs.spinVideo.setStyle("","");
      },
      addMovies() {
        this.addMoviesShow = true;
        this.tMoviesManagementId = ''
      },

      //刷新设备
      resetData() {
        this.getListLoding = true
        this.getData()
      },

      //修改监控设备数据
      updateData(moviesId) {

        this.tMoviesManagementId = moviesId
        this.addMoviesShow = true;
      },
      //单一删除
      deleteData(v) {
        this.$Modal.confirm({
          title: "确认删除",
          content: "您确认要删除所点击选的数据?",
          onOk: () => {
            this.patchdeleteData(v);
          },
          onCancel: () => {
            this.$Message.info('取消了当前的操作行为！');
          },
        });
      },

      //删除（后台）
      patchdeleteData(id) {
        this.getListLoding = true
        if (id == null || id == undefined) {
          this.$Message.error('入参为空，删除失败');
        }
        cameraInfoDelete({"id":id}).then(res => {
          if (res && res.success) {
            this.$Message.success('删除成功');
            this.getData();
          } else {
            this.$Message.error('删除失败');
          }
        });
      },

      //搜索
      searchByName() {
        this.getListLoding = true
        this.getData()
      },
      //查询@/assets列表
      getData() {
        cameraInfo(this.tMoviesManagementForm).then(res => {
          this.getListLoding = false
          if (res) {
            if (res.code == 200) {
              this.total = res.data.total
              this.menuItemList = res.data.records
              this.changeEquipment(0)
              this.$nextTick(function () {
                if (this.menuItemList[0].url.split(":")[0]=='rtsp') {
                  this.importMovies()
                }
              })
            } else {
              this.$Message.error(res.msg);
            }
          } else {
            this.$Message.error('获取监测设备列表失败');
          }
        }).catch(err => {
          this.$Message.error('获取监测设备列表失败');
        });
      },

      //设备列表分页切换
      equimentPageChange(v) {
        this.getListLoding = true
        this.tMoviesManagementForm.pageNum = v;
        this.getData()
      },

      //切换设备
      changeEquipment: function (v) {
        if (v == undefined || v == null) {
          this.$Message.error('获取设备失败:设备列表参数为空');
        }
        this.ys = false
        this.id = String(this.menuItemList[v].id);
        if (this.menuItemList[v].type == 'rtsp') {
          this.moviesLoading = true
          this.playerOptions['sources'][0]['src'] = null
          this.rtsp = this.menuItemList[v].url
          this.$refs.player.style.height = "calc(100vh - 217px)"
          this.importMovies()

        } else if (this.menuItemList[v].type == "萤石") {
          this.ys = true;
          this.moviesLoading = true;
          this.$forceUpdate()
          let url = this.menuItemList[v].url;
          let appSecret = this.menuItemList[v].appSecret;
          let appKey = this.menuItemList[v].appKey;
          let _this = this;
          //清空原来有的
          if (_this.player) {
            let domVideo = document.getElementById("EZUIKitPlayer-video-container");
            if(domVideo){
              domVideo.parentNode.removeChild(domVideo);
            }
            $("#video-container").empty();
            let dom = document.getElementById("video-container");
            if(dom){
              let children = dom.childNodes;
              if(children){
                for (let i = 0; i < children.length; i++) {
                  if(children[i]){
                    dom.removeChild(children[i]);
                  }
                }
              }
            }

            _this.player = undefined
          }
          //获取token
          $.ajax({
            url: "https://open.ys7.com/api/lapp/token/get",
            type: "post",
            timeout: 12000,
            dataType: "json",
            contentType: "application/x-www-form-urlencoded;charset=utf-8",
            data: {
              "appKey": appKey,
              "appSecret": appSecret,
            },
            success: function (result, status, xhr) {
              if (result && result.code == 200) {
                let accessToken = result.data.accessToken;
                let height = document.body.clientHeight - 120
                let w = document.body.clientWidth - 600
                _this.player = new EZUIKit.EZUIKitPlayer({
                  autoplay: true,
                  id: "video-container",
                  accessToken: accessToken,
                  url: url,
                  template: "simple", // simple - 极简版;standard-标准版;security - 安防版(预览回放);voice-语音版；
                  // 视频上方头部控件
                  //header: ["capturePicture", "save", "zoom"], // 如果templete参数不为simple,该字段将被覆盖
                  //plugin: ['talk'],                       // 加载插件，talk-对讲
                  // 视频下方底部控件
                  // footer: ["talk", "broadcast", "hd", "fullScreen"], // 如果template参数不为simple,该字段将被覆盖
                  // audio: 1, // 是否默认开启声音 0 - 关闭 1 - 开启
                  // openSoundCallBack: data => console.log("开启声音回调", data),
                  // closeSoundCallBack: data => console.log("关闭声音回调", data),
                  // startSaveCallBack: data => console.log("开始录像回调", data),
                  // stopSaveCallBack: data => console.log("录像回调", data),
                  // capturePictureCallBack: data => console.log("截图成功回调", data),
                  // fullScreenCallBack: data => console.log("全屏回调", data),
                  // getOSDTimeCallBack: data => console.log("获取OSDTime回调", data),
                  width: w,
                  height: height
                });
              } else {
                this.$Message.error('获取萤石云token接口请求失败：返回异常');
              }
            },
            error: function (data) {
              this.$Message.error('获取萤石云token接口请求失败');
              window.alert("接口请求失败");
              //opts.error(data);
            }
          });

        } else if (this.menuItemList[v].type == 'hls') {
          this.rtsp = null
          if (this.$refs.player) {
            this.$refs.player.style.height = "0px"
          }
          this.playerOptions['sources'][0]['type'] ="application/x-mpegURL"
          this.playerOptions['sources'][0]['src'] =this.menuItemList[v].url

        } else {
          this.rtsp = null
          if (this.$refs.player) {
            this.$refs.player.style.height = "0px"
          }
          this.playerOptions['sources'][0]['type'] = "video/mp4"
          this.playerOptions['sources'][0]['src'] = this.menuItemList[v].url
        }

        this.currentLi = v
        this.isActive = !this.isActive

      },
      //接入视频
      importMovies(){
        if (flvjs.isSupported()) {
          let video = this.$refs.player;
          if (video) {
            this.player = flvjs.createPlayer({
              type: "flv",
              isLive: true,
              url: 'ws://'+location.host+'/socket/'+`rtsp/${this.id}/?url=${this.rtsp}`
            });
            this.player.attachMediaElement(video);
            try {
              this.player.load();
              this.player.play();

            } catch (error) {
              console.log(error);
            };
          }
        }
      },

      //初始化表单
      initForm() {
        this.tMoviesManagementForm = {
          id: null,
          // 搜索框对应data对象
          pageNumber: 1, // 当前页数
          pageSize: 7, // 页面大小
          startDate: null,//开始时间
          endDate: null,//结束时间
          sort: 'createTime', // 默认排序字段
          order: 'desc', // 默认排序方式
          name: '',
          type: '',
          moviesNumber: '',
          appKey: '',
          appSecret: '',
          url: '',
        }
      },

    },

    mounted() {
      this.getData()
      const that = this
      that.mWidth = 'width:calc(100% - 50px)';
      that.aWidth = 'width:calc(100% - 400px)';
      window.onresize = () => {
        window.screenWidth = document.body.clientWidth
        window.screenHeight = document.body.clientHeight
        this.playerOptions['height'] = window.screenHeight - 120
        if (window.screenWidth < 1770) {
          that.overflowApp = {'overflow-x': 'auto'}
        } else {
          that.overflowApp = {'overflow-x': ''}
        }
      }
    },
    beforeDestroy () {
      clearTimeout(this.reloadPlayTime);
      this.hls = null;
      this.player.load();
      clearTimeout(this.timer);
    }
  }
</script>
