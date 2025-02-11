<style lang="less">
  .tEarlywarning {
    .ivu-row {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-orient: horizontal;
      -webkit-box-direction: normal;
      -ms-flex-flow: row wrap;
      flex-flow: row wrap;
      margin-bottom: 2vh;
      /*margin-bottom: 0px;*/
    }
    .form-item-input {
      width: 200px;
    }
    .ivu-form .ivu-form-item-label {
      width: 120px;
    }
    .ivu-select {
      /*width: 180px;*/
    }
    .ivu-description-term{
      padding-bottom: 30px !important;
    }
    .ivu-form-item{
      margin-bottom: 0 !important;
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

    .ivu-dropdown {
      position: absolute;
      bottom: -1px;
      right: 10px;
    }
    .ivu-dropdown .ivu-select-dropdown {
      /*width: 200px;*/
      /*left: -178px !important;*/
      width: 148px;
      left: -124px !important;
    }


    .appstyle{
      position: absolute;
      overflow: hidden;
      height:  calc(100% - 0px);
      width: 100%;
      top: 0px;

      /*width: 50vw;*/
      /*height: 60vh;*/
      /*margin-left: -11vw;*/
      /*margin-top: -2vh;*/
    }

    .ivu-select-dropdown-list {
      min-width: 100%;
      list-style: none;
      text-align: left;
    }

    .ivu-form-item-content {
      position: relative;
      line-height: 27px;
      font-size: 14px;
    }

    .ivu-modal .ivu-select-dropdown {
      max-width: 209px;
      position: absolute !important;
    }
  }
</style>
<template>
  <Modal v-model="show" :title="editTitle" :mask-closable="false" class="tEarlywarning" :width="650" :draggable="false">
    <Form ref="tEarlywarningForm" :model="tEarlywarningForm" :rules="tEarlywarningFormRule" :label-width="90">

      <Row>
        <Col span="12">
          <FormItem label="预警内容" prop="earlywarningContent">
            <Input v-bind:disabled="disabled" type="text" :maxlength=50 v-model="tEarlywarningForm.earlywarningContent" placeholder="请输入预警内容"/>

          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="重点人员" prop="keypersonnelType">
            <Select v-bind:disabled="disabled" v-model="tEarlywarningForm.keypersonnelType" placeholder="请选择" clearable>
              <Option v-for="(item, i) in areaTypeArr" :key="i" :value="item.value">{{item.label}}</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
         <FormItem label="所属辖区" prop="community">
           <TreeSelect v-model="tEarlywarningForm.community" v-bind:disabled="disabled" :data="gridArray" />
        </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="人员姓名" prop="keypersonnelName">
            <Input v-bind:disabled="disabled" type="text" :maxlength=50 v-model="tEarlywarningForm.keypersonnelName" placeholder="请输入人员姓名"/>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="预警来源" prop="earlywarningSource">
            <Select v-bind:disabled="disabled" v-model="tEarlywarningForm.earlywarningSource" placeholder="请选择" clearable>
              <Option v-for="(item, i) in earlywarningSourceArr" :key="i" :value="item.value">{{item.label}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="处理状态" prop="processingStatus">
            <Select v-bind:disabled="disabled" v-model="tEarlywarningForm.processingStatus" placeholder="请选择" clearable>
              <Option v-for="(item, i) in processingStatusArray" :key="i" :value="item.value">{{item.label}}</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>

    </Form>
    <div slot="footer">
      <Button type="text" @click="show=false">取消</Button>
      <Button type="primary" :loading="loading" @click="handelSubmit" v-if="!disabled">提交</Button>
    </div>

    <!-- 地图弹窗 -->
    <plot
      v-model="showMap"
      :obj-data="pointArr"
      :select-type="selectType"
      div-id="tEarlywarningUpdate"
      modal-title="选择坐标点"
      @resultPoint="getResultPoint"
    />
  </Modal>
</template>
<script>
  import {
    queryTComponentmanagementTreeByPage,
  } from '@/api/zhsq/tComponentmanagement/tComponentmanagement'
  import {
    addTEarlywarning,
    updateTEarlywarning,
    getTEarlywarning,
  } from '@/api/zhsq/tEarlywarning/tEarlywarning'
  // import {getDictDataByType} from '@/api/index';
  import {formartDate} from '@/api/tools/tool'

  import plot from '@/views/gismap/components/plot'
  import olmap from '@/views/gismap/onemap/map'
  import {getDictDataByType} from '@/api/index';
  import {getDept} from '@/api/system/dept'
  import {
    loadGridDeptTreeByPage,
    loadGridDeptTreeNotPage
  } from '@/api/zhsq/system'

  export default {
    name: "updateTEarlywarning",
    components: {
      plot,
      olmap
    },
    props: {
      value: {
        type: Boolean,
        default: false
      },
      TEarlywarningId: {
        type: String
      },
      modalTitle: {
        type: String
      }
    },
    data() {
      return {
        processingStatusArray: [{
          "id":"0",
          "value":0,
          "label":"未处理"
        },
        {
          "id":"1",
          "value":1,
          "label":"已处理"
        }
        ],//处理状态
        showMap: false,//地图显示
        menuIdMap: '',
        pointArr: [],//点位坐标数据
        icon: '',//图标路径
        selectType: 'Point',//标记点类型
        isShow: 0,
        show: this.value,
        editTitle: this.modalTitle,
        loading: true,
        disabled: false,
        pidPriority: [],
        // value: 0,
        enabledRadio: [],
        tEarlywarningForm: {
          keypersonnelType: '',
          keypersonnelName: '',
          earlywarningContent: '',
          community: '',
          earlywarningSource: '',
          processingStatus: null,
          //不展示
          isShow: null,
          earlywarningType: null,
        },
        departmentName:0,
        departVisible: false,
        selectModel: "",
        tEarlywarningFormRule: this.getTEarlywarningFormRule(),
        isNotEdit:true,
        /*分页查询部件(树级)*/
        pageNumber: 1, // 当前页数
        pageSize: 10, // 页面大小
        queryName: '', // 名称 模糊查询
        startDate: null,//开始时间 模糊查询
        endDate: null,//结束时间 模糊查询
        areaTypeArr: [],//重点人员类型
        earlywarningSourceArr: [],//预警来源
        searchForm: {
          name:"",//名称
          // 搜索框对应data对象
          pageNumber: 1, // 当前页数
          pageSize: 10, // 页面大小
          startDate: null,//开始时间
          endDate: null,//结束时间
          sort: 'createTime', // 默认排序字段
          order: 'desc' // 默认排序方式
        },
        deptArray: [],//部门数据集
        gridArray: [],//所属辖区数据集
      }
    },
    methods: {
      //重点人员类型
      getDictDatakeyPersonnel() {
        getDictDataByType('keyPersonnel_type').then(res => {
          if (res && res.success) {
            this.areaTypeArr = res.data;
          } else {
            this.$Message.error(res.msg);
          }
        }).catch(err => {
          this.$Message.error('获取字典数据失败');
        });
      },
      //预警来源
      getEarlywarningSourceArr() {
        getDictDataByType('earlywarning_source').then(res => {
          if (res && res.success) {
            this.earlywarningSourceArr = res.data;
          } else {
            this.$Message.error(res.msg);
          }
        }).catch(err => {
          this.$Message.error('获取字典数据失败');
        });
      },
      //所属网格查询
      getGriddiction() {
        loadGridDeptTreeNotPage({
          attribute: 1
        }).then(res => {
          if(res && res.success) {
            if (res.data) {
              this.gridArray = this.getTreeData(res.data);
            }
          }
        }).catch(err => {
          this.loading = false
        });
      },
      //查询部门
      getDept() {
        getDept('').then(res => {
          if (res.content) {
            this.deptArray = this.getTreeData(res.content);
          }
        });
      },
      getItem(dataValue,array){
        let item;
        for(let i = 0;i < array.length;i ++){
          if(array[i].value == dataValue){
            item = array[i].title;
          }else if(array[i].children) {
            for (let j in array[i].children) {
              if(array[i].children[j].value == dataValue){
                item = array[i].children[j].title;
              }
            }
          }
        }
        return item;
      },
      streetChange(e) { // 选择辖区
        if (e) {
          this.tEarlywarningForm.jurisdiction = e.value;
        } else {
          this.tEarlywarningForm.jurisdiction = '';
        }
      },
      closeStreet() { // 清空辖区
        this.tEarlywarningForm.jurisdiction = '';
      },
      //所属辖区
      getDictData() {
        getDictDataByType('dept_name').then(res => {
          if (res && res.success) {
            this.areaTypeArr = res.data;
          } else {
            this.$Message.error(res.msg);
          }
        }).catch(err => {
          this.$Message.error('获取字典数据失败');
        });
      },
      //获取坐标点
      getResultPoint(obj, type) {
        const arr = obj.flatCoordinates
        this.tEarlywarningForm.position = JSON.stringify(arr)
        this.selectType = type;
      },
      //点击地图图标
      checkMap() {
        if (this.tEarlywarningForm.position) {
          this.pointArr = JSON.parse(this.tEarlywarningForm.position);
        }
        this.showMap = true;
      },
      //获取上级部门
      getPidPriority() {
        let _this = this;
        // getDept('').then(res => {
        //   if (res.content) {
        //     this.pidPriority = this.getTreeData(res.content);
        //   }
        // });
        queryTComponentmanagementTreeByPage({
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

            if(data[i].label == null || !data[i].label){
              data[i].title = data[i].name;
            }
            if(data[i].label != null && data[i].label){
              data[i].title = data[i].label;
            }
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
        // this.tEarlywarningForm.departmentName = this.departmentName;
        this.loading = true;
        this.$refs['tEarlywarningForm'].validate((valid) => {
          if (valid) {
            if (this.TEarlywarningId != null && this.TEarlywarningId.trim().length > 0) {
              this.tEarlywarningForm.id = this.TEarlywarningId;
              updateTEarlywarning(this.tEarlywarningForm).then(res => {
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
              if(this.tEarlywarningForm.earlywarningSource == 1){
                this.tEarlywarningForm.earlywarningType = 1;
              }else{
                this.tEarlywarningForm.earlywarningType = 0;
              }
              addTEarlywarning(this.tEarlywarningForm).then(res => {
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
        this.tEarlywarningForm = {
          keypersonnelType: '',
          keypersonnelName: '',
          earlywarningContent: '',
          community: '',
          earlywarningSource: '',
          processingStatus: null,
          //不展示
          isShow: null,
          earlywarningType: null,
        };
        this.selectModel = "";
        this.departVisible = false;
        this.departmentName = '';
      },
      getTEarlywarningFormRule() {
        return {
          earlywarningContent: [
            {required: true, message: '预警内容不能为空！', trigger: 'blur'},
          ],
          keypersonnelType: [
            {required: true, message: '重点人员不能为空！', trigger: 'blur'},
          ],
          community: [
            {required: true, message: '所属辖区不能为空！', trigger: 'blur'},
          ],
          keypersonnelName: [
            {required: true, message: '人员姓名不能为空！', trigger: 'blur'},
          ],
          earlywarningSource: [
            {required: true, message: '预警来源不能为空！', trigger: 'blur'},
          ],
          processingStatus: [
            {required: true, type: "number", message: '处理状态不能为空！', trigger: 'blur'},
          ],
          /*isShow: [
            {required: true, message: '显示状态不能为空！', trigger: 'blur'},
          ],*/
        }
      },
      //部门树点击事件
      handleCheckChange(data) {
        this.tEarlywarningForm.componentType = data[0].id;
        this.departVisible = false;
        this.selectModel = data[0].name;
      }
    },
    mounted() {
      // this.getDept();
      // this.getPidPriority();
      // this.getDictData();
      this.getGriddiction();
      this.getDictDatakeyPersonnel();
      this.getEarlywarningSourceArr();
    },
    watch: {
      value(val) {
        this.show = val;
      },
      show(val) {
        // this.getEnabledRadio();
        this.initForm();
        this.loading = false;
        this.editTitle = this.modalTitle;
        if (this.editTitle == "查看") {
          this.disabled = true;
        } else {
          this.disabled = false;
        }
        this.isNotEdit = true;
        if (val) {
          this.$refs['tEarlywarningForm'].resetFields();
          if (this.TEarlywarningId != null && this.TEarlywarningId.trim().length > 0) {
            this.isNotEdit = false;
            getTEarlywarning({id: this.TEarlywarningId}).then(res => {
              if (res!=null) {
                this.tEarlywarningForm.keypersonnelType = res.data.keypersonnelType.toString();
                this.tEarlywarningForm.keypersonnelName = res.data.keypersonnelName;
                this.tEarlywarningForm.earlywarningContent = res.data.earlywarningContent;
                this.tEarlywarningForm.community = res.data.community;
                this.tEarlywarningForm.earlywarningSource = res.data.earlywarningSource;
                this.tEarlywarningForm.processingStatus = res.data.processingStatus;
                this.tEarlywarningForm.isShow = res.data.isShow;
                this.tEarlywarningForm.earlywarningType = res.data.earlywarningType;
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
