<template>
  <div :key="tableKey" ref="ygeTableBox" class="yge-table-box" :class="tableKey">
    <el-table
      ref="ygeTable"
      :data="tableData"
      v-loading="pictLoading"
      :stripe="stripe"
      :border="border"
      :max-height="maxHeight"
      :row-style="cursorPointer"
      element-loading-text="数据正在加载中"
      @select="select"
      @row-click="rowClick"
      @cell-mouse-enter="cellMouseEnter"
      @selection-change="selectionChange"
      @cell-mouse-leave="cellMouseLeave"
    >

      <!-- 多选框 -->
      <transition name="el-zoom-in-top">
        <el-table-column v-if="showSelectionData" :selectable="isSelectable" fixed="left" align="center" type="selection" width="50" />
      </transition>

      <!-- 序号列 -->
      <transition name="el-zoom-in-top">
        <el-table-column
          v-if="showSequenceData"
          fixed="left"
          type="index"
          label="序号"
          width="50"
        />
      </transition>
      <!-- 循环生成动态列 -->
      <el-table-column
        v-for="(column, index) in columns"
        :key="index"
        :align="column.align"
        :prop="column.prop"
        :width="column.width"
        :label="column.label"
        :fixed="column.fixed"
        :min-width="column.minWidth"
        :show-overflow-tooltip="column.showOverFlow ? false : true"
      >
        <template slot-scope="scope">
          <!--                    <div class="textOmit" @mouseenter="enter(scope.row, $event)">-->
          <!-- <div class="textOmit"> -->
          <party-render
            v-if="column.render"
            :row="scope.row"
            :index="scope.$index"
            :render="column.render"
          />
          <span v-else>{{ scope.row[column.prop] }}</span>
          <!-- </div> -->
        </template>
      </el-table-column>
      <!-- 无数据的图片展示 -->
      <div slot="empty">
        <img v-if="!pictLoading" :src="noList" alt="暂无数据">
      </div>

    </el-table>

    <!-- 分页器 -->
    <div v-if="ifShowPagination && showPage" class="yge-page">
      <el-pagination
        :total="totalCount"
        :hide-on-single-page="true"
        :prev-text="prevText"
        :next-text="nextText"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="prev, pager, next, slot,jumper,total"
        @current-change="currentChange"
      ><el-button :disabled="isLastDisabled" @click="toLastPage">尾页</el-button></el-pagination>
      <el-button :disabled="firstDisabled" class="first-btn" @click="toFirstPage">首页</el-button>
    </div>
  </div>
</template>

<script>
import partyRender from '../partyRender'
import lodash from 'lodash'
export default {
 name: 'PartyTable',
 components: {
  partyRender
 },
 props: {
  cursorPointer: {
   type: Object,
   default: () => {
    return {
     cursor: 'pointer'
    }
   }
  },
  // 内容过长被隐藏时显示
  showOverflowTooltip: {
   type: Boolean,
   default: true
  },
  // 表格数据
  tableList: {
      type: Object / Array
  },
  // 是否开启多选过滤是否可勾选
  isFilterSelect: {
   type: Boolean,
   default: false
  },
  // 表格字段
  columns: {
   type: Array,
   default: () => []
  },
  // 是否斑马纹
  stripe: {
   type: Boolean,
   default: false
  },
  // 是否显示边框
  border: {
   type: Boolean,
   default: true
  },
  // 是否显示多选
  showSelectionData: {
   type: Boolean,
   default: false
  },
  // 是否显示分页器
  ifShowPagination: {
   type: Boolean,
   default: true
  },
  pictLoading: {
   type: Boolean,
   default: false
  },
  // 是否显示序号列
  showSequenceData: {
   type: Boolean,
   default: true
  },
  // 表格最大高度
  maxHeight: {
   type: String,
   default: '600'
  },
  // totalCount: {
  //     type: Number,
  //     default: 0
  // },
  prevText: {
   type: String,
   default: '上一页'
  },
  nextText: {
   type: String,
   default: '下一页'
  }
  // pageSize: {
  //     type: Number,
  //     default: 10
  // }
 },
 data() {
  return {
   // maxHeight: 0,
   currentPage: 1,
   totalCount: 0,
   tableData: [],
   pageSize: 10,
   activeRow: {},
   firstDisabled: true,
   isLastDisabled: false,
   tableKey: lodash.uniqueId('table-'),
   noList: `${require('@/assets/imgs/noList.png')}` // 无数据图示
  }
 },
 computed: {
  showPage: function() {
   return Math.ceil(Number(this.totalCount) / Number(this.pageSize)) > 1
  }
 },
 watch: {
  tableList: {
   handler(newData, oldData) {
    this.tableDataInit()
   },
   deep: true
  },
  currentPage(newData, oldData) {
   if (String(newData) === '1') {
    this.firstDisabled = true
   } else {
    this.firstDisabled = false
   }
   if (Number(newData) * Number(this.pageSize) >= Number(this.totalCount)) {
    this.isLastDisabled = true
   } else {
    this.isLastDisabled = false
   }
  }
 },
 created() {
  // 初始化数据处理
  this.$nextTick(() => {
   this.tableDataInit()
  })
 },
 // mounted () {
 //   this.$nextTick(() => {
 //       this.tableResize()
 //   })
 // },
 methods: {
  isSelectable(row, index) {
   if (row.NONUM > 0) {
    return false
   } else {
    return true
   }
  },
  // 计算table高度
  tableResize() {
   if (this.ifShowPagination) {
    this.$refs.ygeTableBox.style.height = 'calc(100% - 50px)'
    // this.maxHeight = this.$refs.ygeTableBox.offsetHeight
   } else {
    this.$refs.ygeTableBox.style.height = '100%'
    // this.maxHeight = this.$refs.ygeTableBox.offsetHeight
   }
   this.$refs.ygeTable.doLayout()
  },
  // 初始化表格数据
  tableDataInit() {
   if (!lodash.isArray(this.tableList)) {
    const data = lodash.cloneDeep(this.tableList)
    this.tableData = lodash.get(data, 'records') ? lodash.get(data, 'records') : []
    this.totalCount = lodash.get(data, 'total') ? Number(lodash.get(data, 'total')) : 0
    this.currentPage = lodash.get(data, 'current') ? Number(lodash.get(data, 'current')) : 1
    this.pageSize = lodash.get(data, 'size') ? Number(lodash.get(data, 'size')) : 10
   } else {
    this.tableData = [...this.tableList]
   }
   this.tableKey = lodash.uniqueId('table-')
   this.$refs.ygeTable.doLayout()
  },
  select(selection, row) {
   this.$emit('selectRow', selection, row)
  },
  // 当前行单击触发
  rowClick(row, column, event) {
   this.$emit('rowClick', row, column)
  },
  cellMouseEnter(row, column, cell, event) {
   this.$emit('cellMouseEnter', row, column, cell, event)
  },
  cellMouseLeave(row, column, cell, event) {
   this.$emit('cellMouseLeave', row, column, cell, event)
  },
  toggleRowSelection(row) {
   this.$refs.multipleTable.toggleRowSelection(row)
  },
  selectionChange(row) {
   this.$emit('selectionChange', row)
  },
  currentChange(page) {
   this.$emit('currentChange', page)
  },
  // 鼠标移入
  enter(row, mouse) {
   if (lodash.isEqual(this.activeRow, row)) {
    return false
   } else {
    this.activeRow = row
    this.$emit('cellMouseEnter', row, null, null, mouse)
   }
  },
  toFirstPage() {
   this.currentChange('1')
  },
  toLastPage() {
   const page = Math.ceil(this.totalCount / this.pageSize)
   this.currentChange(page)
  }
 }
}
</script>
<style lang="less" scoped>
.yge-table-box{
    // height: 100%;
    /deep/ .el-table__header{
        th{
            background: #F3F6FB
        }
    }
    .yge-page{
        margin-top: 12px;
        position: relative;
        overflow: hidden;
        .first-btn{
            float: right;
            width: 36px;
            height: 28px;
            line-height: 28px;
            padding: 0;
            margin-top: 2px;
            text-align: center;
            border: 0px;
        }
        .el-pagination{
            // display: inline-block
            float: right;
            /deep/ .el-pagination__total{
                position: absolute;
                top: 2px;
                left: 10px;
            }
            /deep/ button{
                padding: 0 5px;
            }
        }
    }
}
</style>
