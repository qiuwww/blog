<template>
  <el-row class="app-warp">
    <el-col>
      <el-row class="rowone">
        <span>
          <el-button
            v-if="permitIds.includes('management_station_add')"
            class="m10 addbtn"
            @click="handleAdd"
            >+新增</el-button
          >
        </span>
        <span class="m10">
          <span class="label"> 所属网格:</span>
          <Grid @grid="handleGridId" />
        </span>
        <span>
          <Search
            :placeholder="'请输入设备名称、编号等'"
            @update="handleUpdate"
          />
        </span>
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
          default-expand-all
          v-loading="tableLoading"
        >
          <el-table-column prop="code" label="设备编号" sortable />
          <el-table-column prop="name" label="设备名称" />
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

          <el-table-column prop="isPrivate" label="设备属性">
            <template slot-scope="scope">
              {{ scope.row.isPrivate == 1 ? "公有" : "私有" }}
            </template>
          </el-table-column>
          <el-table-column prop="gridName" label="所属网格" />
          <el-table-column prop="remark" label="描述" />
          <el-table-column prop="option" label="操作">
            <template slot-scope="scope">
              <el-tooltip content="查看详情" placement="top">
                <el-button
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
              <!--
			  <el-tooltip content="删除" placement="top">
			  			<el-button
                      v-if="
                        scope.row.status == 1 &&
                          permitIds.includes('management_station_tingyong')
                      "
                      class="shanchu"
                      @click="delPostMethods(scope.row, 1)"
                    >

                    </el-button>
			  	</el-tooltip> -->
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
    >
      <el-row type="flex" justify="center">
        <el-col :span="14">
          <el-form
            ref="form"
            :model="form"
            :rules="rules"
            label-width="80px"
            :disabled="postDetail"
          >
            <el-form-item prop="code" label="设备编号">
              <el-input v-model="form.code" />
            </el-form-item>
            <el-form-item prop="name" label="设备名称">
              <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item prop="propertyOrGrid" label="所属主体">
              <el-radio-group v-model="propertyOrGrid">
                <el-radio :label="0">网格</el-radio>
                <el-radio :label="1">小区</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item prop="gridId" label="所属网格">
              <Grid @push="handleGetGrid" v-if="addPost" :isMultiple="true" />
              <el-input v-else :value="form.gridName"> </el-input>
            </el-form-item>
            <el-form-item
              v-if="propertyOrGrid"
              prop="propertyId"
              label="所属小区"
            >
              <el-select v-model="form.propertyId">
                <el-option
                  v-for="(item, i)  in propertyList"
                  :key="item.number"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              v-if="propertyOrGrid == 1"
              prop="isPrivate"
              label="设备属性"
            >
              <el-radio-group v-model="form.isPrivate">
                <el-radio :label="1">公有</el-radio>
                <el-radio :label="2">私有</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item prop="status" label="设备状态">
              <el-radio-group v-model="form.status">
                <el-radio :label="0">启用</el-radio>
                <el-radio :label="1">停用</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item prop="url" label="视频地址">
              <el-input v-model="form.url" />
            </el-form-item>
            <el-form-item prop="position" label="设备位置">
              <el-input v-model="form.position" @focus="checkMap" />
            </el-form-item>
            <el-form-item prop="remark" label="描述">
              <el-input type="textarea" :rows="5" v-model="form.remark" />
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
  cameraInfoAdd,
  cameraInfoDelete,
  cameraInfoModify,
  loadAllBySelectFromGrid,
  cameraInfo,
} from "@/api/wulian";

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
      tableData: [],
      title: "",
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
        status: "",
        url: "",
        gridId: "",
        position: "",
      },
      gridId: "",
      gridIdArr: [],
      gridIdToGridId: "",
      tableLoading:false,
    };
  },

  computed: {
    ...mapGetters(["queryStr", "pageSize", "pageNum", "permitIds"]),
    rules() {
      const {
        name,
        isPrivate,
        remark,
        code,
        status,
        url,
        gridId,
        position,
      } = requiredRules;
      return { name, isPrivate, remark, code, status, url, gridId, position };
    },
    dialogVisible() {
      return this.addPost || this.postDetail || this.editPost;
    },
  },
  created() {
    this.handleGetData();
  },
  watch: {
    gridIdToGridId(n, o) {
      this.handleGetPropertyId();
      this.form.propertyId = "";
    },
  },
  methods: {
    handlePropertyOrGridChange(val) {
      this.propertyOrGrid = "";
    },
    getLocation(obj, type) {
      this.form.position = JSON.stringify(obj.flatCoordinates);
    },
    checkMap() {
      if (this.form.position) {
        this.locationArr = JSON.parse(this.form.position);
      }
      this.ShowMap = true;
    },
    async handleGetPropertyId() {

      const { data } = await loadAllBySelectFromGrid({
        gridId: this.gridIdToGridId,
      });

      this.propertyList = data;
    },
    handleGetGrid(val) {
      this.gridIdToGridId = val;
      this.form.gridId = val;
    },
    handleGridId(val) {
      this.gridId = val;
      this.handleUpdate();
    },
    handleUpdate() {
      this.handleGetData();
    },
    async handleGetData() {
      this.tableLoading = true;
      const { data } = await cameraInfo({
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        queryStr: this.queryStr,
        gridId: this.gridId,
      });
      this.tableLoading = false;
      this.tableData = data.records;
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
        const O = await cameraInfoAdd({
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
        this.handleClose();
      });
    },
    editPostM() {
      this.$refs["form"].validate(async (v) => {
        const O = await cameraInfoModify({
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
        this.handleClose();
      });
    },
    handleConfirm() {
      this.$refs["form"].validate((v) => {
        if (v) {
          this.addPost ? this.addPostM() : this.editPostM();
        }
      });
    },
    async handleEditPost(row) {
      this.title = "编辑";
      this.form = row;
      this.editPost = true;
    },
    deletePost(row, status) {
      this.$confirm(`请确认${status ? "停用" : "启用"}`, {
        type: "warning",
      })
        .then(async (_) => {
          const O = await cameraInfoModify({ ...row, status });
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
          this.handleClose();
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
