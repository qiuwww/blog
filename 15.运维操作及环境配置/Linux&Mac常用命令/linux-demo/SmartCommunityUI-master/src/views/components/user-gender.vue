<template>
    <div class="dashboard-console-user-gender">
        <Row type="flex" justify="center" align="middle">
            <Col span="6" class="ivu-text-center" v-color="'#3399ff'">
                <Avatar icon="ios-man" size="large" v-color="'#3399ff'" v-bg-color="'#d6f0ff'" />
                <div class="ivu-mt-8">农民工40%</div>
            </Col>
            <Col span="6" class="ivu-text-center" v-color="'#be6be0'">
                <Avatar icon="ios-man" size="large" v-color="'#be6be0'" v-bg-color="'#fdf0ff'" />
                <div class="ivu-mt-8">退役军人 25%</div>
            </Col>
            <Col span="6" class="ivu-text-center" v-color="'#ffba00'">
                <Avatar icon="md-man" size="large" v-color="'#ffba00'" v-bg-color="'#d8d1bd'" />
                <div class="ivu-mt-8">高校毕业生 20%</div>
            </Col>
            <Col span="6" class="ivu-text-center" v-color="'#13ce66'">
                <Avatar icon="md-man" size="large" v-color="'#13ce66'" v-bg-color="'#6d9ace'" />
                <div class="ivu-mt-8">外地来泸 10%</div>
            </Col>
        </Row>
        <div class="dashboard-console-user-gender-grid ivu-mt-8">
            <Grid center square :col="25" padding="2px" :border="false">
                <GridItem v-for="(item, i)  in 100" :key="item">
                    <span v-bg-color="'#3399ff'" v-if="item <= 45"></span>
                    <span v-bg-color="'#be6be0'" v-else-if="item <= 70"></span>
                    <span v-bg-color="'#ffba00'" v-else-if="item <= 90"></span>
                    <span v-bg-color="'#13ce66'" v-else></span>

                </GridItem>
            </Grid>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {

            }
        }
    }
</script>
<style lang="less">
    .dashboard-console-user-gender{
        &-grid{
            .ivu-grid-item-main{
                height: 100%;
            }
            span{
                display: block;
                height: 100%;
                border-radius: 2px;
                opacity: 0.75;
            }
        }
    }
</style>
