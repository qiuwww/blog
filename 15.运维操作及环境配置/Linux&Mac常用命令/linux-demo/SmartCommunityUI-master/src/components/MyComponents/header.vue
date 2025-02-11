<template>
  <div class="header w100 bg-white pl20 pr20 border-box">
    <div class="navbar">
      <el-menu mode="horizontal">
        <div class="left-btn fl" style="margin-top: 5px;">
          <el-button
            id="btn"
            type="text"
            class="inline-block"
            @click="handleSwitch"
            :class="{ rotate: rotate, theme: true }"
          >
            <i class="fa fa-navicon fa-3x"></i>
          </el-button>
        </div>
        <div class="property-select fl ml20 mt15">
          <propertyController></propertyController>
        </div>

        <div class="fr">
          <!-- <div class="user-info pointer">
            <el-badge :is-dot="dot" class="item">
              <el-button
                class="theme-btn"
                icon="el-icon-message-solid"
                type="primary"
                @click="handleDrawer"
              ></el-button>
            </el-badge>
          </div> -->
          <span class="user-info pointer" @click="handleModifyPass">
            {{ userInfo.realName  }}
            <i class="el-icon-arrow-down ml20"></i>
          </span>
          <img
            v-if="userInfo.head"
            class="avatar fr mt10 round"
            :src="userInfo.head"
            alt
          />
          <img
            v-else
            class="avatar fr mt10 round"
            src="@/assets/avatar.jpg"
            alt
          />
          <AccountInfoDialog
            :loading="loading"
            @close="handleClose"
            :detailDialog="detailDialog"
            @modifyPhone="handleModifyPhone"
            @modifyPassword="hendleModifyPassword"
          ></AccountInfoDialog>
          <ModifyPasswordDialog
            :loading="loading"
            @close="handleClose"
            :modifyPasswordDialog="modifyPasswordDialog"
          ></ModifyPasswordDialog>
          <ModifyPhoneDialog
            :loading="loading"
            @close="handleClose"
            :modifyPhoneDialog="modifyPhoneDialog"
          ></ModifyPhoneDialog>
        </div>
      </el-menu>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AccountInfoDialog from "@/components/Mycomponents/account_info_dialog";
import ModifyPhoneDialog from "@/components/Mycomponents/modify_phone_dialog";
import propertyController from "@/components/Mycomponents/property_controller";
import ModifyPasswordDialog from "@/components/Mycomponents/modify_password_dialog";

export default {
  name: "Header",
  data() {
    return {
      detailDialog: false,
      modifyPhoneDialog: false,
      modifyPasswordDialog: false,
      dot:false
    };
  },
  computed: {
    collapse() {
      return this.isCollapse ? "64px" : "200px";
    },
    ...mapGetters(["userInfo", "loading"])
  },
  mounted(){
    var list = setInterval(async _ => {

    },10000)
  },
  methods: {

    handleDrawer() {
      this.$emit("handleDrawer");
    },
    handleSwitch() {
      this.$emit("switch");
    },
    handleClose() {
      this.detailDialog = false;
      this.modifyPhoneDialog = false;
      this.modifyPasswordDialog = false;
    },
    handleLogout() {
      this.$router.push("/login");
      sessionStorage.clear();
    },
    handleModifyPass() {
      this.detailDialog = !this.detailDialog;
    },
    handleModifyPhone() {
      this.modifyPhoneDialog = !this.modifyPhoneDialog;
    },
    hendleModifyPassword() {
      this.modifyPasswordDialog = !this.modifyPasswordDialog;
    }
  },
  components: {
    ModifyPhoneDialog,
    AccountInfoDialog,
    propertyController,
    ModifyPasswordDialog
  },
  props: ["isCollapse", "rotate"]
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
