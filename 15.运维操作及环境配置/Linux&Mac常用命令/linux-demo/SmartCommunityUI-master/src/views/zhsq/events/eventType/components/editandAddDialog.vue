<template>
  <Dialog
    :dialog-visible="dialogVisible"
    :has-foot="undefined"
    @close="handleClose"
    @confirm="handleConfirm"
  >
    <el-form ref="form" :model="form" :rules="rules">
      <div v-if="addChild">
        <el-form-item prop="pid" label="上级名称">
          {{name}}
<!--          <el-input v-model="form.pid" placeholder="请输入类型名称" />-->
          <!--pidData-->
        </el-form-item>
      </div>
      <el-form-item prop="name" label="类型名称">
        <el-input v-model="form.name" placeholder="请输入类型名称" />
      </el-form-item>
    </el-form>
  </Dialog>
</template>

<script>
import { addEventType, modifyEventType } from "@/api/events";
import Dialog from "@/components/DialogUI";
export default {
  components: {
    Dialog
  },
  props: {
    addEventType: {
      required: false,
      type: Boolean
    },
    addChild: {
      required: false,
      type: Boolean
    },
    pidData: {
      required: false,
      type: String
    },
    editEventType: {
      required: false,
      type: Boolean
    },
    name: {
      required: false,
      type: String
    },
    id: {
      required: false,
      type: [Number,String]
    }
  },
  data() {
    return {
      form: {
        name: "",
        pid: null,
      },
      rules: {
        name: {
          required: true,
          message: "请输入类型名称"
        },
        /*pid: {
          required: true,
          message: "请选择上级类型"
        }*/
      }
    };
  },
  computed: {
    dialogVisible() {
      if (this.editEventType) {
        this.form.name = this.name;
      }
      return this.addEventType || this.editEventType;
    }
  },
  methods: {
    handleClose() {

      this.$emit("close");
      this.form={
        name: ""
      }
    },
    handleConfirm() {
      this.$refs["form"].validate(async v => {
        if (v) {
          const res = this.addEventType
            ? await this.handleAdd()
            : await this.handleEdit();
          if (res && res.code == 200) {
            this.$notify({
              title: res.msg,
              type: "success"
            });
          } else {
            this.$notify({
              title: res.msg,
              type: "fail"
            });
          }
          this.handleClose();
          this.$emit("update");
        }
      });
    },
    async handleAdd() {
      this.form.pid = this.pidData;
      if(!this.form.pid || this.form.pid == null || this.form.pid == undefined){
        this.form.pid = 0;
      }
      const data = await addEventType({
        createUser: +sessionStorage.getItem("userId"),
        name: this.form.name,
        pid: this.form.pid
      });
      return data;
    },
    async handleEdit() {
      const data = await modifyEventType({
        id: this.id,
        name: this.form.name
      });
      return data;
    }
  }
};
</script>

<style></style>
