<template>
  <div class="message-con" >
    <el-tooltip :always="value>0" :content="value > 0 ? '有' + value + '条未读消息' : '无未读消息'" placement="bottom">
      <Badge :count="value" dot>
        <Icon type="md-notifications" :size="22" />
      </Badge>
    </el-tooltip>
  </div>
</template>

<script>
import util from '@/libs/util';
export default {
  name: 'MessageTip',
  props: {
    value: {
      type: Number,
      default: 0
    }
  },
  methods: {
    showMessage() {
      util.openNewPage(this, 'message_index');
      this.$router.push({
        name: 'message_index'
      });
    }
  }
};
</script>
