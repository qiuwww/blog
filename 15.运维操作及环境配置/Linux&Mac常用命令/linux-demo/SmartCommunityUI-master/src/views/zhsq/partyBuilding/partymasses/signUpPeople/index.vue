<template>
  <Modal v-model="show" :title="'报名人员列表'" :mask-closable="false" width="640" :key="'signUpPeople'">
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
      </div>
    <div slot="footer">
      <Button type="text" @click="closeModel">取消</Button>
    </div>
  </Modal>
</template>

<script>
import {
  partymassesPeo
} from '@/api/zhsq/partymasses/index'
export default {
  name: 'SignUpPeople',
  props: {
  //  弹窗标题
    partymassesId: {
      type: String,
      default: ''
    },
    //  弹窗显示条件
    value: {
      type: Boolean,
      default: false
    },
    //  弹窗显示条件
    modalShow: {
      type: Boolean,
      default: false
    }
  },
  data: function() {
    return {
      show: this.value,
      listLoading: true,
      // 当前页
      currentPage: 1,
      // 每页条数
      pageSize: 7,
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
          key: 'phoneNumber',
          title: '联系电话',
          align: 'center',
          tooltip: true,
          minWidth: 100
        },
        {
          key: 'createTime',
          title: '时间',
          align: 'center',
          tooltip: true,
          minWidth: 100
        }
      ]
    }
  },
  watch: {
    value(val) {
      this.show = val
    },
    show(val) {
      if (val) {
        this.getListData()
      } else {
        this.$emit('input', false)
      }
    }
  },
  methods: {
  //  获取表格数据
    async getListData() {
      this.listLoading = true
      const { data } = await partymassesPeo({
        partymassesId: this.partymassesId,
        data: {
          current: this.currentPage,
          size: this.pageSize
        }
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
      this.$emit('input', false)
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
    .page{
      margin-bottom: 0;
    }
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
