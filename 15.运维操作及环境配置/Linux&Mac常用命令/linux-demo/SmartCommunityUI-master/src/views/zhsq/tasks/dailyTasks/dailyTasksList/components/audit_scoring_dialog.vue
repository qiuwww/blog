<template>
  <el-dialog
    center
    v-dialogDrag
    title="评价"
    :width="dialogWidth"
    :before-close="close"
    v-if="auditScoringDialog"
    :visible.sync="auditScoringDialog"
  >
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-position="right"
      class="mt20 overflow pl15 pr15"
    >


      <el-row type="flex" justify="center">
        <el-col :span="22">
          <el-form-item
            label="任务评价："
            prop="evaluationRemark"
            :label-width="labelWidth"
          >
            <el-input
              type="textarea"
              autocomplete="off"
              v-model.trim="form.evaluationRemark"
              placeholder="请输入本次核查评价"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer align-center tiling inline-block">
      <el-button @click="close">取 消</el-button>
      <el-button class="theme-btn" @click="addRepair">确定</el-button>
    </span>
    <PhotoDialog
      @showPic="handleShowPic"
      :showPic="showPic"
      :isShowPic="isShowPic"
    ></PhotoDialog>
  </el-dialog>
</template>

<script>
import "@/utils/drag.js";
import { vlength } from "@/utils/verification.js";
import PhotoDialog from "@/components/MyComponents/photo_dialog";
import { getAllDictionary } from "@/api/dictionary";
import {
  addEvaluation,
  getUserScore,
  getSystemScore
} from "@/api/engineering";

export default {
  name: "Audit_scoring_dialog",
  data() {
    return {
      form: {
        evaluationRemark: ""
      },
      showPic: "",
      userScore: 0,
      photoArr: [],
      taskScoreIds:[],
      countScore: 0,
      isShowPic: false,
      userScoreList: [],
      systemScoreIds: "",
      systemScoreList: [],
      labelWidth: "110px",
      dialogWidth: "720px",
      defaultProps: {
        children: "children",
        score: "score",
        label: "name"
      },
      rules: {}
    };
  },
  watch: {
    auditScoringDialog() {
      if (this.auditScoringDialog) {
        this.resetForm();
        this.getUserScoreList();
      }
    }
  },
  computed: {
    totalScore() {
      let systemScore = 0;
      this.systemScoreList.forEach(item => (systemScore += item.score));
      return systemScore + this.userScore;
    }
  },
  methods: {
    async getSystemScoreList() {
      const params = {
        code: this.repairType,
        detailsId: this.repairId,
        gridId: sessionStorage.getItem("gridId")
      };
      const { rows } = await getSystemScore(params);
      this.systemScoreList = rows.filter(item => item.status);
      this.systemScoreIds = this.systemScoreList.map(item => item.id);
    },
    async getUserScoreList() {
      const params = {
        gridId: sessionStorage.getItem("gridId"),
        categoryId: this.categoryId
      };
      const { object } = await getUserScore(params);
      object.details.map(item => (item.checked = false));
      this.userScoreList = object.details;
      this.countScore = object.countScore;
    },
    addRepair() {


      addEvaluation({
        detailsId: this.$route.query.id,

        remark: this.form.evaluationRemark,
      }).then(res => {
        if (res && +res.code === 200) {
          this.$message({
            type: "success",
            message: res.msg
          });
          this.$emit("update");
          this.$emit("close");
          // this.$router.go(-1);
        }
      });
    },
    handleShowPic(data) {
      this.showPic = data;
      this.isShowPic = !this.isShowPic;
    },
    close() {
      this.$emit("close");
      this.resetForm();
    },
    resetForm() {
      this.form = {
        evaluationRemark: ""
      };
      this.userScore = 0;
    }
  },
  components: {
    PhotoDialog
  },
  props: ["auditScoringDialog", "repairType", "repairId", "categoryId"]
};
</script>

<style scoped></style>
