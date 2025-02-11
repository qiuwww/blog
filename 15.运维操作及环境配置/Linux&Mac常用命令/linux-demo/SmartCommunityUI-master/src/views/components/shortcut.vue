<template>
    <div class="dashboard-workplace-shortcut ivu-text-center">
        <Grid :col="3" :border="false" padding="0px">
            <GridItem v-for="(item, i)  in data" :key="item.name" class="ivu-mb">
                 <router-link  :to="item.link">
                    <Icon :custom="item.icon" :color="item.color" size="24" />
                    <p class="ivu-pt-8">{{ item.name }}</p>
                </router-link>
            </GridItem>
        </Grid>
        <!--<Divider class="ivu-mt-8 ivu-mb-8" />
        <Grid :col="4" :border="false" class="ivu-text-center" padding="0px">
            <GridItem v-for="(item, i)  in actions" :key="item.name" class="ivu-mt">
                <i-link :to="item.link">{{ item.name }}</i-link>
            </GridItem>
            <GridItem class="ivu-mt">
                <Button icon="md-add" type="primary" ghost size="small" @click="showAdd = true">添加</Button>
            </GridItem>
        </Grid>
        <Modal title="添加快捷操作" v-model="showAdd" :loading="loading" @on-ok="handleAdd">
            <Form ref="form" :model="newAction" :rules="rules" :label-width="80">
                <FormItem label="名称" prop="name">
                    <Input v-model="newAction.name" placeholder="名称" />
                </FormItem>
                <FormItem label="链接" prop="link">
                    <Input v-model="newAction.link" placeholder="链接" />
                </FormItem>
            </Form>
        </Modal>-->
    </div>
</template>
<script>
    export default {
        data () {
            return {
                data: [
                    {
                        icon: 'i-icon-demo i-icon-demo-dashboard',
                        name: '首页',
                        color: '#52c41a',
                        link: '/dashboard'
                    },
                    {
                        icon: 'i-icon-demo i-icon-demo-form',
                        name: '受理',
                        color: '#1890ff',
                        link: '/form'
                    },
                    {
                        icon: 'i-icon-demo i-icon-demo-list',
                        name: '记录',
                        color: '#faad14',
                        link: '/list'
                    },
//                  {
//                      icon: 'i-icon-demo i-icon-demo-search',
//                      name: '搜索',
//                      color: '#722ed1',
//                      link: '/search'
//                  },
//                  {
//                      icon: 'i-icon-demo i-icon-demo-setting',
//                      name: '设置',
//                      color: '#13c2c2',
//                      link: '/setting'
//                  },
//                  {
//                      icon: 'i-icon-demo i-icon-demo-tool',
//                      name: '工具',
//                      color: '#eb2f96',
//                      link: '/tool'
//                  }
                ],
                actions: [
                    {
                        name: '操作一',
                        link: '/'
                    },
                    {
                        name: '操作二',
                        link: '/'
                    },
                    {
                        name: '操作三',
                        link: '/'
                    },
                    {
                        name: '操作四',
                        link: '/'
                    },
                    {
                        name: '操作五',
                        link: '/'
                    },
                    {
                        name: '操作六',
                        link: '/'
                    }
                ],
                showAdd: false,
                loading: true,
                newAction: {
                    name: '',
                    link: ''
                },
                rules: {
                    name: [
                        { required: true, message: '名称不能为空', trigger: 'blur' }
                    ],
                    link: [
                        { required: true, message: '链接不能为空', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            handleAdd () {
                this.$refs.form.validate((valid) => {
                    this.loading = false;
                    this.$nextTick(() => {
                        this.loading = true;
                    });
                    if (valid) {
                        this.actions.push({
                            name: this.newAction.name,
                            link: this.newAction.link
                        });
                        this.newAction.name = '';
                        this.newAction.link = '';
                        this.$Message.success('添加成功!');
                        this.showAdd = false;
                    }
                })
            }
        }
    }
</script>
<style lang="less">
    .dashboard-workplace-shortcut{
        a{
            &:hover{
                color: #2d8cf0;
            }
        }
    }
</style>
