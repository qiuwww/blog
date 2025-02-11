<template>
  <div class=" taskType">
    <el-row type="flex" class="app-warp pb10 ">
      <!-- <el-col :span="4">
            <Ascription :vOrh="true" @push='handleGetGrid' />
      </el-col> -->
      <!-- <el-col :span="24">
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
          >
            <el-col :span="22" class="pt20 form-inp">
              <el-row type="flex" justify="center">
                <el-col :span="16" class="mb15 form-inp">
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
              <el-button
                size="mini"
                class="theme-btn m10 mt20"
                @click="hendleDelete(index, item.id)"
              >
                删 除
              </el-button>
              <el-button
                size="mini"
                class="theme-btn m10"
                @click="handleSetTaskCategory"
                >保 存</el-button
              >
            </el-col>
          </el-row>
          <el-row type="flex" justify="center">
            <el-col :span="24" class="mt15 form-inp">
              <el-form-item>
                <el-button class="theme-btn" @click="handleAddTaskCategory"
                  >新增任务类别
                </el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span class="dialog-footer align-center tiling inline-block" />
      </el-col> -->

      <el-col :span="18">
        <el-row type="flex" justify="center" class="addbtn">
          <el-col :span="24" class="mt15 form-inp">
            <el-button
              class="theme-btn reset"
              size="small"
              @click="handleAdd"
            >+ 新增任务类别
            </el-button>
          </el-col>
        </el-row>

        <el-row class="tablebox" style="width: 120%">
          <el-table
            :header-cell-style="{
            'font-size': '13px',
            'font-weight': 'bold',
            'color':'#000000'

          }"
            stripe
            :data="taskCategoryList" v-loading="tableLoading"
          >
            <el-table-column prop="id" label="编号"/>
            <el-table-column prop="name" label="类别名称"/>
            <el-table-column prop="createUserName" label="设置人"/>
            <el-table-column prop="操作" label="操作">
              <template slot-scope="scope">
                <el-tooltip content="删除" placement="top" popper-class="atooltip">
                  <el-button class="shanchu" @click="hendleDelete(scope.row)"/>
                </el-tooltip>
              </template>
            </el-table-column>
            <div slot="empty" class="sqt">
              <p><img src="../../../../../assets/imgs/qsy.png"></p>
            </div>
          </el-table>
        </el-row>

      </el-col>

      <el-dialog
        v-loading='loading'
        title="类型名称"
        :visible.sync="add"
        width="30%"
        :before-close="handleClose"
      >
        <!-- <span class="label"> 类型名称 </span> -->
        <el-input v-model="newName" placeholder="请输入新的类型名称"/>
        <span slot="footer" class="dialog-footer btnboxstyle">

			  <el-button @click="handleClose" class="backtobtn">取 消</el-button>
			  <el-button
          type="primary"
          class="surebtn"
          @click="handleSetTaskCategory"
        >确 定</el-button>
      </span>
      </el-dialog>
    </el-row>
  </div>
</template>

<script>
  import '@/utils/drag.js'
  import {mapGetters} from 'vuex'
  import {
    setTaskCategory,
    getAllTaskCategory,
    deleteTaskCategory
  } from '@/api/engineering'
  import {getAllDept} from '@/api/user'
  import Ascription from '@/components/Ascription'

  export default {
    name: 'TaskCategoryDialog',
    data() {
      return {
        gridId: '',
        form: {},
        deptList: [],
        newName: '',
        labelWidth: '110px',
        dialogWidth: '560px',
        taskCategoryList: [],
        add: false,
        tableLoading:false,
      }
    },

    created() {
      this.resetForm()
      this.getTaskCategorys()
    },
    computed: {
      ...mapGetters(['loading'])
    },
    components: {
      Ascription
    },

    methods: {
      async getTaskCategorys() {
        this.tableLoading = true;
        const {data} = await getAllTaskCategory({
          type: 1,
          gridId: ''
        })

        // rows.forEach(item => {
        //   let arr = item.departmentIds.split(",");
        //   item.departmentIds = arr.map(item => +item);
        // });
        this.tableLoading = false;
        this.taskCategoryList = data
      },
      handleGetGrid(val) {
        this.gridId = val
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
        const newNameLength = this.newName.length
        if (newNameLength > 30) {
          this.$notify({
            title: '字符超过最大限度！',
            type: 'warning'
          })
        } else if (!newNameLength) {
          this.$notify({
            title: '请输入类型名称',
            type: 'warning'
          })
        } else {
          const taskCategories = this.taskCategoryList.map(item => {
            if (item.id) {
              return {
                id: item.id,
                name: item.name
                // gridId: item.gridId
              }
            } else {
              return {
                name: item.name
                // gridId: item.gridId
              }
            }
          })
          taskCategories.push({
            name: this.newName
          })
          const params = {
            taskCategories,
            createUser: sessionStorage.getItem('userId')
            // gridId: this.gridId
          }

          this.$store.dispatch('loading/setLoading', true)
          this.add = false
          setTaskCategory(params).then(res => {
            this.$message({
              type: 'success',
              message: res.msg
            })
            this.handleClose()
            this.handleUpdate()
          })
        }
      },
      handleUpdate() {
        this.getTaskCategorys()
      },
      handleAdd() {
        this.add = true
      },
      handleClose() {
        this.add = false
        this.newName = ''
      },
      handleAddTaskCategory() {
        this.taskCategoryList.push({
          name: '',
          departmentIds: [],
          gridId: this.gridId
        })
      },
      close() {
        this.$emit('close')
      },
      hendleDelete(row) {
        this.$confirm(`确认删除名为【${row.name}】的任务类型吗 ？`, {
          type: 'warning',
          cancelButtonText: '取消',
          confirmButtonText: '删除',
        })
          .then(_ => {
            deleteTaskCategory({taskCategoryId: row.id}).then(res => {
              this.$message({
                type: 'success',
                message: res.msg
              })
              this.handleUpdate()
            })
          })
          .catch(e => {
          })
      },
      resetForm() {
        this.taskCategoryList = []
      }
    }
  }
</script>

<style lang="scss" scoped>
  .taskType {


    .reset {
      width: 172px;
      font-size: 12px;
      color: #FFFFFF;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 20px;
      background: #3083f2;
      letter-spacing: 2px
    }

    .addbtn {
      /*margin-left: 40px;*/
      margin-top: 32px;
      margin-bottom: 20px;
    }

    .tablebox {
      margin-left: 20px;
      margin-right: 20%;
      border-top: 2px solid #e8e8ea;
      margin-bottom: 24px;
    }

    /* .tablebox ::v-deep .cell{
      font-size: 14px;
      font-weight: bold;
      color: #000000;
    } */
    .backtobtn {
      width: 80px;
      height: 32px;
      background: #ffffff;
      border: 1px solid #cccccc;
      border-radius: 16px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .surebtn {
      width: 120px;
      height: 32px;
      background: #3083F2;
      line-height: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 16px;
    }

    .dialog-footer {
      display: flex;
      justify-content: center;
      align-items: flex-end
    }

    .btnboxstyle {
      margin-left: 260px;
    }
  }
</style>
