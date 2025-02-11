<template>
  <div class="inline-block">
    <el-select
      v-model="gridId"
      clearable
      size="small"
      :multiple="isMatch"
      value-key="label"
      style="width: 100%"
      :placeholder="isMultiple ? '单选' : '全部'"
      @change="handlePush"
    >
      <el-option
        style="width: 220px"
        v-for="(item, i)  in gridsIdList"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      />
    </el-select>
  </div>
</template>

<script>
import { queryAllList } from "@/api/zhsq/basicGrids/basicGrids";

import { getAllGrid } from "@/api/utils";
import { requestUrl } from "@/views/gismap/components/config";
// 获取 社区 id 下的 网格 communityId
export default {
  props: {
    communityId: {
      required: false,
      type: [Number, String],
      default: () => {
        if (sessionStorage.getItem("UserObj") && JSON.parse(sessionStorage.getItem("UserObj")).communityId) {
          return JSON.parse(sessionStorage.getItem("UserObj")).communityId;
        } else {
          return null;
        }
      },
    },
    isMultiple: {
      // 是否 多选  多选: isMultiple传 true  isMultiple不传 或者 传false  靠用户身上是否有多个girdId 决定是否多选
      required: false,
      type: [Boolean],
      default: () => {
        return false;
      },
    },
    reGridId: {
      required: false,
      type: [String],
      default: () => {
        return "";
      },
    },
  },
  data() {
    return {
      gridId: "",
      communityList: [],
      gridsIdList: [],
      multiple: false,
    };
  },
  computed: {
    isMatch() {
      if (this.isMultiple) {
        return false;
      } else {
        return this.multiple;
      }
    },
  },
  watch: {
    async communityId(n, o) {
      if (n) {
        await this.handleGetGrids();
        this.handleGet();
      } else {
        this.getAllgrid();
      }
    },
    reGridId: {
      handler(n, o) {
        if (n) {
          //this.gridId = n;
        }
      },
      deep: true,
      immediate: true,
    },
  },

  async created() {},
  async mounted() {
    await this.handleGetGrids();
    if (this.reGridId) {
      this.gridId = this.reGridId;
    }
    this.handleGet();
    this.handlePush();
  },
  methods: {
    async handleGet() {
      let grid = sessionStorage.getItem("gridId");
      if(grid){
        grid = grid.split(",");
        if (grid.length > 0 && sessionStorage.getItem("userId") != 1) {
          this.multiple = true;
          this.communityList.map((e) => {
            grid.map((i) => {
              e.id == i ? this.gridsIdList.push(e) : "";
            });
          });

          if (this.reGridId) {
            this.gridId = this.reGridId;
          } else {
            if (this.isMatch) {
              this.gridId = [];
            } else {
              this.gridId = "";
            }
          }
        } else {
          if (sessionStorage.getItem("userId") == 1) {
            this.multiple = true;
            const { data } = await queryAllList({
              communityId: "",
            });
            this.gridsIdList = data;
            if (this.reGridId) {
              this.gridId = this.reGridId;
            } else {
              if (this.isMatch) {
                this.gridId = [];
              } else {
                this.gridId = "";
              }
            }
            // this.gridId = []

            // this.gridId.push(this.gridsIdList[0].id)
            // .map(i => i.id);
          } else {
            if (this.isMatch) {
              this.gridId = [];
              this.gridId.push(this.gridsIdList[0].id);
            } else {
              this.gridId = this.gridsIdList[0].id;
            }
            // this.gridId.push(this.gridsIdList[0].id)
            // .map(i => i.id);
          }
          //
        }
      }
      else{
        this.communityList.map((e) => {
          this.gridsIdList.push(e);
        });
      }
      this.handlePush();
    },
    async getAllgrid() {
      if (sessionStorage.getItem("userId") == 1) {
        const { data } = await queryAllList({
          communityId: "",
        });
        this.gridsIdList = data;
        this.gridId = this.gridsIdList[0].id;
      }
      this.handlePush();
    },
    // 获取社区下的所有网格
    async handleGetGrids() {
      const { data } = await queryAllList({
        communityId: this.communityId,
      });
      this.communityList = data;
    },
    handlePush() {
      if (this.gridId || this.gridId.length) {
        if (this.isMatch) {
          this.$emit("grid", this.gridId.join(","));
          this.$emit("push", this.gridId.join(","));
        } else {
          this.$emit("grid", this.gridId);
          this.$emit("push", this.gridId);
        }
      } else {
        this.$emit(
          "grid",
          sessionStorage.getItem("gridId")
            ? sessionStorage.getItem("gridId")
            : ""
        );
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.el-select ::v-deep .el-select__tags {
  display: inline-block;
  font-size: 12px;
  width: 100%;
  padding: 0 6px;
  overflow: hidden; /*自动隐藏文字*/
  text-overflow: ellipsis; /*文字隐藏后添加省略号*/
  white-space: nowrap; /*强制不换行*/
}
</style>
