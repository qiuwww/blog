<template>
  <el-row class="app-warp">
    <el-row class="headerbox">
      <span class="label">
        统计时间段
      </span>
      <span>

        <el-date-picker
          v-model="createDateFrom"
          type="date"
          class="selectDate"
          placeholder="选择开始时间"
          value-format="yyyy-MM-dd"
          @change="handleUpdate"
          size="small"
          :picker-options="pickerOptions"
        />
        <span class="ml10">
          <span class="mr10">至</span>
          <el-date-picker
            v-model="createDateTo"
            type="date"
            class="selectDate"
            placeholder="选择结束时间"
            value-format="yyyy-MM-dd"
            @change="handleUpdate"
            size="small"
            :picker-options="pickerOptions"
          />
        </span>
      </span>
    </el-row>
    <el-col :span="22">
      <div style="display: flex;margin-left: 45px;margin-top: 45px;margin-bottom: 24px;">
        <div class="headerIconbox">
          <div class="Eventicon1"></div>
          <div class="contentbox">
            <p class="toopyil">待接收</p>
            <p class="toopbunber">{{beReceived | Summation}}</p>
          </div>
        </div>
        <div class="headerIconbox">
          <div class="Eventicon2"></div>
          <div class="contentbox">
            <p class="toopyil">待处理</p>
            <p class="toopbunber">{{todo| Summation}}</p>
          </div>
        </div>
        <div class="headerIconbox">
          <div class="Eventicon3"></div>
          <div class="contentbox">
            <p class="toopyil">待派遣</p>
            <p class="toopbunber">{{ dispatch | Summation}}</p>
          </div>
        </div>
        <div class="headerIconbox">
          <div class="Eventicon4"></div>
          <div class="contentbox">
            <p class="toopyil">待审核</p>
            <p class="toopbunber">{{ toExamine | Summation}}</p>
          </div>
        </div>
        <div class="headerIconbox">
          <div class="Eventicon5"></div>
          <div class="contentbox">
            <p class="toopyil">待结束</p>
            <p class="toopbunber">{{toEnd | Summation}}</p>
          </div>
        </div>
        <div class="headerIconbox">
          <div class="Eventicon6"></div>
          <div class="contentbox">
            <p class="toopyil">待评价</p>
            <p class="toopbunber">{{toEvaluate | Summation}}</p>
          </div>
        </div>
        <div class="headerIconbox">
          <div class="Eventicon7"></div>
          <div class="contentbox">
            <p class="toopyil">已结束</p>
            <p class="toopbunber">{{isEnd | Summation }}</p>
          </div>
        </div>
        <div class="headerIconbox">
          <div class="Eventicon8"></div>
          <div class="contentbox">
            <p class="toopyil">待复核</p>
            <p class="toopbunber">{{twoExamine | Summation}}</p>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :span="22">
      <div class="echartsBody">
        <div class="EchartsBox" ref='EchartsBox'></div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  import {eventsMap} from '@/api/events'
  import Grid from '@/components/Ascription/gridSelect'


  export default {
    components: {
      Grid
    },
    data() {
      return {
        tableData: [],
        listArr: [],
        lengthARR: [],
        gridId: '',
        DateValue: '',
        msg: '待处理',
        createDateFrom: '',
        createDateTo: '',
        beReceived: [],
        dispatch: [],
        isEnd: [],
        toEnd: [],
        toEvaluate: [],
        toExamine: [],
        todo: [],
        twoExamine: [],
        pickerOptions: {
          disabledDate: (time) => {
            return this.dealDisabledDate(time);
          }
        },
        xName:[],
      }
    },
    created() {
      this.handleGetTable('')
    },
    mounted() {
      this.$nextTick(() => {

      });
    },
    filters: {
      /*这里来数组求和 */
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
      handleUpdate() {
        this.handleGetTable(this.gridId)
      },
      async handleGetTable(gridId) {
        const {data} = await eventsMap({
          gridId,
          createDateFrom: this.createDateFrom,
          createDateTo: this.createDateTo
        })
        this.tableData = data
        /* 这里来遍历数组 */
        this.beReceived = data.map(item => {
          return item.beReceived
        })
        this.dispatch = data.map(item => {
          return item.dispatch
        })
        this.isEnd = data.map(item => {
          return item.isEnd
        })
        this.toEnd = data.map(item => {
          return item.toEnd
        })
        this.toEvaluate = data.map(item => {
          return item.toEvaluate
        })
        this.toExamine = data.map(item => {
          return item.toExamine
        })
        this.todo = data.map(item => {
          return item.todo
        })
        this.twoExamine = data.map(item => {
          return item.twoExamine
        })
        this.xName = this.tableData.map(i => {
          return i.name;
        })
        // this.listArr = this.tableData.map(i => {
        //   return [
        //     i.name,
        //     i.beReceived,
        //     i.todo,
        //     i.dispatch,
        //     i.toExamine,
        //     i.toEnd,
        //     i.toEvaluate,
        //     i.isEnd,
        //     i.twoExamine,
        //   ]
        // })
        this.listArr=[this.beReceived,this.dispatch,this.isEnd,this.toEnd , this.toEvaluate,this.toExamine,this.todo,this.twoExamine ];
        this.chartsreda();
      },
      chartsreda() {
        const that = this;
        const mychart = this.$echarts.init(this.$refs.EchartsBox);

        let legend=[ "待接收", "待处理", "待派遣", "待审核", "待结束", "待评价", "已结束", "待复核"];
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
          color: ["#FFCC21", "#67ACFE", "#ffac5a", "#7e5df2", "#86B4F8", "#95DAFF", "#B4BAFF", "#747FFF"],

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
              show: false,
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
        // mychart.setOption({
        //   legend: {
        //     itemWidth: 15,
        //     itemHeight: 15,
        //     itemGap: 20,
        //     textStyle: {},
        //     data: ["product", "待接收", "待处理", "待派遣", "待审核", "待结束", "待评价", "已结束", "待复核"],
        //   },
        //   tooltip: {
        //     type: 'item'
        //   },
        //   dataset: {
        //     source: [
        //       ["product", "待接收", "待处理", "待派遣", "待审核", "待结束", "待评价", "已结束", "待复核"]
        //     ].concat(that.listArr)
        //   },
        //   color: ["#FF3862", "#67ACFE", "#FFCC21", "#BF90FF", "#86B4F8", "#95DAFF", "#B4BAFF", "#747FFF"],
        //   xAxis: {
        //     type: 'category',
        //     axisLabel: {
        //       interval: 0,//横轴信息全部显示
        //     },
        //     axisTick: {
        //       alignWithLabel: false,
        //       show: false,//取消x轴上面的小刻度
        //     }
        //   },
        //   yAxis: {
        //     axisLine: {
        //       show: false
        //     },
        //     axisLabel: {
        //       margin: 24
        //     }
        //   },
        //   grid: {
        //     width: "85%",
        //     left: "13.5%"
        //   },
        //   series: [
        //     {
        //       type: 'bar',
        //       barWidth: '12',
        //     },
        //     {
        //       type: 'bar',
        //       barWidth: '12',
        //     },
        //     {
        //       type: 'bar',
        //       barWidth: '12',
        //     },
        //     {
        //       type: 'bar',
        //       barWidth: '12',
        //     },
        //     {
        //       type: 'bar',
        //       barWidth: '12',
        //     },
        //     {
        //       type: 'bar',
        //       barWidth: '12',
        //     },
        //     {
        //       type: 'bar',
        //       barWidth: '12',
        //     },
        //     {
        //       type: 'bar',
        //       barWidth: '12',
        //     },
        //
        //   ]
        // });

      },
    }
  }
</script>

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
    width: 1476px;
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
