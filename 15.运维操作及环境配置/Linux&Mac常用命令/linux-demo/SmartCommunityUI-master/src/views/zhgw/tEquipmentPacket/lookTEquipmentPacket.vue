<style lang="less" scoped>
  .tEquipmentPacket {
    .form-item-input {
      width: 200px;
    }

    .ivu-form-item-error-tip {
      left: 80px;
    }

    .ivu-form .ivu-form-item-label {
      width: 120px;
      text-align: right;
    }
  }
</style>
<template>
  <Modal v-model="show" :title="editTitle" :mask-closable="false" width="600px">
    <Form ref="tEquipmentPacketForm" :label-width="90" :model="tEquipmentPacketForm" class="tEquipmentPacket">
      <Row>
        <Col span="12">
          <FormItem label="分组名称">
            {{tEquipmentPacketForm.packetName}}
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="所属地区">
            {{tEquipmentPacketForm.region}}
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="责任人">
            {{tEquipmentPacketForm.responsiblePerson}}
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="责任人头像">
<!--            <Row>-->
<!--                <img v-for="(item, i)  in imageUrlList" :key="Math.random()" :src="item" class="upImg" style='height: 80px;width: 80px'>-->
<!--            </Row>-->
            <div v-if="imageUrlList.length>0" v-viewer="{movable: false}" class="imgWrap">
              <div class="shadow">
                <Icon type="ios-eye-outline" size="40" color="#fff" @click.native="handleView()"/>
              </div>
              <img v-for="(item, i)  in imageUrlList" :key="Math.random()" :src="item" class="upImg">
            </div>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="联系电话" style="margin: -100px 0px;">
            {{tEquipmentPacketForm.phone}}
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="设备数量" style="margin: -40px 0px;">
            {{tEquipmentPacketForm.equipmentNumber}}
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
  import {getTEquipmentPacket} from '@/api/zhgw/tEquipmentPacket/tEquipmentPacket'
  import {nginxUrl} from '@/api/tools/tool'

  export default {
    name: "lookTEquipmentPacket",
    props: {
      value: {
        type: Boolean,
        default: false
      },
      TEquipmentPacketId: {
        type: String
      },
      equipmentNumber: {
        type: String
      },
      modalTitle: {
        type: String
      }
    },
    data() {
      return {
        imageUrlList:[],
        show: this.value,
        editTitle: this.modalTitle,
        disabled: false,
        tEquipmentPacketForm: {
          packetName: '',
          region: '',
          responsiblePerson: '',
          phone: '',
          equipmentNumber: '',
          // avatarPath:"",
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
        this.tEquipmentPacketForm = {
          packetName: '',
          region: '',
          responsiblePerson: '',
          phone: '',
          equipmentNumber: '',
          avatarPath:"",
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
          this.$refs['tEquipmentPacketForm'].resetFields();
          if (this.TEquipmentPacketId != null && this.TEquipmentPacketId.trim().length > 0) {
            this.imageUrlList = [];
            getTEquipmentPacket({id: this.TEquipmentPacketId}).then(res => {
              if (res && res.code == 200) {
                this.tEquipmentPacketForm.packetName = res.data.packetName;
                this.tEquipmentPacketForm.responsiblePerson = res.data.responsiblePerson;
                this.tEquipmentPacketForm.phone = res.data.phone;
                this.tEquipmentPacketForm.region = res.data.regionName;
                this.tEquipmentPacketForm.equipmentNumber = res.data.equipmentNumber;
                this.imageUrlList.push(nginxUrl + res.data.avatarPath);
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
