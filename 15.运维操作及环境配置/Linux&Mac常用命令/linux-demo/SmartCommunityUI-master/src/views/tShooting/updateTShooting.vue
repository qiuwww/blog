<style lang="less">
  .tShooting_add {
    .ivu-modal {
      width: 800px !important;
      top: 50%;
      transform: translateY(-50%);
    }

    .ivu-input {
      width: 250px;
    }

    .ivu-form-item-error-tip {
      left: 110px;
    }

    .ivu-form .ivu-form-item-label {
      width: 110px;
    }

    .ivu-input-wrapper {
      width: auto !important;
    }

    .ivu-form-item-content .address_class input, .ivu-form-item-content .address_class textarea {
      width: 634px;
    }

    .mapcontainer {
      z-index: 999999;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .closeBtn {
      position: absolute;
      top: -12px;
      right: -10px;
      font-size: 20px;
      color: #fff;
      width: 20px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      border-radius: 50%;
      background-color: #303833;
    }

    .closeBtn:active {
      background-color: #7f8a83;
    }

    .ivu-btn-icon-only.ivu-btn-large {
      border-style: dashed;
    }

    .play {
      width: 40px;
      height: 40px;
      float: left;
      line-height: 40px;
      border-radius: 50%;
      border: 1px solid #ccc;
      font-size: 24px;
      padding-left: 4px;
      margin-left: 20px;
    }

    .videoLabel {
      position: fixed;
      top: 0px;
      right: -400px;
      z-index: 99;
      width: 400px;
      border-radius: 4px;
    }
  }
</style>
<template>
  <Modal v-model="show" :title="editTitle" :mask-closable="false" class="tShooting_add">
    <Form ref="tShootingForm" :model="tShootingForm" :rules="tShootingFormRule">
      <Row>
        <Col span="12">
          <FormItem label="排查清单名称" prop="name">
            <Input type="text" :maxlength=50 v-model="tShootingForm.name" placeholder="请输入排查清单名称"
                   v-bind:disabled="disabled"/>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="清单编制日期" prop="preparedDate">
            <DatePicker v-model="tShootingForm.preparedDate" type="date" placeholder="请选择" format="yyyy-MM-dd"
                        style="width: 250px"></DatePicker>
          </FormItem>
        </Col>
      </Row>

      <Row>
        <Col span="12">
          <FormItem label="排查清单类别" prop="category">
            <Select v-model="tShootingForm.category" placeholder="请选择" clearable style="width: 250px;"
                    v-bind:disabled="disabled">
              <Option v-for="(item, i) in categoryPriority" :key="item.value" :value="item.label">{{item.label}}
              </Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="检查频率" prop="checkFrequency">
            <Select v-model="tShootingForm.checkFrequency" placeholder="请选择" clearable style="width: 250px;"
                    v-bind:disabled="disabled">
              <Option v-for="(item, i) in checkFrequencyPriority" :key="item.value" :value="item.label">{{item.label}}
              </Option>
            </Select>
          </FormItem>
        </Col>
      </Row>

      <Row>
        <Col span="12">
          <FormItem label="隐患等级" prop="level">
            <Select v-model="tShootingForm.level" placeholder="请选择" clearable style="width: 250px;"
                    v-bind:disabled="disabled">
              <Option v-for="(item, i) in levelPriority" :key="item.value" :value="item.label">{{item.label}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="隐患分类" prop="type">
            <Select v-model="tShootingForm.type" placeholder="请选择" clearable style="width: 250px;"
                    v-bind:disabled="disabled">
              <Option v-for="(item, i) in typePriority" :key="item.value" :value="item.label">{{item.label}}</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="专项分类" prop="classification">
            <Select v-model="tShootingForm.classification" placeholder="请选择" clearable style="width: 250px;"
                    v-bind:disabled="disabled">
              <Option v-for="(item, i) in classificationPriority" :key="item.value" :value="item.label">{{item.label}}
              </Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="隐患坐标点" prop="position">
            <Input type="text" v-model="tShootingForm.position" placeholder="请选择隐患坐标点" icon="md-map"
                   @on-click="checkMap" v-bind:disabled="disabled"/>
          </FormItem>
        </Col>
      </Row>

      <Row>
        <FormItem label="检查地点" prop="address">
          <Input type="text" :maxlength=200 v-model="tShootingForm.address" placeholder="请输入检查地点" class="address_class"
                 v-bind:disabled="disabled"/>
        </FormItem>
      </Row>

      <Row>
        <Col span="12">
          <FormItem label="隐患图片" prop="attach">
            <div>
              <Button type="default" size="large" icon="ios-add" @click="choiceFile()" title="图片上传"
                      style="float: left;"></Button>
              <input ref="filElem" type="file" accept="image/*" id="people-export" @change="fileUpload"
                     style="display: none;"/>
              <!--图片预览-->
              <div class="images2" v-viewer="{movable: true}" style="position:relative;width: 50%;">
                <img v-for="(item, i)  in imageUrlList" :src="item" :key="Math.random()"
                     style="width: 40px;height:40px;position:absolute;top:-2px;right:-36px;">
              </div>
            </div>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="隐患视频" prop="attach">
            <div>
              <Button type="default" size="large" icon="ios-add" @click="choiceVideo()" title="视频上传"
                      style="float: left;"></Button>
              <input ref="videoElem" type="file" accept="video/*" id="video" @change="videoUpload"
                     style="display: none;"/>
              <!--视频预览-->
              <div class="videoShow" v-show="videoShow">
                <Icon type="md-play" class="play" @click="playVideo"/>
              </div>
              <myVideo v-model="videoControl" :modalTitle="title" :videoUrl="videoUrl"></myVideo>
            </div>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <FormItem label="隐患描述" prop="description">
          <Input type="textarea" v-model="tShootingForm.description" placeholder="请输入隐患描述" class="address_class"
                 v-bind:disabled="disabled"/>
        </FormItem>
      </Row>
      <Row>
        <Col span="12">
          <FormItem label="违规部门" prop="depName">
            <Select v-model="tShootingForm.depName" placeholder="请选择" clearable style="width: 250px;" label-in-value
                    @on-change="onDepIdChanged" v-bind:disabled="disabled">
              <Option v-for="(item, i) in depIdPriority" :key="item.id" :value="item.label">{{item.label}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem label="风险等级" prop="riskLevel">
            <Select v-model="tShootingForm.riskLevel" placeholder="请选择" clearable style="width: 250px;"
                    v-bind:disabled="disabled">
              <Option v-for="(item, i) in riskLevelPriority" :key="item.value" :value="item.label">{{item.label}}
              </Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <FormItem label="可能导致事故" prop="mayCause">
          <Input type="textarea" v-model="tShootingForm.mayCause" placeholder="请输入可能导致事故" class="address_class"
                 v-bind:disabled="disabled"/>
        </FormItem>
      </Row>
      <Row>
        <FormItem label="备注" prop="remark">
          <Input type="textarea" v-model="tShootingForm.remark" placeholder="请输入备注" class="address_class"
                 v-bind:disabled="disabled"/>
        </FormItem>
      </Row>
    </Form>
    <div slot="footer" v-if="disabled">
      <Button type="text" @click="show=false">取消</Button>
    </div>
    <div slot="footer" v-if="!disabled">
      <Button type="text" @click="show=false">取消</Button>
      <Button type="primary" :loading="loading" @click="handelSubmit">提交</Button>
    </div>
    <div id="centerDiv" class="mapcontainer" :style="{width:width,height:height}" v-show="mapShow">
      <Map :url="configUrl" :widgetUrl="widgetUrl" @onload="onMapload"/>
      <span class="closeBtn" @click="closeMap">×</span>
    </div>

  </Modal>
</template>
<script>
    import {addTShooting, updateTShooting, getTShooting} from '@/api/tShooting/tShooting'
    import {getDictDataByType} from '@/api/index';
    import Map from "../../components/mars-map/Main.vue";
    import {formartDate, nginxUrl} from '@/api/tools/tool'
    import myVideo from "./myVideo";

    export default {
        name: "updateTShooting",
        components: {
            Map,myVideo
        },
        props: {
            value: {
                type: Boolean,
                default: false
            },
            TShootingId: {
                type: String
            },
            modalTitle: {
                type: String
            }
        },
        data() {
            return {
                title:'',
                //播放视频标签
                videoControl: false,
                //播放器显示或者关闭
                videoShow: false,
                //预览图片
                imageIsUpdate: false,
                videoIsUpdate: false,
                imageUrlList: [],
                videoUrlList: [],
                videoUrl:'',
                viewer: '',
                width: "",
                height: "",
                configUrl: "../config/config.json",
                widgetUrl: "../config/widgetRiskSources.json",
                mapShow: false,
                show: this.value,
                editTitle: this.modalTitle,
                loading: true,
                depIdPriority: [],
                levelPriority: [],
                riskLevelPriority: [],
                classificationPriority: [],
                categoryPriority: [],
                typePriority: [],
                checkFrequencyPriority: [],
                tShootingForm: {
                    level: '',
                    type: '',
                    name: '',
                    position: '',
                    description: '',
                    address: '',
                    depId: '',
                    depName: '',
                    riskLevel: '',
                    mayCause: '',
                    remark: '',
                    imgPath: '',
                    videoPath: '',
                    category: '',
                    classification: '',
                    checkFrequency: '',
                    preparedDate: ''
                },
                tShootingFormRule: this.getTShootingFormRule(),
                pointArr: [],
                disabled: false
            }
        },
        created() {
            this.height = Math.floor(document.body.scrollHeight * 0.95) + "px";
            this.width = Math.floor(document.body.scrollWidth * 0.95) + "px";
        },
        methods: {
            //点击视频播放
            playVideo() {
                this.videoControl = true;
                this.title="隱患視頻";
                this.videoUrl = this.tShootingForm.videoPath;
            },
            //视频选择
            choiceVideo() {
                this.$refs.videoElem.dispatchEvent(new MouseEvent('click'));
            },
            //点击本地上传按钮触发事件
            choiceFile() {
                this.$refs.filElem.dispatchEvent(new MouseEvent('click'));
            },
            //选择本地视频文件进行上传
            videoUpload() {
                let _this = this;
                var videoFile = document.getElementById("video").files[0];
                var fileSize = videoFile.size / 1024 / 1024 < 50;

                if (videoFile) {
                    if (['video/mp4', 'video/ogg', 'video/flv', 'video/avi', 'video/wmv', 'video/rmvb', 'video/mov'].indexOf(videoFile.type) == -1) {
                        this.$Message.error('请上传正确的视频格式');
                        return false;
                    }
                    if (!fileSize) {
                        this.$Message.error('视频大小不能超过50M');
                        return false;
                    }
                    var reader = new FileReader();
                    reader.readAsDataURL(videoFile);
                    reader.onload = () => {
                        _this.videoUrlList = [];
                        _this.videoUrlList.push(reader.result);
                        _this.videoIsUpdate = true;
                        _this.tShootingForm.videoPath = reader.result;
                        //预览显示
                        _this.videoShow = true;
                    }
                }
            },
            //选择本地文件进行上传
            fileUpload() {
                var _this = this;
                const inputFile = this.$refs.filElem.files[0];
                if (inputFile) {
                    var reader = new FileReader();
                    reader.readAsDataURL(inputFile);
                    reader.onload = () => {
                        _this.imageUrlList = [];
                        _this.imageUrlList.push(reader.result);
                        _this.imageIsUpdate = true;
                        _this.tShootingForm.imgPath = reader.result;
                    }
                } else {
                    this.$Message.error('请选择图片');
                }
                this.$refs.filElem.value = null;
            },
            //地图回调
            onMapload(viewer) {
                this.viewer = viewer;
                var _this = this;
                var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
                handler.setInputAction(function (movement) {
                    var ray = viewer.camera.getPickRay(movement.position);
                    var position = viewer.scene.globe.pick(ray, viewer.scene);
                    for (let i = 0; i < _this.pointArr.length; i++) {
                        viewer.entities.remove(_this.pointArr[i]);
                    }
                    _this.addEntieyPoint(position);

                }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
            },
            //添加实体
            addEntieyPoint(position) {
                let formatPositon = mars3d.point.formatPositon(position);
                let _this = this;
                var entitie = viewer.entities.add({
                    name: "",
                    position: position,
                    billboard: {
                        image: '../img/marker/mark3.png',
                        scale: 0.8,
                        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                        verticalOrigin: Cesium.VerticalOrigin.CENTER,
                        heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND
                    },
                    tooltip: {
                        html: '<table style="width: 200px;">' +
                            '   <tr>'
                            + '<th scope="col" colspan="4" style="text-align:center;font-size:15px;"></th></tr><tr>'
                            + '<td >经度：</td><td >' + formatPositon.x + '</td></tr><tr>'
                            + '<td >纬度：</td><td >' + formatPositon.y + '</td></tr><tr>'
                            + '<td >高层：</td><td >' + formatPositon.z + '</td></tr><tr>'
                            + ' </tr>' +
                            '</table>',
                        anchor: [0, -12],
                    },
                    click: function (entity) {//单击
                        _this.$Message.info("坐标信息已保存");
                        _this.tShootingForm.position = '[' + formatPositon.x + ',' + formatPositon.y + ',' + formatPositon.z + "]";
                    }
                });
                this.pointArr.push(entitie);
            },
            getDepIdPriority() {
                //隐患等级
                getDictDataByType('shootingLevel', {}).then(res => {
                    if (res && res.success) {
                        this.levelPriority = res.data;
                    }
                });
                //隐患类别
                getDictDataByType('shootingType', {}).then(res => {
                    if (res && res.success) {
                        this.typePriority = res.data;
                    }
                });
                //部门
                getDictDataByType('do_dept', {}).then(res => {
                    if (res && res.success) {
                        this.depIdPriority = res.data;
                    }
                });
                //风险等级
                getDictDataByType('shootingRiskLevel', {}).then(res => {
                    if (res && res.success) {
                        this.riskLevelPriority = res.data;
                    }
                });
                //排查清单类别
                getDictDataByType('shootingCategory', {}).then(res => {
                    if (res && res.success) {
                        this.categoryPriority = res.data;
                    }
                });
                //专项分类
                getDictDataByType('shootingClassification', {}).then(res => {
                    if (res && res.success) {
                        this.classificationPriority = res.data;
                    }
                });
                //检查频率
                getDictDataByType('shootingCheckFrequency', {}).then(res => {
                    if (res && res.success) {
                        this.checkFrequencyPriority = res.data;
                    }
                });
            },
            handelSubmit() {
                this.$refs['tShootingForm'].validate((valid) => {
                    this.loading = true;
                    if (valid) {
                        if (this.TShootingId != null && this.TShootingId.trim().length > 0) {
                            this.tShootingForm.id = this.TShootingId;
                            //用于判断图片是否修改
                            this.tShootingForm.imageIsUpdate = this.imageIsUpdate;
                            this.tShootingForm.videoIsUpdate = this.videoIsUpdate
                            updateTShooting(this.tShootingForm).then(res => {
                                if (res && res.code == 200) {
                                    this.closeModal(false);
                                    this.$emit('handleSearch');
                                    this.$Message.success('保存成功');
                                } else {
                                    this.$Message.error(res.message);
                                }
                            }).finally(() => {
                                this.loading = false;
                            })
                        } else {
                            addTShooting(this.tShootingForm).then(res => {
                                if (res && res.code == 200) {
                                    this.closeModal(false);
                                    this.$emit('handleSearch');
                                    this.$Message.success('保存成功');
                                } else {
                                    this.$Message.error(res.message);
                                }
                            }).finally(() => {
                                this.loading = false;
                            })
                        }
                    } else {
                        this.loading = false;
                        this.$Message.error('表单验证不通过！');
                    }

                });
            },
            closeModal(val) {
                this.$emit('input', val);
            },
            initForm() {
                this.tShootingForm = {
                    imageUrlList: [],
                    level: '',
                    type: '',
                    name: '',
                    position: '',
                    description: '',
                    address: '',
                    depId: '',
                    depName: '',
                    riskLevel: '',
                    mayCause: '',
                    remark: '',
                    imgPath: '',
                    videoPath: '',
                    category: '',
                    classification: '',
                    checkFrequency: '',
                    preparedDate: ''
                };
            },
            getTShootingFormRule() {
                return {
                    level: [
                        {required: true, message: '隐患等级不能为空！', trigger: 'blur', pattern: /.+/},
                    ],
                    type: [
                        {required: true, message: '隐患类型不能为空！', trigger: 'blur', pattern: /.+/},
                    ],
                    name: [
                        {required: true, message: '隐患名称不能为空！', trigger: 'blur'},
                        {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
                    ],
                    position: [
                        {required: true, message: '隐患坐标点不能为空！', trigger: 'blur'}
                    ],
                    description: [
                        {required: true, message: '隐患描述不能为空！', trigger: 'blur', pattern: /.+/},
                    ],
                    address: [
                        {required: true, message: '检查地点不能为空！', trigger: 'blur'},
                        {type: 'string', max: 200, message: '数据的最大长度为50！', trigger: 'blur'}
                    ],
                    depName: [
                        {required: true, message: '违规部门不能为空！', trigger: 'blur', pattern: /.+/},
                    ],
                    riskLevel: [
                        {required: true, message: '风险等级不能为空！', trigger: 'blur', pattern: /.+/},
                    ],
                    mayCause: [
                        {required: true, message: '可能导致事故不能为空！', trigger: 'blur', pattern: /.+/},
                    ],
                    preparedDate: [
                        {required: true, type: 'date', message: '清单编制日期不能为空！', trigger: 'blur', pattern: /.+/},
                    ],
                    category: [
                        {required: true, message: '清单类别不能为空！', trigger: 'blur', pattern: /.+/},
                    ],
                    checkFrequency: [
                        {required: true, message: '检查频率不能为空！', trigger: 'blur', pattern: /.+/},
                    ],
                    classification: [
                        {required: true, message: '专项分类不能为空！', trigger: 'blur', pattern: /.+/},
                    ],
                    // remark: [
                    //     {required: true, message: '备注不能为空！', trigger: 'blur', pattern: /.+/},
                    // ],
                }
            },
            onDepIdChanged: function (item) {
                if (item) {
                    this.tShootingForm.depId = item.id;
                }
            },
            checkMap: function () {
                this.$Notice.open({
                    title: '提示',
                    desc: '单击地图选择点位，双击或再次点击图标保存点位信息'
                });
                for (let i = 0; i < this.pointArr.length; i++) {
                    this.viewer.entities.remove(this.pointArr[i]);
                }

                if (this.tShootingForm.position) {
                    let parse = JSON.parse(this.tShootingForm.position);
                    let lonlat2cartesian = mars3d.pointconvert.lonlat2cartesian(parse);
                    this.addEntieyPoint(lonlat2cartesian);
                }
                //打开地图选择点位
                this.mapShow = true;
            },
            closeMap() {
                this.mapShow = false;
            },
        },
        watch: {
            value(val) {
                this.show = val;
            },
            show(val) {
                this.getDepIdPriority(),
                    this.initForm();
                this.loading = false;
                this.editTitle = this.modalTitle;
                if (this.editTitle == "查看") {
                    this.disabled = true;
                } else {
                    this.disabled = false;
                }
                if (val) {
                    this.$refs['tShootingForm'].resetFields();
                    if (this.TShootingId != null && this.TShootingId.trim().length > 0) {
                        getTShooting({id: this.TShootingId}).then(res => {
                            this.imageUrlList = [];
                            this.videoShow = false;
                            this.videoControl = false;
                            if (res && res.code == 200) {
                                this.tShootingForm.level = res.data.level;
                                this.tShootingForm.type = res.data.type;
                                this.tShootingForm.name = res.data.name;
                                this.tShootingForm.position = res.data.position;
                                this.tShootingForm.description = res.data.description;
                                this.tShootingForm.address = res.data.address;
                                this.tShootingForm.depId = res.data.depId + "";
                                this.tShootingForm.depName = res.data.depName;
                                this.tShootingForm.riskLevel = res.data.riskLevel;
                                this.tShootingForm.mayCause = res.data.mayCause;
                                this.tShootingForm.remark = res.data.remark;
                                this.tShootingForm.imgPath = res.data.imgPath;
                                this.tShootingForm.category = res.data.category;
                                this.tShootingForm.classification = res.data.classification;
                                this.tShootingForm.checkFrequency = res.data.checkFrequency;
                                this.tShootingForm.preparedDate = formartDate(res.data.preparedDate, 'yyyy-MM-dd');

                                if (this.tShootingForm.imgPath) {
                                    this.imageUrlList.push(nginxUrl + this.tShootingForm.imgPath);
                                }
                                //视频地址
                                if (res.data.videoPath) {
                                    this.tShootingForm.videoPath = res.data.videoPath.indexOf("http://")>-1 ? res.data.videoPath:nginxUrl+ res.data.videoPath;
                                }
                                if (res.data.videoPath) {
                                    this.videoShow = true;
                                }
                            } else {
                                this.$Message.error(res.message);
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
