<style lang="scss">
  .tZhsqGridEventList {
    .form-item-input {
      width: 200px;
    }

    .ivu-form .ivu-form-item-label {
      width: 120px;
    }
    .ivu-form-item-error-tip {
      padding-top: 2px;

    }
    .ivu-modal .ivu-select-dropdown {
      position: absolute !important;
    }

    .ivu-form-item-content .address_class input {
      width: 523px;
    }

    .ivu-modal .ivu-select-dropdown {
      position: absolute !important;
      width: 236px;
    }

    .ivu-picker-panel-body {
      float: left;
      width: 236px;
    }

    .ivu-date-picker-cells {
      width: 216px;
      margin: 10px;
      white-space: normal;
    }

    textarea.ivu-input {
      max-width: 100%;
      height: auto;
      min-height: 32px;
      min-height: 58px;
      vertical-align: bottom;
      font-size: 14px;
    }


    //图片视频上传
    .img-delete {
      display: inline-block;
      position: absolute;
      border-radius: 50%;
      z-index: 20;
      width: 10px;
      height: 10px;
      line-height: 10px;
      right: 0px;
      top: 0px;
      text-align: center;
      background: #31435C;
      color: #fff;

      cursor: pointer;
    }

    .demo-upload-list {
      display: inline-block;
      width: 60px;
      height: 60px;
      text-align: center;
      line-height: 60px;
      border: 1px solid transparent;
      border-radius: 4px;
      overflow: hidden;
      background: #fff;
      position: relative;
      /*box-shadow: 0 1px 1px rgba(0,0,0,.2);*/
      margin-right: 4px;
    }

    .demo-upload-list img {
      width: 100%;
      height: 100%;
    }

    .demo-upload-list-cover {
      display: none;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(0, 0, 0, .6);
    }

    .demo-upload-list:hover .demo-upload-list-cover {
      display: block;
    }

    .demo-upload-list-cover i {
      color: #fff;
      font-size: 20px;
      cursor: pointer;
      margin: 0 2px;
    }

    .ivu-form-item-content {
      position: relative;
      line-height: 32px;
      font-size: 14px;
      display: flex;
    }

  }
</style>
<template>
  <Modal class="tZhsqGridEventList" v-model="show" :title="editTitle" :mask-closable="true" :width="1100"
         :draggable="false">
    <Form ref="tZhsqEventListForm" :model="tZhsqEventListForm" :rules="tZhsqEventListFormRule" :label-width="110">
      <Row>
        <Col span="8">
          <FormItem label="事件类型" prop="eventsTypeId">
            <TreeSelect v-model="tZhsqEventListForm.eventsTypeId" v-bind:disabled="!isNotEdit"
                        :data="eventsTypeIdPriority" @on-change="onEventsTypeChange"/>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="事件标题" prop="title">
            <Input type="text" :maxlength=50 v-model="tZhsqEventListForm.title" placeholder="请输入事件标题"/>
          </FormItem>
        </Col>

        <Col span="8">
          <FormItem label="事件来源" prop="dataFrom">
            <Select v-model="tZhsqEventListForm.dataFrom" placeholder="请选择事件来源" clearable>
              <Option v-for="(item, i) in dataFromPriority" :key="i" :value="item.value.toString()">{{item.label}}
              </Option>
            </Select>
          </FormItem>
        </Col>
        <!--        <Col span="8">-->
        <!--          <FormItem label="上报类型" prop="reportType">-->
        <!--            <Select v-model="tZhsqEventListForm.reportType" v-bind:disabled="!isNotEdit" placeholder="请选择上报类型" clearable >-->
        <!--              <Option v-for="(item, i) in reportTypeArray" v-bind:disabled="!isNotEdit" :key="item.id" :value="item.id.toString()">{{item.label}}</Option>-->
        <!--            </Select>-->
        <!--          </FormItem>-->
        <!--        </Col>-->
      </Row>
      <Row>

        <Col span="8">
          <FormItem label="开始时间" prop="happenDate">
            <DatePicker type="datetime" style="width:236px;" :editable="false" placeholder="请选择开始时间"
                        v-model="tZhsqEventListForm.happenDate" @on-change="sethappenDate" :options="buildingYearOptionsStart"
                        format="yyyy-MM-dd HH:mm:ss"></DatePicker>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="结束时间" prop="endDate">
            <DatePicker type="datetime" style="width:236px;" :editable="false" placeholder="请选择结束时间"
                        v-model="tZhsqEventListForm.endDate" @on-change="setendDate"
                        format="yyyy-MM-dd HH:mm:ss"></DatePicker>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="办结时间">
            <DatePicker type="datetime" style="width:236px;" :editable="false" placeholder="请选择办结时间"
                        v-model="tZhsqEventListForm.requirementDate" @on-change="setrequirementDate" :options="buildingYearOptionsEnd"
                        format="yyyy-MM-dd HH:mm:ss"></DatePicker>
          </FormItem>
        </Col>

      </Row>
      <Row>
        <Col span="8">
          <FormItem label="地图标注" prop="position">
            <Input type="text" :maxlength=50 v-model="tZhsqEventListForm.position" placeholder="请选择地点" icon="md-map"
                   :readonly="true" @on-click="checkMap"/>
          </FormItem>
        </Col>

        <Col span="8">
          <FormItem label="当事人">
            <Input type="text" v-model="tZhsqEventListForm.partyName" placeholder="请输入当事人"/>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="联系电话" prop="telephone">
            <Input type="text" :maxlength=50 v-model="tZhsqEventListForm.telephone" placeholder="请输入联系电话"/>
          </FormItem>
        </Col>
      </Row>
      <Row>


        <Col span="8">
          <FormItem label="所属辖区" prop="gridId">
            <TreeSelect v-model="tZhsqEventListForm.gridId" :data="gridPriority" @on-change="onGridChange"/>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="网格员" prop="gridMember">
<!--            <Input type="text" :maxlength=50 v-model="tZhsqEventListForm.gridMember" placeholder="请输入网格员"/>-->
            <Select  v-model="tZhsqEventListForm.gridMember" placeholder="请选择网格员" clearable>
              <Option v-for="(item, i) in executorPriority" :key="i" :value="item.id.toString()">
                {{ item.name }}
              </Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row>

        <Col span="8">
          <FormItem label="相关语音">
            <Upload
              :on-success="handleUploadSuccess"
              :before-upload="handleUpload"
              action="/api/download/fileUpload">
              <Button style="width: 236px;" icon="ios-cloud-upload-outline">
                <div v-if="isNotEdit">点击选择要上传的文件</div>
                <div v-if="!isNotEdit">点击替换已上传的文件</div>
              </Button>
            </Upload>
          </FormItem>
        </Col>
      </Row>
      <Col span="24">
        <FormItem label="事件地址" prop="address">
          <Input type="textarea" :maxlength=50 v-model="tZhsqEventListForm.address" placeholder="请输入事件地址"/>
        </FormItem>
      </Col>
      <Row>
        <Col span="24">
          <FormItem label="事件描述" prop="remark">
            <Input
              v-model="tZhsqEventListForm.remark"
              type="textarea"
              placeholder="请输入事件描述"
            />
          </FormItem>
        </Col>
        <!--<Col span="8">
          <FormItem label="发起人">
            <Input type="text" style="width: 236px;" v-model="userForm.nickName" disabled placeholder="请输入发起人"/>
          </FormItem>
        </Col>-->
      </Row>
      <div v-if="isNotEdit">
        <Row>
          <Col span="24">
            <!--<FormItem label="图片视频">
              <Input type="text" v-model="tZhsqEventListForm.mediaAddress" placeholder="请输入图片视频"/>
            </FormItem>-->
            <FormItem label="图片视频">
              <div v-if="uploadFileArrayUrl.length > 0">
                <div class="demo-upload-list" style="width: 65px;height: 65px;" v-for="(item, i)  in uploadFileArrayUrl"
                     v-viewer="{movable: false}">
                  <template v-if="item.indexOf('.mp4') == -1" @click.native="handleView(item)">
                    <img :src="item" style="width: 58px;height: 58px;margin-top: 4px;margin-right: 0px;">
                    <div class="img-delete" @click.stop="handleRemove(item)">x</div>
                  </template>
                  <template v-else>
                    <video :src="item" :direction="0"
                           style="width: 58px;height: 58px;margin-top: 4px;margin-right: 0px;object-fit:fill;"
                           ref="myVideo" controls></video>
                    <div class="img-delete" @click.stop="handleRemove(item)">x</div>
                  </template>
                </div>
              </div>
              <Upload
                ref="upload"
                :show-upload-list="false"
                :default-file-list="defaultList"
                :on-success="handleSuccess"
                :format="['jpg','jpeg','png','mp4']"
                :max-size="2048"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleMaxSize"
                :before-upload="handleBeforeUpload"
                multiple
                type="drag"
                action="/api/download/fileUpload"
                style="display: inline-block;width:58px;margin-top: 4px;">
                <div style="width: 58px;height:58px;line-height: 58px;">
                  <Icon type="ios-camera" size="20"></Icon>
                </div>
              </Upload>
              <!-- action="http://192.168.1.147:8014/api/download/fileUpload" -->
              <Modal title="View Image" v-model="visible">
                <img :src="imgName" v-if="visible" style="width: 100%">
              </Modal>
            </FormItem>
          </Col>

        </Row>
      </div>
    </Form>
    <div slot="footer">
      <Button type="text" @click="show=false">取消</Button>
      <Button type="primary" :loading="loading" @click="handelSubmit">提交</Button>
    </div>

    <plot v-model="ShowMap" modalTitle="选择坐标点" @resultPoint="getPosition" divId="updateTZhsqEventList"
          :objData="pointArr" iconPath="/img/archives/shanghu.png" :selectType="selectTypee"></plot>
  </Modal>
</template>
<script>
  import {getDictDataByType} from '@/api/index';
  import {formartDate, transData} from '@/api/tools/tool'
  import {queryAllList, queryAllGridsTree} from '@/api/zhsq/basicGrids/basicGrids'
  import plot from "@/views/gismap/components/plot";
  import uploadHeaderImg from '@/components/uploadHeaderImg'
  import {
    addEvents,
    addEventsSelf,
    modifyEvent,
    queryEventsTypeTreeNotPage
  } from '@/api/events'

  import {mapGetters} from "vuex";
  import store from '@/store'
  import {
    deletImg as fileDelete,
  } from "@/api/utils"
  import {add, edit, getAllUsers, deleteUser, patchUpdateState, getDeptTree} from "@/api/system/user"
  import {queryGridMemberList} from '@/api/zhsq/tZhsqGridMember/tZhsqGridMember'
  export default {
    name: "editandAddEvent",
    components: {
      uploadHeaderImg
    },
    props: {
      value: {
        type: Boolean,
        default: false
      },
      TZhsqEventListId: {
        type: String
      },
      modalTitle: {
        type: String
      }
    },
    data() {
      const validateEndDate = (rule, value, callback) => {
        debugger
        if (!value) {
          return callback(new Error('事件结束时间不能为空'));
        }
        if (value == undefined || value == null || value.toString().trim() === '') {
          callback(new Error('不能为空'));
        } else if (this.tZhsqEventListForm && this.tZhsqEventListForm.happenDate != "" && this.tZhsqEventListForm.happenDate > value.toString()) {

          callback(new Error('事件结束时间不得早于事件时间'));
        } else {
          callback();
        }
      };
      return {
        //时间控件限定
        buildingYearOptionsStart: {
          disabledDate(date) {
            return date && date.valueOf() > Date.now();
          }
        },
        //时间控件限定
        buildingYearOptionsEnd: {
          disabledDate(date) {
            return date && date.valueOf() < Date.now();
          }
        },
        validateEndDate: validateEndDate,
        uploadFileArray: [],
        uploadFileArrayUrl: [],
        //文件上传
        file: null,
        loadingStatus: false,

        imageUrl: '',
        disabled: false,
        show: this.value,
        editTitle: this.modalTitle,
        loading: true,
        tZhsqEventListForm: {
          eventsTypeId: '',
          title: '',
          gridId: '',
          createUser: '',
          happenDate: null,
          endDate: null,
          executor: '',
          nodeId: '',
          nodeName: '',
          dataFrom: '',
          status: '',
          position: '',
          eventsTypes: {
            procDefId: '',
          },
          reportType: '',
          mediaAddress: '',
          audioMediaAddress: '',
          remark: '',
          telephone: '',
          gridMember: '',
          partyName: '',
          requirementDate: null,
          address: '',
          isHandleSelf: '',
        },
        userForm: {
          id: '',
          nickName: '',
        },
        usersData: [],//用户查询
        userAllForm: {//用户查询
          blurry: '',
          // deptId: 0,//部门id
          page: 1, // 当前页数
          size: 10, // 页面大小
          sort: "username", // 默认排序字段
        },
        isNotEdit: true,
        tZhsqEventListFormRule: this.getTZhsqEventListFormRule(),
        eventsTypeIdPriority: [],
        eventsTypePriority: [],
        streetData: [],
        communityArr: [],
        gridPriority: [],//网格树（转换后）
        gridValuePriority: [],//网格树（转换前）
        executorPriority: [],
        statusPriority: [],
        ShowMap: false,
        pointArr: [],
        selectTypee: 'Point',
        statusName: '',
        dataFromPriority: [],
        reportTypeArray: [
          {
            id: 1,
            label: '流程审批',
          },
          {
            id: 2,
            label: '自办自结',
          }
        ],
        //图片视频上传
        defaultList: [],
        imgName: '',
        visible: false,
        uploadList: [],
        seleteLevel: 0,
      }
    },
    computed: {
      ...mapGetters(['pageSize', 'pageNum', 'queryStr'])
    },
    mounted() {
      // this.uploadList = this.$refs.upload.fileList;
    },
    methods: {
      //文件上传(音频) 获取文件信息
      handleUpload(file) {
        this.file = file;
        console.log('获取文件信息');
        console.log(this.file);
        // return false;
      },
      handleUploadSuccess(res, file) {
        this.tZhsqEventListForm.audioMediaAddress = res.data;
      },
      //文件上传) 上传后台
      upload() {
        this.loadingStatus = true;
        setTimeout(() => {
          this.file = null;
          this.loadingStatus = false;
          this.$Message.success('Success')
        }, 1500);
      },
      //图片视频上传 查看器
      handleView(url) {
        const viewer = this.$el.querySelector('.demo-upload-list').$viewer;
        viewer.show();
      },
      fileRemove(url) {
        fileDelete({
          url: url
        }).then(res => {
          if (res.code == 200) {
            this.$Message.success('删除成功');
          } else {
            this.$Message.error('删除失败');
          }
        });
      },
      handleRemove(url) {
        this.fileRemove(url);
        const uploadFileArrayUrl = this.uploadFileArrayUrl;
        this.uploadFileArrayUrl.splice(uploadFileArrayUrl.indexOf(url), 1);
      },
      handleSuccess(res, file) {
        console.log('图片视频上传，文件信息');
        console.log(res);
        console.log(file);
        this.uploadFileArrayUrl.push(res.data);
        this.uploadFileArray.push({
          nodeId: '',
          nodeName: '',
          url: res.data,
        })
      },
      handleFormatError(file) {
        this.$Notice.warning({
          title: '文件格式不正确',
          desc: '文件 ' + file.name + ' 的格式是不正确的i, 请选择jpg、jpeg、png、mp4文件'
        });
      },
      handleMaxSize(file) {
        this.$Notice.warning({
          title: '超过文件大小限制',
          desc: '文件  ' + file.name + ' 太大, 不能超过2M'
        });
      },
      handleBeforeUpload() {
        const check = this.uploadFileArrayUrl.length < 5;
        if (!check) {
          this.$Notice.warning({
            title: '最多可上传五个文件'
          });
        }
        return check;
      },

      onFileUploadSuccess(res, file) {

        this.imageUrl = res.data;
      },
      onFileUploadError(file) {
        this.$Message.error('图片上传失败！');
      },
      onRemovePath() {
        this.imageUrl = '';
      },
      //获取用户信息
      getUserInfo() {
        store.dispatch('GetInfo').then((res) => {
          this.userForm.nickName = res.nickName;
          this.userForm.id = res.id;
          this.tZhsqEventListForm.createUser = res.id;
        })
      },
      getStatusData() {//初始化事件状态
        getDictDataByType('status').then(res => {
          if (res && res.success) {
            this.statusPriority = res.data;
          }
        })
      },
      //初始化事件分类
      getSortData() {
        queryEventsTypeTreeNotPage({}).then(res => {
          if (res && res.success) {
            if (res.data) {
              //展开第一层
              this.eventsTypePriority = res.data;
              this.eventsTypeIdPriority = this.getTreeData(res.data);
            }
          }
        }).catch(err => {
          this.loading = false
        });
      },
      /**
       * 事件类型选择
       * @param e
       */
      onEventsTypeChange(e){
        let _this = this;
        if (e) {
          _this.tZhsqEventListForm.eventsTypeId = e;
          //查找procDefId
          for (let i = 0; i < _this.eventsTypePriority.length; i++) {
            if (_this.eventsTypePriority[i].id == _this.tZhsqEventListForm.eventsTypeId) {
              _this.tZhsqEventListForm.eventsTypes.procDefId = _this.eventsTypePriority[i].procDefId;
              i = _this.eventsTypePriority.length - 1;
            } else if (_this.eventsTypePriority[i].children && _this.eventsTypePriority[i].children.length>0) {
              //在事件类型children中查找procDefId
              _this.tZhsqEventListForm.eventsTypes.procDefId = _this.childrenProcDefId(_this.eventsTypePriority[i].children, _this.tZhsqEventListForm.eventsTypeId);
            }
          }
        }

      },
      //辖区选择
      onGridChange(e) {
        if (e) {
          this.tZhsqEventListForm.gridId = e;
          let grid = this.gridValuePriority.filter(item => item.id == e)
          if (grid == null || grid == undefined || grid.length <= 0) {
            this.tZhsqEventListForm.gridId = "";
            this.$Message.error('选择辖区失败，请联系管理员');
            return
          }
          this.seleteLevel = grid[0].lel;
          //没有选择网格
          if (this.seleteLevel != 2 && this.seleteLevel != '2') {
            this.$Message.error('请选择网格！！！');
            this.tZhsqEventListForm.gridId = "";
            return
          }
          this.loading = true;

          queryGridMemberList({gridId: e}).then(res => {
            this.loading = false;
            if (res && res.success) {
              this.executorPriority = res.data
            } else {
              this.$Message.error('获取网格数据失败，请重新刷新');
            }
          });
        }
      },
      //辖区查询
      getJurisdiction() {
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
      //生成类型树
      getTreeData(data) {
        if (data) {
          for (let i in data) {
            if (data[i] == undefined || data[i] == null) {
              continue;
            }
            if (data[i].name == null && !data[i].name) {
              data[i].title = data[i].name;
            }
            if (data[i].label != null && data[i].label) {
              data[i].title = data[i].label;
            }
            data[i].value = data[i].id;
            // data[i].expand = true;

            if (data[i].children) {
              data[i].children = this.getTreeData(data[i].children);
            }
          }
        }
        return data;
      },
      getExecutorData() {//初始化执行人
        getDictDataByType('executor').then(res => {
          if (res && res.success) {
            this.executorPriority = res.data;
          }
        })
      },
      //点击地图图标
      checkMap() {
        if (this.tZhsqEventListForm.position) {
          this.pointArr = JSON.parse(this.tZhsqEventListForm.position);
        }
        this.ShowMap = true;
      },
      getPosition(obj, type) {
        this.tZhsqEventListForm.position = JSON.stringify(obj.flatCoordinates);
      },
      //设置事件开始时间
      sethappenDate(e) {
        this.tZhsqEventListForm.happenDate = e.toString();
      },
      //设置事件结束时间
      setendDate(e) {
        this.tZhsqEventListForm.endDate = e.toString();
      },
      //设置要求/办结时间
      setrequirementDate(e) {
        this.tZhsqEventListForm.requirementDate = e.toString();
      },
      reductionDate(date) {//转换时间
        let d = new Date(date);
        d = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
        return d;
      },
      //提交
      handelSubmit() {
        let _this = this;
        this.$refs['tZhsqEventListForm'].validate((valid) => {
          if (valid) {
            //没有选择网格
            if (_this.seleteLevel != 2 && _this.seleteLevel != '2') {
              _this.$Message.error('请选择网格！！！');
              return
            }
            if (_this.uploadFileArrayUrl.length > 0) {
              for (let i = 0; i < _this.uploadFileArrayUrl.length; i++) {
                _this.tZhsqEventListForm.mediaAddress += '' + _this.uploadFileArrayUrl[i] + ';';
              }
            }
            this.loading = true;
            if (this.TZhsqEventListId != null && this.TZhsqEventListId.trim().length > 0) {
              this.tZhsqEventListForm.id = this.TZhsqEventListId;
              this.tZhsqEventListForm.happenDate = this.reductionDate(this.tZhsqEventListForm.happenDate);
              if (this.tZhsqEventListForm.endDate) {
                this.tZhsqEventListForm.endDate = this.reductionDate(this.tZhsqEventListForm.endDate);
              }
              if (this.tZhsqEventListForm.requirementDate) {
                this.tZhsqEventListForm.requirementDate = this.reductionDate(this.tZhsqEventListForm.requirementDate);
              }
              modifyEvent(_this.tZhsqEventListForm).then(res => {
                _this.loading = false;
                if (res && res.code == 200) {
                  _this.closeModal(false);
                  _this.$emit('handleSearch');
                  _this.$Message.success('保存成功');
                } else {
                  _this.$Message.error(res.msg);
                }
              }).catch(error => {
                _this.loading = false;
              })
            } else {
              _this.tZhsqEventListForm.happenDate = _this.reductionDate(_this.tZhsqEventListForm.happenDate);
              if (_this.tZhsqEventListForm.endDate) {
                _this.tZhsqEventListForm.endDate = _this.reductionDate(_this.tZhsqEventListForm.endDate);
              }
              if (_this.tZhsqEventListForm.requirementDate) {
                _this.tZhsqEventListForm.requirementDate = _this.reductionDate(_this.tZhsqEventListForm.requirementDate);
              }
              //若不存在 默认status初始值为1
              if (!this.tZhsqEventListForm.status || this.tZhsqEventListForm.status == null || this.tZhsqEventListForm.status == undefined) {
                this.tZhsqEventListForm.status = 1;
              }

              // console.log('事件新增数据信息:');
              // console.log(_this.tZhsqEventListForm);
              addEvents(_this.tZhsqEventListForm).then(res => {
                this.loading = false;
                if (res && res.code == 200) {
                  _this.closeModal(false);
                  _this.$emit('handleSearch');
                  _this.$Message.success('保存成功');
                } else {
                  _this.$Message.error(res.msg);
                }
              }).catch(error => {
                _this.loading = false;
              })
            }
          } else {
            _this.$Message.error('表单验证不通过！');
          }
        });
      },
      //查找流程定义id(在事件类型children中查)
      childrenProcDefId(children, id) {
        let _this = this;
        for (let i = 0; i < children.length; i++) {
          if (children[i].id == id) {
            return children[i].procDefId;
          } else if (children[i].children && children[i].children != null && _children[i].children != undefined) {
            _this.childrenProcDefId(children[i].children, id);
          }
          return '';
        }
      },
      closeModal(val) {
        this.$emit('input', val);
      },
      getAllUsersData() {
        getAllUsers(this.userAllForm).then(res => {
          if (res && res.success) {
            this.usersData = res.data.content;
          }
        });
      },
      initForm() {
        this.tZhsqEventListForm = {
          eventsTypeId: '',
          title: '',
          gridId: '',
          createUser: '',
          happenDate: null,
          endDate: null,
          executor: '',
          nodeId: '',
          nodeName: '',
          dataFrom: '',
          status: '',
          position: '',
          eventsTypes: {
            procDefId: '',
          },
          reportType: '',
          mediaAddress: '',
          audioMediaAddress: '',
          remark: '',
          telephone: '',
          gridMember: '',
          partyName: '',
          requirementDate: null,
          address: '',
          isHandleSelf: '',
        };
        this.pointArr = null;
        this.getJurisdiction();
        this.getSortData();
        this.getExecutorData();
        //获取用户信息
        this.getAllUsersData();
        this.getUserInfo();
        this.uploadFileArray = [];
        this.uploadFileArrayUrl = [];

        //事件来源 数据字典加载数据
        getDictDataByType("eventFrom", {}).then(res => {
          if (res && res.success) {
            this.dataFromPriority = res.data;
          }
        });
      },
      getTZhsqEventListFormRule() {
        let _this = this;
        return {
          eventsTypeId: [
            {required: true, message: '事件类型不能为空！', trigger: 'changer', pattern: /.+/},
          ],
          title: [
            {required: true, message: '事件标题不能为空！', trigger: 'blur'},
            {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
          ],
          gridId: [
            {required: true, message: '所属辖区不能为空！', trigger: 'blur'},
          ],
          createUser: [
            {required: true, message: '发起人不能为空！', trigger: 'blur'},
            {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
          ],
          happenDate: [
            {required: true, message: '开始时间不能为空！', trigger: 'changer', pattern: /.+/},
          ],
          endDate: [
            {required: false, message: '结束时间不能为空！', trigger: 'changer', pattern: /.+/},
            {validator: _this.validateEndDate, trigger: 'blur'}
          ],

          executor: [
            {required: true, message: '执行人不能为空！', trigger: 'changer', pattern: /.+/},
          ],
          // gridMember: [
          //   {required: true, message: '网格员不能为空！', trigger: 'changer', pattern: /.+/},
          // ],
          position: [
            {required: true, message: '地图标注不能为空！', trigger: 'changer', pattern: /.+/},
          ],
          telephone: [
            {required: false, message: '联系电话不能为空！', trigger: 'changer', pattern: /.+/},
            {pattern: /^1[3456789]\d{9}$/, message: "联系电话格式不正确", trigger: "blur"}
          ],
          dataFrom: [
            {required: true, pattern: /^[0-9]+$/, message: '事件来源不能为空！', trigger: 'changer', pattern: /.+/},
          ],
          reportType: [
            {required: true, pattern: /^[0-9]+$/, message: '上报类型不能为空！', trigger: 'changer', pattern: /.+/},
          ],
          status: [
            {required: true, pattern: /^[0-9]+$/, message: '事件状态不能为空！', trigger: 'changer'},
          ],
          address: [
            {required: true, message: '事件地址不能为空！', trigger: 'blur'},
          ],
          remark: [
            {required: true, message: '事件描述不能为空！', trigger: 'blur'},
          ],
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
        this.isNotEdit = true;
        if (val) {
          this.$refs['tZhsqEventListForm'].resetFields();
        } else {
          this.closeModal(val);
        }
      }
    },
    components: {
      plot
    }
  }
</script>
