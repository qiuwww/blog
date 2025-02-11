<template>
  <span>
    <span style="margin-right: 8px;"><slot></slot></span>
    <el-tooltip popper-class="atooltip" :content="content" :placement="placement">
      <i class="el-icon-info" style="cursor: pointer;"></i>
    </el-tooltip>
  </span>
</template>
<script>
  export default {
    name: 'HelpHint',
    props: {
      placement: {
        default: 'bottom-end'
      },
      content: String,
    },
    data() {
      return {}
    },
  }
</script>
<style lang="scss">
	.atooltip {
	  background: RGBA(16, 69, 164, 1) !important;
	}
</style>
<style lang="scss" scoped>
	
			.atooltip.el-tooltip__popper[x-placement^="top"] .popper__arrow {
			  border-top-color: #FFF;
			}
			
			.atooltip {
			  background:RGBA(16, 69, 164, 1) !important;
			  color: rgba(255, 255, 255, 1);
			}
</style>

