<template>
  <el-row class="app-warp">
    <el-col>
      <el-row class="rowone">
        <span>
          <el-button
            v-if="permitIds.includes('management_section_add')"
            class="m10 add"
            size="small"
            @click="handleAddDept"
          >+ 新增</el-button></span>
        <span>
           <span class="tableHeaderOne tableHeaderbox">
          <Search
            size="small"
            class="inputstyle"
            :query-str="queryStr"
            :placeholder="'请输入街道名称（注意只支持街道查询）'"
            @update="handleUpdate"
          />
        </span>
          <!-- <el-button
            v-if="permitIds.includes('management_section_deptType')"
            class="m10 adddep"
            @click="handleAddType"
          >+ 新增部门类型</el-button> -->
        </span>
      </el-row>

      <el-row class="tablebox">
        <el-table
          :header-cell-style="{
            'font-size': '13px',
            'font-weight': 'bold',
            'color':'#000000'
          }"
          :data="tableData"
          style="width: 100%;margin-bottom: 20px;"
          row-key="id"
          :tree-props="{ children: 'children', hasChildren: true }" v-loading="tableLoading"
        >
          <el-table-column prop="id" label="编号" sortable/>
          <el-table-column prop="name" label="名称"/>
          <el-table-column prop="parentName" label="上级名称"/>
          <el-table-column prop="option" label="操作">
            <template slot-scope="scope">
              <el-tooltip content="新增" placement="top" popper-class="atooltip">
                <el-button
                  v-if="
                  scope.row.attribute != 3 &&
                    permitIds.includes('management_section_adds')
                "
                  class="xinzeng"
                  @click="handleAddDept(scope.row)"
                >
                  <!-- 新增 -->
                </el-button>
              </el-tooltip>
              <el-tooltip content="修改" placement="top" popper-class="atooltip">
                <el-button
                  v-if="permitIds.includes('management_section_bianji')"
                  class="bianji"
                  @click="handleEditDept(scope.row)"
                />
              </el-tooltip>
              <el-tooltip content="删除" placement="top" popper-class="atooltip">
                <el-button
                  v-if="permitIds.includes('management_section_delete')"
                  class="shanchu"
                  @click="deleteDept(scope.row)"
                />
              </el-tooltip>

            </template>
          </el-table-column>
          <div slot="empty" class="sqt">
            <!-- 暂无数据图-->
            <p><img src="../../../assets/imgs/qsy.png"></p>
          </div>
        </el-table>

        <Pagination
          class="numsize"
          :page-total="pageTotal"
          @paginationChange="handleUpdate"
        />
      </el-row>

    </el-col>
    <Dialog
      :dialog-visible="dept"
      :has-foot="true"
      :title="addDept ? '新增' : '编辑'"
      @close="handleClose"
      @confirm="handleAddOrEdit"
      dialog-width="560px"
      class="editDialog"
    >
      <el-row type="flex" justify="center">
        <el-col :span="20">
          <el-form ref="form" :model="form" :rules="rules" label-width="80px">
            <el-form-item label="部门名称" prop="name" :width="200">
              <el-input v-model="form.name"/>
            </el-form-item>
            <el-form-item label="所属上级">
              {{ addDept ? parentName : form.parentName }}
            </el-form-item>
            <!--            <el-form-item label="部门主管">-->
            <!--              <el-input v-model="form.supervisor" type="number" />-->
            <!--            </el-form-item>-->
            <el-form-item prop="attribute" label="部门属性">
              <el-radio-group v-model="form.attribute" :disabled="editDept">
                <el-radio
                  v-if="!form.street"
                  :label="3"
                  :value="3"
                >部门
                </el-radio>
                <el-radio
                  v-if="form.parentAttribute == 1 "
                  :label="2"
                  :value="2"
                >社区
                </el-radio>
                <el-radio
                  v-if="form.street"
                  :label="1"
                  :value="1"
                >街道
                </el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="部门类别" prop="type">
              <el-select v-model="form.type" clearable width="354px">
                <el-option
                  v-for="(item, i)  in deptList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
            <!--            <el-form-item label="部门层级" prop="level">-->
            <!--              <el-input v-model="form.level" type="number" />-->
            <!--            </el-form-item>-->
            <el-form-item label="地址" prop="address">
              <el-input v-model="form.address"/>
            </el-form-item>
            <el-form-item label="简介">
              <el-input v-model="form.introduction" type="textarea"/>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </Dialog>
    <AddType
      :add-type="addType"
      @close="handleClose"
      @confirm="addTypeConfirm"
    />
  </el-row>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Search from '@/components/Search'
  import Dialog from '@/components/DialogUI'
  import {requiredRules} from '@/utils/rules'
  import AddType from './components/dialog'
  // \src\api\system.js
  import {
    addDepartment,
    addDepartmentType,
    getDepartmentTypeList,
    getDepartmentTypeTree,
    loadGridDeptTreeByPage,
    deleteDepartment,
    modifyDepartment
  } from '@/api/zhsq/system'
  import Pagination from '@/components/Pagination'

  export default {
    data() {
      return {
        tableData: [],
        deptList: [],
        addDept: false,
        editDept: false,
        addType: false,
        parentName: '',
        form: {
          name: '',
          parentId: 0,
          supervisor: '',
          type: '',
          level: '',
          address: '',
          introduction: '',
          street: false,
          attribute: ''
        },
        pageTotal: 0,
        tableLoading: false,
      }
    },
    computed: {
      ...mapGetters(['queryStr', 'pageNum', 'pageSize', 'permitIds']),
      rules() {
        const {name, type, level, address} = requiredRules
        const params = {name, type, level, address}
        params.attribute = {
          required: true,
          message: '请选择部门属性',
          trigger: 'blur'
        }
        return params
      },
      dept() {
        return this.addDept || this.editDept
      }
    },
    created() {
      this.handleGetDeptList()
      this.handleGetTree()
    },
    methods: {
      handleUpdate() {
        this.handleGetTree()
      },
      async handleGetTree() {
        this.tableLoading = true;
        const {data} = await loadGridDeptTreeByPage({
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          name: this.queryStr,
          attribute: 1
        })
        this.tableLoading = false;
        if (data && data.records) {
          this.tableData = data.records
          this.pageTotal = data.total
        }

      },
      handleAddDept(row) {
        if (row.name) {
          this.parentName = row.name
          this.form.parentId = row.id
          this.form.parentAttribute = row.attribute
        } else {
          this.parentName = row.name
          this.form.parentAttribute = row.attribute
          this.form.parentId = 0
          this.parentName = '顶级'
          // this.form.arrtibute = 1
          this.form.street = true
        }
        this.addDept = true
      },
      handleEditDept(row) {
        this.editDept = true
        this.form = {...row, street: row.attribute == 1}
      },
      handleAddType() {
        this.addType = true
      },
      handleClose() {
        this.addDept = false
        this.addType = false
        this.editDept = false
        this.handleGetTree()
        this.reForm()
      },
      handleAddOrEdit() {
        this.addDept ? this.addDeptM() : this.editDeptM()
      },
      addDeptM() {
        this.$refs['form'].validate(async v => {
          if (v) {
            const {
              name,
              parentId,
              supervisor,
              type,
              level,
              address,
              introduction,
              attribute
            } = this.form
            const O = await addDepartment({
              name,
              parentId,
              supervisor,
              type,
              level,
              address,
              introduction,
              attribute
            })
            if (O && O.code == 200) {
              this.$notify({
                title: O.msg,
                type: 'success'
              })
            } else {
              this.$notify({
                title: O.msg,
                type: 'fail'
              })
            }
            this.handleClose()
          }
        })
      },
      async addTypeConfirm(name) {
        const O = await addDepartmentType({
          name
        })
        if (O && O.code == 200) {
          this.$notify({
            title: '新增成功',
            type: 'success'
          })
        } else {
          this.$notify({
            title: '新增失败',
            type: 'fail'
          })
        }
        this.handleClose()
        this.handleGetDeptList()
      },
      async handleGetDeptList() {
        const {data} = await getDepartmentTypeList()
        this.deptList = data
      },
      editDeptM() {
        this.$refs['form'].validate(async v => {
          const {
            id,
            name,
            parentId,
            supervisor,
            type,
            level,
            address,
            introduction
          } = this.form
          const O = await modifyDepartment({
            id,
            name,
            parentId,
            supervisor,
            type,
            level,
            address,
            introduction
          })
          if (O && O.code == 200) {
            this.$notify({
              title: '修改成功',
              type: 'success'
            })
          } else {
            this.$notify({
              title: '修改失败',
              type: 'fail'
            })
          }
          this.handleClose()
        })
      },
      deleteDept(deptId) {
        if (deptId.child && deptId.child.length) {
          this.$confirm('此部门下仍有子级部门，不可删除', {type: 'warning'})
            .then(async _ => {
              // const O = await deleteDepartment({ deptId:deptId.id })
              // if (O && O.code == 200) {
              //   this.$notify({
              //     title: '删除成功',
              //     type: 'success'
              //   })
              // } else {
              //   this.$notify({
              //     title: '失败',
              //     type: 'fail'
              //   })
              // }
              this.handleClose()
            })
            .catch(e => {
            })
        } else {
          this.$confirm('请确认删除', {
            type: 'warning',
            cancelButtonText: '取消',
            confirmButtonText: '删除',
          })
            .then(async _ => {
              const O = await deleteDepartment({deptId: deptId.id})
              if (O && O.code == 200) {
                this.$notify({
                  title: '删除成功',
                  type: 'success'
                })
              } else {
                this.$notify({
                  title: '失败',
                  type: 'fail'
                })
              }
              this.handleClose()
            })
            .catch(e => {
            })
        }
      },
      reForm() {
        this.form = {
          name: '',
          parentId: 0,
          supervisor: '',
          type: '',
          level: '',
          address: '',
          introduction: ''
        }
      }
    },
    components: {
      Search,
      Dialog,
      AddType,
      Pagination
    }
  }
</script>

<style lang="scss" scoped>
  .adddep {
    width: 138px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #FFFFFF;
    background: #3083f2;
    border-radius: 16px;
  }

  .add {
    width: 100px;
    font-size: 12px;
    background: #3083f2;
    border-radius: 4px;
    display: flex;
    color: #FFFFFF;
    justify-content: center;
    align-items: center;
  }

  .rowone {
    display: flex;
    margin-top: 24px;
    margin-left: 32px;
    margin-bottom: 10px;
  }

  .tablebox {
    margin: 20px 40px 0 40px;
    border-top: 2px solid #e8e8ea;
  }

  .numsize {
    margin-top: 15px;
    margin-bottom: 13px;
  }

  .el-select, .el-input {
    width: 354px !important;
  }

  .editDialog .el-dialog {
    .el-input {
      width: 353px;
    }
  }

  .inline-block {
    width: 100%;
  }

  .el-input {
    width: 354px !important;
  }
</style>
