<template>
  <el-dialog
    v-if="taskCategoryDialog"
    v-dialogDrag
    v-loading="loading"
    center
    title="任务类别管理"
    :width="dialogWidth"
    :before-close="close"
    :visible.sync="taskCategoryDialog"
  >
    <el-form
      ref="form"
      v-loading="loading"
      :model="form"
      label-position="right"
      class="overflow pl15 pr15"
    >
      <el-row
        v-for="(item, index) in taskCategoryList"
        :key="index"
        type="flex"
        justify="center"
        class="mt20 mb10"
        style="border: 1px dashed #cfcfcf;"
      >
        <el-col :span="22" class="pt20 form-inp">
          <el-row type="flex" justify="center">
            <el-col :span="24" class="mb15 form-inp">
              <el-form-item
                label="任务类别："
                prop="name"
                :label-width="labelWidth"
              >
                <el-input
                  v-model.trim="item.name"
                  class="small-inp"
                  autocomplete="off"
                  placeholder="请输入任务类别"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col
          :span="2"
          class="form-inp relative"
          style="border-left: 1px dashed #cfcfcf;"
        >
          <i
            aria-hidden="true"
            class="fa fa-trash-o fa-2x absolute x-y-center pointer"
            @click="hendleDelete(index, item.id)"
          />
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="24" class="mt15 form-inp">
          <el-form-item>
            <el-button
              class="theme-btn"
              @click="handleAddTaskCategory"
            >新增任务类别</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer align-center tiling inline-block">
      <el-button @click="close">取 消</el-button>
      <el-button
        class="theme-btn"
        @click="handleSetTaskCategory"
      >保存</el-button>
    </span>
  </el-dialog>
</template>

<script>
import '@/utils/drag.js'
import {
  setTaskCategory,
  getAllTaskCategory,
  deleteTaskCategory
} from '@/api/engineering'
import { getAllDept } from '@/api/user'

export default {
  name: 'TaskCategoryDialog',
  props: ['taskCategoryDialog', 'loading'],
  data() {
    return {
      form: {},
      deptList: [],
      labelWidth: '110px',
      dialogWidth: '560px',
      taskCategoryList: []
    }
  },
  watch: {
    taskCategoryDialog() {
      this.taskCategoryDialog && this.resetForm()
      this.taskCategoryDialog && this.getTaskCategorys()
    }
  },
  methods: {
    async getTaskCategorys() {
      const { data } = await getAllTaskCategory({
        type: 1,
        gridId: sessionStorage.getItem('gridId')
      })

      // rows.forEach(item => {
      //   let arr = item.departmentIds.split(",");
      //   item.departmentIds = arr.map(item => +item);
      // });
      this.taskCategoryList = data
    },

    emptyJudge(arr) {
      let isEmpty = false

      arr.forEach(item => {
        if (!item.name || !item.departmentIds.length) {
          isEmpty = true
        }
      })
      return isEmpty
    },
    maxJudge(arr) {
      let isMax = false

      arr.forEach(item => {
        if (item.name.length > 30) {
          isMax = true
        }
      })
      return isMax
    },
    handleSetTaskCategory() {
      const isMax = this.maxJudge(this.taskCategoryList)
      // const isEmpty = this.emptyJudge(this.taskCategoryList);

      // if (isEmpty) {
      //   return this.$notify.error({
      //     title: "错误",
      //     message: "不能为空值！"
      //   });
      // }

      if (isMax) {
        return this.$notify.error({
          title: '错误',
          message: '字符长度超过最大值！'
        })
      }

      const taskCategories = this.taskCategoryList.map(item => {
        if (item.id) {
          return {
            id: item.id,
            name: item.name,
            gridId: item.gridId
          }
        } else {
          return {
            name: item.name,
            gridId: item.gridId
          }
        }
      })

      const params = {
        taskCategories,
        gridId: sessionStorage.getItem('gridId')
      }

      this.$store.dispatch('loading/setLoading', true)
      setTaskCategory(params).then(res => {
        this.$message({
          type: 'success',
          message: res.msg
        })
        this.$emit('update')
        this.$emit('close')
      })
    },
    handleAddTaskCategory() {
      this.taskCategoryList.push({
        name: '',
        departmentIds: [],
        gridId: sessionStorage.getItem('gridId')
      })
    },
    close() {
      this.$emit('close')
    },
    hendleDelete(i, id = 0) {
      id &&
        deleteTaskCategory({ taskCategoryId: id }).then(res => {
          this.$message({
            type: 'success',
            message: res.msg
          })
        })
      this.taskCategoryList.splice(i, 1)
    },
    resetForm() {
      this.taskCategoryList = []
    }
  }
}
</script>

<style scoped></style>
