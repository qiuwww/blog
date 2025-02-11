<template>
  <el-row class="app-warp">
    <el-col v-loading="loading">
      <el-row class="rowone">
        <div>
          <el-button
            v-if="permitIds.includes('management_station_add')"
            class="m10 addbtn"
            @click="handleAdd"
            >+新增</el-button
          >
        </div>
        <div class="m10">
          <span class="label"> 所属网格:</span>
          <Grid @grid="handleGridId" />
        </div>
        <div class="m10">
          <span class="label"> 所属小区： </span>
          <el-select
            v-model="indexPropertyId"
            :clearable="true"
            @change="handleUpdate"
          >
            <el-option
              v-for="(item, i)  in indexPropertyList"
              :key="item.number"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>
        <div class="m10">
          <span class="label"> 设备状态： </span>

          <el-select v-model="status" @change="handleUpdate" :clearable="true">
            <el-option :label="'启用'" :value="0"> </el-option>
            <el-option :label="'停用'" :value="1"> </el-option>
          </el-select>
        </div>
        <div>
          <Search
            :placeholder="'请输入设备名称、编号等'"
            @update="handleUpdate"
          />
        </div>
      </el-row>
      <el-row class="tablebox">
        <el-table
          :header-cell-style="{
            'font-size': '13px',
            'font-weight': 'bold',
            color: '#000000',
          }"
          :data="tableData"
          style="width: 100%; margin-bottom: 20px"
          stripe
          default-expand-all v-loading="tableLoading"
        >
          <el-table-column prop="propertyName" label="所属小区" sortable />
          <el-table-column prop="code" label="设备编号" sortable />
          <el-table-column prop="name" label="停车道闸名称" />
          <el-table-column prop="status" label="设备状态">
            <template slot-scope="scope">
              <i
                :style="{
                  color: scope.row.status ? '#F3538A' : '#11B3B9',
                  'font-style': 'normal',
                }"
              >
                {{ scope.row.status ? "已停用" : "已启用" }}
              </i>
            </template>
          </el-table-column>

          <el-table-column prop="isPrivate" label="设备位置">
            <template slot-scope="scope">
              {{ scope.row.address ? "已标注" : "未标注" }}
            </template>
          </el-table-column>

          <el-table-column prop="remark" label="描述" /><el-table-column
            prop="gridName"
            label="所属网格"
          />
          <el-table-column prop="option" label="操作">
            <template slot-scope="scope">
              <el-tooltip content="查看详情" placement="top">
                <el-button
                  v-if="permitIds.includes('management_station_xiangqing')"
                  class="chakan"
                  @click="handleDetail(scope.row)"
                />
              </el-tooltip>
              <el-tooltip content="修改" placement="top">
                <el-button
                  v-if="permitIds.includes('management_station_bianji')"
                  class="bianji"
                  @click="handleEditPost(scope.row)"
                />
              </el-tooltip>
              <el-tooltip content="停用设备" placement="top">
                <el-button
                  v-if="
                    scope.row.status != 1 &&
                    permitIds.includes('management_station_tingyong')
                  "
                  class="tinyong"
                  @click="deletePost(scope.row, 1)"
                >
                  <!-- 停用 -->
                </el-button>
              </el-tooltip>

              <el-tooltip content="启用设备" placement="top">
                <el-button
                  v-if="
                    scope.row.status == 1 &&
                    permitIds.includes('management_station_tingyong')
                  "
                  class="qiyong"
                  @click="deletePost(scope.row, 0)"
                >
                  <!-- 启用 -->
                </el-button>
              </el-tooltip>
              <el-tooltip content="删除" placement="top">
                <el-button
                  v-if="permitIds.includes('management_station_tingyong')"
                  class="shanchu"
                  @click="delPostMethods(scope.row.id)"
                >
                </el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </el-row>

      <Pagination
        class="numsize"
       :page-total="pageTotal"
        @paginationChange="handleUpdate"
      />
    </el-col>
    <!--  -->

    <Dialog
      :dialog-visible="dialogVisible"
      :has-foot="hasFoot"
      :title="title"
      @close="handleClose"
      @confirm="handleConfirm"
      v-loading="loading"
    >
      <el-row type="flex" justify="center">
        <el-col :span="14">
          <el-form
            ref="form"
            :model="form"
            :rules="rules"
            label-width="120px"
            :disabled="postDetail"
          >
            <el-form-item prop="code" label="设备编号">
              <el-input v-model="form.code" :maxlength="20" />
            </el-form-item>
            <el-form-item prop="name" label="停车道闸名称">
              <el-input v-model="form.name" :maxlength="20" />
            </el-form-item>

            <el-form-item prop="gridId" label="所属网格">
              <Grid
                class="gridIdSelect"
                @push="handleGetGrid"
                v-if="!postDetail"
                :isMultiple="true"
                :reGridId="reGridId"
              />
              <el-input v-else :value="form.gridName"> </el-input>
            </el-form-item>
            <el-form-item prop="propertyId" label="所属小区">
              <el-select v-if="!postDetail" v-model="form.propertyId">
                <el-option
                  v-for="(item, i)  in propertyList"
                  :key="item.number"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>

              <el-input v-else :value="form.propertyName"> </el-input>
            </el-form-item>
            <el-form-item prop="address" label="设备位置">
              <el-input v-model="form.address" @focus="checkMap" />
            </el-form-item>
            <el-form-item prop="status" label="设备状态">
              <el-radio-group v-model="form.status">
                <el-radio :label="0">启用</el-radio>
                <el-radio :label="1">停用</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item prop="remark" label="描述">
              <el-input
                type="textarea"
                :rows="5"
                v-model="form.remark"
                :maxlength="200"
                :show-word-limit="true"
              />
            </el-form-item>
          </el-form>
        </el-col>
        <plot
          v-model="ShowMap"
          modalTitle="选择坐标点"
          @resultPoint="getLocation"
          divId="updateBasicSocialOrganizationList"
          :objData="locationArr"
          iconPath="/img/archives/shanghu.png"
          :selectType="selectType"
        ></plot>
      </el-row>
    </Dialog>
  </el-row>
</template>

<script>
import { mapGetters } from "vuex";
import plot from "@/views/gismap/components/plot";
import Search from "@/components/Search";
import Pagination from "@/components/Pagination";
import Grid from "@/components/Ascription/gridSelect";
import Dialog from "@/components/DialogUI";
import { requiredRules } from "@/utils/rules";
import {
  addParkingBarrier,
  modifyParkingBarrier,
  deleteParkingBarrier,
  loadAllByQueryParkingBarrier,
  loadAllBySelectFromGrid,
} from "@/api/wulian";
import { rentStatus } from "@/api/tools/zhsqSelectData";

export default {
  components: {
    Search,
    Dialog,
    Grid,
    Pagination,
    plot,
  },
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "已启用",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "已启用",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "已启用",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "已启用",
        },
      ],
      title: "",
      status: "",
      deptList: [],
      hasFoot: true,
      pageTotal: 0,
      addPost: false,
      postDetail: false,
      editPost: false,
      propertyList: [],
      locationArr: [],
      ShowMap: false,
      selectType: "Point",
      propertyOrGrid: 0,
      form: {
        propertyId: "",
        name: "",
        isPrivate: "",
        remark: "",
        code: "",
        status: 0,
        url: "",
        gridId: "",
        address: "",
      },
      gridId: "",
      gridIdArr: [],
      gridIdToGridId: "",
      indexGridIdTopropertyId: "",
      indexPropertyId: "",
      indexPropertyList: [],
      propertyListAll:[],
      tableLoading:false,
    };
  },

  computed: {
    ...mapGetters(["queryStr", "pageSize", "pageNum", "permitIds", "loading"]),
    rules() {
      const {
        isPrivate,
        remark,
        code,
        status,
        url,
        gridId,
        address,
      } = requiredRules;
      const name = {
        required: true,
        message: "请输入停车道闸名称",
        trigger: "blur",
      };
      const propertyId = {
        required: true,
        message: "请选择小区",
        trigger: "blur",
      };
      return {
        propertyId,
        name,
        isPrivate,
        remark,
        code,
        status,
        url,
        gridId,
        address,
      };
    },
    dialogVisible() {
      return this.addPost || this.postDetail || this.editPost;
    },
    reGridId() {
      if (this.editPost) {
        return this.form.gridId;
      } else {
        return "";
      }
    },
  },
  async created() {
    this.handleGetData();
    this.propertyListAll = await this.handleGetPropertyId("");
  },
  watch: {
    async gridIdToGridId(n, o) {
      this.propertyList = await this.handleGetPropertyId(n);
      if (this.form.gridId != this.row.gridId) {
        this.form.propertyId = "";
      }
    },
    indexGridIdTopropertyId: {
      async handler(n, o) {
        this.indexPropertyList = await this.handleGetPropertyId(n);
        this.indexPropertyId = "";
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    //  删 除
    delPostMethods(parkingBarrierId) {
      this.$confirm("确定删除吗？")
        .then(async (_) => {
          const o = await deleteParkingBarrier({
            parkingBarrierId,
          });
          if (o.code == 200) {
            this.$notify({
              title: o.msg,
            });
          }
          this.handleUpdate();
        })
        .catch((e) => {
        });
    },

    handlePropertyOrGridChange(val) {
      this.propertyOrGrid = "";
    },
    getLocation(obj, type) {
      this.form.address = JSON.stringify(obj.flatCoordinates);
    },
    checkMap() {
      if (this.form.address) {
        this.locationArr = JSON.parse(this.form.address);
      }
      this.ShowMap = true;
    },
    async handleGetPropertyId(gridId) {
      const { data  } = await loadAllBySelectFromGrid({
        gridId,
      });
      return data;
    },
    handleGetGrid(val) {
      this.gridIdToGridId = val;
      this.form.gridId = val;
    },
    handleGridId(val) {

      this.gridId = val;
      this.indexGridIdTopropertyId = val;

      this.handleUpdate();
    },
    handleUpdate() {
      this.handleGetData();
    },
    async handleGetData() {
      this.tableLoading = true;
      const { data } = await loadAllByQueryParkingBarrier({
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        queryStr: this.queryStr,
        gridId: this.gridId,
        propertyId: this.indexPropertyId,
        status: `${this.status}`,
      });
      this.tableLoading = false;
      this.tableData = data.records;
      for(let i in this.tableData){
        let item=this.tableData[i];
        if(item){
          let property =  this.propertyListAll.filter(s=>s.id==item.propertyId);
          if(property && property.length>0){
            item["propertyName"] =property[0].name;
          }

        }
      }

      this.pageTotal = data.total;
    },
    handleAdd() {
      this.title = "新增";
      this.addPost = true;
    },
    handleDetail(row) {
      this.title = "查看详情";
      this.form = row;
      this.hasFoot = false;
      this.postDetail = true;
    },
    handleClose() {
      this.addPost = false;
      this.postDetail = false;
      this.editPost = false;
      this.hasFoot = true;
      this.handleUpdate();
      this.form = {
        name: "",
        introduction: "",
      };
    },
    addPostM() {
      this.$refs["form"].validate(async (v) => {
        const O = await addParkingBarrier({
          ...this.form,
        });
        if (O && O.code == 200) {
          this.$notify({
            title: O.msg,
            type: "success",
          });
        } else {
          this.$notify({
            title: O.msg,
            type: "fail",
          });
        }
        this.$store.dispatch("load/setLoading", true);

        this.handleClose();
      });
    },
    editPostM() {
      this.$refs["form"].validate(async (v) => {
        const O = await modifyParkingBarrier({
          ...this.form,
        });
        if (O && O.code == 200) {
          this.$notify({
            title: O.msg,
            type: "success",
          });
        } else {
          this.$notify({
            title: O.msg,
            type: "fail",
          });
        }
        this.$store.dispatch("load/setLoading", true);

        this.handleClose();
      });
    },
    handleConfirm() {
      this.$refs["form"].validate((v) => {
        if (v) {
          this.$store.dispatch("load/setLoading", true);
          this.addPost ? this.addPostM() : this.editPostM();
        }
      });
    },
    async handleEditPost(row) {
      this.title = "编辑";
      this.form = { ...row };
      this.row = { ...row };
      this.editPost = true;
    },
    deletePost(row, status) {
      this.$confirm(`请确认${status ? "停用" : "启用"}`, {
        type: "warning",
      })
        .then(async (_) => {
          const O = await modifyParkingBarrier({ ...row, status });
          if (O && O.code == 200) {
            this.$notify({
              title: O.msg,
              type: "success",
              duration: 2000,
            });
          } else {
            this.$notify({
              title: O.msg,
              type: "fail",
              duration: 2000,
            });
          }
          this.handleUpdate();
        })
        .catch((e) => {
        });
    },
  },
};
</script>

<style scoped>
.label {
  width: 80px;
}
</style>
<style scoped lang="scss">
.start {
  font-weight: bold;
  color: chartreuse;
}

.gridIdSelect {
  ::v-deep .el-input {
    width: 260px;
  }
}

.el-form {
  .el-select {
    ::v-deep .el-input {
      width: 260px;
    }
  }
  .el-textarea {
    width: 260px;
  }
}

.el-select {
  ::v-deep .el-input {
    .el-input__inner {
      height: 32px;
    }
  }
}
.el-input {
  width: 260px;
}
.end {
  font-weight: bold;
  color: hotpink;
}
.addbtn {
  width: 88px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  background: #3083f2;
  border-radius: 4px;
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
  margin-top: 24px;
  margin-bottom: 32px;
}
</style>
