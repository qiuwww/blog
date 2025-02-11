<style lang="less" >
.tZhsqVolunteerLook {
  .form-item-input {
    width: 200px;
  }
  .ivu-form .ivu-row .ivu-form-item-label {
    width: 120px !important;
  }

  .noImg {
    width: 85px;
    border: 1px dashed rgb(204, 204, 204);
    margin-left: 20px;
    height: 93px;
    line-height: 93px;
    margin-top: 10px;
    text-align: center;
    color: #ccc;
    user-select: none;
    height: 93px;
  }
  .img {
    width: 85px;
    margin-top: 10px;
    border: 1px dashed #ccc;
    padding: 2px;
    height: 93px;
  }
  .ivu-form-item-error-tip {
    left: 80px;
  }

  .ivu-select {
    width: 180px;
  }
  .ivu-form-item {
    margin-bottom: 0px !important;
  }
  .ivu-input-wrapper {
    width: 180px;
  }
}
</style>
<template>
  <Modal
    v-model="show"
    :title="editTitle"
    :mask-closable="false"
    class="tZhsqVolunteerLook"
    width="970"
  >
    <Divider orientation="left" style="color:blue;">人员信息</Divider>
    <Form ref="tZhsqVolunteerForm" :model="tZhsqVolunteerForm" :label-width="100">
      <Row>
        <Col span="8">
          <Row>
            <FormItem label="身份证号" prop="idCard">{{tZhsqVolunteerForm.idCard}}</FormItem>
          </Row>
          <Row>
            <FormItem label="姓名" prop="name">{{tZhsqVolunteerForm.name}}</FormItem>
          </Row>
          <Row>
            <FormItem label="曾用名" prop="nameUsedBefore">{{tZhsqVolunteerForm.nameUsedBefore}}</FormItem>
          </Row>
        </Col>

        <Col span="8">
          <Row>
            <FormItem label="性别" prop="sex">{{tZhsqVolunteerForm.sex}}</FormItem>
          </Row>
          <Row>
            <FormItem label="是否为党员" prop="isPartyMember">{{tZhsqVolunteerForm.isPartyMember}}</FormItem>
          </Row>
          <Row>
            <FormItem label="婚姻状况" prop="maritalStatus">{{tZhsqVolunteerForm.maritalStatus}}</FormItem>
          </Row>
        </Col>
        <Col span="8">
          <FormItem label="头像">
<!--            <div v-if="tZhsqVolunteerForm.imgPath" v-viewer="{movable: true}">-->
<!--              <img :src="tZhsqVolunteerForm.imgPath" class="img">-->
<!--            </div>-->
<!--            <div class="noImg" v-if="!tZhsqVolunteerForm.imgPath">暂无头像</div>-->
            <div v-viewer="{movable: true}">
              <img v-if="tZhsqVolunteerForm.imgPath" :src="tZhsqVolunteerForm.imgPath" class="img">
              <img v-else src="/img/tx_wzp2.png" class="img">
            </div>
          </FormItem>
        </Col>
      </Row>
      <Row>

          <Col span="8">
          <FormItem label="手机号" prop="phone">{{tZhsqVolunteerForm.phone}}</FormItem>
          </Col>
          <Col span="8">
            <FormItem label="民族" prop="nation">{{tZhsqVolunteerForm.nation}}</FormItem>
          </Col>
          <Col span="8">
            <FormItem label="学历" prop="education">{{tZhsqVolunteerForm.education}}</FormItem>
          </Col>



      </Row>
      <Row>
        <Col span="8">
          <FormItem label="所属街道" prop="houseStreet">{{tZhsqVolunteerForm.houseStreet}}</FormItem>
        </Col>
        <Col span="8">
           <FormItem label="所属社区" prop="houseCommunity">{{tZhsqVolunteerForm.houseCommunity}}</FormItem>
        </Col>
        <Col span="8">
          <FormItem label="所属网格" prop="houseGrid">{{tZhsqVolunteerForm.houseGridName}}</FormItem>

        </Col>
      </Row>

      <Row>
        <Col span="8">
          <FormItem label="籍贯" prop="nativePlace">{{tZhsqVolunteerForm.nativePlace}}</FormItem>
        </Col>
        <Col span="8">
          <FormItem label="宗教信仰" prop="religiousBelief">{{tZhsqVolunteerForm.religiousBelief}}</FormItem>
        </Col>
        <Col span="8">
          <FormItem label="工作单位" prop="workAddress">{{tZhsqVolunteerForm.workAddress}}</FormItem>
        </Col>
        <Col span="24">
          <FormItem label="居住房屋" prop="homeAddress">{{tZhsqVolunteerForm.homeAddress}}</FormItem>
        </Col>
      </Row>
      <Divider orientation="left" style="color:blue;">志愿者信息</Divider>


      <Row>
      <Col span="8">
        <FormItem label="申请时间" prop="applicationTime">{{tZhsqVolunteerForm.applicationTime}}</FormItem>
      </Col>
      <Col span="8">
        <FormItem label="审核状态" prop="state">{{tZhsqVolunteerForm.state}}</FormItem>

      </Col>
      </Row>
      <Row v-if="tZhsqVolunteerForm.rejectionReasons != null && tZhsqVolunteerForm.rejectionReasons!=''">
        <FormItem label="驳回原因" prop="isPartyMember">{{tZhsqVolunteerForm.rejectionReasons}}</FormItem>
      </Row>

       <Divider orientation="left" style="color:blue;">历史活动参与信息</Divider>
      <Row>
        <FormItem label="参加的活动" prop="isPartyMember">
          <span style="color: #1f83ed;cursor: pointer;" v-for="(item,i ) in activities"@click="handleLook(item.id)">{{item.name}}</span>
        </FormItem>
      </Row>
      <!--      <FormItem label="审核状态" prop="state">-->
      <!--        <RadioGroup v-bind:disabled="disabled" v-model="tZhsqVolunteerForm.state">-->
      <!--          <Radio v-for="(item ,i) in stateRadio" :label="item.label">{{item.label}}</Radio>-->
      <!--        </RadioGroup>-->
      <!--      </FormItem>-->
    </Form>
    <div slot="footer">
      <Button type="primary" v-if="disabled" @click="updateState('1')">通过</Button>
      <Button type="warning" v-if="disabled" @click="updateState('2')">驳回</Button>
      <Button type="text" v-if="!disabled" @click="show=false">取消</Button>
    </div>
    <Modal v-model="modelShow" title="确认驳回" :mask-closable="false" draggable :z-index="1010">
      <Form ref="tZhsqVolunteerForm" :model="tZhsqVolunteerForm" :label-width="110">
        <FormItem label="驳回原因">
          <Input
            v-model="tZhsqVolunteerForm.rejectionReasons"
            type="textarea"
            :autosize="{minRows: 3,maxRows: 5}"
            placeholder
          ></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" @click="saveData('2')">确定</Button>

        <Button type="text" @click="modelShow=false,tZhsqVolunteerForm.rejectionReasons=''">取消</Button>
      </div>
    </Modal>
    <look-t-zhsq-volunteer-activity
      v-model="lookShow"
      :TZhsqVolunteerActivityId="TZhsqVolunteerActivityId"
      modalTitle="街道志愿者活动详情"
    ></look-t-zhsq-volunteer-activity>
  </Modal>
</template>
<script>
import {
  addTZhsqVolunteer,
  updateTZhsqVolunteer,
  getTZhsqVolunteer,
} from "@/api/zhsq/tZhsqVolunteer/tZhsqVolunteer";
import {
  communityData,
  sexData,
  streetData,
  auditStatusState,
} from "@/api/tools/zhsqSelectData";
import { queryAllList as gridsQueryAllList } from "@/api/zhsq/basicGrids/basicGrids";
import lookTZhsqVolunteerActivity from "../tZhsqVolunteerActivity/lookTZhsqVolunteerActivity";
import { formartDate } from "@/api/tools/tool";
import {getDictionary, getStreet, getCommunity} from '@/api/index';
import { nginxUrl } from "../../../api/tools/tool";
export default {
  name: "updateTZhsqVolunteer",
  components: {
    lookTZhsqVolunteerActivity,
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    TZhsqVolunteerId: {
      type: String,
    },
    modalTitle: {
      type: String,
    },
    modalTitleDisabled: {
      type: Boolean,
      default: false,
    },

  },
  data() {
    return {
      show: this.value, //是否显示
      modelShow: false, //驳回原因弹框是否显示
      editTitle: this.modalTitle, //标题
      loading: true, //等待
      disabled: false, //是否
      houseStreetPriority: [], //街道集合
      houseCommunityPriority: [], //社区集合
      isPartyMemberRadio: [], //
      stateRadio: [], //
      sexRadio: [], //性别集合
      gridRidio: [], //网格集合
      isfrist: false, //
      activities: [], //活动集合
      TZhsqVolunteerActivityId: "", //活动id
      lookShow: false,
      tZhsqVolunteerForm: {

        //表单绑定数据

        nation:'',
        nativePlace:'',
        nameUsedBefore:'',
        workAddress: "",
        education: "",
        religiousBelief: "",
        maritalStatus: "",
        imgPath: "",
        name: "",
        sex: "",
        idCard: "",
        phone: "",
        applicationTime: "",
        houseStreet: "",
        houseCommunity: "",
        isPartyMember: "",
        homeAddress: "",
        state: "",
        orderNumber: "",
        houseGrid: "",
        rejectionReasons: "",
        houseGridName: "",
      },
      imageIsUpdate: false,
      imageUrlList: [],
    };
  },
  methods: {
    //获取下拉框以及单选按钮的选项
    getRadio() {
      this.sexRadio = sexData;
      this.houseStreetPriority = streetData;
      this.houseCommunityPriority = [];
      this.gridRidio = [];
      this.getGrids();
    },
    //获取网格
    getGrids() {
      gridsQueryAllList({}).then((res) => {
        if (res && res.code == 200) {
          this.gridRidio = res.data;
        }
      });
    },
    //关闭页面
    closeModal(val) {
      this.$emit("input", val);
    },
    //初始化表单
    initForm() {
      this.imageUrlList = [];
      this.tZhsqVolunteerForm = {

        nation:'',
        nativePlace:'',
        nameUsedBefore:'',
        workAddress: "",
        education: "",
        religiousBelief: "",
        maritalStatus: "",
        imgPath: "",
        name: "",
        sex: "",
        idCard: "",
        phone: "",
        applicationTime: "",
        houseStreet: "",
        houseCommunity: "",
        isPartyMember: "",
        homeAddress: "",
        state: "",
        orderNumber: "",
        houseGrid: "",
        rejectionReasons: "",
        houseGridName: "",
      };
    },
    //查看志愿者活动
    handleLook(id) {
      this.TZhsqVolunteerActivityId = id;
      this.lookShow = true;
    },
    //通过/驳回
    updateState(state) {
      this.tZhsqVolunteerForm.applicationTime = null;
      this.tZhsqVolunteerForm.updateTime = null;

      this.tZhsqVolunteerForm.state = state;
      this.tZhsqVolunteerForm.id = this.TZhsqVolunteerId;
      let value = "";
      if (state == "1") {
        value = "通过";
        this.saveData("1");
      } else if (state == "2") {
        value = "驳回";
        this.modelShow = true;
      }
      this.$emit('handleSearch');
    },
    //保存数据
    saveData(state) {
      if (state && state == "2") {
        if (
          this.tZhsqVolunteerForm.rejectionReasons != null &&
          this.tZhsqVolunteerForm.rejectionReasons.trim().length == 0
        ) {
          this.$Message.error("请输入驳回原因");
          return;
        }
      }
      this.tZhsqVolunteerForm.imageIsUpdate = false;
      updateTZhsqVolunteer(this.tZhsqVolunteerForm)
        .then((res) => {
          this.loading = false;
          this.$Modal.remove();
          if (res && res.code == 200) {
            this.$Message.success("保存成功");
            this.show = false;
            this.modelShow = false;
            this.$emit("handleSearch");
          } else {
            this.$Message.error(res.msg);
          }
        })
        .catch((err) => {
          this.loading = false;
          this.$Message.error(err.message);
        });
    },
    //活动详情弹框关闭回调
    handleSearch() {},
  },
  watch: {
    value(val) {
      this.show = val;
    },
    //初始化
    show(val) {
      this.getRadio();

      this.initForm();
      this.loading = false;
      this.editTitle = this.modalTitle;
      // document.querySelector(".noImg").style.display = "block";
      // document.querySelector(".img").style.display = "block";
      // if (this.editTitle.indexOf("查看") == -1) {
      //   this.disabled = true;
      // } else {
      //   this.disabled = false;
      // }
      this.disabled = this.modalTitleDisabled;
      if (val) {
        this.$refs["tZhsqVolunteerForm"].resetFields();
        if (
          this.TZhsqVolunteerId != null &&
          this.TZhsqVolunteerId.trim().length > 0
        ) {
          this.isfrist = true;
          this.getGrids();
          getTZhsqVolunteer({ id: this.TZhsqVolunteerId }).then((res) => {
            if (res && res.code == 200) {
              this.tZhsqVolunteerForm.name = res.data.name;
              this.tZhsqVolunteerForm.sex = res.data.sex;
              this.tZhsqVolunteerForm.idCard = res.data.idCard;
              this.tZhsqVolunteerForm.imgPath = res.data.imgPath;
              this.tZhsqVolunteerForm.phone = res.data.phone;
              this.tZhsqVolunteerForm.nameUsedBefore = res.data.nameUsedBefore;
              this.tZhsqVolunteerForm.applicationTime = res.data.applicationTime;
              if (res.data.applicationTime != "") {
                this.tZhsqVolunteerForm.applicationTime = formartDate(
                  new Date(res.data.applicationTime).getTime(),
                  "yyyy-MM-dd hh:mm:ss"
                );
              }

              if(res.data.state == 0){
									this.tZhsqVolunteerForm.state = "审核中";
								}else if(res.data.state == 1){
									this.tZhsqVolunteerForm.state = "已通过";
								}else if(res.data.state == 2){
									this.tZhsqVolunteerForm.state = "审核驳回";
								}
              this.tZhsqVolunteerForm.nativePlace = res.data.nativePlace;
              this.tZhsqVolunteerForm.workAddress = res.data.workAddress;
              this.tZhsqVolunteerForm.education = res.data.education;
              this.tZhsqVolunteerForm.religiousBelief = res.data.religiousBelief;
              this.tZhsqVolunteerForm.nation = res.data.nation;
              getDictionary({fieldName: 'nationData'}).then(resp => {
                  if (resp && resp.success) {
                      let temp = resp.data.filter(item => item.number == res.data.nation);
                      if(temp && temp.length>0){
                        this.tZhsqVolunteerForm.nation = temp[0].name;
                      }
                  }
              });
              this.tZhsqVolunteerForm.maritalStatus = res.data.maritalStatus;
              this.tZhsqVolunteerForm.houseStreet = res.data.houseStreet;
              this.tZhsqVolunteerForm.houseCommunity = res.data.houseCommunity;
              this.tZhsqVolunteerForm.isPartyMember = res.data.isPartyMember;
              this.tZhsqVolunteerForm.homeAddress = res.data.homeAddress;
              // this.tZhsqVolunteerForm.state = res.data.state;
              this.tZhsqVolunteerForm.orderNumber = res.data.orderNumber;
              this.tZhsqVolunteerForm.houseGrid = res.data.houseGrid;
              this.tZhsqVolunteerForm.rejectionReasons = res.data.rejectionReasons;
              this.activities = res.data.tzhsqGridMembers;
              this.tZhsqVolunteerForm.houseGridName = res.data.houseGridName;
            } else {
              this.$Message.error(res.msg);
            }
          });
        }
      } else {
        this.closeModal(val);
      }
    },
  },
};
</script>
