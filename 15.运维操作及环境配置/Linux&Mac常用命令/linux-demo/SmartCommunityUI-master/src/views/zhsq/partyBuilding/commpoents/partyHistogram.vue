<template>
  <div class="charts-wrap">
    <ve-histogram
      :data="chartData"
      :legend-visible="false"
      :extend="chartExtend"
      :height="'270px'"
      :settings="chartSettings"
      :loading="loading"
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
    title: {
      type: String,
      default: () => ''
    },
    xLable: {
      type: String,
      default: () => ''
    },
    yLable: {
      type: String,
      default: () => ''
    }
  },
  data() {
    return {
      loading: true,
      chartSettings: {
        xAxisName: [this.xLable],
        yAxisName: [this.yLable],
        axisSite: { right: ['占比'] }
      },
      chartExtend: {
        title: {
          text: this.title,
          top: '40',
          right: '20',
          textStyle: {
            color: '#666666',
            fontSize: 14
          }
        },
        grid: {
          x: 20,
          y: 20,
          x2: 20,
          y2: 20
        },
        barWidth: '32',
        xAxis: {
          nameLocation: 'end',
          nameTextStyle: {
            color: '#666666',
            align: 'left',
            padding: [40, 0, 0, -60]
          },
          show: true,
          axisLine: {
            show: true,
            lineStyle: {
              color: '#F0F0F0'
            }
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            color: '#666666',
            rotate: 30,
            verticalAlign: 'top',
            formatter: function(val) {
              return val.split('').join('')
            }
          }
        },
        yAxis: {
          nameTextStyle: {
            color: '#666666'
          },
          type: 'value',
          show: true,
          axisLine: {
            show: true,
            lineStyle: {
              color: '#F0F0F0'
            }
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: '#7D8C99'
          }
        },
        itemStyle: {
          color: '#1890ff'
        },
        series: {
          label: { show: true, position: 'top' },
          itemStyle: {
            normal: {
              color: (params) => {
                const colors = ['#FAAD14', '#088FF8', '#19D4AE', '#7A7EFF', '#088FF8', '#088FF8', '#088FF8', '#088FF8', '#088FF8', '#088FF8', '#088FF8']
                let setColor = colors[params.dataIndex]
                if (params.name === '支部党员') {
                  setColor = colors[0]
                } else if (params.name === '支部委员') {
                  setColor = colors[1]
                } else if (params.name === '新转入党员') {
                  setColor = colors[2]
                } else if (params.name === '迁出党员') {
                  setColor = colors[3]
                } else {
                  setColor = colors[1]
                }
                return setColor
              }
            }
          }
        }
      },
      chartData: {
        columns: ['名', '值'],
        rows: []
      }
    }
  },
  watch: {
    rows: function(newVaule, oldValue) {
      if (newVaule) {
        const arr = []
        this.rows.forEach(ele => {
          arr.push({
            '名': ele.name,
            '值': ele.num
          })
        })
        this.chartData = {
          columns: ['名', '值'],
          rows: arr
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
  /*.charts-wrap{*/
  /*  background:rgba(255,255,255,1);*/
  /*    margin-bottom: 20px;*/
  /*  box-shadow:0px 3px 12px 1px rgba(25,25,25,0.16);*/
  /*  border-radius:2px;*/
  /*  padding: 30px 30px 20px;*/
  /*  text-align: left;*/
  /*}*/
</style>
