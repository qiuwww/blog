<template>
  <div class="partyWrap">
    <el-form ref="postForm" :model="formData" label-width="100px" :rules="rules">
      <el-form-item label="网站名称" prop="siteName">
        <el-input v-model="formData.siteName" style="width: 400px" />
      </el-form-item>
      <el-form-item label="链接" prop="siteUrl">
        <el-input v-model="formData.siteUrl" placeholder="请输入完整的url,以http://或者https://开头" style="width: 400px" />
      </el-form-item>
      <el-form-item>
        <el-button v-if="permitIds.includes('dangjian_study_twoLearningone_save')" type="primary" @click="postForm">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { learningmaterialsAdd, learningmaterialsInfo } from '@/api/zhsq/learningCenter/index'
export default {
  name: 'TwoLearningOne',
  components: {
  },
  data: function() {
    return {
      formData: {
        siteName: '',
        siteUrl: '',
        sourceType: 1
      },
      // 表单验证规则
      rules: {
        siteName: [
          { required: true, message: '请输入网站名称', trigger: 'blur' }
        ],
        siteUrl: [
          { required: true, message: '请输入网站链接', trigger: 'blur' },
          { pattern: /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/, message: '请输入合法url', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['permitIds'])
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      learningmaterialsInfo(this.formData.sourceType).then(res => {
        this.formData.siteName = res.data.siteName
        this.formData.siteUrl = res.data.siteUrl
      })
    },
    postForm() {
      this.$refs['postForm'].validate(valid => {
        if (valid) {
          learningmaterialsAdd(this.formData).then(res => {
            if (res && res.code === 200) {
              this.$message({
                showClose: true,
                type: 'success',
                message: '添加成功'
              })
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped>
  /deep/ .ivu-form-item-content{
    margin-right:  0 !important;
  }
</style>
