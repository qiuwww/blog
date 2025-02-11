<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-people">
          <!--<svg-icon icon-class="visits" class-name="card-panel-icon" />-->
          <img :src="sbdx" class="icon">
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">申报人数</div>
          <count-to :start-val="0" :end-val="count.newVisits" :duration="2600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-message">
          <!--<svg-icon icon-class="ipvisits" class-name="card-panel-icon" />-->
          <img :src="sbzj" class="icon">
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">申报金额(万元)</div>
          <count-to :start-val="0" :end-val="count.newIp" :duration="3000" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-money">
          <!--<svg-icon icon-class="visits" class-name="card-panel-icon" />-->
          <img :src="ffzj" class="icon">
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">已发放金额(万元)</div>
          <count-to :start-val="0" :end-val="count.recentVisits" :duration="3200" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-shopping">
          <!--<svg-icon icon-class="ipvisits" class-name="card-panel-icon" />-->
          <img :src="fc" class="icon">
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">申报资产</div>
          <count-to :start-val="0" :end-val="count.recentIp" :duration="3600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'
import { get } from '@/api/monitor/visits'
	import sbdx from '../img/0111.png';
	import ffzj from '../img/ffzj.png';
	import sbzj from '../img/sbzj.png';
	import fc from '../img/fc.png';
export default {
  components: {
    CountTo
  },
  data() {
    return {
      count: { newIp: 0, newVisits: 0, recentIp: 0, recentVisits: 0 },
				sbdx: sbdx,
				ffzj: ffzj,
				sbzj: sbzj,
				fc: fc
    }
  },
  mounted() {
    get().then(res => {
      //    this.count.newIp = res.newIp
      //    this.count.newVisits = res.newVisits
      //    this.count.recentIp = res.recentIp
      //    this.count.recentVisits = res.recentVisits
      this.count.newIp = 1120
      this.count.newVisits = 5003
      this.count.recentIp = res.recentIp
      this.count.recentVisits = res.recentVisits
    })
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.panel-group {
  margin-top: 18px;
  .card-panel-col{
    margin-bottom: 32px;
  }
  .card-panel {
    height: 108px;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
    .icon-people {
      color: #40c9c6;
      background-color: #40c9c6;
    }
    .icon-message {
      color: #36a3f7;
      background-color: #36a3f7;
    }
    .icon-money {
      color: #f4516c;
      background-color: #f4516c;
    }
    .icon-shopping {
      color: #34bfa3;
      background-color: #34bfa3;
    }
    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }
      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
</style>
