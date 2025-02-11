<template>
  <div>
    <ve-ring
      :data="chartData"
      :extend="chartExtend"
      :settings="chartSettings"
      height="351px"
    />
  </div>
</template>

<script>

export default {
  name: 'PieChart',
  props: {
    rows: {
      type: Array,
      default: () => []
    },
    value: {
      type: String,
      default: () => ''
    },
    title: {
      type: String,
      default: () => ''
    },
    total: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      totalNum: 0,
      chartData: {
        columns: ['名', '值'],
        rows: this.rows
      },
      chartExtend: {
        color: ['#E85959', '#19D4AE', '#088ff8', '#7A7EFF', '#FFCC00'],
        gird: {
          bottom: '90px'
        },
        title: {
          left: '50%',
          top: '50%',
          right: 'center',
          bottom: 'center',
          textAlign: 'center',
          text: '党员总数',
          textStyle: {
            fontSize: 16
          },
          subtext: this.totalNum,
          subtextStyle: {
            fontSize: 14,
            color: ['#999']
          }
        },
        legend: {
          // right: '20%', //图例排列方式
          bottom: '0',
          // right: '10%',
          // orient: 'vertical',
          icon: 'circle'
        }
      },
      chartSettings: {
        radius: [70, 100],
        label: {
          normal: {
            formatter: '{b|{b}}\n{hr|}\n{d|{d}%}',
            distanceToLabelLine: 0,
            rich: {
              b: {
                fontSize: 12,
                align: 'left',
                padding: 4
              },
              hr: {
                borderColor: 'auto',
                width: '100%',
                borderWidth: 1,
                height: 0
              },
              d: {
                fontSize: 12,
                align: 'left',
                padding: 4
              }
            }
          }
        },
        labelLine: {
          length: 20,
          length2: 10
        }
      }
    }
  },
  watch: {
    rows: function(newVaule, oldValue) {
      if (newVaule) {
        this.chartData = {
          columns: ['名', '值'],
          rows: this.rows
        }
        this.totalNum = this.total
        this.chartExtend.title.subtext = this.total
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .charts-wrap{
    height:351px;
    background:rgba(255,255,255,1);
    box-shadow:0px 3px 12px 1px rgba(25,25,25,0.16);
    border-radius:2px;
    padding: 30px 30px 20px;
    text-align: left;
  }
</style>
