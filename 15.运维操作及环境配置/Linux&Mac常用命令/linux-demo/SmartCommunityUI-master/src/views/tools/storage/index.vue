<template>
    <Tabs type="card"  style="margin-top: 5px;" value="本地存储">
        <TabPane label="本地存储" icon="ios-document-outline" name="本地存储">
			<!-- 本地存储 -->
			<Local></Local>
		</TabPane>
        <TabPane label="七牛云存储" icon="ios-aperture-outline" name="七牛云存储">
			<!-- 七牛云存储 -->
			<QiNiu></QiNiu>
		</TabPane>
    </Tabs>
</template>
<script>
import Local from './local/index'
import QiNiu from './qiniu/index'
export default {
    name:'Storage',
    components:{
        Local,
        QiNiu
    }
}
</script>
<style lang="less" scoped>

</style>