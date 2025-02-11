<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'
import { getAreaMoneyTotal } from '../../api/activiti';

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '400px'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initChart()
    this.__resizeHandler = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.__resizeHandler)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    window.removeEventListener('resize', this.__resizeHandler)
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
        getAreaMoneyTotal().then(res => {
            if (res && res.success) {
                this.chart = echarts.init(this.$el, 'macarons')
                this.chart.setOption({
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },
                    legend: {
                        left: 'center',
                        bottom: '10',
                        data: [ '新建营业用房', '新建自住住房','一手车位（车库）','二手营业用房', '二手自住住房']
                    },
                    calculable: true,
                    series: [
                        {
                            name: '申报总额(万元)',
                            type: 'pie',
                            roseType: 'radius',
                            radius: [15, 95],
                            center: ['50%', '38%'],
                            data: res.data,
                            animationEasing: 'cubicInOut',
                            animationDuration: 1600
                        }
                    ]
                })
            }
        });
    }
  }
}
</script>
