<style lang="less" scoped>
.tZhsqMerchantProfileList {
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
    width: 190px !important;
  }
}

</style>
<style scoped>
  @import '../../../styles/default/indexHome.css';
</style>
<template>
  <div class="search tZhsqMerchantProfileList">
    <Card>
      <Row v-show="openSearch" @keydown.enter.native="handleSearch">
        <Form ref="searchForm" :model="searchForm" inline :label-width="110">
          <Button v-if="permitIds.includes('archive_domain_shanghu_add')" @click="addTZhsqMerchantProfile"
                  type="primary" icon="md-add">新增
          </Button>
          <Form-item label="商户类别">
            <Select v-model="searchForm.merchantSort" placeholder="请选择商户类别" clearable  @on-change="handleSearch">
              <Option v-for="(item, i) in merchantSortPriority" :key="item.id.toString()"
                      :value="item.number.toString()">{{ item.name }}
              </Option>
            </Select>
          </Form-item>
          <!--          <Form-item label="商户名称">-->
          <!--            <Input v-model="searchForm.merchantName" placeholder="请输入商户名称"/>-->
          <!--          </Form-item>-->
          <!--          <Form-item label="法人名称">-->
          <!--            <Input v-model="searchForm.legalEntity" placeholder="请输入法人名称"/>-->
          <!--          </Form-item>-->
          <Form-item label="所属街道">
            <Select v-model="searchForm.streetId" placeholder="请选择所属街道" clearable @on-change="streetChange"
                    :label-in-value="true">
              <Option v-for="(item, i) in streetData" :key="item.id.toString()" :value="item.id.toString()">
                {{ item.name }}
              </Option>
            </Select>
          </Form-item>
          <Form-item label="所属社区" v-show="drop">
            <Select v-model="searchForm.legalCommunityId" placeholder="请选择所属社区" clearable :label-in-value="true"
                    @on-change="selectCommunity">
              <Option v-for="(item, i) in legalCommunityPriority" :key="item.id.toString()" :value="item.id.toString()">
                {{ item.name }}
              </Option>
            </Select>
          </Form-item>
          <Form-item label="所属网格" v-show="drop">
            <Select v-model="searchForm.gridId" placeholder="请选择所属网格" clearable :label-in-value="true"
                    @on-change="selectGrid">
              <Option v-for="(item, i) in legalGridPriority" :key="item.id" :value="item.id">{{ item.name }}</Option>
            </Select>
          </Form-item>
          <Form-item :label-width="40">
            <Input v-model="searchForm.searchInfo" search enter-button placeholder="请输入商户名称/法人名称"
                   @on-search="handleSearch"/>
          </Form-item>
          <Form-item :label-width="40">
<!--            <Button @click="handleSearch" type="primary" icon="ios-search">搜索</Button>-->
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
                <DropdownItem name="removeAll" v-if="permitIds.includes('archive_domain_shanghu_delete')">
                  <Icon type="md-trash"/>
                  批量删除
                </DropdownItem>
                <DropdownItem name="export" v-if="permitIds.includes('archive_domain_shanghu_export')">
                  <Icon type="md-arrow-down"/>
                  导出本页数据
                </DropdownItem>
                <DropdownItem name="excelExport" v-if="permitIds.includes('archive_domain_shanghu_export')">
                  <Icon type="md-arrow-down"/>
                  根据查询条件导出
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <a class="drop-down" @click="dropDown">
              {{ dropDownContent }}
              <Icon :type="dropDownIcon"></Icon>
            </a>
          </Form-item>
        </Form>
      </Row>


      <Row v-show="selectCount>0">
        <Alert show-icon>
          已选择
          <span class="select-count">{{ selectCount }}</span> 项
          <a class="select-clear" @click="clearSelectAll">清空</a>
          <!--          <span style="float: right;">点击右上角按钮配置动态列↑</span>-->

        </Alert>
      </Row>
      <Row>
        <Table :loading="loading" stripe :columns="columns" sortable="custom" :data="data" @on-sort-change="changeSort"
               @on-selection-change="showSelect" ref="table">
          <template slot-scope="{ row, index }" slot="action">
            <Tooltip content="查看详情" placement="top">
              <Button class="btnPrimary" icon="md-eye" @click="handleLook(row, index)"
                      v-if="permitIds.includes('archive_domain_shanghu_see')"></Button>
            </Tooltip>
            <Tooltip content="修改" placement="top">
              <Button class="bianji" @click="handleEdit(row, index)"
                      v-if="permitIds.includes('archive_domain_shanghu_bianji')"></Button>
            </Tooltip>
            <Tooltip content="删除" placement="top">
              <Button class="btnError" icon="ios-trash" @click="deleteData(row, index)"
                      v-if="permitIds.includes('archive_domain_shanghu_delete')"></Button>
            </Tooltip>

            <Tooltip content="绑定房屋" placement="top">
              <Button class="btnPrimary" icon="ios-link" @click="inBind(row, index)"
                      v-if="permitIds.includes('archive_domain_shanghu_see')"></Button>
            </Tooltip>
            <Tooltip content="解绑房屋" placement="top">
              <Button class="btnPrimary" icon="ios-close-circle-outline" @click="outBind(row, index)"
                      v-if="permitIds.includes('archive_domain_shanghu_see')"></Button>
            </Tooltip>
          </template>
        </Table>
      </Row>
      <Row type="flex" justify="center" class="page">
        <Page :current="searchForm.pageNumber" :total="total" :page-size="searchForm.pageSize" @on-change="changePage"
              @on-page-size-change="changePageSize" :page-size-opts="[10,20,50,100]" size="small" show-total show-elevator
              show-sizer></Page>
      </Row>
    </Card>
    <updateTZhsqMerchantProfile v-model="updateShow" :TZhsqMerchantProfileId="TZhsqMerchantProfileId"
                                :modalTitle="title" v-on:handleSearch="handleSearchPage"></updateTZhsqMerchantProfile>
    <lookTZhsqMerchantProfile v-model="lookShow" :TZhsqMerchantProfileId="TZhsqMerchantProfileId"
                              :modalTitle="title"></lookTZhsqMerchantProfile>
    <bindHouse v-model="bindShow" :BasicId="TZhsqMerchantProfileId" :modalTitle="title" tableName="tZhsqMerchantProfile"
               v-on:handleSearch="handleSearchPage"></bindHouse>
    <plot v-model="ShowMap" modalTitle="选择坐标点" @resultPoint="getLocation" divId="tZhsqMerchantProfileList"
          :objData="locationArr" iconPath="/img/archives/shanghu.png" :selectType="selectType"></plot>
  </div>
</template>
<script>
import {
  deleteTZhsqMerchantProfile,
  queryTZhsqMerchantProfileList,
  updateTZhsqMerchantProfile as updateTZhsqMerchant,
  updateTZhsqMerchantProfile as update,
  exportExcel
} from '@/api/zhsq/tZhsqMerchantProfile/tZhsqMerchantProfile'
import {formartDate} from '@/api/tools/tool'
import bindHouse from "../tZhsqVolunteer/bindHouse";
import updateTZhsqMerchantProfile from './updateTZhsqMerchantProfile'
import lookTZhsqMerchantProfile from './lookTZhsqMerchantProfile'
import {queryAllList} from '@/api/zhsq/basicGrids/basicGrids'
import plot from "@/views/gismap/components/plot";
import {getStreet, getCommunity, getDictionary} from '@/api/index'
import {mapGetters} from "vuex";

export default {
  computed: {
    ...mapGetters(["permitIds"])
  },
  components: {
    updateTZhsqMerchantProfile,
    lookTZhsqMerchantProfile,
    plot,
    bindHouse,
  },
  data() {
    return {
      bindShow: false,
      drop: false,
      dropDownContent: "展开",
      dropDownIcon: "ios-arrow-down",
      search: '',
      data: [],
      cvData: [],
      columns: this.getTZhsqMerchantProfileColumns(),
      openSearch: true,//打开搜索
      openTip: true,//打开提示
      loading: true, // 表单加载状态
      selectCount: 0, // 多选计数
      selectList: [], // 多选数据
      searchForm: {
        // 搜索框对应data对象
        merchantSort: '',
        merchantName: '',
        legalEntity: '',
        streetId: '',
        searchInfo: '',
        legalCommunityId: '',
        gridId: '',
        pageNumber: 1, // 当前页数
        pageSize: 10, // 页面大小
        startDate: null,//开始时间
        endDate: null,//结束时间
        sort: 'create_time', // 默认排序字段
        order: 'desc' // 默认排序方式
      },
      total: 0,
      title: '',
      TZhsqMerchantProfileId: '',
      updateShow: false,
      tableHeight: 200,
      colOptions: ["商户名称", "商户类别", "法人姓名", "法人电话", "所属社区", "所属网格", "房屋绑定", "创建时间", "操作"],
      colSelect: ["商户名称", "商户类别", "法人姓名", "法人电话", "所属社区", "所属网格", "房屋绑定", "创建时间", "操作"],
      lookShow: false,
      merchantSortPriority: [],
      streetData: [],
      legalCommunityPriority: [],
      legalGridPriority: [],
      locationArr: [],
      selectType: 'Point',
      editId: '',
      ShowMap: false,
    }
  },
  methods: {
    selectGrid(v) {
      if (v) {
        this.searchForm.gridId = v.value;
      } else {
        this.searchForm.gridId = "";
      }
      this.handleSearch();
    },
    selectCommunity(v) {//选择社区
      if (v) {
        this.searchForm.legalCommunityId = v.value;
        queryAllList({"communityId": v.value}).then(res => {
          if (res && res.success) {
            this.legalGridPriority = res.data;
          } else {
            this.$Message.error('获取网格数据失败，请重新刷新');
          }
        })
      } else {
        this.legalGridPriority = null;
        this.searchForm.legalCommunityId = "";
      }
      this.handleSearch();

    },
    getStreetData() {//获取街道
      getStreet().then(res => {
        this.streetData = res.data;
      })
    },
    streetChange(e) {//街道选择
      if (e) {
        this.searchForm.streetId = e.value;
        getCommunity({streetId: e.value}).then(res => {
          if (res && res.success) {
            this.legalCommunityPriority = res.data;
          }
        });
      } else {
        this.legalCommunityPriority = null;
        this.searchForm.streetId = '';
      }
      this.handleSearch();

    },
    inBind(row, index) {
      if (row.houseId && row.houseId.trim().length > 0) {
        this.$Message.error('您已经关联房屋，请勿继续操作！');
        return false;
      }
      this.title = "房屋绑定";
      this.bindShow = true;
      this.TZhsqMerchantProfileId = row.id.toString();
    },
    //解绑
    outBind(row, index) {
      if (row.houseId == undefined || row.houseId == null || row.houseId.trim().length == 0) {
        this.$Message.error('您已为解绑状态，请勿继续操作！');
        return false;
      }
      if (row.id) {
        this.$Modal.confirm({
          title: "解除绑定",
          content: "您确认要解除‘" + row.name + "’和房屋的绑定吗?",
          loading: true,
          onOk: () => {
            this.userLoading = true;
            let data = {};
            data.id = row.id;
            data.houseName = "",
              data.houseId = "" ,
              update(data).then(res => {
                this.userLoading = false;
                if (res && res.code == 200) {

                  this.bindShow = false;
                  this.$Message.success('解绑成功');
                  this.getDataList();
                  this.$Modal.remove();
                } else {
                  this.$Message.error(res.msg);
                }
              })
          },
          onCancel: () => {
            this.$Message.info('取消了当前的操作行为！');
          },
        });
      } else {
        this.$Message.error('获取参数失败，请联系管理员！');
        return false;
      }
    },
    getLocation(obj, type) {
      let arr = obj.flatCoordinates;
      let location = JSON.stringify(arr);
      //修改当前行
      updateTZhsqMerchant({id: this.editId, location: location}).then(res => {
        if (res && res.code == 200) {
          this.$Message.success('保存成功');
          this.getDataList();
        } else {
          this.$Message.error(res.msg);
        }
      })
    },
    //点击列表标注 修改坐标点
    editRow(row) {
      this.editId = row.id;
      if (row.location) {
        try {
          this.locationArr = JSON.parse(row.location);
        } catch (e) {
        }
      } else {
        this.locationArr = null;
      }
      this.ShowMap = true;
    },
    // selectCommunity(v){//选择社区
    // 	if(v){
    // 		this.searchForm.legalCommunityId=v.value;
    // 		queryAllList({"communityId":v.value}).then(res => {
    // 			if(res && res.success){
    // 				this.legalGridPriority = res.data;
    // 			}else {
    // 				this.$Message.error('获取网格数据失败，请重新刷新');
    // 			}
    // 		})
    //     }else{
    //         this.legalGridPriority = null;
    //         this.searchForm.legalCommunityId="";
    //     }
    // },
    //选择网格
    gridItem(data) {
      if (data.communityId) {
        queryAllList(data).then(res => {
          if (res && res.success) {
            this.legalGridPriority = res.data;
          } else {
            this.$Message.error('获取网格数据失败，请重新刷新');
          }
        })
      } else {
        this.legalGridPriority = [];
      }
    },
    handleLook(row, index) {//查看按钮
      this.title = '商户档案查看';
      this.TZhsqMerchantProfileId = row.id.toString();
      this.lookShow = true;
    },
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
      } else if (name == "excelExport") {
        this.excelData();
      }
    },
    //导出查询数据
    excelData() {
      var _this = this;
      exportExcel(_this.searchForm).then(res => {
        const content = res;
        const blob = new Blob([content], {type: 'application/ms-excel'});
        const fileName = '商户档案.xlsx';
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
    addTZhsqMerchantProfile() {
      this.title = '商户档案新增';
      this.updateShow = true
      this.TZhsqMerchantProfileId = '';
    },
    //编辑
    handleEdit(row, index) {
      this.title = '商户档案修改';
      this.TZhsqMerchantProfileId = row.id.toString();
      this.updateShow = true;
    },
    //分页查询
    getDataList() {
      this.loading = true;
      this.searchForm.id = null;
      queryTZhsqMerchantProfileList(this.searchForm).then(res => {
        if (res && res.success) {
          this.loading = false;
          this.cvData = JSON.parse(JSON.stringify(res.data.records));
          this.data = res.data.records
          this.total = res.data.total;
        }
      });
    },
    getMerchantSortPriority() {//获取商户类别
      getDictionary({"fieldName": "merchantSortData"}).then(res => {
        if (res && res.success) {
          this.merchantSortPriority = res.data;
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
    delAll() {
      if (this.selectCount <= 0) {
        this.$Message.warning('您还未选择要删除的数据');
        return;
      }
      this.$Modal.confirm({
        title: '确认删除',
        content: '您确认要删除所选的 ' + this.selectCount + '条数据?',
        loading: true,
        onOk: () => {
          let ids = [];
          this.selectList.forEach(function (e) {
            ids.push(e.id);
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
      if (ids == undefined || ids == null || ids.length == 0) {
        this.$Message.error('没有选择的数据');
        return;
      }
      deleteTZhsqMerchantProfile({ids: ids}).then(res => {
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
      this.searchForm.merchantSort = '';
      this.searchForm.merchantName = '';
      this.searchForm.legalEntity = '';
      this.searchForm.streetId = '';
      this.searchForm.legalCommunityId = '';
      this.searchForm.gridId = '';
      this.legalCommunityPriority = null;
      this.legalGridPriority = null;
      this.searchForm.pageNumber = 1;
      this.searchForm.pageSize = 10;
      this.searchForm.startDate = null;
      this.searchForm.endDate = null;
      this.searchForm.searchInfo = '';
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
    getTZhsqMerchantProfileColumns() {
      return [
        {
          type: 'selection',
          width: 60,
          align: 'center',
        },
        {
          title: '商户名称',
          align: 'center',
          tooltip: true,
          key: 'merchantName',
          sortable: false
        },
        {
          title: '商户类别',
          align: 'center',
          tooltip: true,
          key: 'merchantSort',
          sortable: false,
          ellipsis: true,
          render: (h, params) => {
            let dataF = this.cvData.filter(item => item.id == params.row.id);
            for (let i = 0; i < this.merchantSortPriority.length; i++) {
              if (this.merchantSortPriority[i].number == dataF[0].merchantSort) {
                dataF[0].merchantSort = this.merchantSortPriority[i].name;
              }
            }
            return h('Tooltip', {
              props: {
                content: dataF[0].merchantSort,
                placement: 'bottom',
                transfer: true
              }
            }, dataF[0].merchantSort)
          }
        },
        {
          title: '法人姓名',
          align: 'center',
          tooltip: true,
          key: 'legalEntity',
          sortable: false
        },
        {
          title: '法人电话',
          align: 'center',
          tooltip: true,
          key: 'legalPhone',
          sortable: false
        },
        // {
        // 	title: '所属街道',
        // 	align: 'center',
        // 	tooltip:true,
        // 	key: 'street',
        // 	sortable: false
        // },
        {
          title: '所属社区',
          align: 'center',
          tooltip: true,
          key: 'legalCommunity',
          sortable: false
        },
        {
          title: '所属网格',
          align: 'center',
          tooltip: true,
          key: 'legalGrid',
          sortable: false
        },
        /*{
          title: '商户地址',
          align: 'center',
          tooltip:true,
          key: 'merchantAddress',
          sortable: false
        },*/
        {
          title: '房屋绑定',
          align: 'center',
          key: 'isBind',
          ellipsis: true,
          render(h, param) {
            if (param.row.houseId && param.row.houseId.trim().length > 0) {
              return h('Tooltip', {
                props: {
                  content: '已绑定',
                  placement: 'bottom',
                  transfer: true
                },
                style: {
                  color: 'green'
                }
              }, '已绑定');
            } else {
              return h('Tooltip', {
                props: {
                  content: '未绑定',
                  placement: 'bottom',
                  transfer: true
                },
                style: {
                  color: 'red'
                }
              }, '未绑定');
            }
          }
        },
        /*{
          title: '地图标注',
          align: 'center',
          tooltip:true,
          key: 'location',
          sortable: false,
          render:(h, params) => {
            let location = params.row.location ? '已标注' : '未标注';
            let dataF = this.cvData.filter(item=>item.id == params.row.id);
            dataF[0].location = location;
            if (params.row.location) {
              return h('div', [
                    h('Button', {
                      props: {
                              type: 'success',
                              size: 'small'
                      },
                      on: {
                              click: () => {
                                   this.editRow(params.row)
                               },
                            },
                  }, "已标注"),
                  ])

              } else {
                return h('div', [
                   h('Button', {
                   props: {
                         type: 'error',
                         size: 'small'
                   },

                   on: {
                           click: () => {
                                this.editRow(params.row)
                            },
                         },
                   }, '未标注')])
              }
          }
        },*/
        {
          title: '创建时间',
          key: 'createTime',
          sortable: false,
          align: 'center',
          minWidth: 170,
          tooltip: true,
          render: (h, params) => {
            let createTime = formartDate(params.row.createTime, 'yyyy-MM-dd HH:mm:ss');
            let dataF = this.cvData.filter(item => item.id == params.row.id);
            dataF[0].createTime = '="' + createTime + '"';
            return h('Tooltip', {
              props: {
                content: createTime,
                placement: 'bottom',
                transfer: true
              }
            }, createTime)
          }
        },
        {
          title: '操作',
          align: 'center',
          slot: 'action',
          width: 260,
        }
      ]
    },
    //动态列实现
    checkboxChange: function (data) {
      var columnss = this.getTZhsqMerchantProfileColumns();
      this.columns = columnss.filter(function (v) {
        return data.indexOf(v.title) > -1 || v.type == 'selection'
      })
    }
  },
  mounted() {
    this.getDataList();
    this.getStreetData();
    this.getMerchantSortPriority();
  }
}
</script>
<style scoped="less">
.operation {
  margin-bottom: 10px;
}
</style>
