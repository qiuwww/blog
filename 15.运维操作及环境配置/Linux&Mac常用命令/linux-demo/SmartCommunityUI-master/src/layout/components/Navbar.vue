
<template>
   <Header class="i-layout-header" :class="headerClasses" :style="headerStyle" v-resize="handleHeaderWidthChange" style="height:50px">                  
       <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />	
       <!--<i-header-search />-->
	   <div class="i-layout-header-right" style="float:right;margin-right: 20px;">                              		 
		 <i-header-fullscreen />
         <i-header-notice /> 
         <i-header-user />		 
	  </div>
    </Header>
</template>

<script>
   import { mapGetters } from 'vuex'
   import Breadcrumb from '@/components/Breadcrumb'
   import Hamburger from '@/components/Hamburger'
// import Github from '@/components/Github'
   import Screenfull from '@/components/Screenfull'
   import SizeSelect from '@/components/SizeSelect'
   import Search from '@/components/HeaderSearch'
   import MessageTip from '@/layout/components/message-tip.vue'
   import iHeaderNotice from '@/components/header-notice'
   import iHeaderFullscreen from '@/components/header-fullscreen'
   import iHeaderUser from '@/components/header-user';
   import Avatar from '@/assets/images/avatar.png'
   import iHeaderSearch from '@/components/header-search';
   
export default {
  components: {
        Breadcrumb,
        MessageTip,
        Hamburger,
        Screenfull,
        SizeSelect,
        Search,
		iHeaderSearch,
		iHeaderNotice,
		iHeaderFullscreen,
		iHeaderUser
    //  Github
  },
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
    show: {
      get() {
        return this.$store.state.settings.showSettings
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'showSettings',
          value: val
        })
      }
    },
    mesCount() {
      return this.$store.state.app1.messageCount;
      //return 0;
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    open() {
      this.$confirm('确定注销并退出系统吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.logout()
      })
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
         location.href='/dashboard'
      })
    },
	handleHeaderWidthChange () {
                const $breadcrumb = this.$refs.breadcrumb;
                if ($breadcrumb) {
                    $breadcrumb.handleGetWidth();
                    $breadcrumb.handleCheckWidth();
                }
                const $menuHead = this.$refs.menuHead;
                if ($menuHead) {
                    // todo $menuHead.handleGetMenuHeight();
                }
            },
    headerStyle () {
                const menuWidth = this.isHeaderStick ? 0 : this.menuCollapse ? 80 : Setting.menuSideWidth;
                return this.isMobile || !this.headerFix ? {} : {
                    width: `calc(100% - ${menuWidth}px)`
                };
            },
headerClasses () {
                return [
                    `i-layout-header-color-${this.headerTheme}`,
                    {
                        'i-layout-header-fix': this.headerFix,
                        'i-layout-header-fix-collapse': this.headerFix && this.menuCollapse,
                        'i-layout-header-mobile': this.isMobile,
                        'i-layout-header-stick': this.isHeaderStick && !this.isMobile,
                        'i-layout-header-with-menu': this.headerMenu,
                        'i-layout-header-with-hide-sider': this.hideSider || this.isDelayHideSider
                    }
                ];
            }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
	.message-con{
		display: inline-block;
    padding: 0 8px;
    height: 100%;
    font-size: 18px;
    color: #5a5e66;
    vertical-align: text-bottom;
    cursor: pointer;
		i {
			vertical-align: middle;
		}
	}

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
</style>
