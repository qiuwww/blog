<template>
    <div class="dashboard-monitor-sentiment">
        <Row type="flex" justify="center" align="middle" v-height="80">
            <Col span="8">
                <span class="dashboard-monitor-sentiment-number">{{ happy }}</span>
            </Col>
            <Col span="8">
                <img src="@/assets/svg/icon-happy.svg">
                <p>已办事件</p>
            </Col>
            <Col span="8">
                <span class="dashboard-monitor-sentiment-percent dashboard-monitor-sentiment-percent-up">{{ happyPercent }}%</span>
            </Col>
        </Row>
        <Divider size="small" />
        <Row type="flex" justify="center" align="middle" v-height="80">
            <Col span="8">
                <span class="dashboard-monitor-sentiment-number">{{ sad }}</span>
            </Col>
            <Col span="8">
                <img src="@/assets/svg/icon-sad.svg">
                <p>未办事件</p>
            </Col>
            <Col span="8">
                <span class="dashboard-monitor-sentiment-percent dashboard-monitor-sentiment-percent-down">{{ sadPercent }}%</span>
            </Col>
        </Row>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                happy: 856,
                happyPercent: 82,
                sad: 69,
                sadPercent: 9
            }
        }
    }
</script>
<style lang="less">
    .dashboard-monitor-sentiment{
        text-align: center;
        img{
            height: 50px;
        }
        p{
            color: #808695;
            margin-top: 4px;
        }
        &-number{
            font-size: 24px;
        }
        &-percent{
            font-size: 20px;
            &-up{
                color: #19be6b;
            }
            &-down{
                color: #ed4014;
            }
        }
    }
</style>
