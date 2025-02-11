<template>
    <div class="page-account">
        <div v-if="showI18n" class="page-account-header">
            <i-header-i18n />
        </div>
        <div class="page-account-container">
            <div class="page-account-top">
                <div class="page-account-top-logo">
                    <img src="@/assets/images/logo.png" alt="logo">
                </div>
                <div class="page-account-top-desc">iView Admin Pro 企业级中台前端/设计解决方案</div>
            </div>
            <Login @on-submit="handleSubmit">
                <UserName name="username" value="admin" />
                <Password name="password" value="admin" enter-to-submit />
                <div class="page-account-auto-login">
                    <Checkbox v-model="autoLogin" size="large">{{ $t('page.login.remember') }}</Checkbox>
                    <a href="">{{ $t('page.login.forgot') }}</a>
                </div>
                <Submit>{{ $t('page.login.submit') }}</Submit>
            </Login>
            <div class="page-account-other">
                <span>{{ $t('page.login.other') }}</span>
                <img src="@/assets/svg/icon-social-wechat.svg" alt="wechat">
                <img src="@/assets/svg/icon-social-qq.svg" alt="qq">
                <img src="@/assets/svg/icon-social-weibo.svg" alt="weibo">
                <router-link class="page-account-register" :to="{ name: 'register' }">{{ $t('page.login.signup') }}</router-link>
            </div>
        </div>
        <i-copyright />
    </div>
</template>
<script>
    import iCopyright from '@/components/copyright';
    import { mapActions } from 'vuex';
    import mixins from '../mixins';

    export default {
        mixins: [ mixins ],
        components: { iCopyright },
        data () {
            return {
                autoLogin: true
            }
        },
        methods: {
            ...mapActions('admin/account', [
                'login'
            ]),
            /**
             * @description 登录
             * 表单校验已有 iView Pro 自动完成，如有需要修改，请阅读 iView Pro 文档
             */
            handleSubmit (valid, values) {
                if (valid) {
                    // const { username, password } = values;
                    // this.login({
                    //     username,
                    //     password
                    // })
                    //     .then(() => {
                    //         // 重定向对象不存在则返回顶层路径
                    //         this.$router.replace(this.$route.query.redirect || '/');
                    // });


                }
            }
        }
    };
</script>
