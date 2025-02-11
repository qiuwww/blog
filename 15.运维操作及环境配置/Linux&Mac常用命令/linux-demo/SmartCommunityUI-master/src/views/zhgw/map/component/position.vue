<template>
    <Modal scrollable draggable v-bind:class="{'ivu-modal-move':isMousemove}" transfer v-model="show" title="坐标点定位" 
        :mask-closable="false"  :mask="false" class="positionDiv" width="350px" @on-cancel="cancel">
        <Tabs v-model="tabName">
            <TabPane label="经纬度坐标定位" name="position">
                <Form :model="position" label-position="right" :label-width="50">
                    <FormItem label="经度">
                        <Input type="number" v-model="position.pointX" number />
                    </FormItem>
                    <FormItem label="纬度">
                        <Input type="number" v-model="position.pointY" number />
                    </FormItem>
                </Form>
            </TabPane>
            <TabPane label="大地坐标定位" name="earthPosition">
                <Form :model="earthPosition" label-position="right" :label-width="70">
                    <FormItem label="大地经度">
                        <Input type="number" v-model="earthPosition.pointL" number />
                    </FormItem>
                    <FormItem label="大地纬度">
                        <Input type="number" v-model="earthPosition.pointB" number />
                    </FormItem>
                </Form>
            </TabPane>
        </Tabs>
        <div slot="footer">
            <Button type="default" ghost @click="positioning">定位</Button>
            <Button type="default" ghost @click="cancel">取消</Button>
        </div>
    </Modal>
</template>
<script>
export default {
    name: "position",
    props: {
        value: {
            type: Boolean,
            default: false,
        }
    },
    data() {
        return {
            position:{
                pointX:0,
                pointY:0
            },
            isMousemove:false,
            show:this.value,
            earthPosition:{
                pointL:0,
                pointB:0
            },
            tabName:"position",
        }
    },
    methods:{
        //定位按钮
        positioning(){
            if(this.tabName=="position"){
                var opts = {
                    duration: 4000  // Duration of animation will be 5 seconds
                };
                this.$parent.$parent.view.goTo({
                    center:[Number(this.position.pointX),Number(this.position.pointY)],
                    zoom: 16
                },opts);
            }else if(this.tabName=="earthPosition"){//大地坐标定位按钮
                let arr = this.$parent.$parent.webMercatorUtils.xyToLngLat(this.earthPosition.pointL, this.earthPosition.pointB);
                // console.log(arr);
                var opts = {
                    duration: 4000  // Duration of animation will be 5 seconds
                };
                this.$parent.$parent.view.goTo({
                    center:[Number(arr[0]),Number(arr[1])],
                    zoom: 16
                },opts);
            }
        },
        //取消按钮
        cancel(){
            this.$parent.positionShow = false;
        }
    },
    watch:{
        value(val) {
            this.show = val;
        }
    }
}
</script>
<style lang="less">
    .positionDiv{
        .ivu-modal-no-mask {
            z-index: 10 !important;
        }
        .ivu-modal {
            position:absolute;
            top: 125px;
            left: 15px;
            max-height: 600px;
        }
        .ivu-modal-content {
            color: #FFFFFF;
            background-color: rgba(30, 36, 50, 0.6);
            border: 1px solid rgba(32,160,255,0.6);
            border-radius: 5px !important;
        }
        .ivu-modal-header-inner {
            color: #FFFFFF;
        }
        .ivu-form .ivu-form-item-label{
            color: #ffffff;
        }
        .ivu-input{
            background-color: rgba(30, 36, 50, 0) !important;
            color: #fff !important;
        }
        .ivu-tabs-bar{
             color: #fff !important;
        }
    }

</style>
