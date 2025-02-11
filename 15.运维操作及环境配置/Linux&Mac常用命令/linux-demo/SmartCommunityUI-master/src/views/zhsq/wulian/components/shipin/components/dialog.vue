<template>
  <DialogUI
    :dialog-visible="addType"
    :title="'新增设备'"
    @close="handleClose"
    @confirm="handleConfirm"
  >
    <el-row type="flex" justify="center">
      <el-col :span="20">
        <el-form ref="form" :model="form" :rules="rules">
          <el-form-item prop="name" label="设备名称">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item prop="isPrivate" label="设备属性">
            <el-input v-model="form.isPrivate" />
          </el-form-item>
          <el-form-item prop="status" label="设备状态">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item prop="status" label="设备状态">
            <el-input v-model="form.name" />
          </el-form-item>

          <el-form-item prop="gridId" label="所属网格">
            <Grid @push="handleGetGrid" :isMultiple="true"  />
          </el-form-item>
          <el-form-item prop="url" label="视屏地址">
            <el-input v-model="form.url" />
          </el-form-item>
          <el-form-item prop="remark" label="描述">
            <el-input v-model="form.remark" />
          </el-form-item>
        </el-form>
      </el-col>
      <plot
        v-model="ShowMap"
        modalTitle="选择坐标点"
        @resultPoint="getLocation"
        divId="updateBasicSocialOrganizationList"
        :objData="locationArr"
        iconPath="/img/archives/shanghu.png"
        :selectType="selectType"
      ></plot>
    </el-row>
  </DialogUI>
</template>

<script>
import DialogUI from "@/components/DialogUI";
import Grid from "@/components/Ascription/gridSelect";

import plot from "@/views/gismap/components/plot";
export default {
  components: {
    DialogUI,
    Grid
  },
  props: {
    row: {
      type: Object,
      required: false,
      default: () => {
        return {
          name: "",
          isPrivate: "",
          remark: "",
          code: "",
          status: "",
          url: "",
          gridId: ""
        };
      }
    }
  },
  data() {
    return {
      form: {
        name: "",
        isPrivate: "",
        remark: "",
        code: "",
        status: "",
        url: "",
        gridId: "",
        position: ""
      }, 
      selectType: 'Point',
      locationArr:[],
      ShowMap:false,
      rules: {
        name: {
          required: true,
          message: "请输入部门名称"
        }
      }
    };
  },
  methods: {
    getLocation(obj, type) {
      this.form.position = JSON.stringify(obj.flatCoordinates);
    },
    checkMap() {
      if (this.form.position) {
        this.locationArr = JSON.parse(
          this.form.position
        );
      }
      this.ShowMap = true;
    },
    handleGetGrid(val) {
      this.form.gridId = val;
    },
    handleClose() {
      this.$emit("close");
    },
    handleConfirm() {
      this.$refs["form"].validate(v => {
        if (v) {
          this.$emit("confirm", this.form.name);
        }
      });
    }
  }
};
</script>

<style></style>
