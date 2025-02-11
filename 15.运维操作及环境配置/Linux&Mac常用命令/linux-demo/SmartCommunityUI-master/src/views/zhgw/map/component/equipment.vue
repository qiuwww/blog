<style lang="less" scoped>

</style>
<template>
    <Modal v-model="show" title="设备管理" @on-cancel="cancel" @on-ok="ok">
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
    </Modal>
</template>
<script>
export default {
    name:'equipment',
    props: {
        value: {
            type: Boolean,
            default: false,
        }
    },
    data() {
        return {
            show:this.value,
        }
    },
    methods:{
        ok(){
            this.$parent.$parent.equipmentShow = false;
        },
        cancel(){
            this.$parent.$parent.equipmentShow = false;
        }
    },
    watch: {
        value(val) {
            this.show = val;
        },
        show(val) {
            if(val){
                console.log(this.$parent.$parent.pointId);
            }
        }
    }
}
</script>