<style lang="less" scoped>
  .tEquipmentManagement {
    .form-item-input {
      width: 200px;
    }

    .ivu-form-item-error-tip {
      left: 80px;
    }

    .ivu-form .ivu-form-item-label {
      width: 120px;
    }
  }
</style>
<template>
  <Modal v-model="show" :title="editTitle" :mask-closable="false" width="600px">
    <Form ref="tEquipmentManagementForm" :label-width="90" :model="tEquipmentManagementForm" class="tEquipmentManagement">
      <Row>
        <Col span="12">
          <FormItem label="设备名称">
            {{tEquipmentManagementForm.name}}
          </FormItem>
        </Col>
         <Col span="12">
          <FormItem label="类型">
            {{tEquipmentManagementForm.type}}
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="分组">
            {{tEquipmentManagementForm.equipmentGroup}}
          </FormItem>
        </Col>
        <Row>
          <Col span="12" style="position: absolute;right: 0px;">
            <FormItem label="设备编号">
              <!-- {{tEquipmentManagementForm.number}} -->
<!--              <vue-qr :text="tEquipmentManagementForm.number" :size="100" :margin="5" class="imgWrap"></vue-qr>-->
              <div v-viewer="{movable: false}" class="imgWrap">
                <div class="shadow">
                  <Icon type="ios-eye-outline" size="40" color="#fff" @click.native="handleView()"/>
                </div>
                <vue-qr :text="tEquipmentManagementForm.number" :size="135" :margin="5" style="margin: 0px 0px" class="upImg"></vue-qr>
              </div>
            </FormItem>
        </Col>
        </Row>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="经纬度">
            {{tEquipmentManagementForm.equipmentPosition}}
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="24">
          <FormItem label="设备地址">
            {{tEquipmentManagementForm.address}}
          </FormItem>
        </Col>
      </Row>
    </Form>
    <div slot="footer">
      <Button type="text" @click="show=false">取消</Button>
    </div>
  </Modal>
</template>
<script>
    import {getTEquipmentManagement} from '@/api/zhgw/tEquipmentManagement/tEquipmentManagement'
    // import {getDictDataByType} from '@/api/index';
    import VueQr from 'vue-qr';//二维码
    export default {
        name: "lookTEquipmentManagement",
        components: {
            VueQr,//二维码
        },
        props: {
            value: {
                type: Boolean,
                default: false
            },
            TEquipmentManagementId: {
                type: String
            },
            modalTitle: {
                type: String
            }
        },
        data() {
            return {
                show: this.value,
                editTitle: this.modalTitle,
                disabled: false,
                tEquipmentManagementForm: {
                    number: '',
                    name: '',
                    address: '',
                    equipmentPosition: '',
                    equipmentGroup: '',
                    type: '',
                },
            }
        },
        methods: {
          // 图片查看
          handleView() {
            const viewer = this.$el.querySelector('.imgWrap').$viewer;
            viewer.show();
          },
            closeModal(val) {
                this.$emit('input', val);
            },
            initForm() {
                this.tEquipmentManagementForm = {
                    number: '',
                    name: '',
                    address: '',
                    equipmentPosition: '',
                    equipmentGroup: '',
                    type: '',
                };
            }
        },
        watch: {
            value(val) {
                this.show = val;
            },
            show(val) {
                this.initForm();
                this.editTitle = this.modalTitle;
                if (val) {
                    this.$refs['tEquipmentManagementForm'].resetFields();
                    if (this.TEquipmentManagementId != null && this.TEquipmentManagementId.trim().length > 0) {
                        getTEquipmentManagement({id: this.TEquipmentManagementId}).then(res => {
                            if (res && res.code == 200) {
                                this.tEquipmentManagementForm.number = res.data.number;
                                this.tEquipmentManagementForm.name = res.data.name;
                                this.tEquipmentManagementForm.address = res.data.address;
                                // this.tEquipmentManagementForm.equipmentPosition = res.data.equipmentPosition;
                                if(res.data.equipmentPosition.length){
                                  this.tEquipmentManagementForm.equipmentPosition = "已标注"
                                }else{
                                  this.tEquipmentManagementForm.equipmentPosition = "未标注"
                                }
                                this.tEquipmentManagementForm.equipmentGroup = res.data.equipmentPacketName;
                                /* getDictDataByType('equipment_type').then(re => {
                                    if (re.success) {
                                        let arr = re.data.filter(item => item.id == res.data.type);
                                        if (arr.length > 0) {
                                            this.tEquipmentManagementForm.type = arr[0].label;
                                        }
                                    }
                                }); */
                                this.tEquipmentManagementForm.type = res.data.typeName;
                            } else {
                                this.$Message.error(res.msg);
                            }
                        });
                    }
                } else {
                    this.closeModal(val);
                }
            }
        }
    }
</script>
