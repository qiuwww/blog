<style lang="less">
  .tBigScreen {
    .ivu-modal {
      width: 660px !important;
      top: 50%;
      transform: translateY(-50%);
    }

    .noImg {
      margin: 7px 0 0 0;
    }
  }
</style>
<template>
  <Modal v-model="show" :title="editTitle" :mask-closable="false" width="620px">
    <Form ref="tBigScreenForm" :model="tBigScreenForm" :label-width="110" :rules="tBigScreenFormRule"
          class="tBigScreen">
      <Row>
        <Col span="24">
          <FormItem label="大屏名称" prop="name">
            <Input v-bind:disabled="disabled" type="text" :maxlength=50 v-model="tBigScreenForm.name"
                   placeholder="请输入大屏名称"></Input>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="24">
          <FormItem label="访问地址" prop="url">
            <Input v-bind:disabled="disabled" type="text" :maxlength=255 v-model="tBigScreenForm.url"
                   placeholder="请输入访问地址"></Input>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="24">
          <FormItem label="大屏描述" prop="details">
            <Input v-bind:disabled="disabled" :rows="3" type="textarea" v-model="tBigScreenForm.details"
                   placeholder="请输入大屏描述"></Input>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="24">
          <FormItem label="大屏缩略图" prop="img">
            <Row>
              <div v-if="imageUrlList.length>0" v-viewer="{movable: false}" class="imgWrap">
                <div class="shadow">
                  <Icon type="ios-eye-outline" size="40" color="#fff" @click.native="handleView()"/>
                  <Icon type="ios-trash-outline" size="40" color="#fff" @click.native="handleRemove()"/>
                </div>
                <img :src="imageUrlList" class="upImg">
              </div>
              <div v-else class="noImg" @click="choiceFile">点击上传图片</div>
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
  import {addTBigScreen, updateTBigScreen, getTBigScreen} from '@/api/tBigScreen/tBigScreen'

  export default {
    name: "updateTBigScreen",
    props: {
      value: {
        type: Boolean,
        default: false
      },
      TBigScreenId: {
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
        loading: true,
        disabled: false,
        tBigScreenForm: {
          name: '',
          details: '',
          type:'2',
          url: '',
          img: '',
          isUpdate: false
        },
        tBigScreenFormRule: this.getTBigScreenFormRule(),
        imageUrlList: []
      }
    },
    methods: {
      // 选择图片
      choiceFile() {
        this.$refs.filElem.dispatchEvent(new MouseEvent('click'));
      },
      // 图片查看
      handleView() {
        const viewer = this.$el.querySelector('.imgWrap').$viewer;
        viewer.show();
      },
      // 移除图片
      handleRemove() {
        this.imageUrlList = [];
        this.tBigScreenForm.img = '';
      },
      // 上传图片
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
            _this.tBigScreenForm.img = reader.result;
            _this.tBigScreenForm.isUpdate = true;// 后端判断
          }
        } else {
          this.$Message.error('请选择图片');
        }
        this.$refs.filElem.value = null
      },
      // 提交表单
      handelSubmit() {
        this.$refs['tBigScreenForm'].validate((valid) => {
          this.loading = true;
          if (valid) {
            if (this.TBigScreenId != null && this.TBigScreenId.trim().length > 0) {
              this.tBigScreenForm.id = this.TBigScreenId;
              updateTBigScreen(this.tBigScreenForm).then(res => {
                this.loading = false;
                if (res && res.code == 200) {
                  this.closeModal(false);
                  this.$emit('handleSearch');
                  this.$Message.success('修改成功');
                } else {
                  this.$Message.error(res.msg);
                }
              })
            } else {
              addTBigScreen(this.tBigScreenForm).then(res => {
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
      // 关闭弹窗
      closeModal(val) {
        this.$emit('input', val);
      },
      //重置
      initForm() {
        this.tBigScreenForm = {
          name: '',
          details: '',
          url: '',
          type:'1',
          img: '',
          isUpdate: false
        };
        this.imageUrlList = [];
      },
      // 表单验证
      getTBigScreenFormRule() {
        return {
          name: [
            {required: true, message: '大屏名称不能为空！', trigger: 'blur'},
            {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
          ],
          details: [
            {required: true, message: '大屏描述不能为空！', trigger: 'blur', pattern: /.+/},
          ],
          url: [
            // {required: true, message: '大屏url地址不能为空！', trigger: 'blur'},
            {type: 'string', max: 255, message: '数据的最大长度为255！', trigger: 'blur'}
          ],
          img: [
            {required: true, message: '大屏缩略图不能为空！', trigger: 'blur'},
          ]
        }
      }
    },
    watch: {
      value(val) {
        this.show = val;
      },
      show(val) {
        this.initForm();
        this.loading = false;
        this.editTitle = this.modalTitle;
        if (this.editTitle == "查看") {
          this.disabled = true;
        } else {
          this.disabled = false;
        }
        if (val) {
          this.$refs['tBigScreenForm'].resetFields();
          if (this.TBigScreenId != null && this.TBigScreenId.trim().length > 0) {
            getTBigScreen({id: this.TBigScreenId}).then(res => {
              if (res && res.code == 200) {
                this.tBigScreenForm.name = res.data.name;
                this.tBigScreenForm.details = res.data.details;
                this.tBigScreenForm.url = res.data.url;
                this.tBigScreenForm.img = res.data.img;
                this.imageUrlList = '/tempfile/' + res.data.img;
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
