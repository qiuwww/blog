<template>
  <Modal v-model="show" :title="modalTitle" transfer draggable @on-cancel="cancelModal" class="uploadShp" width="660">
    <Form ref="basicFileForm" :model="basicFileForm">
        <Row>
            <Form-item label="区域名称">
                <TreeSelect v-model="name" :data="areaTypeArr" v-width="503" @on-change="selectDownitem" placeholder="请输入区域名称" />
            </Form-item>
        </Row>
        <Row>
            <Col span="18">
                <FormItem label="文件名称" prop="fileName">
                    <Input type="text" disabled :maxlength=100 v-model="basicFileForm.fileName" placeholder="请点击右侧按钮选择文件"/>
                </FormItem>
            </Col>
            <Col span="6">
                <Upload ref="upload" :before-upload="handleUpload" action="" accept=".json"
                        :on-format-error="handleFormatError">
                    <Button icon="ios-cloud-upload-outline">请选择文件</Button>
                </Upload>
            </Col>
        </Row>
    </Form>
    <div slot="footer">
      <Button type="text" @click="show=false">取消</Button>
      <Button type="primary" :loading="submitLoading" @click="save">提交</Button>
    </div>
  </Modal>
</template>
<script>
    import {addTBasicInformationManagementPatch} from '@/api/zhxc/tBasicInformationManagement/tBasicInformationManagement'
    import {addTScenicSpotManagementPatch} from '@/api/zhxc/tScenicSpotManagement/tScenicSpotManagement'
    import {addTBasicPolylineManagementPatch} from '@/api/zhxc/tBasicPolylineManagement/tBasicPolylineManagement'
    import { getDepts } from "@/api/system/dept";

    export default {
        props: {
            value: {
                type: Boolean,
                default: false
            },
            title: {
                type: String
            },
            menuId: {
                type: Number
            },
            menuName: {
                type: String
            },
            objectType: {
                type: String
            }
        },
        data() {
            return {
                show: false,
                name:"",
                areaTypeArr:[],
                areaId:'',
                submitLoading: false,
                modalTitle: '',
                file: null,
                type: "",
                basicFileForm: {
                    fileName: "",
                },
                tBasicInformationManagementForm: {
                    name: '',
                    position: '',
                    description: '',
                    isDashLien: 0,
                    width: null,
                    color: '',
                    dashLength: null,
                    polygonColor: '',
                    alpha: null,
                    surfaceHeight: null,
                    isDisplayState: 1,
                    isStereoscopic: 0,
                    menuId: null,
                    menuName: '',
                    areaType: this.areaId,
                    isBorder: 0,
                },
                tScenicSpotManagementForm: {
                    menuId: null,
                    menuName: '',
                    icon: '/img/scenicSpotIcon/1.png',
                    isScenery: '0',
                    namePosition: '',
                    pointType: this.areaId,
                    backgroundColor: '',
                    display: '1',
                    titleShow: '',
                    name: '',
                    position: '',
                    url: '',
                    describes: '',
                },
                tBasicPolylineManagementForm: {
                    name: '',
                    position: '',
                    description: '',
                    isDash: 0,
                    width: null,
                    color: '',
                    isDisplayState: 0,
                    menuId: null,
                    menuName: '',
                    areaType:this.areaId,
                    length: null,
                    isShow: 1,
                },
            }
        },
        mounted() {
			this.getlist();
		},
        methods: {
            // 所属地域
			selectDownitem(value) {
				if(value){
					this.areaId = value;
                }else{
                    this.areaId='';
                }
			},
			 // 获取区域数据
			getlist() {
				getDepts({ enabled: true }).then((res) => {
					this.areaTypeArr = this.getTreeData(res.content);
					this.areaTypeArr.unshift({
						title: "首页",
						value: "0",
						expand: false,
						selected: false,
						checked: false,
					});
				});
			},
			//转为tree使用的数据
			getTreeData(data) {
				if (data) {
					for (let i in data) {
					var item = data[i];
					data[i].title = data[i].label;
					data[i].value = data[i].id;
					data[i].expand = true;
					data[i].selected= false;
					data[i].checked=false;
					if (data[i].children) {
						data[i].children = this.getTreeData(data[i].children);
					}
				}
			}
				return data;
			},
            cancelModal() {
                this.show = false;
                this.$emit('input', false);
            },
            save() {
                this.submitLoading = true;
                let _this = this;
                const reader = new FileReader();
                const fileData = this.file;
                reader.readAsText(fileData);
                reader.onload = () => {
                    let json = JSON.parse(reader.result);
                    if (_this.type == "polygon") {
                        var list = [];
                        for (let i = 0; i < json.features.length; i++) {
                            if (json.features[i].geometry.type == "Polygon") {
                                var data = {
                                    name: '',
                                    position: '',
                                    description: '',
                                    isDashLien: 0,
                                    width: null,
                                    color: '',
                                    dashLength: null,
                                    polygonColor: '',
                                    alpha: null,
                                    surfaceHeight: null,
                                    isDisplayState: 1,
                                    isStereoscopic: 0,
                                    menuId: _this.menuId,
                                    menuName: _this.menuName,
                                    areaType: this.areaId,
                                    isBorder: 0,
                                };
                                data.name = json.features[i].properties.MC;
                                data.description = _this.setDescription(json.features[i].properties);

                                var position = [];
                                for (let k = 0; k < json.features[i].geometry.coordinates[0].length; k++) {
                                    let coordinateElement = json.features[i].geometry.coordinates[0][k];
                                    for (let j = 0; j < coordinateElement.length; j++) {
                                        position.push(coordinateElement[j]);
                                    }
                                }
                                data.position = JSON.stringify(position);
                                list.push(data);
                            } else {
                                for (let j = 0; j < json.features[i].geometry.coordinates.length; j++) {
                                    var position = [];
                                    for (let k = 0; k < json.features[i].geometry.coordinates[j].length; k++) {
                                        for (let l = 0; l < json.features[i].geometry.coordinates[j][k].length; l++) {
                                            for (let m = 0; m <json.features[i].geometry.coordinates[j][k][l].length; m++) {
                                                position.push(json.features[i].geometry.coordinates[j][k][l][m])
                                            }
                                        }
                                    }
                                    var data = {
                                        name: '',
                                        position: '',

                                        description: '',
                                        isDashLien: 0,
                                        width: null,
                                        color: '',
                                        dashLength: null,
                                        polygonColor: '',
                                        alpha: null,
                                        surfaceHeight: null,
                                        isDisplayState: 1,
                                        isStereoscopic: 0,
                                        menuId: _this.menuId,
                                        menuName: _this.menuName,
                                        areaType: this.areaId,
                                        isBorder: 0,
                                    };

                                    data.description = _this.setDescription(json.features[i].properties);
                                    data.name = json.features[i].properties.MC;
                                    data.position = JSON.stringify(position);
                                    list.push(data);
                                }
                            }
                        }
                        addTBasicInformationManagementPatch(list).then(res => {
                            if (res && res.success) {
                                _this.$Message.success('保存成功');
                            } else {
                                _this.$Message.error(res.msg);
                            }
                            _this.cancelModal(false);
                            _this.$emit('handleSearch');
                        }).finally(res => {
                            _this.submitLoading = false;
                        })
                    } else if (_this.type == "line") {
                        var list = [];
                        for (let i = 0; i < json.features.length; i++) {
                            if (json.features[i].geometry.type == "LineString") {
                                var position = [];
                                for (let j = 0; j < json.features[i].geometry.coordinates.length; j++) {
                                    for (let k = 0; k < json.features[i].geometry.coordinates[j].length; k++) {
                                        position.push(json.features[i].geometry.coordinates[j][k]);
                                    }
                                }
                                var data = {
                                    name: '',

                                    position: '',
                                    description: '',
                                    isDash: 0,
                                    width: null,
                                    color: '',
                                    isDisplayState: 0,
                                    menuId: _this.menuId,
                                    menuName: _this.menuName,
                                    areaType: this.areaId,
                                    length: null,
                                    isShow: 1,
                                };

                                data.description = _this.setDescription(json.features[i].properties);
                                data.name = json.features[i].properties.MC;
                                data.position = JSON.stringify(position);
                                list.push(data);
                            } else {
                                for (let j = 0; j < json.features[i].geometry.coordinates.length; j++) {
                                    var position = [];
                                    for (let k = 0; k < json.features[i].geometry.coordinates[j].length; k++) {
                                        for (let l = 0; l < json.features[i].geometry.coordinates[j][k].length; l++) {
                                            position.push(json.features[i].geometry.coordinates[j][k][l])
                                        }
                                    }
                                    var data = {
                                        name: '',

                                        position: '',
                                        description: '',
                                        isDash: 0,
                                        width: null,
                                        color: '',
                                        isDisplayState: 0,
                                        menuId: _this.menuId,
                                        menuName: _this.menuName,
                                        areaType: this.areaId,
                                        length: null,
                                        isShow: 1,
                                    };

                                    data.description = _this.setDescription(json.features[i].properties);
                                    data.name = json.features[i].properties.MC;
                                    data.position = JSON.stringify(position);
                                    list.push(data);
                                }
                            }
                        }

                        addTBasicPolylineManagementPatch(list).then(res => {
                            if (res && res.success) {
                                _this.$Message.success('保存成功');
                            } else {
                                _this.$Message.error(res.msg);
                            }
                            _this.cancelModal(false);
                            _this.$emit('handleSearch');
                        }).finally(res => {
                            _this.submitLoading = false;
                        })

                    } else if (_this.type == "point") {
                        var list = [];
                        for (let i = 0; i < json.features.length; i++) {
                            var data = {
                                menuId: _this.menuId,

                                menuName: _this.menuName,
                                icon: '/img/scenicSpotIcon/1.png',
                                isScenery: '0',
                                namePosition: '',
                                pointType: this.areaId,
                                backgroundColor: '',
                                display: '1',
                                titleShow: '',
                                name: '',
                                position: '',
                                url: '',
                                describes: '',
                            };
                            data.description = _this.setDescription(json.features[i].properties);
                            data.name = json.features[i].properties.MC;
                            data.position = JSON.stringify(json.features[i].geometry.coordinates);
                            list.push(data);
                        }
                        addTScenicSpotManagementPatch(list).then(res => {
                            if (res && res.success) {
                                _this.$Message.success('保存成功');
                            } else {
                                _this.$Message.error(res.msg);
                            }
                            _this.cancelModal(false);
                            _this.$emit('handleSearch');
                        }).finally(res => {
                            _this.submitLoading = false;
                        })
                    }
                }
            },
            handleUpload(file) {
                let s = file.name.substring(file.name.indexOf('.') + 1, file.name.length);
                if (s.toLowerCase() != 'json') {
                    this.$Message.error("文件格式不正确！请选择json文件！");
                    return false;
                }
                if (file) {
                    this.basicFileForm.fileName = file.name;
                }
                this.file = file;
                return false;
            },
            handleFormatError(file) {
                this.$Message.error("文件类型错误，必须是json文件！");
            },

            setDescription(properties){
                var reg = /^[\u4E00-\u9FA5]+$/;
                var description = '';
                for(var key in properties){
                    if(reg.test(key)){
                        description += "<p><font style=\"padding: 6px; background-color: #1A9D61\" color=\"#ffffff\" size=\"4\" face=\"微软雅黑\">"+ key +"</font></p><br/><p><font size='2' face=\"微软雅黑\">" + properties[key] + "</font></p><br/>"
                    }
                }
                return description;
            }
        },
        watch: {
            value(val) {
                this.show = val;
            },
            show(val) {
                if (val) {
                    this.modalTitle = this.title;
                    this.tBasicInformationManagementForm.menuId = this.menuId;
                    this.tBasicInformationManagementForm.menuName = this.menuName;

                    this.tScenicSpotManagementForm.menuId = this.menuId;
                    this.tScenicSpotManagementForm.menuName = this.menuName;

                    this.tBasicPolylineManagementForm.menuId = this.menuId;
                    this.tBasicPolylineManagementForm.menuName = this.menuName;
                    this.type = this.objectType;
                } else {
                    this.type = "";
                    this.basicFileForm.fileName = "";
                    this.tBasicInformationManagementForm = {
                        name: '',

                        position: '',
                        description: '',
                        isDashLien: 0,
                        width: null,
                        color: '',
                        dashLength: null,
                        polygonColor: '',
                        alpha: null,
                        surfaceHeight: null,
                        isDisplayState: 1,
                        isStereoscopic: 0,
                        menuId: null,
                        menuName: '',
                        areaType: this.areaId,
                        isBorder: 0,
                    };

                    this.tScenicSpotManagementForm = {
                        menuId: null,
                        menuName: '',
                        icon: '/img/scenicSpotIcon/1.png',
                        isScenery: '0',
                        namePosition: '',
                        pointType: this.areaId,
                        backgroundColor: '',
                        display: '1',
                        titleShow: '',
                        name: '',
                        position: '',
                        url: '',
                        describes: '',
                    };

                    this.tBasicPolylineManagementForm = {
                        name: '',
                        position: '',
                        description: '',
                        isDash: 0,
                        width: null,
                        color: '',
                        isDisplayState: 0,
                        menuId: null,
                        menuName: '',
                        areaType: this.areaId,
                        length: null,
                        isShow: 1,
                    };
                    this.cancelModal();
                }
            }
        }
    }
</script>
<style lang="less">
  .uploadShp {
    .ivu-input[disabled], fieldset[disabled] .ivu-input {
      width: 380px;
      background-color: transparent;
      color: #515a6e !important
    }

    .ivu-form-item-error-tip {
      left: 80px;
    }

    .ivu-form .ivu-form-item-label {
      width: 90px;
    }

    .ivu-input-wrapper {
      width: auto !important;
    }
  }
</style>
