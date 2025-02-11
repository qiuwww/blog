<style lang="less">
  .basicSocialOrganizationList{
    .ivu-form-item-content > .ivu-btn {
      margin-right: 40px !important;
    }
  }

</style>
<style scoped>
  @import '../../../styles/default/indexHome.css';
</style>
<template>
  <Tabs v-if="permitIds.includes('archive_staff_shehuizuzi')||permitIds.includes('archive_staff_shehuizuzi_tongji')" style="margin-top: 5px;" :value="permitIds.includes('archive_staff_shehuizuzi')?'name1':'name2'">
    <TabPane v-if="permitIds.includes('archive_staff_shehuizuzi')" label="社会组织列表" icon="ios-albums-outline"
             name="name1">
      <div class="search basicSocialOrganizationList">
        <Card>
          <Row v-show="openSearch" @keydown.enter.native="handleSearch">
            <Form ref="searchForm" :model="searchForm" inline>
              <Button @click="addBasicSocialOrganization" type="primary" icon="md-add"
                      v-if="permitIds.includes('archive_staff_shehuizuzi_add')">新增
              </Button>

              <Form-item label="组织类别" :label-width="110" @on-change="handleSearch">
                <Select v-model="searchForm.type" placeholder="请选择" clearable style="width: 200px">
                  <Option v-for="(item, i) in typePriority" :key="item.number" :value="item.number">{{item.name}}
                  </Option>
                </Select>
              </Form-item>
              <!--              <Form-item label="组织名称" :label-width="110">-->
              <!--                <Input type="text" v-model="searchForm.name" placeholder="请输入" clearable style="width: 200px"/>-->
              <!--              </Form-item>-->

              <Form-item label="所属街道" :label-width="110">
                <Select v-model="searchForm.streetId" placeholder="请选择街道" label-in-value clearable style="width: 200px"
                        @on-change="onStreetChange">
                  <Option v-for="(item, i) in streetArr" :key="item.id" :value="item.id">{{item.name}}</Option>
                </Select>
              </Form-item>

              <Form-item label="所属社区" v-if="drop" :label-width="110">
                <Select v-model="searchForm.communityId" placeholder="请选择" label-in-value clearable style="width: 200px"
                        @on-change="onCommunityIdChange">
                  <Option v-for="(item, i) in communityIdPriority" :key="item.id" :value="item.id">{{item.name}}
                  </Option>
                </Select>
              </Form-item>
              <Form-item label="所属网格" v-if="drop" :label-width="110">
                <Select v-model="searchForm.gridsId" placeholder="请选择" label-in-value clearable style="width: 200px"
                        @on-change="handleSearch">
                  <Option v-for="(item, i) in gridsIdPriority" :key="item.id" :value="item.id">{{item.name}}</Option>
                </Select>
              </Form-item>
              <Form-item :label-width="40">
                <Input v-model="searchForm.name" search enter-button placeholder="请输入组织名称" @on-search="handleSearch"/>
              </Form-item>
              <Form-item class="br" :label-width="40">
                <!--                <Button @click="handleSearch" type="primary" icon="ios-search">搜索</Button>-->
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
                    <DropdownItem name="removeAll" v-if="permitIds.includes('archive_staff_shehuizuzi_delete')">
                      <Icon type="md-trash"/>
                      批量删除
                    </DropdownItem>
                    <DropdownItem name="export" v-if="permitIds.includes('archive_staff_shehuizuzi_export')">
                      <Icon type="md-arrow-down"/>
                      导出本页数据
                    </DropdownItem>
                    <DropdownItem name="excelExport" v-if="permitIds.includes('archive_staff_shehuizuzi_export')">
                      <Icon type="md-arrow-down"/>
                      根据查询条件导出
                    </DropdownItem>

                  </DropdownMenu>
                </Dropdown>
                <a class="drop-down" @click="dropDown">
                  {{dropDownContent}}
                  <Icon :type="dropDownIcon"></Icon>
                </a>
              </Form-item>
            </Form>
          </Row>

          <Row v-show="selectCount>0">
            <Alert show-icon>
              已选择
              <span class="select-count">{{selectCount}}</span> 项
              <a class="select-clear" @click="clearSelectAll">清空</a>
              <!--              <span style="float: right;">点击右上角按钮配置动态列↑</span>-->
            </Alert>
          </Row>
          <Row>
            <Table :loading="loading" stripe :columns="columns" sortable="custom" :data="data"
                   @on-sort-change="changeSort"
                   @on-selection-change="showSelect" ref="table">
              <template slot-scope="{ row, index }" slot="action">
                <Tooltip content="查看详情" placement="top">
                  <Button class="btnPrimary" icon="md-eye" @click="handleLook(row, index)"
                          v-if="permitIds.includes('archive_staff_shehuizuzi_see')"></Button>
                </Tooltip>
                <Tooltip content="修改" placement="top">
                  <Button class="bianji" @click="handleEdit(row, index)"
                          v-if="permitIds.includes('archive_staff_shehuizuzi_xiugai')"></Button>
                </Tooltip>
                <Tooltip content="删除" placement="top">
                  <Button class="btnError" icon="ios-trash" @click="deleteData(row, index)"
                          v-if="permitIds.includes('archive_staff_shehuizuzi_delete')"></Button>
                </Tooltip>
                <!--                <Button class="btnPrimary"  icon="md-eye" title="查看"   @click="handleLook(row, index)" v-if="permitIds.includes('archive_staff_shehuizuzi_see')"></Button>-->
                <!--                <Dropdown :transfer=true>-->
                <!--                  <Button size="small">-->
                <!--                    更多操作-->
                <!--                    <Icon type="md-arrow-dropdown"/>-->
                <!--                  </Button>-->
                <!--                  <DropdownMenu slot="list">-->
                <!--                    <DropdownItem name="inBind" @click.native="inBind(row,index)">-->
                <!--                      <Icon type="ios-link"></Icon>-->
                <!--                      绑定房屋-->
                <!--                    </DropdownItem>-->
                <!--                    <DropdownItem name="outBind" @click.native="outBind(row,index)">-->
                <!--                      <Icon type="ios-close-circle-outline"></Icon>-->
                <!--                      解绑房屋-->
                <!--                    </DropdownItem>-->
                <!--                    <DropdownItem name="edit" @click.native="handleEdit(row, index)" v-if="permitIds.includes('archive_staff_shehuizuzi_xiugai')">-->
                <!--                      <Icon type="ios-create-outline"/>-->
                <!--                      修改-->
                <!--                    </DropdownItem>-->
                <!--                    <DropdownItem name="delete" @click.native="deleteData(row, index)" v-if="permitIds.includes('archive_staff_shehuizuzi_delete')">-->
                <!--                      <Icon type="md-trash"></Icon>-->
                <!--                      删除-->
                <!--                    </DropdownItem>-->
                <!--                  </DropdownMenu>-->
                <!--                </Dropdown>-->
              </template>
            </Table>
          </Row>
          <Row type="flex" justify="center" class="page">
            <Page :current="searchForm.pageNumber" :total="total" :page-size="searchForm.pageSize"
                  @on-change="changePage"
                  @on-page-size-change="changePageSize" :page-size-opts="[10,20,50,100]" size="small" show-total
                  show-elevator
                  show-sizer transfer></Page>
          </Row>
        </Card>
        <updateBasicSocialOrganization v-model="updateShow" :BasicSocialOrganizationId="BasicSocialOrganizationId"
                                       :modalTitle="title"
                                       v-on:handleSearch="handleSearchPage"></updateBasicSocialOrganization>

        <lookBasicSocialOrganization v-model="lookShow" :BasicSocialOrganizationId="BasicSocialOrganizationId"
                                     :modalTitle="title"
                                     v-on:handleSearch="handleSearchPage"></lookBasicSocialOrganization>
        <bindHouse v-model="bindShow" :BasicId="BasicSocialOrganizationId" :modalTitle="title"
                   tableName="basicSocialOrganization" v-on:handleSearch="handleSearchPage"></bindHouse>
      </div>
    </TabPane>
    <TabPane label="社会组织统计" icon="ios-aperture-outline" name="name2"
             v-if="permitIds.includes('archive_staff_shehuizuzi_tongji')">
      <div ref="visitChart" style="height: 500px;width: 50%;margin-top: 100px;float: left;"></div>
      <div ref="visitChart2" style="height: 500px;width: 50%;margin-top: 100px;float: right;"></div>
    </TabPane>

    <plot v-model="ShowMap" modalTitle="选择坐标点" @resultPoint="getLocation" divId="basicSocialOrganizationList"
          :objData="locationArr" iconPath="/img/archives/shehuizhuzhi.png" :selectType="selectType"></plot>
  </Tabs>
</template>
<script>
  import plot from "@/views/gismap/components/plot";
  import {
    deleteBasicSocialOrganization,
    queryBasicSocialOrganizationList,
    getCommunityCountData,
    getGridsCountData,
    exportExcel
  } from '@/api/zhsq/basicSocialOrganization/basicSocialOrganization'
  import {queryAllList} from '@/api/zhsq/basicGrids/basicGrids'
  import updateBasicSocialOrganization from './updateBasicSocialOrganization'
  import lookBasicSocialOrganization from './lookBasicSocialOrganization'
  import {communityData, socialOrganizationTypeData} from '@/api/tools/zhsqSelectData'
  import echarts from 'echarts';
  import bindHouse from "../tZhsqVolunteer/bindHouse";
  import {
    updateBasicSocialOrganization as updateSocialOrganization,
    updateBasicSocialOrganization as update
  } from '@/api/zhsq/basicSocialOrganization/basicSocialOrganization'
  import {formartDate} from '@/api/tools/tool'
  import {getCommunity, getDictionary, getStreet} from "../../../api";

  import {mapGetters} from "vuex";

  export default {
    components: {
      updateBasicSocialOrganization,
      lookBasicSocialOrganization,
      plot,
      bindHouse,
    },
    computed: {
      ...mapGetters(["permitIds"])
    },
    data() {
      return {
        streetArr: [],
        bindShow: false,
        visitChart: {},
        visitChart2: {},
        typePriority: [],
        communityIdPriority: [],
        gridsIdPriority: [],
        gridsIdData: [],
        drop: false,
        dropDownContent: "展开",
        dropDownIcon: "ios-arrow-down",
        search: '',
        data: [],
        columns: this.getBasicSocialOrganizationColumns(),
        openSearch: true,//打开搜索
        openTip: true,//打开提示
        loading: true, // 表单加载状态
        selectCount: 0, // 多选计数
        selectList: [], // 多选数据
        searchForm: {
          // 搜索框对应data对象
          type: '',
          name: '',
          streetId: '',
          communityId: '',
          gridsId: '',
          pageNumber: 1, // 当前页数
          pageSize: 10, // 页面大小
          startDate: null,//开始时间
          endDate: null,//结束时间
          sort: 'create_time', // 默认排序字段
          order: 'desc' // 默认排序方式
        },
        total: 0,
        csvData: [],
        title: '',
        BasicSocialOrganizationId: '',
        updateShow: false,
        lookShow: false,
        tableHeight: 200,
        colOptions: ["组织名称", "组织类别", "法人代表", "所属街道", "所属社区", "所属网格", "是否绑定", "地图标注", "创建时间", "操作"],
        colSelect: ["组织名称", "组织类别", "法人代表", "所属街道", "所属社区", "所属网格", "是否绑定", "地图标注", "创建时间", "操作"],
        ShowMap: false,
        locationArr: [],
        selectType: 'Point',
      }
    },
    methods: {
      onStreetChange(e) {
        if (e) {
          getCommunity({streetId: e.value}).then(res => {
            if (res && res.success) {
              this.communityIdPriority = res.data;
            }
          });
        } else {
          this.communityIdPriority = [];
        }
        this.searchForm.communityId = '';
        this.gridsIdPriority = [];
        this.searchForm.gridsId = "";
        this.handleSearch();
      },

      inBind(row, index) {
        if (row.addressId && row.addressId.trim().length > 0) {
          this.$Message.error('您已经关联房屋，请勿继续操作！');
          return false;
        }
        this.title = "房屋绑定";
        this.bindShow = true;
        this.BasicSocialOrganizationId = row.id.toString();
      },
      //解绑
      outBind(row, index) {
        if (row.addressId == undefined || row.addressId == null || row.addressId.trim().length == 0) {
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
              data.address = "",
                data.addressId = "" ,
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
      //点击列表标注 修改坐标点
      editRow(row) {
        this.editId = row.id;
        if (row.position) {
          try {
            this.locationArr = JSON.parse(row.position);
          } catch (e) {
          }
        } else {
          this.locationArr = null;
        }
        this.ShowMap = true;
      },
      getLocation(obj, type) {
        let arr = obj.flatCoordinates;
        let position = JSON.stringify(arr);
        //修改当前行
        updateSocialOrganization({id: this.editId, position: position}).then(res => {
          if (res && res.code == 200) {
            this.$Message.success('保存成功');
            this.getDataList();
          } else {
            this.$Message.error(res.msg);
          }
        })
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
            data: this.csvData
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
          const fileName = '社会组织档案.xlsx';
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
      addBasicSocialOrganization() {
        this.title = '社会组织档案新增';
        this.updateShow = true;
        this.BasicSocialOrganizationId = '';
      },
      //编辑
      handleEdit(row, index) {
        this.title = '社会组织档案编辑';
        this.BasicSocialOrganizationId = row.id.toString();
        this.updateShow = true;
      },
      //查看
      handleLook(row, index) {
        this.title = '社会组织档案查看';
        this.BasicSocialOrganizationId = row.id.toString();
        this.lookShow = true;
      },
      //分页查询
      getDataList() {
        this.loading = true;
        this.searchForm.id = null;
        this.selectCount = 0;
        queryBasicSocialOrganizationList(this.searchForm).then(res => {
          if (res && res.success) {
            this.loading = false;
            this.data = res.data.records;
            this.total = res.data.total;
            this.csvData = JSON.parse(JSON.stringify(res.data.records))
          }
        });
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
        deleteBasicSocialOrganization({ids: ids}).then(res => {
          this.userLoading = false;
          this.$Modal.remove();
          if (res && res.success) {
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
      handleSearchPage() {
        this.getDataList();
        this.initData();
      },
      //重置
      handleReset() {
        this.$refs.searchForm.resetFields();
        this.searchForm.pageNumber = 1;
        this.searchForm.pageSize = 10;
        this.searchForm.startDate = null;
        this.searchForm.endDate = null;
        this.selectDate = null;
        this.searchForm.type = '';
        this.searchForm.name = '';
        this.searchForm.communityId = '';
        this.searchForm.gridsId = '';
        this.searchForm.streetId = '';
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
      getBasicSocialOrganizationColumns() {
        return [
          {
            type: 'selection',
            width: 60,
            align: 'center',
          },
          {
            title: '组织名称',
            align: 'center',
            key: 'name',
            tooltip: true,
            ellipsis: true,
            minWidth: 150,
          },
          {
            title: '组织类别',
            align: 'center',
            key: 'type',
            tooltip: true,
            ellipsis: true,
            minWidth: 100,
            render: (h, params) => {
              let filter = this.typePriority.filter(item => {
                return item.number == params.row.type;
              });
              let dataT = this.csvData.filter(item => item.id == params.row.id);
              if (filter && filter.length > 0) {
                dataT[0].type = '="' + filter[0].name + '"';
                return h('div', [
                  h('Tooltip', {
                    props: {
                      placement: 'bottom',
                      transfer: true
                    }
                  }, [filter[0].name, h('span', {
                    slot: 'content',
                    style: {
                      whiteSpace: 'normal'
                    }
                  }, filter[0].name)
                  ])
                ])
              }
            }
          },
          {
            title: '法人代表',
            align: 'center',
            key: 'legalPerson',
            tooltip: true,
            ellipsis: true,
            minWidth: 100,
          },
          {
            title: '所属街道',
            align: 'center',
            key: 'streetName',
            tooltip: true,
            ellipsis: true,
            minWidth: 100,
          },
          {
            title: '所属社区',
            align: 'center',
            key: 'communityName',
            tooltip: true,
            ellipsis: true,
            minWidth: 100,
          },
          {
            title: '所属网格',
            align: 'center',
            key: 'gridsName',
            minWidth: 100,
            ellipsis: true,
            tooltip: true,
          },
          {
            title: '创建时间',
            key: 'createTime',
            sortable: false,
            align: 'center',
            minWidth: 170,
            tooltip: true,
            render: (h, params) => {
              let newTime = formartDate(params.row.createTime, 'yyyy-MM-dd HH:mm:ss');
              let dataT = this.csvData.filter(item => item.id == params.row.id);
              dataT[0].createTime = '="' + newTime + '"';
              return h("Tooltip", {
                props: {
                  content: newTime,
                  placement: 'bottom',
                  transfer: true
                }
              }, newTime)
            }
          },
          {
            title: '操作',
            align: 'center',
            slot: 'action',
            width: 220,
          }
        ]
      },
      //动态列实现
      checkboxChange: function (data) {
        var columnss = this.getBasicSocialOrganizationColumns();
        this.columns = columnss.filter(function (v) {
          return data.indexOf(v.title) > -1 || v.type == 'selection'
        })
      },
      initData: function () {
        getGridsCountData().then(res => {
          if (res && res.success) {
            var gridsData = [], shanghu = [], qiye = [], zuzhi = [], jiaoyu = [], tuanti = [],
              weisheng = [], qita = [];
            res.data.map(i => {
              gridsData.push(i.gridName);
              shanghu.push(i.shanghu);
              qiye.push(i.qiye);
              zuzhi.push(i.zuzhi);
              jiaoyu.push(i.jiaoyu);
              tuanti.push(i.tuanti);
              weisheng.push(i.weisheng);
              qita.push(i.qita);
            });

            this.visitChart2.setOption({
              color: ["#FFCC21", "#67ACFE",  "#86B4F8", "#95DAFF", "#B4BAFF","#129BF9" ,"#61FFDF" ],
              tooltip: {
                trigger: 'axis',
              },
              legend: {
                show: true,
                icon: 'roundRect',
                orient: 'horizontal',
                right: '8%',
                itemWidth: 18.5,
                itemHeight: 6,
                itemGap: 30,
                textStyle: {
                  // color: '#FFFFFF'
                  // color: '#C9C8CD'
                }
              },
              // legend: {
              //   data: ['个体商户', '企业', '非盈利组织', '教育机构', '社会团体', '卫生事业组织', '其他']
              // },
              grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
              },
              xAxis: {
                type: 'value',
                boundaryGap: [0, 0.01]
              },
              yAxis: {
                type: 'category',
                //data: ['青莲社区第一网格', '合江亭社区第四网格', '合江亭社区第三网格', '合江亭社区第二网格', '合江亭社区第一网格']
                data: gridsData,
                axisPointer: { //轴指示器
                  type: 'shadow',
                  z: 1,
                  shadowStyle: {
                    color: {
                      type: 'linear',
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [{
                        offset: 0,
                        color: 'rgba(18,155,249,0)' // 0% 处的颜色
                      }, {
                        offset: 1,
                        color: 'rgba(18,155,249,1)' // 100% 处的颜色
                      }],
                      global: false // 缺省为 false
                    },
                    shadowColor: 'rgba(0, 0, 0, 0.2)',
                    shadowBlur: 5
                  }
                },
              },
              series: [
                {
                  name: '个体商户',
                  type: 'bar',
                  barWidth: '45%',
                  stack: '社区',
                  data: shanghu
                },
                {
                  name: '企业',
                  type: 'bar',
                  barWidth: '45%',
                  stack: '社区',
                  data: qiye
                }, {
                  name: '非营利组织',
                  type: 'bar',
                  barWidth: '45%',
                  stack: '社区',

                  data: zuzhi
                }
                , {
                  name: '教育机构',
                  type: 'bar',
                  barWidth: '45%',
                  stack: '社区',

                  data: jiaoyu
                }
                , {
                  name: '社会团体',
                  type: 'bar',
                  barWidth: '45%',
                  stack: '社区',
                  data: tuanti
                }, {
                  name: '卫生事业组织',
                  type: 'bar',
                  barWidth: '45%',
                  stack: '社区',
                  data: weisheng
                } , {
                  name: '其他',
                  type: 'bar',
                  barWidth: '45%',
                  stack: '社区',
                  data: qita
                }
              ]
            });
          }
        });


        getCommunityCountData().then(res => {
          if (res && res.success) {
            let item = [], shanghu = [], qiye = [], zuzhi = [], shehui = [], weisheng = [], qita = [],jiaoyu=[];
            res.data.map(i => {
              item.push(i.community_name);
              // seriesData.push({
              //   name: i.community_name,
              //   type: 'bar',
              //   data: [i.shanghu, i.qiye, i.tuanti, i.zuzhi, i.jiaoyu, i.weisheng, i.qita]
              // });
              shanghu.push(i.shanghu);
              qiye.push(i.qiye);
              zuzhi.push(i.zuzhi);
              shehui.push(i.tuanti);
              weisheng.push(i.weisheng);
              qita.push(i.qita);
              jiaoyu.push(i.jiaoyu);
            });
            let option = {
              backgroundColor: '#ffffff00',
              tooltip: {
                trigger: 'axis',
              },
              color: ["#FFCC21", "#67ACFE",  "#86B4F8", "#95DAFF", "#B4BAFF","#129BF9" ,"#61FFDF" ],
              grid: {
                left: '10%',
                top: '8%',
                right: '5%',
                bottom: '19%',
              },
              legend: {
                show: true,
                icon: 'rect',
                orient: 'horizontal',
                top: '0.5%',
                right: '8%',
                itemWidth: 18.5,
                itemHeight: 6,
                itemGap: 30,
                textStyle: {
                  // color: '#FFFFFF'
                  // color: '#C9C8CD'
                }
              },
              xAxis: [{
                type: 'category',
                data: item,
                axisLabel: {
                  show: true,
                  fontSize: 10,
                  textStyle: {
                    // color: "#000000" //X轴文字颜色
                  },
                  formatter: function (value) {
                    let str = "";
                    if (value && value.length > 0) {
                      for (let i = 0; i < value.length; i = i + 4) {
                        if (i + 4 < value.length) {
                          str += value.substring(i, i + 4) + "\n";
                        } else {
                          str += value.substring(i, value.length );
                        }
                      }
                    }
                    return str;
                  }
                },
                axisLine: {
                  show: true //不显示x轴
                },
                axisTick: {
                  show: true //不显示刻度
                },
                // boundaryGap: false,
                splitLine: {
                  show: true,
                  width: 0.08,
                  lineStyle: {
                    type: "solid",
                    color: "#f5f7f9"
                  }
                },
                axisPointer: { //轴指示器
                  type: 'shadow',
                  z: 1,
                  shadowStyle: {
                    color: {
                      type: 'linear',
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [{
                        offset: 0,
                        color: 'rgba(18,155,249,0)' // 0% 处的颜色
                      }, {
                        offset: 1,
                        color: 'rgba(18,155,249,1)' // 100% 处的颜色
                      }],
                      global: false // 缺省为 false
                    },
                    shadowColor: 'rgba(0, 0, 0, 0.2)',
                    shadowBlur: 5
                  }
                },

              }],
              yAxis: [{
                type: 'value',
                // scale: true, //坐标轴起点不限制0
                axisLabel: {
                  show: true,
                  textStyle: {
                    fontSize: 12,
                    // color: "#000000" //X轴文字颜色
                  }
                },
                splitLine: {
                  show: true,
                },
                axisTick: {
                  show: true, //不显示刻度
                },
                axisLine: {
                  show: true,
                },
                nameTextStyle: {
                  color: "#FFFFFF"
                },
                splitArea: {
                  show: false
                }
              }],
              series: [
                {
                  name: '个体商户',
                  type: 'bar',
                  barWidth: '45%',
                  stack: '网格',

                  data: shanghu
                },
                {
                  name: '企业',
                  type: 'bar',
                  barWidth: '45%',
                  stack: '网格',
                  data: qiye
                }, {
                  name: '非营利组织',
                  type: 'bar',
                  barWidth: '45%',
                  stack: '网格',
                  data: zuzhi
                }
                , {
                  name: '教育机构',
                  type: 'bar',
                  barWidth: '45%',
                  stack: '网格',
                  data: jiaoyu
                }
                , {
                  name: '社会团体',
                  type: 'bar',
                  barWidth: '45%',
                  stack: '网格',
                  data: shehui
                }
                , {
                  name: '卫生事业组织',
                  type: 'bar',
                  barWidth: '45%',
                  stack: '网格',
                  data: weisheng
                }
                , {
                  name: '其他',
                  type: 'bar',
                  barWidth: '45%',
                  stack: '网格',
                  data: qita
                }
              ]
            };

            this.visitChart.setOption(option);
            //
            // this.visitChart.setOption({
            //   tooltip: {
            //     trigger: 'axis',
            //     axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            //       type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            //     }
            //   },
            //   legend: {
            //     //data: ['合江亭社区', '青莲社区', '大慈寺社区', '崇德里社区', '其他']
            //     data: item
            //   },
            //   grid: {
            //     left: '3%',
            //     right: '4%',
            //     bottom: '3%',
            //     containLabel: true
            //   },
            //   xAxis: [
            //     {
            //       type: 'category',
            //       data: ['个体商户', '企业', '社会团体', '非盈利组织', '教育机构', '卫生事业组织', '其他']
            //     }
            //   ],
            //   yAxis: [
            //     {
            //       type: 'value'
            //     }
            //   ],
            //   series: seriesData
            //
            //   // series: [
            //   //     {
            //   //         name: '合江亭社区',
            //   //         type: 'bar',
            //   //         //data: [320, 332, 301, 334, 390, 330, 320]
            //   //     },
            //   //     {
            //   //         name: '青莲社区',
            //   //         type: 'bar',
            //   //         stack: '广告',
            //   //         data: [120, 132, 101, 134, 90, 230, 210]
            //   //     },
            //   //     {
            //   //         name: '大慈寺社区',
            //   //         type: 'bar',
            //   //         stack: '广告',
            //   //         data: [220, 182, 191, 234, 290, 330, 310]
            //   //     },
            //   //     {
            //   //         name: '崇德里社区',
            //   //         type: 'bar',
            //   //         stack: '广告',
            //   //         data: [150, 232, 201, 154, 190, 330, 410]
            //   //     },
            //   //     {
            //   //         name: '其他',
            //   //         type: 'bar',
            //   //         data: [862, 1018, 964, 1026, 1679, 1600, 1570],
            //   //         markLine: {
            //   //             lineStyle: {
            //   //                 type: 'dashed'
            //   //             },
            //   //             data: [
            //   //                 [{type: 'min'}, {type: 'max'}]
            //   //             ]
            //   //         }
            //   //     }
            //   // ]
            // });
          }
        });
      },
      onCommunityIdChange(e) {
        if (e) {
          this.gridsIdPriority = [];
          this.searchForm.gridsId = "";
          queryAllList({communityId: e.value}).then(res => {
            if (res && res.success) {
              for (let i = 0; i < res.data.length; i++) {
                this.gridsIdPriority.push({id: res.data[i].id, name: res.data[i].name});
              }
            }
          });
        } else {
          this.gridsIdPriority = [];
        }
        this.searchForm.gridsId = "";
        this.handleSearch();
      }
    },
    mounted() {
      this.visitChart = echarts.init(this.$refs.visitChart);
      this.visitChart2 = echarts.init(this.$refs.visitChart2);
      this.getDataList();
      this.initData();
      getStreet({}).then(res => {
        if (res && res.success) {
          this.streetArr = res.data;
        }
      });
      //社会组织类别下拉数据
      getDictionary({fieldName: 'socialOrganizationTypeData'}).then(res => {
        if (res && res.success) {
          this.typePriority = res.data;
        }
      });

    }
  }
</script>
<style scoped="less">
  .operation {
    margin-bottom: 10px;
  }
</style>
