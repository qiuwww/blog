<style lang="less">
  .pictureList{
    .ivu-form .ivu-form-item-label {
      text-align: left;
      padding: 0px 0px 0px 0;
    }
  }
  .ivu-form-item-content>.ivu-btn{
    margin-right: 10px !important;
  }
</style>

<template>
  <div class="app-container">
    <Card>
      <Row v-show="openSearch" @keydown.enter.native="handleSearch">
        <Form ref="searchForm" :model="searchForm" inline :label-width="70">
          <Form-item label="文件名" >
            <Input  type="text"  v-model="searchForm.filename" placeholder="请输入" clearable style="width: 200px" />
          </Form-item>
          <Form-item label="创建时间">
            <DatePicker v-model="selectDate" type="daterange" format="yyyy-MM-dd" clearable @on-change="selectDateRange"
                        placeholder="选择起始时间" style="width: 200px"></DatePicker>
          </Form-item>
          <Form-item style="margin-left:-35px" class="br">
            <Button @click="handleSearch" type="primary" icon="ios-search">搜索</Button>
            <Button @click="handleReset">重置</Button>

          </Form-item>
        </Form>
      </Row>
      <Row class="operation">
        <Button @click="deploy" type="primary" icon="md-cloud-upload">上传</Button>
        <Dropdown @on-click="handleDropdown">
          <Button>
            更多操作
            <Icon type="md-arrow-dropdown"/>
          </Button>
          <DropdownMenu slot="list">
            <DropdownItem name="refresh"><Icon type="md-sync" />刷新</DropdownItem>
            <DropdownItem name="removeAll"> <Icon type="md-trash"/>批量删除</DropdownItem>
            <DropdownItem name="export"> <Icon type="md-arrow-down" />导出本页数据</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Button type="dashed" @click="openSearch=!openSearch">{{openSearch ? '关闭搜索' : '开启搜索'}}</Button>
        <Button type="dashed" @click="openTip=!openTip">{{openTip ? '关闭提示' : '开启提示'}}</Button>
        <div style="float: right;position: absolute;right: 10px;">
          <Poptip transfer trigger="click" placement="bottom-end" title="动态列">
            <Button icon="md-list"></Button>
            <div slot="content" style="position:relative;min-height:5vh">
              <Checkbox-group v-model="colOptions" @on-change="checkboxChange">
                <checkbox v-for="(item,i) in colSelect" :label="item" :key="item" ></checkbox>
              </Checkbox-group>
            </div>
          </Poptip>
        </div>
      </Row>
      <Row v-show="openTip">
        <Alert show-icon>
          已选择
          <span class="select-count">{{selectCount}}</span> 项
          <a class="select-clear" @click="clearSelectAll">清空</a>
          <span style="float: right;">点击右上角按钮配置动态列↑</span>
        </Alert>
      </Row>
      <Row>
        <Table :loading="loading" border :columns="columns" sortable="custom" :data="data" @on-sort-change="changeSort" @on-selection-change="showSelect" ref="table">
          <template slot-scope="{ row, index }" slot="action">
            <Button type="primary" @click="handleLook(row, index2)" size="small"><Icon type="ios-eye-outline"/>查看</Button>
            <Dropdown :transfer=true>
              <Button size="small">
                更多操作
                <Icon  type="md-arrow-dropdown"/>
              </Button>
              <DropdownMenu slot="list">
                <DropdownItem name="edit" @click.native="handleEdit(row, index2)"><Icon type="ios-create-outline" />修改</DropdownItem>
                <DropdownItem name="delete" @click.native="deleteData(row, index2)"><Icon type="md-trash"></Icon>删除</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </template>
        </Table>
      </Row>
      <Row type="flex" justify="end" class="page">
        <Page :current="searchForm.pageNumber" :total="total" :page-size="searchForm.pageSize" @on-change="changePage" @on-page-size-change="changePageSize" :page-size-opts="[10,20,50,100]" size="small" show-total show-elevator show-sizer transfer></Page>
      </Row>
    </Card>

    <!-- 上传文件 -->
    <Modal title="上传文件" footer-hide v-model="modalVisible" :mask-closable="false" :width="600" >

        <Form ref="form" :model="form" :label-width="80" :rules="formValidate">

          <FormItem label="文件名" prop="filename" >
            <Input type="text" :maxlength=250 v-model="searchForm.fileName" style= "width: 485px"/>
          </FormItem>

            <FormItem  >
              <Upload
                :action="deployByFileUrl"
                :headers="accessToken"
                :on-success="handleSuccess"
                :on-error="handleError"
                :max-size="102400"
                :on-exceeded-size="handleMaxSize"
                type="drag"
                ref="up"
              >
                <div style="padding: 20px 50px ">
                  <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                  <p>点击这里或将文件拖拽到这里上传</p>任意不超过100M的图片
                </div>
              </Upload>
            </FormItem>
<!--          <FormItem  >-->
<!--              <div slot="footer">-->
<!--                <Button type="text" @click=" editModalVisible=false">取消</Button>-->
<!--                <Button type="primary" :loading="submitLoading" @click=" handelSubmitEdit">上传</Button>-->
<!--              </div>-->
<!--          </FormItem>-->
        </Form>

    </Modal>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
// import crudPic from '@/api/tools/picture'
// import CRUD, { presenter, header, crud } from '@crud/crud'
// import { getToken } from '@/utils/auth'
// import rrOperation from '@crud/RR.operation'
// import crudOperation from '@crud/CRUD.operation'
// import pagination from '@crud/Pagination'
import {deleteByIds, queryPictureList} from '@/api/tools/picture'
import { formartDate } from '@/api/tools/tool'
//import updateMntApp from "../../mnt/app/updateMntApp";

// crud交由presenter持有
//const defaultCrud = CRUD({ title: '图片', url: '/api/pictures', crudMethod: { ...crudPic }})
export default {
  // components: {
  //   updatepictureId
  // },
  data() {
    return {
      drop: true,
      dropDownContent: "展开",
      dropDownIcon: "ios-arrow-down",
      search: '',
      data: [],
      accessToken: {},
      deployByFileUrl: "",
      columns: this.getPictureColumns(),
      openSearch: true,//打开搜索
      openTip: true,//打开提示
      loading: true, // 表单加载状态
      selectCount: 0, // 多选计数
      selectList: [], // 多选数据
      searchForm: {
        // 搜索框对应data对象
        filename:null,
        page: 1, // 当前页数
        size: 10, // 页面大小
        startDate: null,//开始时间
        endDate: null,//结束时间
        sort: 'id,desc', // 默认排序字段
        // order: 'desc' // 默认排序方式
      },
      editModalVisible: false,
      form: {
        fileName: "",

      },
      formValidate: {
        // 表单验证规则
        fileName: [{ required: true, message: "不能为空", trigger: "blur" }],
      },
      submitLoading: false,
      selectDate: null, // 选择日期绑定modal
      total: 0,
      title: '',
      pictureId: '',
      modalVisible: false,
      updateShow: false,
      tableHeight: 200,
      colOptions: ["文件名","上传者","缩略图","文件大小","高度","宽度","创建日期"],
      colSelect: ["文件名","上传者","缩略图","文件大小","高度","宽度","创建日期"],
    }
  },
  methods: {
    //列表上方更多操作
    handleDropdown(name) {
      if (name == "refresh") {
        this.getDataList();
      } else if (name == "removeAll") {
        this.delAll();
      }else if (name == "export") {
        let excolumns = this.columns.filter(function(v){ return v.title!="操作" && v. type!= 'selection'});
        this.$refs.table.exportCsv({
          filename: '本页数据',
          columns: excolumns,
          data:this.data
        });
      }
    },
    deploy(v) {
      this.modalVisible = true;
    },
    //时间选择事件
    selectDateRange(v) {
      if (v) {
        this.searchForm.startDate = v[0];
        this.searchForm.endDate = v[1];
      }
    },
    //新增
    addMntApp() {
      this.title = '新增';
      this.updateShow = true
      this.pictureId='';
    },
    //编辑
    handleEdit(row, index) {
      this.title = '编辑';
      this.pictureId=row.id.toString();
      this.updateShow = true;
    },
    //查看
    handleLook(row, index) {
      this.title = '查看';
      this.pictureId=row.id.toString();
      this.updateShow = true;
    },
    //分页查询
    getDataList() {
      this.loading = true;
      // this.searchForm.id = null;
      // debugger;
      queryPictureList(this.searchForm).then(res => {
        if(res.content) {
          this.loading = false;
          this.data = res.content;
          this.total = res.totalElements;
        }
      });
    },
    //单一删除
    deleteData(row, index){
      this.$Modal.confirm({
        title:"确认删除",
        content: "您确认要删除所点击选的数据?",
        loading: true,
        onOk: () => {
          this.userLoading = true;
          var ids = [];
          ids.push(row.id);
          this.patchdeleteData(ids);
        },
        onCancel: () => {
          this.$Message.info('取消了当前的操作行为！');
        },
      });
    },
    //批量删除
    delAll() {
      if(this.selectCount <= 0) {
        this.$Message.warning('您还未选择要删除的数据');
        return;
      }
      this.$Modal.confirm({
        title: '确认删除',
        content: '您确认要删除所选的 ' + this.selectCount + '条数据?',
        loading: true,
        onOk: () => {
          let ids =[];
          this.selectList.forEach(function(e) {
            ids.push(e.id );
          });
          this.patchdeleteData(ids);
        },
        onCancel: () => {
          this.$Message.info('取消了当前的操作行为！');
        }
      });
    },
    //删除（后台）
    patchdeleteData(ids) {
      if(ids == undefined || ids == null || ids.length == 0) {
        this.$Message.error('没有选择的数据');
        return;
      }
      deleteByIds({ids:ids}).then(res => {
        this.userLoading = false;
        this.$Modal.remove();
        if(res!=null) {
          this.modalTaskVisible = false;
          this.$Message.success('删除成功');
          this.getDataList();
        } else {
          this.$Message.error('删除失败');
        }
      });
    },
    //改变页码
    changePage(v) {
      this.searchForm.page = v-1;
      this.getDataList();
      this.clearSelectAll();
    },
    //改变每页显示数据的条数
    changePageSize(v) {
      this.searchForm.Size = v;
      this.getDataList();
    },
    //改变排序方式
    changeSort(e) {
      this.searchForm.sort = e.key;
      this.searchForm.order = e.order;
      if(e.order == 'normal') {
        this.searchForm.order = '';
      }
      this.getDataList();
    },
    //查询
    handleSearch() {
      this.searchForm.page = 1;
      this.searchForm.size = 10;
      this.getDataList();
    },
    //重置
    handleReset() {
      this.$refs.searchForm.resetFields();
      this.searchForm.page = 1;
      this.searchForm.size = 10;
      this.searchForm.startDate = null;
      this.searchForm.endDate = null;
      this.searchForm.filename = null;
      this.selectDate = null;
      // 重新加载数据
      this.getDataList();
    },
    //显示选择
    showSelect(e) {
      this.selectList = e;
      this.selectCount = e.length;
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "文件大小过大",
        desc: "所选文件‘ " + file.name + " ’大小过大, 不得超过100M."
      });
    },
    handleSuccess(res, file) {
      if (res && res.success) {
        this.$Message.success("上传成功");
        this.modalVisible = false;
        this.getDataList();
      } else {
        this.$Message.error(res.message);
      }
    },
    handleError(error, file, fileList) {
      this.$Message.error(error.toString());
    },
    //清空选择
    clearSelectAll() {
      this.$refs.table.selectAll(false);
    },
    handelCancel() {
      this.modalVisible = false;
    },
    handelSubmitEdit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.submitLoading = true;
          updateInfo(this.form).then(res => {
            this.submitLoading = false;
            if (res && res.success) {
              this.$Message.success("操作成功");
              this.getDataList();
              this.editModalVisible = false;
            }
          });
        }
      });
    },
    //获取列表字段
    getPictureColumns() {
      return [
        {
          type: 'selection',
          width: 60,
          align: 'center',
        },
        {
          title: '文件名',
          align: 'center',
          key: 'filename',
          tooltip:true,
          sortable: false
        },
        {
          title: '上传者',
          align: 'center',
          tooltip:true,
          key: 'username',
          sortable: false
        },
        {
          title: '缩略图',
          align: 'center',
          key: 'url',
          tooltip:true,
          sortable: false
        },
        {
          title: '文件大小',
          align: 'center',
          key: 'size',
          tooltip:true,
          sortable: false
        },
        {
          title: '高度',
          align: 'center',
          key: 'height',
          tooltip:true,
          sortable: false
        },
        {
          title: '宽度',
          align: 'center',
          tooltip:true,
          key: 'width',
          sortable: false,
        },
        {
          title: '创建日期',
          key: 'createTime',
          sortable: true,
          align: 'center',
          tooltip:true,
          width: 180,
          render: (h, params) => {
            return h('div',
              formartDate(params.row.createTime, 'yyyy-MM-dd HH:mm:ss')
            )
          }
        },

      ]
    },
    //动态列实现
    checkboxChange:function (data) {
      var columnss =  this.getPictureColumns();
      this.columns= columnss.filter(function(v){
        return data.indexOf(v.title) > -1 || v. type== 'selection'
      })
    }
  },
  mounted() {
    this.getDataList();
    //this.tableHeight = window.innerHeight - this.$refs.mntAppTable.$el.offsetTop - 270
  }
}
</script>

<style scoped="less">
  .operation{
    margin-bottom: 10px;
  }
</style>
