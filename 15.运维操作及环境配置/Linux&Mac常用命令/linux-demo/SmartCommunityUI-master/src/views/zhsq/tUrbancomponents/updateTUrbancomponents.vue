<style lang="less">
  .tUrbancomponents {
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
      /*text-align: center;*/
    }

    .ivu-form-item-content {
      position: relative;
      line-height: 27px;
      font-size: 14px;
    }

    .ivu-modal .ivu-select-dropdown {
      position: absolute !important;
      width: 148.25px;
    }
  }
</style>
<template>
  <Modal v-model="show" :title="editTitle" :mask-closable="false" class="tUrbancomponents" :width="650" :draggable="false">
    <Form ref="tUrbancomponentsForm" :model="tUrbancomponentsForm" :rules="tUrbancomponentsFormRule" :label-width="90">

      <Row>
        <Col span="12">
          <FormItem label="部件类型" prop="componentType">
            <TreeSelect v-model="tUrbancomponentsForm.componentType" v-bind:disabled="disabled" :data="pidPriority" />
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="部门名称" prop="departmentName">
            <TreeSelect v-model="tUrbancomponentsForm.departmentName" v-bind:disabled="disabled" :data="deptArray" />
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="下级部门">
            <Input v-bind:disabled="disabled" type="text" :maxlength=50 v-model="tUrbancomponentsForm.lowerDepartment" placeholder="请输入部门名称"/>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="部件状态" prop="departmentStatu">
            <RadioGroup v-bind:disabled="disabled" v-model="tUrbancomponentsForm.departmentStatu">
              <Radio :label="'0'" v-bind:disabled="disabled">损坏</Radio>
              <Radio :label="'1'" v-bind:disabled="disabled">完好</Radio>
            </RadioGroup>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="所属辖区" prop="jurisdiction">
            <TreeSelect v-model="tUrbancomponentsForm.jurisdiction" v-bind:disabled="disabled" :data="gridPriority"   @on-change="onGridChange" />
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="坐标位置" prop="position">
            <Input v-bind:disabled="disabled" :maxlength=50 v-model="tUrbancomponentsForm.position" placeholder="请点击右侧标注" icon="md-map"
                   @on-click="checkMap"/>
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
      div-id="tUrbancomponentsUpdate"
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
    queryTComponentmanagementTreeNotPage
  } from '@/api/zhsq/tComponentmanagement/tComponentmanagement'
  import {
    addTUrbancomponents,
    updateTUrbancomponents,
    getTUrbancomponents,
  } from '@/api/zhsq/tUrbancomponents/tUrbancomponents'
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

  import {transData } from '@/api/tools/tool'
  import {queryAllGridsTree} from '@/api/zhsq/basicGrids/basicGrids'

  export default {
    name: "updateTUrbancomponents",
    components: {
      plot,
      olmap
    },
    props: {
      value: {
        type: Boolean,
        default: false
      },
      TUrbancomponentsId: {
        type: String
      },
      modalTitle: {
        type: String
      }
    },
    data() {
      return {
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
        tUrbancomponentsForm: {
          componentType:'',
          departmentName:'',
          lowerDepartment:'',
          departmentStatu:'',
          jurisdiction:'',
          position:'',
        },
        departmentName:0,
        departVisible: false,
        selectModel: "",
        tUrbancomponentsFormRule: this.getTUrbancomponentsFormRule(),
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
        gridValuePriority: [],
        gridPriority: [],
      }
    },
    methods: {
      //辖区查询
      getJurisdiction() {
        /*loadGridDeptTreeNotPage({
          attribute: 1
        }).then(res => {
          if(res && res.success) {
            if (res.data) {
              this.jurisdictionArray = this.getTreeData(res.data);
            }
          }
        }).catch(err => {
          this.loading = false
        });*/
        let _this = this;
        queryAllGridsTree({}).then(res => {
          if (res && res.success) {
            if (res.data) {
              _this.gridValuePriority = JSON.parse(JSON.stringify(res.data))
              _this.gridPriority = transData(res.data, 'id', 'pid', 'children');
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
          this.tUrbancomponentsForm.jurisdiction = e.value;
        } else {
          this.tUrbancomponentsForm.jurisdiction = '';
        }
      },
      closeStreet() { // 清空辖区
        this.tUrbancomponentsForm.jurisdiction = '';
      },
      //辖区选择
      onGridChange(e) {
        if (e) {
          this.tUrbancomponentsForm.jurisdiction = e;
          let grid = this.gridValuePriority.filter(item => item.id == e)
          if (grid == null || grid == undefined || grid.length <= 0) {
            this.$Message.error('选择辖区失败，请联系管理员');
            return
          }
          let seleteLevel = grid[0].lel;
          //没有选择网格
          if (seleteLevel != 2 && seleteLevel != '2') {
            this.tUrbancomponentsForm.jurisdiction = '';
            this.$Message.error('请选择网格！！！');
            return
          }
        }
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
        this.tUrbancomponentsForm.position = JSON.stringify(arr)
        this.selectType = type;
      },
      //点击地图图标
      checkMap() {
        if (this.tUrbancomponentsForm.position) {
          this.pointArr = JSON.parse(this.tUrbancomponentsForm.position);
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
        queryTComponentmanagementTreeNotPage({
          // pageNum: this.pageNum,
          // pageSize: this.pageSize,
          // name: this.queryName,
          // startDate: this.startDate,
          // endDate: this.endDate,
        }).then(res => {
          if(res && res.success) {
            if (res.data) {
              _this.pidPriority = _this.getTreeData(res.data);
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
        // this.tUrbancomponentsForm.departmentName = this.departmentName;
        this.loading = true;
        this.$refs['tUrbancomponentsForm'].validate((valid) => {
          if (valid) {
            if (this.TUrbancomponentsId != null && this.TUrbancomponentsId.trim().length > 0) {
              this.tUrbancomponentsForm.id = this.TUrbancomponentsId;
              updateTUrbancomponents(this.tUrbancomponentsForm).then(res => {
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
              addTUrbancomponents(this.tUrbancomponentsForm).then(res => {
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
        this.tUrbancomponentsForm = {
          componentType:'',
          departmentName:'',
          lowerDepartment:'',
          departmentStatu:'',
          jurisdiction:'',
          position:'',
        };
        this.selectModel = "";
        this.departVisible = false;
        this.departmentName = '';
      },
      getTUrbancomponentsFormRule() {
        return {
          componentType: [
            {required: true, message: '部件类型不能为空！', trigger: 'blur'},
          ],
          departmentName: [
            // {required: true, message: '部门名称不能为空！', trigger: 'blur'},
            {required: true, pattern: /^[0-9]+$/, message: '部门名称不能为空！', trigger: 'blur'},
          ],
          lowerDepartment: [
            {required: true, message: '下级部门不能为空！', trigger: 'blur'},
          ],
          departmentStatu: [
            {required: true, message: '部件状态不能为空！', trigger: 'blur'},
          ],
          jurisdiction: [
            {required: true, message: '所属辖区不能为空！', trigger: 'blur'},
          ],
          // position: [
          //   {required: true, message: '坐标位置不能为空不能为空！', trigger: 'blur'},
          // ],
        }
      },
      //部门树点击事件
      handleCheckChange(data) {
        this.tUrbancomponentsForm.componentType = data[0].id;
        this.departVisible = false;
        this.selectModel = data[0].name;
      }
    },
    mounted() {
      this.getDept();
      this.getPidPriority();
      this.getDictData();
      this.getJurisdiction();
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
          this.$refs['tUrbancomponentsForm'].resetFields();
          if (this.TUrbancomponentsId != null && this.TUrbancomponentsId.trim().length > 0) {
            this.isNotEdit = false;
            getTUrbancomponents({id: this.TUrbancomponentsId}).then(res => {
              if (res!=null) {
                this.tUrbancomponentsForm.componentType = res.data.componentType;
                this.tUrbancomponentsForm.departmentName = res.data.departmentName;
                this.tUrbancomponentsForm.departmentName = parseInt(res.data.departmentName);
                this.departmentName = res.data.departmentName;
                let item = this.getItem(res.data.departmentName,this.deptArray);
                this.tUrbancomponentsForm.lowerDepartment = res.data.lowerDepartment;
                this.tUrbancomponentsForm.departmentStatu = res.data.departmentStatu;
                this.tUrbancomponentsForm.jurisdiction = res.data.jurisdiction;
                this.tUrbancomponentsForm.position = res.data.position;
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
