<template>
  <!-- 受理派遣  派遣-->
  <DialogUI
    :dialogVisible="isShow"
    :hasFoot="true"
    :title="'异常转派申请'"
    @confirm="handleConfirm"
    @close="handleClose"
  >
    <el-form :model="form" ref="form" :rules="rules" >
     
      <el-form-item prop="remark" label="申请理由">
        <el-input
          type="textarea"
          v-model="form.remark"
          placeholder="请描述备注"
        ></el-input>
      </el-form-item>

    </el-form>
  </DialogUI>
</template>

<script>
import DialogUI from "@/components/DialogUI";
import { requiredRules } from "@/utils/rules";
import { handlingAssignment } from "@/api/events";
export default {
  props: {
    abnormalTransfer: {
      type: Boolean,
      required: false
    },
   
  },
  created() {
    this.handleGetList();
  },
  watch: {
    accept(n, o) {
      if (n) {
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
      let { remark } = requiredRules;
      return { remark };
    },
    isShow() {
      return this.abnormalTransfer;
    }
  },
  data() {
    return {
      form: {
       
        type: "",
        remark: ""
      },
      eventsList: []
    };
  },
  methods: {
    //   获取网格员
    async handleGetList() {
    //   alert("暂无网格员");
    },
    handleConfirm() {
      this.$refs["form"].validate(async v => {
        const data = await handlingAssignment({
          type: 2,
          remark: this.form.remark,
          detailsId: this.$route.query.id
        });
        if(data && data.code == 200 ){
            this.$notify({
                    title:data.msg,
                    type:'success'
                })
        }else{
             this.$notify(
                {
                    title:data.msg,
                    type:'success'
                }
            )
        }
        this.handleClose();
      });
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
