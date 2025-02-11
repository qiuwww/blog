<style lang="less" scoped>
.lookTZhsqMerchantProfile {
  .noImg {
    width: 80px;
    border: 1px dashed rgb(204, 204, 204);
    margin-left: 20px;
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
  <Modal v-model="show" :title="editTitle" :draggable="false" :mask-closable="false" class="lookTZhsqMerchantProfile"
         :width="900">
    <Form ref="lookForm" :model="lookForm" :label-width="125">
      <Row>
        <Col span="8">
          <Row>
            <FormItem label="商户类别" prop="merchantSort">
              {{ lookForm.merchantSort }}
            </FormItem>
          </Row>
          <Row>
            <FormItem label="法人身份证号" prop="legalId">
              {{ lookForm.legalId }}
            </FormItem>
          </Row>
          <Row>
            <FormItem label="经营范围" prop="businessScope">
              {{ lookForm.businessScope }}
            </FormItem>
          </Row>
        </Col>
        <Col span="8">
          <Row>
            <FormItem label="商户名称" prop="merchantName">
              {{ lookForm.merchantName }}
            </FormItem>
          </Row>
          <Row>
            <FormItem label="法人姓名" prop="legalEntity">
              {{ lookForm.legalEntity }}
            </FormItem>
          </Row>
          <Row>
            <FormItem label="法人电话" prop="legalPhone">
              {{ lookForm.legalPhone }}
            </FormItem>
          </Row>
        </Col>
        <Col span="8">
          <FormItem label="图片">
            <div v-if="lookForm.headPortrait" v-viewer="{movable: true}">
              <img :src="lookForm.headPortrait" class="img">
            </div>
            <div class="noImg" v-if="!lookForm.headPortrait">暂无图片</div>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="8">
          <FormItem label="所属街道" prop="street">
            {{ lookForm.street }}
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="所属社区" prop="legalCommunity">
            {{ lookForm.legalCommunity }}
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="所属网格" prop="legalGrid">
            {{ lookForm.legalGrid }}
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="24">
          <FormItem label="所属房屋" prop="houseName">
            {{ lookForm.houseName }}
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="24">
          <FormItem label="商户地址" prop="merchantAddress">
            {{ lookForm.merchantAddress }}
          </FormItem>
        </Col>
      </Row>
      <updateTZhsqMerchantProfile v-model="updateShow" :TZhsqMerchantProfileId="TZhsqMerchantProfileId" modalTitle="商户编辑" ></updateTZhsqMerchantProfile>
    </Form>
    <div slot="footer">
      <Button type="text" @click="show=false">取消</Button>
      <Button type="primary" v-if="updateModelShow" :loading="loading" @click="handelSubmit">编辑</Button>
    </div>
  </Modal>
</template>
<script>
import {getTZhsqMerchantProfile} from '@/api/zhsq/tZhsqMerchantProfile/tZhsqMerchantProfile'
import {formartDate, nginxUrl} from '@/api/tools/tool';
import {getDictionary} from '@/api/index'
import updateTZhsqMerchantProfile from './updateTZhsqMerchantProfile'

export default {
  components: {
    updateTZhsqMerchantProfile
  },
  name: 'lookTZhsqMerchantProfile',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    modalTitle: {
      type: String
    },
    TZhsqMerchantProfileId: {
      type: String
    },
    updateModelShow: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      loading:false,
      updateShow:false,
      show: this.value,
      imageUrlList: [],
      editTitle: this.modalTitle,
      lookForm: {
        houseName: '',
        merchantSort: '',
        merchantName: '',
        merchantAddress: '',
        businessScope: '',
        legalEntity: '',
        legalPhone: '',
        street: '',
        legalId: '',
        location: '',
        legalCommunity: '',
        legalGrid: '',
        headPortrait: '',
      },
      merchantSortPriority: [],
    }
  },
  methods: {
    //点击编辑
    handelSubmit() {
      this.updateShow = true;
    },
    getMerchantSortPriority() {//获取商户类别
      getDictionary({"fieldName": "merchantSortData"}).then(res => {
        if (res && res.success) {
          this.merchantSortPriority = res.data;
        }
      })
    },
    //初始化表单
    initForm() {
      this.imageUrlList = [];
      this.tZhsqMerchantProfileForm = {
        houseName: '',
        merchantSort: '',
        merchantName: '',
        merchantAddress: '',
        businessScope: '',
        legalEntity: '',
        legalPhone: '',
        legalId: '',
        location: '',
        street: '',
        legalCommunity: '',
        legalGrid: '',
        headPortrait: '',
      };
      this.getMerchantSortPriority();
    },
    //提交数据
    closeModal(val) {
      this.$emit('input', val);
    },
  },
  watch: {
    value(val) {
      this.show = val;
    },
    show(val) {
      this.initForm();
      this.updateShow = false;
      this.editTitle = this.modalTitle;
      if (val) {
        if (this.TZhsqMerchantProfileId != null && this.TZhsqMerchantProfileId.trim().length > 0) {
          getTZhsqMerchantProfile({id: this.TZhsqMerchantProfileId}).then(res => {
            if (res && res.code == 200) {
              let sort = this.merchantSortPriority.filter(item => item.number == res.data.merchantSort);
              if (sort.length > 0) {
                this.lookForm.merchantSort = sort[0].name;
              }
              // this.lookForm.merchantSort = res.data.merchantSort;
              this.lookForm.merchantName = res.data.merchantName;
              this.lookForm.houseName = res.data.houseName;
              this.lookForm.merchantAddress = res.data.merchantAddress;
              this.lookForm.businessScope = res.data.businessScope;
              this.lookForm.legalEntity = res.data.legalEntity;
              this.lookForm.legalPhone = res.data.legalPhone;
              this.lookForm.legalId = res.data.legalId;
              if (res.data.location == null || res.data.location == '') {
                this.lookForm.location = '未标注';
              } else if (res.data.location != null || res.data.location != '') {
                this.lookForm.location = '已标注';
              }
              this.lookForm.legalCommunity = res.data.legalCommunity;
              this.lookForm.legalGrid = res.data.legalGrid;
              this.lookForm.street = res.data.street;
              this.lookForm.headPortrait = res.data.headPortrait;
            } else {
              this.$Message.error(res.msg);
            }
          });
        }
      } else {
        this.closeModal(val);
      }
    }
  },
}
</script>
