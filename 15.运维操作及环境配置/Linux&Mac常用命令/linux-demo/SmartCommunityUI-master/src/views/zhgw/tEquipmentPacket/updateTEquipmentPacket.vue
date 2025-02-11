<style lang="less">
  .tEquipmentPacket {
    .ivu-modal {
      width: 660px !important;
      top: 50%;
      transform: translateY(-50%);
    }

    .form-item-input {
      width: 200px;
    }

    .ivu-form-item-error-tip {
      left: 80px;
    }

    .ivu-form .ivu-form-item-label {
      width: 120px;
    }

    .ivu-select {
      width: 180px;
    }

    .ivu-input-wrapper {
      width: auto !important;
    }

    .mapcontainer {
      position: fixed;
      z-index: 999;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .ivu-dropdown {
      position: absolute;
      bottom: -1px;
      right: 23px;
    }
    .ivu-dropdown .ivu-select-dropdown {
      width: 188px;
      left: -169px !important;
    }
    .ivu-tree ul {

      padding-left: 12px;
    }
  }
</style>
<template>
  <Modal v-model="show" :title="editTitle" :mask-closable="false" width="600px">
    <Form ref="tEquipmentPacketForm" :model="tEquipmentPacketForm" :rules="tEquipmentPacketFormRule"
          class="tEquipmentPacket" style="height: 200px;">
      <Row>
        <Col span="12">
          <FormItem label="分组名称" prop="packetName">
            <Input v-bind:disabled="disabled" type="text" :maxlength=50 v-model="tEquipmentPacketForm.packetName"
                   placeholder="请输入分组名称"/>
          </FormItem>
        </Col>
        <Col span="12" style="position: absolute;margin: 54px 0px;">
<!--          <FormItem label="所属区域" prop="region">-->
<!--            <Select v-bind:disabled="disabled" v-model="tEquipmentPacketForm.region" placeholder="请选择" clearable-->
<!--                    style="width: 186px">-->
<!--              <Option v-for="(item, i)  in regionPriority" :key="item.id" :value="item.id.toString()">{{item.name}}</Option>-->
<!--            </Select>-->
<!--          </FormItem>-->
          <FormItem label="所属地区" prop="region" >
            <i-input v-bind:disabled="disabled" v-model="selectModel" placeholder="请选择" readonly>
            </i-input>
            <Dropdown trigger="custom" :visible="departVisible" placement="bottom-end">
              <a href="javascript:void(0)" @click="departVisible=!departVisible">
                <Icon type="ios-arrow-down" v-bind:class="{departVisibleSelectIcon:departVisible}"></Icon>
              </a>
              <DropdownMenu slot="list">
                <Tree v-bind:data="pidPriority" @on-select-change="handleCheckChange">
                </Tree>
              </DropdownMenu>
            </Dropdown>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="责任人" prop="responsiblePerson" style="position: absolute;margin: 54px 14px;width: 260px;">
            <Input v-bind:disabled="disabled" type="text" :maxlength=50 v-model="tEquipmentPacketForm.responsiblePerson"
                   placeholder="请输入责任人"/>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="手机号码" prop="phone" style="position: absolute;margin: 108px 0px;width: 300px">
            <Input v-bind:disabled="disabled" type="text" :maxlength=50 v-model="tEquipmentPacketForm.phone"
                   placeholder="请输入手机号码"/>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12" style="position: absolute;margin: -56px 300px;">
          <FormItem label="头像" style="height: 120px;margin-left: 35px;">
            <Row style="margin-left: 35px;">
              <div v-if="imageUrlList.length>0" v-viewer="{movable: false}" class="imgWrap">
                <div class="shadow">
                  <Icon type="ios-eye-outline" size="40" color="#fff" @click.native="handleView()"/>
                  <Icon type="ios-trash-outline" size="40" color="#fff" @click.native="handleRemove()"/>
                </div>
                <img v-for="(item, i)  in imageUrlList" :key="Math.random()" :src="item" class="upImg">
              </div>
              <div v-else class="noImg" @click="choiceFile">点击上传头像</div>
              <input
                id="people-export"
                ref="filElem"
                type="file"
                accept="image/*"
                style="display: none;"
                @change="fileUpload"
              >
            </Row>
          </FormItem>
        </Col>
      </Row>
    </Form>
    <div slot="footer">
      <Button type="text" @click="show=false">取消</Button>
      <Button type="primary" :loading="loading" @click="handelSubmit">提交</Button>
    </div>
  </Modal>
</template>
<script>
  import {
    addTEquipmentPacket,
    getTEquipmentPacket,
    updateTEquipmentPacket
  } from '@/api/zhgw/tEquipmentPacket/tEquipmentPacket'
  import {formartDate, nginxUrl} from '@/api/tools/tool'
  import {getAllDepList,getDept} from '@/api/system/dept'

  export default {
    name: "updateTEquipmentPacket",
    props: {
      value: {
        type: Boolean,
        default: false
      },
      TEquipmentPacketId: {
        type: String
      },
      modalTitle: {
        type: String
      }
    },
    data() {
      return {
        isNotEdit:true,
        pidPriority: [],
        departVisible: false,
        selectModel: "",
        imageUrlList: [],
        imgShow: false,
        show: this.value,
        editTitle: this.modalTitle,
        loading: true,
        disabled: false,
        regionPriority: [],
        tEquipmentPacketForm: {
          pid: '',
          packetName: '',
          region: '',
          responsiblePerson: '',
          phone: '',
          equipmentNumber: '',
          createTimeTime: '',
          createTime: '',
          avatarPath: '',
          imageIsUpdate: false,
        },
        tEquipmentPacketFormRule: this.getTEquipmentPacketFormRule()
      }
    },
    methods: {
      fileUpload() {
        const _this = this;
        const inputFile = this.$refs.filElem.files[0];
        if (inputFile) {
          const reader = new FileReader();
          reader.readAsDataURL(inputFile);
          reader.onload = () => {
            _this.imageUrlList = [];
            _this.imageUrlList.push(reader.result);
            _this.imgShow = true;
            _this.tEquipmentPacketForm.avatarPath = reader.result;
            _this.tEquipmentPacketForm.imageIsUpdate = true;
          }
        } else {
          this.$Message.error('请选择图片')
        }
        this.$refs.filElem.value = null
      },
      // 图片查看
      handleView() {
        const viewer = this.$el.querySelector('.imgWrap').$viewer;
        viewer.show();
      },
      // 移除图片
      handleRemove() {
        this.imageUrlList = [];
        this.tEquipmentPacketForm.avatarPath = '';
      },
      // getRegionPriority() {
      //   getDept('').then(res => {
      //     if (res.content) {
      //       this.regionPriority = this.getTreeData(res.content);
      //     }
      //   });
      //   // getDictDataByType('dept_name').then(res => {
      //   // 	if (res && res.success) {
      //   // 		 this.regionPriority = this.getTreeData(res.data);
      //   // 	}
      //   // });
      // },
      //获取上级部门
      getPidPriority() {
        getDept('').then(res => {
          if (res.content) {
            this.pidPriority = this.getTreeData(res.content);
          }
        });
      },
      //生成部门
      getTreeData(data) {
        if (data) {
          for (let i in data) {
            var item = data[i];
            data[i].title = data[i].label;
            data[i].value = data[i].id;
            data[i].expand = true;
            if (data[i].children) {
              data[i].children = this.getTreeData(data[i].children);
            }
          }
        }
        return data;
      },
      setCreateTime(e) {
        this.tEquipmentPacketForm.createTime = e;
      },
      handelSubmit() {
        this.$refs['tEquipmentPacketForm'].validate((valid) => {
          this.loading = true;
          if (valid) {
            if (this.TEquipmentPacketId != null && this.TEquipmentPacketId.trim().length > 0) {
              this.tEquipmentPacketForm.id = this.TEquipmentPacketId;
              updateTEquipmentPacket(this.tEquipmentPacketForm).then(res => {
                this.loading = false;
                if (res && res.code == 200) {
                  this.closeModal(false);
                  this.$emit('handleSearch');
                  this.$Message.success('保存成功');
                } else {
                  this.$Message.error(res.msg);
                }
              })
            } else {
              addTEquipmentPacket(this.tEquipmentPacketForm).then(res => {
                if (res && res.code == 200) {
                  this.closeModal(false);
                  this.$emit('handleSearch');
                  this.$Message.success('保存成功');
                } else {
                  this.$Message.error(res.msg);
                }
              })
            }
          } else {
            this.loading = false;
            this.$Message.error('表单验证不通过！');
          }
        });
      },
      closeModal(val) {
        this.$emit('input', val);
      },
      choiceFile() {
        this.$refs.filElem.dispatchEvent(new MouseEvent('click'))
      },
      //部门树点击事件
      handleCheckChange(data) {
        this.tEquipmentPacketForm.region = data[0].value;
        this.departVisible = false;
        this.selectModel = data[0].title;
      },
      initForm() {
        this.departVisible = false;
        this.selectModel = "";
        this.imageUrlList = [];
        this.tEquipmentPacketForm = {
          pid:"",
          packetName: '',
          region: '',
          responsiblePerson: '',
          phone: '',
          equipmentNumber: '',
          createTimeTime: '',
          createTime: '',
        };
      },
      getTEquipmentPacketFormRule() {
        return {
          packetName: [
            {required: true, message: '分组名称不能为空！', trigger: 'blur'},
            {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
          ],
          region: [
            {required: true, pattern: /.+/, message: '所属区域不能为空！', trigger: 'blur'},
          ],
          responsiblePerson: [
            {required: true, message: '责任人不能为空！', trigger: 'blur',},
            {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
          ],
          phone: [
            {required: true, message: '电话不能为空！', trigger: 'blur'},
            {pattern: /^[0-9]+$/, message: '请输入数字格式', trigger: 'blur'},
            {pattern: /^1[3456789]\d{9}$/, message: "电话格式不正确", trigger: "blur"},
            {type: 'string', max: 11, message: '电话的最大长度为11！', trigger: 'blur'}
          ],
          // equipmentNumber: [
          // 	{required: true, message: '设备数量不能为空！', trigger: 'blur'},
          // 	{type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
          // ],
          // createTimeTime: [
          // 	{required: true, message: '创建时间不能为空！', trigger: 'blur',pattern: /.+/ },
          // ],
        }
      }
    },
    watch: {
      value(val) {
        this.show = val;
      },
      show(val) {
        this.getPidPriority();
        this.isNotEdit = true;
        // this.getRegionPriority();
        this.initForm();
        this.loading = false;
        this.editTitle = this.modalTitle;
        if (this.editTitle == "查看") {
          this.disabled = true;
        } else {
          this.disabled = false;
        }
        if (val) {
          this.$refs['tEquipmentPacketForm'].resetFields();
          if (this.TEquipmentPacketId != null && this.TEquipmentPacketId.trim().length > 0) {
            this.isNotEdit = false;
            getTEquipmentPacket({id: this.TEquipmentPacketId}).then(res => {
              if (res && res.code == 200) {
                this.tEquipmentPacketForm.packetName = res.data.packetName;
                this.tEquipmentPacketForm.region = res.data.region;
                this.tEquipmentPacketForm.responsiblePerson = res.data.responsiblePerson;
                this.tEquipmentPacketForm.phone = res.data.phone;
                this.tEquipmentPacketForm.equipmentNumber = res.data.equipmentNumber;
                this.selectModel = res.data.regionName;
                this.imageUrlList.push(nginxUrl + res.data.avatarPath);
                if (res.data.createTime != '') {
                  this.tEquipmentPacketForm.createTimeTime = formartDate(new Date(res.data.createTime).getTime(), 'yyyy-MM-dd hh:mm:ss');
                  this.tEquipmentPacketForm.createTime = formartDate(new Date(res.data.createTime).getTime(), 'yyyy-MM-dd hh:mm:ss');
                }
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
