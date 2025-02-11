<style scoped>
  .expand-row {
    margin-bottom: 16px;
  }
</style>
<template>
  <div>
    <Row class="expand-row">
      <Col span="8">
        <span class="expand-key">请求方法: </span>
        <span class="expand-value">{{ row.method }}</span>
      </Col>
    </Row>
    <Row class="expand-row">
      <Col span="8">
        <span class="expand-key">请求参数: </span>
        <span class="expand-value">{{ row.params }}</span>
      </Col>
    </Row>
  </div>
</template>
<script>
    export default {
        props: {
            row: Object
        }
    };
</script>
