<template>
  <Dialog title="处理" :hasFoot="false" :dialogVisible="shangbao" @confirm="handleConfirm" @close="close">
    <el-row>
      <el-row>
        <el-select v-model="type">
          <el-option label="派遣" :value="1"> </el-option>
          <el-option label="驳回" :value="2"> </el-option>
          <el-option label="分级上报" :value="3"> </el-option>
        </el-select>
      </el-row> 
      <el-row>
          <el-input type="textarea" :rows="5" v-model="remark">

          </el-input>
      </el-row>

      <el-row v-if="type != 3 || !beUserId">
        <el-button @click="handleDispatchDialog">
          下一步
        </el-button>
        <el-button @click="close">
          取消
        </el-button>
      </el-row>
      <el-row v-else>
        <el-button @click="handleConfirm"
        >
          确认
        </el-button>
        <el-button @click="close">
          取消
        </el-button>
      </el-row>
    </el-row>

    <Dispath
      :dispatchDialog="dispatchDialog"
      :depatchType="4"
      @closeDispatch="handlClose"
    />
  </Dialog>
</template>

<script>
import DialogUI from "@/components/DialogUI";
import Dispatch from "@/components/DispatchDialog";
import {beforeHierarchical,acceptDispatch} from '@/api/events'

export default {
    props:['shangbao'],
  data() {
    return {
      type: 1,
      dispatchDialog: false,
      beUserId: "",
      remark:''
    };
  },
  handleDispatchDialog() {
    this.dispatchDialog = true;
  },
  async handleConfirm() { 
      let data = {} 
      if(type!=3){
           data = await acceptDispatch({
              type:this.type,
              beUserId:this.beUserId,
              detailsId:this.$route.query.id,
              remark:this.remark
          })
      } else{
          data = await beforeHierarchical({
              remark:this.remark,
                detailsId:this.$route.query.id,
          })
      }
      if(data && data.code == 200 ){
          this.$notify({
              title:data.msg,
              type:data.success ? 'success' :'warning'
          })
      }
  },
  close() {
    this.$emit("close");
  },
  handlClose(val) {
    if (val) {
      this.beUserId = val;
    }
    this.dispatchDialog = false;
  }
};
</script>

<style></style>
