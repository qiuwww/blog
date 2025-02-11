<template>
  <el-dialog
    center
    v-dialogDrag
    title="修改密码"
    :width="dialogWidth"
    v-loading="loading"
    :before-close="close"
    v-if="modifyPasswordDialog"
    :visible.sync="modifyPasswordDialog"
  >
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-position="right"
      class="mt20 overflow pl15 pr15"
    >
      <el-row type="flex" justify="space-around">
        <el-col :span="18" class="form-inp">
          <el-form-item
            label="当前密码："
            prop="oldPassword"
            :label-width="labelWidth"
          >
            <el-input
              show-password
              autocomplete="off"
              placeholder="请输入当前密码"
              v-model.trim="form.oldPassword"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="space-around">
        <el-col :span="18" class="form-inp">
          <el-form-item
            label="新密码："
            prop="newPassword"
            :label-width="labelWidth"
          >
            <el-input
              show-password
              autocomplete="off"
              placeholder="请输入新密码"
              v-model.trim="form.newPassword"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="space-around">
        <el-col :span="18" class="form-inp">
          <el-form-item
            label="确认密码："
            prop="rePassword"
            :label-width="labelWidth"
          >
            <el-input
              show-password
              autocomplete="off"
              placeholder="请输入确认密码"
              v-model.trim="form.rePassword"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer align-center tiling inline-block">
      <el-button @click="handleReset">重 置</el-button>
      <el-button class="theme-btn" @click="handleModifyPassword"
        >修 改</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import "@/utils/drag.js";
import { modifyPassword } from "@/api/user";
import { vlength } from "@/utils/verification.js";
export default {
  name: "Modify_password_dialog",
  data() {
    return {
      form: {
        oldPassword: "",
        newPassword: "",
        rePassword: ""
      },
      labelWidth: "110px",
      dialogWidth: "540px",
      rules: {
        oldPassword: {
          validator: vlength(6, 12, "请输入当前密码"),
          trigger: "blur"
        },
        newPassword: {
          validator: vlength(6, 12, "请输入新密码"),
          trigger: "blur"
        },
        rePassword: {
          validator: vlength(6, 12, "请输入确认密码"),
          trigger: "blur"
        }
      }
    };
  },
  methods: {
    handleModifyPassword() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.newPassword !== this.form.rePassword) {
            return this.$notify.error({
              title: "错误",
              message: "两次密码不一致！"
            });
          }
          const params = {
            oldPassword: this.form.oldPassword,
            newPassword: this.form.newPassword,
            userId: sessionStorage.getItem("userId")
          };

          this.$store.dispatch("load/setLoading", true);
          modifyPassword(params).then(res => {
            res &&
              this.$alert("请重新登陆！", "密码修改成功", {
                confirmButtonText: "确定",
                callback: () => {
                  this.$router.push("/login");
                }
              });
          });
        }
      });
    },
    close() {
      this.$emit("close");
    },
    handleReset() {
      this.form = {
        oldPassword: "",
        newPassword: "",
        rePassword: ""
      };
    }
  },
  props: ["modifyPasswordDialog", "password", "loading"]
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
