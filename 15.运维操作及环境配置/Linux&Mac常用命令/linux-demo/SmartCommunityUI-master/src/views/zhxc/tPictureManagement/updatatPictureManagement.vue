<style lang="less">
  .tPointIcon {
    .ivu-modal {
      width: 560px !important;
    }
    .ivu-form .ivu-form-item-label {
      text-align: right;
    }
    .ivu-modal-body {
      padding-right: 40px;
    }
  }
</style>
<template>
  <Modal v-model="show" :title="editTitle" :mask-closable="false" class="tPointIcon">
    <Form ref="tPointIconForm" :model="tPointIconForm" :rules="tPointIconFormRule"
          :label-width="90">
      <Row>
      <FormItem label="名称" prop="name">
          <Input v-bind:disabled="disabled" type="text" :maxlength=50 v-model="tPointIconForm.name"
                 placeholder="请输入图片名称"/>
      </FormItem>
      </Row>
      <Row>
      <FormItem label="图片" prop="icon">
        <div class="ivu-upload ivu-upload-drag" v-on:click="handelup" sstyle="width: 414px;max-height: 414px;">
          <input v-bind:disabled="disabled||tempImg!=''" accept = "image/*" type="file" multiple="multiple" class="ivu-upload-input" ref="filei" v-on:change="up">
          <img :src="tempImg" alt="" v-if="tempImg" class="upimg" style="width:100%;;">
          <div v-else>
            <i class="ivu-icon ivu-icon-ios-cloud-upload"
              style="font-size: 52px; color: rgb(51, 153, 255);"></i>
            <p>请选择您要上传的图片</p>
          </div>
        </div>
      </FormItem>
      </Row>
      <Row>
        <FormItem label="是否显示" prop="isShow">
          <RadioGroup  v-model="tPointIconForm.isShow">
            <Radio v-bind:disabled="disabled" v-for="(item, i)  in isShowRadio" :label="item.sort">{{item.label}}</Radio>
          </RadioGroup>
        </FormItem>
      </Row>
      <Row>
        <FormItem label="备注" prop="remarks">
          <Input  v-bind:disabled="disabled" :rows="3" type="textarea" v-model="tPointIconForm.remarks"
                 placeholder="请输入备注"/>
        </FormItem>
      </Row>
    </Form>
    <div slot="footer">
      <Button type="text" @click="show=false">取消</Button>
      <Button v-if="!disabled" type="primary" :loading="loading" @click="handelSubmit">提交</Button>
      <Button v-if="disabled" type="primary" :loading="loading" @click="closeModal(false)">确定</Button>
    </div>
  </Modal>
</template>
<script>
  import {addTPointIcon, updateTPointIcon, getTPointIcon} from '@/api/zhxc/tPointIcon/tPointIcon'
  import {getDictDataByType} from '@/api/index';
  import {formartDate} from '@/api/tools/tool'

  export default {
    name: "updateTPointIcon",
    props: {
      value: {
        type: Boolean,
        default: false
      },
      TPointIconId: {
        type: String
      },
      modalTitle: {
        type: String
      }
    },
    data() {
      return {
        tempImg:'',
        show: this.value,
        editTitle: this.modalTitle,
        loading: true,
        disabled: false,
        isShowRadio: [{sort:"1",label:"显示"},{sort:"0",label:"隐藏"}],
        tPointIconForm: {
          icon: '',
          remarks: '',
          isShow: '1',
          name:'',
          type:'2',
        },
        tPointIconFormRule: this.getTPointIconFormRule()
      }
    },
    methods: {
      getIsShowRadio() {
        getDictDataByType('is_oftern').then(res => {
          if (res && res.success) {
            this.isShowRadio = res.data;
          }
        });
      },
      // 间接调用文件选择框
      handelup(e) {
        this.$refs.filei.dispatchEvent(new MouseEvent('click'))
      },
      // 选择文件
      up(e) {
        this.tempImg =""
        this.tPointIconForm.icon=""
      	// 获取待上传的文件对象
        let file = e.target.files[0]
        var size = file.size / 1024;
          if(size>10000){
          alert("附件不能大于10M");
          return
          }
        var idx = file.name.lastIndexOf(".");
        if (idx != -1){
            var ext = file.name.substr(idx+1).toUpperCase();
            ext = ext.toLowerCase( );
           // alert("ext="+ext);
            if (ext != 'jpg' && ext != 'png' && ext != 'jpeg'&& ext != 'gif'){
                alert("只能上传.jpg  .png  .jpeg .gif类型的文件!");
                return;
            }
        } else {
           alert("只能上传.jpg  .png  .jpeg .gif类型的文件!");
            return;
        }
        this.tPointIconForm.icon="/img/scenicSpotIcon/"+file.name;
        // 声明一个读取文件对象
        let reader = new FileReader();
        // 开始读取文件内容
        reader.readAsDataURL(file);
        // 读取操作结束时触发
        reader.onloadend = (ev) => {
          // 赋值给vue对象属性
          this.tempImg = ev.target.result;
          this.tPointIconForm.icon=ev.target.result;
        };
      },
      handelSubmit() {
        this.$refs['tPointIconForm'].validate((valid) => {
          this.loading = true;
          if (valid) {
            if (this.TPointIconId != null && this.TPointIconId.trim().length > 0) {
              this.tPointIconForm.id = this.TPointIconId;
              updateTPointIcon(this.tPointIconForm).then(res => {
                this.loading = false;
                if (res) {
                  if (res && res.code == 200) {
                    this.closeModal(false);
                    this.$emit('handleSearch');
                    this.$Message.success('保存成功');
                  } else {
                    this.$Message.error(res.msg);
                  }
                } else {
                  this.$Message.error('保存失败');
                }
              }).catch(err => {
                this.loading = false;
              });
            } else {
              addTPointIcon(this.tPointIconForm).then(res => {
                if (res) {
                  if (res && res.code == 200) {
                    this.closeModal(false);
                    this.$emit('handleSearch');
                    this.$Message.success('保存成功');
                  } else {
                    this.$Message.error(res.msg);
                  }
                } else {
                  this.$Message.error('保存失败');
                }
              }).catch(err => {
                this.loading = false;
              });
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
      initForm() {
        this.tPointIconForm = {
          icon: '',
          remarks: '',
          isShow: '1',
          name:'',
          type:'2',
        };
        this.tempImg='';
      },
      getTPointIconFormRule() {
        return {
          icon: [
            {required: true, message: '图片不能为空！', trigger: 'blur'},
           // {type: 'string', max: 50, message: '图片名称最大长度为50！', trigger: 'blur'}
          ],
          name: [
            {required: true, message: '名称不能为空！', trigger: 'blur'},
            {type: 'string', max: 50, message: '名称最大长度为50！', trigger: 'blur'}
          ],
          // remarks: [
          //   {required: false, message: '备注不能为空！', trigger: 'blur', pattern: /.+/},
          // ],
          // isShow: [
          //   {required: true, message: '是否显示不能为空！', trigger: 'blur', pattern: /.+/},
          // ],
        }
      }
    },
    watch: {
      value(val) {
        this.show = val;
      },
      show(val) {
        //this.getIsShowRadio(),
        this.initForm();
        this.loading = false;
        this.editTitle = this.modalTitle;
        if (this.editTitle == "查看") {
          this.disabled = true;
        } else {
          this.disabled = false;
        }
        if (val) {
          this.$refs['tPointIconForm'].resetFields();
          if (this.TPointIconId != null && this.TPointIconId.trim().length > 0) {
            getTPointIcon({id: this.TPointIconId}).then(res => {
              if (res) {
                if (res && res.code == 200) {
                  this.tPointIconForm.name = res.data.name;
                  this.tempImg='/tempfile'+res.data.icon;
                  this.tPointIconForm.icon =res.data.icon;
                  this.tPointIconForm.remarks = res.data.remarks;
                  this.tPointIconForm.isShow = res.data.isShow;
                } else {
                  this.$Message.error(res.msg);
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
