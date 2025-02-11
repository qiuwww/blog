<style lang="less">
  .tArmedequipment {
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
      text-align: center;
    }

    .ivu-form-item-content {
      position: relative;
      line-height: 27px;
      font-size: 14px;
    }
  }
</style>
<template>
  <Modal v-model="show" :title="editTitle" :mask-closable="false" class="tArmedequipment" :width="650" :draggable="false">
    <Form ref="tArmedequipmentForm" :model="tArmedequipmentForm" :rules="tArmedequipmentFormRule" :label-width="90">

      <Row>
        <Col span="12">
          <FormItem label="设备名称" prop="equipmentName">
            <Input v-bind:disabled="disabled" type="text" :maxlength=50 v-model="tArmedequipmentForm.equipmentName" placeholder="请输入设备名称"/>

          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="设备类型" prop="equipmentType">
            <Select v-bind:disabled="disabled" v-model="tArmedequipmentForm.equipmentType" placeholder="请选择" clearable>
              <Option v-for="(item, i) in areaTypeArr" :key="i" :value="item.value">{{item.label}}</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
         <FormItem label="显示状态" prop="isLabel">
          <RadioGroup v-bind:disabled="disabled" v-model="tArmedequipmentForm.isLabel">
            <Radio v-bind:disabled="disabled" :label="'0'">隐藏</Radio>
            <Radio v-bind:disabled="disabled" :label="'1'">显示</Radio>
          </RadioGroup>
        </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="设备数量" prop="equipmentNumber">
            <InputNumber style="width: 209px;" :max="1000" :min="0" v-bind:disabled="disabled" v-model="tArmedequipmentForm.equipmentNumber" placeholder="请输入设备数量"/>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="坐标位置">
            <Input v-bind:disabled="disabled" :maxlength=50 v-model="tArmedequipmentForm.position" placeholder="请点击右侧标注" icon="md-map"
                   @on-click="checkMap"/>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="位置名称">
            <Input v-bind:disabled="disabled" type="text" :maxlength=50 v-model="tArmedequipmentForm.placeName" placeholder="请输入位置名称"/>
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
      div-id="tArmedequipmentUpdate"
      modal-title="选择坐标点"
      @resultPoint="getResultPoint"
    />

<!--    <div v-if="showMap" id="apponemap" class="appstyle">-->
<!--      <olmap />-->
<!--    </div>-->
  </Modal>
</template>
<script>
  import {
    queryTComponentmanagementTreeByPage,
  } from '@/api/zhsq/tComponentmanagement/tComponentmanagement'
  import {
    addTArmedequipment,
    updateTArmedequipment,
    getTArmedequipment,
  } from '@/api/zhsq/tArmedequipment/tArmedequipment'
  // import {getDictDataByType} from '@/api/index';
  import {formartDate} from '@/api/tools/tool'

  import plot from '@/views/gismap/components/plot'
  import olmap from '@/views/gismap/onemap/map'
  import {getDictDataByType} from '@/api/index';
  import {getDept} from '@/api/system/dept'
  import {
    loadGridDeptTreeByPage,
  } from '@/api/zhsq/system'

  export default {
    name: "updateTArmedequipment",
    components: {
      plot,
      olmap
    },
    props: {
      value: {
        type: Boolean,
        default: false
      },
      TArmedequipmentId: {
        type: String
      },
      modalTitle: {
        type: String
      }
    },
    data() {
      return {
        areaTypeArr: [],
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
        tArmedequipmentForm: {
          equipmentName: '',
          equipmentType: '',
          equipmentNumber: null,
          isLabel: '',
          position:'',
          placeName:'',
        },
        departmentName:0,
        departVisible: false,
        selectModel: "",
        tArmedequipmentFormRule: this.getTArmedequipmentFormRule(),
        isNotEdit:true,
        /*分页查询部件(树级)*/
        pageNumber: 1, // 当前页数
        pageSize: 10, // 页面大小
        queryName: '', // 名称 模糊查询
        startDate: null,//开始时间 模糊查询
        endDate: null,//结束时间 模糊查询
        areaTypeArr: [],//所属辖区
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
        jurisdictionArray: [],//辖区数据集
      }
    },
    methods: {
      //设备类型
      getDictDataEquipment() {
        getDictDataByType('armedequipment_type').then(res => {
          if (res && res.success) {
            this.areaTypeArr = res.data;
          } else {
            this.$Message.error(res.msg);
          }
        }).catch(err => {
          this.$Message.error('获取字典数据失败');
        });
      },
      //辖区查询
      getJurisdiction() {
        loadGridDeptTreeByPage({
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          // name: this.queryStr,
          attribute: 1
        }).then(res => {
          if(res && res.success) {
            if (res.data && res.data.records) {
              this.jurisdictionArray = this.getTreeData(res.data.records);
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
          this.tArmedequipmentForm.jurisdiction = e.value;
        } else {
          this.tArmedequipmentForm.jurisdiction = '';
        }
      },
      closeStreet() { // 清空辖区
        this.tArmedequipmentForm.jurisdiction = '';
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
        this.tArmedequipmentForm.position = JSON.stringify(arr)
        this.selectType = type;
      },
      //点击地图图标
      checkMap() {
        if (this.tArmedequipmentForm.position) {
          this.pointArr = JSON.parse(this.tArmedequipmentForm.position);
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
        // this.tArmedequipmentForm.departmentName = this.departmentName;
        this.loading = true;
        this.$refs['tArmedequipmentForm'].validate((valid) => {
          if (valid) {
            if (this.TArmedequipmentId != null && this.TArmedequipmentId.trim().length > 0) {
              this.tArmedequipmentForm.id = this.TArmedequipmentId;
              updateTArmedequipment(this.tArmedequipmentForm).then(res => {
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
              addTArmedequipment(this.tArmedequipmentForm).then(res => {
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
        this.tArmedequipmentForm = {
          equipmentName: '',
          equipmentType: '',
          equipmentNumber: null,
          isLabel: '',
          position:'',
          placeName:'',
        };
        this.selectModel = "";
        this.departVisible = false;
        this.departmentName = '';
      },
      getTArmedequipmentFormRule() {
        return {
          equipmentName: [
            {required: true, message: '设备名称不能为空！', trigger: 'blur'},
          ],
          equipmentType: [
            {required: true, message: '设备类型不能为空！', trigger: 'blur'},
          ],
          equipmentNumber: [
            // {required: true, message: '设备数量不能为空！', trigger: 'blur'},
            {required: true,type: "number",message: "设备数量不能为空",trigger: "blur"},
          ],
          isLabel: [
            {required: true, message: '显示状态不能为空！', trigger: 'blur'},
          ],
          position: [
            {required: true, message: '坐标位置不能为空！', trigger: 'blur'},
          ],
          placeName: [
            {required: true, message: '位置名称不能为空！', trigger: 'blur'},
          ],
        }
      },
      //部门树点击事件
      handleCheckChange(data) {
        this.tArmedequipmentForm.componentType = data[0].id;
        this.departVisible = false;
        this.selectModel = data[0].name;
      }
    },
    mounted() {
      // this.getDept();
      // this.getPidPriority();
      // this.getDictData();
      // this.getJurisdiction();
      this.getDictDataEquipment();
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
          this.$refs['tArmedequipmentForm'].resetFields();
          if (this.TArmedequipmentId != null && this.TArmedequipmentId.trim().length > 0) {
            this.isNotEdit = false;
            getTArmedequipment({id: this.TArmedequipmentId}).then(res => {
              if (res!=null) {
                this.tArmedequipmentForm.equipmentName = res.data.equipmentName;
                this.tArmedequipmentForm.equipmentType = res.data.equipmentType;
                this.tArmedequipmentForm.equipmentNumber = res.data.equipmentNumber;
                this.tArmedequipmentForm.isLabel = res.data.isLabel;
                this.tArmedequipmentForm.position = res.data.position;
                this.tArmedequipmentForm.placeName = res.data.placeName;
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
