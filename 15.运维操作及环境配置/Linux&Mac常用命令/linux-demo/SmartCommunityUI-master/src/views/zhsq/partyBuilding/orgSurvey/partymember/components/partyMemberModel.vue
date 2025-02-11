<template>
  <div>
    <party-modal
      :title="title"
      :is-show-confirm-btn="false"
      :modal-show="modalShow"
      @close="closeModel"
    >
      <div class="formWrap clearfix">
        <div class="leftNav">
          <ul>
            <li :class="{'active': activeNav === 0}" @click="activeNav = 0">基本信息</li>
            <li v-if="type === 'info'" :class="{'active': activeNav === 1}" @click="activeNav = 1">党员表彰</li>
            <li v-if="type === 'info'" :class="{'active': activeNav === 2}" @click="activeNav = 2">党费缴纳</li>
            <li v-if="type === 'info'" :class="{'active': activeNav === 3}" @click="activeNav = 3">党员履历</li>
          </ul>
        </div>
        <div class="rightContent">
          <div v-if="activeNav === 0">
            <basic-info
              :type="type"
              :data="editdata"
              :category-name="categoryName"
              :category-id="categoryId"
              :committees="committees"
              :modal-show="baseInfoShow"
              @add="addMember"
              @close="closeModel"
            />
          </div>
          <div v-if="activeNav === 1">
            <commend :id="editdata.id" />
          </div>
          <div v-if="activeNav === 2">
            <partydues :id="editdata.id" />
          </div>
          <div v-if="activeNav === 3">
            <party-record :data="editdata" />
          </div>
        </div>
      </div>
    </party-modal>
  </div>
</template>

<script>
import PartyModal from '@/components/partyModal/index'
import BasicInfo from './basicInfo'
import Commend from './commend'
import Partydues from './partydues'
import PartyRecord from './partyRecord'

export default {
  name: 'PartyMemberModel',
  components: {
    PartyRecord,
    Partydues,
    Commend,
    BasicInfo,
    PartyModal
  },
  props: {
  //  弹窗标题
    title: {
      type: String,
      default: ''
    },
    //  弹窗显示条件
    modalShow: {
      type: Boolean,
      default: false
    },
    //  弹窗类型-----add新增，-----edit编辑, ----info查看
    type: {
      type: String,
      default: ''
    },
    //  党员类型名称
    categoryName: {
      type: String,
      default: '支部党员'
    },
    //  党员类型id 默认支部党员2
    categoryId: {
      type: Number,
      default: -1
    },
    // 党委列表
    committees: {
      type: Array,
      default: () => []
    },
    // 查看编辑对象
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      // 活动菜单
      activeNav: 0,
      baseInfoShow: false,
      // 基本信息编辑对象
      editdata: {}
    }
  },
  watch: {
    modalShow: function(newVaule, oldValue) {
      if (newVaule) {
        this.formData = {}
        this.activeNav = 0
        this.editdata = this.data
        this.baseInfoShow = newVaule
      }
    }
  },
  methods: {
  // 关闭
    closeModel() {
      this.baseInfoShow = null
      this.$emit('close')
    },
    // 添加支部党员
    addMember() {
      this.baseInfoShow = null
      this.$emit('confirmClick')
    }
  }
}
</script>

<style scoped lang="less">
    .formWrap{
        width: 820px;
        padding: 20px 10px;
        .leftNav{
            float: left;
            height: 400px;
            li{
                line-height: 40px;
                font-size: 14px;
                text-align: center;
                width: 100px;
                color: #404040;
                cursor: pointer;
                list-style: none;
            }
            li.active{
                background: #20a0ff;
                color: #ffffff;
            }
        }
        .rightContent{
            width: 675px;
            float: right;
            margin-left: 20px;
        }
    }
</style>
