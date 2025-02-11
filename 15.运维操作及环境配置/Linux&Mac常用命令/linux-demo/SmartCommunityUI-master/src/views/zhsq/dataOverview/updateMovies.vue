<style lang="less" scoped>
  .updateMovies {
    .head_div {
      border-bottom: 1px solid rgb(204, 204, 204);
      box-shadow: 0 1px 2px 0 #ccc;
    }
     .ivu-radio-group{
        margin-bottom: -4px;
      }
  }
</style>
<template>

    <Modal v-model="show" :title="editTitle" :mask-closable="false" :width="550">

      <div class="updateMovies">
        <div style="height: 58px;line-height: 58px; border-bottom: 1px solid rgb(204, 204, 204);margin-bottom: 2px">
          <span class="mySpan" style="margin-top: 22px"></span>
          <p style="float: left;margin-right: 25px">创建设备</p>
        </div>
        <Form ref="tMoviesManagementForm" :label-width="100" :model="tMoviesManagementForm"
              style="margin-left: 40px;" :rules="tMoviesManagementFormRule">
          <Row>
            <Col span="20">
              <FormItem label="视频流类型" prop="type">
                <RadioGroup v-model="tMoviesManagementForm.type">
                  <Radio label="rtsp">rtsp</Radio>
                  <Radio label="hls">hls</Radio>
                  <Radio label="萤石">萤石</Radio>
                  <Radio label="其他">其他</Radio>
                </RadioGroup>
              </FormItem>
            </Col>

          </Row>
<!--          <Row>-->
<!--            <Col span="20">-->
<!--              <FormItem label="设备编号" prop="number">-->
<!--                <Select v-model="tMoviesManagementForm.number" placeholder="请选择" clearable>-->
<!--                  <Option v-for="(item, i) in menuList" :key="i" :value="item.number">{{item.name}}</Option>-->
<!--                </Select>-->
<!--              </FormItem>-->
<!--            </Col>-->
<!--          </Row>-->
          <Row>
            <Col span="20">
              <FormItem label="摄像头名称" prop="name">
                <Input :maxlength=50 type="text"
                       v-model="tMoviesManagementForm.name"
                       placeholder="请输入摄像头名称"/>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="20">
              <FormItem label="appKey" prop="appKey">
                <Input :maxlength=50 type="text"
                       v-model="tMoviesManagementForm.appKey"
                       placeholder="请输入appKey"/>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="20">
              <FormItem label="appSecret" prop="appSecret">
                <Input :maxlength=50 type="text"
                       v-model="tMoviesManagementForm.appSecret"
                       placeholder="请输入appSecret"/>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="20">
              <FormItem label="播放地址" prop="url">
                <Input :maxlength=256 type="text"
                       v-model="tMoviesManagementForm.url"
                       placeholder="例：ezopen://open.ys7.com/e5454646/1.live"/>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="20">
              <FormItem label="设备位置" prop="position">
                <Input v-model="tMoviesManagementForm.position" disabled placeholder="请点击右侧地图标注" icon="md-map"
                       @on-click="checkMap"/>
              </FormItem>
            </Col>
          </Row>

        </Form>
        <!--        <div slot="footer" style="margin-left: 140px">-->
        <!--          <Button type="primary" @click="handelSubmit">提交</Button>-->
        <!--        </div>-->
        <br><br>
      </div>
      <div slot="footer">
        <Button type="text" @click="show=false">取消</Button>
        <Button type="primary" :loading="loading" @click="handelSubmit">提交</Button>
      </div>

      <!-- 地图弹窗 -->
      <plot v-model="showMap" modalTitle="选择坐标点" :menuId="this.menuIdMap" @resultPoint="getPosition"
            divId="TScenicSpotManagement"
            :objData="pointArr"  :selectType="selectTypee"></plot>

    </Modal>

</template>

<script>
  import {
    cameraInfoAdd,
    cameraInfoDelete,
    cameraInfoModify,
    cameraInfoById,
  } from "@/api/wulian";
  import plot from "@/views/gismap/components/plot";

  export default {
    name: "updateMovies",
    props: {
      value: {
        type: Boolean,
        default: false
      },
      tMoviesManagementId: {
        type: Number,
      },
      modalTitle: {
        type: String
      },
    },
    components: {
      plot,
    },
    data() {
      const urlRule = (rule, value, callback)=>{
        if ((value!=null || value.length >0) && this.tMoviesManagementForm.type){
          if (this.tMoviesManagementForm.type == 'rtsp' && value.split(":")[0]!='rtsp'){
            return callback(new Error('请输入rtsp格式的视频连接地址！'))
          }else if(this.tMoviesManagementForm.type == 'hls' && value.split(".")[value.split(".").length-1] != 'm3u8'){
            return callback(new Error('请输入hls格式的视频连接地址！'))
          }else{
            callback()
          }

        }else{
          return callback(new Error('请选择视频连接格式！'))
        }
      }

      return {
        show: this.value,//是否显示
        editTitle: this.modalTitle,//对话框标题
        loading: false,//数据加载
        selectTypee: 'Point',//标记点类型
        pointArr: [],//点位坐标数据
        showMap: false,//地图显示
        menuIdMap: '',//
        tMoviesManagementForm: {//表单值
          name:'',
          type:'',
          number:'',
          appKey:'',
          appSecret:'',
          url:'',
          position: ''
        },
        tMoviesManagementFormRule: {
          name: [
            {required: true, message: '摄像头名称不能为空！', trigger: 'blur'},
            {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
          ],
          type: [
            {required: true, message: '监测视频类型不能为空！', trigger: 'blur'},
            {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
          ],
          // number: [
          //   {required: true, message: '设备编号不能为空！', trigger: 'blur'},
          // ],
          appKey: [
            { pattern: /^[^\u4e00-\u9fa5]+$/, message: '不允许输入中文',trigger: 'blur'},
            {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
          ],
          appSecret: [
            {required: true, message: 'appSecret不能为空！', trigger: 'blur'},
            {type: 'string', max: 50, message: '最大长度为50！', trigger: 'blur'},
            { pattern: /^[^\u4e00-\u9fa5]+$/, message: '不允许输入中文',trigger: 'blur'}
          ],
          position: [
            {required: true, message: '设备位置不能为空！', trigger: 'blur'},
          ],
          url: [
            {validator: urlRule, trigger: 'blur'},
          ],
        },
        menuList: [],//设备编号
      }
    },
    methods: {
      //返回组件表单数据
      closeModal(val) {
        this.$emit('input', val);
      },
      //点击地图图标
      checkMap() {
        if (this.tMoviesManagementForm.position) {
          this.pointArr = JSON.parse(this.tMoviesManagementForm.position);
        }
        this.showMap = true;
      },
      //获取坐标点
      getPosition(obj, type) {
        this.tMoviesManagementForm.position = JSON.stringify(obj.flatCoordinates);
      },

      //初始化表单
      initForm() {
        this.tMoviesManagementForm= {
          id: null,
          // 搜索框对应data对象
          pageNumber: 1, // 当前页数
          pageSize: 10, // 页面大小
          startDate: null,//开始时间
          endDate: null,//结束时间
          sort: 'createTime', // 默认排序字段
          order: 'desc', // 默认排序方式
          name: '',
          type: '',
          number: '',
          appKey: '',
          appSecret: '',
          url: '',
          position: ''
        }
      },
      //查询设备编号列表
      getEquipmentList() {
        // queryTEquipmentManagementList().then(res => {
        //   if (res) {
        //     if (res.code == 200) {
        //       this.menuList = res.data.records
        //     } else {
        //       this.$Message.error(res.msg);
        //     }
        //   } else {
        //     this.$Message.error('获取设备编号列表失败');
        //   }
        // }).catch(err => {
        //   this.$Message.error('获取设备编号列表失败');
        // });
      },

      //提交添加数据
      handelSubmit() {
        this.$refs['tMoviesManagementForm'].validate((valid) => {
          this.loading = true;
          if (valid) {
            if (this.tMoviesManagementId != null) {
              this.tMoviesManagementForm.id = this.tMoviesManagementId;
              cameraInfoModify(this.tMoviesManagementForm).then(res => {
                if (res) {
                  if (res.code == 200) {
                    this.$emit('handleSearch');
                    this.loading = false
                    this.closeModal(false);
                    this.$Message.success('保存成功');
                    this.$refs['tMoviesManagementForm'].resetFields()
                  } else {
                    this.loading = false
                    this.$Message.error(res.msg);
                  }
                } else {
                  this.loading = false
                  this.$Message.error('保存失败');
                }
              }).catch(err => {
                this.loading = false
                this.$Message.error('保存失败');
              });
            }
            else{
              addTMoviesManagement(this.tMoviesManagementForm).then(res => {
                if (res) {
                  if (res.code == 200) {
                    this.$emit('handleSearch');
                    this.loading = false
                    this.closeModal(false);
                    this.$Message.success('保存成功');
                    this.$refs['tMoviesManagementForm'].resetFields()
                  } else {
                    this.loading = false
                    this.$Message.error(res.msg);
                  }
                } else {
                  this.loading = false
                  this.$Message.error('保存失败');
                }
              }).catch(err => {
                this.loading = false
                this.$Message.error('保存失败');
              });
            }
          }else{
            this.loading = false
            this.$Message.error('表单验证失败');
            return
          }
        })
      },
    },

    watch: {
      value(val) {
        this.show = val;
      },
      show(val) {
        this.initForm();
        this.getEquipmentList()
        this.loading = false;
        this.editTitle = this.modalTitle;
        if (this.editTitle == "查看") {
          this.disabled = true;
        } else {
          this.disabled = false;
        }
        if (val) {
          this.$refs['tMoviesManagementForm'].resetFields();
          if (this.tMoviesManagementId != null) {
            cameraInfoById({id: this.tMoviesManagementId}).then(res => {
              if (res && res.code == 200) {
                this.tMoviesManagementForm.name = res.data.name;
                this.tMoviesManagementForm.type = res.data.type;
                this.tMoviesManagementForm.number = res.data.number;
                this.tMoviesManagementForm.appKey = res.data.appKey;
                this.tMoviesManagementForm.appSecret = res.data.appSecret;
                this.tMoviesManagementForm.url = res.data.url;
                this.tMoviesManagementForm.position = res.data.position;
              } else {
                this.$Message.error(res.msg);
              }
            }).catch(err => {
              this.$Message.error('获取监视设备失败');
            });
          }
        } else {
          this.closeModal(val);
        }
      },

    },
    mounted() {
      this.getEquipmentList()
      const that = this
      window.onresize = () => {
        window.screenWidth = document.body.clientWidth

        if (window.screenWidth < 1713) {
          this.overflowApp = {'overflow-x': 'auto'}
        } else {
          this.overflowApp = {'overflow-x': ''}
        }
      }
    },

  }
</script>

