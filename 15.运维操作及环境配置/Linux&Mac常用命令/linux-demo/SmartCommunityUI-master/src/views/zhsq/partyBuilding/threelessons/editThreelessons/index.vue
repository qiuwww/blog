<template>
  <div>
    <Modal v-model="show" :title="title" :mask-closable="false" width="920">
      <div class="formWrap">
        <div v-if="type !== 'info'">
          <el-form ref="postForm" class="p16" :inline="true" :model="formData" :label-width="'90px'" :rules="rules">
            <div style="height: 500px;overflow-y: auto;overflow-x: hidden">
              <el-row :gutter="10">
                <el-col :span="12">
                  <el-form-item label="议题:" prop="topic">
                    <Input v-model="formData.topic" placeholder="议题" style="width: 250px" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="发起人:" prop="initiator">
                    <Input v-model="formData.initiator" placeholder="发起人" style="width: 250px" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="地点:" prop="lessonsSite">
                    <Input v-model="formData.lessonsSite" placeholder="地点" style="width: 250px" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="党委名称:" prop="partyCommitteeId">
                    <el-select v-model="formData.partyCommitteeId" placeholder="党委名称"  @change="selectComminttee">
                      <el-option v-for="(item, i)  in committees" :key="item.id" :label="item.name" :value="item.id" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="支部名称:" prop="partyBranchId">
                    <el-select v-model="formData.partyBranchId" placeholder="支部名称"  @change="selectBranch">
                      <el-option v-for="(item, i)  in branchs" :key="item.id" :label="item.name" :value="item.id" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="分类:" prop="partyCategoryId">
                    <el-select v-model="formData.partyCategoryId" placeholder="分类"  @change="selectCategory">
                      <el-option v-for="(item, i)  in categorys" :key="item.id" :label="item.partyCategoryName" :value="item.partyCategoryId" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="时间:" prop="lessonsTime">
                    <DatePicker
                      type="datetime"
                      style="width:250px;"
                      :editable="false"
                      placeholder="请输入申请时间"
                      v-model="formData.lessonsTime"
                      @on-change="setlessonsTime"
                      format="yyyy-MM-dd HH:mm:ss" ></DatePicker>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="会议要求" prop="lessonsRequire">
                    <el-input
                      v-model="formData.lessonsRequire"
                      style="width: 645px"
                      type="textarea"
                      :autosize="{ minRows: 2, maxRows: 4}"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="会议结果" prop="meetingResults">
                    <el-input
                      v-model="formData.meetingResults"
                      style="width: 645px"
                      type="textarea"
                      :autosize="{ minRows: 2, maxRows: 4}"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <div>
                <p><el-button type="text" icon="el-icon-plus" @click="openParticipants">添加参会人员</el-button></p>
                <div>
                  <div v-for="(item, index) in lessonsMembers" :key="index" class="lessonsMembersItem">
                    <el-image
                      style="width: 66px; height: 66px"
                      :src="item.headSculpture"
                      :fit="'cover'"
                    />
                    <p class="text-center f14 color666" style="width: 80px">{{ item.name }}<i class="el-icon-circle-close deletedBtn" @click="deleteImgItem(index)" /></p>
                  </div>
                </div>
              </div>
            </div>
          </el-form>
        </div>
        <div v-else>
          <el-form :model="formData" class="demo-form-inline p16">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="议题:">
                  <span class="color666">{{ formData.topic }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="发起人:">
                  <span class="color666">{{ formData.initiator }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="党委名称:">
                  <span class="color666">{{ formData.partyCommitteeName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="支部名称:">
                  <span class="color666">{{ formData.partyBranchName }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="地点:">
                  <span class="color666">{{ formData.lessonsSite }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="时间:">
                  <span class="color666">{{ formData.lessonsTime }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="会议要求:">
                  <div class="color666" v-html="formData.lessonsRequire " />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="会议结果:">
                  <div class="color666" v-html="formData.meetingResults" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="参会人员:">
                  <div v-for="(item, index) in lessonsMembers" :key="index" class="lessonsMembersItem">
                    <el-image
                      style="width: 66px; height: 66px"
                      :src="item.headSculpture"
                      :fit="'cover'"
                    />
                    <p class="text-center f14 color666" style="width: 80px">{{ item.name }}</p>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <!--          <div class="text-center fomrFooter">-->
          <!--            <Button type="text" @click="closeModel">取消</Button>-->
          <!--          </div>-->
        </div>
        <sel-participants
          :modal-show="modelStatus"
          @confirmClick="confirmPpenParticipant"
          @close="closePpenParticipants"
        />
      </div>
      <!--    <div class="text-center fomrFooter">-->
      <!--      <Button type="text" @click="closeModel">取消</Button>-->
      <!--      <Button type="primary" :loading="httpLoading" @click="postFormData">提交</Button>-->
      <!--    </div>-->
      <div slot="footer">
        <Button type="text" @click="show=false">取消</Button>
        <Button type="primary" v-if="type !== 'info'" :loading="httpLoading" @click="postFormData">提交</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { threelessonsAdd, threelessonsEdit, threelessonsDetail } from '@/api/zhsq/threelessons/index'
import { getPartyBranchList } from '@/api/zhsq/partyManage/index'
import SelParticipants from '../selParticipants/index'
export default {
  name: 'EditThreelessons',
  components: {
    SelParticipants
  },
  props: {
  //  弹窗标题
    title: {
      type: String,
      default: ''
    },
    //  弹窗显示条件
    value: {
      type: Boolean,
      default: false
    },
    //  弹窗类型-----add新增，-----edit编辑, ----info查看
    type: {
      type: String,
      default: ''
    },
    // 查看编辑对象
    data: {
      type: Object,
      default: () => {}
    },
    // 分类集合
    categorys: {
      type: Array,
      default: () => []
    },
    // 党委集合
    committees: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      show: this.value,
      //  按钮加载状态
      httpLoading: false,
      // 表单数据
      formData: {
        partyCommitteeId: '',
        partyBranchId: ''
      },
      branchs: [],
      // 参会人员数组
      lessonsMembers: [],
      // 报名人数状态
      modelStatus: false,
      rules: {
        partyBranchId: [
          { required: true, message: '请选择党委支部', trigger: 'change' }
        ],
        partyCategoryId: [
          { required: true, message: '请选择党员分类', trigger: 'change' }
        ],
        partyCommitteeId: [
          { required: true, message: '请选择党委名称', trigger: 'change' }
        ],
        topic: [
          { required: true, message: '请填写议题', trigger: 'blur' }
        ],
        lessonsSite: [
          { required: true, message: '请填写地点', trigger: 'blur' }
        ],
        lessonsTime: [
          { required: true, message: '请选择时间', trigger: 'change' }
        ],
        initiator: [
          { required: true, message: '请填写发起人', trigger: 'blur' }
        ],
        lessonsRequire: [
          { required: true, message: '请填写会议要求', trigger: 'blur' }
        ],
        meetingResults: [
          { required: false, message: '请填写会议结果', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    value(val) {
      this.show = val
    },
    show(val) {
      if (val) {
        if (this.$refs['postForm'] !== undefined) {
          this.$refs['postForm'].resetFields();
        }

        this.formData = {
          partyCommitteeId: '',
          partyBranchId: ''
        }
        this.httpLoading = false
        this.lessonsMembers = []
        if (this.type !== 'add') {
          this.threelessonsDetailFun(this.data.id)
        }
        if (this.type === 'edit') {
          this.getPartyBranchListFun(this.data.partyCommitteeId)
        }
      } else {
        this.closeModal(val)
      }
    }
  },
  methods: {
  // 关闭
    closeModal(val) {
      // this.$emit('close')
      this.$emit('input', val)
    },
    // 选择党委
    selectComminttee(id) {
      this.committees.forEach(ele => {
        if (ele.id === id) {
          this.formData.partyCommitteeName = ele.name
        }
      })
      this.formData.partyBranchName = ''
      this.formData.partyBranchId = ''
      this.getPartyBranchListFun(id)
    },
    // 获取支部列表
    getPartyBranchListFun(id) {
      getPartyBranchList({
        partyCommitteeId: id || '',
        current: 1,
        size: 100
      }).then(res => {
        this.branchs = [{ id: '0', name: '全部' }].concat(res.data.records)
      })
    },
    // 查询详情
    threelessonsDetailFun(id) {
      threelessonsDetail(id).then(res => {
        res.data.partyBranchId = '' + res.data.partyBranchId
        res.data.partyCommitteeId = '' + res.data.partyCommitteeId
        res.data.partyCategoryId = '' + res.data.partyCategoryId
        if(res.data.lessonsTime && res.data.lessonsTime.toString().length>0){
          res.data.lessonsTime = new Date( res.data.lessonsTime)

        }
        this.formData = res.data
        this.lessonsMembers = res.data.lessonsMembers
      })
    },
    setlessonsTime(e) {
      this.formData.lessonsTime = e
    },
    // 选择支部
    selectBranch(id) {
      this.branchs.forEach(ele => {
        if (ele.id === id) {
          this.formData.partyBranchName = ele.name
        }
      })
    },
    // 选择分类
    selectCategory(id) {
      this.categorys.forEach(ele => {
        if (ele.partyCategoryId === id) {
          this.formData.partyCategoryName = ele.partyCategoryName
        }
      })
    },
    // 提交表单
    postFormData() {
      this.formData.lessonsMembers = this.lessonsMembers
      this.$refs['postForm'].validate(valid => {
        if (valid) {
          if (this.formData.lessonsMembers.length < 1) {
            this.$message({
              message: '请添加学习人员',
              type: 'warning'
            })
            return
          }
          this.httpLoading = true
          if (this.type === 'add') {
            threelessonsAdd(this.formData).then(res => {
              this.httpLoading = false
              this.closeModal(false)
              this.$emit('confirmClick')
            })
          }
          if (this.type === 'edit') {
            this.httpLoading = false
            this.formData.lessonsTime = this.$timeFormat(this.formData.lessonsTime, 'YYYY-MM-DD HH:mm:ss')
            threelessonsEdit(this.formData).then(res => {
              this.closeModal(false)
              this.$emit('confirmClick')
            })
          }
        }
      })
    },
    // 删除参会人员
    deleteImgItem(index) {
      this.lessonsMembers.splice(index, 1)
    },
    // 查看参会人数
    openParticipants() {
      this.modelStatus = true
    },
    // 关闭参会人数
    closePpenParticipants() {
      this.modelStatus = false
    },
    // 添加参会人数
    confirmPpenParticipant(data) {
      this.lessonsMembers.push(data)
      this.modelStatus = false
    }
  }
}
</script>

<style lang="less" scoped>
  /deep/.el-form-item{
    margin-bottom: 15px;
  }
  /deep/.el-select > .el-input{
    width: 250px;
  }
  /deep/.el-date-picker{
    width: 350px !important;
  }
  /deep/.el-popper[x-placement^=bottom]{
    width: 250px;
  }
  /deep/.ivu-modal-content{
    border-radius: 12px;
  }
  /deep/.ivu-modal-header{
    position: relative;
    color: #555C66;
    border: none;
    padding: 14px 16px 14px 20px;
    /deep/.ivu-modal-header-inner{
      font-size: 14px;
      color: #A0A8B5;
      line-height: 1;
      font-family: regular, 'Microsoft YaHei';
    }
  }
  /deep/.el-select .el-input .el-select__caret{
    transform: rotateZ(0deg);
  }
  /deep/.el-icon-arrow-up:before{
    content: "";
    box-sizing: inherit;
  }
  /deep/.el-select .el-input .el-select__caret.is-reverse{
    transform: rotateZ(180deg);
  }
  /deep/.ivu-modal-close{
    position: absolute;
    right: 9px;
    top: 6px;
    cursor: pointer;
    .el-icon-close{
      font-size: 18px;
    }
  }
  /deep/.ivu-modal-footer{
    padding: 14px 30px;
    background: #F8F9FA !important;
    border-radius: 0 0 12px 12px;
    border-top: none;
    text-align: right;
    /deep/.ivu-btn-primary{
      border-radius: 100px;
      padding: 0 40px;
    }
    /deep/.ivu-btn-text{
      border-radius: 100px;
      background: #ffffff;
      padding: 0 30px;
    }
  }
  .p16{
    padding: 16px;
  }
  .formWrap{
    /*width: 800px;*/
    .fomrFooter{
      padding: 14px 30px;
      background: #F8F9FA !important;
      border-radius: 0 0 12px 12px;
      /deep/.ivu-btn-primary{
        border-radius: 100px;
        padding: 0 40px;
      }
      /deep/.ivu-btn-text{
        border-radius: 100px;
        background: #ffffff;
        padding: 0 30px;
      }
    }
  }
    .lessonsMembersItem{
        display: inline-block;
        position: relative;
        width: 80px;
        text-align: center;
        margin: 0 5px;
        p{
            position: relative;
            text-align: center;
            line-height: 17px;
            .deletedBtn {
                position: relative;
                top: 1px;
                margin-left: 2px;
                cursor: pointer;
                font-size: 17px;
                z-index: 100;
            }
        }
    }
</style>
