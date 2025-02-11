<template>
  <el-dialog
    center
    title="选择人员"
    v-dialogDrag
    :width="dialogWidth"
    v-if="dispatchDialog"
    :before-close="close"
    :visible.sync="dispatchDialog"
  >
    <el-form ref="form" label-position="right" class="mt20 overflow pl15 pr15">
      <el-row type="flex" justify="center" v-loading="loading">
        <el-col :span="24" class="mb15">
          <el-row type="flex" justify="center">
            <el-col :span="24" class="mb15">
              <el-form-item>
                <el-tree
                  ref="tree"
                  node-key="id"
                  show-checkbox
                  default-expand-all
                  :data="dispatchList"
                  :check-strictly="true"
                  :props="defaultProps"
                  @check-change="onChangeTreeCheck"
                  @node-click="nodeCheck"
                  :default-checked-keys="checkedList"
                >
                  <span slot-scope="{ node ,data }">
                    <span class="ml15">{{ node.label  }}</span>
                    <span>
                      <span style="position: absolute; right: 0;">
                        {{
                        data.phone
                        }}
                      </span>
                    </span>
                  </span>
                </el-tree>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer align-center tiling inline-block">
      <el-button class="theme-btn" @click="handleDispatchConfirm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import "@/utils/drag.js";
import { getAllDispatch } from "@/api/engineering";

export default {
  name: "Adv_dialog",
  data() {
    return {
      loading: true,
      checkedList: [],
      dispatchList: [],
      labelWidth: "95px",
      reminderObjects: [],
      dialogWidth: "400px",
      defaultProps: {
        children: "employeeList",
        label: "name"
      }
      ,
      editCheckId: {}
    };
  },
  watch: {
    dispatchDialog() {
      this.dispatchDialog && this.getDispatchs();
    }
  },
  methods: {
    handleDispatchConfirm() {
      this.$emit("closeDispatch", this.editCheckId);
    },
    onChangeTreeCheck(data, checked, indeterminate) {
      //   if (data.phone) {
      //     if (nodeChecked) {
      //       this.reminderObjects.push({ id: data.id, name: data.name });
      //     } else {
      //       this.reminderObjects = this.reminderObjects.filter(
      //         item => item.id !== data.id
      //       );
      //     }
      //   }
      if (checked == true) {
        this.editCheckId = { id: data.id, name: data.name }
        this.$refs.tree.setCheckedKeys([data.id])
      } else {
        if (this.editCheckId.id == data.id) {
          this.$refs.tree.setCheckedKeys([data.id])
        }
      }

    },
    nodeCheck(item, node, self) {
      this.editCheckId.id = item.id
      // this.$refs.tree.setCheckedKeys([data.id])
    },
    async getDispatchs() {
      const res = await getVacationDispatch({
        propertyId: this.$store.getters.propertyInfo.id
      });
      this.dispatchList = res.rows;
      this.loading = false;
    },
    reset() {
      this.reminderObjects = [];
    },
    close() {
      this.$emit("closeDispatch");
    }
  },
  props: ["dispatchDialog", "deptIds"]
};
</script>

<style scoped></style>
