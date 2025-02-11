<style lang="less">
  .cView {
    .ivu-form .ivu-row .ivu-form-item-label {
      width: 120px !important;
    }
    .ivu-col {
      height: 40px;
    }
    .ivu-table-tip {
      overflow-x: hidden !important;
    }
  }
</style>
<template>
  <Modal v-model="show" :title="editTitle" :mask-closable="false" class="cView" :draggable="false" width="970">
    <div style="max-height:800px;overflow-y:auto;overflow-x:hidden;">
    <Form ref="basicHousingCustomerForm" :model="basicHousingCustomerForm">
      <Row>
        <Col span="8">
          <FormItem label="姓名">
            {{basicHousingCustomerForm.name}}
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="性别">
            {{basicHousingCustomerForm.sex}}
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="出生日期">
            {{basicHousingCustomerForm.birth_date}}
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="8">
          <FormItem label="民族">
            {{basicHousingCustomerForm.nation}}
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="身份证号">
            {{basicHousingCustomerForm.card_id}}
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="人口类型">
            {{basicHousingCustomerForm.person_type}}
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="8">
          <FormItem label="政治面貌">
            {{basicHousingCustomerForm.political_face}}
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="户籍地址">
            {{basicHousingCustomerForm.residence_address}}
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="居住地址">
            {{basicHousingCustomerForm.residential_address}}
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="8">
          <FormItem label="是否特殊人群">
            {{basicHousingCustomerForm.special_population}}
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="联系电话">
            {{basicHousingCustomerForm.phone}}
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="是否常住网格">
            {{basicHousingCustomerForm.resident_grid}}
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="8">
          <FormItem label="所属街道">
            {{basicHousingCustomerForm.owned_street}}
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="所属社区">
            {{basicHousingCustomerForm.owned_community}}
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="所属网格">
            {{basicHousingCustomerForm.gridname}}
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="8">
          <FormItem label="小区名称">
            {{basicHousingCustomerForm.housename}}
          </FormItem>
        </Col>
      </Row>
    </Form>
    <div slot="footer">
      <Button type="text" @click="show=false">取消</Button>
    </div>
    </div>
  </Modal>
</template>
<script>
    import {
        getBasicHousing
    } from '@/api/zhsq/basicHouse/basicHouse'
    import {getAllBasicHousingManage} from '@/api/zhsq/baseHouseManage/basicHousingManage'

    export default {
        name: "updateBasicHousingCustomer",
        props: {
            value: {
                type: Boolean,
                default: false
            },
            rowData: {
                type: Object
            },
            modalTitle: {
                type: String
            }
        },
        data() {
            return {
                rowDataObj: this.rowData,
                show: this.value,
                editTitle: this.modalTitle,
                loading: true,
                disabled: false,
                data: [],
                basicHousingCustomerForm: {
                    name: '',
                    sex: '',
                    birth_date: '',
                    nation: '',
                    card_id: '',
                    person_type: '',
                    political_face: '',
                    residence_address: '',
                    residential_address: '',
                    special_population: '',
                    phone: '',
                    resident_grid: '',
                    owned_street: '',
                    owned_community: '',
                    gridname: '',
                    housename: ''
                },
                searchForm: {
                    houseStreet: ''
                },
                basicHouseManage: [],
                columns: this.getBasicHousingManageColumns()
            }
        },
        methods: {
            closeModal(val) {
                this.$emit('input', val);
            },
            initForm() {
                this.basicHousingCustomerForm = {
                    name: '',
                    sex: '',
                    birth_date: '',
                    nation: '',
                    card_id: '',
                    person_type: '',
                    political_face: '',
                    residence_address: '',
                    residential_address: '',
                    special_population: '',
                    phone: '',
                    resident_grid: '',
                    owned_street: '',
                    owned_community: '',
                    gridname: '',
                    housename: ''
                };
            },
            //获取列表字段
            getBasicHousingManageColumns() {
                return [
                    {
                        title: '人口类型',
                        align: 'center',
                        key: 'personType',
                        tooltip: true,
                    },
                    {
                        title: '姓名',
                        align: 'center',
                        key: 'name',
                        sortable: false,
                        tooltip: true,
                    },
                    {
                        title: '性别',
                        align: 'center',
                        key: 'sex',
                        tooltip: true,
                    },
                    {
                        title: '出生日期',
                        key: 'birthDate',
                        align: 'center',
                        tooltip: true
                    },
                    {
                        title: '民族',
                        align: 'center',
                        key: 'nation',
                        tooltip: true,
                    },
                    {
                        title: '身份证号',
                        align: 'center',
                        key: 'cardId',
                        tooltip: true,
                    },
                    {
                        title: '户籍地址',
                        align: 'center',
                        key: 'residenceAddress',
                        tooltip: true,
                    },
                    {
                        title: '居住地址',
                        align: 'center',
                        key: 'residentialAddress',
                        tooltip: true,
                    }
                ]
            },
        },
        watch: {
            value(val) {
                this.show = val;
            },
            show(val) {
                this.initForm();
                this.loading = false;
                this.editTitle = this.modalTitle;
                if (val) {
                    if (this.rowData) {
                        this.basicHousingCustomerForm.name = this.rowData.name;
                        this.basicHousingCustomerForm.sex = this.rowData.sex;
                        this.basicHousingCustomerForm.birth_date = this.rowData.birth_date;
                        this.basicHousingCustomerForm.nation = this.rowData.nation;
                        this.basicHousingCustomerForm.card_id = this.rowData.card_id;
                        this.basicHousingCustomerForm.person_type = this.rowData.person_type;
                        this.basicHousingCustomerForm.political_face = this.rowData.political_face;
                        this.basicHousingCustomerForm.residence_address = this.rowData.residence_address;
                        this.basicHousingCustomerForm.residential_address = this.rowData.residential_address;
                        this.basicHousingCustomerForm.special_population = this.rowData.special_population;
                        this.basicHousingCustomerForm.phone = this.rowData.phone;
                        this.basicHousingCustomerForm.resident_grid = this.rowData.resident_grid;
                        this.basicHousingCustomerForm.owned_street = this.rowData.owned_street;
                        this.basicHousingCustomerForm.owned_community = this.rowData.owned_community;
                        this.basicHousingCustomerForm.gridname = this.rowData.gridname;
                        this.basicHousingCustomerForm.housename = this.rowData.housename;
                    }
                } else {
                    this.closeModal(val);
                }
            }
        }
    }
</script>
