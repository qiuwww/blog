<template>
  <div :class="className" :style="{height:height,width:width}"/>
</template>

<script>
    import echarts from 'echarts'

    require('echarts/theme/macarons') // echarts theme
    import { debounce } from '@/utils'
    import { getAreaHouseSaleSituation } from '../../api/activiti.js';

    const animationDuration = 3000

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
                chart: null,
                chartData: []
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
                getAreaHouseSaleSituation().then(res => {
                    if (res && res.success) {
                        this.chartData = res.data;
                        this.chart = echarts.init(this.$el, 'macarons')

                        this.chart.setOption({
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                                }
                            },
                            radar: {
                                radius: '66%',
                                center: ['50%', '42%'],
                                splitNumber: 8,
                                splitArea: {
                                    areaStyle: {
                                        color: 'rgba(127,95,132,.3)',
                                        opacity: 1,
                                        shadowBlur: 45,
                                        shadowColor: 'rgba(0,0,0,.5)',
                                        shadowOffsetX: 0,
                                        shadowOffsetY: 15
                                    }
                                },
                                indicator: [
                                    { name: '农民工', max: 50 },
                                    { name: '退役军人', max: 50 },
                                    { name: '高校毕业生', max: 50 },
                                    { name: '外来人口', max: 50 },
                                    { name: '法人', max: 50 }
                                ]
                            },
                            legend: {
                                left: 'center',
                                bottom: '10',
                                data: ['江阳区', '龙马潭区', '纳溪区']
                            },
                            series: [{
                                type: 'radar',
                                symbolSize: 0,
                                tooltip: {
                                    trigger: 'item'
                                },
                                areaStyle: {
                                    normal: {
                                        shadowBlur: 13,
                                        shadowColor: 'rgba(0,0,0,.2)',
                                        shadowOffsetX: 0,
                                        shadowOffsetY: 10,
                                        opacity: 1
                                    }
                                },
                                data: this.chartData,
                                animationDuration: animationDuration
                            }]

                        })
                    }
                });


            }
        }
    }
</script>
