<template>
  <Card :padding="0">
    <div class="info-card-con">
      <Col class="info-card-icon-con" :style="{backgroundColor: color, color: 'white'}" span="8">
      <Row class="height-100" type="flex" align="middle" justify="center">
        <!--<Icon :type="iconType" :size="iconSize"></Icon>-->
        <img :src="iconType" class="icon">
      </Row>
      </Col>
      <Col span="16" class="height-100">
      <Row type="flex" align="middle" justify="center" class="height-100">
        <count-up
          class="info-card-count user-created-count"
          :id-name="idName"
          :end-val="endVal"
          :color="color"
          :count-size="countSize"
          :count-weight="countWeight"
        >
          <p slot="intro" class="info-intro-text">{{ introText }}</p>
        </count-up>
      </Row>
      </Col>
    </div>
  </Card>
</template>

<script>
import CountUp from './CountUp.vue';

export default {
  name: 'InforCard',
  components: {
    CountUp
  },
  props: {
    idName: String,
    endVal: Number,
    color: String,
    iconType: String,
    introText: String,
    countSize: {
      type: String,
      default: '30px'
    },
    countWeight: {
      type: Number,
      default: 700
    },
    iconSize: {
      type: Number,
      default: 40
    }
  }
};
</script>
<style lang="less">
.info-card-icon-con {
  height: 100%;
}

.height-100 {
  height: 100%;
}

.info-card-con {
  height: 100px;
}

.info-intro-text {
  font-size: 12px;
  font-weight: 500;
  color: #c8c8c8;
}
</style>
