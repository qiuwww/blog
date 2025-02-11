<template>
  <div class="zhsqLogin">
    <card class="cardView" :padding="30">
      <Row type="flex" justify="space-between">
        <!--左侧-->
        <Col span="12" class="leftCard">
          <!--<p class="leftLogo">智慧治理网格平台</p>-->
          <a href="/index"><img src="../assets/images/logo-small.png" alt="logo" width="45" height="45"></a>
          <div class="sign-up-divide-line"></div>
          <div class="sign-up-title">智慧治理网格平台</div>
          <div class="leftImg">
            <img src="../assets/images/login-img.png" width="100%">
          </div>
          <p class="ulTitle">平台主要功能介绍：</p>
          <ul>
            <li class="cardLi" v-for="(item,i) in myLi" :key="i">
              {{item}}
              <Icon type="md-checkmark" class="liIcon"/>
            </li>
          </ul>
          <!--<p class="leftBottom">
             技术支持：泸州市数字经济发展局
          </p>-->
        </Col>

        <!--分割线-->
        <div class="separateCard">
          <Divider type="vertical" class="cardDivider"/>
        </div>

        <!--右侧-->
        <Col span="11" class="rightCard">
          <p class="rightTitle">请使用市、区、街道、社区账号登录</p>
          <div class="steps">
            <div class="leftStep" :class="{activation: true}">
              <div class="stepCircle">1</div>
              <span>账号登录</span>
            </div>
            <Icon type="ios-arrow-forward" class="stepIcon"/>
            <div class="rightStep" :class="{activation: false}">
              <div class="stepCircle">2</div>
              <span>短信登录</span>
            </div>
          </div>
          <Form ref="form" :model="loginForm" :rules="rules" label-position="top" class="formCard">
            <FormItem label="用户名" prop="username">
              <Input v-model="loginForm.username" placeholder="请输入用户名" size="large" @on-enter="submitForm"></Input>
            </FormItem>
            <FormItem label="密码" prop="password">
              <Input type="password" v-model="loginForm.password" size="large" placeholder="请输入密码" @on-enter="submitForm"></Input>
            </FormItem>
            <FormItem class="submitItem">
              <Button type="primary" size="large" @click="submitForm" :loading="loading">登录验证</Button>
              <!--<span>已有账号，直接<a>登录</a></span>-->
            </FormItem>
          </Form>
        </Col>
      </Row>
    </card>
  </div>
</template>

<script>
  import mixins from '@/mixins/app';
  import iCopyright from '@/components/copyright';
  import {encrypt} from '@/utils/rsaEncrypt'
  import {getCodeImg} from '@/api/login'
  import Cookies from 'js-cookie'
  import {buildMenus} from '@/api/system/menu'

  export default {
    name: "login",
    mixins: [mixins],
    components: {iCopyright},
    data() {
      return {
        myLi: [
          '多网合一 ，一网统管',
          '全域共治，业务协同'
        ],
        loginForm: {
          username: '',
          password: '',
          rememberMe: false,
          code: '',
          uuid: ''
        },
        rules: {
          username: [
            { required: true, message: '用户名不能为空', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '密码不能为空', trigger: 'blur' }
          ]
        },
        loading: false,
        cookiePass: '',
        redirect: undefined
      }
    },
    created() {
      this.getCode();
      this.getCookie();
    },
    methods: {
      getCode(){
        getCodeImg().then(res => {
          this.codeUrl = res.img;
          this.uuid = res.uuid;
        })
      },
      getCookie(){
        let username = Cookies.get('username');
        let password = Cookies.get('password');
        let rememberMe = Cookies.get('rememberMe');
        //保存cookie里面的加密后的密码
        this.cookiePass = password === undefined ? '' : password;
        password = password === undefined ? this.loginForm.password : password;
        this.loginForm.username = username === undefined ? this.loginForm.username : username;
        this.loginForm.password = password;
        this.loginForm.rememberMe = rememberMe === undefined ? false : Boolean(rememberMe);
        this.loginForm.code = ''
      },
      submitForm (){
        this.$refs['form'].validate((valid) => {
          if(valid) {
            this.loading = true;
            let user = {
              username: this.loginForm.username,
              password: this.loginForm.password,
              rememberMe: true,
              code: this.loginForm.code,
              uuid: this.uuid
            }
            //加密密码
            if (user.password !== this.cookiePass) {
              user.password = encrypt(user.password);
            }
            //后台请求
            /*try {
              request({
                url: '/auth/loginMap',
                method: 'get',
                params:user,
              }).then(function(res) {
                this.loading = false;
                if(res.code === 200){
                  // _this.$router.push({path: '/dashboard'});
                  // var commit= { commit };
                  commit('SET_TOKEN', res.data.token);
                  commit('SET_LOAD_MENUS', true);
                  this.$router.push({path:'/'});
                }else{
                  this.$Message.error(res.msg);
                }
              });
            }catch (e) {
              this.loading = false;
            }*/

            this.$store.dispatch('Login', user).then(res => {
              if (res.code == 500) {
                this.$Message.error(res.msg)
                this.getCode();
                return
              }

              buildMenus().then(res => {
                let headMenu = [];
                for (let i = 0; i < res.length; i++){
                  if (res[i].level == 0){
                    headMenu.push(res[i]);
                    break;
                  }
                }
                //跳转原访问页面
                this.$router.push({path: headMenu[0].path});
              });
              this.loading = false;
            }).catch(() => {
              this.getCode();
              this.loading = false;
            });
          }
        })
      }
    },
    watch: {
      $route: {
        handler: function (route) {
          this.redirect = route.query && route.query.redirect
        },
        immediate: true
      }
    }
  }
</script>

<style lang="less">
  .zhsqLogin {
    position: relative;
    height: 100%;

    .cardView {
      width: 55vw;
      min-width: 700px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      /*左侧*/
      .leftCard {
        padding: 0 10px;

        .leftLogo {
          font-size: 24px;
          color: #000;
          font-weight: bold;
        }
        .sign-up-title{
        	width: 200px;
          height: 32px;
          font-size: 24px;
          font-weight: 600;
          line-height: 32px;
          letter-spacing: .75px;
          color: #212326;
          display: inline-block;
          vertical-align: middle;
        }
        .sign-up-divide-line {
          display: inline-block;
          vertical-align: middle;
          width: 2px;
          height: 20px;
          background-color: #242629;
          margin: 0 10px;
}
        .leftImg {
          text-align: center;
        }

        .ulTitle {
          margin: 10px 0;
          font-weight: bold;
          font-size: 16px;
          color: #000;
        }

        .cardLi {
          border-bottom: 1px solid #edeff2;
          padding: 10px 0;

          .liIcon {
            float: right;
            color: #2d8cf0;
            font-weight: bold;
            font-size: 16px;
          }
        }

        .leftBottom {
          margin-top: 50px;
          color: #8d9199;
          text-align: justify;
        }
      }

      /*分隔线*/
      .separateCard {
        display: flex;

        .cardDivider {
          height: 100%;
        }
      }

      /*右侧*/
      .rightCard {
        padding: 0 10px;

        .rightTitle{
          font-size: 16px;
          color: #000;
          font-weight: bold;
        }

        .steps{
          border-bottom:solid 1px #b4b9c2;
          margin-top: 20px;
          display: flex;
          justify-content: space-around;

          .leftStep{
            display: flex;
            width: 100%;
            padding: 10px 0;
            justify-content: center;
            color: #c5c8ce;

            .stepCircle{
              width: 18px;
              height: 18px;
              border-radius: 50%;
              background-color: #c5c8ce;
              color: #FFFFFF;
              text-align: center;
              font-size: 12px;
              margin-right: 10px;
            }
          }

          .stepIcon{
            padding: 10px 0;
          }

          .rightStep{
            display: flex;
            width: 100%;
            padding: 10px 0;
            justify-content: center;
            color: #c5c8ce;

            .stepCircle{
              width: 18px;
              height: 18px;
              border-radius: 50%;
              background-color: #c5c8ce;
              color: #FFFFFF;
              text-align: center;
              font-size: 12px;
              margin-right: 10px;
            }
          }

          .activation{
            color: #000;
            border-bottom: 3px solid #2b85e4;
            .stepCircle{
              background-color: #2b85e4;
            }
          }
        }

        .formCard{
          margin-top: 20px;

          .ivu-form-item {
            margin-bottom: 24px!important;
          }

          .submitItem{
            margin-top: 50px;

            button{
              width: 100%;
            }
          }

          .ivu-form-item-label{
            padding: 0;
            font-weight: normal;
            color: #000;
          }
        }
      }
    }
  }
</style>
