<template>
  <div>
    <Card class="card-info">
      <span class="lstick"></span>
      <div class="info-wrap">
        <img :src="icon" class="icon" />
        <div class="content">
          <h6 class="text">{{title}}</h6>
          <h2 class="mt" :id="id"></h2>
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
import { CountUp } from "countup.js";
export default {
  name: "cardInfo",
  components: {},
  props: {
    id: {
      type: String,
      default: "countup"
    },
    icon: {
      type: String,
      default: "https://i.loli.net/2019/11/22/OSp4jzy5TrLAvM3.png"
    },
    title: {
      type: String,
      default: "-"
    },
    value: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {};
  },
  methods: {
    init() {
      this.$nextTick(() => {
        let demo = new CountUp(this.id, this.value);
        if (!demo.error) {
          demo.start();
        }
      });
    }
  },
  mounted() {
    this.init();
  }
};
</script>
<style lang="less" scoped>
.card-info {
  .lstick {
    background: #478ef9;
    width: 2px;
    height: 30px;
    display: inline-block;
    vertical-align: middle;
    position: absolute;
    left: 0;
    top: 38px;
  }
  .info-wrap {
    display: flex;
    align-items: center;
    height: 70px;
    .icon {
      display: inline-block;
      width: 55px;
      margin-right: 1rem;
    }
    .content {
      display: flex;
      flex-direction: column;
      .text {
        color: #99abb4;
        font-size: 0.875rem;
        margin-top: 0.5rem;
      }
      .mt {
        font-size: 1.5rem;
        margin-bottom: 0.5rem;
        font-weight: 400;
        line-height: 1.2;
        color: #67757c;
      }
    }
  }
}
</style>