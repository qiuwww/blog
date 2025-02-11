<template>
  <Modal  v-model="show" :title="editTitle" :mask-closable="false" class="eventUpdate" width="63%">
    <Form ref="tZhsqEventListForm" :model="tZhsqEventListForm" :rules="tZhsqEventListFormRule">
        <Row class="app-warp">
          <Col span="24" class="leftEvent">

            <Row class="origin">
              <Row style="width: 100%;" class="elrowStyle">
                <Col span="12" style="display: flex;" class="elcolStyle">
                  <FormItem label="事件标题" prop="title">
                    <Input type="text" :maxlength=50 v-model="tZhsqEventListForm.title" placeholder="请输入事件标题"/>
                  </FormItem>
                </Col>
                <Col span="12" style="display: flex;">
                  <FormItem label="事件来源" prop="dataFrom">
                    <Select v-model="tZhsqEventListForm.dataFrom" placeholder="请选择事件来源" clearable >
                      <Option v-for="(item, i) in dataFromPriority" :key="i" :value="item.value.toString()">{{item.label}}</Option>
                    </Select>
                  </FormItem>
                </Col>

              </Row>
              <Row style="width: 100%;" class="elrowStyle">
                <Col span="12" style="display: flex;" class="elcolStyle">
                  <FormItem label="开始时间" prop="happenDate">
                    <DatePicker type="datetime" style="" :editable="false" placeholder="请选择开始时间"  v-model="tZhsqEventListForm.happenDate" @on-change="sethappenDate" format="yyyy-MM-dd HH:mm:ss" ></DatePicker>
                  </FormItem>
                </Col>
                <Col span="12" style="display: flex;" class="elcolStyle">
                  <FormItem label="结束时间" prop="endDate">
                    <DatePicker type="datetime" style="" :editable="false" placeholder="请选择结束时间"  v-model="tZhsqEventListForm.endDate" @on-change="setendDate" format="yyyy-MM-dd HH:mm:ss" ></DatePicker>
                  </FormItem>
                </Col>
              </Row>
              <Row style="width: 100%;" class="elrowStyle">

                <Col span="12" style="display: flex;">
                  <FormItem label="办结时间">
                    <DatePicker type="datetime" style="" :editable="false" placeholder="请选择办结时间"  v-model="tZhsqEventListForm.requirementDate" @on-change="setrequirementDate" format="yyyy-MM-dd HH:mm:ss" ></DatePicker>
                  </FormItem>
                </Col>
                <Col span="12" style="display: flex;" class="elcolStyle">
                  <FormItem label="地图标注" prop="position">
                    <Input type="text" :maxlength=50 v-model="tZhsqEventListForm.position" placeholder="请选择地点" icon="md-map" :readonly="true" @on-click="checkMap"/>
                  </FormItem>
                </Col>
              </Row>
              <Row style="width: 100%;" class="elrowStyle">
                <Col span="12" style="display: flex;">
                  <FormItem label="所属辖区" prop="gridId">
                    <TreeSelect v-model="tZhsqEventListForm.gridId" :data="gridPriority"  @on-change="onGridChange"/>
                  </FormItem>
                </Col>
                <Col span="12" style="display: flex;" class="elcolStyle">
                  <FormItem label="网格员" prop="gridMember">
                    <Select  v-model="tZhsqEventListForm.gridMember" placeholder="请选择网格员" clearable>
                      <Option v-for="(item, i) in executorPriority" :key="i" :value="item.id.toString()">
                        {{ item.name }}
                      </Option>
                    </Select>
                  </FormItem>
                </Col>

              </Row>
              <Row style="width: 100%;" class="elrowStyle">
                <Col span="12" style="display: flex;">
                  <FormItem label="当事人">
                    <Input type="text" v-model="tZhsqEventListForm.partyName" placeholder="请输入当事人"/>
                  </FormItem>
                </Col>

                <Col span="12" style="display: flex;">
                  <FormItem label="联系电话" prop="telephone">
                    <Input type="text" :maxlength=50 v-model="tZhsqEventListForm.telephone" placeholder="请输入联系电话"/>
                  </FormItem>
                </Col>
              </Row>
              <Row style="width: 100%;" class="elrowStyle">
                <Col span="24" style="display: flex;">
                  <Col span="4" class="elcolLabelStyle">
                    <i class="label"> 事件地址 </i>
                  </Col>
                  <Col span="20" class="elcolBoldStyle">
                    <i class="bold" style="width: 100%;padding-left: 0;">
<!--                      <Input type="text" :maxlength=50 v-model="tZhsqEventListForm.address" placeholder="请输入事件地址"/>-->
                      <Input style="width: 106.6%;margin-left: 0px;margin-bottom: 1.3vh;"
                        v-model="tZhsqEventListForm.address"
                        type="textarea"
                        placeholder="请输入事件地址"
                      />
                    </i>
                  </Col>
                </Col>
              </Row>
              <Row style="width: 100%;" class="elrowStyle">
                <Col span="24" style="display: flex;">
                  <Col span="4" class="elcolLabelStyle">
                    <i class="label"> 事件描述 </i>
                  </Col>
                  <Col span="20" class="elcolBoldStyle">
                    <i class="bold" style="width: 100%;padding-left: 0;">
                      <Input style="width: 106.6%;margin-left: 0px;margin-bottom: 1.3vh;"
                        v-model="tZhsqEventListForm.remark"
                        type="textarea"
                        placeholder="请输入事件描述"
                      />
                    </i>
                  </Col>
                </Col>
              </Row>
              <Row style="width: 100%;" class="elrowStyle">
                <Col span="24" style="display: flex;">
                  <Col span="4" class="elcolLabelStyle" style="height: auto;">
                    <i class="label"> 相关语音 </i>
                  </Col>
                  <Col span="20" class="elcolBoldStyle" style="height: auto;">
                    <i class="bold" style="padding-top: 1.4vh;padding-bottom: 0.6vh;display: flex;">
                      <Upload style="height: auto;"
                        :on-success="handleUploadSuccess"
                        :before-upload="handleUpload"
                        action="/api/download/fileUpload">
                        <Button style="width: 236px;" icon="ios-cloud-upload-outline">
                          <div v-if="isNotEdit">点击选择要上传的文件</div>
                          <div v-if="!isNotEdit">点击替换已上传的文件</div>
                        </Button>
                      </Upload>
                      <div v-if="tZhsqEventListForm.audioMediaAddress" style="height: 3.2vh;">
                        <audio :src="tZhsqEventListForm.audioMediaAddress" class="audiobox" style="margin-left: 2px" controls="controls"></audio>
                      </div>
                      <div v-if="!tZhsqEventListForm.audioMediaAddress" style="height: 100%;">
                      </div>
                    </i>
                  </Col>
                </Col>
              </Row>
              <Row style="width: 100%;">
                <Col span="24" style="display: flex;">
                  <Col span="4" class="elcolLabelStyle" style="height: auto;">
                    <i class="label"> 图片视频 </i>
                  </Col>
                  <Col span="20" class="elcolBoldStyle" style="height: auto;padding-top: 1.4vh;padding-bottom: 1.4vh;">
                    <i class="bold" style="height: 100%;">
                      <div style="display: flex;">
                        <div v-if="uploadFileArrayUrl.length > 0" style="display: flex;">
                          <div class="demo-upload-list" id="demoUploadList" v-for="(item, i)  in uploadFileArrayUrl"  v-viewer="{movable: false}">
                            <template v-if="item.indexOf('.mp4') == -1" @click.native="handleView(item)">
                              <img :src="item" style="width: 58px;height: 58px;margin-top: 4px;margin-right: 0px;">
                              <div class="img-delete" id="imgDelete" @click.stop="handleRemove(item)" >x</div>
                            </template>
                            <template v-else>
                              <video :src="item" :direction="0" style="width: 58px;height: 58px;margin-top: 4px;margin-right: 0px;object-fit:fill;" ref="myVideo" controls></video>
                              <div class="img-delete" id="vioDelete" @click.stop="handleRemove(item)" >x</div>
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
                        <Modal title="View Image" v-model="visible">
                          <img :src="imgName" v-if="visible" style="width: 100%">
                        </Modal>
                      </div>
                    </i>
                  </Col>
                </Col>
              </Row>

            </Row>

          </Col>
        </Row>
    </Form>
    <div slot="footer">
      <Button type="text" @click="show=false">取消</Button>
      <Button type="primary" :loading="loading" @click="handelSubmit">提交</Button>
    </div>

    <plot v-model="ShowMap" modalTitle="选择坐标点" @resultPoint="getPosition" divId="updateTZhsqEvent"
          :objData="pointArr" iconPath="/img/archives/shanghu.png"  :selectType="selectTypee" ></plot>
  </Modal>
</template>

<script>
  import { getDictDataByType } from '@/api/index';
  import { formartDate,transData } from '@/api/tools/tool'
  import {queryAllList,queryAllGridsTree} from '@/api/zhsq/basicGrids/basicGrids'
  import plot from "@/views/gismap/components/plot";
  import {
    addEvents,
    addEventsSelf,
    modifyEvent,
    getloadOne,
    queryEventsTypeTreeNotPage
  } from '@/api/events'
  import {mapGetters} from "vuex";
  import store from '@/store'
  import {
    deletImg as fileDelete,
  } from "@/api/utils"
  import { getAllUsers} from "@/api/system/user"
  import {queryGridMemberList} from '@/api/zhsq/tZhsqGridMember/tZhsqGridMember'
export default {
  name: "eventUpdate",
  components: {
    plot
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
    return {
      uploadFileArray: [],
      uploadFileArrayUrl: [],
      //文件上传
      file: null,
      loadingStatus: false,

      imageUrl:'',
      disabled: false,
      show: this.value,
      editTitle: this.modalTitle,
      loading: true,
      tZhsqEventListForm: {
        eventsTypeId:'',
        title:'',
        gridId:'',
        createUser:'',
        happenDate:null,
        endDate:null,
        executor:'',
        nodeId:'',
        nodeName:'',
        dataFrom:'',
        status:'',
        position:'',
        eventsTypes:{
          procDefId:'',
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
      isNotEdit:true,
      tZhsqEventListFormRule: this.getTZhsqEventListFormRule(),
      eventsTypeIdPriority:[],
      eventsTypePriority:[],
      streetData: [],
      communityArr: [],
      gridPriority:[],
      executorPriority:[],
      statusPriority:[],
      ShowMap:false,
      pointArr:[],
      selectTypee:'Point',
      statusName: '',
      dataFromPriority:[],//事件来源
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
      uploadList: []
    }
  },
  computed: {
    ...mapGetters(['pageSize', 'pageNum', 'queryStr']),
  },
  mounted() {
    //事件来源 数据字典加载数据
    getDictDataByType("eventFrom", {}).then(res => {
      if (res && res.success) {
        this.dataFromPriority = res.data;
      }
    });
  },
  created(){

  },
  watch: {
    value(val) {
      this.show = val;
    },
    show(val) {
      this.initForm();
      this.loading=false;
      this.editTitle = this.modalTitle;
      this.isNotEdit = true;
      if(val) {
        let _this = this;
        this.$refs['tZhsqEventListForm'].resetFields();
        if(this.TZhsqEventListId!=null&&this.TZhsqEventListId.trim().length>0){
          this.isNotEdit = false;

          getloadOne({id: parseInt(_this.TZhsqEventListId)}).then(res => {
            if (res && res.code == 200) {
              _this.tZhsqEventListForm.eventsTypeId = res.data.eventsTypeId.toString();
              _this.tZhsqEventListForm.dataFrom = res.data.dataFrom.toString();
              _this.tZhsqEventListForm.title = res.data.title;
              _this.tZhsqEventListForm.createUser = res.data.createUser;
              for(let i = 0;i < this.usersData;i ++){
                if(_this.usersData[i].id == _this.tZhsqEventListForm.createUser){
                  _this.userForm.nickName = _this.usersData[i].nickName;
                }
              }
              _this.tZhsqEventListForm.gridId = res.data.gridId;
              if(_this.tZhsqEventListForm.gridId && _this.tZhsqEventListForm.gridId.trim().length>0){
                _this.onGridChange(_this.tZhsqEventListForm.gridId);
              }
              if(res.data.happenDate){
                _this.tZhsqEventListForm.happenDate = formartDate(new Date(res.data.happenDate).getTime(), 'yyyy-MM-dd hh:mm:ss');
              }else{
                _this.tZhsqEventListForm.happenDate = null;
              }
              if(res.data.endDate){
                _this.tZhsqEventListForm.endDate = formartDate(new Date(res.data.endDate).getTime(), 'yyyy-MM-dd hh:mm:ss');
              }else{
                _this.tZhsqEventListForm.endDate = null;
              }
              _this.tZhsqEventListForm.executor = res.data.executor;
              _this.tZhsqEventListForm.nodeId = res.data.nodeId;
              _this.tZhsqEventListForm.nodeName = res.data.nodeName;
              _this.tZhsqEventListForm.status = res.data.status?res.data.status.toString():"";
              _this.tZhsqEventListForm.position = res.data.position;
              _this.tZhsqEventListForm.reportType = res.data.reportType?res.data.reportType.toString():"" ;
              _this.tZhsqEventListForm.mediaAddress = res.data.mediaAddress;
              _this.uploadFileArray = [];
              _this.uploadFileArrayUrl = [];
              //图片视频 数据拼接
              if(_this.tZhsqEventListForm.mediaAddress){
                let dataMediaAddressAll = _this.tZhsqEventListForm.mediaAddress.split(';');
                for(let i = 0;i < dataMediaAddressAll.length - 1;i ++){
                  let dataMediaAddress = dataMediaAddressAll[i].split(',');
                  //属性值数组
                  let valueArray = [];
                  for(let j = 0;j < dataMediaAddress.length;j ++){
                    let data = dataMediaAddress[j].split(':');
                    //属性名
                    let dataName = data[0].split("'")[1];
                    //属性值
                    let dataValue = data[1].split("'")[1];
                    valueArray.push(dataValue);//存入属性值
                  }
                  //上传的图片视频 文件数组
                  _this.uploadFileArray.push({
                    nodeId: valueArray[0],//节点id
                    nodeName: valueArray[1],//节点名
                    url: valueArray[2],//图片视频的 文件地址
                  });
                  //图片视频 地址数组
                  _this.uploadFileArrayUrl.push(valueArray[2]);
                }
              }
              _this.tZhsqEventListForm.audioMediaAddress = res.data.audioMediaAddress;
              _this.tZhsqEventListForm.remark = res.data.remark;
              _this.tZhsqEventListForm.telephone = res.data.telephone;
              _this.tZhsqEventListForm.gridMember = res.data.gridMember;
              _this.tZhsqEventListForm.partyName = res.data.partyName;
              if(res.data.requirementDate){
                _this.tZhsqEventListForm.requirementDate = formartDate(new Date(res.data.requirementDate).getTime(), 'yyyy-MM-dd hh:mm:ss');
              }else{
                _this.tZhsqEventListForm.requirementDate = null;
              }
              _this.tZhsqEventListForm.address = res.data.address;
            } else {
              _this.$Message.error(res.msg);
            }
          });
        }else{
          _this.tZhsqEventListForm.status = 1;
          _this.statusName = this.eventStatus(this.tZhsqEventListForm.status)
        }
      } else {
        this.closeModal(val);
      }
    }
  },
  async created() {
  },

  methods: {
    //文件上传(音频) 获取文件信息
    handleUpload (file) {
      this.file = file;
    },
    handleUploadSuccess(res, file){

      this.tZhsqEventListForm.audioMediaAddress = res.data;
    },
    //文件上传) 上传后台
    upload () {
      this.loadingStatus = true;
      setTimeout(() => {
        this.file = null;
        this.loadingStatus = false;
        this.$Message.success('Success')
      }, 1500);
    },
    //图片视频上传 查看器
    handleView (url) {
      const viewer = this.$el.querySelector('.demo-upload-list').$viewer;
      viewer.show();
    },
    fileRemove(url){
      fileDelete({
        url:url
      }).then(res =>{
        if (res.code == 200) {
          this.$Message.success('删除成功');
        } else {
          this.$Message.error('删除失败');
        }
      });
    },
    handleRemove (url) {
      this.fileRemove(url);
      const uploadFileArrayUrl = this.uploadFileArrayUrl;
      this.uploadFileArrayUrl.splice(uploadFileArrayUrl.indexOf(url), 1);
    },
    handleSuccess (res, file) {
      this.uploadFileArrayUrl.push(res.data);
    },
    handleFormatError (file) {
      this.$Notice.warning({
        title: '文件格式不正确',
        desc: '文件 ' + file.name + ' 的格式是不正确的i, 请选择jpg、jpeg、png、mp4文件'
      });
    },
    handleMaxSize (file) {
      this.$Notice.warning({
        title: '超过文件大小限制',
        desc: '文件  ' + file.name + ' 太大, 不能超过2M'
      });
    },
    handleBeforeUpload () {
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
    /**
     * 事件状态匹配
     *  @param status
     * @returns {string}
     */
    eventStatus(status) {
      switch (status) {
        case 0:
          return '待审核'
          break
        case 1:
          return '未完成'
          break
        case 2:
          return '已完成'
          break
      }
    },
    /**
     * 事件来源匹配
     * @param status
     * @returns {string}
     */
    eventDataFrom(status) {
      if (status == null || status == undefined || status.toString().trim().length <= 0
        || this.dataFromPriority == null || this.dataFromPriority == undefined || this.dataFromPriority.length == 0) {
        return "--";
      }
      let dataFrom = this.dataFromPriority.filter(item => item.value+"" == status+"");
      if (dataFrom != null && dataFrom != undefined && dataFrom.length > 0) {
        return dataFrom[0].label;
      }
      return "--";
    },
    //获取用户信息
    getUserInfo(){
      store.dispatch('GetInfo').then((res) => {
        this.userForm.nickName = res.nickName;
        this.userForm.id = res.id;
        this.tZhsqEventListForm.createUser = res.id;
      })
    },
    getStatusData(){//初始化事件状态
      getDictDataByType('status').then(res => {
        if(res && res.success){
          this.statusPriority = res.data;
        }
      })
    },
    getSortData(){//初始化事件分类
      queryEventsTypeTreeNotPage({

      }).then(res => {
        if(res && res.success) {
          if (res.data) {

            this.eventsTypePriority = res.data;
            this.eventsTypeIdPriority = this.getTreeData(res.data);
          }
        }
      }).catch(err => {
        this.loading = false
      });
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
    //辖区选择
    onGridChange(e) {
      if (e) {
        this.tZhsqEventListForm.gridId = e;
        let grid = this.gridValuePriority.filter(item => item.id == e)
        if (grid == null || grid == undefined || grid.length <= 0) {
          this.$Message.error('选择辖区失败，请联系管理员');
          return
        }
        this.seleteLevel = grid[0].lel;
        //没有选择网格
        if (this.seleteLevel != 2 && this.seleteLevel != '2') {
          this.$Message.error('请选择网格！！！');
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
    getExecutorData(){//初始化执行人
      getDictDataByType('executor').then(res => {
        if(res && res.success){
          this.executorPriority = res.data;
        }
      })
    },
    //点击地图图标
    checkMap(){
      if (this.tZhsqEventListForm.position) {
        this.pointArr = JSON.parse(this.tZhsqEventListForm.position);
      }
      this.ShowMap = true;
    },
    getPosition(obj,type){
      this.tZhsqEventListForm.position = JSON.stringify(obj.flatCoordinates);
    },
    //设置事件开始时间
    sethappenDate(e){
      this.tZhsqEventListForm.happenDate = e.toString();
    },
    //设置事件结束时间
    setendDate(e){
      this.tZhsqEventListForm.endDate = e.toString();
    },
    //设置要求/办结时间
    setrequirementDate(e){
      this.tZhsqEventListForm.requirementDate = e.toString();
    },
    reductionDate(date){//转换时间
      let d = new Date(date);
      d = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
      return d;
    },
    //提交
    handelSubmit() {
      this.$refs['tZhsqEventListForm'].validate((valid) => {
        if (valid) {
          let _this = this;

          //图片视频地址 入库前筛选
          let uploadFileArrayUrlNew = '';
          for(let i =0;i < _this.uploadFileArrayUrl.length;i ++){
            let nodeId = '';
            let nodeName = '';
            let url = '';
            let flag = true;//判断是否是已存在
            for(let j = 0;j < _this.uploadFileArray.length;j ++){
              if(_this.uploadFileArray[j].url == _this.uploadFileArrayUrl[i]){//已存在此文件 将对应节点id和节点名+文件地址 存入数据库
                flag = false;
                nodeId = _this.uploadFileArray[j].nodeId;
                nodeName = _this.uploadFileArray[j].nodeName;
                url = _this.uploadFileArray[j].url;
                uploadFileArrayUrlNew += "'nodeId':'"+nodeId+"','nodeName':'"+nodeName+"','url':'"+url+"';";
              }
            }
            if(flag){//不存在 取当前节点id和节点名+文件地址 存入数据库
              uploadFileArrayUrlNew += "'nodeId':'"+nodeId+"','nodeName':'"+nodeName+"','url':'"+_this.uploadFileArrayUrl[i]+"';";
            }
          }
          this.tZhsqEventListForm.mediaAddress = uploadFileArrayUrlNew;

          this.loading = true;
          if(this.TZhsqEventListId!=null&&this.TZhsqEventListId.trim().length>0){
            this.tZhsqEventListForm.id=this.TZhsqEventListId;
            this.tZhsqEventListForm.happenDate = this.reductionDate(this.tZhsqEventListForm.happenDate);
            if(this.tZhsqEventListForm.endDate){
              this.tZhsqEventListForm.endDate = this.reductionDate(this.tZhsqEventListForm.endDate);
            }
            if(this.tZhsqEventListForm.requirementDate){
              this.tZhsqEventListForm.requirementDate = this.reductionDate(this.tZhsqEventListForm.requirementDate);
            }

            modifyEvent(this.tZhsqEventListForm).then(res => {
              this.loading = false;
              if (res && res.code == 200) {
                this.closeModal(false);
                this.$emit('handleSearch');
                this.$Message.success('保存成功');
              }else{
                this.$Message.error(res.msg);
              }
            }).catch(error => {
              this.loading = false;
            })
            // this.loading = false;
          }else{
            this.tZhsqEventListForm.happenDate = this.reductionDate(this.tZhsqEventListForm.happenDate);
            if(this.tZhsqEventListForm.endDate){
              this.tZhsqEventListForm.endDate = this.reductionDate(this.tZhsqEventListForm.endDate);
            }
            if(this.tZhsqEventListForm.requirementDate){
              this.tZhsqEventListForm.requirementDate = this.reductionDate(this.tZhsqEventListForm.requirementDate);
            }
            //若不存在 默认status初始值为1
            if(!this.tZhsqEventListForm.status || this.tZhsqEventListForm.status == null || this.tZhsqEventListForm.status == undefined){
              this.tZhsqEventListForm.status = 1;
            }
            //查找procDefId
            for(let i = 0;i < _this.eventsTypePriority.length;i ++){
              if(_this.eventsTypePriority[i].id == _this.tZhsqEventListForm.eventsTypeId){
                _this.tZhsqEventListForm.eventsTypes.procDefId = _this.eventsTypePriority[i].procDefId;
              }else if(_this.eventsTypePriority[i].children && _this.eventsTypePriority[i].children != null && _this.eventsTypePriority[i].children != undefined){
                //在事件类型children中查找procDefId
                _this.tZhsqEventListForm.eventsTypes.procDefId = _this.childrenProcDefId(_this.eventsTypePriority[i].children,_this.tZhsqEventListForm.eventsTypeId);
              }
            }
            _this.tZhsqEventListForm.reportType = 1;
            if(_this.tZhsqEventListForm.reportType == 1){//流程审批
              this.tZhsqEventListForm.isHandleSelf = 0;//0 不是自办自结
              addEvents(this.tZhsqEventListForm).then(res => {
                this.loading = false;
                if (res && res.code == 200) {
                  this.closeModal(false);
                  this.$emit('handleSearch');
                  this.$Message.success('保存成功');
                }else{
                  this.$Message.error(res.msg);
                }
              }).catch(error => {
                this.loading = false;
              })
            }
            if(_this.tZhsqEventListForm.reportType == 2){//自办自结
              this.tZhsqEventListForm.isHandleSelf = 1;//1 是自办自结
              addEventsSelf(this.tZhsqEventListForm).then(res => {
                this.loading = false;
                if (res && res.code == 200) {
                  this.closeModal(false);
                  this.$emit('handleSearch');
                  this.$Message.success('保存成功');
                }else{
                  this.$Message.error(res.msg);
                }
              }).catch(error => {
                this.loading = false;
              })
            }
          }
        } else {
          this.$Message.error('表单验证不通过！');
        }
      });
    },
    //查找流程定义id(在事件类型children中查)
    childrenProcDefId(children,id){
      let _this = this;
      for(let i = 0;i < children.length;i ++){
        if(children[i].id == id){
          return children[i].procDefId;
        }else if(children[i].children && children[i].children != null && _children[i].children != undefined){
          _this.childrenProcDefId(children[i].children,id);
        }
        return '';
      }
    },
    closeModal(val) {
      this.$emit('input', val);
    },
    getAllUsersData(){
      getAllUsers(this.userAllForm).then(res => {
        if (res && res.success) {
          this.usersData = res.data.content;
        }
      });
    },
    initForm(){
      this.tZhsqEventListForm= {
        eventsTypeId:'',
        title:'',
        gridId:'',
        createUser:'',
        happenDate:null,
        endDate:null,
        executor:'',
        nodeId:'',
        nodeName:'',
        dataFrom:'',
        status:'',
        position:'',
        eventsTypes:{
          procDefId:'',
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
      // this.getStatusData();
      this.getSortData();
      this.getExecutorData();
      //获取用户信息
      this.getAllUsersData();
      this.getUserInfo();
      this.uploadFileArray = [];
      this.uploadFileArrayUrl = [];
    },
    getTZhsqEventListFormRule() {
      return {
        eventsTypeId: [
          {required: true, message: '事件类型不能为空！', trigger: 'changer',pattern: /.+/ },
        ],
        title: [
          {required: true, message: '事件标题不能为空！', trigger: 'blur'},
          {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
        ],
        gridId: [
          {required: true, message: '所属辖区不能为空！', trigger: 'changer',pattern: /.+/ },
        ],
        createUser: [
          {required: true, message: '发起人不能为空！', trigger: 'blur'},
          {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
        ],
        happenDate: [
          {required: true, message: '开始时间不能为空！', trigger: 'changer',pattern: /.+/ },
        ],
        executor: [
          {required: true, message: '执行人不能为空！', trigger: 'changer',pattern: /.+/ },
        ],
        position: [
          {required: true, message: '地图标注不能为空！', trigger: 'changer',pattern: /.+/ },
        ],
        // gridMember: [
        //   {required: true, message: '网格员不能为空！', trigger: 'changer',pattern: /.+/ },
        // ],
        telephone: [
          {required: true, message: '联系电话不能为空！', trigger: 'changer',pattern: /.+/ },
          {pattern: /^1[3456789]\d{9}$/, message: "联系电话格式不正确", trigger: "blur"}
        ],
        dataFrom: [
          {required: true, pattern:/^[0-9]+$/,message: '事件来源不能为空！', trigger: 'changer',pattern: /.+/ },
        ],
        reportType: [
          {required: true, pattern:/^[0-9]+$/,message: '上报类型不能为空！', trigger: 'changer',pattern: /.+/ },
        ],
        status: [
          {required: true,pattern:/^[0-9]+$/, message: '事件状态不能为空！', trigger: 'changer' },
        ],
        address: [
          {required: true, message: '事件地址不能为空！', trigger: 'blur'},
        ],
        remark: [
          {required: true, message: '事件描述不能为空！', trigger: 'blur'},
        ],
      }
    }
  }
}
</script>

<style lang="scss">

.eventUpdate{
  .elrowStyle{
    border-bottom: #ccc solid 1px;
    border-color: #dcdee2;
  }
  .elcolStyle{
    border-right: #ccc solid 1px;
    border-color: #dcdee2;
  }
  .elcolLabelStyle{
    background-color: rgb(250,250,250);
    /*height: 4vh;*/
    /*line-height: 4vh;*/
    height: 100%;
    border-right: #ccc solid 1px;
    border-color: #dcdee2;
  }
  .elcolBoldStyle{
    /*height: 4vh;*/
    /*line-height: 4vh*/
    height: 100%;
  }
  .origin {
    border-radius: 2px;
    border: #ccc solid 1px;
    border-color: #dcdee2;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .tableEventRecords{
    overflow-y: auto;
    max-height: 19.5vh;

    &::-webkit-scrollbar {
      width: 0;
      /*隐藏滚轮*/
      display: none;
    }
  }

  .headTitleEvent{
    width: 100%;
    height: 100%;
    /*font-size: 16px;*/
    font-size: 0.82vw;
    color: #17233d;
    font-weight: bolder;
    padding-top: 1.8vh;
    padding-bottom: 0.5vh;
  }
	.label {
    width: 80px;
    text-align: left;
    /*padding-left: 30px;*/
    padding-left: 1vw;
    }
  .ivu-modal {
    top: 16px !important;
  }
  i {
    font-size: 15px;
    font-style: normal;
  }
  .bold {
    display: inline-block;
    height: 100%;
    text-align: left;
    /*padding-left: 10px;*/
    padding-left: 1vw;
  }
  .el-row {
    box-sizing: border-box;
  }

  .el-col {
    box-sizing: border-box;
    /*padding: 10px;*/
    /*padding: 5px;*/
  }

  .flex {
    display: flex;
  }

  .w60 {
    width: 60%;
  }

  .importantFont {
    color: #014fa2;
  }

  .media {
    display: inline-block;
    width: 100px;
    height: 80px;
  }

  .audioMedia {
    display: inline-block;
  }

  .playWarper {
    background: #5e6472;
    transition: box-shadow 0.3s;

    .player {
      color: #faf3dd;
      font-size: 40px;
      transition: color 0.3s;
    }

    /*&:hover {*/
    /*  box-shadow: #ccc 3px 3px 5px 3px;*/

    /*  .player {*/
    /*    color: #b8f2e6;*/
    /*  }*/
    /*}*/
  }

  .mediaSpan {
    display: flex;
    float: right;
    width: 100%;
  }

  .label {
    display: inline-block;
    height: 100%;

    //vertical-align: text-top;
  }
  .leftEvent{
    max-height: 83vh;
    overflow: hidden;
    background: #ffffff;
    overflow-y: auto;
  }
  /*.leftEvent:hover{*/
  /*  overflow-y:scroll;*/
  /*}*/
  /*.leftEvent:hover::-webkit-scrollbar {*/
  /*  !*滚动条整体样式*!*/
  /*  width : 6px;  !*高宽分别对应横竖滚动条的尺寸*!*/
  /*  height: 1px;*/
  /*}*/
  /*.leftEvent:hover::-webkit-scrollbar-thumb {*/
  /*  !*滚动条里面小方块*!*/
  /*  border-radius: 6px;*/
  /*  box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.0);*/
  /*  background   : #e4e4e4;*/
  /*}*/
  /*.leftEvent:hover::-webkit-scrollbar-track {*/
  /*  !*滚动条里面轨道*!*/
  /*  box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.0);*/
  /*  border-radius: 5px;*/
  /*  background   : #ededed00;*/
  /*}*/
  .el-step__title{
    margin-left: -10px;
  }
  .el-step__icon {
    width: 38px;
    height: 38px;
    margin-top: -6px;
  }
  .el-step__head.is-success {
    color: #3083f2;
    border-color: #3083f2;
    .el-step__icon.is-text {
      background: #3083f2;
      color: white;
    }
  }
  .el-step__head .is-wait {

    .el-step__icon.is-text {
      border: 1px solid #d8dde4;
    }
  }
  .el-step__head.is-success {
    color: #3083f2;
    border-color: #3083f2;
    .el-step__icon.is-text {
      background: #3083f2;
      color: white;
    }
  }
  .el-icon-check{
    background: #3083f2;
    font-size: 23px;
  }
  .el-step__title.is-success {

    font-size: 14px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    color: #3e3e3e;
  }
  .el-step__title.is-wait {

    font-size: 14px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    color: #a0a8b5;
  }
  .el-step__icon.is-text {

    border: 1px solid;
  }
  .el-step__head.is-process {
    color: #3083f2;
    border-color: #3083f2;
  }
  .el-step__title.is-process {
    font-weight: bold;
    color: #3083f2;
  }
  .bold {
    display: inline-block;
    height: 100%;
    /*font-size: 14px;*/
    font-size: 0.72vw;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    text-align: left;
    color: #3e3e3e;
    line-height: 20px;
  }
   .label {
    display: inline-block;
    height: 100%;
    /*font-size: 14px;*/
     font-size: 0.72vw;
    font-family: Microsoft YaHei, Microsoft YaHei-Bold;
    font-weight: 700;
    text-align: right;
    color: #3e3e3e;
    width: 100%;
    padding-right: 5.5vw;
    line-height: 3vh;
  }
  .el-icon-circle-close {
    top: 40px;
    right: 40px;
    width: 40px;
    height: 40px;
    font-size: 40px;
  }

  .ivu-modal-body {
    padding: 16px;
    padding-top: 0px;
    font-size: 14px;
    line-height: 1.5;

    overflow-y: auto;
    max-height: 83vh;

    &::-webkit-scrollbar {
      width: 0;
      /*隐藏滚轮*/
      display: none;
    }
  }

  .app-warp {
    background: #ffffff;
    border-radius: 2px;
    overflow: hidden;
  }
  .ivu-table {
    width: inherit;
    height: 100%;
    max-width: 100%;
    overflow: hidden;
    color: #515a6e;
    font-size: 14px;
    font-size: 0.73vw;
    background-color: #fff;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
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

  .demo-upload-list{
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
  .demo-upload-list img{
    width: 100%;
    height: 100%;
  }
  .demo-upload-list-cover{
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.6);
  }
  .demo-upload-list:hover .demo-upload-list-cover{
    display: block;
  }
  .demo-upload-list-cover i{
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


  .audiobox {
    width: 240px;
    height: 30px;
    height: 100%;
    /*margin-top: 20px;*/
  }

  .ivu-form .ivu-form-item-label {
    text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 0.72vw;
    color: #515a6e;
    line-height: 1;
    padding: 13px 12px 0px 0;
    width: 33.3%;
    height: 100%;
    box-sizing: border-box;
    border-right: #ccc solid 1px;
    border-color: #dcdee2;
    background-color: #fafafa;
    padding-right: 5.2vw;

    /*强制不换行+超出限制省略号*/
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  .ivu-form-item {
    width: 100%;
    height: 100%;
  }
  .ivu-form-item-content {
    position: relative;
    font-size: 0.72vw;
    width: 66.6%;
    display: flex;
    height: 100%;
  }
  .ivu-input {
    display: inline-block;
    width: 90%;
    height: 70%;
    line-height: 1.5;
    padding: 4px 7px;
    font-size: 14px;
    border: 1px solid #dcdee2;
    border-radius: 4px;
    color: #515a6e;
    background-color: #fff;
    background-image: none;
    position: relative;
    cursor: text;
    transition: border 0.2s ease-in-out, background 0.2s ease-in-out, box-shadow 0.2s ease-in-out, -webkit-box-shadow 0.2s ease-in-out;
    /*border: none;*/
    /*height: 100%;*/
    margin-left: 1vw;
  }
  .ivu-input-wrapper {
    display: inline-block;
    width: 100%;
    position: relative;
    vertical-align: middle;
    line-height: normal;
    padding-top: 1.3vh;
  }
  .ivu-date-picker {
    display: inline-block;
    line-height: normal;
    width: 100%;
  }
  .ivu-input-icon {
    width: 32px;
    height: 32px;
    line-height: 28px;
    text-align: center;
    color: #808695;
    position: absolute;
    right: 18px;
    z-index: 3;
  }
  .ivu-input-prefix i, .ivu-input-suffix i {
    line-height: 50px;
    color: #808695;
    margin-left: -36px;
  }
  .ivu-date-picker .ivu-select-dropdown {
    width: auto;
    padding: 0;
    overflow: visible;
    max-height: none;
    margin-left: 1vw;
  }
  .ivu-select-single .ivu-select-selection {
    height: 70%;
    width: 90%;
    margin-left: 5%;
    position: relative;
  }
  .ivu-select {
    display: inline-block;
    width: 100%;
    box-sizing: border-box;
    vertical-align: middle;
    color: #515a6e;
    font-size: 14px;
    line-height: normal;
    padding-top: 1.3vh;
  }
  .ivu-upload-select {
    display: inline-block;
    margin-right: 1vw;
  }
}

</style>
