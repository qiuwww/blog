<template>
  <div class="mt20 center" >
    <el-pagination
      background
      align="right"
      :page-size="100"
      :total="pageTotal"
      :page-sizes="pages"
      :current-page="pageNum"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      layout="total, sizes, prev, pager, next, jumper"
    ></el-pagination>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";

  export default {
    name: "Pagination",
    data() {
      return {
        pages: [10, 15, 20, 25]
      };
    },
    computed: {
      ...mapGetters(["pageSize", "pageNum"])
    },
    methods: {
      handleSizeChange(val) {
        this.$store.dispatch("pagination/setPageSize", val);
        this.$emit("paginationChange");
      },
      handleCurrentChange(val) {
        this.$store.dispatch("pagination/setPageNum", val);
        this.$emit("paginationChange");
      }
    },
    props: ["pageTotal"]
  };
</script>

<style >

  .center{
    display: flex;
    justify-content: center;
  }
  .el-pagination.is-background .el-pager li {
    background-color: #ffffff;
  }
  .el-pagination.is-background .el-pager li:hover{
    background-color: #1890ff !important;
    color: #fff !important;
  }
</style>
