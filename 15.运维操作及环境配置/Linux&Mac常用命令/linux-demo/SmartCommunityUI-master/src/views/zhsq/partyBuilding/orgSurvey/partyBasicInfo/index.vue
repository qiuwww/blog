<template>
  <div class="partyWrap">
    <div class="baseInfoItem" style="width: 1300px">
      <el-row>
        <el-col :span="6">
          <div class="baseItemInfo mr40">
            <span>党委名称：</span>
            <el-select v-model="searchFormData.partyCommitteeId" placeholder="所属街道" @change="selectComminttee">
              <el-option v-for="(item, i)  in committees" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="baseItemInfo mr40">
            <span>支部名称：</span>
            <el-select v-model="searchFormData.partBranchId" placeholder="所属街道" >
              <el-option v-for="(item, i)  in branchs" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="baseItemInfo">
            <el-button type="primary" size="small" @click="searchFun">查询</el-button>
            <el-button type="danger" style="margin-left: 40px" size="small" @click="resetSearch">清空</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="baseInfoItem">
      <el-divider content-position="left" class="baseInfoItemTitle">基本信息</el-divider>
      <div>
        <el-row :gutter="15">
          <el-col :span="8">
            <div class="baseItemInfo">
              <span>地址：</span>
              <span>{{ formData.address }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col :span="8">
            <div class="baseItemInfo">
              <span>书记名称：</span>
              <span>{{ formData.secretary }}</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="baseItemInfo">
              <span>性别：</span>
              <span v-if="formData.gender">{{ formData.gender ===1 ? '男' : '女' }}</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="baseItemInfo">
              <span>联系电话：</span>
              <span>{{ formData.phoneNumber }}</span>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="baseInfoItem">
      <el-divider content-position="left" class="baseInfoItemTitle">党员概况</el-divider>
      <el-row :gutter="15">
        <el-col :span="8">
          <div class="baseItemInfo">
            <span>党员人数：</span>
            <span>{{ formData.totalPartyMember }}</span>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="baseItemInfo">
            <span>男党人数：</span>
            <span>{{ formData.totalManPartyMember }}</span>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="baseItemInfo">
            <span>女党人数：</span>
            <span>{{ formData.totalWomanPartyMember }}</span>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="15">
        <el-col :span="8">
          <div class="baseItemInfo">
            <span>35岁以下：</span>
            <span>{{ formData.yearunder35Total }}</span>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="baseItemInfo">
            <span>36到45岁：</span>
            <span>{{ formData.year35To45Total }}</span>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="baseItemInfo">
            <span>46到54岁：</span>
            <span>{{ formData.year46To54Total }}</span>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="15">
        <el-col :span="8">
          <div class="baseItemInfo">
            <span>55到59岁：</span>
            <span>{{ formData.year55To59Total }}</span>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="baseItemInfo">
            <span>60岁以上：</span>
            <span>{{ formData.yearover60Total }}</span>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="baseInfoItem">
      <pieChart :rows="chartData" :value="chartValue" :total="formData.totalPartyMember" />
    </div>
  </div>
</template>

<script>
import {
  baseInfomation,
  getPartyCommitteeList,
  getPartyBranchList
} from '@/api/zhsq/partyManage/index'
import pieChart from '../../commpoents/partyToPieChartItem'
export default {
  name: 'PartyBasicInfo',
  components: {
    pieChart
  },
  data: function() {
    return {
      //  党委数据list
      committees: [],
      //  支部数据list
      branchs: [],
      formData: {},
      searchFormData: {
        partyCommitteeId: '',
        partBranchId: ''
      },
      chartValue: '',
      chartData: []
    }
  },
  created() {
    this.getPartyCommitteeListFun()
  },
  methods: {
    searchFun() {
      this.getData()
    },
    getData() {
      // 查询基本信息
      baseInfomation({
        partyCommitteeId: this.searchFormData.partyCommitteeId,
        partBranchId: this.searchFormData.partBranchId
      }).then(res => {
        this.formData = res.data
        this.chartData = [
          {
            '名': '35岁以下',
            '值': res.data.yearunder35Total
          }, {
            '名': '36岁到45岁',
            '值': res.data.year35To45Total
          }, {
            '名': '46岁到54岁',
            '值': res.data.year46To54Total
          }, {
            '名': '55岁到59岁',
            '值': res.data.year55To59Total
          }, {
            '名': '60岁以上',
            '值': res.data.yearover60Total
          }
        ]
      })
    },
    // 获取党委列表
    getPartyCommitteeListFun() {
      const self = this
      getPartyCommitteeList({
        name: '',
        jurisdictionId: '',
        secretary: '',
        phoneNumber: '',
        current: 1,
        size: 100
      }).then(res => {
        this.committees = res.data.records
        if (self.committees.length > 0) {
          self.searchFormData.partyCommitteeId = self.committees[0].id
          self.getPartyBranchListFun(self.committees[0].id)
        }
      })
    },
    // 选择党委
    selectComminttee(id) {
      this.searchFormData.partBranchId = ''
      this.getPartyBranchListFun(id)
    },
    // 获取支部列表
    getPartyBranchListFun(id) {
      const self = this
      getPartyBranchList({
        partyCommitteeId: id || '',
        current: 1,
        size: 100
      }).then(res => {
        this.branchs = res.data.records
        if (self.branchs.length > 0) {
          self.searchFormData.partBranchId = self.branchs[0].id
          self.getData()
        }
      })
    },
    // 重置查询
    resetSearch() {
      this.searchFormData = {}
      this.currentPage = 1
      this.getListData()
    }
  }
}
</script>

<style scoped lang="less">
  .partyWrap{
    background: #ffffff;
    border-radius: 3px;
    padding: 20px;
  }
  .mr40{
    margin-right: 40px;
  }
  .baseInfoItem {
    margin-bottom: 40px;
    /deep/ .el-divider__text{
      font-size: 18px;
      color: #404040;
      font-weight: bold;
      padding-left: 0 !important;
      margin-bottom: 10px;
    }
    /deep/.el-divider__text.is-left{
      left: 0;
    }
    .baseItemInfo {
      margin-top: 20px;
      span:first-child{
        font-size: 14px;
        width: 80px;
        color: #404040;
        text-align: left;
        display: inline-block;
        margin-right: 5px;
      }
      span:last-child{
        color: #666666;
        font-size: 14px;
      }
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
  /deep/.el-select{
    width: 200px;
  }
  /deep/.el-input--medium .el-input__inner{
    height: 32px;
    line-height: 32px;
  }
  /deep/.el-select > .el-input {
    width: 200px;
  }
</style>
