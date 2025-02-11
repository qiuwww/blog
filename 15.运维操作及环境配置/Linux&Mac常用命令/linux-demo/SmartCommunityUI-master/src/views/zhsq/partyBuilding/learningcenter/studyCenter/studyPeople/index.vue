<template>
  <div>
    <party-modal
      :title="'完成学习人员列表'"
      :is-show-confirm-btn="false"
      :modal-show="modalShow"
      :top="true"
      @close="closeModel"
    >
      <div class="formWrap">
        <div class="p16">
          <Row>
            <Table
              ref="table"
              :loading="listLoading"
              stripe
              :columns="columns"
              sortable="custom"
              :data="tableList"
            />
          </Row>
          <Row type="flex" justify="center" class="page">
            <Page
              :current="currentPage"
              :total="total"
              :page-size="pageSize"
              :page-size-opts="[10,20,50,100]"
              size="small"
              show-total
              show-elevator
              show-sizer
              :transfer="true"
              @on-change="currentChange"
              @on-page-size-change="changePageSize"
            />
          </Row>
        </div>
        <div class="text-right fomrFooter">
          <Button type="text" @click="closeModel">取消</Button>
        </div>
      </div>
    </party-modal>
  </div>
</template>

<script>
import {
  completelearningList
} from '@/api/zhsq/learningCenter/index'
import PartyModal from '@/components/partyModal/index'
export default {
  name: 'StudyPeople',
  components: {
    PartyModal
  },
  props: {
  //  弹窗标题
    id: {
      type: String,
      default: ''
    },
    //  弹窗显示条件
    modalShow: {
      type: Boolean,
      default: false
    }
  },
  data: function() {
    return {
      listLoading: true,
      // 当前页
      currentPage: 1,
      // 每页条数
      pageSize: 10,
      // 总条数
      total: 0,
      // 视图数据集合
      tableList: [],
      // 视图数据表头
      columns: [
        {
          key: 'userName',
          title: '姓名',
          align: 'center',
          tooltip: true,
          minWidth: 100
        },
        {
          key: 'userPhoneNumber',
          title: '联系电话',
          align: 'center',
          tooltip: true,
          minWidth: 100
        },
        {
          key: 'updateTime',
          title: '时间',
          align: 'center',
          tooltip: true,
          minWidth: 100
        }
      ]
    }
  },
  watch: {
    modalShow: function(newVaule, oldValue) {
      if (newVaule) {
        this.getListData()
      }
    }
  },
  methods: {
  //  获取表格数据
    async getListData() {
      this.listLoading = true
      const { data } = await completelearningList({
        id: this.id,
        current: this.currentPage,
        size: this.pageSize
      })
      this.tableList = data.records
      this.currentPage = parseInt(data.current)
      this.total = parseInt(data.total)
      this.listLoading = false
    },
    // 分页
    currentChange(page) {
      this.currentPage = page
      this.getListData()
    },
    // 关闭
    closeModel() {
      this.$emit('close')
    },
    // 改变每页显示数据的条数
    changePageSize(v) {
      this.pageSize = v
      this.getListData()
    }
  }
}
</script>

<style scoped lang="less">
  .p16{
    padding: 16px;
  }
  .formWrap{
    width: 600px;
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
</style>
