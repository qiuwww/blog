<template>
  <!-- 事件接收 -->
  <DialogUI
    :dialog-visible="isShow"
    :has-foot="true"
    :title="'处理反馈'"
    @confirm="handleConfirm"
    @close="handleClose"
  >
    <el-row>
      <el-form ref="form" :model="form" :rules="rules">
        <el-row>
          <el-col :span="12">
            <span class="label"> 处理责任人姓名</span>
            <span>{{ "管理员A" }}</span>
          </el-col>
          <el-col :span="12">
            <span class="label"> 处理责任人联系方式</span>
            <span>{{ "131234551278" }}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <span class="label"> 处理前的信息</span>
            <el-button>
              上传图片
            </el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <span class="label"> 处理后的信息</span>
            <UpLoadImg
              class="mt15"
              :limit="3"
              :img-src="photoArr"
              :max-size="1024"
              :accept-type="['png', 'jpeg', 'jpg']"
              @uploadChange="handleUploadChange"
            />
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="13">
            <span class="label fl"> 备注 </span>
            <span style="display:inline-block;" class="fr mr20">
              <el-input
                v-model="form.remark"
                type="textarea"
                :row="3"
              />
            </span>
          </el-col>
        </el-row>
      </el-form>
    </el-row>
  </DialogUI>
</template>

<script>
import DialogUI from '@/components/DialogUI'
import { requiredRules } from '@/utils/rules'
import UpLoadImg from '@/components/UpLoadImg'

import {
  getEventsTypeList,
  changeEventsType,
  isAuthenticity,
  handlingAssignment
} from '@/api/events'
export default {
  components: {
    DialogUI,
    UpLoadImg
  },
  props: {
    handlingAssignment: {
      type: Boolean,
      required: false
    }
  },
  data() {
    return {
      form: {
        remark: ''
      },
      photoArr: [],
      mediaAddress: [],
      eventsList: []
    }
  },
  computed: {
    rules() {
      const { remark } = requiredRules
      return { remark }
    },
    isShow() {
      return this.handlingAssignment
    }
  },
  watch: {
    beVerified(n, o) {
      if (n) {
        this.form.eventType = String(this.event)
      } else {
        this.form = {
          eventType: '',
          type: '',
          remark: ''
        }
      }
    }
  },
  created() {
    this.handleGetList()
  },
  methods: {
    handleUploadChange(val) {
      this.mediaAddress = val.map(i => {
        return {
          address: i,
          type: '1'
        }
      })
    },
    async handleGetList() {
      const { data } = await getEventsTypeList()
      this.eventsList = data

    },
    handleConfirm() {
      this.$refs['form'].validate(async v => {
        if (v) {
          const data = {
            type: 1,
            userId: +sessionStorage.getItem('userId'),
            remark: this.form.remark,
            oldAudioMediaAddress: '处理前信息',
            mediaAddress: JSON.stringify(this.mediaAddress.join(',')),
            detailsId: this.$route.query.id
          }
          // //
          const o = await handlingAssignment(data)
          if (o && o.code == 200) {
            this.$notify({
              title: '成功',
              type: 'success'
            })
          } else {
            this.$notify({
              title: '失败',
              type: 'warning'
            })
          }

          this.handleClose()
        } else {
          this.$notify({
            title: '请核对未填写项',
            type: 'warning'
          })
        }
      })
    },
    async handleBeVerified() {
      const data = await isAuthenticity({
        type: this.form.type,
        detailsId: this.$route.query.id
      })
      return data && data.code == 200
    },
    async handleModifyType() {
      const data = await changeEventsType({
        userId: +sessionStorage.getItem('userId'),
        eventsTypeId: this.form.eventType,
        detailsId: this.$route.query.id
      })
      return data && data.code == 200
    },
    async handleBeVerified() {
      // not be verified
      const data = await isAuthenticity({
        type: 3,
        detailsId: this.$route.query.id,
        remark: this.form.remark
      })

      if (data && data.code == 200) {
        this.$notify({
          title: data.msg,
          type: 'info'
        })
      } else {
        this.$notify({
          title: data.msg,
          type: 'info'
        })
      }
      this.handleClose()
    },
    handleClose() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.label{
  width: 145px;
}
.el-col{
  margin-bottom:10px;
}
.el-textarea{
  width:214px;
}
</style>
