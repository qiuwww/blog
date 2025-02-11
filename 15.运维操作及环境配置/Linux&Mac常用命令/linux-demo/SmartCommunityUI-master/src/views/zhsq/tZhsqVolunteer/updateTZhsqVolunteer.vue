<style lang="less" scoped>
  .tZhsqVolunteer {
    .ivu-modal {
        width: 1060px !important;
    }

    .form-item-input {
      width: 200px;
    }

    .ivu-form-item-error-tip {
      left: 80px;
    }


    .ivu-select {
      width: 180px;
    }

    .ivu-input-wrapper {
      width: 180px !important;
    }
    .ivu-form .ivu-form-item-label {
      width: 120px !important;
    }
  }
</style>
<template>
  <Modal v-model="show" :title="editTitle"  class="tZhsqVolunteer" :mask-closable="false" width="1060">
    <Form ref="tZhsqVolunteerForm" :model="tZhsqVolunteerForm" :rules="tZhsqVolunteerFormRule" :label-width="120">
      <Row>
        <Col span="8">
          <Row>
          <FormItem label="身份证号" prop="idCard">
           <Input v-bind:disabled="disabled" type="text" :maxlength=50 v-model="tZhsqVolunteerForm.idCard"
                    placeholder="请输入身份证" ref="idCard" @on-blur="inputData"/>
            <!-- <Select v-bind:disabled="disabled" v-model="tZhsqVolunteerForm.idCard" placeholder="请选择" clearable
                    @on-change="inputData" filterable>
              <Option v-for="(item, i) in carIdPriority" :value="item.card_id" :key="i">{{item.card_id}}</Option>
            </Select> -->
          </FormItem>
          </Row>

          <Row>
          <FormItem label="姓名" prop="name">
            <Input v-bind:disabled="disabled" type="text" :maxlength=50 v-model="tZhsqVolunteerForm.name"
                    placeholder="请输入姓名"/>
          </FormItem>
          </Row>


            <Row>
            <FormItem label="曾用名" prop="nameUsedBefore">
              <Input v-bind:disabled="disabled" type="text" :maxlength=50 v-model="tZhsqVolunteerForm.nameUsedBefore"
                      placeholder="请输入曾用名"/>
            </FormItem>
            </Row>

        </Col>
        <Col span="8">
          <Row>
            <FormItem label="性别" prop="sex">
              <RadioGroup v-bind:disabled="disabled" v-model="tZhsqVolunteerForm.sex">
                <Radio v-for="(item ,i) in sexRadio" :key="i" :label="item.label" >{{item.label}}</Radio>
              </RadioGroup>
            </FormItem>
          </Row>
          <Row>
            <FormItem label="是否为党员" prop="isPartyMember">
              <RadioGroup v-bind:disabled="disabled" v-model="tZhsqVolunteerForm.isPartyMember">
                <Radio label="是" >是</Radio>
                <Radio label="否" >否</Radio>
              </RadioGroup>
            </FormItem>
          </Row>
          <Row>
            <FormItem label="婚姻状况" prop="maritalStatus">
              <RadioGroup v-bind:disabled="disabled" v-model="tZhsqVolunteerForm.maritalStatus">
                <Radio label="已婚" >已婚</Radio>
                <Radio label="未婚" >未婚</Radio>
              </RadioGroup>
            </FormItem>
          </Row>
        </Col>
        <Col span="8">
          <FormItem label="头像" style="height: 85px ">
            <uploadHeaderImg v-model="tZhsqVolunteerForm.imgPath" @uploadSuccess="onFileUploadSuccess" @uploadError="onFileUploadError" @removePath="onRemovePath"/>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="8">
        <FormItem label="手机号" prop="phone">
          <Input v-bind:disabled="disabled" type="text" :maxlength=50 v-model="tZhsqVolunteerForm.phone"
                  placeholder="请输入手机号"/>
        </FormItem>
        </Col>
        <Col span="8">
        <FormItem label="民族" prop="nation">
            <Select v-bind:disabled="disabled" v-model="tZhsqVolunteerForm.nation" placeholder="请选择" transfer >
              <Option v-for="(item, i) in nationPriority" :value="item.number.toString()" :key="i">{{item.name}}</Option>
            </Select>
          </FormItem>
           </Col>


          <Col span="8">
            <FormItem label="籍贯" prop="nativePlace">
              <Input v-bind:disabled="disabled" type="text" :maxlength=50  v-model="tZhsqVolunteerForm.nativePlace"
                     placeholder="请输入籍贯"  />
            </FormItem>
          </Col>
      </Row>



          <Row>
            <Col span="8">
              <FormItem label="所属街道" prop="houseStreetId">
              <Select v-bind:disabled="disabled" v-model="tZhsqVolunteerForm.houseStreetId" placeholder="请选择" clearable
              @on-change="streetChange"  :label-in-value="true" >
                <Option v-for="(item, i) in houseStreetPriority" :key="i" :value="item.id.toString()">{{item.name}}</Option>
              </Select>
            </FormItem>
            </Col>

            <Col span="8">
              <FormItem label="所属社区" prop="houseCommunityId" label-in-value>
                <Select v-bind:disabled="disabled" v-model="tZhsqVolunteerForm.houseCommunityId" placeholder="请选择" clearable
                @on-change="communityChange" :label-in-value="true">
                  <Option v-for="(item, i) in houseCommunityPriority" :key="item.id.toString()" :value="item.id.toString()">{{item.name}}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="所属网格" prop="houseGrid">
                <Select v-bind:disabled="disabled" v-model="tZhsqVolunteerForm.houseGrid" placeholder="请选择" clearable  :label-in-value="true" @on-change="selectGrid">
                  <Option v-for="(item, i) in gridRidio" :key="item.id.toString()" :value="item.id.toString()">{{item.name}}</Option>
                </Select>
              </FormItem>
            </Col>
          </Row>
          <Row>

              <Col span="8">
              <FormItem label="学历" prop="education">
                <Select v-bind:disabled="disabled" v-model="tZhsqVolunteerForm.education" placeholder="请选择" clearable >
                  <Option v-for="(item, i) in educationRido" :value="item.name" :key="item.name">{{item.name}}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="8">
            <FormItem label="宗教信仰" prop="religiousBelief">
                <Select v-bind:disabled="disabled" v-model="tZhsqVolunteerForm.religiousBelief" placeholder="请选择" clearable >
                  <Option v-for="(item, i) in religiousRido" :value="item.name" :key="item.name.trim()">{{item.name}}</Option>
                </Select>
              </FormItem>
               </Col>
               <Col span="8">
                    <FormItem label="申请时间" prop="applicationTime">
                    	<DatePicker type="datetime" :options="buildingYearOptions" style="width:180px;" :editable="false" placeholder="请输入申请时间"  v-model="tZhsqVolunteerForm.applicationTime" @on-change="setapplicationTime" format="yyyy-MM-dd HH:mm:ss" ></DatePicker>
                    </FormItem>
                 </Col>

            <Col span="8">
              <FormItem label="工作单位" prop="workAddress">
                <Input v-bind:disabled="disabled" type="text" :maxlength=50  v-model="tZhsqVolunteerForm.workAddress"
                       placeholder="请输入工作单位"  />
              </FormItem>

            </Col>
          </Row>
          <Row>
          <Col span="24" v-if="tZhsqVolunteerForm.houseId == null || tZhsqVolunteerForm.houseId .trim().length == 0">
              <FormItem label="居住房屋" prop="homeAddress">
                <Input v-bind:disabled="disabled" type="text" :maxlength=50 style="width: 866px !important;" v-model="tZhsqVolunteerForm.homeAddress"
                         placeholder="请输入家庭住址"  />
              </FormItem>
            </Col>
          </Row>
          <!--      <FormItem label="审核状态" prop="state">-->
          <!--        <RadioGroup v-bind:disabled="disabled" v-model="tZhsqVolunteerForm.state">-->
          <!--          <Radio v-for="(item ,i) in stateRadio" :label="item.label">{{item.label}}</Radio>-->
          <!--        </RadioGroup>-->
          <!--      </FormItem>-->

    </Form>
    <div slot="footer">
      <Button type="text" @click="show=false">取消</Button>
      <Button type="primary" :loading="loading" @click="handelSubmit">{{submit}}</Button>
    </div>
  </Modal>
</template>
<script>
  import {addTZhsqVolunteer, updateTZhsqVolunteer, getTZhsqVolunteer} from '@/api/zhsq/tZhsqVolunteer/tZhsqVolunteer';
  import {queryAllList as gridAllList} from "@/api/zhsq/basicHousingEstate/basicHousingEstate"
  import {communityData, sexData, streetData, auditStatusState,religiousData,educationData,nationData} from '@/api/tools/zhsqSelectData';
  import { queryAllList as gridsQueryAllList} from '@/api/zhsq/basicGrids/basicGrids'
  import { getCardId, getPersonByCardId } from '@/api/zhsq/basicPerson/basicPerson'
  import { nginxUrl,formartDate } from '@/api/tools/tool'
  import {getDictionary,getStreet,getCommunity} from '@/api/index';
  import uploadHeaderImg from '@/components/uploadHeaderImg'
  export default {
    name: "updateTZhsqVolunteer",
    components: {
      uploadHeaderImg
    },
    props: {
      value: {
        type: Boolean,
        default: false
      },
      BasicPersonId: {
        type: String
      },
      TZhsqVolunteerId: {
        type: String
      },
      modalTitle: {
        type: String
      }
    },
    data() {
      return {
        buildingYearOptions: {
          disabledDate (date) {
            return date && date.valueOf() > Date.now();
          }
        },
        submit:"提交",
        imgShow:false,
        show: this.value,
        editTitle: this.modalTitle,
        loading: true,
        disabled: false,
        carIdPriority:[],
        nationPriority:[],
        houseStreetPriority: [],
        houseCommunityPriority: [],
        isPartyMemberRadio: [],
        stateRadio: [],
        sexRadio: [],
        gridRidio: [],
        religiousRido:[],
        educationRido:[],
        isfrist: false,
        tZhsqVolunteerForm: {
          applicationTime:null,
          nativePlace:'',
          nameUsedBefore:'',
          workAddress:'',
          education:'',
          religiousBelief:'',
          nation:'',
          name: '',
          sex: '',
          idCard: '',
          phone: '',
          houseStreetId: '',
          houseStreet: '',
          houseCommunityId: '',
          houseCommunity: '',
          isPartyMember: '',
          maritalStatus:'',
          homeAddress: '',
          state: '',
          imgPath:'',
          orderNumber: '',
          houseGrid: '',
          houseGridName:'',
          imageIsUpdate:false,
          houseId:'',
        },
        tZhsqVolunteerFormRule: this.getTZhsqVolunteerFormRule(),
        cardId:[],
        imageUrlList: [],
        ces:[],
      }
    },
    methods: {
      //获取下拉框以及单选按钮的选项
      getRadio() {
        this.nationPriority = [];
        this.sexRadio = sexData;
        this.houseStreetPriority = [];
        this.houseCommunityPriority = [];
        // this.religiousRido = religiousData;

        this.gridRidio =[];
        this.carIdPriority = [];
      },
      //学历
      getEducation(){
        getDictionary({fieldName:'education'}).then(res=>{
          if (res && res.success) {
            this.educationRido = res.data;
          }
        });
      },
      //宗教信仰
      getReligiousBelief() {
        let _this = this;
        getDictionary({fieldName: 'religious'}).then(res => {
          if (res && res.success) {
            _this.religiousRido = res.data
          }
        })
      },
      //民族
      getNationData(){
        getDictionary({fieldName:'nationData'}).then(res=>{
            if (res && res.success) {
                this.nationPriority = res.data;
            }
        });
      },
     //街道
     streetChange(e) {
         let form = this.tZhsqVolunteerForm;
         if (e) {
             form.houseStreet = e.label;
             form.houseStreetId = e.value;

             //社区
             this.houseCommunityPriority = [];
             form.houseCommunity = '';
             form.houseCommunityId = '';

             getCommunity({streetId:e.value}).then(res=>{
                 if(res && res.success){
                     this.houseCommunityPriority = res.data;

                 }
             })
         }
         //网格
         form.houseGridName = "";
         form.houseGrid = "";
         this.gridRidio = [];
       },
       //街道获取
       getStreetData(){
           getStreet({}).then(res=>{
               if(res && res.success){
                   this.houseStreetPriority = res.data;
               }
           })
       },
       //社区下拉事件
       communityChange(e) {
           if (e) {

               this.tZhsqVolunteerForm.houseCommunity = e.label;
               this.tZhsqVolunteerForm.houseCommunityId = e.value;

               //网格
               this.tZhsqVolunteerForm.houseGrid = "";
               this.tZhsqVolunteerForm.houseGridName = "";
               this.gridRidio = [];

               gridsQueryAllList({communityId: e.value}).then(res => {
                   if (res.data.length >= 0) {
                       //赋值
                       this.gridRidio = res.data;
                   }
               });
           }
           },
      //选择街道
     // selectStreet(value) {
     //    if(value == undefined){
     //      this.houseCommunityPriority = [];
     //      return;
     //    }

     //    if (!this.isfrist) {
     //      this.tZhsqVolunteerForm.houseCommunity = "";
     //    }

     //    if (value) {
     //      this.houseCommunityPriority = communityData.filter(function (v) {
     //        return v.street == value
     //      });
     //    }

     //  },
      //自动录入信息
      inputData(){
        let v = this.$refs.idCard.value;

        if(this.tZhsqVolunteerForm.idCard.length !== 15 &&  this.tZhsqVolunteerForm.idCard.length !== 18){
          return;
        }
        if(v == null || v == undefined ){
          return;
        }

        getPersonByCardId({cardId:v}).then(res => {

          if (res && res.code == 200) {
          this.ces = res.data;
          this.tZhsqVolunteerForm.name = res.data[0].name;
          this.tZhsqVolunteerForm.sex = res.data[0].sex;
          this.tZhsqVolunteerForm.nation = res.data[0].nation;
          getDictionary({fieldName:'nationData'}).then(res=>{
              if (res && res.success) {
                  this.nationPriority = res.data;
              }
          });

          this.tZhsqVolunteerForm.phone = res.data[0].phone;
          this.tZhsqVolunteerForm.houseStreetId = res.data[0].street_id;
          this.tZhsqVolunteerForm.houseStreet = res.data[0].street_name;
          getCommunity({streetId:this.tZhsqVolunteerForm.houseStreetId}).then(rec=>{

              if(rec.success){
                  this.houseCommunityPriority = rec.data;

              }
          });

          this.tZhsqVolunteerForm.houseCommunityId = res.data[0].community_id;
          this.tZhsqVolunteerForm.houseCommunity = res.data[0].community_name;
          gridsQueryAllList({communityId: this.tZhsqVolunteerForm.houseCommunityId}).then(ras => {
              if (ras.data.length >= 0) {
                  //赋值
                  this.gridRidio = ras.data;
              }
          });
          this.tZhsqVolunteerForm.houseGrid = res.data[0].owned_grid_id;
          this.tZhsqVolunteerForm.houseGridName = res.data[0].owned_grid;
          if(res.data[0].political_face == "中共党员"){
            this.tZhsqVolunteerForm.isPartyMember = "是";
          }else{
             this.tZhsqVolunteerForm.isPartyMember = "否";
          }
          // this.tZhsqVolunteerForm.isPartyMember = res.data[0].political_face;
          this.tZhsqVolunteerForm.homeAddress = res.data[0].residential_address;
          this.tZhsqVolunteerForm.state = res.data[0].state;
          this.tZhsqVolunteerForm.orderNumber = res.data[0].orderNumber;


          // thiAs.getGrids({communityId:this.tZhsqVolunteerForm.houseCommunity});
        }
      });

      },
      //网格存入id和名字
      selectGrid(v){

      	if(this.show){
      		this.tZhsqVolunteerForm.houseGrid = v.value;
      		this.tZhsqVolunteerForm.houseGridName = v.label;
            // console.log(this.tZhsqVolunteerForm.houseGridName);

      	}
      },
      //获取身份证
      // getCardIdList(){

      //   getCardId().then(res => {
      //     if (res && res.code == 200) {
      //       this.carIdPriority = res.data;
      //     }
      //   });
      // },
      //社区改变
      // selectCommunity(value){
      //   if(value){
      //     var data={"communityId":value};
      //      this.getGrids(data);
      //   // ;
      //   if(!this.isfrist){
      //     this.tZhsqVolunteerForm.houseGridId='';

      //   }
      //   this.isfrist = false;
      //   }
      // },


      //获取网格
     // getGrids(data){
     //    if(data == undefined || data == null || data.communityId == undefined){
     //      this.gridRidio = [];
     //      return;
     //    }
     //    // gridsQueryAllList(data).then(res =>{
     //    //   if(res && res.success){
     //    //     this.gridRidio = res.data;
     //    //   }else {
     //    //     this.$Message.error('获取网格数据失败，请重新刷新');
     //    //   }
     //       if(data.communityId){
     //       	gridsQueryAllList(data).then(res => {
     //       		if(res && res.success){
     //       			this.gridRidio = res.data;
     //       		}else {
     //       			this.$Message.error('获取网格数据失败，请重新刷新');
     //       		}
     //       	})
     //       }else{
     //       	this.gridRidio = [];
     //       }

     //  },
      setapplicationTime(e){
				this.tZhsqVolunteerForm.applicationTime = e;
			},
      reductionDate(date){//转换时间
      	let d = new Date(date);
      	d = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
      	return d;
      },
      //提交
      handelSubmit() {
        this.$refs['tZhsqVolunteerForm'].validate((valid) => {
          if (valid) {
            this.loading = true;
            if (this.TZhsqVolunteerId != null && this.TZhsqVolunteerId.trim().length > 0) {
              this.tZhsqVolunteerForm.id = this.TZhsqVolunteerId;
              this.tZhsqVolunteerForm.applicationTime = this.reductionDate(this.tZhsqVolunteerForm.applicationTime);
              if(this.tZhsqVolunteerForm.state == 2){
                this.tZhsqVolunteerForm.state = 0
              }
              updateTZhsqVolunteer(this.tZhsqVolunteerForm).then(res => {

                this.loading = false;
                if (res && res.code == 200) {
                  this.closeModal(false);
                  this.$emit('handleSearch');
                  this.$Message.success('保存成功');
                } else {
                  this.$Message.error(res.msg);
                }
              })
            } else {
              addTZhsqVolunteer(this.tZhsqVolunteerForm).then(res => {
                this.loading = false;
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
      //关闭页面
      closeModal(val) {
        this.$emit('input', val);
      },
      //初始化表单
      initForm() {
        this.imageUrlList = [];
        this.tZhsqVolunteerForm = {
          nativePlace:'',
          nameUsedBefore:'',
          workAddress:'',
          education:'',
          religiousBelief:'',
          nation:'',
          name: '',
          sex: '',
          idCard: '',
          phone: '',
          houseStreet:'',
          houseStreetId: '',
          houseCommunityId: '',
          houseCommunity: '',
          isPartyMember: '',
          maritalStatus:'',
          homeAddress: '',
          state: '',
          imgPath:'',
          orderNumber: '',
          houseGridName:'',
          houseGrid: '',
          imageIsUpdate:false,
          applicationTime:null,
          houseId:'',
        };
      },
      //表单验证规则
      getTZhsqVolunteerFormRule() {
        return {
          idCard:[
            {required:true,message:'身份证号码不能为空！',tigger:'blur'},
            {
              pattern: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/,
              message: '身份证号不正确',
              trigger: 'blur'
            },
            { type: 'string', max: 18, message: '数据的最大长度为18！', trigger: 'blur' }
          ],
          name: [
            {required: true, message: '姓名不能为空！', trigger: 'blur'},
            {pattern: '^.{2,50}$', message: '姓名过长或过短', trigger: 'blur'},
            {
              pattern: '^([\u4e00-\u9fa5]{2,50}|[a-zA-Z.\\s]{2,50})$',
              message: '姓名格式不正确',
              trigger: 'blur'
            }
          ],
          sex: [
            {required: true, message: '性别不能为空！', trigger: 'blur'},
            {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
          ],
          // nameUsedBefore:[
          //   {required: true, message: '曾用名不能为空！', trigger: 'blur', pattern: /.+/},
          // ],
          phone: [
            {required: true, message: '手机号不能为空！', trigger: 'blur'},
            {pattern: /^1[3456789]\d{9}$/, message: '手机号码格式不正确', trigger: 'blur'},
            {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
          ],
          houseStreetId : [
            {required: true, message: '所属街道不能为空！', trigger: 'blur', pattern: /.+/},
          ],
          workAddress: [
            {required: true, message: '工作单位不能为空！', trigger: 'blur', pattern: /.+/},
          ],
          applicationTime:[
						{required: true, message: '申请时间不能为空！', trigger: 'changer',pattern: /.+/ },
					],
          houseCommunityId:[
            {required: true, message: '所属社区不能为空！', trigger: 'blur', pattern: /.+/},
          ],
          education: [
            {required: true, message: '学历不能为空！', trigger: 'blur', pattern: /.+/},
          ],
          nation: [
            {required: true, message: '民族不能为空！', trigger: 'blur', pattern: /.+/},
          ],
          religiousBelief: [
            {required: true, message: '宗教信仰不能为空！', trigger: 'blur', pattern: /.+/},
          ],

          maritalStatus: [
            {required: true, message: '婚姻状况不能为空！', trigger: 'blur', pattern: /.+/},
          ],

          houseGrid: [
            {required: true, message: '所属网格不能为空！', trigger: 'blur', pattern: /.+/},
          ],
          isPartyMember: [
            {required: true, message: '是否为党员不能为空！', trigger: 'blur', pattern: /.+/},
          ],
          nativePlace: [
            {required: true, message: '籍贯不能为空！', trigger: 'blur', pattern: /.+/},
          ],
          homeAddress: [
            {required: true, message: '居住房屋不能为空！', trigger: 'blur'},
            {pattern: '^.{2,255}$', message: '家庭住址过长或过短', trigger: 'blur'},
            // {
            //   pattern: '^([\u4e00-\u9fa5]{2,255}|[a-zA-Z.\\s]{2,255})$',
            //   message: '家庭住址格式不正确',
            //   trigger: 'blur'
            // }
          ],
          // state: [
          //   {required: true, message: '审核状态不能为空！', trigger: 'blur', pattern: /.+/},
          // ],
          // orderNumber: [
          //   {required: true, message: '排序不能为空！', trigger: 'blur'},
          //   {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
          // ],
        }
      },
      onFileUploadSuccess(res, file) {
        this.tZhsqVolunteerForm.imgPath = res.data
      },
      onFileUploadError(file) {
        this.$Message.error('图片上传失败！')
      },
      onRemovePath() {
        this.tZhsqVolunteerForm.imgPath = ''
      }
    },
    watch: {
      value(val) {
        this.show = val;
      },
      //初始化
      show(val) {
        this.submit="提交";
        this.getNationData();
        this.getEducation();
        this.getReligiousBelief();
        this.getStreetData();
        this.getRadio();
        this.initForm();
        this.loading = false;
        this.editTitle = this.modalTitle;
        if (this.editTitle == "查看") {
          this.disabled = true;
        } else {
          this.disabled = false;
        }
        if (val) {
          this.$refs['tZhsqVolunteerForm'].resetFields();
          // this.getCardIdList();
          if (this.TZhsqVolunteerId != null && this.TZhsqVolunteerId.trim().length > 0) {
            this.isfrist = true;

            getTZhsqVolunteer({id: this.TZhsqVolunteerId}).then(res => {
              if (res && res.code == 200) {
                this.tZhsqVolunteerForm.nameUsedBefore = res.data.nameUsedBefore;
                this.tZhsqVolunteerForm.workAddress = res.data.workAddress;
                this.tZhsqVolunteerForm.education = res.data.education;
                this.tZhsqVolunteerForm.name = res.data.name;
                this.tZhsqVolunteerForm.sex = res.data.sex;
                this.tZhsqVolunteerForm.idCard = res.data.idCard;
                this.tZhsqVolunteerForm.imgPath = res.data.imgPath;
                this.tZhsqVolunteerForm.religiousBelief = res.data.religiousBelief;
                this.tZhsqVolunteerForm.nation = res.data.nation;

                this.tZhsqVolunteerForm.phone = res.data.phone;
                 // this.tZhsqVolunteerForm.houseStreetId = res.data.houseStreetId;
                // this.tZhsqVolunteerForm.houseCommunityId = res.data.houseCommunityId;
                 // this.tZhsqVolunteerForm.houseStreet = res.data.houseStreet;
                // this.tZhsqVolunteerForm.houseCommunity = res.data.houseCommunity;
                // this.getGrids({"communityId":res.data.houseCommunity});
                this.tZhsqVolunteerForm.isPartyMember = res.data.isPartyMember;
                this.tZhsqVolunteerForm.maritalStatus = res.data.maritalStatus;
                this.tZhsqVolunteerForm.homeAddress = res.data.homeAddress;
                this.tZhsqVolunteerForm.nativePlace = res.data.nativePlace;
                this.tZhsqVolunteerForm.state = res.data.state;
                this.tZhsqVolunteerForm.orderNumber = res.data.orderNumber;
                // this.tZhsqVolunteerForm.houseGrid = res.data.houseGrid;
                // this.tZhsqVolunteerForm.houseGridName = res.data.houseGridName;
                this.tZhsqVolunteerForm.applicationTime = res.data.applicationTime;
                this.tZhsqVolunteerForm.houseId = res.data.houseId;
                 if(res.data.applicationTime != null){
                 	this.tZhsqVolunteerForm.applicationTime = formartDate(new Date(res.data.applicationTime).getTime(), 'yyyy-MM-dd hh:mm:ss');
                 }else{
                 	this.tZhsqVolunteerForm.applicationTime = null;
                 }
                this.tZhsqVolunteerForm.houseStreetId = res.data.houseStreetId;
                this.streetChange({value:res.data.houseStreetId});
                this.tZhsqVolunteerForm.houseCommunityId = res.data.houseCommunityId;

                this.communityChange({value:res.data.houseCommunityId});

                this.tZhsqVolunteerForm.houseGrid = res.data.houseGrid;
                this.tZhsqVolunteerForm.houseGridName = res.data.houseGridName;
                this.tZhsqVolunteerForm.state = res.data.state;
                if(res.data.state == 2){
                  this.submit="重新提交"
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
