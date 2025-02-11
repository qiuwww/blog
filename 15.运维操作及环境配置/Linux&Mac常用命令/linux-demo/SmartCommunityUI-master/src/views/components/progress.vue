<template>
  <div class="card-progress">
    <h5 class="mb">
      {{value}}
      <small class="text-muted">{{title}}</small>
    </h5>
    <div class="progress">
      <Progress
        :percent="data"
        :stroke-width="5"
        :stroke-color="color"
        hide-info
        style="width: 80%;"
      />
      <span class="progress-value">{{data}}%</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "bar",
  components: {},
  props: {
    value: {
      type: String,
      default: "0"
    },
    title: {
      type: String,
      default: "-"
    },
    data: {
      type: Number,
      default: 0
    },
    color: {
      type: String
    }
  },
  data() {
    return {};
  },
  mounted() {}
};
</script>
<style lang="less">
.card-progress {
  width: 100%;
  margin-bottom: 10px;
  .mb {
    margin-bottom: 0.375rem;
    font-weight: 500;
    color: #414d5f;
    font-size: 0.9375rem;
    .text-muted {
      color: #98a6ad;
      margin-left: 0.75rem;
      font-size: 0.75rem;
      font-weight: 400;
    }
  }
  .progress {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .progress-value {
      width: 20%;
      text-align: right;
      font-weight: 700;
      color: #6c757d;
    }
  }
}
.content{
width:80%;
}
</style>