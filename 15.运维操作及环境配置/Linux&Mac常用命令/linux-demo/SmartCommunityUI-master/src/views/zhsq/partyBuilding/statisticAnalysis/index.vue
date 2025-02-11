<template>
  <div class="partyWrap">
    <el-row :gutter="25">
      <el-col :span="8">
        <div class="charge-item-wrap">
          <div class="charge-item-title">党员类别</div>
          <div class="charge-item-body">
            <div class="searchWrap">
              <el-form :inline="true" :model="categoriesSearchData" size="small">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="党委名称">
                      <el-select v-model="categoriesSearchData.partyCommitteeId" placeholder="党委名称" clearable @change="selectCommintteeC">
                        <el-option v-for="(item, index) in committees" :key="index" :label="item.name" :value="item.id" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="支部名称">
                      <el-select v-model="categoriesSearchData.partyBranchId" placeholder="支部名称" clearable @change="categoriesanalysisFun">
                        <el-option v-for="(item, index) in branchsC" :key="index" :label="item.name" :value="item.id" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
            <div><party-histogram :rows="categoriesData" :title="'单位：人'" /></div>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="charge-item-wrap">
          <div class="charge-item-title">党员学习情况</div>
          <div class="charge-item-body">
            <div class="searchWrap">
              <el-form :inline="true" :model="learnSearchData" size="small">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="党委名称">
                      <el-select  clearable v-model="learnSearchData.partyCommitteeId" placeholder="党委名称" @change="selectCommintteeL">
                        <el-option v-for="(item, index) in committees" :key="index" :label="item.name" :value="item.id" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
            <div><party-histogram :rows="learnData" height="300px" :title="'单位：人'" /></div>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="charge-item-wrap">
          <div class="charge-item-title">活动推送人群分类</div>
          <div class="charge-item-body">
            <div class="searchWrap">
              <el-form :inline="true" :model="pushcrowdSearchData" size="small">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="党委名称">
                      <el-select  clearable v-model="pushcrowdSearchData.partyCommitteeId" placeholder="党委名称"  @change="selectCommintteeW" >
                        <el-option v-for="(item, index) in committees" :key="index" :label="item.name" :value="item.id" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="支部名称">
                      <el-select  clearable v-model="pushcrowdSearchData.partyBranchId" placeholder="支部名称"  @change="pushcrowdanalysisFun">
                        <el-option v-for="(item, index) in branchsW" :key="index" :label="item.name" :value="item.id" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
            <div><party-histogram :rows="pushcrowdData" height="300px" :title="'单位：人'"  /></div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="25">
      <el-col :span="8">
        <div class="charge-item-wrap">
          <div class="charge-item-title">网格党员</div>
          <div class="charge-item-body">
            <div class="searchWrap">
              <el-form :inline="true" :model="gridpartySearchData" size="small">
                <el-form-item label="党委名称">
                  <el-select  clearable v-model="gridpartySearchData.partyCommitteeId" placeholder="党委名称" @change="selectCommintteeG" style="width: 140px">
                    <el-option v-for="(item, index) in committees" :key="index" :label="item.name" :value="item.id" />
                  </el-select>
                </el-form-item>
              </el-form>
            </div>
            <div><party-histogram :rows="gridpartyData" height="300px" :title="'单位：人'" /></div>
          </div>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="charge-item-wrap">
          <div class="charge-item-title">党费缴纳</div>
          <div class="charge-item-body">
            <div class="searchWrap">
              <el-form :inline="true" :model="partypaymentSearchData" size="small">
                <el-form-item label="党委名称">
                  <el-select  clearable v-model="partypaymentSearchData.partyCommitteeId" placeholder="党委名称" @change="selectCommintteeP">
                    <el-option v-for="(item, index) in committees" :key="index" :label="item.name" :value="item.id" />
                  </el-select>
                </el-form-item>
                <el-form-item label="支部名称">
                  <el-select  clearable v-model="partypaymentSearchData.partyBranchId" placeholder="支部名称" @change="partypaymentanalysisFun">
                    <el-option v-for="(item, index) in branchsP" :key="index" :label="item.name" :value="item.id" />
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-date-picker
                    v-model="partypaymentSearchData.time"
                    type="month"
                    placeholder="选择月"
                  />
                </el-form-item>
              </el-form>
            </div>
            <div><party-histogram :rows="partypaymentData" height="300px" :title="'单位：元'"  /></div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { pushcrowdanalysis, partypaymentanalysis, learnanalysis, gridpartyanalysis, categoriesanalysis } from '@/api/zhsq/statisticAnalysis/index'
import { getPartyCommitteeList, getPartyBranchList } from '@/api/zhsq/partyManage/index'
import partyHistogram from '../commpoents/partyHistogram'
export default {
  name: 'StatisticAnalysis',
  components: {
    partyHistogram
  },
  data: function() {
    return {
      // 党委集合
      committees: [],
      // 支部集合
      branchsC: [],
      branchsW: [],
      branchsP: [],
      // 活动推送人群分析
      pushcrowdData: [],
      // 活动推送人群分析检索条件
      pushcrowdSearchData: {
        partyCommitteeId: '',
        partyBranchId: ''
      },
      // 党员类别统计分析
      categoriesData: [],
      // 党员类别统计分析检索条件
      categoriesSearchData: {
        partyCommitteeId: '',
        partyBranchId: ''
      },
      // 党费缴纳
      partypaymentData: [],
      // 党费缴纳检索条件
      partypaymentSearchData: {
        partyCommitteeId: '',
        partyBranchId: ''
      },
      //  党员学习情况分析
      learnData: [],
      // 党员学习情况分析检索条件
      learnSearchData: {},
      // 网格党员
      gridpartyData: [],
      // 网格党员检索条件
      gridpartySearchData: {}
    }
  },
  created() {
    this.getPartyCommitteeListFun()
    this.pushcrowdanalysisFun()
    this.partypaymentanalysisFun()
    this.learnanalysisFun()
    this.gridpartyanalysisFun()
    this.categoriesanalysisFun()
  },
  methods: {
  //  活动推送人群分析
    pushcrowdanalysisFun() {
      pushcrowdanalysis({
        partyCommitteeId: this.pushcrowdSearchData.partyCommitteeId,
        partyBranchId: this.pushcrowdSearchData.partyBranchId
      }).then(res => {
        this.pushcrowdData = res.data
      })
    },
    //  党员类别统计分析
    categoriesanalysisFun() {
      categoriesanalysis({
        partyCommitteeId: this.categoriesSearchData.partyCommitteeId,
        partyBranchId: this.categoriesSearchData.partyBranchId
      }).then(res => {
        this.categoriesData = res.data
      })
    },
    //  党费缴纳
    partypaymentanalysisFun() {
      partypaymentanalysis({
        partyCommitteeId: this.partypaymentSearchData.partyCommitteeId,
        partyBranchId: this.partypaymentSearchData.partyBranchId,
        time: this.partypaymentSearchData.time
      }).then(res => {
        this.partypaymentData = res.data
      })
    },
    //  党员学习情况分析
    learnanalysisFun() {
      learnanalysis({
        partyCommitteeId: this.learnSearchData.partyCommitteeId
      }).then(res => {
        this.learnData = res.data
      })
    },
    // 网格党员
    gridpartyanalysisFun() {
      gridpartyanalysis({
        partyCommitteeId: this.gridpartySearchData.partyCommitteeId
      }).then(res => {
        this.gridpartyData = res.data
      })
    },
    // 获取党委列表
    getPartyCommitteeListFun() {
      getPartyCommitteeList({
        name: '',
        jurisdictionId: '',
        secretary: '',
        phoneNumber: '',
        current: 1,
        size: 100
      }).then(res => {
        this.committees = res.data.records
      })
    },
    // 选择党委
    selectCommintteeC(id) {
      this.categoriesSearchData.partyBranchId = ''
      this.getPartyBranchListFun(id, 'C')
      this.categoriesanalysisFun()
    },
    selectCommintteeL(id) {
      this.learnanalysisFun()
    },
    selectCommintteeW(id) {
      this.pushcrowdSearchData.partyBranchId = ''
      this.getPartyBranchListFun(id, 'W')
      this.pushcrowdanalysisFun()
    },
    selectCommintteeG(id) {
      this.gridpartyanalysisFun()
    },
    selectCommintteeP(id) {
      this.partypaymentSearchData.partyBranchId = ''
      this.getPartyBranchListFun(id, 'P')
      this.partypaymentanalysisFun()
    },
    // 获取支部列表
    getPartyBranchListFun(id, type) {
      getPartyBranchList({
        partyCommitteeId: id || '',
        current: 1,
        size: 100
      }).then(res => {
        switch (type) {
          case 'C':
            this.branchsC = res.data.records
            break
          case 'W':
            this.branchsW = res.data.records
            break
          case 'P':
            this.branchsP = res.data.records
            break
        }
      })
    }
  }
}
</script>

<style scoped>
  .partyWrap{
    background: none;
    padding-top: 0;
    padding-bottom: 0;
  }
  .charge-item-wrap{
      background:rgba(255,255,255,1);
      margin-bottom: 15px;
      box-shadow:0px 3px 12px 1px rgba(25,25,25,0.16);
      border-radius:4px;
      text-align: left;
    position: relative;
  }
  .charge-item-title{
    border-bottom: 1px solid #dedede;
    height: 40px;
    line-height: 40px;
    padding-left: 20px;
    font-size: 15px;
    font-weight: bold;
    color: #606266;
  }
  .charge-item-body{
    padding:10px 20px 0;
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
</style>
