<style lang="less">
  .lookBasicPerson2 {
    .ivu-input {
      width: 180px;
    }

    .ivu-form .ivu-row .ivu-form-item-label {
      width: 120px !important;
    }

    .ivu-form-item {
      margin-bottom: 0px !important;
    }

    .noImg {
      width: 85px;
      border: 1px dashed rgb(204, 204, 204);
      margin-left: 120px;
      height: 93px;
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

    .ivu-table-tip {
      overflow-x: hidden !important;
    }
  }
</style>
<template>
  <Modal v-model="show" :title="editTitle" :mask-closable="false" class="lookBasicPerson2" width="970">
    <Divider style="margin:0 auto;color:#2d8cf0;" orientation="left">基本信息</Divider>
    <Form ref="basicPersonForm" :model="basicPersonForm">
      <Row>
        <Col span="8">
        <Row>
          <FormItem label="姓名" prop="name">
            {{ basicPersonForm.name }}
          </FormItem>
        </Row>
        <Row>
          <FormItem label="出生日期" prop="birthDate">
            {{ basicPersonForm.birthDate }}
          </FormItem>
        </Row>
        <Row>
          <FormItem label="性别" prop="sex">
            {{ basicPersonForm.sex }}
          </FormItem>
        </Row>
        </Col>
        <Col span="8">
        <Row>
          <FormItem label="身份证号" prop="cardId">
            {{ basicPersonForm.cardId }}
          </FormItem>
        </Row>

        <Row>
          <FormItem label="政治面貌" prop="politicalFace">
            {{ basicPersonForm.politicalFace }}
          </FormItem>
        </Row>

        <Row>
          <FormItem label="兴趣爱好" prop="hobby">
            {{ basicPersonForm.hobby }}
          </FormItem>
        </Row>
        </Col>

        <Col span="8">
        <FormItem label="头像">
          <div v-if="basicPersonForm.imgPath" v-viewer="{movable: true}">
            <img :src="basicPersonForm.imgPath" class="img">
          </div>
          <div class="noImg" v-if="!basicPersonForm.imgPath">暂无头像</div>
        </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="8">
        <FormItem label="所属街道" prop="ownedStreet">
          {{ basicPersonForm.streetName }}
        </FormItem>
        </Col>

        <Col span="8">
        <FormItem label="所属社区" prop="ownedCommunity">
          {{ basicPersonForm.communityName }}
        </FormItem>
        </Col>
        <Col span="8">
        <FormItem label="所属网格" prop="ownedGrid">
          {{ basicPersonForm.ownedGrid }}
        </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="24">
        <FormItem label="家庭地址" prop="residentialAddress">
          {{ basicPersonForm.residentialAddress }}
        </FormItem>
        </Col>
      </Row>
    </Form>

    <Form ref="formDynamic" :model="formDynamic">
      <Divider style="margin-top: 0;color:#2d8cf0;" orientation="left">亲属信息</Divider>
      <Row v-for="(item, index) in formDynamic.items" v-if="item.status === 1" :key="index">
        <Col span="8">
        <FormItem label="姓名">
          {{ item.name }}
        </FormItem>
        </Col>
        <Col span="8">
        <FormItem label="电话号码">
          {{ item.phone }}
        </FormItem>
        </Col>
        <Col span="8">
        <FormItem label="关系" :label-width="60">
          {{ item.relationship }}
        </FormItem>
        </Col>
      </Row>
    </Form>

    <div slot="footer">
      <Button type="text" @click="show=false">取消</Button>
    </div>
  </Modal>
</template>
<script>
import { getBasicPerson } from '@/api/zhsq/basicPerson/basicPerson'
import { nginxUrl } from '@/api/tools/tool'

import { getDictionary } from '../../../api'

export default {
  name: 'LookBasicPerson2',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    BasicPersonId: {
      type: String
    },
    modalTitle: {
      type: String
    },
    gridName: {
      type: String
    }
  },
  data() {
    return {
      formDynamic: {
        items: []
      },
      imageUrlList: [],
      loading: true,
      data: [],
      gridData: [],
      show: this.value,
      editTitle: this.modalTitle,
      updateHouseData: [],
      basicPersonForm: {
        hobby: '',
        name: '',
        sex: '',
        imgPath: '',
        birthDate: '',
        nation: '',
        cardId: '',
        politicalFace: '',
        residentialAddress: '',
        streetName: '',
        communityName: '',
        ownedGrid: '',
        relativesList: [],
        imageIsUpdate: false
      },

      politicalData: [],
      hobbyData: [],
      relationData: []

    }
  },
  watch: {
    value(val) {
      this.show = val
    },
    show(val) {
      this.data = []
      this.loading = false
      this.editTitle = this.modalTitle
      if (val) {
        this.$refs['basicPersonForm'].resetFields()
        this.initForm()
        // 加载政治面貌
        getDictionary({ fieldName: 'politicalData' }).then(res => {
          if (res && res.success) {
            this.politicalData = res.data
          }
        })

        // 加载兴趣爱好
        getDictionary({ fieldName: 'hobbyData' }).then(res => {
          if (res && res.success) {
            this.hobbyData = res.data
          }
        })

        // 加载老人亲属关系
        getDictionary({ fieldName: 'relationData' }).then(res => {
          if (res && res.success) {
            this.relationData = res.data
          }
        })

        if (this.BasicPersonId != null && this.BasicPersonId.trim().length > 0) {
          // 获取人员档案信息
          getBasicPerson({ id: this.BasicPersonId }).then(res => {
            if (res && res.code == 200) {
              this.basicPersonForm.name = res.data.name
              this.basicPersonForm.sex = res.data.sex
              this.basicPersonForm.birthDate = res.data.birthDate
              this.basicPersonForm.imgPath = res.data.imgPath
              if (res.data.imgPath != null && res.data.imgPath != '') {
                this.basicPersonForm.imgPath = res.data.imgPath
              }
              this.basicPersonForm.cardId = res.data.cardId

              let filter = this.politicalData.filter(item => item.number == res.data.politicalFace)
              if (filter && filter.length > 0) {
                this.basicPersonForm.politicalFace = filter[0].name
              }

              this.basicPersonForm.residentialAddress = res.data.residentialAddress
              this.basicPersonForm.streetName = res.data.streetName
              this.basicPersonForm.communityName = res.data.communityName
              this.basicPersonForm.ownedGrid = res.data.ownedGrid

              if (res.data.hobby) {
                const parse = JSON.parse(res.data.hobby)
                this.basicPersonForm.hobby = ''
                for (let i = 0; i < parse.length; i++) {
                  filter = this.hobbyData.filter(item => item.number == parse[i])
                  if (filter && filter.length > 0) {
                    this.basicPersonForm.hobby += ',' + filter[0].name
                  }
                }
                if (this.basicPersonForm.hobby != '') {
                  this.basicPersonForm.hobby = this.basicPersonForm.hobby.substring(1)
                }
              }

              this.formDynamic.items = res.data.relativesList
              for (let i = 0; i < this.formDynamic.items.length; i++) {
                if (i == 0) {
                  this.formDynamic.items[i].flag = false
                } else {
                  this.formDynamic.items[i].flag = true
                }
                this.formDynamic.items[i].status = 1
                this.formDynamic.items[i].index = i + 1

                const filter1 = this.relationData.filter(item => item.number == this.formDynamic.items[i].relationship)
                if (filter1 && filter1.length > 0) {
                  this.formDynamic.items[i].relationship = filter1[0].name
                }
              }
            } else {
              this.$Message.error(res.msg)
            }
          })
        }
      } else {
        this.closeModal(val)
      }
    }
  },
  methods: {
    closeModal(val) {
      this.$emit('input', val)
    },
    initForm() {
      this.imageUrlList = []
      this.basicPersonForm = {
        hobby: '',
        name: '',
        sex: '',
        imgPath: '',
        birthDate: '',
        nation: '',
        cardId: '',
        politicalFace: '',
        residentialAddress: '',
        streetName: '',
        communityName: '',
        ownedGrid: '',
        relativesList: [],
        imageIsUpdate: false
      }
      this.formDynamic = {
        items: []
      }

      this.politicalData = [],
      this.hobbyData = [],
      this.relationData = []
    }
  }
}
</script>
