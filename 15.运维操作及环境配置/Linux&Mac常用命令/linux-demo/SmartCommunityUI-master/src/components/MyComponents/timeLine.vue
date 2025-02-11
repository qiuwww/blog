<template>
  <canvas ref="canvas" width="850px" height="450px" style="background:#fff"></canvas>
</template>

<script>
export default {
  data() {
    return {
      item: [
        { name: 1, str: "7" },
        { name: 2, str: "7" },
        { name: 3, str: "7" },
        { name: 4, str: "7" },
        { name: 5, str: "7" },
        { name: 6, str: "7" },
        { name: 7, str: "7" },
        { name: 8, str: "7" },
      ]
    }
  },
  props: [],
  mounted() {
    let canvas = this.$refs.canvas
    var ctx = canvas.getContext("2d");
    // 画画
    ctx.beginPath();
    ctx.arc(100, 50, 10, 0, Math.PI * 2, true);
    ctx.fillStyle = '#E5E5E5'// 绘制
    ctx.fill();

    ctx.beginPath();
    ctx.arc(100, 50, 5, 0, Math.PI * 2, true);
    ctx.fillStyle = '#A7A5A5'// 绘制
    ctx.fill();

    // #A7A5A5
    ctx.beginPath();

  },
  methods: {

  }
}
</script>

<style>
</style>