<template>
  <el-form :model="form" ref="form">
    <el-col :span="24">
      <el-form-item
        label="楼盘名称："
        prop="propertyController"
        label-width="100px"
        style="margin: 0;"
      >
        <el-select
          placeholder="请选择楼盘名称"
          @change="handleChangeProperty"
          v-model="form.propertyController"
        >
          <el-option
            :key="index"
            :value="item.id"
            :label="item.name"
            v-for="(item, index) in propertyList"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-col>
  </el-form>
</template>

<script>
import { mapGetters } from "vuex";
import { getOneProperty, getAllProperty } from "@/api/property";

export default {
  name: "Property_controller",
  data() {
    return {
      propertyList: [],

      form: {
        propertyController: ""
      },
      formLabelWidth: "70px"
    };
  },
  inject: ["reload"],

  created() {
    this.handleGetProperty();
  },
  methods: {
    async handleGetProperty() {
      let o = await getAllProperty({
        userId: +sessionStorage.getItem("userId")
      });

      if (o && o.code == 200) {
        this.propertyList = o.rows;
        this.form.propertyController = +sessionStorage.getItem("propertyId");
        this.handleChangeProperty()
      }
    },
    handleChangeProperty() {
      let b = ''
      this.propertyList.forEach((element, index) => {
        element.id == this.form.propertyController ? (b = index) : "";
      });
      sessionStorage.setItem("propertyId", this.form.propertyController);
      sessionStorage.setItem(
        "propertyInfo",
        JSON.stringify(this.propertyList[b])
      );
      this.$store.dispatch("property/setProperty", this.propertyList[b]);
      
    },

    handleConfirm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.addPlan();
        }
      });
    }
  }
};
</script>

<style scoped></style>
