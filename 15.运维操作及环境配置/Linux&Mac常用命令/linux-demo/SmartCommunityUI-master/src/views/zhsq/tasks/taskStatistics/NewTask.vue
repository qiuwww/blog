<template>
  <el-row class="app-warp">
    <el-row class="rowone">
      <el-col :span="22">
        <div style="display: flex;margin-left: 145px;margin-top: 45px;margin-bottom: 24px;">
          <div class="headerIconbox">
            <div class="Eventicon1"></div>
            <div class="contentbox">
              <p class="toopyil">待派单</p>
              <p class="toopbunber">{{ distribute | Summation}}</p>
            </div>
          </div>
          <div class="headerIconbox">
            <div class="Eventicon2"></div>
            <div class="contentbox">
              <p class="toopyil">待接单 </p>
              <p class="toopbunber">{{beReceived | Summation}}</p>
            </div>
          </div>
          <div class="headerIconbox">
            <div class="Eventicon3"></div>
            <div class="contentbox">
              <p class="toopyil">处理中</p>
              <p class="toopbunber">{{ doing | Summation}}</p>
            </div>
          </div>
          <div class="headerIconbox">
            <div class="Eventicon4"></div>
            <div class="contentbox">
              <p class="toopyil">待核查</p>
              <p class="toopbunber">{{beVerified | Summation}}</p>
            </div>
          </div>
          <div class="headerIconbox">
            <div class="Eventicon5"></div>
            <div class="contentbox">
              <p class="toopyil">已完成 </p>
              <p class="toopbunber">{{ isComplete | Summation}}</p>
            </div>
          </div>
          <div class="headerIconbox">
            <div class="Eventicon6"></div>
            <div class="contentbox">
              <p class="toopyil">已驳回</p>
              <p class="toopbunber">{{toReject | Summation}}</p>
            </div>
          </div>
          <div class="headerIconbox">
            <div class="Eventicon7"></div>
            <div class="contentbox">
              <p class="toopyil">标记无效</p>
              <p class="toopbunber">{{invalid | Summation}}</p>
            </div>
          </div>
        </div>
      </el-col>
      <!-- 下面的图-->
      <el-col :span="22">
        <div class="echartsBody">
          <div class="EchartsBox" ref='EchartsBox'></div>
        </div>
      </el-col>
    </el-row>

  </el-row>
</template>

<script>
  import {getTaskMap} from '@/api/engineering'
  import Grid from '@/components/Ascription/gridSelect'

  export default {
    components: {
      Grid
    },
    data() {
      return {
        tableData: [],
        gridId: '',
        listArr: [],

        distribute: [],
        beReceived: [],
        doing: [],
        beVerified: [],
        isComplete: [],
        toReject: [],
        invalid: [],
        xName:[],
      }
    },
    created() {
      this.handleGetTable()
    },
    filters: {
      /* 这里来数组求和*/
      Summation(arr) {
        return eval(arr.join("+"))
      }
    },
    methods: {
      handleGetGridId(val) {
        this.gridId = val
        if (val) {
          this.handleGetTable(this.gridId)
        }
      },
      async handleGetTable(gridId) {
        const {data} = await getTaskMap({})
        this.tableData = data

        // this.listArr = this.tableData.map(i => {
        //   return [
        //     i.distribute,
        //     i.beReceived,
        //     i.doing,
        //     i.beVerified,
        //     i.isComplete,
        //     i.toReject,
        //     i.invalid,
        //   ]
        // })

        this.xName = this.tableData.map(i => {
          return i.name;
        })
        this.distribute = data.map(item => {
          return item.distribute
        })
        this.beReceived = data.map(item => {
          return item.beReceived
        })
        this.doing = data.map(item => {
          return item.doing
        })
        this.beVerified = data.map(item => {
          return item.beVerified
        })
        this.isComplete = data.map(item => {
          return item.isComplete
        })
        this.toReject = data.map(item => {
          return item.toReject
        })
        this.invalid = data.map(item => {
          return item.invalid
        })
        this.listArr =[this.distribute,this.beReceived,this.doing,this.beVerified ,this.isComplete, this.toReject,this.invalid]
        this.chartsreda();
      },
      chartsreda() {
        const that = this;
        const mychart = this.$echarts.init(this.$refs.EchartsBox);
        let legend=[ "待派单", "待接单", "处理中", "待核查", "已完成", "已驳回", "标记无效"];
        let option = {
          title: {
            text: '大同市致贫原因分析',
            left: 19,
            top: 15,
            textStyle: {
              color: '#fff'
            }
          },
          tooltip: {
            trigger: 'axis',
          },
          color: ["#FFCC21", "#67ACFE", "#ffac5a", "#7e5df2", "#86B4F8", "#95DAFF", "#B4BAFF"],

          legend: {
            top: 10,
            left: 200,
            itemWidth: 10,
            itemHeight: 10,
            icon: 'roundRect',
            // padding: [5, 10],
            textStyle: {
              fontSize: 14,
              color: '#96A4F4',
              padding: [3, 0, 0, 0]
            },
            data: legend,
          },
          grid: {
            left: '13%',
            right: '4%',
            bottom: '13%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            axisLabel: {
              color: '#96A4F4'
            },
            axisLine: {
              lineStyle: {
                color: '#96A4F4'
              },
              width: 5
            },
            axisTick: {
              show: false,
            },
            data:this.xName,
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              color: '#96A4F4'
            },
            axisLine: {
              lineStyle: {
                color: '#96A4F4'
              },
              width: 5
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              lineStyle: {
                color: 'rgba(150, 164, 244, 0.3)'
              }
            },
          },
          series: [

          ]
        };
        for (let i = 0; i < legend.length; i++) {
          option.series.push({
            name: legend[i],
            type: 'bar',
            stack: '总量',
            barWidth: '45%',
            label: {
              show: false,
              position: 'insideRight'
            },
            data:this.listArr[i]
          })
        }

        mychart.setOption(option);

      },

    }
  }
</script>

<style lang="scss" scoped>
  .tablebox {
    margin-left: 0 20px 0 0;

  }

  .rowone {
    margin-top: 32px;
    margin-bottom: 20px;
    margin-left: -60px;
  }

  /* .tablebox ::v-deep .cell{
    font-size: 15px;
    font-weight: bold;
    color: #000000;
  } */

</style>
<style lang="scss" scoped>
  .headerbox {
    margin: 38px 0 0 0;
  }

  .tablebox {
    margin: 20px 80px 32px 80px;
    border-top: 2px solid #e8e8ea;
  }

  /* .tablebox ::v-deep .cell{
    font-size: 14px;
    font-weight: bold;
    color: #000000;
  } */
  .headerIconbox {
    width: 160px;
    height: 80px;
    display: flex;
    margin-left: 30px;
    background-color: #F5F5F5;
  }

  .selectDate {

  }

  .Eventicon1 {
    width: 60px;
    height: 60px;
    background-image: url(../../../../assets/vsg/tb.svg);
    background-size: 100% 100%;
    margin-top: 10px;
  }

  .Eventicon2 {
    width: 60px;
    height: 60px;
    background-image: url(../../../../assets/vsg/tb_dcl.svg);
    background-size: 100% 100%;
    margin-top: 10px;
  }

  .Eventicon3 {
    width: 60px;
    height: 60px;
    background-image: url(../../../../assets/vsg/tb_dpq.svg);
    background-size: 100% 100%;
    margin-top: 10px;
  }

  .Eventicon4 {
    width: 60px;
    height: 60px;
    background-image: url(../../../../assets/vsg/tb_dsh.svg);
    background-size: 100% 100%;
    margin-top: 10px;
  }

  .Eventicon5 {
    width: 60px;
    height: 60px;
    background-image: url(../../../../assets/vsg/tb_djs.svg);
    background-size: 100% 100%;
    margin-top: 10px;
  }

  .Eventicon6 {
    width: 60px;
    height: 60px;
    background-image: url(../../../../assets/vsg/tb_dpj.svg);
    background-size: 100% 100%;
    margin-top: 10px;
  }

  .Eventicon7 {
    width: 60px;
    height: 60px;
    background-image: url(../../../../assets/vsg/tb_yjs.svg);
    background-size: 100% 100%;
    margin-top: 10px;
  }

  .Eventicon8 {
    width: 60px;
    height: 60px;
    background-image: url(../../../../assets/vsg/tb_dfh.svg);
    background-size: 100% 100%;
    margin-top: 10px;
  }

  .contentbox {
    margin-top: 22px;
  }

  .toopyil {
    font-size: 13px;
    font-weight: 400;
    text-align: left;
    color: #a1a1a1;
    line-height: 20px;
  }

  .toopbunber {
    font-size: 26px;
    font-family: Arial, Arial-Bold;
    font-weight: 700;
    text-align: left;
    color: #3e3e3e;
    margin-top: 5px;
    line-height: 20px;
  }

  .EchartsBox {
    width: 100%;
    height: 100%;
  }

  .echartsBody {
    width: 1576px;
    height: 420px;
    margin-top: 80px;
  }
</style>
<style scoped>
  .filter-time {
    height: 32px;
    width: 274px;
    background: #ffffff;
    border: 1px solid #000;
    border-radius: 4px;
    display: flex;
    align-items: center;
  }
</style>
