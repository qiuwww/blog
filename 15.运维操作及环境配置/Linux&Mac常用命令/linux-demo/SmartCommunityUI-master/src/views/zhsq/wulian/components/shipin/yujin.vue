<template>
  <el-row class="app-warp">
    <el-col>
      <el-row class="rowone">
        <!-- <span>
          <el-button
            v-if="permitIds.includes('management_station_add')"
            class="m10 addbtn"
            @click="handleAdd"
            >+新增</el-button
          >
        </span> -->
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
            color: '#000000'
          }"
          :data="tableData"
          style="width: 100%;margin-bottom: 20px;"
          stripe
          default-expand-all
          v-loading="tableLoading"
        >
          <el-table-column prop="alarmGrade" label="报警等级" sortable />
          <el-table-column prop="alarmTypeName" label="报警类型" />
          <el-table-column prop="channelName" label="报警名称" />
          <el-table-column prop="gridName" label="所属网格" />
        </el-table>
      </el-row>

      <Pagination
        class="numsize"
        :page-total="pageTotal"
        @paginationChange="handleUpdate"
      />
    </el-col>
  </el-row>
</template>

<script>
import { mapGetters } from "vuex";
import Search from "@/components/Search";
import Pagination from "@/components/Pagination";
import Grid from "@/components/Ascription/gridSelect";
import {
  cameraInfoAdd,
  cameraInfoDelete,
  cameraInfoModify,
  videoWarning
} from "@/api/wulian";

export default {
  components: {
    Search,
    Grid,
    Pagination
  },
  data() {
    return {
      tableData: [],
      deptList: [],
      hasFoot: true,
      pageTotal: 0,
      postDetail: false,
      editPost: false,

      gridId: "",
      tableLoading:false,
    };
  },

  computed: {
    ...mapGetters(["queryStr", "pageSize", "pageNum", "permitIds"]),
    rules() {
      const { name, type, level, address } = requiredRules;
      return { name, type, level, address };
    },
    dialogVisible() {
      return this.addPost || this.postDetail || this.editPost;
    }
  },
  created() {
    this.handleGetData();
  },
  methods: {
    handleGetGrid(val) {
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

      const { data } = await videoWarning({
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        queryStr: this.queryStr
      });
      this.tableLoading = false;

      this.tableData = data.records;
      this.pageTotal = data.total;
    },
    // handleAdd() {
    //   this.addPost = true;
    // },
    handleDetail(row) {
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
        introduction: ""
      };
    },
    addPostM() {
      this.$refs["form"].validate(async v => {
        const O = await cameraInfoAdd({
          ...this.form
        });
        if (O && O.code == 200) {
          this.$notify({
            title: O.msg,
            type: "success"
          });
        } else {
          this.$notify({
            title: O.msg,
            type: "fail"
          });
        }
        this.handleClose();
      });
    },
    editPostM() {
      this.$refs["form"].validate(async v => {
        const O = await cameraInfoModify({
          ...this.form
        });
        if (O && O.code == 200) {
          this.$notify({
            title: O.msg,
            type: "success"
          });
        } else {
          this.$notify({
            title: O.msg,
            type: "fail"
          });
        }
        this.handleClose();
      });
    },
    handleConfirm() {
      this.addPost ? this.addPostM() : this.editPostM();
    },
    async handleEditPost(row) {
      this.form = row;
      this.editPost = true;
    },
    deletePost(row, status) {
      this.$confirm(`请确认${status == 1 ? "启用" : "停用"}`, {
        type: "warning"
      })
        .then(async _ => {
          const O = await cameraInfoModify({ ...row, status });
          if (O && O.code == 200) {
            this.$notify({
              title: O.msg,
              type: "success"
            });
          } else {
            this.$notify({
              title: O.msg,
              type: "fail"
            });
          }
          this.handleClose();
        })
        .catch(e => {
        });
    }
  }
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
.end {
  font-weight: bold;
  color: hotpink;
}
.addbtn {
  width: 88px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  background: #3083f2;
  border-radius: 16px;
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
