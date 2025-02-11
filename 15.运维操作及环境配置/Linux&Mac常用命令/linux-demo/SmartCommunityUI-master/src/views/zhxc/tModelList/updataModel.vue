<style lang="less">
  .tModelForm {
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
  <Modal v-model="show" :title="editTitle" :mask-closable="false" class="tModelForm">
    <Form ref="tModelForm" :model="tModelForm" :rules="tModelFormRule"
          :label-width="90" >
      <Row>
        <FormItem label="模板名称" prop="modelId" class="addDepartUser-depart">
           <Select v-model="tModelForm.modelId" @on-select="selectDownItem" style="width:414px">
              <Option v-for="(item, i)  in areaTypeArr" :value="item.id"  :key="item.id">{{ item.title }}</Option>
           </Select>
          <!-- <Select v-model="tModelForm.modelId" clearable placeholder="请选择模板" label-in-value @on-change="selectDownItem" style="width: 414px">
            <Option v-for="(item, i) in areaTypeArr" :key="i" :value="item.id+''" :label="item.title">{{ item.title }}</Option>
          </Select> -->
        </FormItem>
      </Row>
      <Row>
        <FormItem label="配置信息" prop="jsonText" class="addDepartUser-depart">
          <Input type="textarea" :rows="8" v-model="tModelForm.jsonText"/>
        </FormItem>
      </Row>
    </Form>
    <div slot="footer">
      <Button type="text" @click="show=false">取消</Button>
      <Button type="primary"  @click="previewClick">预览</Button>
      <Button type="primary" :loading="loading" @click="handelSubmit">提交</Button>
    </div>
     <preview v-model="showPreview" :previewdata="previewdata" :menuId="tModelForm.menuId" ></preview>
  </Modal>
</template>
<script>
  //import {addTPointIcon, updateTPointIcon, getTPointIcon} from '@/api/zhxc/tPointIcon/tPointIcon'
  import preview from "./tPreview";
  import {getDictDataByType} from '@/api/index';
  import {formartDate} from '@/api/tools/tool'
  import {queryTBigScreenList} from '@/api/tBigScreen/tBigScreen'
  import {
    queryTTwoflanksListList,
    addTTwoflanksList,
    getTTwoflanksList,
    updateTTwoflanksList
  } from '@/api/zhxc/tTwoflanksList/tTwoflanksList'

  export default {
    name: "updataModel",
    components: {
            preview
        },
    props: {
      value: {
        type: Boolean,
        default: false
      },
      areaId: {
        type: String
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
        show: this.value,
        editTitle: this.modalTitle,
        loading: true,
        disabled: false,
        areaTypeArr: [],

        showPreview:false,
        departVisible: false,
        previewdata:{},
        isShowRadio: [{sort: "1", label: "显示"}, {sort: "0", label: "隐藏"}],
        tModelForm: {
          modelId: "",
          menuId:"",
          jsonText: '',
          areaId: this.areaId,
          jsonUrl:"",
        },
        tModelFormRule: this.gettModelFormRule()
      }
    },
    created() {
      queryTBigScreenList({type: '2'}).then(res => {
        if (res && res.success) {
          res.data.records.forEach(element => {
            this.areaTypeArr.push({"title": element.name, "url": element.configUrl, "id": element.id,"menuId":element.state})
          });
        }
      })
    },
    methods: {
      //预览
      previewClick(){
        if(this.tModelForm.menuId!=""){
            this.previewdata={};
           try{
             this.previewdata= JSON.parse(this.tModelForm.jsonText)
             this.showPreview = true;
           }catch{
              this.$Message.error("配置文件格式不正确!");
           }
        }
      },
      getIsShowRadio() {
        getDictDataByType('is_oftern').then(res => {
          if (res && res.success) {
            this.isShowRadio = res.data;
          }
        });
      },
      // 选择模板
      selectDownItem(e) {

          let value = this.areaTypeArr.filter(item=>item.id==e.value );
          if (Array.isArray(value) && value.length > 0) {
            this.tModelForm.menuId=value[0].menuId;
            this.$axios.get('/tempfile' + value[0].url)
              .then((response) => {
                this.tModelForm.jsonText = JSON.stringify(response.data, null, 4);
              })
              .catch((error) => {
              });
          }
        // if(e){
        //   if(e.value == undefined || e.value ==null ||e.value.trim().length==0){
        //     this.$Message.error("参数有误，请联系管理员！")
        //     return;
        //   }
        //   this.tModelForm.modelId = e.value;
        //   let value = this.areaTypeArr.filter(item=>item.id==e.value );
        //   if (Array.isArray(value) && value.length > 0) {
        //     this.modelname = value[0].title;
        //     this.tModelForm.menuId=value[0].menuId;
        //     this.$axios.get('/tempfile' + value[0].url)
        //       .then((response) => {
        //         this.tModelForm.jsonText = JSON.stringify(response.data, null, 4);
        //       })
        //       .catch((error) => {
        //       });
        //     //this.tModelForm.jsonText=leftarr
        //     this.departVisible = false;
        //   }
        // }
      },
      // 间接调用文件选择框
      handelup(e) {
        this.$refs.filei.dispatchEvent(new MouseEvent('click'))
      },
      // 选择文件
      up(e) {
        this.tempImg = ""
        this.tModelForm.icon = ""
        this.tModelForm.menuId=""
        // 获取待上传的文件对象
        let file = e.target.files[0]
        var size = file.size / 1024;
        if (size > 2000) {
          alert("附件不能大于2M");
          return
        }
        var idx = file.name.lastIndexOf(".");
        if (idx != -1) {
          var ext = file.name.substr(idx + 1).toUpperCase();
          ext = ext.toLowerCase();
          // alert("ext="+ext);
          if (ext != 'jpg' && ext != 'png' && ext != 'jpeg') {
            alert("只能上传.jpg  .png  .jpeg类型的文件!");
            return;
          }
        } else {
          alert("只能上传.jpg  .png  .jpeg类型的文件!");
          return;
        }
        this.tModelForm.icon = "/img/scenicSpotIcon/" + file.name;
        // 声明一个读取文件对象
        let reader = new FileReader();
        // 开始读取文件内容
        reader.readAsDataURL(file);
        // 读取操作结束时触发
        reader.onloadend = (ev) => {
          // 赋值给vue对象属性
          this.tempImg = ev.target.result;
          this.tModelForm.icon = ev.target.result;
        };
      },
      handelSubmit() {
        this.$refs['tModelForm'].validate((valid) => {
          this.loading = true;
          if (valid) {
            //this.tModelForm["jsonText"] = this.tModelForm.jsonText;
            if (this.TPointIconId != null && this.TPointIconId.trim().length > 0) {
              this.tModelForm.id = this.TPointIconId;
              updateTTwoflanksList(this.tModelForm).then(res => {
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
              addTTwoflanksList(this.tModelForm).then(res => {
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
        this.tModelForm = {
          modelId: "",
          menuId:"",
          jsonUrl: "",
          jsonText :'',
          areaId: this.areaId,
        };
      },
      gettModelFormRule() {
        return {
          modelId: [
              {required: true, message: '模板选择不能为空！', trigger: 'blur'},
            ],
          jsonText: [
              {required: true, message: '配置信息不能为空！', trigger: 'blur'},
            ],
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
          this.$refs['tModelForm'].resetFields();
          let _this = this;
          if (this.TPointIconId != null && this.TPointIconId.trim().length > 0) {
            getTTwoflanksList({id: this.TPointIconId}).then(res => {
              if (res) {
                if (res && res.code == 200) {
                  _this.tModelForm.modelId = res.data.modelId;
                  _this.tModelForm.menuId=res.data.menuId;
                  _this.tModelForm.areaId = res.data.areaId;
                  _this.tModelForm.jsonUrl = res.data.jsonUrl;
                  if (res.data.jsonUrl) {
                    _this.$axios.get('/tempfile' + res.data.jsonUrl)
                      .then((response) => {
                        _this.tModelForm.jsonText = JSON.stringify(response.data, null, 4);
                      })
                      .catch((error) => {
                      });
                  }
                } else {
                  _this.$Message.error(res.msg);
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
