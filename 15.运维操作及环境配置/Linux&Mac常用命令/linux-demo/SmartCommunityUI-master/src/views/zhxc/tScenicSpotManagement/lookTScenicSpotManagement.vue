<style lang="less">
  .tScenicSpotManagement {
    .ivu-modal-body{
      height: 500px !important;
      overflow-y: auto;
    }
    .form-item-input {
      width: 200px;
    }

    .ql-container.ql-snow {
      width: 96%;
    }
    .aUrl {
      display: block;
      width: 180px;
      color: #2D8cF0;
      background: transparent;
      text-decoration: none;
      outline: none;
      overflow: hidden;
      cursor: pointer;
      text-overflow: ellipsis;
      white-space: nowrap;
      -webkit-transition: color 0.2s ease;
      transition: color 0.2s ease;
    }
    .icons-item {
      margin: 0px 6px 6px 0;
      width: 20px;
      text-align: center;
      list-style: none;
      cursor: pointer;
      height: 0px;
      color: #5c6b77;
      -webkit-transition: all 0.2s ease;
      transition: all 0.2s ease;
      position: relative;
      padding-top: 10px;
    }


    .ivu-form .ivu-form-item-label {
      width: 120px;
      text-align: right;
    }
  }
</style>
<template>
  <Modal v-model="show" :title="editTitle" :mask-closable="false" :width="1000" class="tScenicSpotManagement">
    <Form ref="tScenicSpotManagementForm" :label-width="90" :model="tScenicSpotManagementForm" >
      <Row>
        <Col span="8">
          <FormItem label="点位名称">
            {{tScenicSpotManagementForm.name}}
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="菜单名称">
            {{tScenicSpotManagementForm.menuName}}
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem  label="所属区域">
            {{tScenicSpotManagementForm.pointType}}
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="8">
          <FormItem label="显示状态">
            {{tScenicSpotManagementForm.display}}
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="名称显示">
            {{tScenicSpotManagementForm.titleShow}}
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="是否全景" >
            {{tScenicSpotManagementForm.isScenery}}
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="背景颜色">
            <ColorPicker v-model="tScenicSpotManagementForm.backgroundColor" disabled :recommend="true" format="hex"/>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="名称位置" v-if="tScenicSpotManagementForm.titleShowJudge ==1">
            {{tScenicSpotManagementForm.namePosition}}
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem v-if="tScenicSpotManagementForm.isSceneryJudge ==1" label="全景链接" >
            <a :href="tScenicSpotManagementForm.url"  class="aUrl" target="_blank">{{tScenicSpotManagementForm.url}}</a>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="图标" v-if="tScenicSpotManagementForm.displayJudge ==1"  >
            <div class="icons-item" >
              <img :src="tScenicSpotManagementForm.icon" >
            </div>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="点位位置" v-if="tScenicSpotManagementForm.displayJudge ==1" >
            {{tScenicSpotManagementForm.position}}
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="最小视距" v-if="tScenicSpotManagementForm.titleShowJudge ==1" >
            {{tScenicSpotManagementForm.min}}
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="最大视距" v-if="tScenicSpotManagementForm.titleShowJudge ==1" >
            {{tScenicSpotManagementForm.max}}
          </FormItem>
        </Col>
      </Row>

      <Row>
        <Col span="24">
          <FormItem label="详情内容">
            <div class="ql-container ql-snow" style="user-select: none;">
              <div class="ql-editor" v-html="tScenicSpotManagementForm.describes">
              </div>
            </div>
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
  import {getTScenicSpotManagement} from '@/api/zhxc/tScenicSpotManagement/tScenicSpotManagement'
  import {nginxUrl} from '@/api/tools/tool'

  export default {
    name: "lookTScenicSpotManagement",
    props: {
      value: {
        type: Boolean,
        default: false
      },
      TScenicSpotManagementId: {
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
        editTitle:'',
        disabled: false,
        editorContent:'',
        tScenicSpotManagementForm: {
          max:null,
          min:null,
          displayJudge:'',
          isSceneryJudge:'',
          isScenery:'',
          pointType:'',
          namePosition:'',
          backgroundColor:'',
          titleShow:'',
          menuName:'',
          icon:'',
          display:'',
          name: '',
          region: '',
          responsiblePerson: '',
          phone: '',
          equipmentNumber: '',
        },
      }
    },
    methods: {
      closeModal(val) {
        this.$emit('input', val);
      },
      initForm() {
        this.tScenicSpotManagementForm = {
          titleShowJudge:'',
          isSceneryJudge:'',
          displayJudge:'',
          isScenery:'',
          namePosition:'',
          backgroundColor:'',
          titleShow:'',
          pointType:'',
          menuName:'',
          min:null,
          max:null,
          icon:'',
          display:'',
          name: '',
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
          this.$refs['tScenicSpotManagementForm'].resetFields();
          if (this.TScenicSpotManagementId != null && this.TScenicSpotManagementId.trim().length > 0) {
            this.imageUrlList = [];
            getTScenicSpotManagement({id: this.TScenicSpotManagementId}).then(res => {
              if (res && res.code == 200) {
                this.tScenicSpotManagementForm.name = res.data.name;
                if(res.data.position.length !=null){
                  this.tScenicSpotManagementForm.position = "已标注"
                }else{
                  this.tScenicSpotManagementForm.position = "未标注"
                }
                this.tScenicSpotManagementForm.isSceneryJudge = res.data.isScenery;
                this.tScenicSpotManagementForm.displayJudge = res.data.display;
                if(res.data.display ==  "1" ){
                  this.tScenicSpotManagementForm.display = "显示"
                }else{
                  this.tScenicSpotManagementForm.display = "隐藏"
                }
                if(res.data.isScenery == 1){
                  this.tScenicSpotManagementForm.isScenery = "360全景点"
                }else{
                  this.tScenicSpotManagementForm.isScenery = "poi点"
                }
                this.tScenicSpotManagementForm.describes = res.data.describes;
                this.tScenicSpotManagementForm.equipmentNumber = res.data.equipmentNumber;
                this.tScenicSpotManagementForm.url = res.data.url;
                this.tScenicSpotManagementForm.icon = res.data.icon;
                this.tScenicSpotManagementForm.titleShowJudge = res.data.titleShow;
                if(res.data.titleShow ==  "1" ){
                  this.tScenicSpotManagementForm.titleShow = "显示"
                }else{
                  this.tScenicSpotManagementForm.titleShow = "隐藏"
                }
                this.tScenicSpotManagementForm.backgroundColor = res.data.backgroundColor;
                this.tScenicSpotManagementForm.namePosition = res.data.namePosition;
                if(res.data.namePosition ==  "1" ){
                  this.tScenicSpotManagementForm.namePosition = "上"
                }else{
                  this.tScenicSpotManagementForm.namePosition = "下"
                }
                this.tScenicSpotManagementForm.min = res.data.min;
                this.tScenicSpotManagementForm.max = res.data.max;
                if(res.data.pointType=="0"){
                    this.tScenicSpotManagementForm.pointType ="首页"
                }else{
                  this.tScenicSpotManagementForm.pointType = res.data.typeName;
                }
                this.tScenicSpotManagementForm.menuName = res.data.menuName;
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
