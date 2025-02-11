<template>
  <Modal v-model="show" :title="editTitle" :mask-closable="false" width="620px" class="lookTPolicyNews">
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
  import { getTPolicyNews,} from '@/api/zhsq/tPolicyNews/tPolicyNews'
  export default {
    name: 'lookTPolicyNews',
    props: {
      value: {
        type: Boolean,
        default: false
      },
      TPolicyNewsId: {
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
          getTPolicyNews({id: this.TPolicyNewsId}).then(res => {
            if (res && res.success) {
              this.editorContent = res.data.content;
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
  .lookTPolicyNews{
    .ivu-modal-body{
      height: 75vh;
    }
  }
</style>
