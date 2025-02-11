<template>
<!-- 事件接收 -->
  <DialogUI
    :dialogVisible="isShow"
    :hasFoot="true"
    :title="'确认'"
    @confirm="handleConfirm"
    @close="handleClose"
  >
    <el-form :model="form" ref="form" :rules="rules" v-if="beVerified">
      <el-form-item label="事件类型" prop="eventType">
        <el-select  clearable v-model="form.eventType">
          <el-option
            v-for="(item, i)  in eventsList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="处理类型" prop="type">
        <el-select  clearable v-model="form.type">
          <el-option :label="'属实，我来处理'" :value="1"> </el-option>
          <el-option :label="'属实，网格长来处理'" :value="2"> </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-form v-else :model="form" ref="form" :rules="rules">
      <el-form-item prop="remark" label="备注">
        <el-input
          type="textarea"
          v-model="form.remark"
          placeholder="请输入不属实的原因"
        ></el-input>
      </el-form-item>
    </el-form>
  </DialogUI>
</template>

<script>
import DialogUI from "@/components/DialogUI";
import { requiredRules } from "@/utils/rules";
import {
  getEventsTypeList,
  changeEventsType,
  isAuthenticity
} from "@/api/events";
export default {
  props: {
    beVerified: {
      type: Boolean,
      required: false
    },
    notBeVerified: {
      type: Boolean,
      required: false
    },
    event: {
      type: Number,
      required: true
    }
  },
  created() {
    this.handleGetList();
  },
  watch: {
    beVerified(n, o) {
      if (n) {
        this.form.eventType = String(this.event);
      } else {
        this.form = {
          eventType: "",
          type: "",
          remark: ""
        };
      }
    }
  },
  computed: {
    rules() {
      let { eventType, type } = requiredRules;
      return { eventType, type };
    },
    isShow() {
      return this.notBeVerified || this.beVerified;
    }
  },
  data() {
    return {
      form: {
        eventType: "",
        type: "",
        remark: ""
      },
      eventsList: []
    };
  },
  methods: {
    async handleGetList() {
      const { data } = await getEventsTypeList();
      this.eventsList = data;
    },
    handleConfirm() {
      this.$refs["form"].validate(v => {
        if (this.beVerified) {
          if (v) {
            if (this.form.eventType == this.event) {
              const o = this.handleBeVerified();
              if (o) {
                this.$notify({
                  title: "成功",
                  type: "success"
                });
				this.$router.go(-1)
              } else {
                this.$notify({
                  title: "失败",
                  type: "warning"
                });
			  this.$router.go(-1)
              }
            } else {
              const a = this.handleModifyType();
              const b = this.handleBeVerified();
              if (a && b) {
                this.$notify({
                  title: "成功",
                  type: "success"
                });
              } else {
                this.$notify({
                  title: "失败",
                  type: "warning"
                });
              }
            }
            this.handleClose();
          }
        } else {
          this.handleNotBeVerified();
        }
      });
    },
    async handleBeVerified() {
      const data = await isAuthenticity({
        type: this.form.type,
        detailsId: this.$route.query.id
      });
      return data && data.code == 200;
    },
    async handleModifyType() {
      const data = await changeEventsType({
        userId: +sessionStorage.getItem("userId"),
        eventsTypeId: this.form.eventType,
        detailsId: this.$route.query.id
      });
      return data && data.code == 200;
    },
    async handleNotBeVerified() {
      // not be verified
      const data = await isAuthenticity({
        type: 3,
        detailsId: this.$route.query.id,
        remark: this.form.remark
      });

      if (data && data.code == 200) {
        this.$notify({
          title: data.msg,
          type: "info"
        });
      } else {
        this.$notify({
          title: data.msg,
          type: "info"
        });
      }
      this.handleClose();
    },
    handleClose() {
      this.$emit("close");
    }
  },
  components: {
    DialogUI
  }
};
</script>

<style></style>
