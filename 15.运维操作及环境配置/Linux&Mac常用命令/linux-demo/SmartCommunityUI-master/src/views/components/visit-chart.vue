<template>
    <Row :gutter="24">
        <Col :xl="16" :lg="12" >
            <h4>申报量趋势</h4>
            <div ref="visitChart" v-height="240"></div>
        </Col>
        <Col :xl="8" :lg="12" >
            <h4>申报量排行</h4>
            <div v-height="240">
                <ul>
                    <li v-for="(item, i)  in 6" :key="item">
                        <Row type="flex" justify="center" align="middle">
                            <Col span="14">
                                <Avatar size="small" v-color=" item < 4 ? '#1890ff': '#8c8c8c'" v-bg-color="item < 4 ? '#e6f7ff' : '#f5f5f5'" class="ivu-mr-8">{{ item }}</Avatar>
                                <span>{{ item }}小区 </span>
                            </Col>
                            <Col span="10" class="ivu-text-right">
                                <Numeral value="456789" format="0,0" />
                            </Col>
                        </Row>
                    </li>
                </ul>
            </div>
        </Col>
    </Row>
</template>
<script>
    import echarts from 'echarts'
	require('echarts/theme/macarons') // echarts theme
	import { debounce } from '@/utils'

    export default {
        data () {
            return {

            }
        },
        methods: {
            handleSetVisitChart () {
                this.visitChart = echarts.init(this.$refs.visitChart);
                this.visitChart.setOption(
                    {
                        xAxis: {
                            type: 'category',
                            axisLine: {
                                lineStyle: {
                                    color: '#D7DDE4'
                                }
                            },
                            axisTick: {
                                alignWithLabel: true,
                                lineStyle: {
                                    color: '#D7DDE4'
                                }
                            },
                            axisLabel: {
                                textStyle: {
                                    color: '#7F8B9C'
                                }
                            },
                            splitLine: {
                                show: false,
                                lineStyle: {
                                    color: '#F5F7F9'
                                }
                            },
                            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
                        },
                        yAxis: {
                            axisLine: {
                                show: false
                            },
                            axisTick: {
                                show: false
                            },
                            axisLabel: {
                                textStyle: {
                                    color: '#7F8B9C'
                                }
                            },
                            splitLine: {
                                show: true,
                                lineStyle: {
                                    color: '#F5F7F9'
                                }
                            },
                            type: 'value'
                        },
                        series: [{
                            data: [9728, 4578, 12768, 4982, 9665, 5489, 3288, 13422, 6753, 7463, 8162, 6545],
                            type: 'bar',
                            tooltip: true,
                            smooth: true,
                            symbol: 'none',
                            itemStyle: {
                                normal: {
                                    barBorderRadius: [3, 3, 0, 0],
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                        {
                                            offset: 0,
                                            color: '#69cdff'
                                        },
                                        {
                                            offset: 0.5,
                                            color: '#3eb3f7'
                                        },
                                        {
                                            offset: 1,
                                            color: '#1495eb'
                                        }
                                    ])
                                }
                            }
                        }],
                        color: ['#1495EB', '#00CC66', '#F9D249', '#ff9900', '#9860DF'],
                        grid: {
                            left: 16,
                            right: 25,
                            bottom: 5,
                            top: 20,
                            containLabel: true
                        },
                        tooltip: {
                            trigger: 'axis'
                        }
                    }
                );
            },
            handleResize () {
                this.visitChart.resize();
            }
        },
        mounted () {
            this.handleSetVisitChart();
        },
        beforeDestroy () {
            if (this.visitChart) {
                this.visitChart.dispose();
                this.visitChart = null;
            }
        }
    }
</script>
<style lang="less">
    .dashboard-console-visit{
        ul{
            li{
                list-style-type: none;
                margin-top: 12px;
            }
        }
    }
</style>
