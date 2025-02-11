<template>
  <el-row class="app-warp">
    <el-col>
      <el-row class="rowone">
        <!--        <span>-->
        <!--          <el-button-->
        <!--            class="m10 addbtn"-->
        <!--            @click="handleAdd"-->
        <!--          >+新增</el-button>-->
        <!--        </span>-->
        <!--        <span class="m10">-->
        <!--          <span class="label"> 所属网格:</span>-->
        <!--          <GridPark :is-multiple="true" @grid="handleGridId" />-->
        <!--        </span>-->
        <!--        <span>-->
        <!--          <Search-->
        <!--            :placeholder="'请输入停车场名称或地址'"-->
        <!--            @update="handleUpdate"-->
        <!--          />-->
        <!--        </span>-->
        <Form ref="searchForm" :model="searchForm" inline :label-width="110" on-submit="return false">
          <Button type="primary" icon="md-add" @click="handleAdd">新增</Button>
          <Form-item label="所属街道">
            <el-select v-model="searchForm.streetId" placeholder="所属街道" @change="selectStreet">
              <el-option v-for="(item, i)  in streets" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </Form-item>
          <Form-item label="所属社区">
            <el-select v-model="searchForm.communityId" placeholder="请选择社区" @change="communityChange">
              <el-option v-for="(item, i)  in areas" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </Form-item>
          <Form-item label="所属网格" :label-width="110">
            <el-select v-model="searchForm.gridId" placeholder="请选择社区" @change="handleUpdate">
              <el-option v-for="(item, i)  in gridIds" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </Form-item>
          <Form-item label="" :label-width="40">
            <Input v-model="searchForm.keywords" search enter-button placeholder="请输入停车场名称或地址" @on-search="handleUpdate" />
          </Form-item>
          <Form-item class="br" :label-width="40">
            <!--            <Button type="primary" icon="ios-search" @click="handleSearch">搜索</Button>-->
            <Button @click="resetSearch">重置查询</Button>
          </Form-item>
        </Form>
      </el-row>
      <div>
        <Row>
          <Table
            ref="table"
            :loading="listLoading"
            stripe
            :columns="columns"
            sortable="custom"
            :data="tableData"
          >
            <template slot="action" slot-scope="scope">
              <Tooltip content="查看详情" placement="top">
                <Button class="btnPrimary" icon="md-eye" @click="handleDetail(scope.row)" />
              </Tooltip>
              <Tooltip content="编辑" placement="top">
                <Button class="bianji" @click="handleEditPost(scope)" />
              </Tooltip>
              <Tooltip content="删除" placement="top">
                <Button class="btnError" icon="ios-trash" @click="deleteFun(scope.row)" />
              </Tooltip>


            </template>
          </Table>
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
    </el-col>
    <!--

     -->

    <Dialog
      :dialog-visible="dialogVisible"
      :has-foot="hasFoot"
      :title="title"
      class="parkDialog"
      @close="handleClose"
      @confirm="handleConfirm"
    >
      <el-row type="flex" justify="center">
        <el-col :span="20">
          <el-form
            ref="form"
            :model="form"
            :rules="rules"
            class="formWrap"
            label-width="100px"
            :disabled="postDetail"
          >
            <el-form-item prop="parkingName" label="停车场名称">
              <el-input v-model="form.parkingName" />
            </el-form-item>
            <el-form-item prop="address" label="停车场地址">
              <el-input v-model="form.address" />
            </el-form-item>
            <el-form-item label="所属街道" prop="streetId">
              <el-select v-model="form.streetId" placeholder="所属街道" @change="selectStreetLayer">
                <el-option v-for="(item, i)  in streets" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </el-form-item>
            <el-form-item label="所属社区" prop="communityId">
              <el-select v-model="form.communityId" placeholder="请选择社区" @change="communityChangeLayer">
                <el-option v-for="(item, i)  in areas_add" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </el-form-item>
            <el-form-item label="所属网格" prop="gridId">
              <el-select v-model="form.gridId" placeholder="请选择社区" @change="handleFormGridId">
                <el-option v-for="(item, i)  in gridIds_add" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </el-form-item>
            <el-form-item prop="position" label="设备标注">
              <el-input
                v-model="form.position"
                type="text"
                placeholder="设备标注"
                icon="md-flag"
                :maxlength="255"
                @focus="checkMap"
                @click="checkMap"
              />
            </el-form-item>
            <el-form-item prop="remark" label="描述">
              <el-input v-model="form.remark" type="textarea" :rows="5" />
            </el-form-item>
          </el-form>
        </el-col>
        <plot
          v-model="ShowMap"
          modal-title="选择坐标点"
          div-id="updateBasicSocialOrganizationList"
          :obj-data="locationArr"
          icon-path="/img/archives/shanghu.png"
          :select-type="selectType"
          @resultPoint="getLocation"
        />
      </el-row>
    </Dialog>
  </el-row>
</template>

<script>
import plot from '@/views/gismap/components/plot'
import Dialog from '@/components/DialogUI'
import {
  parkingList,
  parkingAdd,
  parkingEdit,
  parkingDelete
} from '@/api/park'
import { getLoadCommunityDeptByStreet, getLoadStreetDept } from '@/api/zhsq/partyManage'
import { queryAllList } from '@/api/zhsq/basicGrids/basicGrids'
import {formartDate} from '@/api/tools/tool'
export default {
  name: 'ParkingLot',
  components: {
    Dialog,
    plot
  },
  data() {
    return {
      tableData: [],
      listLoading: true,
      // 所有街道
      streets: [],
      // 所有社区
      areas: [],
      areas_add: [],
      // 所有网格
      gridIds: [],
      gridIds_add: [],
      searchForm: {
        keywords: '',
        gridId: ''
      },
      rules: {
        parkingName: [
          { required: true, message: '请输入停车场名称', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入停车场地址', trigger: 'blur' }
        ],
        position: [
          { required: true, message: '请标注', trigger: 'blur' }
        ],
        streetId: [
          { required: true, message: '请选择街道', trigger: 'change' }
        ],
        communityId: [
          { required: true, message: '请选择社区', trigger: 'change' }
        ],
        gridId: [
          { required: true, message: '请选择网格', trigger: 'change' }
        ]
      },
      deptList: [],
      hasFoot: true,
      title: '',
      pageTotal: 0,
      addPost: false,
      postDetail: false,
      editPost: false,
      propertyList: [],
      locationArr: [],
      ShowMap: false,
      selectType: 'Polygon',
      propertyOrGrid: 0,
      form: {
        parkingName: '',
        remark: '',
        region: null,
        address: '',
        gridId: '',
        streetId: '',
        communityId: '',
        position: '',
        gridName: ''
      },
      editIndex: null,
      gridId: '',
      gridIdToGridId: '',
      // 当前页
      currentPage: 1,
      // 每页条数
      pageSize: 10,
      // 总条数
      total: 0,
      columns: [
        {
          key: 'parkingName',
          title: '停车场名称',
          align: 'center',
          tooltip: true,
          minWidth: 100
        },
        {
          key: 'address',
          title: '停车场地址',
          align: 'center',
          tooltip: true,
          minWidth: 100
        },
        {
          key: 'streetName',
          title: '所属街道',
          align: 'center',
          tooltip: true,
          minWidth: 100
        },
        {
          key: 'communityName',
          title: '所属社区',
          align: 'center',
          tooltip: true,
          minWidth: 100
        },
        {
          key: 'gridName',
          title: '所属网格',
          align: 'center',
          tooltip: true,
          minWidth: 100
        },
        {
          key: 'region',
          title: '位置标注',
          align: 'center',
          tooltip: true,
          minWidth: 100,
          render: (h, parms) => {
            let typeName = '已标注'
            let calssName = 'ybz'
            if (!parms.row.region) {
              typeName = '未标注'
              calssName = 'wbz'
            }
            return h(
              'span', { class: calssName },
              [typeName]
            )
          }
        },
        {
          key: 'createTime',
          title: '创建时间',
          align: 'center',
          tooltip: true,
          minWidth: 100,
          render: (h, parms) => {
            return h(
              'span',
              [formartDate(parms.row.createTime, 'YYYY-MM-DD HH:mm:ss')]
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
  mounted() {
    this.getLoadStreetDeptFun();
  },
  computed: {
    dialogVisible() {
      return this.addPost || this.postDetail || this.editPost
    }
  },
  watch: {
    gridIdToGridId(n, o) {
      this.handleGetPropertyId()
      this.from.propertyId = ''
    }
  },
  created() {
    this.handleGetData()

  },
  methods: {
    getLocation(obj, type) {
      this.selectType = type
      this.form.position = JSON.stringify(obj.flatCoordinates)
      this.form.region = obj.flatCoordinates
    },
    checkMap() {
      if (this.form.position) {
        this.locationArr = JSON.parse(
          this.form.position
        )
      }
      this.ShowMap = true
    },
    async handleGetPropertyId() {
    },
    handleGridId(id, name) {
      this.currentPage = 1
      this.searchForm.gridId = id
      this.handleGetData()
    },
    handleFormGridId(id) {
      this.form.gridId = id
      this.gridIds_add.forEach(p1 => {
        if (p1.id === id) {
          this.form.gridName = p1.name
        }
      })
    },
    handleUpdate(val) {
      this.currentPage = 1
      this.handleGetData()
    },
    async handleGetData() {
      this.listLoading = true
      const { data } = await parkingList({
        size: this.pageSize,
        current: this.currentPage,
        keywords: this.searchForm.keywords,
        streetId: this.searchForm.streetId,
        communityId: this.searchForm.communityId,
        gridId: this.searchForm.gridId !== 0 ? this.searchForm.gridId : ''
      })
      this.tableData = data.records
      this.currentPage = parseInt(data.current)
      this.total = parseInt(data.total)
      this.listLoading = false
      this.getLoadStreetDeptFun();
    },
    handleAdd() {
      this.title = '新增'
      this.selectType = 'Polygon'
      this.form = {
        parkingName: '',
        remark: '',
        region: null,
        address: '',
        gridId: '',
        position: '',
        gridName: ''
      }
      this.addPost = true
    },
    handleDetail(row) {
      this.title = '查看详情'
      this.hasFoot = false
      this.postDetail = true
      this.form = row
      this.form.position = JSON.stringify(row.region)
      this.form.streetId = this.form.streetId - 0
      this.form.communityId = this.form.communityId - 0
      this.selectStreetLayer(this.form.streetId)
      this.communityChangeLayer(this.form.communityId)
    },
    handleClose() {
      this.addPost = false
      this.postDetail = false
      this.editPost = false
      this.hasFoot = true
      this.searchForm = {}
      this.handleUpdate()
      this.form = {
        parkingName: '',
        remark: '',
        region: null,
        address: '',
        gridId: '',
        gridName: ''
      }
    },
    addPostM() {
      this.$refs['form'].validate(async v => {
        if (v) {
          const O = await parkingAdd({
            ...this.form
          })
          if (O && O.code == 200) {
            this.$notify({
              title: O.msg,
              type: 'success'
            })
          } else {
            this.$notify({
              title: O.msg,
              type: 'fail'
            })
          }
          this.handleClose()
        }
      })
    },
    editPostM() {
      this.$refs['form'].validate(async v => {
        if (v) {
          const O = await parkingEdit({
            ...this.form
          })
          if (O && O.code == 200) {
            this.$notify({
              title: O.msg,
              type: 'success'
            })
          } else {
            this.$notify({
              title: O.msg,
              type: 'fail'
            })
          }
          this.handleClose()
        }
      })
    },
    handleConfirm() {
      this.addPost ? this.addPostM() : this.editPostM()
    },
    async handleEditPost(scope) {
      this.title = '编辑'
      this.selectStreetLayer(scope.row.streetId)
      this.communityChangeLayer(scope.row.communityId)
      this.form = { ...scope.row }
      this.form.position = JSON.stringify(scope.row.region)
      this.form.streetId = this.form.streetId - 0
      this.form.communityId = this.form.communityId - 0
      this.editPost = true
      this.addPost = false
      this.editIndex = scope.$index
    },
    // 重置查询
    resetSearch() {
      this.searchForm = {}
      this.currentPage = 1
      this.handleGetData()
    },
    // 分页
    currentChange(page) {
      this.currentPage = page
      this.handleGetData()
    },
    // 改变每页显示数据的条数
    changePageSize(v) {
      this.pageSize = v
      this.handleGetData()
    },
    //  获取所有街道
    getLoadStreetDeptFun() {
      let _this = this;
      getLoadStreetDept({}).then(res => {
        _this.streets = res.data
      })
    },
    //  选择街道
    selectStreet(id) {
      this.searchForm.communityId = ''
      this.getLoadCommunityDeptByStreetFun(id)
    },
    selectStreetLayer(id) {
      this.getLoadCommunityDeptByStreetFun(id, 'layer')
    },
    //  根据街道ID查询辖区
    getLoadCommunityDeptByStreetFun(id, type) {
      this.streets.forEach(p1 => {
        if (p1.id === id) {
          this.form.streetName = p1.name
        }
      })
      getLoadCommunityDeptByStreet({ streetId: id }).then(res => {
        if (type) {
          this.areas_add = res.data
        } else {
          this.areas = res.data
        }
      })
    },
    // 社区改变
    communityChange(id) {
      if (id) {
        this.searchForm.gridId = ''
        queryAllList({ communityId: id }).then(res => {
          if (res.data.length > 0) {
            this.gridIds = res.data
          } else {
            this.gridIds = []
            this.searchForm.gridId = ''
          }
        })
      } else {
        this.gridIds = []
        this.searchForm.gridId = ''
      }
      this.handleUpdate()
    },
    communityChangeLayer(id) {
      if (id) {
        this.areas_add.forEach(p1 => {
          if (p1.id === id) {
            this.form.communityName = p1.name
          }
        })
        queryAllList({ communityId: id }).then(res => {
          if (res.data.length > 0) {
            this.gridIds_add = res.data
          } else {
            this.gridIds_add = []
          }
        })
      } else {
        this.gridIds = []
      }
    },
    deleteFun(row, status) {
      this.$confirm(`请确认删除`, {
        type: 'warning'
      })
        .then(async _ => {
          const O = await parkingDelete(row.id)
          if (O && O.code == 200) {
            this.$notify({
              title: O.msg,
              type: 'success'
            })
          } else {
            this.$notify({
              title: O.msg,
              type: 'fail'
            })
          }
          this.handleClose()
        })
        .catch(e => {
        })
    }
  }
}
</script>

<style scoped>
  .label {
    width: 80px;
  }
</style>
<style scoped lang="less">
  .color-success{
    color: #11B3B9;
  }
  .color-error{
    color: #F3538A;
  }
  /deep/.ybz{
    display: inline-block;
    color: rgb(107, 216, 220);
    background: rgba(107, 216, 220, 0.1);
    border-radius: 100px;
    border: 1px solid rgba(107, 216, 220);
    padding: 0 8px;
  }
  /deep/.wbz{
    display: inline-block;
    color: rgba(255, 56, 98);
    background: rgba(255, 56, 98, 0.1);
    border-radius: 100px;
    border: 1px solid rgba(255, 56, 98);
    padding: 0 8px;
  }
  /deep/ .ivu-form-item-content{
    margin-right:  0 !important;
  }
  .formWrap{
    /deep/.el-input{
      width: 100% !important;
    }
    /deep/.el-select{
      width: 100% !important;
    }
  }
  .start {
    font-weight: bold;
    color: chartreuse;
  }
  .end {
    font-weight: bold;
    color: hotpink;
  }
  .addbtn {
    width: 88px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    background: #3083f2;
    border-radius: 16px;
  }
  .rowone {
    display: flex;
    margin-top: 24px;
    margin-left: 32px;
    margin-bottom: 10px;
  }
  .tablebox {
    margin: 20px 40px 0 40px;
    border-top: 2px solid #e8e8ea;
  }
  .numsize {
    margin-top: 24px;
    margin-bottom: 32px;
  }
  .parkBtn{
    margin: 0 5px;
    border-radius: 50%;
    border: 1px solid #dcdfe6;
  }
  .parkDialog {
    .girdSelect{
      display: block;
    }
    /deep/.el-dialog__headerbtn{
      top: 13px;
      right: 16px;
    }
    /deep/.el-dialog__header{
      padding: 16px !important;
    }
    /deep/.el-dialog__title{
      line-height: 1;
      font-size: 14px;
      color: #A0A8B5;
      font-family: regular, 'Microsoft YaHei';
    }
    /deep/.el-dialog__footer{
      border-radius: 0 0 12px 12px;
      padding-left: 30px;
      padding-right: 30px;
      padding-top: 14px;
      padding-bottom: 14px;
    }
    /deep/.el-button + .el-button{
      margin-left: 20px;
    }
    /deep/.dialog-footer{
      justify-content: flex-end;
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
  /deep/.rowone{
    margin-left: 40px;
  }
  /deep/.ivu-table-wrapper{
    margin:  0 40px;
  }
</style>
