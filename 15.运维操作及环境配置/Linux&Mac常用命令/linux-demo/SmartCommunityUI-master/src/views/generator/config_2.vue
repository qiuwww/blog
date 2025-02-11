<style>
  .ivu-card-extra {
    top: 9px !important;
  }
</style>
<template>
  <div class="app-container" style="background: #eee;">
    <Row>
      <Col style="padding: 20px;">
        <Card shadow>
          <p slot="title">字段配置：{{ tableName }}</p>
          <div slot="extra">
            <Tooltip effect="dark" content="数据库中表字段变动时使用该功能" placement="top-start">
              <Button
                :loading="syncLoading"
                icon="md-sync"
                type="info"
                @click="sync">同步
              </Button>
            </Tooltip>
            <Button
              :loading="columnLoading"
              icon="md-checkmark"
              type="primary"
              @click="saveColumnConfig">保存
            </Button>
            <Button
              :loading="genLoading"
              icon="ios-send"
              type="success"
              @click="toGen">保存&生成
            </Button>
          </div>

          <Table border ref="person_table" :columns="fieldColumns" :data="fieldData" :max-height="tableHeight"
                 :loading="tableLoading"
                 style="width: 100%;margin-bottom: 15px">
          </Table>
        </Card>
      </Col>

      <Col style="padding: 0 20px 20px 20px;">
        <Card shadow>
          <p slot="title">生成配置</p>
          <div slot="extra">
          <Button
            :loading="configLoading"
            icon="md-checkmark"
            type="primary"
            @click="doSubmit">保存
          </Button>
          </div>
          <Form ref="form" :model="form" :rules="rules" :label-width="100">
            <Form-Item label="作者名称" prop="author">
              <Input v-model="form.author" style="width: 40%"/>
              <span style="color: #C0C0C0;margin-left: 10px;">类上面的作者名称</span>
            </Form-Item>
            <Form-Item label="模块名称" prop="moduleName">
              <Input v-model="form.moduleName" style="width: 40%"/>
              <span style="color: #C0C0C0;margin-left: 10px;">模块的名称，请选择项目中已存在的模块</span>
            </Form-Item>
            <Form-Item label="至于包下" prop="pack">
              <Input v-model="form.pack" style="width: 40%"/>
              <span style="color: #C0C0C0;margin-left: 10px;">项目包的名称，生成的代码放到哪个包里面</span>
            </Form-Item>
            <Form-Item label="接口名称" prop="apiAlias">
              <Input v-model="form.apiAlias" style="width: 40%"/>
              <span style="color: #C0C0C0;margin-left: 10px;">接口的名称，用于控制器与接口文档中</span>
            </Form-Item>
            <Form-Item label="前端路径" prop="path">
              <Input v-model="form.path" style="width: 40%"/>
              <span style="color: #C0C0C0;margin-left: 10px;">输入views文件夹下的目录，不存在即创建</span>
            </Form-Item>
            <!--            <Form-Item label="接口目录">-->
            <!--              <Input v-model="form.apiPath" style="width: 40%" />-->
            <!--              <span style="color: #C0C0C0;margin-left: 10px;">Api存放路径[src/api]，为空则自动生成路径</span>-->
            <!--            </Form-Item>-->
            <Form-Item label="去表前缀" prop="prefix">
              <Input v-model="form.prefix" placeholder="默认不去除表前缀" style="width: 40%"/>
              <span style="color: #C0C0C0;margin-left: 10px;">默认不去除表前缀，可自定义</span>
            </Form-Item>
            <Form-Item label="是否覆盖" prop="cover">
              <i-switch size="large" v-model="form.cover">
                <span slot="open">是</span>
                <span slot="close">否</span>
              </i-switch>
              <span style="color: #C0C0C0;margin-left: calc(40% - 45px);">谨防误操作，请慎重选择</span>
            </Form-Item>
          </Form>
        </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
    import {update,get} from '@/api/generator/genConfig'
    import {getFieldData} from '@/api/generator/generator'
    import {save, sync, generator} from '@/api/generator/generator'
    import {getDicts} from '@/api/system/dict'

    export default {
        name: 'GeneratorConfig',
        components: {},
        data() {
            return {
                tableLoading: false,
                fieldData: [],
                fieldColumns: [
                    {
                        title: '字段名称',
                        align: 'left',
                        key: 'columnName',
                        minWidth: 220
                    },
                    {
                        title: '字段类型',
                        align: 'center',
                        key: 'columnType',
                        width: 120
                    },
                    {
                        minWidth: 250,
                        title: '字段描述',
                        align: 'center',
                        key: 'remark',
                        render: (h, params) => {
                            return h('div', [
                                h('Input', {
                                    props: {
                                        placeholder: '请输入字段描述',
                                        value: params.row.remark
                                    },
                                    style: {},
                                    on: {
                                        input: (val) => {
                                            this.fieldData[params.index].remark = val;
                                        },
                                    }
                                })
                            ]);
                        }
                    },
                    {
                        title: '必填',
                        align: 'center',
                        key: 'notNull',
                        width: 65,
                        render: (h, params) => {
                            return h('div', [
                                h('Checkbox', {
                                    props: {
                                        value: params.row.notNull
                                    },
                                    style: {},
                                    on: {
                                        'on-change': (val) => {
                                            this.fieldData[params.index].notNull = val;
                                        },
                                    }
                                })
                            ]);
                        }
                    },
                    {
                        title: '列表',
                        align: 'center',
                        key: 'listShow',
                        width: 65,
                        render: (h, params) => {
                            return h('div', [
                                h('Checkbox', {
                                    props: {
                                        value: params.row.listShow
                                    },
                                    style: {},
                                    on: {
                                        'on-change': (val) => {
                                            this.fieldData[params.index].listShow = val;
                                        },
                                    }
                                })
                            ]);
                        }
                    },
                    {
                        title: '表单',
                        align: 'center',
                        key: 'formShow',
                        width: 65,
                        render: (h, params) => {
                            return h('div', [
                                h('Checkbox', {
                                    props: {
                                        value: params.row.formShow
                                    },
                                    style: {},
                                    on: {
                                        'on-change': (val) => {
                                            this.fieldData[params.index].formShow = val;
                                        },
                                    }
                                })
                            ]);
                        }
                    },
                    {
                        title: '表单类型',
                        key: 'formType',
                        minWidth: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('Select', {
                                    props: {
                                        value: params.row.formType,
                                        transfer:true
                                    },
                                    on: {
                                        'on-change': (event) => {
                                            this.fieldData[params.index].formType = event;
                                        }
                                    },
                                },
                                this.formTypeList.map((item) => {
                                    return h('Option', {
                                        props: {
                                            value: item.value,
                                            label: item.label
                                        }
                                    }, item.label)
                                })
                            )
                        }
                    },
                    {
                        title: '查询方式',
                        key: 'queryType',
                        minWidth: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('Select', {
                                    props: {
                                        value: params.row.queryType,
                                        transfer:true
                                    },
                                    on: {
                                        'on-change': (event) => {
                                            this.fieldData[params.index].queryType = event;
                                        }
                                    },
                                },
                                this.queryTypeList.map((item) => {
                                    return h('Option', {
                                        props: {
                                            value: item.value,
                                            label: item.label
                                        }
                                    }, item.label)
                                })
                            )
                        }
                    },
                    {
                        title: '日期注解',
                        key: 'dateAnnotation',
                        minWidth: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('Select', {
                                    props: {
                                        value: params.row.dateAnnotation,
                                        transfer:true
                                    },
                                    on: {
                                        'on-change': (event) => {
                                            this.fieldData[params.index].dateAnnotation = event;
                                        }
                                    },
                                },
                                this.dateAnnotationList.map((item) => {
                                    return h('Option', {
                                        props: {
                                            value: item.value,
                                            label: item.label
                                        }
                                    }, item.label)
                                })
                            )
                        }
                    },
                    {
                        title: '关联字典',
                        key: 'dictName',
                        minWidth: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('Select', {
                                    props: {
                                        value: params.row.dictName,
                                        transfer:true
                                    },
                                    on: {
                                        'on-change': (event) => {
                                            this.fieldData[params.index].dictName = event;
                                        }
                                    },
                                },
                                this.dictNameList.map((item) => {
                                    return h('Option', {
                                        props: {
                                            value: item.name,
                                            label: item.remark === '' ? item.name : item.remark
                                        }
                                    }, item.remark === '' ? item.name : item.remark)
                                })
                            )
                        }
                    },
                ],
                activeName: 'first',
                tableName: '',
                tableHeight: 550,
                columnLoading: false,
                configLoading: false,
                dicts: [],
                syncLoading: false,
                genLoading: false,
                form: {
                    id: null,
                    tableName: '',
                    author: '',
                    pack: '',
                    path: '',
                    moduleName: '',
                    cover: false,
                    apiPath: '',
                    prefix: '',
                    apiAlias: null
                },
                rules: {
                    author: [
                        {required: true, message: '作者不能为空', trigger: 'blur'}
                    ],
                    pack: [
                        {required: true, message: '包路径不能为空', trigger: 'blur'}
                    ],
                    moduleName: [
                        {required: true, message: '包路径不能为空', trigger: 'blur'}
                    ],
                    path: [
                        {required: true, message: '前端路径不能为空', trigger: 'blur'}
                    ],
                    apiAlias: [
                        {required: true, message: '接口名称不能为空', trigger: 'blur'}
                    ],
                    cover: [
                        {required: true,type:"boolean", message: '不能为空', trigger: 'change'}
                    ]
                },
                formTypeList: [{label: "文本框", value: "Input"}, {label: "文本域", value: "Textarea"}, {
                    label: "单选框",
                    value: "Radio"
                }, {label: "下拉框", value: "Select"}, {label: "日期框", value: "Date"}],
                queryTypeList: [{label: "=", value: "="}, {label: "!=", value: "!="}, {
                    label: ">=",
                    value: ">="
                }, {label: "<=", value: "<="}, {label: "Like", value: "Like"}, {
                    label: "NotNull",
                    value: "NotNull"
                }, {label: "BetWeen", value: "BetWeen"}],
                dateAnnotationList: [{label: "自动创建时间", value: "CreationTimestamp"}, {
                    label: "自动更新时间",
                    value: "UpdateTimestamp"
                }],
                dictNameList: []
            }
        },
        created() {
            this.tableHeight = document.documentElement.clientHeight - 385;
            this.tableName = this.$route.params.tableName;
            this.$nextTick(() => {
                get(this.tableName).then(data => {
                    this.form = data;
                })

                getDicts().then(data => {
                    this.dictNameList = data;
                });
                this.tableLoading = true;
                getFieldData(this.tableName).then(res => {
                    this.fieldData = res.content;
                }).finally(res => {
                    this.tableLoading = false;
                })
            })
        },
        methods: {
            //     beforeInit() {
            //         this.url = '/api/generator/columns'
            //         const tableName = this.tableName
            //         this.params = {tableName}
            //         return true
            //     },
            saveColumnConfig() {
                this.columnLoading = true;
                save(this.fieldData).then(res => {
                    this.$Message.success("保存成功");
                    this.columnLoading = false;
                }).catch(err => {
                    this.$Message.error("保存失败");
                    this.columnLoading = false;
                })
            },
            doSubmit() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.form.tableName = this.tableName;
                        this.configLoading = true;
                        update(this.form).then(res => {
                            this.$Message.success('保存成功');
                            this.form = res;
                            this.form.cover = this.form.cover;
                            this.configLoading = false;
                        }).catch(err => {
                            this.configLoading = false;
                        })
                    }
                })
            },
            sync() {
                this.syncLoading = true;
                sync([this.tableName]).then(() => {
                    this.tableLoading = true;
                    getFieldData(this.tableName).then(res => {
                        this.fieldData = res.content;
                        this.$Message.success("同步成功");
                        this.syncLoading = false;
                    }).catch(() => {
                        this.$Message.error("同步失败");
                        this.syncLoading = false;
                    }).finally(res => {
                        this.tableLoading = false;
                    });
                }).catch(() => {
                    this.$Message.error("同步失败");
                    this.syncLoading = false;
                })
            },
            toGen() {
                this.genLoading = true;
                save(this.fieldData).then(res => {
                    this.$Notice.success({
                        desc: '保存成功'
                    });
                    // 生成代码
                    generator(this.tableName, 0).then(data => {
                        this.genLoading = false;
                        this.$Notice.success({
                            desc: '生成成功'
                        });
                    }).catch(err => {
                        this.$Notice.error({
                            desc: '生成失败'
                        });
                        this.genLoading = false
                    })
                }).catch(err => {
                    this.$Notice.error({
                        desc: '保存失败'
                    });
                    this.genLoading = false;
                })
            }
        }
    }
</script>

