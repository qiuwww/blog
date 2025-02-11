<style lang="less">
  .tEquipmentManagementSelectNumber {
    max-height: calc(50vh);
  }
</style>
<template>
  <Modal v-model="show" title="设备绑定" :mask-closable="false" :width="900">
    <div class="tEquipmentManagementSelectList">
      <Card>
        <Row @keydown.enter.native="handleSearch">
          <Form ref="searchForm" :model="searchForm" inline :label-width="70">
            <Form-item label="设备名称">
              <Input type="text" v-model="searchForm.name" placeholder="请输入设备名称"/>
            </Form-item>
            <Form-item label="设备类型">
              <Select v-model="searchForm.type" placeholder="请选择设备类型" clearable>
                <Option v-for="(item, i)  in typePriority" :key="item.id" :value="item.id.toString()">{{item.label}}</Option>
              </Select>
            </Form-item>
            <Form-item label="设备编号" v-if="drop">
              <Input type="text" v-model="searchForm.number" placeholder="请输入设备编号"/>
            </Form-item>
            <Form-item style="margin-left:-35px" class="br">
              <Button @click="handleSearch" type="primary" icon="ios-search">搜索</Button>
              <Button @click="handleReset">重置</Button>
            </Form-item>
          </Form>
        </Row>
        <Row>
          <Table :loading="loading" border :columns="columns" sortable="custom" :data="data"
                 @on-sort-change="changeSort" ref="table">
          </Table>
        </Row>
        <Row type="flex" justify="end" class="page">
          <Page :current="searchForm.pageNumber" :total="total" :page-size="searchForm.pageSize" @on-change="changePage"
                @on-page-size-change="changePageSize" :page-size-opts="[10,20,50,100]" size="small" show-total show-elevator
                show-sizer></Page>
        </Row>
      </Card>
    </div>

    <div slot="footer">
      <Button type="text" @click="show=false">取消</Button>
      <!--      <Button type="primary" :loading="loading" @click="editEquipmentPacket">提交</Button>-->
    </div>
  </Modal>
</template>
<script>
  import {queryTEquipmentManagementList} from '@/api/zhgw/tEquipmentManagement/tEquipmentManagement'
  import {getDictDataByType} from '@/api/index';

  export default {
    components: {},
    props: {
      value: {
        type: Boolean,
        default: false
      },
      TEquipmentPacketId: {
        type: String
      }
    },
    data() {
      return {
        drop: false,
        dropDownContent: "展开",
        dropDownIcon: "ios-arrow-down",
        search: '',
        data: [],
        csvData: [],
        typePriority: [],
        columns: this.getTEquipmentManagementColumns(),
        openSearch: true,//打开搜索
        openTip: true,//打开提示
        selectCount: 0, // 多选计数
        selectList: [], // 多选数据
        searchForm: {
          type: '',
          name: '',
          pageNumber: 1, // 当前页数
          pageSize: 10, // 页面大小
          startDate: null,//开始时间
          endDate: null,//结束时间
          sort: 'createTime', // 默认排序字段
          order: 'desc' // 默认排序方式
        },
        total: 0,
        loading: false,
        show: this.value,
        equipmentManagementId: ''
      }
    },
    methods: {
      //设备类型
      getTypePriority() {
        getDictDataByType('equipment_type').then(res => {
          if (res && res.success) {
            this.typePriority = res.data;
          }
        });
      },
      //分页查询
      getDataList() {
        this.loading = true;
        this.searchForm.equipmentPacketId = this.TEquipmentPacketId;
        queryTEquipmentManagementList(this.searchForm).then(res => {
          if (res && res.success) {
            this.data = res.data.records;
            this.csvData = JSON.parse(JSON.stringify(this.data));
            this.total = res.data.total;
          }
        }).finally(res => {
          this.loading = false;
        });
      },
      //改变页码
      changePage(v) {
        this.searchForm.pageNumber = v;
        this.getDataList();
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
      //重置
      handleReset() {
        this.$refs.searchForm.resetFields();
        this.searchForm.pageNumber = 1;
        this.searchForm.pageSize = 10;
        this.searchForm.name = "";
        this.searchForm.type = "";
        // 重新加载数据
        this.getDataList();
      },
      //获取列表字段
      getTEquipmentManagementColumns() {
        return [
          {
            title: '设备编号',
            align: 'center',
            key: 'number',
            sortable: false,
            minWidth: 100
          },
          {
            title: '设备名称',
            align: 'center',
            key: 'name',
            sortable: false,
            minWidth: 100
          },
          {
            title: '设备类型',
            align: 'center',
            key: 'typeName',
            sortable: false,
            minWidth: 90
          },
          {
            title: '设备地址',
            align: 'center',
            key: 'address',
            sortable: false,
            minWidth: 100
          },
          {
            title: '经纬度',
            align: 'center',
            key: 'equipmentPosition',
            sortable: false,
            minWidth: 110,
            render: (h, params) => {
              let position = params.row.equipmentPosition ? '已标注' : '未标注';
              let datad = this.csvData.filter(item => item.id == params.row.id);
              datad[0].equipmentPosition = position;
              if (params.row.equipmentPosition) {
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'success',
                      size: 'small'
                    },
                    on: {
                      click: () => {
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
                      },
                    },
                  }, '未标注')])
              }
            }
          },
          {
            title: '创建时间',
            key: 'createTime',
            sortable: true,
            align: 'center',
            width: 180
          }
        ]
      },
      closeModal(val) {
        this.$emit('input', val);
      },
    },
    mounted() {

    },
    watch: {
      value(val) {
        this.show = val;
      },
      show(val) {
        if (val) {
          this.getTypePriority();

          if (this.TEquipmentPacketId) {
            //获取对应数量的设备
            this.getDataList();
          }
        } else {
          this.data = [];
          this.equipmentManagementId = "";
          this.closeModal(val);
        }
      }
    }
  }
</script>
