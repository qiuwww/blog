<style lang="less">
  .tEquipmentPacketSelectList {
    max-height: calc(50vh);
  }
</style>
<template>
  <Modal v-model="show" title="设备分组" :mask-closable="false" :width="900">
    <div class="tEquipmentPacketSelectList">
      <Card>
        <Row @keydown.enter.native="handleSearch">
          <Form ref="searchForm" :model="searchForm" inline :label-width="70">
            <Form-item label="分组名称">
              <Input type="text" v-model="searchForm.packetName" placeholder="请输入分组名称"/>
            </Form-item>
            <Form-item label="所属区域">
              <Select v-model="searchForm.region" placeholder="请选择区域" clearable style="width: 150px;">
                <Option v-for="(item, i)  in regionPriority" :key="item.id" :value="item.label.toString()">{{item.label}}</Option>
              </Select>
            </Form-item>
            <Form-item label="责任人" v-if="drop">
              <Input type="text" v-model="searchForm.responsiblePerson" placeholder="请输入责任人姓名"/>
            </Form-item>
            <Form-item style="margin-left:-35px" class="br">
              <Button @click="handleSearch" type="primary" icon="ios-search">搜索</Button>
              <Button @click="handleReset">重置</Button>
            </Form-item>
          </Form>
        </Row>
        <Row>
          <Table :loading="loading" border :columns="columns" sortable="custom" :data="data" @on-sort-change="changeSort" ref="table">
          </Table>
        </Row>
        <Row type="flex" justify="end" class="page">
          <Page :current="searchForm.pageNumber" :total="total" :page-size="searchForm.pageSize" @on-change="changePage"
                @on-page-size-change="changePageSize" :page-size-opts="[10,20,50,100]" size="small" show-total show-elevator show-sizer></Page>
        </Row>
      </Card>
    </div>

    <div slot="footer">
      <Button type="text" @click="show=false">取消</Button>
      <Button type="primary" :loading="loading" @click="editEquipmentPacket">提交</Button>
    </div>
  </Modal>
</template>
<script>
    import {queryTEquipmentPacketList} from '@/api/zhgw/tEquipmentPacket/tEquipmentPacket'
    import {getTEquipmentManagement, updateTEquipmentManagement} from '@/api/zhgw/tEquipmentManagement/tEquipmentManagement'
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
                regionPriority: [],
                columns: this.getTEquipmentPacketColumns(),
                searchForm: {
                    // 搜索框对应data对象
                    pageNumber: 1, // 当前页数
                    pageSize: 10, // 页面大小
                    startDate: null,//开始时间
                    endDate: null,//结束时间
                    sort: 'createTime', // 默认排序字段
                    order: 'desc', // 默认排序方式
                    packetName: "",
                    region: "",
                    responsiblePerson: "",
                    equipmentNumber: ""
                },
                total: 0,
                loading: false,

                show: this.value,
                equipmentPacketId: ''
            }
        },
        methods: {
            //所属地区
            getRegionPriority() {
                getDictDataByType('dept_name').then(res => {
                    if (res && res.success) {
                        this.regionPriority = res.data;
                    }
                });
            },
            //分页查询
            getDataList() {
                this.loading = true;
                this.searchForm.id = null;
                queryTEquipmentPacketList(this.searchForm).then(res => {
                    if (res && res.success) {
                        this.data = res.data.records;
                        this.total = res.data.total;
                        for (let i = 0; i < this.data.length; i++) {
                            if (this.data[i].id == this.equipmentPacketId) {
                                this.data[i].checkBox = true;
                                break;
                            }
                        }
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
                this.searchForm.startDate = null;
                this.searchForm.endDate = null;
                this.selectDate = null;
                this.searchForm.packetName = "";
                this.searchForm.region = "";
                this.searchForm.responsiblePerson = "";
                this.searchForm.equipmentNumber = "";
                // 重新加载数据
                this.getDataList();
            },
            //获取列表字段
            getTEquipmentPacketColumns() {
                return [
                    {
                        title: '选中',
                        align: 'center',
                        key: 'checkBox',
                        width: 65,
                        render: (h, params) => {
                            return h('div', [
                                h('Checkbox', {
                                    props: {
                                        value: params.row.checkBox
                                    },
                                    on: {
                                        'on-change': (e) => {
                                            this.data.forEach((items) => {      //先取消所有对象的勾选，checkBox设置为false
                                                this.$set(items, 'checkBox', false)
                                            });
                                            this.data[params.index].checkBox = e;  //再将勾选的对象的checkBox设置为true
                                        }
                                    }
                                })
                            ])
                        }
                    },
                    {
                        title: '分组名称',
                        align: 'center',
                        key: 'packetName',
                        sortable: false,
                        minWidth: 100
                    },
                    {
                        title: '所属区域',
                        align: 'center',
                        key: 'region',
                        sortable: false,
                        minWidth: 90
                    },
                    {
                        title: '责任人',
                        align: 'center',
                        key: 'responsiblePerson',
                        sortable: false,
                        minWidth: 100
                    },
                    {
                        title: '手机号码',
                        align: 'center',
                        key: 'phone',
                        sortable: false,
                        minWidth: 110
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
            editEquipmentPacket() {
                let equipmentPacketId = '';
                for (let i = 0; i < this.data.length; i++) {
                    if (this.data[i].checkBox) {
                        equipmentPacketId = this.data[i].id;
                        break;
                    }
                }
                if (equipmentPacketId) {
                    updateTEquipmentManagement({id: this.TEquipmentPacketId, equipmentPacketId: equipmentPacketId}).then(res => {
                        if (res && res.success) {
                            this.$Message.success("保存分组成功！");
                            this.closeModal(false);
                            this.$emit('handleSearch');
                        } else {
                            this.$Message.error("保存分组失败！");
                        }
                    });
                } else {
                    this.$Message.error("请选择一个分组");
                }
            }
        },
        mounted() {

        },
        watch: {
            value(val) {
                this.show = val;
            },
            show(val) {
                if (val) {
                    this.getRegionPriority();
                    if (this.TEquipmentPacketId) {
                        //获取对应的设备分组
                        getTEquipmentManagement({id: this.TEquipmentPacketId}).then(res => {
                            if (res && res.success) {
                                this.equipmentPacketId = res.data.equipmentPacketId;
                                this.getDataList();
                            }
                        });
                    }
                } else {
                    this.data = [];
                    this.equipmentPacketId = "";
                    this.closeModal(val);
                }
            }
        }
    }
</script>
