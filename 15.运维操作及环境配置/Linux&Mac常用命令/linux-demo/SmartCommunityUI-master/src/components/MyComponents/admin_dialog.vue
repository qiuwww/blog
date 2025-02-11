<template>
  <el-dialog
    v-if="addDialog"
    v-dialogDrag
    v-loading="loading"
    center
    title="新增物业账号"
    :width="dialogWidth"
    :before-close="close"
    :visible.sync="addDialog"
    :show-close="isAdmin && !isInitial"
    :close-on-click-modal="isAdmin && !isInitial"
  >
    <el-form
      v-if="addDialog"
      ref="form"
      :model="form"
      :rules="rules"
      label-position="right"
      class="mt20 overflow pl15 pr15"
    >
      <el-row v-if="isUpdate" type="flex" justify="space-around" class="mb05">
        <el-col :span="24" class="form-inp">
          <el-form-item
            class="required"
            prop="adminPhone"
            label="管理员手机号："
            :label-width="labelWidth"
          >
            <el-input
              v-model.trim="form.adminPhone"
              autocomplete="off"
              placeholder="请输入管理员手机号"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24" class="form-inp" />
      </el-row>
      <el-row type="flex" justify="space-around" class="mb05">
        <el-col :span="24" class="form-inp">
          <el-form-item
            class="required"
            label="楼盘名称："
            prop="propertyName"
            :label-width="labelWidth"
          >
            <el-input
              v-model.trim="form.propertyName"
              autocomplete="off"
              placeholder="请输入楼盘名称"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="space-around" class="mb05">
        <el-col :span="24" class="form-inp">
          <el-form-item
            label="产权性质："
            prop="propertyType"
            :label-width="labelWidth"
          >
            <el-select
              v-model="form.propertyType"
              class="small-select"
              placeholder="产权性质"
            >
              <el-option
                v-for="(item, i)  in propertyTypeList"
                :key="item.number"
                :label="item.name"
                :value="item.number"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="space-around" class="mb05">
        <el-col :span="24" class="form-inp">
          <el-form-item
            label="建筑年代："
            prop="buildYear"
            :label-width="labelWidth"
          >
            <el-date-picker
              v-model="form.buildYear"
              type="year"
              value-format="yyyy"
              placeholder="选择年"
              :picker-options="disabledNewAfterDate"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="space-around" class="mb05">
        <el-col :span="24" class="form-inp">
          <el-form-item
            label="楼盘地址："
            prop="address"
            :label-width="labelWidth"
          >
            <AddressCascader @getRegion="handleGetRegion" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="space-around" class="mb05">
        <!-- <el-col :span="24" class="form-inp">
          <el-form-item
            label="物业公司："
            class="required"
            :label-width="labelWidth"
            prop="propertyCompanyName"
          >
            <el-input
              v-model.trim="form.propertyCompanyName"
              autocomplete="off"
              placeholder="请输入物业公司"
            ></el-input>
          </el-form-item>
        </el-col> -->
        <el-col :span="24" class="form-inp">
          <!-- <el-form-item
            label="负责人："
            prop="realName"
            :label-width="labelWidth"
            class="required"
          >
            <el-input
              v-model.trim="form.realName"
              autocomplete="off"
              placeholder="请输入负责人"
            ></el-input>
          </el-form-item> -->
        </el-col>
      </el-row>
      <el-row type="flex" justify="space-around" class="mb05">
        <el-col :span="24" class="form-inp">
          <el-form-item
            label="联系电话："
            prop="phone"
            :label-width="labelWidth"
            class="required"
          >
            <el-input
              v-model.trim="form.phone"
              type="number"
              autocomplete="off"
              class="block mb10"
              placeholder="请输入联系电话"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24" class="form-inp">
          <!-- <el-form-item
            label="设置账号："
            prop="userName"
            class="required"
            :label-width="labelWidth"
          >
            <el-input
              class="block mb10"
              autocomplete="off"
              placeholder="请输入设置账号"
              v-model.trim="form.userName"
            ></el-input>
          </el-form-item> -->
        </el-col>
      </el-row>
      <el-row type="flex" justify="space-around" class="mb05">
        <el-col :span="24" class="form-inp">
          <el-form-item
            class="required"
            label="健康商城账号："
            prop="shoppingAccount"
            :label-width="labelWidth"
          >
            <el-input
              v-model.trim="form.shoppingAccount"
              autocomplete="off"
              class="block mb10"
              placeholder="请输入健康商城账号"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24" class="form-inp" />
      </el-row>
    </el-form>
    <span
      v-if="addDialog"
      slot="footer"
      class="dialog-footer align-center tiling inline-block"
    >
      <el-button v-if="isAdmin && !isInitial" @click="close">取 消</el-button>
      <el-button v-loading="loading" class="theme-btn" @click="handleAddAdmin">提 交</el-button>
    </span>
  </el-dialog>
</template>

<script>
import '@/utils/drag.js'
import { mapGetters } from 'vuex'
import { addAdmin } from '@/api/admin'
import AddressCascader from '@/components/Mycomponents/address_cascader'
import { disabledNewAfterDate } from '@/utils/picker_options'
import { vPhone, vName, vNumberOrLetter } from '@/utils/verification.js'

export default {
  name: 'AdminDialog',
  data() {
    return {
      form: {
        phone: '',
        address: '',
        userName: '',
        realName: '',
        adminPhone: '',
        buildYear: '',
        propertyType: '',
        propertyName: '',
        propertyCompanyName: ''
      },
      labelWidth: '130px',
      dialogWidth: '500px',
      disabledNewAfterDate,
      userDocumentTypeList: [],
      rules: {
        phone: {
          validator: vPhone,
          trigger: 'blur'
        },
        adminPhone: {
          validator: vPhone,
          trigger: 'blur'
        },
        // userName: {
        //   validator: vNumberOrLetter(1, 20, "请输入设置账号"),
        //   trigger: "blur"
        // },
        shoppingAccount: {
          validator: vNumberOrLetter(1, 20, '请输入健康商城账号'),
          trigger: 'blur'
        },
        // realName: {
        //   validator: vName(2, 10, "请输入负责人"),
        //   trigger: "blur"
        // },
        address: {
          required: true,
          message: '请输入楼盘地址',
          trigger: 'blur'
        },
        buildYear: {
          required: true,
          message: '请选择建筑年代',
          trigger: 'blur'
        },
        propertyType: {
          required: true,
          message: '请选择产权性质',
          trigger: 'blur'
        },
        propertyName: {
          validator: vName(2, 10, '请输入楼盘名称'),
          trigger: 'blur'
        },
        propertyCompanyName: {
          validator: vName(2, 10, '请输入物业公司'),
          trigger: 'blur'
        }
      }
    }
  },
  watch: {
    addDialog() {
      this.resetForm()
    }
  },
  computed: {
    ...mapGetters(['isAdmin', 'isInitial'])
  },
  methods: {
    handleAddAdmin() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          const params = {
            // userId:+sessionStorage.getItem("userId"),
            phone: this.form.phone,
            address: this.form.address,
            userName: this.form.userName,
            realName: this.form.realName,
            buildYear: this.form.buildYear,
            adminPhone: this.form.adminPhone,
            propertyName: this.form.propertyName,
            propertyType: this.form.propertyType,
            shoppingAccount: this.form.shoppingAccount,
            departmentId: this.departmentId,
            propertyCompanyName: this.form.propertyCompanyName
          }

          this.$store.dispatch('load/setLoading', true)
          addAdmin(params).then(res => {
            if (res && res.code === '200') {
              this.$emit('update')
              this.$emit('close')
              this.$notify({
                title: res.msg,
                type: 'success'
              })
              if (this.isAdmin && this.isInitial) {
                this.$router.push({
                  name: 'layout',
                  query: { isInitial: true }
                })
              }
            }
          })
        }
      })
    },
    handleGetRegion(prop) {
      this.form.address = prop
    },
    close() {
      this.$emit('close')
    },
    resetForm() {
      this.form = {
        phone: '',
        address: '',
        userName: '',
        realName: '',
        adminPhone: '',
        buildYear: '',
        propertyType: '',
        propertyName: '',
        propertyCompanyName: ''
      }
    }
  },
  components: {
    AddressCascader
  },
  props: ['addDialog', 'propertyTypeList', 'isUpdate', 'loading', 'departmentId']
}
</script>

<style scoped></style>
