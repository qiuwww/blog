<style lang="less">
.basicSocialOrganizationLook {
  .noImg {
    width: 80px;
    border: 1px dashed rgb(204, 204, 204);
    margin-left: 0px;
    height: 100px;
    line-height: 93px;
    margin-top: 10px;
    text-align: center;
    color: #ccc;
    user-select: none;
  }

  .img {
    width: 85px;
    margin-top: 10px;
    border: 1px dashed #ccc;
    padding: 2px;
  }

  .ivu-form-item {
    margin-bottom: 0px !important;
  }
}
</style>
<template>
  <Modal v-model="show" :title="editTitle" :mask-closable="false" class="basicSocialOrganizationLook" width="1000" z-index="2000">
    <Form ref="basicSocialOrganizationForm" :model="basicSocialOrganizationForm" :label-width="130">
      <Divider orientation="left" style="color:#2d8cf0;">基本信息</Divider>
      <Row>
        <Col span="8">
          <Row>
            <FormItem label="社会组织类别">
              {{ basicSocialOrganizationForm.type }}
            </FormItem>
          </Row>
          <Row>
            <FormItem label="法人代表" prop="legalPerson">
              {{ basicSocialOrganizationForm.legalPerson }}
            </FormItem>
          </Row>
          <Row>
            <FormItem label="社会组织名称" prop="name">
              {{ basicSocialOrganizationForm.name }}
            </FormItem>
          </Row>
        </Col>
        <Col span="8">
          <Row>
            <FormItem label="法人联系方式" prop="legalPhone">
              {{ basicSocialOrganizationForm.legalPhone }}
            </FormItem>
          </Row>
          <Row>
            <FormItem label="统一社会信用代码" prop="orgCode">
              {{ basicSocialOrganizationForm.orgCode }}
            </FormItem>
          </Row>
          <Row>
            <FormItem label="法人身份证号" prop="legalCard">
              {{ basicSocialOrganizationForm.legalCard }}
            </FormItem>
          </Row>
        </Col>


        <Col span="8">
          <FormItem label="头像">
            <div v-viewer="{movable: true}">
              <img v-if="basicSocialOrganizationForm.headPortrait" :src="basicSocialOrganizationForm.headPortrait" class="img">
              <img v-else src="/img/tx_wzp2.png" class="img">
            </div>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="8">
          <FormItem label="所属街道" prop="streetId">
            {{ basicSocialOrganizationForm.streetName }}
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="所属社区" prop="communityId">
            {{ basicSocialOrganizationForm.communityName }}
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="所属网格" prop="gridsId">
            {{ basicSocialOrganizationForm.gridsName }}
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="8">
          <FormItem label="网格长" prop="gridPersonName">
            {{ basicSocialOrganizationForm.gridPersonName }}
          </FormItem>
        </Col>

        <Col span="8">
          <FormItem label="地图标注" prop="position">
            {{ basicSocialOrganizationForm.position }}
          </FormItem>
        </Col>
        <Col span="8" >
          <FormItem label="商户类别" v-if="basicSocialOrganizationForm.type=='个体商户'">
            {{ basicSocialOrganizationForm.merchantSort }}
          </FormItem>
        </Col>
      </Row>
      <Row v-if="basicSocialOrganizationForm.type=='个体商户'">
        <Col span="24">
          <FormItem label="经营范围" prop="businessScope">
            {{ basicSocialOrganizationForm.businessScope }}
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="24">
          <FormItem label="所属房屋" prop="address">
            {{ basicSocialOrganizationForm.address }}
          </FormItem>
        </Col>
      </Row>
      <Divider orientation="left" style="color:#2d8cf0;">负责人信息</Divider>
      <Row>
        <Col span="8">
          <FormItem label="负责人姓名" prop="principalName">
            {{ basicSocialOrganizationForm.principalName }}
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="负责人联系方式" prop="principalPhone">
            {{ basicSocialOrganizationForm.principalPhone }}
          </FormItem>
        </Col>

      </Row>
      <Divider orientation="left" style="color:#2d8cf0;">治安负责人信息</Divider>
      <Row>
        <Col span="8">
          <FormItem label="治安负责人" prop="policePrincipal">
            {{ basicSocialOrganizationForm.policePrincipal }}
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="治安负责人电话" prop="policePrincipalPhone">
            {{ basicSocialOrganizationForm.policePrincipalPhone }}
          </FormItem>
        </Col>
      </Row>

      <update-basic-social-organization  v-model="updateShow" :basic-social-organization-id="BasicSocialOrganizationId"
                                     modal-title="社会组织编辑" v-on:handleSearch="handleSearch"
      ></update-basic-social-organization>

    </Form>
    <div slot="footer">
      <Button type="text" @click="show=false">取消</Button>
<!--      <Button type="primary" v-if="updateModelShow" :loading="loading" @click="handelSubmit">编辑</Button>-->
    </div>
  </Modal>
</template>
<script>
import {
  getBasicSocialOrganization
} from '@/api/zhsq/basicSocialOrganization/basicSocialOrganization'
import {formartDate, nginxUrl} from '@/api/tools/tool';
import {
  queryAllTZhsqGridMemberListByGridId,
  queryAllGridMemberListByGridId
} from '@/api/zhsq/tZhsqGridMember/tZhsqGridMember'
import {queryAllList} from '@/api/zhsq/basicGrids/basicGrids'
import {getCommunity, getDictionary, getStreet} from "../../../api";
import updateBasicSocialOrganization   from "./updateBasicSocialOrganization";

export default {

  name: "lookBasicSocialOrganization",
  props: {
    value: {
      type: Boolean,
      default: false
    },
    BasicSocialOrganizationId: {
      type: String
    },
    modalTitle: {
      type: String
    },
    updateModelShow: {
      type: Boolean,
      default: false
    },
  },
  components: {
    updateBasicSocialOrganization
  },
  data() {
    return {
      updateShow: false,
      typePriority: [],
      gridsIdPriority: [],
      policePrincipalPriority: [],
      show: this.value,
      editTitle: this.modalTitle,
      loading: true,
      disabled: false,
      basicSocialOrganizationForm: {
        type: '',
        name: '',
        address: '',
        legalPerson: '',
        legalPhone: '',
        legalCard: '',
        streetName: '',
        communityName: '',
        gridsId: '',
        gridsName: '',
        gridPersonName: '',
        orgCode: '',
        policePrincipal: '',
        headPortrait: '',
        position: '',
        policePrincipalPhone: '',
        principalName: '',
        principalPhone: '',
        addressId: '',//房屋id
        businessScope:"",//经营范围
        merchantSort: '',//商户类别
      },
      imageUrlList: [],
      merchantSortPriority:[],
    }
  },
  methods: {
    closeModal(val) {
      this.$emit('input', val);
    },
    //点击编辑
    handelSubmit() {
      this.updateShow = true;
    },
    initForm() {
      this.imageUrlList = [];
      this.typePriority = [];
      this.basicSocialOrganizationForm = {
        type: '',
        name: '',
        address: '',
        legalPerson: '',
        legalPhone: '',
        legalCard: '',
        streetName: '',
        communityName: '',
        gridsId: '',
        gridsName: '',
        gridPerson: '',
        orgCode: '',
        policePrincipal: '',
        headPortrait: '',
        position: '',
        policePrincipalPhone: '',
        principalName: '',
        principalPhone: '',
        businessScope:"",//经营范围
        merchantSort: '',//商户类别
        addressId: '',//房屋id
      };
    },

    initData: function () {
      let _this = this;
      queryAllList({}).then(res => {
        if (res && res.success) {
          for (let i = 0; i < res.data.length; i++) {
            _this.gridsIdPriority.push({id: res.data[i].id, name: res.data[i].name});
          }
        }
      });

    },
    //编辑完成
    handleSearch(){
      this.getInfo();
      this.$emit('handleSearch')
    },
    //查询信息
    getInfo(){
      let _this = this;
      if (this.BasicSocialOrganizationId != null && _this.BasicSocialOrganizationId.trim().length > 0) {
        getBasicSocialOrganization({id: _this.BasicSocialOrganizationId}).then(res => {
          if (res && res.code == 200) {

            //社会组织类别下拉数据
            getDictionary({fieldName: 'socialOrganizationTypeData'}).then(rest => {
              if (rest && rest.success) {
                _this.typePriority = rest.data;
                let filter = _this.typePriority.filter(item => {
                  return item.number.toString() == res.data.type;
                });
                if (filter && filter.length > 0) {
                  _this.basicSocialOrganizationForm.type = filter[0].name;
                  this.$forceUpdate();//重新渲染数据
                }
              }
            });

            _this.basicSocialOrganizationForm.name = res.data.name;
            _this.basicSocialOrganizationForm.address = res.data.address;
            _this.basicSocialOrganizationForm.legalPerson = res.data.legalPerson;
            _this.basicSocialOrganizationForm.legalPhone = res.data.legalPhone;
            _this.basicSocialOrganizationForm.legalCard = res.data.legalCard;
            _this.basicSocialOrganizationForm.streetName = res.data.streetName;
            _this.basicSocialOrganizationForm.communityName = res.data.communityName;
            _this.basicSocialOrganizationForm.gridsName = res.data.gridsName;
            _this.basicSocialOrganizationForm.businessScope = res.data.businessScope
            // _this.basicSocialOrganizationForm.merchantSort = res.data.merchantSort

            _this.basicSocialOrganizationForm.policePrincipalPhone = res.data.policePrincipalPhone;
            queryAllGridMemberListByGridId({gridId: res.data.gridsId}).then(res2 => {
              if (res2 && res2.success) {
                _this.policePrincipalPriority = res2.data;
                let filter1 = _this.policePrincipalPriority.filter(item => item.id == res.data.policePrincipal);
                if (filter1 && filter1.length > 0) {
                  _this.basicSocialOrganizationForm.policePrincipal = filter1[0].name;

                }
                else {
                  _this.basicSocialOrganizationForm.policePrincipal = "";
                  _this.basicSocialOrganizationForm.policePrincipalPhone = "";
                }
              }
              else {
                _this.basicSocialOrganizationForm.policePrincipal = "";
                _this.basicSocialOrganizationForm.policePrincipalPhone = "";
              }
              _this.$forceUpdate();//重新渲染数据
            });
            getDictionary({ 'fieldName': 'merchantSortData' }).then(rese => {
              if (rese&&rese.success) {
                let merchantSortPriorityFilter = rese.data.filter(item => item.number.toString() == res.data.merchantSort);
                if (merchantSortPriorityFilter && merchantSortPriorityFilter.length > 0) {
                  _this.basicSocialOrganizationForm.merchantSort = merchantSortPriorityFilter[0].name;
                  _this.$forceUpdate();//重新渲染数据
                }
              }
            })

            queryAllTZhsqGridMemberListByGridId({ gridId: res.data.gridsId }).then(restt => {

              if (restt.success) {
                let gridPersonNameFilter = restt.data.filter(item => item.id.toString() == res.data.gridPersonId);
                if(gridPersonNameFilter && gridPersonNameFilter.length > 0){
                  _this.basicSocialOrganizationForm.gridPersonName = gridPersonNameFilter[0].name;;
                  _this.$forceUpdate();//重新渲染数据
                }
              }
            })

            _this.basicSocialOrganizationForm.orgCode = res.data.orgCode;
            _this.basicSocialOrganizationForm.headPortrait = res.data.headPortrait;
            if (res.data.position) {
              _this.basicSocialOrganizationForm.position = "已标注";
            } else {
              _this.basicSocialOrganizationForm.position = "未标注";
            }
            _this.basicSocialOrganizationForm.principalName = res.data.principalName;
            _this.basicSocialOrganizationForm.principalPhone = res.data.principalPhone;
            // this.basicSocialOrganizationForm.addressId = res.data.addressId;
          } else {
            _this.$Message.error(res.msg);
          }
        });
      }

    }
  },
  watch: {
    value(val) {
      this.show = val;
    },
    show(val) {
      this.loading = false;
      this.updateShow = false;
      this.editTitle = this.modalTitle;
      if (val) {

        this.initData();
        this.initForm();
        this.$refs['basicSocialOrganizationForm'].resetFields();
        this.getInfo();
      } else {
        this.closeModal(val);
      }
    }
  }
}
</script>
