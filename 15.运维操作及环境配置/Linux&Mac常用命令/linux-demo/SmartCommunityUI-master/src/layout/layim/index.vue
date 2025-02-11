<style lang="less">
body .layui-layim-min {
  border: 1px solid #2e77e5 !important;
  background: #2e77e5;
  border-radius: 20px;
  padding: 10px;
  top: auto !important;
  left: auto !important;
  bottom: 10px;
  right: 10px;
}
.layim-list-gray {
    filter: grayscale(100%);
}
.layui-layim-main {
    position: relative;
    top: -98px;
    left: 0px;
}
.layui-layim-info {
    height: 50px;
    font-size: 0px;
    padding: 0px 15px;
}
.layui-layim-info .layui-layim-user {
    max-width: 150px;
    margin-right: 5px;
    font-size: 16px;
}
.layim-tab-content li h5 span, .layui-layim-info .layui-layim-user, .layui-layim-list li p, .layui-layim-list li span, .layui-layim-remark {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.layui-layim-status {
    position: relative;
    top: 2px;
    line-height: 19px;
    cursor: pointer;
}
.layui-layim-info * {
    font-size: 14px;
}
.layui-layim-tab {
    margin-top: 10px;
    padding: 9px 0px;
    font-size: 0px;
}
.layim-tab-content li h5 *, .layui-layim-info div, .layui-layim-skin li, .layui-layim-tab li, .layui-layim-tool li {
    display: inline-block;
    vertical-align: top;
}
.layui-layim-min .layui-layer-content {
  line-height: 20px !important;
  padding: 0px !important;
  margin: 0px !important;
  width: 20px !important;
  height: 19px !important;
  background-image: url("/img/00.jpg");
  background-size: 100%;

}
.layui-layim-min {
    display: none !important;//隐藏原来最小化
}
.layui-layim-min .layui-layer-content img {
  width: 20px !important;
  height: 20px !important;
  line-height: 20px !important;
  border-radius: 0 !important;
  display: none;
}

.layui-layim-min .layui-layer-content span {
  display: none;
}
.layui-layer .layui-layer-setwin .layui-layer-close.layui-layer-close1 {
  background-image: url("/lib/layer/theme/retina/svg/close-2.svg") !important;
}
.layui-layim-chat {
  background-color: #fff;
  display: none !important;
}
.player {
  width: 480px;
  height: 320px;
}

.player-name {
  margin: 8px 0;
}
.layui-layim-list li span {
    max-width: 114px !important;
}
.layim-scrollbar-class{
    display: flex;
    flex-wrap: wrap;
    overflow: auto;
    background-color: rgba(255,255,255,.9);
    &::-webkit-scrollbar {
      width: 0;
    }
}
.layim-tab-content:hover {
   overflow: visible !important;
   width: 255px;
}
.layim-tab-content{
  width: 255px;
  overflow: visible !important;
}
.layim-scrollbar-class:hover::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}

.layim-scrollbar-class:hover::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #aaa;
}

.layim-scrollbar-class:hover::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  background: #ededed;
  display: none;
}
.videoRTC-class-min{
  position:absolute;
  border: 1px solid #2e77e5 !important;
  background: #2e77e5;
  border-radius: 20px;
  padding: 10px;
  bottom: 10px;
  right: 10px;
  z-index: 999;
}
.videoRTC-class-min:hover{
    cursor:pointer;
}
.layui-layim-tab li.layim-this:after {
    background-color: #2d8cf0 !important;
}
.layim-status-online {
    color: #2d8cf0 !important;
}
</style>
<template>
  <div ref="layim">
    <div class="videoRTC-class-min" @click="showVideoList">
    <div style="line-height: 20px !important;
    padding: 0px !important;
    margin: 0px !important;
    width: 20px !important;
    height: 19px !important;
    background-image: url(/img/00.jpg);
    background-size: 100%;"></div>
    </div>
    <Modal
      title="视频通话"
      v-model="rtcVideo"
      draggable
      scrollable
      width="432"
      class-name="vertical-center-modal"
    >
      <div
        ref="anytRTCVideo"
        id="123456789789"
        style="
          min-width: 200px;
          min-height: 300px;
          z-index: 99999;
        "
      ></div>
      <div slot="footer"></div>
    </Modal>
    <div class="layui-layer layui-layer-page layui-box layui-layim"
      id="layui-layer100001"
      type="page"
      times="100001"
      showtime="0"
      v-if="videoList"
      contype="string"
      style="
        z-index: 19991015;
        width: 260px;
        height: 520px;
        top: calc(100% - 520px);
        left: calc(100% - 260px);
        background-image: none;
        display: block;
      "
    >
      <div class="layui-layer-title" style="cursor: move">&#8203;</div>
      <div id="layui-layim" class="layui-layer-content" style="height: 408px">
        <div class="layui-layim-main">
          <div class="layui-layim-info">
            <div class="layui-layim-user">智慧社区管理员</div>
            <div class="layui-layim-status">
              <span
                class="layui-icon layim-status-online"
                layim-event="status"
                lay-type="show"
                ></span
              >
              <ul class="layui-anim layim-menu-box">
                <li class="layim-this" layim-event="status" lay-type="online">
                  <i class="layui-icon"></i
                  ><cite class="layui-icon layim-status-online"></cite>在线
                </li>
                <li layim-event="status" lay-type="hide">
                  <i class="layui-icon"></i
                  ><cite class="layui-icon layim-status-hide"></cite>隐身
                </li>
              </ul>
            </div>
            <input
              class="layui-layim-remark"
              placeholder="编辑签名"
              value="我的签名"
            />
          </div>
          <ul class="layui-unselect layui-layim-tab">
            <li
              class="layui-icon layim-this"
              title="联系人"
              layim-event="tab"
              lay-type="friend"
            >
              
            </li>
            <li
              class="layui-icon"
              title="群组"
              layim-event="tab"
              lay-type="group"
            >
              
            </li>
            <li
              class="layui-icon"
              title="历史会话"
              layim-event="tab"
              lay-type="history"
            >
              
            </li>
          </ul>
          <div class="layim-scrollbar-class">
          <ul class="layui-unselect layim-tab-content layui-show layim-list-friend">
            <li v-for="(one,index) in moth" :key="'a'+index">
              <h5 layim-event="spread" lay-type="false">
                <i class="layui-icon"></i><span tooltip="one.title">{{one.title}}</span
                ><em>(<cite class="layim-count" >{{one.children.length}}</cite>)</em>
              </h5>
              <ul>
                <li v-for="(two,index) in one.children" :key="'b'+index">
                  <h5 layim-event="spread" lay-type="false">
                    <i class="layui-icon"></i><span tooltip="two.title">{{two.title}}</span
                    ><em>(<cite class="layim-count" >{{two.children.length}}</cite>)</em>
                  </h5>
                    <ul>
                      <li v-for="(item,index) in two.children" :key="'c'+index">
                        <h5 layim-event="spread" lay-type="false">
                          <i class="layui-icon"></i><span tooltip="item.title">{{item.title}}</span
                          ><em>(<cite class="layim-count" >{{item.children.length}}</cite>)</em>
                        </h5>
                  <ul class="layui-layim-list">
                    <li
                      data-index="0"
                      :class="{'layim-list-gray':items.online}"
                      v-for="items in item.children" :key="items.id"
                    >
                      <img :src="items.img? items.img : '/img/archives/tx_mr.png'"/>
                      <span>{{items.title}}</span>
                      <div style="position: absolute;width: 36px;display: inline;height: 36px;right: 60px;">
                          <img @click="getLoction(items.online,items.id)" src="img/videoImg/947e83bafb0017050f10658cbe3ef36.png"/>
                      </div>
                      <div style="position: absolute;width: 36px;display: inline;height: 36px;right: 21px;">
                          <img @click="joinVideo(items.online,items.id)" src="img/videoImg/d31982f76873de30aa2f403aed2c5fd.png"/>
                      </div>
                      <p>网格是我家</p>
                      <span class="layim-msg-status">new</span>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
          </div>
          <ul class="layui-unselect layim-tab-content">
            <li>
              <ul class="layui-layim-list layui-show layim-list-group">
                <li class="layim-null">暂无群组</li>
              </ul>
            </li>
          </ul>
          <ul class="layui-unselect layim-tab-content">
            <li>
              <ul class="layui-layim-list layui-show layim-list-history">
                <li
                  layim-event="chat"
                  data-type="history"
                  data-index="friend100001"
                  class="layim-friend100001"
                >
                  <img
                    src="http://tp4.sinaimg.cn/1345566427/180/5730976522/0"
                  /><span>网格员1</span>
                  <p>网格是我家</p>
                  <span class="layim-msg-status">new</span>
                </li>
              </ul>
            </li>
          </ul>
          <ul class="layui-unselect layim-tab-content">
            <li>
              <ul
                class="layui-layim-list layui-show"
                id="layui-layim-search"
              ></ul>
            </li>
          </ul>
          <ul class="layui-unselect layui-layim-tool">
            <li
              class="layui-icon layim-tool-search"
              layim-event="search"
              title="搜索"
            >
              
            </li>
            <li
              class="layui-icon layim-tool-skin"
              layim-event="skin"
              title="更换背景"
            >
              
            </li>
            <li
              class="layui-icon layim-tool-about"
              layim-event="about"
              title="关于"
            >
              
            </li>
          </ul>
          <div class="layui-layim-search">
            <input /><label class="layui-icon" layim-event="closeSearch"
              >ဇ</label
            >
          </div>
        </div>
      </div>
      <span  class="layui-layer-setwin"
        ><a @click="showVideoList" class="layui-layer-ico layui-layer-close layui-layer-close1"></a
      ></span>
    </div>
  </div>
</template>
<script>
import ArRTC from "ar-rtc-sdk";
import ArRTM from 'ar-rtm-sdk';
import Cookies from 'js-cookie';
import { getRequest} from '@/libs/axios';
import {getGridMemberTree} from '@/api/zhsq/tZhsqGridMember/tZhsqGridMember'
export default {
  data() {
    return {
      layim: null,
      rtcVideo: false,
      videoList:false,
      moth: [],
      uid: null,
      webid:"7c1d5fc6feef4b4a9d8c1262ffcc0fb8",
      //headPortrait
      rtc: {
        // 用来放置本地客户端。
        client: null,
        // 用来放置本地音视频频轨道对象。
        localAudioTrack: null,
        localVideoTrack: null,
      },
      localInvitation: null, // 通过 ArRTMClient.createLocalInvitation 创建的实例
      ArRTMClient: null,     // 通过 ArRTM.createInstance 创建的RTM客户端实例
      ArRTCClient: null,     // 通过 ArRTC.createClient 创建的客户端对象
      audioTrack: null,      // 本地音频轨道
      videoTrack: null,      // 本地视频轨道
      audioDevices: [],      // 本地音频设备列表
      videoDevices: [],       // 本地视频设备列表
      remoteUid: '4567',          // 远端用户的 uid
      options: {
        // 替换成你自己项目的 App ID。
        appId: "e020270b981420a819f95bed4a8b1ffd",
        // 传入目标频道名。
        channel: "4567",
        // 如果你的项目开启了 App 证书进行 Token 鉴权，这里填写生成的 Token 值。
        token: null,
      },
    };
  },
  methods: {
    //列表展示
    showVideoList(){
        this.videoList=!this.videoList
    },
    //获取坐标
    getLoction(use,val){
        if(use){
            return;
        }
        console.log(val)
        //this.websock.send('{"name":"123","type":"location"}')
    },
    //加入视频聊天
    async joinVideo(use,val){
            this.rtcVideo=true;
            this.createClient();
            this.createTrack();
            this.callRemote();
    },

    // 获取音视频设备
    async getDevices() {
      const [ videoDevices, audioDevices ] = await Promise.all([
        ArRTC.getCameras(),
        ArRTC.getMicrophones(),
      ]);
      this.videoDevices = videoDevices;
      this.audioDevices = audioDevices;
    },

// 创建本地音视频轨道
    async createTrack() {

      // 通过麦克风采集的音频创建本地音频轨道对象。
      this.audioTrack = await ArRTC.createMicrophoneAudioTrack();
      // 通过摄像头采集的视频创建本地视频轨道对象。
      this.videoTrack = await ArRTC.createCameraVideoTrack();
      // this.audioTrack = await ArRTC.createMicrophoneAudioTrack();
      // // 如果没有摄像头设备就不创建视频轨道
      // if (this.videoDevices.length) {
      //   this.videoTrack = await ArRTC.createCameraVideoTrack();
      // }

    },

// 创建 RTM 和 RTC 客户端对象
    createClient() {
      this.ArRTMClient = ArRTM.createInstance(this.options.appId);
      this.ArRTCClient = ArRTC.createClient({ mode: 'rtc', codec: 'h264' });

      // 监听点对点消息
      this.listenMessageFromPeer();
      // 登录 RTM
      this.ArRTMClient.login({ uid: "1234" }).then(() => {
        // 监听远端用户上下线
        this.listenPeersOnlineStatusChanged();
        // 订阅人员上下线
        this.subscribePeersOnlineStatus();
      }).catch((err) => {
        console.log(err);
      });
    },

// 监听点对点消息 (这里主要的作用就是远端通过rtm消息，告诉我们他的一些状态)
    listenMessageFromPeer() {
      this.ArRTMClient.on('MessageFromPeer',  message => {
        // 状态码自己约定
        if (message.text === '100') {
          // 对方正在通话中
        } else if (message.text === '200') {
          // 对方挂断 我们也要离开房间
          this.handleLeave();
        }
      });
    },

    // 监听远端用户发布音视频流
    listenUserPublished() {
      this.ArRTCClient.on("user-published", async (user, mediaType) => {
        await this.ArRTCClient.subscribe(user, mediaType);
        this.inTheCall = true;
        if (mediaType === 'video') {
          // 当订阅完成后，就可以从 `user` 中获取远端视频轨道对象了
          const remoteVideoTrack = user.videoTrack;
          // 动态插入一个 DIV 节点作为播放远端视频轨道的容器
          const playerContainer = document.createElement("div");
          // 给这个 DIV 节点指定一个 ID，这里指定的是远端用户的 UID
          playerContainer.id = user.uid;
          playerContainer.style.width = "400px";
          playerContainer.style.height = "300px";
          //document.body.append(playerContainer);
          // 订阅完成，播放远端音视频
          // 传入我们刚刚给 DIV 节点指定的 ID，让 SDK 在这个节点下创建相应的播放器播放远端视频
          this.$refs.anytRTCVideo.append(playerContainer);
          //user.videoTrack.play(`player-${uid}`);
          remoteVideoTrack.play(user.uid);
        } else if (mediaType === 'audio') {
          // 播放远端音频 (音频不需要元素)
          user.audioTrack.play();
        }
      });
    },

    // 监听远端用户上下线
    listenPeersOnlineStatusChanged() {
      this.ArRTMClient.on('PeersOnlineStatusChanged', (status) => {
        const ONLINE = status[this.remoteUid] === 'ONLINE';
        // 如果对方在线 就发送呼叫邀请
        ONLINE && this.callRemote(this.remoteUid);
      });
    },
    // 监听 localInvitation 状态
    localInvitationListen() {
      // 被叫已接受呼叫邀请时触发
      this.localInvitation.on('LocalInvitationAccepted', (response) => {
        // 对方同意接听 本地加入频道
        this.joinChannel();
        // 监听远端用户发布音视频流
        this.listenUserPublished();
        console.log(response, '被叫已接受呼叫邀请时触发');
        this.$Message.success('已接受邀请')
        //this.localInvitation.cancel()
      });
      // 被叫已接受呼叫邀请时触发
      this.localInvitation.on('LocalInvitationRefused', (response) => {
         this.$Message.success('已拒绝邀请')
         this.localInvitation.cancel()
      });
    },

    // 加入频道
    joinChannel() {
      const uid =this.ArRTCClient.join(this.options.appId, this.remoteUid, null, this.remoteUid).then(() => {
        //this.videoTrack && this.videoTrack.play('local_video');
        // 发布本地音视频
        this.audioTrack && this.ArRTCClient.publish(this.audioTrack);
        this.videoTrack && this.ArRTCClient.publish(this.videoTrack);
      }).catch((err) => {
        console.log(err);
      });
      const remoteVideoTrack = this.videoTrack;
      const playerContainer = document.createElement("div");
      playerContainer.id = uid;
      playerContainer.style.width = "400px";
      playerContainer.style.height = "300px";
      this.$refs.anytRTCVideo.append(playerContainer);
      remoteVideoTrack.play(uid);
    },

    // 订阅人员上下线
    subscribePeersOnlineStatus() {
      this.ArRTMClient.subscribePeersOnlineStatus([this.remoteUid]);
    },

    // 呼叫远端用户
    callRemote() {
      // 创建一个 LocalInvitation 实例
      this.localInvitation = this.ArRTMClient.createLocalInvitation(this.remoteUid);
      // 这里将呼叫邀请的内容 设置为视频通讯时使用的频道id - 进入同一个频道
      this.localInvitation.content = JSON.stringify({
        Mode: 0, // 呼叫类型 视频通话 0 语音通话 1
        Conference: false, // 是否是多人会议
        ChanId: this.remoteUid, // 频道房间
        UserData: "",
        SipData: "",
        VidCodec: ["H264"],
        AudCodec: ["Opus"],
      });
      // 发起呼叫
      this.localInvitation.send();
      // 监听 localInvitation 状态
      this.localInvitationListen();
    },

    // 挂断
    handleLeave() {
      // 离开频道
      this.ArRTCClient.leave();
      // 取消已发送的呼叫邀请
      this.localInvitation.cancel();
    },
    init() {
      let _this = this;
      layui.use(["jquery", "layim"], function (exports) {
        var $ = layui.jquery;
        _this.layim = layui.layim;
        getGridMemberTree({}).then(res => {
          if(res&&res.data){
            _this.moth=res.data;
          }
      });
       _this.initLay("");
      });
    },
    //联系人树
    initLay(data) {
      let _this = this;
      if (this.layim) {
        this.layim.config({
          title: "",
          init: {
            //url: '/layui/getList.json',
            //type: "get"
            mine: {
              username: "智慧社区管理员", //我的昵称
              id: 123, //我的ID
              avatar: "http://tp4.sinaimg.cn/1345566427/180/5730976522/0", //我的头像
              sign: "我的签名",
              status: "online",
            },
            //好友列表，同PC版本
            friend: [
              {
                groupname: "江阳区网格", //好友分组名
                id: 1, //分组ID
                list: [
                  {
                    //分组下的好友列表
                    username: "网格员1", //好友昵称
                    id: 100001, //好友ID
                    avatar: "http://tp4.sinaimg.cn/1345566427/180/5730976522/0", //好友头像
                    sign: "网格是我家", //好友签名
                    status: "online", //若值为offline代表离线，online或者不填为在线
                  },
                ],
              },
            ],
          }, //获取主面板列表信息，下文会做进一步介绍
          min: true, //最小化展示
          //msgbox: layui.cache.dir + 'css/modules/layim/html/msgbox.html', //消息盒子页面地址，若不开启，剔除该项即可

          //find: layui.cache.dir + 'css/modules/layim/html/find.html', //发现页面地址，若不开启，剔除该项即可

          //chatLog: layui.cache.dir + 'css/modules/layim/html/chatlog.html', //聊天记录页面地址，若不开启，剔除该项即可
        });
      }
    },
  },
  watch: {

  },
  mounted() {
    this.init();

  },
};
</script>
