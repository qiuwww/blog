<template>
  <!-- 分级上报 -->
  <DialogUI
    :dialog-visible="isShow"
    :has-foot="false"
    :title="'分级上报'"
    @confirm="handleConfirm"
    @close="handleClose"
  >
    <!-- <el-row class="mb10">
      <span class="label"> 是否修改事件类型</span>
      <el-select  clearable v-model="eventType">
        <el-option
          v-for="(item, i)  in eventsList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
    </el-row> -->
    <!--        {{ '这边部门没得选 ，此分支暂不开放' }}-->

    <!-- <el-row type="flex" justify="center" class="mt20">
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
    >  -->
    <el-row class="mb10">
      <span class="label"> 所属网格 </span>
     <grid @grid="handleGetGridId" />
    </el-row>
    <el-row class="mb10" v-if="gridId">
      <span class="label" > 派遣至 </span>
      <el-select v-model="labelUser" @change="getDispatchs">
        <el-option :label="'管理员'" :value="2"> </el-option>
        <el-option :label="'网格员'" :value="4"> </el-option>
      </el-select>
    </el-row>
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
          <el-col :span="1" class="mb15">
            <el-radio-group v-model="checkedList">
              <el-radio
                v-for="(item, i)  in dispatchList"
                :key="item.userId"
                :label="item.userId"
                :value="item.userId"
                class="ml10"
                style="height:40px;overflow:hidden;dispaly:inline-block"
                >{{ "" }}</el-radio
              >
            </el-radio-group>
          </el-col>
        </el-row>
      </el-col>
    </el-row>

    <!-- <span slot="footer" class="dialog-footer align-center tiling inline-block"> -->
    <el-row type="flex" justify="center">
      <el-col :span="1">
         <el-button
        class="theme-btn "
        @click="handleDispatchConfirm"
        >确 定</el-button
      >
      </el-col>

    </el-row>

    <!-- </span> -->
    <!-- </el-dialog> -->
  </DialogUI>
</template>

<script>
import DialogUI from "@/components/DialogUI";
import UpLoadImg from "@/components/UpLoadImg";
import { requiredRules } from "@/utils/rules";
import {
  getEventsTypeList,
  handlingObjectionAssignment,
  hierarchical
} from "@/api/events";
import grid from '@/components/Ascription/gridSelect'
import { getUserList } from "@/api/system";
import {mapGetters} from 'vuex';

export default {
  components: {
    DialogUI,
    UpLoadImg,
    grid
  },
  props: {
    completionReview: {
      type: Boolean,
      required: false
    },
    aleventType: {
      type: Number,
      required: false
    },

  },
  data() {
    return {
      form: {
        remark: ""
      },
      labelUser: '',
      checkedList: "",
      steps: 0,
      radio: 1,
      photo: "",
      gridId:'',
      dialogVisible: false,
      eventsList: [],
      dispatchList: [],
      photoArr: [],
      eventType: "",
      // loading:false,
      dispatchDialog: false
    };
  },
  computed: {
    ...mapGetters(['loading']),
    rules() {
      const { remark, type } = requiredRules;
      return { remark };
    },

    isShow() {
      if (this.completionReview) {
        this.eventType = String(this.aleventType);
        this.handleGetList();
      }
      return this.completionReview;
    },
    mediaAddress() {
      return this.photo.map(i => {
        return { address: i, type: "1" };
      });
    }
  },
  watch: {
    completionReview(n, o) {},

    dispatchDialog(n, o) {
      this.getDispatchs();
      if (n) {
        this.getDispatchs();
      }
    },
    aleventType: {
      handler(n, o) {
        this.eventType = n;
      },
      immediate: true
    }
  },
  methods: {
    handleGetGridId(grid){
      this.gridId = grid
    },
    async getDispatchs() {
      const res = await getUserList({
        fileType: this.labelUser,
        gridId: this.gridId
      });
      this.dispatchList = res.data;
    },
    async handleGetList() {
      const { data } = await getEventsTypeList();
      this.eventsList = data;
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
    },
    close() {
      this.dispatchDialog = false;
    },
    handleDispatch() {
      this.dispatchDialog = true;
    },
    handleConfirm() {},
    async handleDispatchConfirm() {
      const data = await hierarchical({
        beUserId: this.checkedList,
        type: 2,
        detailsId:this.$route.query.id,
        gridId:this.gridId
      });
      if (data && data.code == 200) {
        this.$notify({
          title: data.msg,
          type: data.success ? "success" : "warning"
        });
        this.$emit("close");
        this.$router.go(-1)
      }
    },
    async handleSet() {
      const data = await handlingObjectionAssignment({
        type: this.radio,
        userId: +sessionStorage.getItem("userId"),
        remark: this.form.remark,
        detailsId: this.$route.query.id,
        mediaAddress: this.mediaAddress
      });
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
      this.dispatchList = []
      this.gridId = ''
    }
  }
};
</script>

<style></style>
