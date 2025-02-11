<template>
    <div id="toolbarDiv" v-if="show" class="esri-component esri-widget" style="position: absolute;top:60px;right:15px">
        <button
            id="distance"
            class="esri-widget--button esri-interactive esri-icon-measure-line"
            title="测量距离"
            @click="distanceMeasurement"
            style="float: left;"
        ></button>
        <button
            id="area"
            class="esri-widget--button esri-interactive esri-icon-measure-area"
            title="测量面积"
            @click="areaMeasurement"
            style="float: left;"
        ></button>
        <button
            id="clear"
            class="esri-widget--button esri-interactive esri-icon-trash"
            title="清除测量"
            @click="clearMeasurements"
            style="float: left;"
        ></button>
        <button
            id="close"
            class="esri-widget--button esri-interactive esri-icon-close"
            title="关闭测量"
            @click="closeMeasurements"
            style="float: left;"
        ></button>
    </div>
</template>
<script>
export default {
    props:['show'],
    data() {
        return {
            
        }
    },
    methods:{
        distanceMeasurement(){//测线
            this.$parent.$parent.measurement.activeTool = "distance";
            this.$parent.$parent.view.ui.add(this.$parent.$parent.measurement,"bottom-left");
        },
        areaMeasurement(){//测面
            this.$parent.$parent.measurement.activeTool = "area";
            this.$parent.$parent.view.ui.add(this.$parent.$parent.measurement,"bottom-left");
        },
        clearMeasurements(){//清除
            this.$parent.$parent.measurement.clear();
        },
        closeMeasurements(){//关闭量算
            this.$parent.$parent.measurement.clear();
            this.$parent.measureShow = false;
        }
    },
    mounted() {
        window.distanceMeasurement = this.distanceMeasurement;
        window.areaMeasurement = this.areaMeasurement;
        window.clearMeasurements = this.clearMeasurements;
        window.closeMeasurements = this.closeMeasurements;
    },
}
</script>
<style scoped>
    .measure{
        width:300px;
        height: 200px;
        background-color: white;
        position: relative;
        top: 10%;
        right: 5%;
        padding: 10px;
    }
    .btn{
        margin-top: 10px;
    }
</style>