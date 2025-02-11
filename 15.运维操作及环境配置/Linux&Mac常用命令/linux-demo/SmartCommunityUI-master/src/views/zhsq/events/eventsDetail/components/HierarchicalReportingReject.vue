<template>
  <!-- 分级上报 -->
  <DialogUI
    :dialog-visible="isShow"
    :has-foot="true"
    :title="'分级上报(驳回)'"
    @confirm="handleConfirm"
    @close="handleClose"
  >
    <el-row>
      <el-col :span="3">
        <span class="label">驳回理由:</span>

      </el-col>
    </el-row>
    <el-row>
      <el-col :span="16" :offset="3">
        <el-input type="textarea" v-model="form.remark" :rows="5"> </el-input>
      </el-col>
    </el-row>


    <!--        {{ '这边部门没得选 ，此分支暂不开放' }}-->

      <!-- <el-row type="flex" justify="center" class="mt20">
      <el-col :span="12">
        <el-button type="primary" @click="handleDispatch"> 下一步 </el-button>
        <el-button> 取消 </el-button>
      </el-col>
    </el-row> -->

    <!-- <el-dialog
      v-if="dispatchDialog"
      v-dialogDrag
      center
      title="选择派遣对象"
      width="500px"
      :before-close="close"
      :append-to-body="true"
      :visible.sync="dispatchDialog"
    >
      <el-row>
        <span class="label"> 派遣至 </span>
        <el-select v-model="labelUser" @change="getDispatchs">
           <el-option :label="'管理员'" :value="2">  </el-option>
           <el-option :label="'网格长'" :value="3">  </el-option>
           </el-select>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="24" class="mb15">
          <el-row type="flex" justify="center">
            <el-col :span="20" class="mb15">
              <section
                v-for="(item, index) in dispatchList"
                :key="index"
                style="height:40px;overflow:hidden;dispaly:inline-block"
              >
                <span class="mb05">{{ item.name }}</span>
              </section>
            </el-col>
            <el-col :span="4" class="mb15">
              <el-checkbox-group v-model="checkedList">
                <el-checkbox
                  v-for="(item, i)  in dispatchList"
                  :key="item.userId"
                  :label="item.userId"
                  class="ml10"
                  style="height:40px;overflow:hidden;dispaly:inline-block"
                >{{ '' }}</el-checkbox>
              </el-checkbox-group>
            </el-col>
          </el-row>
        </el-col>
      </el-row>

      <span slot="footer" class="dialog-footer align-center tiling inline-block">
        <el-button
          v-loading="loading"
          class="theme-btn"
          @click="handleDispatchConfirm"
        >确 定</el-button>
      </span>
    </el-dialog> -->

  </DialogUI>
</template>

<script>
import DialogUI from '@/components/DialogUI'
import UpLoadImg from '@/components/UpLoadImg'
import { requiredRules } from '@/utils/rules'
import { getEventsTypeList, handlingObjectionAssignment, hierarchical } from '@/api/events'
import { getUserList } from '@/api/system'

export default {
  components: {
    DialogUI,
    UpLoadImg
  },
  props: {
    completionReview: {
      type: Boolean,
      required: false
    },
    aleventType: {
      type: Number,
      required: false
    }
  },
  data() {
    return {
      form: {
        remark: ''
      },
      checkedList: '',
      steps: 0,
      radio: 1,
      photo: '',
      dialogVisible: false,
      eventsList: [],
      dispatchList: [],
      photoArr: [],
      eventType: '',
      dispatchDialog: false
    }
  },
  computed: {
    rules() {
      const { remark, type } = requiredRules
      return { remark }
    },
    isShow() {
      if(this.completionReview){
        this.eventType =String(this.aleventType)
         this.handleGetList()
      }
      return this.completionReview
    },
    mediaAddress() {
      return this.photo.map(i => {
        return { address: i, type: '1' }
      })
    }
  },
  watch: {
    completionReview(n, o) {},
    dialogVisible(n, o) {
      if(n){
        this.handleGetList()
      }
    },
    dispatchDialog(n,o){
      if(n){
        this.getDispatchs()
      }
    },
    aleventType:{
      handler(n,o){
        this.eventType = n
      },
      immediate:true,
    }
  },
  methods: {
    async getDispatchs() {
      const res = await getUserList({
        fileType: this.labelUser,
        gridId: sessionStorage.getItem('gridId')
      })
      this.dispatchList = res.data
    },
    async handleGetList() {
      const { data } = await getEventsTypeList()
      this.eventsList = data
    },
    async handleModifyType() {
      const data = await changeEventsType({
        userId: +sessionStorage.getItem('userId'),
        eventsTypeId: this.eventType,
        //detailsId: this.$route.query.id
      })
      if (data && data.code == 200) {
        this.$notify({
          title: data.msg,
          type: data.succcess ? 'success' : 'warning'
        })
      }
    },
    close() {
      this.dispatchDialog = false
    },
    handleDispatch() {
      this.dispatchDialog = true
    },
    handleConfirm() {
      this.handleDispatchConfirm()
    },
    async handleDispatchConfirm() {
      const data = await hierarchical({

    "type": 1,
    "remark": this.form.remark,
    "detailsId": this.$route.query.id

      })
      if (data && data.code == 200) {
        this.$notify(
          {
            title: data.msg,
            type: data.success ? 'success' : 'warning'
          }
        )
        this.$emit('close')
      }
    },
    handleClose() {
      this.$emit('close')
    }
  }
}
</script>

<style></style>
