<template>
	<span class="i-layout-header-trigger i-layout-header-trigger-min">
        <Dropdown :trigger="isMobile ? 'click' : 'hover'" class="i-layout-header-user" :class="{ 'i-layout-header-user-mobile': isMobile }" @on-click="handleClick">
           <!--<span class="i-layout-header-user-name">Aresn</span>-->
           <div class="avatar-wrapper" style="width:30px;height:30px;top:-2px;position: relative;">
            <img :src="Avatar" class="user-avatar" width="30px" height="30px">
            <!--<i class="el-icon-caret-bottom" />user.avatar ? baseApi + '/avatar/' + user.avatar-->
           </div>
            <DropdownMenu slot="list" style="width: 120px;">
                <router-link to="/user/center">
                    <DropdownItem>
                        <Icon type="ios-contact-outline" />
                        <span>个人中心</span>
                    </DropdownItem>
                </router-link>
                <DropdownItem divided name="logout">
                    <Icon type="ios-log-out" />
                    <span>退出登录</span>
                </DropdownItem>
            </DropdownMenu>

        </Dropdown>
    </span>



	</template>
<script>
    import { mapState, mapActions,mapGetters } from 'vuex';
    import Avatar from '@/assets/images/useravatar.svg'
    import Cookies from 'js-cookie'
    export default {
        name: 'iHeaderUser',
		data() {
         return {
          Avatar: Avatar,
          dialogVisible: false
         }
        },
        computed: {
            ...mapGetters([
               'sidebar',
               'device',
               'user',
               'baseApi'
            ]),
            ...mapState([
                'isMobile',
                'logoutConfirm'
            ]),
        },
        methods: {
            handleClick (name) {
                if (name === 'logout') {
                    this.logout({
                        confirm: this.logoutConfirm,
                        vm: this
                    });
                }
            },
		 logout() {
		      this.$confirm('确定注销并退出系统吗？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$store.dispatch('LogOut').then(() => {
              //清空cookie
              Cookies.remove('userInfo');
              location.href= "/login"
             })

      })
    }
        }
    }
</script>
<style>
.i-layout-header-user .ivu-select-dropdown{
	margin-top: 25px!important;
	}
</style>
<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 10px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 30px;
          height: 30px;
          border-radius: 0px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
.ivu-dropdown .ivu-select-dropdown {
    overflow: visible;
    max-height: none;
    margin-top: 22px!important;
}
</style>
