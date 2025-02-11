<template>
	<Tabs type="card"  style="margin-top: 5px;" value="任务列表">
        <TabPane label="任务列表" icon="ios-document-outline" name="任务列表">
			<!-- 任务列表 -->
			<tZhsqTaskList></tZhsqTaskList>
		</TabPane>
        <TabPane label="事件列表" icon="ios-aperture-outline" name="事件列表">
			<!-- 事件列表 -->
			<tZhsqEventList></tZhsqEventList>
		</TabPane>
    </Tabs>

</template>
<style scoped>
  @import '../../../styles/default/indexHome.css';
</style>
<script>
	import tZhsqTaskList from '../tZhsqTaskList/tZhsqTaskList'
	import tZhsqEventList from '../tZhsqEventList/tZhsqEventList'
	export default {
		components: {
			tZhsqTaskList,
			tZhsqEventList
		}
	}
</script>
<style lang="less" scoped>
</style>
