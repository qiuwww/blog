<style lang="less">
  .tZhsqCommunityCadresLook {
    .ivu-form-item {
      margin-bottom: 0px !important;
    }

    .img {
      width: 85px;
      margin-top: 10px;
      border: 1px dashed #ccc;
      padding: 2px;
      display: block;
      height: 93px;
    }

    .noImg {
      width: 80px;
      height: 100px;
      border: 1px dashed rgb(204, 204, 204);
      margin: 10px 0 0 30px;
      line-height: 93px;
      text-align: center;
      color: #ccc;
      user-select: none;
      height: 93px;
    }

    .ivu-form .ivu-form-item-label {
      width: 120px !important;
    }

    .ivu-form-item .ivu-form-item-content .item_span {
      width: 700px;
      margin-top: 6px;
      height: 40px !important;
      line-height: 150%;
      word-break: break-all;
      overflow-x: hidden;
      overflow-y: auto;
      border: 1px solid rgb(222, 222, 222);
    }
    .ivu-tabs-nav-wrap {
      text-align: center !important;
    }

    .ivu-tabs-nav-scroll {
      display: inline-block !important;
    }

    .ivu-tabs-nav {
      padding-left: 0;
      margin: 0;
      float: left;
      list-style: none;
      box-sizing: border-box;
      position: relative;
      transition: transform .5s ease-in-out;
      border-radius: 16px;
      box-shadow: 0px 4px 8px 0px #f8f8f9;
      border: 1px solid #f8f8f9;
      background: #f8f8f9;
      /* margin-bottom: 44px; */
    }

    .ivu-tabs-bar {
      border-bottom: 0px solid #dcdee2;
    }

    .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab {
      border: none;
      font-size: 14px;
      font-family: Microsoft YaHei, Microsoft YaHei-Regular;
      font-weight: 400;
      text-align: left;
      color: #676a6c;
      background: #f8f8f900;
    }

    .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab-active {
      background: #3083f2;
      border-radius: 16px;
      box-shadow: 0px 4px 8px 0px rgba(48, 131, 242, 0.3);

      font-size: 14px;
      font-family: Microsoft YaHei, Microsoft YaHei-Bold;
      font-weight: 700;
      text-align: left;
      color: #ffffff;
    }
    .ivu-tabs .ivu-tabs-content-animated {
      margin-top: 10px;
    }

  }
</style>
<template>
  <Modal
    v-model="show"
    :title="editTitle"
    :mask-closable="false"
    width="900"
    height="600"
    class="tZhsqCommunityCadresLook"
  >
    <Tabs type="card">
      <TabPane label="基本信息">
        <Form
          ref="tZhsqCommunityCadresForm"
          :model="tZhsqCommunityCadresForm"
          label-position="right"
          :label-width="90"
        >
          <Divider orientation="left" style="color:#2d8cf0;">基本信息</Divider>
          <Row>
            <Col span="8">
            <Row>
              <FormItem label="姓名" prop="name">
                {{ tZhsqCommunityCadresForm.name }}
              </FormItem>
            </Row>
            <Row>
              <FormItem label="政治面貌" prop="type">
                {{ tZhsqCommunityCadresForm.type }}
              </FormItem>
            </Row>
            <Row>
              <FormItem label="手机号" prop="phone">
                {{ tZhsqCommunityCadresForm.phone }}
              </FormItem>
            </Row>
            </Col>
            <Col span="8">
            <Row>
              <FormItem label="性别" prop="sex">
                {{ tZhsqCommunityCadresForm.sex }}
              </FormItem>
            </Row>
            <Row>
              <FormItem label="民族" prop="nation">
                {{ tZhsqCommunityCadresForm.nation }}
              </FormItem>
            </Row>
            <Row>
              <FormItem label="固定电话" prop="fixedTelephone">
                {{ tZhsqCommunityCadresForm.fixedTelephone }}
              </FormItem>
            </Row>
            </Col>
            <Col span="8">
            <FormItem label="头像">
<!--              <div v-if="tZhsqCommunityCadresForm.headPortrait" v-viewer="{movable: true}">-->
<!--                <img :src="tZhsqCommunityCadresForm.headPortrait" class="img">-->
<!--              </div>-->
<!--              <div v-if="!tZhsqCommunityCadresForm.headPortrait" class="noImg">暂无头像</div>-->
              <div v-viewer="{movable: true}">
                <img v-if="tZhsqCommunityCadresForm.headPortrait" :src="tZhsqCommunityCadresForm.headPortrait" class="img">
                <img v-else src="/img/tx_wzp2.png" class="img">
              </div>
            </FormItem>
            </Col>
          </Row>
          <Row>
            <FormItem label="身份证号" prop="idCard">
              {{ tZhsqCommunityCadresForm.idCard }}
            </FormItem>
          </Row>
          <Row>
            <Col span="24">
            <FormItem label="个人简介" prop="personalProfile">
              <p class="item_span">
                {{ tZhsqCommunityCadresForm.personalProfile }}
              </p>
            </FormItem>
            </Col>
          </Row>
          <Row>
          </Row>
          <Divider orientation="left" style="color:#2d8cf0;">部门&岗位</Divider>
          <Row>
            <Col span="8">
            <FormItem label="所属街道" filterable prop="houseStreet">
              {{ tZhsqCommunityCadresForm.streetName }}
            </FormItem>
            </Col>
            <Col span="8">
            <FormItem label="所属社区" filterable prop="houseCommunity">
              {{ tZhsqCommunityCadresForm.communityName }}
            </FormItem>
            </Col>
            <Col span="8">
            <FormItem label="所属部门" prop="department">
              {{ tZhsqCommunityCadresForm.department }}
            </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="8">
            <FormItem label="所属岗位" prop="post">
              {{ tZhsqCommunityCadresForm.post }}
            </FormItem>
            </Col>
            <Col span="8">
            <FormItem label="级别" filterable prop="postLevel">
              {{ tZhsqCommunityCadresForm.postLevel }}
            </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="24">
            <FormItem label="职责范畴" prop="responsibilities" style="width: 100%">
              <p class="item_span">
                {{ tZhsqCommunityCadresForm.responsibilities }}
              </p>
            </FormItem>
            </Col>
          </Row>
        </Form>
      </TabPane>
      <TabPane label="履历信息">
        <Table ref="table" stripe :columns="columns" sortable="custom" :data="data" />
      </TabPane>
    </Tabs>
    <div slot="footer">
      <Button type="text" @click="show=false">取消</Button>
    </div>
  </Modal>
</template>
<script>
import {
  getTZhsqCommunityCadres,
  queryBasicResumeListByPersonId
} from '@/api/zhsq/tZhsqCommunityCadres/tZhsqCommunityCadres'
import { getDictDataByType } from '@/api/index'
import { formartDate, nginxUrl } from '@/api/tools/tool'
import {
  levelData,
  politicalData,
  postData,
  departmentData,
  sexData,
  nationData,
  streetData,
  communityData
} from '@/api/tools/zhsqSelectData'
import { getCommunity, getDictionary, getStreet, getPostData, getDepartmentData } from '../../../api'

export default {
  name: 'UpdateTZhsqCommunityCadres',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    TZhsqCommunityCadresId: {
      type: String
    },
    modalTitle: {
      type: String
    }
  },
  data() {
    return {
      left: 'left',
      show: this.value,
      editTitle: this.modalTitle,
      loading: false,
      tZhsqCommunityCadresForm: {
        name: '',
        sex: '',
        type: '',
        nation: '',
        idCard: '',
        phone: '',
        fixedTelephone: '',
        personalProfile: '',
        headPortrait: '',
        streetName: '',
        communityName: '',
        department: '',
        post: '',
        postLevel: '',
        responsibilities: '',
        imageIsUpdate: false
      },
      // 性别下拉数据
      sexArr: [],
      // 民族下拉数据
      nationArr: [],
      // 部门下拉数据
      departmentArr: [],
      // 政治面貌下拉数据
      politicalArr: [],
      // 岗位下拉数据
      postArr: [],
      // 级别下拉数据
      levelArr: [],
      // 预览图片
      imageIsUpdate: false,
      imageUrlList: [],

      data: [],
      columns: this.getBasicResumeColumns()
    }
  },
  watch: {
    value(val) {
      this.show = val
    },
    show(val) {
      this.loading = false
      this.editTitle = this.modalTitle
      if (val) {
        this.initForm()
        this.getSelectData()
        this.$refs['tZhsqCommunityCadresForm'].resetFields()
        if (this.TZhsqCommunityCadresId != null && this.TZhsqCommunityCadresId.trim().length > 0) {
          queryBasicResumeListByPersonId({ personId: this.TZhsqCommunityCadresId }).then(res => {
            if (res && res.success) {
              this.data = res.data
            }
          })

          getTZhsqCommunityCadres({ id: this.TZhsqCommunityCadresId }).then(res => {
            if (res && res.code == 200) {
              this.tZhsqCommunityCadresForm.name = res.data.name
              this.tZhsqCommunityCadresForm.sex = res.data.sex

              let filter = this.politicalArr.filter(item => item.number == res.data.type)
              if (filter && filter.length > 0) {
                this.tZhsqCommunityCadresForm.type = filter[0].name
              }

              filter = this.nationArr.filter(item => item.number == res.data.nation)
              if (filter && filter.length > 0) {
                this.tZhsqCommunityCadresForm.nation = filter[0].name
              }

              this.tZhsqCommunityCadresForm.idCard = res.data.idCard
              this.tZhsqCommunityCadresForm.phone = res.data.phone
              this.tZhsqCommunityCadresForm.fixedTelephone = res.data.fixedTelephone
              this.tZhsqCommunityCadresForm.personalProfile = res.data.personalProfile
              this.tZhsqCommunityCadresForm.headPortrait = res.data.headPortrait
              this.tZhsqCommunityCadresForm.streetName = res.data.streetName
              this.tZhsqCommunityCadresForm.communityName = res.data.communityName

              filter = this.departmentArr.filter(item => item.id == res.data.department)
              if (filter && filter.length > 0) {
                this.tZhsqCommunityCadresForm.department = filter[0].name
              }

              filter = this.postArr.filter(item => item.id == res.data.post)
              if (filter && filter.length > 0) {
                this.tZhsqCommunityCadresForm.post = filter[0].name
              }

              filter = this.levelArr.filter(item => item.number == res.data.postLevel)
              if (filter && filter.length > 0) {
                this.tZhsqCommunityCadresForm.postLevel = filter[0].name
              }

              this.tZhsqCommunityCadresForm.responsibilities = res.data.responsibilities
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
      this.tZhsqCommunityCadresForm = {
        name: '',
        sex: '',
        type: '',
        nation: '',
        idCard: '',
        phone: '',
        fixedTelephone: '',
        personalProfile: '',
        headPortrait: '',
        streetName: '',
        communityName: '',
        department: '',
        post: '',
        postLevel: '',
        responsibilities: ''
      }
    },
    // 获取下拉数据
    getSelectData() {
      // 民族下拉数据
      getDictionary({ fieldName: 'nationData' }).then(res => {
        if (res && res.success) {
          this.nationArr = res.data
        }
      })

      // 政治面貌下拉数据
      getDictionary({ fieldName: 'politicalData' }).then(res => {
        if (res && res.success) {
          this.politicalArr = res.data
        }
      })

      // 部门下拉数据
      getDepartmentData({ type: 3, parentId: null }).then(res => {
        if (res && res.success) {
          this.departmentArr = res.data
        }
      })

      // 岗位下拉数据
      getPostData({}).then(res => {
        if (res && res.success) {
          this.postArr = res.data
        }
      })
      // 级别下拉数据
      getDictionary({ fieldName: 'levelData' }).then(res => {
        if (res && res.success) {
          this.levelArr = res.data
        }
      })
    },

    // 获取列表字段
    getBasicResumeColumns() {
      return [
        {
          title: '社区干部姓名',
          align: 'center',
          key: 'personName',
          tooltip: true,
          ellipse: true,
          sortable: false
        },
        {
          title: '任职开始时间',
          key: 'startTime',
          sortable: false,
          align: 'center',
          tooltip: true,
          ellipse: true,
          width: 180
        },
        {
          title: '任职结束时间',
          key: 'endTime',
          sortable: false,
          align: 'center',
          tooltip: true,
          ellipse: true,
          width: 180
        },
        {
          title: '所在部门',
          align: 'center',
          key: 'department',
          sortable: false,
          render: (h, params) => {
            const filter = this.departmentArr.filter(item => item.id == params.row.department)
            if (filter && filter.length > 0) {
              return h('Tooltip', {
                props: {
                  content: filter[0].name,
                  placement: 'bottom',
                  transfer: true
                }
              }, filter[0].name)
            }
          }
        },
        {
          title: '所在岗位',
          align: 'center',
          key: 'post',
          sortable: false,
          render: (h, params) => {
            const filter = this.postArr.filter(item => item.id == params.row.post)
            if (filter && filter.length > 0) {
              return h('Tooltip', {
                props: {
                  content: filter[0].name,
                  placement: 'bottom',
                  transfer: true
                }
              }, filter[0].name)
            }
          }
        }
      ]
    }
  }
}
</script>
