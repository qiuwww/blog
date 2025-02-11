<template>
  <el-dialog
    v-if="taskDialog"
    v-dialogDrag
    v-loading="loading"
    center
    title="创建任务"
    :width="dialogWidth"
    :before-close="close"
    :visible.sync="taskDialog"
  >
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-position="right"
      class="mt20 overflow pl15 pr15"
    >
      <el-row type="flex" justify="center">
        <el-col :span="24" class="mb15 form-inp">
          <el-form-item
            label="任务属性："
            prop="cycleFixed"
            :label-width="labelWidth"
          >
            <el-radio-group
              v-model="form.cycleFixed"
              @change="handleCycleFixedChange"
            >
              <el-radio label="2">临时</el-radio>
              <el-radio label="1">周期</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row
        v-if="isCycleFixed && form.cycleFixed"
        type="flex"
        justify="center"
      >
        <el-col :span="24" class="form-inp">
          <el-form-item
            label="开始时间："
            prop="beginDate"
            :label-width="labelWidth"
          >
            <el-date-picker
              v-model="form.beginDate"
              type="datetime"
              placeholder="选择开始时间"
              value-format="yyyy-MM-dd HH:mm:ss"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row
        v-if="isCycleFixed && form.cycleFixed"
        type="flex"
        justify="center"
      >
        <el-col :span="24">
          <el-form-item
            prop="cycleNum"
            label="重复周期："
            class="inline-block"
            :label-width="labelWidth"
          >
            <el-input
              v-model.trim="form.cycleNum"
              class="medium-inp"
              autocomplete="off"
              placeholder="请输入重复周期"
            />
          </el-form-item>
          <el-form-item class="inline-block mini-select" prop="cycleType">
            <el-select  clearable v-model="form.cycleType" placeholder="单位">
              <el-option label="日" value="1" />
              <el-option label="周" value="2" />
              <el-option label="月" value="3" />
              <el-option label="年" value="4" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row
        v-if="!isCycleFixed && form.cycleFixed"
        type="flex"
        justify="center"
      >
        <el-col :span="24" class="mb15 form-inp">
          <el-form-item
            label="紧急程度："
            prop="urgentType"
            class="inline-block"
            :label-width="labelWidth"
          >
            <el-select  clearable v-model="form.urgentType" placeholder="请选择紧急程度">
              <el-option
                v-for="(item, index) in urgentTypeList"
                :key="index"
                :label="item.name"
                :value="item.number"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="24" class="mb15 form-inp">
          <el-form-item
            label="任务类型："
            :label-width="labelWidth"
            prop="categoryId"
          >
            <el-select  clearable v-model="form.categoryId" placeholder="请选择任务类型">
              <el-option
                v-for="(item, index) in taskCategoryList"
                :key="index"
                :value="item.id"
                :label="item.name"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="24" class="mb15 form-inp">
          <el-form-item
            label="所属街道："
            :label-width="labelWidth"
            prop="street"
          >
            <Street @push="handleGetStreet" />

          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="24" class="mb15 form-inp">
          <el-form-item
            label="所属社区："
            :label-width="labelWidth"
            prop="community"
          >
            <CommunityId :street-id="streetId" @push="handleGetCommunity" />

          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="24" class="mb15 form-inp">
          <el-form-item
            label="所属网格："
            :label-width="labelWidth"
            prop="grid"
          >
            <Grid :community-id="communityId" @push="handleGetGrid" />

          </el-form-item>
        </el-col>
      </el-row>

      <el-row type="flex" justify="center">
        <el-col :span="24" class="mb15">
          <el-form-item
            label="任务描述："
            :label-width="labelWidth"
            prop="remark"
            class="required"
          >
            <el-input
              v-model.trim="form.remark"
              type="textarea"
              autocomplete="off"
              placeholder="请输入任务描述"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="24" class="mb15">
          <el-form-item
            label="上传照片："
            :label-width="labelWidth"
            class="required"
          >
            <Upload
              :limit="limit"
              :img-src="photoArr"
              :max-size="imageMaxSize"
              :accept-type="['png', 'jpeg', 'jpg']"
              @uploadChange="handleUploadChange"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer align-center tiling inline-block">
      <el-button @click="close" class="backbtn">取 消</el-button>
      <el-button
        v-if="permitIds.includes('renwu_mine_paidan') && !userId && form.cycleFixed == 2 "
        class="theme-btn"
        @click="handleDispatch"
      >
        派 单
      </el-button>
      <el-button v-else class="theme-btn submitbtn" @click="handleAddTask" >提 交</el-button>
    </span>
  </el-dialog>
</template>

<script>
import '@/utils/drag.js'
import { mapGetters } from 'vuex'
import Upload from '@/components/UpLoadImg'
import Street from '@/components/Ascription/streetSelecr'
import CommunityId from '@/components/Ascription/communitySelect'
import Grid from '@/components/Ascription/gridSelect'
import { addTask } from '@/api/engineering'
import { getAllDictionary } from '@/api/dictionary'
import { vlength, vIntNumber } from '@/utils/verification.js'

export default {
  name: 'TaskDialog',
  data() {
    return {
      communityId: '',
      streetId: '',
      gridId: sessionStorage.getItem('gridId'),
      form: {
        remark: '',
        cycleNum: '',
        cycleType: '',
        beginDate: '',
        urgentType: '',
        categoryId: '',
        cycleFixed: '',
        photoAddress: '',
        street: '',
        community: '',
        gridId: ''
      },
      limit: 3,
      photoArr: [],
      imageMaxSize: 1024,
      urgentTypeList: [],
      labelWidth: '110px',
      dialogWidth: '720px',
      rules: {
        cycleFixed: {
          required: true,
          message: '请选择任务属性',
          trigger: 'blur'
        },
        beginDate: {
          required: true,
          message: '请选择开始时间',
          trigger: 'blur'
        },
        cycleNum: {
          validator: vIntNumber(1, 10, '请输入重复周期'),
          trigger: 'blur'
        },
        cycleType: {
          required: true,
          message: '请选择单位',
          trigger: 'blur'
        },
        urgentType: {
          required: true,
          message: '请选择紧急程度',
          trigger: 'blur'
        },
        categoryId: {
          required: true,
          message: '请选择任务类型',
          trigger: 'blur'
        },
        remark: {
          validator: vlength(2, 400, '请输入任务描述'),
          trigger: 'blur'
        },
        gridId: {
          required: true,
          message: '请选择网格',
          trigger: 'blur'
        }
      }
    }
  },
  computed: {
    ...mapGetters(['permitIds']),
    photoList() {
      return this.form.photos ? this.form.photos.split(',') : []
    },
    isCycleFixed() {
      switch (this.form.cycleFixed) {
        case '2':
          this.form.beginDate = ''
          this.form.cycleNum = ''
          this.form.cycleType = ''
          return false
          break
        case '1':
          this.form.urgentType = ''
          return true
          break
        default:
          return false
          break
      }
    }
  },
  watch: {
    taskDialog() {
      this.taskDialog && this.resetForm()
      this.taskDialog && this.getUrgentTypeList()
    }
  },
  methods: {
    handleGetStreet(val) {
      this.street = val
    },
    handleGetCommunity(val) {
      this.communityId = val
    },
    handleGetGrid(val) {
      this.gridId = val
    },
    handleDispatch() {
      this.$emit('dispatchDialog')
    },
    async getUrgentTypeList() {
      const { data } = await getAllDictionary({
        fieldName: 'urgentType'
      })
      this.urgentTypeList = data
    },
    handleUploadChange(prop) {
      this.form.photoAddress = prop
    },
    handleCycleFixedChange() {
      this.$refs['form'].clearValidate()
    },
    handleAddTask() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          const formData = new FormData()

          if (!this.form.photoAddress.length) {
            this.$notify.error({
              title: '错误',
              message: '请先上传照片'
            })
            return
          }
          formData.append('remark', this.form.remark)
          formData.append('photos', this.form.photoAddress)
          formData.append('categoryId', this.form.categoryId)
          formData.append('cycleFixed', this.form.cycleFixed)
          this.form.beginDate &&
            formData.append('beginDate', this.form.beginDate)
          this.form.cycleNum && formData.append('cycleNum', this.form.cycleNum)
          this.form.cycleType &&
            formData.append('cycleType', this.form.cycleType)
          this.form.urgentType &&
            formData.append('urgentType', this.form.urgentType)
          formData.append('executorIds', this.userId)
          formData.append('gridId', this.gridId)

          formData.append('submitUserId', sessionStorage.getItem('userId'))
          // formData.append("gridId", sessionStorage.getItem("gridId"));
          addTask(formData).then(res => {
            this.$message({
              type: 'success',
              message: res.msg
            })
            this.$emit('update')
            this.$emit('close')
          })
        }
      })
    },
    close() {
      this.resetForm()
      this.$emit('close')
    },
    resetForm() {
      this.form = {
        remark: '',
        cycleNum: '',
        cycleType: '',
        beginDate: '',
        urgentType: '',
        categoryId: '',
        cycleFixed: '',
        photoAddress: ''
      }
    }
  },
  components: {
    Upload, Street, CommunityId, Grid
  },
  props: ['taskDialog', 'taskCategoryList', 'loading', 'userId']
}
</script>

<style scoped lang='scss'>
  .el-form-item {
    margin-bottom: 0;
  }
	.backbtn{
		width: 80px;
		height: 32px;
		background: #ffffff;
		border: 1.3px solid #C3C3C3;
		border-radius: 16px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.submitbtn{
		width: 120px;
		height: 32px;
		background: #3083F2;
		line-height: 12px;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 16px;
		letter-spacing:5px
	}
</style>
