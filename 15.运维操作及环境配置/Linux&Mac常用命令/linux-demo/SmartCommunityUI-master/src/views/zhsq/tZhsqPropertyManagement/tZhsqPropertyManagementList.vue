<style lang="less" scoped>
.tZhsqPropertyManagementList {
  .ivu-form .ivu-form-item-label {
    text-align: left;
    padding: 0px 0px 0px 0;
  }

  .ivu-form-item-content > .ivu-btn {
    margin-right: 40px !important;
  }

  .ivu-select {
    width: 190px !important;
  }

  .ivu-input-wrapper {
    width: 340px !important;
  }
}

</style>

<style scoped>
  @import '../../../styles/default/indexHome.css';
</style>
<template>
  <div class="search tZhsqPropertyManagementList">
    <Card>
      <Row v-show="openSearch" @keydown.enter.native="handleSearch">
        <Form ref="searchForm" :model="searchForm" inline :label-width="110">
          <Button v-if="permitIds.includes('archive_domain_wuye_add')" @click="addTZhsqPropertyManagement"
                  type="primary" icon="md-add">新增
          </Button>
          <!--          <Form-item label="物业名称" :label-width="110">-->
          <!--						<Input v-model="searchForm.propertyName" type="text" placeholder="请输入物业名称" clearable />-->
          <!--					</Form-item>-->
          <Form-item label="物业类型">
            <Select v-model="searchForm.propertyType" placeholder="请选择物业类型" clearable  @on-change="handleSearch">
              <Option v-for="(item, i) in propertyTypePriority" :key="item.id.toString()"
                      :value="item.number.toString()">{{ item.name }}
              </Option>
            </Select>
          </Form-item>
          <!--					<Form-item label="物业负责人">-->
          <!--						<Input v-model="searchForm.propertyPrincipal" type="text" placeholder="请输入物业负责人" clearable />-->
          <!--					</Form-item>-->
          <!--					<Form-item label="负责人电话" v-show="drop">-->
          <!--						<Input v-model="searchForm.propertyPrincipalPhone" type="text" placeholder="请输入负责人电话" clearable />-->
          <!--					</Form-item>-->
          <Form-item :label-width="40">
            <Input v-model="searchForm.searchInfo" search enter-button placeholder="请输入物业名称/物业负责人/负责人电话"
                   @on-search="handleSearch"/>
          </Form-item>
          <Form-item :label-width="40">
            <!--						<Button @click="handleSearch" type="primary" icon="ios-search">搜索</Button>-->
            <Button @click="handleReset">重置查询</Button>
            <Dropdown @on-click="handleDropdown">
              <Button>
                更多操作
                <Icon type="md-arrow-dropdown"/>
              </Button>
              <DropdownMenu slot="list">
                <DropdownItem name="refresh">
                  <Icon type="md-sync"/>
                  刷新
                </DropdownItem>
                <!--						<DropdownItem v-if="permitIds.includes('archive_domain_wuye_delete')" name="removeAll"> <Icon type="md-trash"/>批量删除</DropdownItem>-->
                <DropdownItem name="importExcel">
                  <Icon type="md-arrow-up"/>
                  批量导入
                </DropdownItem>
                <DropdownItem v-if="permitIds.includes('archive_domain_wuye_export')" name="export">
                  <Icon type="md-arrow-down"/>
                  导出本页数据
                </DropdownItem>
                <DropdownItem v-if="permitIds.includes('archive_domain_wuye_export')" name="exportData">
                  <Icon type="md-arrow-down"/>
                  导出物业数据
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
<!--            <a class="drop-down" @click="dropDown">-->
<!--              {{ dropDownContent }}-->
<!--              <Icon :type="dropDownIcon"></Icon>-->
<!--            </a>-->
          </Form-item>
        </Form>
      </Row>


      <Row v-show="selectCount>0">
        <Alert show-icon>
          已选择
          <span class="select-count">{{ selectCount }}</span> 项
          <a class="select-clear" @click="clearSelectAll">清空</a>
          <!--					<span style="float: right;">点击右上角按钮配置动态列↑</span>-->
        </Alert>
      </Row>
      <Row>
        <Table :loading="loading" stripe :columns="columns" sortable="custom" :data="data" @on-sort-change="changeSort"
               @on-selection-change="showSelect" ref="table">
          <template slot-scope="{ row, index }" slot="action">

            <Tooltip content="查看详情" placement="top">
              <Button class="btnPrimary" icon="md-eye" @click="handleLook(row, index)"
                      v-if="permitIds.includes('archive_domain_wuye_see')"></Button>
            </Tooltip>
            <Tooltip content="修改" placement="top">
              <Button class="bianji" @click="handleEdit(row, index)"
                      v-if="permitIds.includes('archive_domain_wuye_bianji')"></Button>
            </Tooltip>
            <Tooltip content="删除" placement="top">
              <Button class="btnError" icon="ios-trash" @click="deleteData(row, index)"
                      v-if="permitIds.includes('archive_domain_wuye_delete')"></Button>
            </Tooltip>
          </template>
        </Table>
      </Row>
      <Row type="flex" justify="center" class="page">
        <Page transfer :current="searchForm.pageNumber" :total="total" :page-size="searchForm.pageSize"
              @on-change="changePage" @on-page-size-change="changePageSize" :page-size-opts="[10,20,50,100]" size="small"
              show-total show-elevator show-sizer></Page>
      </Row>
    </Card>
    <updateTZhsqPropertyManagement v-model="updateShow" :TZhsqPropertyManagementId="TZhsqPropertyManagementId"
                                   :modalTitle="title"
                                   v-on:handleSearch="handleSearchPage"></updateTZhsqPropertyManagement>
    <lookTZhsqPropertyManagement v-model="lookShow" :TZhsqPropertyManagementId="TZhsqPropertyManagementId"
                                 :modalTitle="lookTitle"></lookTZhsqPropertyManagement>
    <ExcelUpload v-model="excelUploadShow" v-on:handleSearch="handleSearchPage" modalTitle="导入数据"
                 :actions="actions"></ExcelUpload>
  </div>
</template>
<script>
import {
  deleteTZhsqPropertyManagement,
  queryTZhsqPropertyManagementList,
  download
} from '@/api/zhsq/tZhsqPropertyManagement/tZhsqPropertyManagement'
import {formartDate} from '@/api/tools/tool'
import updateTZhsqPropertyManagement from './updateTZhsqPropertyManagement'
import lookTZhsqPropertyManagement from './lookTZhsqPropertyManagement'
import {getDictionary, deletePropertyCompany} from '@/api/index'
import ExcelUpload from '@/views/zhsq/basicHousingEstate/ExcelUpload'
import {mapGetters} from "vuex";
import {baseurl} from '@/libs/axios'

export default {
  computed: {
    ...mapGetters(["permitIds"])
  },
  components: {
    updateTZhsqPropertyManagement,
    lookTZhsqPropertyManagement,
    ExcelUpload
  },
  data() {
    return {
      drop: false,
      dropDownContent: "展开",
      dropDownIcon: "ios-arrow-down",
      search: '',
      data: [],
      cvData: [],
      columns: this.getTZhsqPropertyManagementColumns(),
      openSearch: true,//打开搜索
      openTip: true,//打开提示
      loading: true, // 表单加载状态
      selectCount: 0, // 多选计数
      selectList: [], // 多选数据
      actions: '' + baseurl + '/tZhsqPropertyManagement/importExcel',
      searchForm: {
        // 搜索框对应data对象
        propertyName: '',
        propertyType: '',
        searchForm: '',
        propertyPrincipal: '',
        propertyPrincipalPhone: '',
        pageNumber: 1, // 当前页数
        pageSize: 10, // 页面大小
        // startDate: null,//开始时间
        // endDate: null,//结束时间
        sort: 'create_time', // 默认排序字段
        order: 'desc' // 默认排序方式
      },
      total: 0,
      title: '',
      TZhsqPropertyManagementId: '',
      updateShow: false,
      tableHeight: 200,
      colOptions: ["物业名称", "物业类型", "物业负责人", "物业负责人电话", "创建时间", "操作"],
      colSelect: ["物业名称", "物业类型", "物业负责人", "物业负责人电话", "创建时间", "操作"],
      lookShow: false,
      lookTitle: '',
      propertyTypePriority: [],
      excelUploadShow: false,
    }
  },
  methods: {
    //列表上方更多操作
    handleDropdown(name) {
      if (name == "refresh") {
        this.getDataList();
      } else if (name == "removeAll") {
        this.delAll();
      } else if (name == "export") {
        let excolumns = this.columns.filter(function (v) {
          return v.title != "操作" && v.type != 'selection'
        });
        this.$refs.table.exportCsv({
          filename: '本页数据',
          columns: excolumns,
          data: this.cvData,
        });
      } else if (name == "importExcel") {
        this.importExcel();
      } else if (name == "exportData") {
        this.exportData();
      }
    },
    exportData() {
      var _this = this;
      download(_this.searchForm).then(res => {
        const content = res;
        const blob = new Blob([content], {type: 'application/ms-excel'});
        const fileName = '物业档案数据.xlsx';
        if ('download' in document.createElement('a')) { // 非IE下载
          const elink = document.createElement('a');
          elink.download = fileName;
          elink.style.display = 'none';
          elink.href = URL.createObjectURL(blob);
          document.body.appendChild(elink);
          elink.click();
          URL.revokeObjectURL(elink.href); // 释放URL 对象
          document.body.removeChild(elink);
        } else { // IE10+下载
          navigator.msSaveBlob(blob, fileName);
        }
        _this.isExportShow = false;
      }).catch(function (error) {
        _this.$Message.error('数据导出失败');
        _this.isExportShow = false;
      });
    },
    importExcel() {//excel导入数据
      this.excelUploadShow = true;
    },
    //展开 收起
    dropDown() {
      if (this.drop) {
        this.dropDownContent = "展开";
        this.dropDownIcon = "ios-arrow-down";
      } else {
        this.dropDownContent = "收起";
        this.dropDownIcon = "ios-arrow-up";
      }
      this.drop = !this.drop;
    },
    //时间选择事件
    selectDateRange(v) {
      if (v) {
        this.searchForm.startDate = v[0];
        this.searchForm.endDate = v[1];
      }
    },
    //新增
    addTZhsqPropertyManagement() {
      this.title = '物业档案新增';
      this.updateShow = true
      this.TZhsqPropertyManagementId = '';
    },
    //编辑
    handleEdit(row, index) {
      this.title = '物业档案修改';
      this.TZhsqPropertyManagementId = row.id.toString();
      this.updateShow = true;
    },
    //查看
    handleLook(row, index) {
      this.lookTitle = '物业档案查看';
      this.TZhsqPropertyManagementId = row.id.toString();
      this.lookShow = true;
    },
    //分页查询
    getDataList() {
      this.loading = true;
      this.searchForm.id = null;
      this.selectCount = 0;
      queryTZhsqPropertyManagementList(this.searchForm).then(res => {
        if (res && res.success) {
          this.loading = false;
          this.cvData = JSON.parse(JSON.stringify(res.data.records));
          this.data = res.data.records;
          this.total = res.data.total;
        }
      });
      this.getPropertyType();
    },
    //获取物业类型
    getPropertyType() {
      getDictionary({"fieldName": "communityPriorityData"}).then(res => {
        if (res && res.success) {
          this.propertyTypePriority = res.data;
        }
      })
    },
    //单一删除
    deleteData(row, index) {
      this.$Modal.confirm({
        title: "确认删除",
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
    /*delAll() {
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
     },*/
    //删除（后台）
    patchdeleteData(ids) {
      if (ids == undefined || ids == null || ids.length == 0) {
        this.$Message.error('没有选择的数据');
        return;
      }
      deleteTZhsqPropertyManagement({ids: ids}).then(res => {
        this.userLoading = false;
        this.$Modal.remove();
        if (res && res.success) {
          this.modalTaskVisible = false;
          this.$Message.success('删除成功');

          this.getDataList();
        } else {
          this.$Message.error('删除失败');
        }
      }).catch(error => {
        this.userLoading = false;
      });
    },
    //改变页码
    changePage(v) {
      this.searchForm.pageNumber = v;
      this.getDataList();
      this.clearSelectAll();
    },
    //改变每页显示数据的条数
    changePageSize(v) {
      this.searchForm.pageSize = v;
      this.getDataList();
    },
    //改变排序方式
    changeSort(e) {
      this.searchForm.sort = e.key;
      this.searchForm.order = e.order;
      if (e.order == 'normal') {
        this.searchForm.order = '';
      }
      this.getDataList();
    },
    //查询
    handleSearch() {
      this.searchForm.pageNumber = 1;
      this.searchForm.pageSize = 10;
      this.getDataList();
    },
    //查询
    handleSearchPage() {
      this.getDataList();
    },
    //重置
    handleReset() {
      this.$refs.searchForm.resetFields();
      this.searchForm.propertyName = '';
      this.searchForm.propertyType = '';
      this.searchForm.propertyPrincipal = '';
      this.searchForm.propertyPrincipalPhone = '';
      this.searchForm.pageNumber = 1;
      this.searchForm.pageSize = 10;
      this.searchForm.startDate = null;
      this.searchForm.searchInfo = '';
      this.searchForm.endDate = null;
      // 重新加载数据
      this.getDataList();
    },
    //显示选择
    showSelect(e) {
      this.selectList = e;
      this.selectCount = e.length;
    },
    //清空选择
    clearSelectAll() {
      this.$refs.table.selectAll(false);
    },
    //获取列表字段
    getTZhsqPropertyManagementColumns() {
      return [
        {
          type: 'selection',
          width: 60,
          align: 'center',
        },
        {
          title: '物业名称',
          align: 'center',
          tooltip: true,
          key: 'propertyName',
          sortable: false
        },
        {
          title: '物业类型',
          align: 'center',
          tooltip: true,
          key: 'propertyType',
          sortable: false,
          ellipsis: true,
          render: (h, params) => {
            let dataF = this.cvData.filter(item => item.id == params.row.id);
            for (let i = 0; i < this.propertyTypePriority.length; i++) {
              if (this.propertyTypePriority[i].number == dataF[0].propertyType) {
                dataF[0].propertyType = this.propertyTypePriority[i].name;
              }
            }
            return h('Tooltip', {
              props: {
                content: dataF[0].propertyType,
                placement: 'bottom',
                transfer: true
              }
            }, dataF[0].propertyType)

          }
        },
        {
          title: '物业负责人',
          align: 'center',
          tooltip: true,
          key: 'propertyPrincipal',
          sortable: false
        },
        {
          title: '物业负责人电话',
          align: 'center',
          tooltip: true,
          key: 'propertyPrincipalPhone',
          sortable: false,
          render: (h, params) => {
            let dataF = this.cvData.filter(item => item.id == params.row.id);
            if(dataF){
              dataF[0].propertyPrincipalPhone = '="' + params.row.propertyPrincipalPhone + '"';
            }
            let reg = /^(.{3}).*(.{4})$/
            let number = params.row.propertyPrincipalPhone.replace(reg, '$1****$2')
            return h('Tooltip', {
              props: {
                content: number,
                placement: 'bottom',
                transfer: true
              }
            }, number)

          }
        },
        {
          title: '创建时间',
          key: 'createTime',
          sortable: false,
          align: 'center',
          minwidth: 170,
          tooltip: true,
          render: (h, params) => {
            let createTime = formartDate(params.row.createTime, 'yyyy-MM-dd HH:mm:ss');
            let dataF = this.cvData.filter(item => item.id == params.row.id);
            dataF[0].createTime = '="' + createTime + '"';
            return h('Tooltip', {
              props: {
                content: formartDate(params.row.createTime, 'yyyy-MM-dd HH:mm:ss'),
                placement: 'bottom',
                transfer: true
              }
            }, formartDate(params.row.createTime, 'yyyy-MM-dd HH:mm:ss'))
          }
        },
        {
          title: '操作',
          align: 'center',
          tooltip: true,
          slot: 'action',
          width: 250,
        }
      ]
    },
    //动态列实现
    checkboxChange: function (data) {
      var columnss = this.getTZhsqPropertyManagementColumns();
      this.columns = columnss.filter(function (v) {
        return data.indexOf(v.title) > -1 || v.type == 'selection'
      })
    },
  },
  mounted() {
    this.getDataList();
    //this.tableHeight = window.innerHeight - this.$refs.tZhsqPropertyManagementTable.$el.offsetTop - 270
  }
}
</script>
<style scoped="less">
.operation {
  margin-bottom: 10px;
}
</style>
