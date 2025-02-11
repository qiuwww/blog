<template>
  <el-row class="app-warp">
    <el-col>
      <el-row class="rowone">
        <Form ref="searchForm" :model="searchForm" inline on-submit="return false" :label-width="110">
          <Button type="primary" icon="md-add" @click="handleAdd">新增</Button>
          <Form-item label="所属停车场" >
            <el-select v-model="searchForm.parkingId" placeholder="所属停车场" style="width: 200px"  @change="handleUpdate">
              <el-option v-for="(item, i)  in parkingList" :key="item.parkingId" :value="item.parkingId">{{ item.parkingName }}</el-option>
            </el-select>
          </Form-item>
          <Form-item :label-width="40">
            <Input v-model="searchForm.keywords" search enter-button placeholder="请输入设备名称或编号" @on-search="handleUpdate" />
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
                <Button  class="bianji" @click="handleEditPost(scope)" />
              </Tooltip>
              <Tooltip content="删除" placement="top">
                <Button class="btnError" icon="ios-trash" @click="deleteFun(scope)" />
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
            <el-form-item prop="deviceId" label="设备编号">
              <Input v-model="form.deviceId" />
            </el-form-item>
            <el-form-item prop="deviceName" label="设备名称">
              <Input v-model="form.deviceName" />
            </el-form-item>
            <el-form-item prop="isEnabled" label="状态">
              <el-radio-group v-model="form.isEnabled">
                <el-radio :label="true">启用</el-radio>
                <el-radio :label="false">禁用</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item prop="parkingId" label="所属停车场">
              <el-select
                v-model="form.parkingId"
                clearable
                size="small"
                value-key="label"
              >
                <el-option
                  v-for="(item, i)  in parkingList"
                  :key="item.parkingId"
                  :label="item.parkingName"
                  :value="item.parkingId"
                />
              </el-select>
            </el-form-item>
            <el-form-item prop="position" label="设备标注">
              <Input
                v-model="form.position"
                placeholder="设备标注"
                icon="md-flag"
                :maxlength="255"
                @on-focus="checkMap"
                @on-click="checkMap"
              />
            </el-form-item>
            <el-form-item prop="remark" label="描述">
              <Input v-model="form.remark" type="textarea" :rows="5" />
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
  loadAllBySelectFromGrid
} from '@/api/wulian'
import {
  parkingDeviceDelete,
  parkingDeviceList,
  parkingDeviceEdit,
  parkingDeviceAdd,
  parkingAll
} from '@/api/park'
import {formartDate} from '@/api/tools/tool'
export default {
  name: 'ParkingShebei',
  components: {
    Dialog,
    plot
  },
  data() {
    return {
      listLoading: true,
      tableData: [],
      searchForm: {
        keywords: '',
        parkingId: ''
      },
      rules: {
        deviceName: [
          { required: true, message: '请输入设备名称', trigger: 'blur' }
        ],
        deviceId: [
          { required: true, message: '请输入设备编号', trigger: 'blur' }
        ],
        isEnabled: [
          { required: true, message: '请选择设备状态', trigger: 'blur' }
        ],
        position: [
          { required: true, message: '请标注', trigger: 'blur' }
        ],
        parkingId: [
          { required: true, message: '请选择所属停车场', trigger: 'change' }
        ]
      },
      parkingList: [],
      hasFoot: true,
      pageTotal: 0,
      addPost: false,
      postDetail: false,
      editPost: false,
      propertyList: [],
      locationArr: [],
      title: '',
      ShowMap: false,
      selectType: 'Point',
      propertyOrGrid: 0,
      form: {
        deviceName: '',
        deviceId: '',
        latitude: '',
        longitude: '',
        remark: '',
        isEnabled: '',
        position: '',
        parkingId: ''
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
          key: 'deviceId',
          title: '设备编号',
          align: 'center',
          tooltip: true,
          minWidth: 100
        },
        {
          key: 'deviceName',
          title: '车位名称',
          align: 'center',
          tooltip: true,
          minWidth: 100
        },
        {
          key: 'parkingStatus',
          title: '设备状态',
          align: 'center',
          tooltip: true,
          minWidth: 100,
          render: (h, parms) => {
            let typeName = '占用'
            let calssName = 'color-zhanyong'
            if (parms.row.parkingStatus !== 1) {
              typeName = '空闲'
              calssName = 'color-kongxian'
            }
            return h(
              'span', { class: calssName },
              [typeName]
            )
          }
        },
        {
          key: 'isEnabled',
          title: '状态',
          align: 'center',
          tooltip: true,
          minWidth: 100,
          render: (h, parms) => {
            let typeName = '已启用'
            let calssName = 'spanSuccess'
            if (!parms.row.isEnabled) {
              typeName = '已禁用'
              calssName = 'spanError'
            }
            return h(
              'span', { class: calssName },
              [typeName]
            )
          }
        },
        {
          key: 'parkingName',
          title: '所属停车场',
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
            if (parms.row.longitude == '') {
              typeName = 'wbz'
              calssName = 'color-error'
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

  computed: {
    dialogVisible() {
      return this.addPost || this.postDetail || this.editPost
    }
  },
  watch: {
    gridIdToGridId(n, o) {
      this.handleGetPropertyId()
      this.from.propertyId = ''
    },
    form(val) {
    }
  },
  created() {
    this.getParkAll()
    this.handleGetData()
  },
  methods: {
    async getParkAll() {
      const { data } = await parkingAll()
      this.parkingList = data
    },
    getLocation(obj, type) {
      this.selectType = type
      this.form.position = JSON.stringify(obj.flatCoordinates)
      this.form.longitude = obj.flatCoordinates[0]
      this.form.latitude = obj.flatCoordinates[1]
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
      const { data } = await loadAllBySelectFromGrid({
        gridId: this.gridId
      })
      this.propertyList = data
    },
    handleUpdate() {
      this.currentPage = 1
      this.handleGetData()
    },
    async handleGetData() {
      this.listLoading = true
      const { data } = await parkingDeviceList({
        size: this.pageSize,
        current: this.currentPage,
        keywords: this.searchForm.keywords,
        parkingId: this.searchForm.parkingId
      })
      this.tableData = data.records
      this.currentPage = parseInt(data.current)
      this.total = parseInt(data.total)
      this.listLoading = false
    },
    handleAdd() {
      this.title = '新增'
      this.selectType = 'Point'
      this.form = {
        deviceName: '',
        deviceId: '',
        latitude: '',
        longitude: '',
        remark: '',
        isEnabled: '',
        position: '',
        parkingId: ''
      }
      this.addPost = true
    },
    handleDetail(row) {
      this.title = '详情'
      this.form = row
      this.hasFoot = false
      this.postDetail = true
    },
    handleClose() {
      this.addPost = false
      this.postDetail = false
      this.editPost = false
      this.hasFoot = true
      this.searchForm = {}
      this.handleUpdate()
      this.form = {
        deviceName: '',
        deviceId: '',
        latitude: '',
        longitude: '',
        remark: '',
        isEnabled: '',
        parkingId: ''
      }
    },
    addPostM() {
      this.$refs['form'].validate(async v => {
        if (v) {
          const O = await parkingDeviceAdd({
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
          const O = await parkingDeviceEdit({
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
      this.form = { ...scope.row }
      this.title = '编辑'
      this.form.position = JSON.stringify([scope.row.longitude, scope.row.latitude])
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
    deleteFun(scope) {
      this.$confirm(`请确认删除`, {
        type: 'warning'
      })
        .then(async _ => {
          const O = await parkingDeviceDelete(scope.row.id)
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
  /deep/.spanSuccess{
    color: #3083F2;
  }
  /deep/.spanError{
    color: #ff3862;
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
  /deep/.color-zhanyong{
    color: #F3538A;
  }
  /deep/.color-kongxian{
    color: #2CA14D;
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
  /deep/.ivu-icon-ios-arrow-down:before{
    content: "";
    box-sizing: inherit;
  }
  /deep/.el-select .el-input .el-select__caret.is-reverse{
    transform: rotateZ(180deg);
  }
  /deep/.el-input--medium .el-input__inner{
    height: 32px;
    line-height: 32px;
  }
  /deep/.el-radio__inner::after{
    width: 6px;
    height: 6px;
    border-radius: 100%;
    background-color: #1890ff;
  }
  /deep/.el-radio__input.is-checked .el-radio__inner{
    background-color: #ffffff;
  }
  /deep/.rowone{
    margin-left: 40px;
  }
  /deep/.ivu-table-wrapper{
    margin:  0 40px;
  }
</style>
