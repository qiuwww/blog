<style lang="less" scoped>
  .lookTComponentmanagement{
    .form-item-input {
      width: 200px;
    }
    .ivu-form .ivu-form-item-label {
      width: 120px;
    }
    .ivu-select {
      width: 180px;
    }
    .ivu-description-term{
      padding-bottom: 30px !important;
    }
    .ivu-form-item{
      margin-bottom: 0 !important;
    }

    .imageVideoView{
      height: 15vh;
      width: 8vw;
      /*border: 1px solid rgb(192,192,192);*/
    }
    .upImgView {
    }
    .textImageVideo{
      /*text-align: center;*/
      /*margin-top: 5.5vh*/
    }
    .textImageVideoNo{
      overflow:hidden;
      text-overflow:ellipsis;
      white-space:nowrap;
    }

    .imgWrap:hover .shadow {
      display: block;
      z-index: 3;
      width: 100%;
    }

    .imgWrap {
      position: relative;
      width: 150px;
      border: 1px dashed rgb(204, 204, 204);
      margin-left: 20px;
      height: 140px;
      line-height: 93px;
      margin-top: 4px;
      text-align: center;
      color: #ccc;
      user-select: none;
      font-size: 12px;
      margin-left: 0px;
    }

    .ivu-form-item-content {
      position: relative;
      line-height: 32px;
      font-size: 14px;
      white-space: nowrap;
    }
    /*.ivu-form-item-content {
      position: relative;
      line-height: 32px;
      font-size: 14px;
      margin-left: 125px;
    }*/
  }
</style>
<template>
  <Modal v-model="show" :title="editTitle" :mask-closable="true" class="lookTComponentmanagement" :width="600" :draggable="false">
    <Form ref="tComponentmanagementForm" :model="tComponentmanagementForm" :label-width="125">
      <Row>
        <Col span="12">
          <FormItem label="类型名称" prop="name">
            {{tComponentmanagementForm.name}}
          </FormItem>
        </Col>
        <div v-if="TComponentmanagementParentName != ''">
          <Col span="12">
              <FormItem label="上级名称" prop="imgUrl" style="white-space: nowrap;" >
                {{TComponentmanagementParentName}}
              </FormItem>
          </Col>
        </div>
<!--      </Row>-->
<!--      <row>-->

        <div v-if="tComponentmanagementForm.imgUrl">
          <Col span="24">
            <FormItem label="部件图标" prop="imgUrl">
              <Row>
                  <div v-if="imageUrlList.length>0" v-viewer="{movable: false}" class="imgWrap">
                    <div class="shadow">
                      <Icon type="ios-eye-outline" size="40" color="#fff" @click.native="handleView()"/>
                    </div>
                    <img v-for="(item, i)  in imageUrlList" :key="Math.random()" :src="item" class="upImg">
                  </div>
              </Row>
            </FormItem>
          </Col>
        </div>
        <div v-if="!tComponentmanagementForm.imgUrl">
          <Col span="12">
            <FormItem label="部件图标" prop="imgUrl" :label-width="184">
              <Row>
                <div>
                  <div class="textImageVideoNo">
                    暂无图标
                  </div>
                </div>
              </Row>
            </FormItem>
          </Col>
        </div>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="创建时间" prop="createTime">
            {{tComponentmanagementForm.createTime}}
          </FormItem>
        </Col>
        <!--<Col span="12">
          <FormItem label="排序码" prop="sortCode" :label-width="95">
            {{tComponentmanagementForm.sortCode}}
          </FormItem>
        </Col>-->
      </Row>
    </Form>
    <div slot="footer">
      <Button type="text" @click="show=false">取消</Button>
      <Button type="primary" v-if="false">确定</Button>
    </div>
  </Modal>
</template>
<script>
  import {getTComponentmanagement} from '@/api/zhsq/tComponentmanagement/tComponentmanagement'
  import { formartDate } from '@/api/tools/tool'
  export default {
    name: "lookTComponentmanagement",
    props: {
      value: {
        type: Boolean,
        default: false
      },
      TComponentmanagementId: {
        type: String
      },
      TComponentmanagementParentName: {
        type: String
      },
      modalTitle: {
        type: String
      }
    },
    data() {
      return {
        show: this.value,
        editTitle: this.modalTitle,
        tComponentmanagementForm: {
          id:'',
          pid:'',
          parentName:'',
          name:'',
          sortCode:'',
          imgUrl:'',
          createTime:'',
        },
        imageUrlList: [],
      }
    },
    methods: {
      // 图片查看
      handleView() {
        const viewer = this.$el.querySelector('.imgWrap').$viewer;
        viewer.show();
      },
      closeModal(val) {
        this.$emit('input', val);
      },
      initForm(){
        this.tComponentmanagementForm= {
          id:'',
          pid:'',
          parentName:'',
          name:'',
          sortCode:'',
          imgUrl:'',
          createTime:'',
        };
      },
    },
    watch: {
      value(val) {
        this.show = val;
      },
      show(val) {
        this.initForm();
        this.editTitle = this.modalTitle;
        if(val) {
          if(this.TComponentmanagementId!=null&&this.TComponentmanagementId.trim().length>0){
            getTComponentmanagement({id: this.TComponentmanagementId}).then(res => {
              if (res && res.code == 200) {
                this.tComponentmanagementForm.name = res.data.name;
                this.tComponentmanagementForm.sortCode = res.data.sortCode;
                this.tComponentmanagementForm.imgUrl = res.data.imgUrl;
                if(res.data.imgUrl){
                  this.imageUrlList = [];
                  // this.imageUrlList.push('http://192.168.1.147:8013' + res.data.imgUrl);
                  this.imageUrlList.push(res.data.imgUrl);
                }else{
                  this.imageUrlList = [];
                }
                if(res.data.createTime){
                  this.tComponentmanagementForm.createTime = formartDate(new Date(res.data.createTime).getTime(), 'yyyy-MM-dd hh:mm:ss');
                }else{
                  this.tComponentmanagementForm.createTime = null;
                }
                // this.tComponentmanagementForm.createTime = res.data.createTime;
              } else {
                this.$Message.error(res.msg);
              }
            });
          }
        } else {
          this.closeModal(val);
        }
      }
    }
  }
</script>
