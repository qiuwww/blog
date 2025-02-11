<template>
  <Modal v-model="show" :title="headTitle" :mask-closable="false" class="girdPersonInfo" draggable
         @on-cancel="clearMyInterval">
    <div style="width: 100%;height: 115px;">
      <img :src="gridPerson.headPortrait" style="width: 110px;height: 110px;float: left;"/>
      <div style="float: left;margin-left: 20px;font-size: 15px;color: #000;">
        <p>姓名：{{gridPerson.name}}</p>
        <p>性别：{{gridPerson.sex}}</p>
        <p>手机号：{{gridPerson.phone}}</p>
        <p>所属网格：{{gridPerson.grid}}</p>
        <p>所属岗位：{{gridPerson.post}}</p>
      </div>
    </div>

    <div class="divDate">
      <DatePicker v-model="startTime" type="datetime" style="width: 180px"></DatePicker>
      ~
      <DatePicker v-model="endTime" type="datetime" style="width: 180px"></DatePicker>
      <Button type="primary" @click="trackQuery">轨迹查询</Button>
    </div>
    <div class="gpsLocusDialog" style="display: block;margin-top: 15px;" v-if="showGpsLocusDialog">
      <div class="list">
        <a @click="gpsplay()" title="播放" class="btn play float-left"></a>
        <a @click="gpspause()" title="暂停" class="btn pause float-left"></a>
        <a @click="gpsstop()" title="停止" class="btn stop float-left"></a>

        <div class="function">
          <Checkbox v-model="showToggleLine" @on-change="toggleLine">播放时显示路线</Checkbox>

          <div style="display: flex;height: 30px;margin-top: 10px;">
            <label style="float: left;width:82px;margin-top: 3px;">播放进度：</label>
            <div style="float: left;width: 80%;">
              <Progress :percent="currentProgressSpeed" :stroke-width="20" text-inside/>
            </div>
          </div>

          <div style="display: flex;height: 30px;line-height: 30px;">
            <label style="float: left;width:82px;margin-top: 3px;">播放速度：</label>
            <div style="float: left;width: 80%;">
              <Slider v-model="playSpeed" :min="-10" :max="10" @on-change="onPlaySpeedChange"></Slider>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div slot="footer">
      <Button type="text" @click="clearMyInterval">取消</Button>
    </div>
  </Modal>
</template>
<script>
    import {getTZhsqGridMember} from '@/api/zhsq/tZhsqGridMember/tZhsqGridMember'
    import {nginxUrl} from '@/api/tools/tool'
    import {gridPersonTrackQuery} from "@/api/zhsq/tZhsqGridMember/tZhsqGridMember";

    import {LineString, Polygon, Point} from "ol/geom";
    import Feature from "ol/Feature";
    import {Stroke, Style} from "ol/style";
    import Overlay from "ol/Overlay";
    import {formartDate} from "../../../api/tools/tool";

    export default {
        name: "app",
        props: {
            value: {
                type: Boolean,
                default: false
            },

            gridPersonId: {
                type: String
            },
            modalTitle: {
                type: String
            },
            gridPersonOverlay: {
                type: Object
            }
        },
        data() {
            return {
                show: this.value,
                headTitle: this.modalTitle,
                startTime: '',
                endTime: '',
                gridPerson: {},
                showToggleLine: false,
                playSpeed: 0,
                currentProgressSpeed: 0,
                showGpsLocusDialog: false,
                trackQueryData: [],
                featureArr: [],
                timeoutrun: null,

                timeSpeed: 1000
            };
        },
        methods: {
            closeModal(val) {
                this.$emit('input', val);
            },
            trackQuery() {
                let data = {
                    gridPersonId: this.gridPersonId,
                    startTime: formartDate(this.startTime),
                    endTime: formartDate(this.endTime)
                };
                gridPersonTrackQuery(data).then(res => {
                    if (res.data.length > 0) {
                        this.trackQueryData = res.data;
                        this.showGpsLocusDialog = true;
                    } else {
                        this.trackQueryData = [];
                        this.showGpsLocusDialog = false;
                        this.$Message.error("当前网格员暂无轨迹数据！");
                    }
                }).catch(res => {
                    this.$Message.error("轨迹数据获取异常！")
                })
            },
            toggleLine() {
                if (this.showToggleLine) {
                    var positionArr = [];
                    for (let i = 0; i < this.trackQueryData.length; i++) {
                        if (this.trackQueryData[i].position) {
                            positionArr.push(JSON.parse(this.trackQueryData[i].position));
                        }
                    }
                    var myLine = new LineString(positionArr);
                    let feature = new Feature(myLine);
                    let style = new Style({
                        stroke: new Stroke({
                            color: 'red',
                            width: 3
                        })
                    });
                    feature.setStyle(style);
                    this.$parent.$parent.source.addFeature(feature);
                    this.$parent.$parent.vector.setSource(this.$parent.$parent.source);
                    this.featureArr.push(feature);
                } else {
                    for (let i = 0; i < this.featureArr.length; i++) {
                        this.$parent.$parent.source.removeFeature(this.featureArr[i])
                    }
                    this.featureArr = [];
                }
            },
            gpsplay() {
                this.timeoutrun.MyAutoRun(this.trackQueryData);
            },
            gpspause() {
                this.timeoutrun.MyAutoRunSuspend();
            },
            gpsstop() {
                this.timeoutrun.MyAutoRunSuspend();
                this.$parent.clearGridPersonMoveArr();
                this.currentProgressSpeed = 0;
                this.playSpeed = 0;
                this.timeSpeed = 1000;
            },
            GetPercent(num, total) {
                num = parseFloat(num);
                total = parseFloat(total);
                if (isNaN(num) || isNaN(total)) {
                    return "-";
                }
                return total <= 0 ? 0 : (Math.round(num / total * 10000) / 100.00);
            },
            clearMyInterval() {
                this.show = false;
                this.timeoutrun.MyAutoRunSuspend();
                for (let i = 0; i < this.featureArr.length; i++) {
                    this.$parent.$parent.source.removeFeature(this.featureArr[i])
                }
                this.featureArr = [];
                this.$parent.clearGridPersonMoveArr();

                this.startTime = '',
                this.endTime = '',
                this.gridPerson = {},
                this.showToggleLine = false,
                this.playSpeed = 0,
                this.currentProgressSpeed = 0,
                this.showGpsLocusDialog = false,
                this.trackQueryData = [],
                this.featureArr = [],
                this.timeoutrun = null,
                this.timeSpeed = 1000;

            },
            onPlaySpeedChange() {
                if (this.playSpeed == 0) {
                    this.timeSpeed = 1000;
                } else {
                    if(this.playSpeed > 0){
                        this.timeSpeed = 1000 - this.playSpeed * 100;
                    }else {
                        this.timeSpeed = 1000 - this.playSpeed * 200;
                    }
                }
                this.timeoutrun.MyAutoRunSuspend();
                this.timeoutrun.MyAutoRun(this.trackQueryData);
            }
        },
        watch: {
            value(val) {
                this.show = val;
            },
            show(val) {
                if (val) {
                    let _this = this;
                    let timeoutrun = {
                        timer: null, //全局变量,暂停用。
                        j: 0, //全局变量 继续用。
                        MyAutoRun: function (data) { //开始方法
                            var j = timeoutrun.j;
                            timeoutrun.timer = setInterval(function () {
                                if (j < data.length) {
                                    _this.$parent.showGridPersonMove(data[j]);
                                    _this.currentProgressSpeed = _this.GetPercent(j + 1, data.length);
                                    j++;
                                    timeoutrun.j = j; //记录次数 继续。
                                } else {
                                    timeoutrun.j = 0; //主要是让 开始重新继续。
                                    clearInterval(timeoutrun.timer);
                                    //定时任务结束后要不要清除？
                                    //_this.$parent.clearGridPersonMoveArr();
                                }
                            }, _this.timeSpeed);
                        }, MyAutoRunSuspend: function () { //暂停方法
                            clearInterval(timeoutrun.timer);
                        }
                    };
                    this.timeoutrun = timeoutrun;


                    const myDate = new Date();
                    const year = myDate.getFullYear(); // 获取当前年份
                    const month = myDate.getMonth() + 1; // 获取当前月份(0-11,0代表1月所以要加1);
                    const day = myDate.getDate(); // 获取当前日（1-31）

                    let hh = myDate.getHours();
                    let mf = myDate.getMinutes() < 10 ? '0' + myDate.getMinutes() : myDate.getMinutes();
                    let ss = myDate.getSeconds() < 10 ? '0' + myDate.getSeconds() : myDate.getSeconds();

                    this.startTime = year + '-' + month + '-' + day + " 00:00:00";
                    this.endTime = year + '-' + month + '-' + day + ' ' + hh + ':' + mf + ':' + ss;

                    getTZhsqGridMember({id: this.gridPersonId}).then(res => {
                        if (res && res.code == 200) {
                            this.gridPerson = res.data;
                            if (res.data.gridsPersonGrids) {
                                let tempArr = "";
                                res.data.gridsPersonGrids.forEach(function (item, index) {
                                    tempArr += "," + item.gridsName;
                                });
                                if (tempArr != "") {
                                    tempArr = tempArr.substring(1);
                                }
                                this.gridPerson.grid = tempArr;
                            }
                            if (res.data.headPortrait) {
                                this.gridPerson.headPortrait = nginxUrl + res.data.headPortrait;
                            }
                        } else {
                            this.$Message.error(res.msg);
                        }
                    });
                } else {
                    this.closeModal(val);
                }
            }
        }
    };
</script>

<style>
  .gpsLocusDialog .play {
    background-position: 0 0;
  }

  .gpsLocusDialog .pause {
    background-position: -48px 0;
  }

  .gpsLocusDialog .stop {
    background-position: 0 -48px;
  }

  .gpsLocusDialog .btn {
    background-image: url(/img/archives/gps_locus_play.png);
    border: 0 none;
    cursor: pointer;
    height: 48px;
    margin: 5px 20px;
    width: 48px;
    display: block;
  }

  .gpsLocusDialog .list {
    background: none repeat scroll 0 0 #F6F8FA;
    border: 1px solid #C1CDD8;
    padding: 5px;
  }

  .divDate {
    margin-top: 15px;
    background: none repeat scroll 0 0 #F6F8FA;
    border: 1px solid #C1CDD8;
    padding: 5px;
  }

  .float-left {
    float: left;
  }

  .gpsLocusDialog .function {
    margin-top: 60px;
    padding: 10px;
  }

</style>
