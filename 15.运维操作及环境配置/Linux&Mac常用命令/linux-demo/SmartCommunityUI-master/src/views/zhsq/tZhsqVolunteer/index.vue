<template>
  <Tabs v-if="permitIds.includes('archive_staff_volunteer_postulants')||permitIds.includes('archive_staff_volunteer_postulant')" style="margin-top: 5px;" :value="permitIds.includes('archive_staff_volunteer_postulant')?'name1':'name2'">
    <TabPane label="志愿者管理" icon="ios-people" name="name1" v-if="permitIds.includes('archive_staff_volunteer_postulant')">
      <t-zhsq-volunteer-list></t-zhsq-volunteer-list>
    </TabPane>
    <TabPane label="志愿者活动管理" icon="logo-chrome" name="name2" v-if="permitIds.includes('archive_staff_volunteer_postulants')">
      <tZhsqVolunteerActivityList></tZhsqVolunteerActivityList>
    </TabPane>
  </Tabs>
</template>
<style scoped>
  @import '../../../styles/default/indexHome.css';
</style>
<script>
    import tZhsqVolunteerList from './tZhsqVolunteerList'
    import tZhsqVolunteerActivityList from '../tZhsqVolunteerActivity/tZhsqVolunteerActivityList'
    import {mapGetters} from "vuex";
    export default {
        components: {
            tZhsqVolunteerList, tZhsqVolunteerActivityList
        },
        computed: {
            ...mapGetters(["permitIds"])
        },
        data() {
            return {}
        },
        methods: {},
        mounted() {

        }
    }
</script>
<style scoped="less">

</style>
