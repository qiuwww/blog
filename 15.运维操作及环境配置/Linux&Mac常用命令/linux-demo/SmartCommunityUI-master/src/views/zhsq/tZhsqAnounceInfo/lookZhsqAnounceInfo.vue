<template>
  <Modal v-model="show" :title="editTitle" :mask-closable="false" width="620px" class="lookZhsqAnounceInfo">
    <div class="ql-container ql-snow" style="user-select: none;">
      <div class="ql-editor" v-html="editorContent">
      </div>
    </div>
    <div slot="footer">
      <Button type="text" @click="show=false">取消</Button>
    </div>
  </Modal>
</template>
<script>
  import { getTZhsqAnounceInfo,} from '@/api/zhsq/tZhsqAnounceInfo/tZhsqAnounceInfo'
  export default {
    name: 'lookZhsqAnounceInfo',
    props: {
      value: {
        type: Boolean,
        default: false
      },
      tZhsqAnounceInfoId: {
        type: String
      },
      modalTitle: {
        type: String
      }
    },
    data() {
      return {
        editorContent: '',
        show: this.value,
        editTitle: this.modalTitle,
      }
    },
    methods: {},
    watch: {
      value(val) {
        this.show = val;
      },
      show(val) {
        this.editorContent = "";
        this.editTitle = this.modalTitle;
        if(val){
          getTZhsqAnounceInfo({id: this.tZhsqAnounceInfoId}).then(res => {
            if (res && res.success) {
              this.editorContent = res.data.infoContent;
            }
          });
        }else {
          this.$emit('input', val);
        }
      }
    }
  }
</script>
<style lang="less">
  .lookZhsqAnounceInfo{
    .ivu-modal-body{
      height: 55vh;
    }
  }
</style>
