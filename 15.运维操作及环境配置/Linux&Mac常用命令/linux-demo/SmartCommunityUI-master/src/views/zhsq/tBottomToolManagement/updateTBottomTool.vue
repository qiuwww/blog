<style lang="less" scoped>
.tDataService{
  .form-item-input {
    width: 200px;
  }
  .ivu-form-item-error-tip {
    left: 80px;
  }
  .ivu-form .ivu-form-item-label {
    width: 120px;
  }
  .ivu-radio-group {
    /deep/ .ivu-radio-default{
      margin-bottom: -2px;
      height: 30px;
    }
  }
}
</style>
<style lang="less">
.tDataService{
  .ivu-dropdown {
    position: absolute;
    bottom: -1px;
    right: 10px;
  }
  .ivu-dropdown .ivu-select-dropdown {
    width: 200px;
    left: -178px !important;
  }
}
</style>
<template>
  <Modal v-model="show" :title="editTitle"  :mask-closable="false" width="620px">
    <Form ref="tDataServiceForm" :model="tDataServiceForm" :label-width="90" :rules="tDataServiceFormRule" class="tDataService">
      <Row>
        <Col span="12">
          <FormItem label="菜单名称" prop="name">
            <Input v-bind:disabled="disabled"  type="text" :maxlength=50 v-model="tDataServiceForm.name" placeholder="请输入服务名称"/>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="级别" prop="level">
            <Input disabled type="text" :maxlength=50 v-model="tDataServiceForm.level" placeholder="请输入级别"/>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="上级菜单" prop="pid">
            <i-input v-model="selectModel" placeholder="请选择上级服务" readonly></i-input>
            <Dropdown trigger="custom" :visible="departVisible" placement="bottom-end" >
              <a href="javascript:void(0)" @click="departVisible=!departVisible">
                <Icon type="ios-arrow-down" class="departVisibleSelectIcon"></Icon>
              </a>
              <DropdownMenu slot="list" style="max-height: 200px;overflow-y: auto">
                <Tree v-bind:data="pidPriority" @on-select-change="handleCheckChange"></Tree>
              </DropdownMenu>
            </Dropdown>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="图标" prop="icon">
            <Input type="text" v-model="tDataServiceForm.icon" placeholder="请输入图标地址"/>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="图层类型" prop="typeId">
            <!-- <Input type="text" :maxlength=100 v-model="tDataServiceForm.format" placeholder="请输入服务类型"/> -->
            <Select  v-bind:disabled="disabled"  v-model="tDataServiceForm.typeId" @on-change="onTypeChange" label-in-value  placeholder="请选择图层类型"  clearable >
              <Option v-for="(item, i) in list" :key="item.id" :value="item.id.toString()">{{item.name}}</Option>
            </Select>
          </FormItem>
        </Col>
<!--        <Col span="12">-->
<!--          <FormItem label="按钮颜色" prop="color">-->
<!--            <ColorPicker v-model="tDataServiceForm.color" />-->
<!--          </FormItem>-->
<!--        </Col>-->
        <Col span="12">
          <FormItem label="数据类型" prop="sourceId">
            <Select  v-bind:disabled="disabled"  v-model="tDataServiceForm.sourceId" @on-change="onDataTypeChange" label-in-value placeholder="请选择数据来源" clearable ><!-- @on-clear="clearService" -->
              <Option v-for="(item, i) in typeList" :key="item.id" :value="item.id.toString()">{{item.name}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="24">
          <FormItem v-if="!urlShow" label="链接" prop="url">
            <Input v-bind:disabled="disabled"  :rows="1" type="textarea"  v-model="tDataServiceForm.url" placeholder="请输入备注" style="width:100%;"/>
          </FormItem>
        </Col>
        <Col span="24">
          <FormItem  label="参数" prop="parameter">
            <Input v-bind:disabled="disabled"  :rows="1" type="textarea"  v-model="tDataServiceForm.parameter" placeholder="请输入备注" style="width:100%;"/>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="24">
          <FormItem label="备注" prop="remarks">
            <Input v-bind:disabled="disabled"  :rows="1" type="textarea"  v-model="tDataServiceForm.remarks" placeholder="请输入备注" style="width:100%;"/>
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
import {treeData,addTZhsqBottomTool,updateTZhsqBottomTool,getTZhsqBottomTool} from '@/api/zhsq/tZhsqBottomTool/tZhsqBottomTool';
import {getDictDataByType } from '@/api/index';
import { getCommunity, getDictionary, getStreet } from '../../../api'
import {queryAllList} from "@/api/zhsq/basicGrids/basicGrids";
import {sendAjax,list} from "./dataMapping";
export default {
  name: "updateTZhsqBottomTool",
  props: {
    value: {
      type: Boolean,
      default: false
    },
    TDataServiceId: {
      type: String
    },
    modalTitle: {
      type: String
    }
  },
  data() {
    return {
      show: this.value,
      editTitle: this.modalTitle,//对话框标题
      loading: true,//加载
      disabled:false,//表单编辑状态
      houseStreetPriority :[],//服务类型名称
      tDataServiceForm: {
        pid:'',
        name:'',
        type:'',
        remark:'',
        level:'',
        color:'',
        icon:'',
        sourceId:"",
        typeId:"",
        typeName:"",
        parameter:"",
        url:"",
        sourceName:"",
      },
      tDataServiceFormRule: this.getTDataServiceFormRule(),
      departVisible:false,
      selectModel:'',
      pidPriority:[],
      sourceIdPriority:[],
      gridsIdPriority:[],
      typeList:[],
      list:list,
      dataList:[],
      urlShow:true,
    }
  },
  created() {
    getStreet({}).then(res => {
      if (res && res.success) {
        this.houseStreetPriority = res.data
      }
    })
  },
  methods: {
    //选择数据类型
    onTypeChange(e){
      if (e){
        this.typeList=this.list[e.value].children
        this.tDataServiceForm.typeName = e.label
      }
    },
    onDataTypeChange(e){
      if (e){
        this.tDataServiceForm.sourceName = e.label
        this.tDataServiceForm.url=this.typeList[e.value].url
      }
      if (this.tDataServiceForm.url!='/') {
        this.urlShow=true;
      }else {
        this.urlShow=false;
        this.tDataServiceForm.url=""
      }
    },
    //选择街道
    onStreetChange(e) {
      if (e) {
        if (e.label) {
          this.tDataServiceForm.typeName = e.label
        }
        getCommunity({ typeId: e.value }).then(res => {
          if (res && res.success) {

            this.sourceIdPriority = res.data
          }
        })
      } else {
        this.sourceIdPriority = []
        // this.basicGridsForm.sourceId = ''
        // this.basicGridsForm.sourceName = ''
      }
    },
    //社区选择后
    onCommunityChange(e) {
      this.gridsIdPriority = []
      if (e) {
        if(e.label){
          this.tDataServiceForm.sourceName = e.label
        }
        queryAllList({ sourceId: e.value }).then(res => {
          if (res && res.success) {
            for (let i = 0; i < res.data.length; i++) {
              this.gridsIdPriority.push({ id: res.data[i].id, name: res.data[i].name })
            }
          }
        })
      }
      this.gridPersonPriority = []
      // this.basicSocialOrganizationForm.gridsId = ''
      // this.basicSocialOrganizationForm.gridPersonId = ''
      // this.policePrincipalPriority = []
      // this.basicSocialOrganizationForm.policePrincipal = ''
    },
    onGridChange(e){
      if (e) {
        debugger
        if(e.label){
          this.tDataServiceForm.griddingName = e.label
        }
      }
    },
    //判断是否是JSON
    isJSON(str) {
      if (typeof str == 'string') {
        try {
          var obj=JSON.parse(str);
          if(typeof obj == 'object' && obj ){
            return true;
          }else{
            return false;
          }
        } catch(e) {
          return false;
        }
      }
    },
    //初始化树数据
    initTree(){
      treeData().then(res => {
        if(res && res.success){
          this.pidPriority = this.getTreeData(res.data.records);
        }
      });
    },
    //初始化树结构
    getTreeData(data){
      if (data) {
        for (let i in data) {
          var item = data[i];
          data[i].title = data[i].name;
          data[i].value = data[i].id;
          data[i].expand = false;
          if (data[i].children) {
            data[i].children = this.getTreeData(data[i].children);
          }
        }
      }
      return data;
    },
    //服务树点击事件
    handleCheckChange(data){
      this.tDataServiceForm.pid = data[0].id;
      this.tDataServiceForm.level = (parseInt(data[0].level) + 1).toString();
      this.selectModel = data[0].name;
      this.departVisible = false;
    },
    getTypePriority(){

    },
    handelSubmit() {
      this.$refs['tDataServiceForm'].validate((valid) => {
        if (valid) {
          this.loading = true;
          if(this.TDataServiceId!=null&&this.TDataServiceId.trim().length>0){
            this.tDataServiceForm.id=this.TDataServiceId;
            if(this.tDataServiceForm.params && this.tDataServiceForm.params != undefined){
              if(!this.isJSON(this.tDataServiceForm.params.replace(/\s*/g,""))){//判断是否是JSON
                try  {
                  this.tDataServiceForm.params = JSON.stringify(eval("(" + this.tDataServiceForm.params.replace(/\s*/g,"") + ")"));
                }catch(exception) {
                  this.$Message.error('请输入正确格式的服务参数！');
                  this.loading = false;
                  return;
                }
              }
            }
            if(this.tDataServiceForm.type == undefined){
              this.tDataServiceForm.type = "";
            }
            updateTZhsqBottomTool(this.tDataServiceForm).then(res => {
              if (res && res.code == 200) {
                this.closeModal(false);
                this.$emit('handleSearch');
                this.$Message.success('修改成功');
                this.loading = false;
              }else{
                this.$Message.error(res.msg);
                this.loading = false;
              }
            }).catch(err => {
              this.loading = false;
            })
          }else{
            if(this.tDataServiceForm.params && this.tDataServiceForm.params != undefined){
              if(!this.isJSON(this.tDataServiceForm.params.replace(/\s*/g,""))){//判断是否是JSON
                try  {
                  this.tDataServiceForm.params = JSON.stringify(eval("(" + this.tDataServiceForm.params.replace(/\s*/g,"") + ")"));
                }catch(exception) {
                  this.$Message.error('请输入正确格式的服务参数！');
                  this.loading = false;
                  return;
                }
              }
            }
            if(this.tDataServiceForm.type == undefined){
              this.tDataServiceForm.type = "";
            }
            addTZhsqBottomTool(this.tDataServiceForm).then(res => {
              if (res && res.code == 200) {
                this.closeModal(false);
                this.$emit('handleSearch');
                this.$Message.success('保存成功');
                this.loading = false;
              }else{
                this.$Message.error(res.msg);
                this.loading = false;
              }
            }).catch(err => {
              this.loading = false;
            })
          }
        } else {
          // this.loading = true;
          this.$Message.error('表单验证不通过！');
        }
      });
    },
    closeModal(val) {
      this.$emit('input', val);
    },
    initForm(){
      this.tDataServiceForm= {
        pid:'',
        name:'',
        type:'',
        remark:'',
        color:'',
        icon:'',
        sourceId:"",
        griddingId:"",
        typeId:"",
        typeName:"",
        griddingName:"",
        sourceName:"",
        level:'1',
      };
      this.selectModel = '';
      this.departVisible = false;
    },
    getTDataServiceFormRule() {
      return {
        name: [
          {required: true, message: '服务名称不能为空！', trigger: 'blur'},
          {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
        ],
        typeId: [
          {required: true, message: '服务格式不能为空！', trigger: 'blur'},
          {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
        ],
      }
    }
  },
  watch: {
    value(val) {
      this.show = val;
    },
    show(val) {
      this.initTree();
      this.getTypePriority();
      this.initForm();
      this.loading=false;
      this.editTitle = this.modalTitle;
      if(val) {
        this.$refs['tDataServiceForm'].resetFields();
        if(this.TDataServiceId!=null&&this.TDataServiceId.trim().length>0){
          getTZhsqBottomTool({id: this.TDataServiceId}).then(res => {
            if (res && res.code == 200 && res.data) {
              this.tDataServiceForm.pid = res.data.pid;
              this.tDataServiceForm.name = res.data.name;
              this.tDataServiceForm.sourceId = res.data.sourceId;
              this.tDataServiceForm.typeId = res.data.typeId;
              this.tDataServiceForm.url = res.data.url;
              this.tDataServiceForm.sourceName = res.data.sourceName;
              this.tDataServiceForm.typeName = res.data.typeName;
              this.tDataServiceForm.parameter = res.data.parameter;
              this.tDataServiceForm.remark = res.data.remark;
              this.tDataServiceForm.level = res.data.level;
              // this.tDataServiceForm.color = res.data.color;
              this.tDataServiceForm.icon = res.data.icon;
              //this.onStreetChange({ value: res.data.typeId })
              //this.onCommunityChange({ value: res.data.sourceId })
              this.typeList=this.list[this.tDataServiceForm.typeId].children
              if (this.typeList[this.tDataServiceForm.sourceId].url=="/") {
                this.urlShow=false;
              }
              if(res.data.pid!="0"){
                getTZhsqBottomTool({id:res.data.pid}).then(re => {
                  this.selectModel = re.data.name;
                })
              }
            } else {
              this.$Message.error(res.msg);
            }
          }).catch(err => {
            this.$Message.error('获取图层数据失败');
          });
        }
      } else {
        this.closeModal(val);
      }
    }
  }
}
</script>
