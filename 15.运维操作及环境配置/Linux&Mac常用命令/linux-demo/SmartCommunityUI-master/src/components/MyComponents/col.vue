<template>
  <div :class="classStyle"><slot></slot></div>
</template>

<script>
export default {
  name: "Col",
  computed: {
    classStyle() {
      let $class = "";
      switch (this.type) {
        case "col-left":
          $class = "col inline-block w50 fl align-left col-left";
          break;

        case "col-right":
          $class = "col inline-block w50 fr align-right col-right";
          break;

        case "align-left":
          $class = "col inline-block w100 fl";
          break;

        case "align-center":
          $class = "col inline-block w100 fl align-center";
          break;

        case "align-right":
          $class = "col inline-block w100 fl align-right";
          break;

        default:
          $class = "col inline-block w100 fl";

          break;
      }
      return $class;
    }
  },
  props: ["type"]
};
</script>

<style scoped lang="less"></style>
