<template>
  <div class="partyWrap">
    <div class="searchWrap">
      <Form ref="searchForm" :model="searchForm" inline :label-width="110" on-submit="return false">
        <Button v-if="permitIds.includes('dangjian_affairs_pic_add')" type="primary" icon="md-add" @click="onAdd">新增</Button>
        <Form-item label="标题" :label-width="70">
          <Input v-model="searchForm.title" search enter-button placeholder="标题" @on-search="getsearchFormData" />
        </Form-item>
        <Form-item class="br" :label-width="40">
          <!--            <Button type="primary" icon="ios-search" @click="handleSearch">搜索</Button>-->
          <Button @click="resetSearch">重置查询</Button>
        </Form-item>
      </Form>
    </div>
    <div>
      <Row>
        <Table
          ref="table"
          :loading="listLoading"
          stripe
          :columns="columns"
          sortable="custom"
          :data="tableList"
        >
          <template slot="action" slot-scope="{ row, index }">
            <Tooltip content="查看详情" placement="top">
              <Button v-if="permitIds.includes('dangjian_affairs_pic_see')" class="btnPrimary" icon="md-eye" @click="showInfoFun(row, index)" />
            </Tooltip>
            <Tooltip content="修改" placement="top">
              <Button v-if="permitIds.includes('dangjian_affairs_pic_edit')" class="bianji" @click="editFun(row, index)" />
            </Tooltip>
            <Tooltip content="删除" placement="top">
              <Button v-if="permitIds.includes('dangjian_affairs_pic_delete')" class="btnError" icon="ios-trash" @click="deleteFun(row, index)" />
            </Tooltip>
          </template>
        </Table>
      </Row>
      <!--      <party-table-->
      <!--        :border="true"-->
      <!--        :table-list="tableList"-->
      <!--        :columns="columns"-->
      <!--        :show-sequence-data="true"-->
      <!--        @currentChange="currentChange"-->
      <!--      />-->
      <edit-rotate-pic
        :title="modelTitle"
        :type="modelType"
        :data="editData"
        v-model="modelStatus"
        @close="closeModel"
        @confirmClick="confirmClick"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {
  getPartyBannerList,
  getPartyBannerDelete
} from '@/api/zhsq/partyPublic/index'
import EditRotatePic from './editRotatePic/index'
export default {
  name: 'RotatePic',
  components: {
    EditRotatePic
  },
  data: function() {
    return {
      listLoading: true,
      // 查询参数对象
      searchForm: {},
      // 新增编辑窗口
      modelStatus: false,
      // 新增编辑窗口标题
      modelTitle: '',
      // 新增编辑窗口类型
      modelType: 'add',
      // 当前页
      currentPage: 1,
      // 编辑对象
      editData: {},
      // 视图数据集合
      tableList: [],
      // 视图数据表头
      columns: [
        {
          key: 'title',
          align: 'center',
          title: '标题'
        },
        {
          key: 'imgUrl',
          align: 'center',
          title: '图片',
          render: (h, parms) => {
            return h('div', { class: 'tableImg' },
              [
                h('el-image', {
                  props: {
                    src: parms.row.imgUrl,
                    width: 120,
                    height: 100,
                    fit: 'cover'
                  }
                })
              ]
            )
          }
        },
        {
          title: '操作',
          align: 'center',
          slot: 'action',
          width: 220
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['permitIds'])
  },
  created() {
    this.getListData()
  },
  methods: {
  //  获取表格数据
    async getListData() {
      const { data } = await getPartyBannerList({
        title: this.searchForm.title
      })
      this.tableList = data
      this.listLoading = false
    },
    // 重置查询
    resetSearch() {
      this.searchForm = {}
      this.getListData()
    },
    // 新增
    onAdd() {
      this.modelType = 'add'
      this.modelTitle = '轮播图片——新增'
      this.modelStatus = true
    },
    // 编辑
    editFun(row) {
      this.modelType = 'edit'
      this.editData = row
      this.modelTitle = '轮播图片——编辑'
      this.modelStatus = true
    },
    // 查看详情
    showInfoFun(row) {
      this.modelType = 'info'
      this.editData = row
      this.modelTitle = '轮播图片——详情'
      this.modelStatus = true
    },
    // 删除
    deleteFun(row) {
      this.$Modal.confirm({
        title: '确认删除',
        content: '您确认要删除所点击选的轮播图片?',
        loading: true,
        onOk: async() => {
          await getPartyBannerDelete(row.id)
          this.$Modal.remove()
          this.$Message.success('删除成功')
          this.getListData()
        },
        onCancel: () => {
          this.$Message.info('取消了当前的操作行为！')
        }
      })
    },
    // 搜索查询
    getsearchFormData() {
      this.getListData()
    },
    // 弹窗关闭时间
    closeModel() {
      this.modelStatus = false
    },
    // 弹窗确认事件
    confirmClick() {
      this.modelStatus = false
      this.getListData()
    },
    // 分页
    currentChange(page) {
      this.currentPage = page
      this.getListData()
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
  /deep/ .ivu-form-item-content{
    margin-right:  0 !important;
  }
    /deep/.cell.el-tooltip{
        width: 150px !important;
        margin: 0 auto;
    }
    /deep/.ivu-table-cell{
      height: 120px !important;
      line-height: 80px;
      .tableImg{
        width: 120px;
        height: 100px;
        margin: 0 auto;
      }
    }
    .ivu-table-cell{
       height: 120px !important;
     }
    /deep/.el-input__inner{
      width: 440px
    }
</style>
