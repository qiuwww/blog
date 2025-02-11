<template>
  <el-dialog
    center
    v-dialogDrag
    :title="title"
    v-if="noticeDialog"
    :width="dialogWidth"
    :before-close="close"
    :visible.sync="noticeDialog"
  >
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-position="right"
      class="overflow pl15 pr15"
    >
      <el-row type="flex" justify="space-around">
        <el-col :span="24" class="mb15">
          <el-form-item label="提示信息：" :label-width="labelWidth" prop="notice">
            <el-select  clearable v-model="form.notice">
              <el-option
                :key="index"
                :label="item"
                :value="item"
                placeholder="请选择信息"
                v-for="(item, index) in noticeList"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="space-around" v-if="form.notice==='其他'">
        <el-col :span="24">
          <el-form-item label="具体信息：" :label-width="labelWidth" prop="noticeTextArea">
            <el-input
              type="textarea"
              autocomplete="off"
              placeholder="请输入具体信息"
              v-model.trim="form.noticeTextArea"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer align-center tiling inline-block">
      <el-button @click="close">取 消</el-button>
      <el-button class="theme-btn" @click="handleConfirm('form')">确 认</el-button>
    </span>
  </el-dialog>
</template>

<script>
import "@/utils/drag.js";
import { vlength } from "@/utils/verification.js";

export default {
  name: "Checker_dialog",
  data() {
    return {
      form: {
        notice: "",
        noticeTextArea: ""
      },
      tableData: [],
      labelWidth: "125px",
      dialogWidth: "580px",
      rules: {
        notice: {
          required: true,
          message: "请选择驳回原因",
          trigger: "blur"
        },
        noticeTextArea: {
          validator: vlength(2, 400, "请选择具体驳回原因"),
          trigger: "blur"
        }
      }
    };
  },
  methods: {
    handleConfirm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.checkerReject();
        }
      });
    },
    checkerReject() {
      this.$emit("getNotice", this.form);
    },
    close() {
      this.$emit("close");
    },
    resetForm() {
      this.form = {
        notice: ""
      };
    }
  },
  props: ["noticeDialog", "title", "noticeList"]
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>