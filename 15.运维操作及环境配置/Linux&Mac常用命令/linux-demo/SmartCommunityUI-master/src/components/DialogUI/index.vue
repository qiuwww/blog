<template>
<div v-if="isShow" class="dialogWarp">
    <el-dialog style="border-radius: 12px;" :title="titleDefult" :visible.sync="isShow" :width="width" :show-close="true" :before-close="handleClose">

        <slot />

        <div v-if="hasFootComputed" slot="footer" class="dialog-footer">
            <el-button   @click="handleClose" class="backtobtn">取 消</el-button>
            <el-button v-loading="loading" type="primary" @click="handleConfirm" class="surebtn">确 定</el-button><!-- v-loading="loading" -->
        </div>
    </el-dialog>
</div>
</template>

<script>
import {
    mapGetters
} from 'vuex'

export default {
    props: {
        dialogVisible: {
            type: Boolean,
            required: true
        },
        hasFoot: {
            type: Boolean,
            required: false
        },
        title: {
            type: String,
            required: false
        },
        dialogWidth: {
            type: String,
            required: false,
            default:null
          }
    },
    computed: {
        ...mapGetters(['loading']),
        isShow() {
            return this.dialogVisible
        },
        titleDefult() {
            return this.title ? this.title : '提示'
        },
        hasFootComputed() {
            if (this.hasFoot == undefined) {
                return true
            } else {
                return this.hasFoot
            }
        }
    },
  data() {
    return {
      width:this.dialogWidth==null?"720px":this.dialogWidth
    }
  },
    methods: {
        handleClose() {
            this.$emit('close')
        },
        handleConfirm() {
            this.$emit('confirm')
        }
    }
}
</script>

<style lang="scss" scoped>
.backtobtn {
    width: 120px;
    height: 32px;
    background: #ffffff;
    border: 1.3px solid #C3C3C3;
    border-radius: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.dialog-footer {
    display: flex;
    justify-content: center;
    margin-left: 75%;
}

.surebtn {
    width: 120px;
    height: 32px;
    background: #3083F2;
    line-height: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 16px;
    letter-spacing: 5px
}
</style>
