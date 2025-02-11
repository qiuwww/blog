<template>
  <!-- 异议审核 -->
  <DialogUI
    :dialog-visible="isShow"
    :has-foot="false"
    :title="'异议审核'"
    @confirm="handleConfirm"
    @close="handleClose"
  >
    <el-form ref="form" :model="form" :rules="rules">
      <el-form-item label="异议审核结果" prop="eventType">
        <el-radio-group v-model="radio">
          <el-radio :label="1">无问题，驳回</el-radio>
          <el-radio :label="2">存在问题，进入派遣流程</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="radio == 1" label="任务核查图片" prop="type">
        <UpLoadImg
          class="mt15"
          :limit="3"
          :img-src="photoArr"
          :max-size="1024"
          :accept-type="['png', 'jpeg', 'jpg']"
          @uploadChange="handleUploadChange"
        />
      </el-form-item>
      <el-form-item v-if="radio == 1" label="异议审核情况" prop="type">
        <el-input v-model="form.remark" type="textarea" :rows="3" />
      </el-form-item>
    </el-form>
    <el-row v-if="radio == 1" type="flex" justify="center">
      <el-col :span="12">
        <el-button type="primary" @click="handleDispatchConfirm">
          下一步
        </el-button>
        <el-button> 取消 </el-button>
      </el-col>
    </el-row>
    <el-row v-else type="flex" justify="center">
      <el-col :span="12">
        <el-button type="primary" @click="handleDispatch"> 下一步 </el-button>
        <el-button> 取消 </el-button>
      </el-col>
    </el-row>

    <el-dialog
      v-if="dispatchDialog"
      v-dialogDrag
      center
      title="选择派遣对象"
      width="500px"
      :before-close="close"
      :append-to-body="true"
      :visible.sync="dispatchDialog"
    >
      <el-row type="flex" justify="center">
        <el-col :span="24" class="mb15">
          <el-row type="flex" justify="center">
            <el-col :span="20" class="mb15">
              <section
                v-for="(item, index) in dispatchList"
                :key="index"
                style="height:40px;overflow:hidden;dispaly:inline-block"
              >
                <span class="mb05">{{ item.name }}</span>
              </section>
            </el-col>
            <el-col :span="4" class="mb15">
              <el-radio-group v-model="beUserId">
                <el-radio
                  v-for="(item, i)  in dispatchList"
                  :key="item.userId"
                  :label="item.userId"
                  class="ml10"
                  style="height:40px;overflow:hidden;dispaly:inline-block"
                  >{{ "" }}</el-radio
                >
              </el-radio-group>
            </el-col>
          </el-row>
        </el-col>
      </el-row>

      <span
        slot="footer"
        class="dialog-footer align-center tiling inline-block"
      >
        <el-button
          v-loading="loading"
          class="theme-btn"
          @click="handleDispatchConfirm"
          >确 定</el-button
        >
        <el-button v-loading="loading" class="theme-btn" @click="close"
          >取 消</el-button
        >
      </span>
    </el-dialog>
  </DialogUI>
</template>

<script>
import DialogUI from "@/components/DialogUI";
import UpLoadImg from "@/components/UpLoadImg";
import { requiredRules } from "@/utils/rules";
import {
  changeEventsType,
  getEventsTypeList,
  handlingObjectionAssignment
} from "@/api/events";
import { getUserList } from "@/api/system";
import { mapGetters } from "vuex";

export default {
  components: {
    DialogUI,
    UpLoadImg
  },
  props: {
    completionReview: {
      type: Boolean,
      required: false
    },
    gridId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      form: {
        remark: ""
      },
      radio: 1,
      photo: "",
      beUserId: "",
      dispatchDialog: false,
      dispatchList: [],
      dialogVisible: false,
      eventsList: [],
      photoArr: [],
      eventType: ""
    };
  },
  computed: {
    ...mapGetters(["loading"]),
    rules() {
      const { remark, type } = requiredRules;
      return { remark };
    },
    isShow() {
      return this.completionReview;
    },
    mediaAddress() {
      return this.photo.map(i => {
        return { address: i, type: "1" };
      });
    }
  },
  watch: {
    completionReview(n, o) {
      if (n) {
        this.getDispatchs();
      }
    },
    dialogVisible(n, o) {
      this.handleGetList();
    }
  },
  created() {},
  methods: {
    handleDispatch() {
      this.dispatchDialog = true;
    },
    async getDispatchs() {
      const res = await getUserList({
        fileType: 4,
        gridId: this.gridId
      });
      this.dispatchList = res.data;
    },
    async handleGetList() {
      const { data } = await getEventsTypeList();
      this.eventsList = data;
    },
    handleDispatchConfirm() {
      this.handleSet();
    },
    async handleModifyType() {
      const data = await changeEventsType({
        userId: +sessionStorage.getItem("userId"),
        eventsTypeId: this.eventType,
        detailsId: this.$route.query.id
      });
      if (data && data.code == 200) {
        this.$notify({
          title: data.msg,
          type: data.succcess ? "success" : "warning"
        });
      }
      this.close();
    },
    close() {
      this.dispatchDialog = false;
    },
    handleConfirm() {},
    async handleSet() {
      const params = {
        type: this.radio,
        userId: +sessionStorage.getItem("userId"),
        remark: this.form.remark,
        detailsId: this.$route.query.id,
        mediaAddress: this.mediaAddress
      };
      params.type == 2 ? (params.beUserId = this.beUserId) : "";
      const data = await handlingObjectionAssignment(params);
      if (data && data.code == 200) {
        this.$notify({
          title: data.msg,
          type: data.succcess ? "success" : "warning"
        });
        this.$emit("close");
      }
    },
    handleUploadChange(val) {
      this.photo = val;
    },
    handleClose() {
      this.$emit("close");
    }
  }
};
</script>

<style></style>
