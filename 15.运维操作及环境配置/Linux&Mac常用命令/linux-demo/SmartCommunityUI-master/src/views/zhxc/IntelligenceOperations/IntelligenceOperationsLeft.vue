<template>
  <div class="Leftclass">
    <div class="OperationsLeftclass">
      <div class="yjylkm3">
        <div class="titleName">
          <p class="name gradient-blue">{{data.left1.name}}</p>

          <p class="en">
            <span>{{data.left1.englishname}}</span>
            <span></span>
          </p>
        </div>
        <div class="percent-box video-list el-row" style="margin-left: -2.5px; margin-right: -2.5px; margin-top: 20px">
          <div v-for="(item,i) in data.left1.monitoring" :key="i" class="relative el-col el-col-8" style="padding-left: 2.5px; padding-right: 2.5px">
            <img :src="'/tempfile'+item.picture" height="75" style="width: 100%"/><i>{{item.label}}</i>
          </div>
        </div>
        <div class="titleName" style="margin-top: 20px">
          <p class="name gradient-blue">{{data.left2.name}}</p>
          <p class="en"><span>{{data.left2.englishname}}</span><span></span></p>
        </div>

        <table class="room-table">
          <thead class="table-title">
            <tr>
              <th>{{data.left2.table.name1}}</th>
              <th>{{data.left2.table.name2}}</th>
              <th>{{data.left2.table.name3}}</th>
            </tr>
          </thead>
          <tbody class="table-content">
            <tr v-for="(item,i) in data.left2.project" :key="i" @click="tableClick(item,i)">
              <td :title="item.room" style="font-size: 0.9vw">{{item.room}}</td>
              <td class="textOverflow" :title="item.contacts"><Icon type="md-person" v-if="item.contacts"/>{{item.contacts}}</td>
              <td class="textOverflow" :title="item.surplus">{{item.surplus}}</td>
            </tr>
          </tbody>
        </table>
        <div class="my-table">
          <div class="titleName">
            <p class="name gradient-blue">{{data.left3.name}}</p>
            <p class="en">
              <span>{{data.left3.englishname}}</span><span></span>
            </p>
          </div>
        </div>
        <table style="margin-top: 1vh">
          <tbody>
            <tr>
              <td rowspan="3" class="device-img">
                <img src="../../../assets/bigScreenImg/park.png" />
              </td>
              <td>
                <div class="label-name"></div>
              </td>
              <td rowspan="3" colspan="2" class="kuan-dai">
                <div class="progress-label">{{data.left3.parkingspacesize1.name}}</div>
                <div style="width: 10.5vw; height: 15px">
                  <div class="progress" style=" float: left; height: 8px; width: 10.5vw; background-color: #383e60;">
                    <div class="progress-bar progress-bar-striped" :style="{width:data.left3.parkingspacesize1.width}">
                    </div>
                  </div>
                </div>
                <div class="progress-label">{{data.left3.parkingspacesize2.name}}</div>
                <div style="width: 10.5vw; height: 15px">
                  <div class="progress" style=" float:left; height: 8px; width: 10.5vw;  background-color: #383e60;">
                    <div class="progress-bar progress-bar-striped" :style="{width:data.left3.parkingspacesize2.width}">
                      </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td class="label-name score">{{data.left3.amount}}</td>
            </tr>
            <tr>
              <td class="label-name">
                <div class="os-name"></div>
              </td>
            </tr>
            <tr>
              <td colspan="4">
                <div class="split-line"></div>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-for="(item,i) in data.left3.parkingstatistics" :key="'p'+i" class="el-row" style="margin-left: 5px; margin-right: 1px">
          <div class="el-col el-col-12" style="padding-left: 1px; padding-right: 1px">
            <div class="grid">
              <p><big>{{item.name}}</big></p>
            </div>
          </div>
          <div class="el-col el-col-12" style="padding-left: 10px; padding-right: 1px">
            <div class="grid">
              <p>{{item.typename}}<big>{{item.number}}</big>{{item.unit}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
export default {
  name: "yykf",
  data() {
    return {   
      //data:null,  
    };
  },
  props: {
    data:{
        type: Object,
        default:function(){
          return{};
        }
    }
  },
  created() {
      // this.data =this.$parent.dataarr.yykf;
  },
  methods: {
    //住宿点击事件
    tableClick(item,i){
      this.$emit('flyTo',item,i);
    }
  },
};
</script>

<style lang="less" scoped>
.Leftclass {
  margin-top: 4vh;
  position: absolute;
  top: 0px;
  left: 0px;
  bottom: 0;
  padding: 25px 25px 0 10px;
  background: url("../../../assets/layerManagement/left-shadow.png") repeat-y;
  background-size: 100%;
  width: 25%;
  overflow-x: hidden;
  overflow-y: auto;
  font-family: Adobe 黑体 Std R;
  &::-webkit-scrollbar {
    width: 0;
  }
  .device-img {
    text-align: center;
  }
  table td {
    width: 25%;
    height: 20px;
    font-size: 0.7vw;
  }
  .split-line {
    margin: 15px;
    height: 2px;
    width: 85%;
    background: linear-gradient(to left, #181c41, #7187ac, #181c41);
  }
  .progress-label {
    float: left;
    margin-bottom: 10px;
    text-align: left;
    color: #fff;
    font-size: 1.4vh;
    white-space: nowrap;
    width: 100%;
    height: 20px;
    line-height: 20px;
    vertical-align: middle;
  }
  .score {
    color: #e5bb2e;
    font-size: 0.9vw;
    font-weight: 600;
    text-align: center;
  }
  .os-name {
    height: 4vh;
    line-height: 30px;
    vertical-align: middle;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .device-use span {
    display: block;
    font-size: 1.3vh;
    font-weight: 500;
    color: #fff;
    line-height: 67px;
    text-align: center;
    vertical-align: middle;
  }
  .cpu-use {
    height: 70px;
    background: url(../../../assets/bigScreenImg/cpu_use.png) no-repeat center
      center;
    background-size: 60px 60px;
  }
  .labe-value {
    text-align: center;
    color: #fff;
    height: 30px;
    line-height: 30px;
    vertical-align: middle;
  }
  .nei-cun-use {
    height: 70px;
    background: url(../../../assets/bigScreenImg/nei_cun_use.png) no-repeat
      center center;
    background-size: 60px 60px;
  }
  .OperationsLeftclass {
    width: 85%;
    overflow-x: hidden;
  }
  ::-webkit-scrollbar {
    // height: 1vh;
    // width: 1vh;
    // background: transparent;
    // border-radius: 0.5vh;
    width: 0;
  }

  .layui-layer-content {
    overflow-x: hidden !important;
  }

  .titleName {
    padding-left: 0;
    width: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAY8AAAACCAYAAACgw1BVAAAAQklEQVRIie3SsQ2AMBADwItEEZagZQImYKYMyGSfFSjSgHy1ZcmSW1WJiIhf23HjXDVyw/MyO/KtiIjPOXChL2vEBPqoBQdAU67mAAAAAElFTkSuQmCC)
      no-repeat 0 100%;
    background-size: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .video-list {
    margin-top: 2vh;
  }

  .titleName .en {
    color: #919293;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    font-family: Adobe 黑体 Std R;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .titleName .en span {
    font-weight: lighter;
    letter-spacing: -0.5px;
    white-space: nowrap;
    font-size: 0.6vw;
    font-family: Adobe 黑体 Std R;
    zoom: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .titleName .en span:last-child {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAAABCAYAAAA4l4ckAAAAE0lEQVQokWP8//+/GcMoGAVUAgBnXAM143UjwAAAAABJRU5ErkJggg==)
      50% repeat-x;
    height: 0.8vh;
    margin-left: 0.5vh;
  }

  .el-col-8 {
    width: 33.33333%;
  }

  [class*="el-col-"] {
    float: left;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  .video-list i {
    position: absolute;
    bottom: 0.4vh;
    right: 0;
    color: #fff;
    display: inline-block;
    padding: 0 0.8vh;
    line-height: 2.6vh;
    font-size: 0.9vw;
    font-family: Adobe 黑体 Std R;
    background: rgba(0, 0, 0, 0.7);
    font-style: normal;
  }

  .relative {
    position: relative;
  }

  .percent-box img {
    margin-top: 2px;
    height: 10vh;
  }

  .my-table {
    display: table;
    width: 100%;
    margin-top: 1vh;
  }

  .my-table .table-title {
    color: #fff;
    line-height: 2.6vh;
    display: table;
    width: 100%;
    background: rgba(0, 85, 189, 0.53);
  }

  .my-table ul li {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    display: table;
    width: 100%;
    color: #fff;
    list-style: none;
  }
  .my-table .table-title label {
    width: 33.3% !important;
  }
  .my-table ul li label,
  .my-table ul li span {
    padding: 0 0.5vh;
    display: table-cell;
    font-size: 0.9vw;
    font-family: Adobe 黑体 Std R;
    width: 33.3% !important;
    text-align: center;
  }
  .my-table .table-content li {
    padding-bottom: 1.4vh;
    padding-top: 1.4vh;
    border-bottom: 1px solid hsla(0, 0%, 100%, 0.24);
  }

  .room-table{
    text-align: center;
    width: 100%;
    table-layout:fixed;
    margin-top: 15px;
    color: #fff;
    .table-title{
      background: rgba(0,85,189,.53);
      line-height: 4.8vh;
      font-size: .9vw;
      display: table;
      width: 100%;
      table-layout: fixed;
      th{
        text-align: center;
      }
    }
    .table-content{
      line-height: 3.8vh;
      display: block;
      max-height: 200px;
      font-size: .9vw;
      overflow-y: scroll;
      .textOverflow{
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
        padding: 0 10px;
        font-size: .9vw;
      }
      tr{
        border-bottom: 1px solid hsla(0,0%,100%,.24);
        display: table;
        width: 100%;
        table-layout: fixed;
        &:hover{
          background-color: rgba(207, 207, 207, 0.2);
          cursor: pointer;
        }
      }
      &::-webkit-scrollbar {
        width: 0;
      }
    }
  }

  .grid {
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOUAAABECAYAAAB+ifJdAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4BpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDplOGYwY2I5Mi00MTIxLWFlNDgtYmI0ZS04ZTg2YTc1YzAwZDIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MDZFREQ2RjFEMTBGMTFFOEIyMEM4NTRGQjg0NTM2MjkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MDZFREQ2RjBEMTBGMTFFOEIyMEM4NTRGQjg0NTM2MjkiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2MjIxMDEwMC1lMWFlLTNkNGYtYWU5OC02ZjAwZDQ0YTc4ZGIiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDpjNjcyNzU0MC1jZTA4LTExZTgtYmY4OS1lZTJiMDM5ZDFmZTMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4bVR8SAAACyElEQVR42uzcXWrUQAAH8ER6gWixUItK7YOIUJD1HooeIPfY5z2HOYDgHXxehVJEoVqplmqpNV6gjd1txd1kMhvr16K/30N3O5lkJpP89wN2Ju1tDh8lHQyPNgfjJ1U6fsgvrmXF4evydOtJWTVRuQqVpbXtJ8dYvJEVB9vl1D4T28Nl08fJl1az4uPbsmv9qbLR/svXs2Jvp2y0Gep7Wx9WrmXF+3dlsO7ksaqW/0djcXUlK3Z2y1ltTe8/XTdfvZIVb/bKWW217r+2nBVbH8pw37v1K7+5lBUv98tZbcXOK791OSteHJTdx6F5bvntxazYPOx+jPp5rF/Kio3DMnr/tI3rWZ38TpYVz8ryW1HvXtLvkrWFceCSjUHbgRtlwLkMn6SDRsBrLwy9B8f9C4YK5otQglACQglCCQglCCUglPA/hHKYbgwMA8yH4eMLA++U4OMrIJQglMB5pfnu07tnT08fGlNZakJTWRp1Jo7Xdb+2KTBJOnuf1m21dpNYWazv9X6n7efapW6sv8Hpa7XxqCJjU7XUjZ1XfVxi1731vGZdyx85ry7XMY0c6yfvweh9Hbn+0evact8F2lsovmyVsTlhbWXj+ZSf52Q+5b75lONjjOZTbs/BfMpX8zKf8tPfn0/5/Pt8yvCLQrMPPr6C75SAUIJQAkIJQgkIJQglIJQglIBQAkIJQgkIJQglIJTwr7PyQKN+qO/1flt5wMoDs+7bQDtWHohcCCsPhPe38kBi5QHAd0oQSkAoQSgBoQShBIQShBIQSkAoQSgBoQShBIQShBL4/aw80Kgf6nu931YesPLArPs20I6VByIXwsoD4f2tPJBYeQDwnRKEEhBKEErg14WyV633DQPMh97D4753SvDxFRBKEEpAKEEoAaEEoQT+tIXRn14y8QOCySlfE8+HR5sDwwXn17tfBX6o05yE+VWAAQB1qvNGpevTKQAAAABJRU5ErkJggg==)
      no-repeat;
    background-size: 100%;
    width: 100%;
    height: 5vh;
    display: inline-block;
    // margin-top: 3vh;
    // padding: 5px 10px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    text-align: center;
  }

  .grid big {
    background: -webkit-gradient(
      linear,
      left bottom,
      left top,
      from(#0072ff),
      to(#00fff0)
    );
    background: linear-gradient(0deg, #0072ff, #00fff0);
    -webkit-background-clip: text;
    //color: transparent;
    color: #e6bc2f;
    font-size: 0.9vw;
    font-family: Adobe 黑体 Std R;
    padding: 0px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .grid p {
    height: 5vh;
    display: flex;
    justify-content: center;
    align-items: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* 按钮 */
  .btn-btnOpen {
    width: 100%;
    height: 100%;
    line-height: 2.6vh;
    text-align: center;
    cursor: pointer;
    user-select: none;
  }

  /* 选中变色 */
  .btn-btnOpen:active {
    background-color: #4e97d9;
  }

  /* 去掉边框 */
  .layer-mars-dialog {
    border: none;
  }

  .titleName .name {
    display: inline-block;
    font-size: 1.3vw;
    font-family: Adobe 黑体 Std R;
    font-weight: 700;
  }

  .gradient-blue {
    background-image: -webkit-gradient(
      linear,
      0 0,
      0 bottom,
      from(#02e4ff),
      to(#035cff)
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .grid {
    font-size: 0.9vw;
    font-family: Adobe 黑体 Std R;
    line-height: 2.6vh;
    color: #fff;
  }

  .titleName {
    font-size: 0.9vw;
  }
}
</style>
