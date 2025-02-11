<style lang="less">
  .tUnittype {
    .ivu-row {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-orient: horizontal;
      -webkit-box-direction: normal;
      -ms-flex-flow: row wrap;
      flex-flow: row wrap;
      /*margin-bottom: 2vh;*/
      margin-bottom: 0px;
    }
    .form-item-input {
      width: 200px;
    }
    .ivu-form .ivu-form-item-label {
      width: 120px;
    }
    .ivu-select {
      /*width: 178px;*/
    }
    .ivu-description-term{
      padding-bottom: 30px !important;
    }
    .ivu-form-item{
      /*margin-bottom: 0 !important;*/
    }

    .imageVideoView{
      height: 15vh;
      width: 8vw;
      /*border: 1px solid rgb(192,192,192);*/
    }
    .upImgView {
    }
    .textImageVideo{
      /*text-align: center;*/
      /*margin-top: 5.5vh*/
    }

    .imgWrap:hover .shadow {
      display: block;
      z-index: 3;
      width: 100%;
    }

    .ivu-select-dropdown-list {
      min-width: 100%;
      list-style: none;
      /*text-align: center;*/
    }

    .noImg {
      width: 150px;
      border: 1px dashed rgb(204, 204, 204);
      margin-left: 20px;
      height: 140px;
      line-height: 93px;
      margin-top: 4px;
      text-align: center;
      color: #ccc;
      user-select: none;
      font-size: 12px;
      margin-left: 0px;
    }

    .ivu-form-item-error-tip {
      position: absolute;
      top: 100%;
      left: 0;
      line-height: 1;
      padding-top: 6px;
      color: #ed4014;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .imgWrap {
      position: relative;
      width: 150px;
      border: 1px dashed rgb(204, 204, 204);
      margin-left: 20px;
      height: 140px;
      line-height: 93px;
      margin-top: 4px;
      text-align: center;
      color: #ccc;
      user-select: none;
      font-size: 12px;
      margin-left: 0px;
    }

    .img {
      /*width: 100%;*/
      /*height: 156px;*/
      width: 150px;
      height: 140px;
    }

    .textImageVideoNo{
      overflow:hidden;
      text-overflow:ellipsis;
      white-space:nowrap;
    }

    .ivu-form-item-content {
      position: relative;
      line-height: 27px;
      font-size: 14px;
    }
  }
</style>
<template>
  <Modal v-model="show" :title="editTitle" :mask-closable="false" class="tUnittype" :width="400" :draggable="false">
    <Form ref="tUnittypeForm" :model="tUnittypeForm" :rules="tUnittypeFormRule" :label-width="90">

        <Row>
          <Col span="24">
            <FormItem label="类型名称" prop="name">
              <Input v-bind:disabled="disabled" type="text" :maxlength=50 v-model="tUnittypeForm.name" placeholder="请输入类型名称"/>
            </FormItem>
            <div v-if="!addFlag">
              <FormItem label="上级目录" v-if="isNotEdit">
                <TreeSelect v-model="tUnittypeForm.pid" disabled :data="pidPriority" />
              </FormItem>
              <FormItem label="上级目录" v-if="!isNotEdit">
                <TreeSelect v-model="tUnittypeForm.pid" disabled :data="pidPriority" />
              </FormItem>
            </div>
            <FormItem label="显示状态" prop="isLabel">
              <RadioGroup v-bind:disabled="disabled" v-model="tUnittypeForm.isLabel">
                <Radio v-bind:disabled="disabled" :label="'0'">隐藏</Radio>
                <Radio v-bind:disabled="disabled" :label="'1'">显示</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="排序码" prop="sortCode">
              <Tooltip trigger="hover" placement="right" content="值越小越靠前，支持小数">
                <InputNumber style="width: 268px;" :max="1000" :min="0" v-bind:disabled="disabled" v-model="tUnittypeForm.sortCode" placeholder="请输入排序码"/>
              </Tooltip>
            </FormItem>
          </Col>
      </Row>

    </Form>
    <div slot="footer">
      <Button type="text" @click="show=false">取消</Button>
      <Button type="primary" :loading="loading" @click="handelSubmit" v-if="!disabled">提交</Button>
    </div>
  </Modal>
</template>
<script>
  import {
    addTUnittype,
    updateTUnittype,
    getTUnittype,
    queryTUnittypeTreeByPage,
  } from '@/api/zhsq/tUnittype/tUnittype'
  import {getDictDataByType} from '@/api/index';
  import {uploadImg} from '@/api/utils';
  import {formartDate} from '@/api/tools/tool'
  import uploadHeaderImg from '@/components/uploadHeaderImg'

  export default {
    name: "updateTUnittype",
    components: {
      uploadHeaderImg
    },
    props: {
      value: {
        type: Boolean,
        default: false
      },
      addFlag: {
        type: Boolean,
        default: true
      },
      TUnittypeId: {
        type: String
      }
      ,TUnittypeParentName: {
        type: String
      },
      modalTitle: {
        type: String
      }
    },
    data() {
      return {
        isShow: 0,
        show: this.value,
        editTitle: this.modalTitle,
        loading: true,
        disabled: false,
        pidPriority: [],
        enabledRadio: [],
        tUnittypeForm: {
          pid:'',
          name:'',
          isLabel: '',
          level: '',
          sortCode: '',
        },
        imgFiles: [],
        imageUrlList: [],
        imageUrl: '',
        imgShow: false,
        departVisible: false,
        selectModel: "",
        tUnittypeFormRule: this.getTUnittypeFormRule(),
        isNotEdit:true,
        /*分页查询部件(树级)*/
        pageNumber: 1, // 当前页数
        pageSize: 10, // 页面大小
        queryName: '', // 名称 模糊查询
        startDate: null,//开始时间 模糊查询
        endDate: null,//结束时间 模糊查询
      }
    },
    methods: {
      onFileUploadSuccess(res, file) {
        console.log('上传成功，生成路径为：');
        console.log(res.data);
        this.tUnittypeForm.imgUrl = res.data;
        // this.imageUrl = 'http://192.168.1.147:8013' + res.data;
        // this.imageUrl = 'http://223.87.166.240:8016' + res.data;
        this.imageUrl = res.data;
      },
      onFileUploadError(file) {
        this.$Message.error('图片上传失败！');
      },
      onRemovePath() {
        this.tUnittypeForm.imgUrl = '';
      },
      //文件上传 获取路径
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
            _this.tUnittypeForm.imgUrl = reader.result;
          }


        } else {
          this.$Message.error('请选择图片')
        }
        this.$refs.filElem.value = null
      },
      //文件上传 数据入库
      fileUploadInto(){
        let _this = this;
         const formData = new FormData()
          formData.append('multipartFile', _this.imageUrlList[0])
          // formData.append('propertyId', this.$store.getters.propertyInfo.id)

          uploadImg(formData).then(res => {
            if (res && +res.code === 200) {
              _this.imageUrlList = _this.imageUrlList.concat(res.object)
            }
          })
      },
      previewImg(imgFile) {
        // local preview

        this.imageUrlList = this.imageUrlList.concat(imgFile);
      },
      //选择文件
      choiceFile() {
        this.$refs.filElem.dispatchEvent(new MouseEvent('click'))
      },
      // 图片查看
      handleView() {
        const viewer = this.$el.querySelector('.imgWrap').$viewer;
        viewer.show();
      },
      // 移除图片
      handleRemove() {
        this.imageUrlList = [];
        this.tUnittypeForm.imgUrl = '';
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
        let _this = this;
        // getDept('').then(res => {
        //   if (res.content) {
        //     this.pidPriority = this.getTreeData(res.content);
        //   }
        // });
        queryTUnittypeTreeByPage({
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          name: this.queryName,
          startDate: this.startDate,
          endDate: this.endDate,
        }).then(res => {
          if(res && res.success) {
            if (res.data && res.data.records) {
              _this.pidPriority = _this.getTreeData(res.data.records);
            }
          }
        }).catch(err => {
          this.loading = false
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
      //获取部门状态
      getEnabledRadio() {
        getDictDataByType('dept_status').then(res => {
          if (res && res.success) {
            this.enabledRadio = res.data;
          }
        });
      },
      //提交
      handelSubmit() {
        this.loading = true;
        this.$refs['tUnittypeForm'].validate((valid) => {
          if (valid) {
            if (this.TUnittypeId != null && this.TUnittypeId.trim().length > 0) {
              this.tUnittypeForm.id = this.TUnittypeId;
              // this.tUnittypeForm.pid = '';
              updateTUnittype(this.tUnittypeForm).then(res => {
                this.loading = false;
                if (res!=null) {
                  this.closeModal(false);
                  this.$emit('handleSearch');
                  this.$Message.success('保存成功');
                } else {
                  this.$Message.error('保存失败');
                }
              })
            } else {
              if(!this.tUnittypeForm.pid){
                this.tUnittypeForm.pid = '0';
                this.tUnittypeForm.level = '0';
              }else{
                this.tUnittypeForm.level = '1';
              }
              if(!this.tUnittypeForm.isLabel){
                this.tUnittypeForm.isLabel = '1';
              }
              addTUnittype(this.tUnittypeForm).then(res => {
                this.loading = false;
                if (res) {
                  this.closeModal(false);
                  this.$emit('handleSearch');
                  this.$Message.success('保存成功');
                } else {
                  this.$Message.error('保存失敗');
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
      //初始化表单
      initForm() {
        this.tUnittypeForm = {
          pid:'',
          name:'',
          isLabel: '',
          level: '',
          sortCode: null,
        };
        this.selectModel = "";
        this.departVisible = false;
      },
      getTUnittypeFormRule() {
        return {
          name: [
            {required: true, message: '类型名称不能为空！', trigger: 'blur'},
            {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
          ],
          pid: [
            {required: true, message: '上级目录不能为空！', trigger: 'blur'},
            // {required: false, pattern: /^[0-9]+$/, message: '上级目录不能为空！', trigger: 'blur'},
          ],
          sortCode: [
            // {required: true, message: '排序码不能为空！', trigger: 'blur'},
            {required: true,type: "number",message: "排序码不能为空",trigger: "blur"}
            // {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
          ],
          isLabel: [
            {required: true, message: '显示状态不能为空！', trigger: 'blur'},
          ],
          /*imgUrl: [
            {required: true, message: '图片不能为空！', trigger: 'blur'},
          ],*/
          // enabled: [
          //   {required: true, message: '状态不能为空！', trigger: 'blur', pattern: /.+/},
          // ],
        }
      },
      //部门树点击事件
      handleCheckChange(data) {

        this.deptForm.pid = data[0].value;
        this.departVisible = false;
        this.selectModel = data[0].title;
      }
    },
    watch: {
      value(val) {
        this.show = val;
      },
      show(val) {
        this.isShow = 0;
        this.imageUrlList = [];
        this.imageUrl = '';
        this.getPidPriority(),
        // this.getEnabledRadio(),
        this.initForm();
        this.loading = false;
        this.editTitle = this.modalTitle;
        if (this.editTitle == "查看") {
          this.disabled = true;
        } else {
          this.disabled = false;
        }
        if (this.editTitle == "下级新增") {
          this.tUnittypeForm.pid = this.TUnittypeId;
          this.TUnittypeId = null;
        }
        this.isNotEdit = true;
        if (val) {
          this.$refs['tUnittypeForm'].resetFields();
          if (this.TUnittypeId != null && this.TUnittypeId.trim().length > 0) {
            this.isNotEdit = false;
            getTUnittype({id: this.TUnittypeId}).then(res => {
              if (res!=null) {
                this.tUnittypeForm.name = res.data.name;
                this.tUnittypeForm.pid = res.data.pid;
                this.tUnittypeForm.isLabel = res.data.isLabel;
                this.tUnittypeForm.level = res.data.level;
                this.tUnittypeForm.sortCode = parseInt(res.data.sortCode);
              } else {
                this.$Message.error('查询失败');
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
