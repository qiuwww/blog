<template>
  
    
    <el-cascader
      v-model="dept"
      @change="handleChange"
      :options="deptList"
      :show-all-levels="false"
      filterable
      :props="optionProps"
    ></el-cascader>
  
</template>

<script>
import { getAllDept } from "@/api/user";
//handleGetJob
export default {
  data() {
    return {
      dept: "",
      deptList: [],
      optionProps: {
        value: "id",
        label: "name",
        children: "child",
        emitPath: false
      }
    };
  },
 async created() {
    //this.$store.dispatch("load/setLoading", true);
    this.getDepts();
   // this.$store.dispatch("load/setLoading", false);
   if(this.alreadlyDept){
       this.dept = this.alreadlyDept
   }
  },
  watch:{
      alreadlyDept(n,o){
          this.dept = this.alreadlyDept
      }
  },
  methods: {
    handleChange() {
      this.handleGetDept();
      this.$emit("change");
    },
    handleGetDept() {
      this.$emit("getDept", this.dept);
    },
    async getDepts() {
      const { object } = await getAllDept({
        userId: +sessionStorage.getItem("userId")
      });
      let arr = [];
      arr.push(object);
      this.deptList = arr;
    }
  },
  props:['alreadlyDept']
};
</script>

<style></style>
