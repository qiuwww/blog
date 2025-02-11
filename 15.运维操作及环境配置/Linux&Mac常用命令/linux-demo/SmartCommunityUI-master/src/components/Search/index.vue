<template>

  <span class="searchInputWarp">
    <el-input
      v-model.trim="queryStr"
      :placeholder="placeholder"
      class="searchInput"
    >
      <el-button
        v-if="queryStr"
        slot="append"
        icon="el-icon-close"
        class="btn-close"
        @click.native="resetSearch"
      />
    </el-input>

    <el-button
      icon="el-icon-search"
      class="fr btn_search"
      @click="handleUpdate"
    />
  </span>

</template>

<script>
  import {number} from 'echarts/lib/export'

  export default {
    name: 'Search',
    /*props: {
      placeholder: {
        type: String,
        required: false
      },
      refresh: {
        type: ['Numberm','String'],
        required: false,
        default: () => {
          return 1
        }
      }
    },*/
    props: ['placeholder', 'refresh'],
    data() {
      return {
        queryStr: ''
      }
    },
    watch: {
      refresh: {
        handler() {
          this.resetSearch()
        }
      }
    },
    methods: {
      resetSearch() {
        this.queryStr = ''
        this.$store.dispatch('search/setSearch', this.queryStr)
        this.$emit('update')
      },
      handleUpdate() {
        this.$store.dispatch('pagination/resetPage')
        this.$store.dispatch('search/setSearch', this.queryStr)
        this.$emit('update')
      }
    }
  }
</script>

<style scoped>

    .searchInput {
      flex: 1;
      height: 32px;
      position: relative;
      width: 240px;
    }

    .searchInput ::v-deep .el-input-group__append {

      background-color: #fff;
    }

    .searchInput ::v-deep .el-input__inner {
      border-width: 0px;
      border: 1px solid #dcdfe6;
      border-radius: 4px 0 0 4px;
      position: relative;
      height: inherit;

      /* ����򱳾�*/
    }

    .searchInputWarp {

      margin-left: 20px;
      margin-top: 0px;
      float: left;

      /*width: 240px;*/
      height: 33px;
      background: #f0f3f7;

      border-radius: 4px 0 0 4px;

      overflow: hidden;
      position: relative;
      display: flex;
    }

    .btn-close {
      position: absolute;
      width: 14px;
      padding: 0;

      overflow: hidden;
    }

    .btn_search {
      width: 59px;
      padding: 0;
      border: 1px solid #3083f2;
      height: 32px;
      line-height: 32px;
      border-radius: 0 4px 4px 0 !important;
      border-bottom: 1px solid #3083f2;
      background-color: #3083f2;
      color: #fff;
    }
</style>
