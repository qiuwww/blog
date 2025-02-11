<style lang="less" scoped>
  .tZhsqTaskList {
    .form-item-input {
      width: 190px;
    }

    .ivu-form .ivu-form-item-label {
      width: 120px;
    }

    .ivu-select {
      width: 190px;
    }

    .ivu-input-wrapper {
      width: 190px !important;
    }

    .ivu-select-selection {
      width: 190px !important;
    }
  }
</style>
<template>
  <Modal v-model="show" :title="editTitle" :draggable="false" :mask-closable="true" :width="1100" class="tZhsqTaskList">
    <Form ref="tZhsqTaskListForm" :model="tZhsqTaskListForm" :rules="tZhsqTaskListFormRule" :label-width="110">
      <Row>
        <Col span="8">
          <FormItem label="任务分类" prop="taskSort">
            <Select v-model="tZhsqTaskListForm.taskSort" placeholder="请选择任务分类" clearable>
              <Option v-for="(item, i) in taskSortPriority" :key="item.id" :value="item.id.toString()">{{item.label}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="任务名称" prop="taskName">
            <Input type="text" :maxlength=50 v-model="tZhsqTaskListForm.taskName" placeholder="请输入任务名称"/>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="发起人" prop="sponsor">
            <Input type="text" :maxlength=50 v-model="tZhsqTaskListForm.sponsor" placeholder="请输入发起人"/>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="8">
          <FormItem label="所属街道" prop="houseStreetId">
            <Select v-model="tZhsqTaskListForm.houseStreetId" placeholder="请选择所属街道" clearable @on-select="streetChange"
                    :label-in-value="true">
              <Option v-for="(item, i) in houseStreetPriority" :key="item.id" :value="item.id.toString()">{{item.name}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="所属社区" prop="communityId">
            <Select v-model="tZhsqTaskListForm.communityId" placeholder="请选择所属社区" clearable @on-select="communityChange"
                    :label-in-value="true">
              <Option v-for="(item, i) in communityPriority" :key="item.id" :value="item.id.toString()">{{item.name}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="所属网格" prop="gridId">
            <Select v-model="tZhsqTaskListForm.gridId" placeholder="请选择所属网格" clearable :label-in-value="true"
                    @on-select="selectGrid">
              <Option v-for="(item, i) in gridPriority" :key="item.id" :value="item.id">{{item.name}}</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="8">
          <FormItem label="任务开始时间" prop="taskStartingTime">
            <DatePicker style="width:190px;" :editable="false" type="datetime" placeholder="请输入任务开始时间"
                        v-model="tZhsqTaskListForm.taskStartingTime" @on-change="setTaskStartingTime"
                        format="yyyy-MM-dd HH:mm:ss"></DatePicker>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="任务结束时间" prop="taskEndTime">
            <DatePicker style="width:190px;" :editable="false" type="datetime" placeholder="请输入任务结束时间"
                        v-model="tZhsqTaskListForm.taskEndTime" @on-change="setTaskEndTime"
                        format="yyyy-MM-dd HH:mm:ss"></DatePicker>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="执行人" prop="executor">
            <Select v-model="tZhsqTaskListForm.executor" placeholder="请输入执行人" clearable>
              <Option v-for="(item, i) in executorPriority" :key="item.id" :value="item.id.toString()">{{item.label}}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="8">
          <FormItem label="任务状态" prop="taskStatus">
            <Select v-model="tZhsqTaskListForm.taskStatus" placeholder="请选择任务状态" clearable>
              <Option v-for="(item, i) in taskStatusPriority" :key="item.id" :value="item.id.toString()">{{item.label}}</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>
    </Form>
    <div slot="footer">
      <Button type="text" @click="show=false">取消</Button>
      <Button type="primary" :loading="loading" @click="handelSubmit">提交</Button>
    </div>
  </Modal>
</template>
<script>
  import { addTZhsqTaskList, updateTZhsqTaskList, getTZhsqTaskList } from '@/api/zhsq/tZhsqTaskList/tZhsqTaskList'
  import { queryAllList as gridAllList } from '@/api/zhsq/basicHousingEstate/basicHousingEstate'
  import { formartDate } from '@/api/tools/tool'
  import { queryAllList } from '@/api/zhsq/basicGrids/basicGrids'
  import { communityData, sortData, statusData, executorData, streetData } from '@/api/tools/zhsqSelectData'
  import { getDictionary, getStreetData, getCommunityData,getDictDataByType } from '@/api/index'

  export default {
    name: 'updateTZhsqTaskList',
    props: {
      value: {
        type: Boolean,
        default: false
      },
      TZhsqTaskListId: {
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
        loading: true,
        tZhsqTaskListForm: {
          houseStreetId: '',
          houseStreet: '',
          taskSort: '',
          taskName: '',
          communityId: '',
          community: '',
          grid: '',
          gridId: '',
          sponsor: '',
          taskStartingTime: null,
          taskEndTime: null,
          executor: '',
          taskStatus: 1
        },
        tZhsqTaskListFormRule: this.getTZhsqTaskListFormRule(),
        taskSortPriority: [],//任务分类
        houseStreetPriority: [],
        communityPriority: [],//所属社区
        gridPriority: [],//所属网格
        taskStatusPriority: [],//任务状态
        executorPriority: [],
      }
    },
    methods: {
      getStatusData(){//初始化任务状态
				getDictDataByType('status').then(res => {
					if(res && res.success){
						this.taskStatusPriority = res.data;
					}
				})
			},
      getExecutorData(){//初始化执行人
				getDictDataByType('executor').then(res => {
					if(res && res.success){
						this.executorPriority = res.data;
					}
				})
			},
			getSortData(){//初始化任务分类
				getDictDataByType('sort').then(res => {
					if(res && res.success){
						this.taskSortPriority = res.data;
					}
				})
			},
      selectGrid(v) {
        if (this.show) {
          this.tZhsqTaskListForm.grid = v.label
          this.tZhsqTaskListForm.gridId = v.value
        }
      },
      getStreetData() {
        getStreetData({}).then(res => {
          if (res && res.success) {
            this.houseStreetPriority = res.data
          }
        })
      },
      //社区
      communityChange(e) {
        if (e) {
          this.tZhsqTaskListForm.community = e.label
          this.tZhsqTaskListForm.communityId = e.value
        }
        //网格
        this.tZhsqTaskListForm.grid = ''
        this.tZhsqTaskListForm.gridId = ''
        queryAllList({ communityId: e.value }).then(res => {
          if (res.data.length > 0) {
            //赋值
            this.gridPriority = res.data
          }
        })
      },
      //街道
      streetChange(e) {
        if (e) {
          this.tZhsqTaskListForm.houseStreet = e.label
          this.tZhsqTaskListForm.houseStreetId = e.value
        }
        //社区
        this.tZhsqTaskListForm.community = ''
        this.tZhsqTaskListForm.communityId = ''

        getCommunityData({ streetId: this.tZhsqTaskListForm.houseStreetId }).then(res => {
          if (res && res.success) {
            this.communityPriority = res.data
          }
        })
        //网格
        this.tZhsqTaskListForm.grid = ''
        this.tZhsqTaskListForm.gridId = ''
        this.gridPriority = []
      },
      // selectCommunity(v){
      // 	this.gridItem({"communityId":v});
      // 	this.tZhsqTaskListForm.grid="";
      // 	this.tZhsqTaskListForm.gridId="";
      // },
      //选择网格
      // gridItem(data){
      // 	if(data.communityId){
      // 		queryAllList(data).then(res => {
      // 			if(res && res.success){
      // 				this.gridPriority = res.data;
      // 			}else {
      // 				this.$Message.error('获取网格数据失败，请重新刷新');
      // 			}
      // 		})
      // 	}else{
      // 		this.gridPriority = [];
      // 	}
      // },
      setTaskStartingTime(e) {//开始时间选择
        this.tZhsqTaskListForm.taskStartingTime = e
      },
      setTaskEndTime(e) {//结束时间选择
        this.tZhsqTaskListForm.taskEndTime = e
      },
      reductionDate(date) {//转换时间
        let d = new Date(date)
        d = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()
        return d
      },
      handelSubmit() {
        this.$refs['tZhsqTaskListForm'].validate((valid) => {
          if (valid) {
            this.loading = true
            if (this.TZhsqTaskListId != null && this.TZhsqTaskListId.trim().length > 0) {
              this.tZhsqTaskListForm.id = this.TZhsqTaskListId
              this.tZhsqTaskListForm.taskStartingTime = this.reductionDate(this.tZhsqTaskListForm.taskStartingTime)
              if (this.tZhsqTaskListForm.taskEndTime) {
                this.tZhsqTaskListForm.taskEndTime = this.reductionDate(this.tZhsqTaskListForm.taskEndTime)
              }
              updateTZhsqTaskList(this.tZhsqTaskListForm).then(res => {
                this.loading = false
                if (res && res.code == 200) {
                  this.closeModal(false)
                  this.$emit('handleSearch')
                  this.$Message.success('保存成功')
                } else {
                  this.$Message.error(res.msg)
                }
              }).catch(error => {
                this.loading = false
              })
            } else {
              addTZhsqTaskList(this.tZhsqTaskListForm).then(res => {
                this.loading = false
                if (res && res.code == 200) {
                  this.closeModal(false)
                  this.$emit('handleSearch')
                  this.$Message.success('保存成功')
                } else {
                  this.$Message.error(res.msg)
                }
              }).catch(error => {
                this.loading = false
              })
            }
          } else {
            this.$Message.error('表单验证不通过！')
          }
        })
      },
      closeModal(val) {
        this.$emit('input', val)
      },
      initForm() {
        this.tZhsqTaskListForm = {
          houseStreetId: '',
          houseStreet: '',
          taskSort: '',
          taskName: '',
          communityId: '',
          community: '',
          grid: '',
          gridId: '',
          sponsor: '',
          taskStartingTime: null,
          taskEndTime: null,
          executor: '',
          taskStatus: ''
        };
        this.getSortData();
        this.getExecutorData();
        this.getStatusData();
      },
      getTZhsqTaskListFormRule() {
        return {
          taskSort: [
            { required: true, message: '任务分类不能为空！', trigger: 'changer', pattern: /.+/ }
          ],
          taskName: [
            { required: true, message: '任务名称不能为空！', trigger: 'blur' },
            { type: 'string', max: 100, message: '任务名称的最大长度为100！', trigger: 'blur' }
          ],
          houseStreetId: [
            { required: true, message: '所属街道不能为空！', trigger: 'changer', pattern: /.+/ }
          ],
          communityId: [
            { required: true, message: '所属社区不能为空！', trigger: 'changer', pattern: /.+/ }
          ],
          gridId: [
            { required: true, message: '所属网格不能为空！', trigger: 'changer', pattern: /.+/ }
          ],
          sponsor: [
            { required: true, message: '发起人不能为空！', trigger: 'blur' },
            { type: 'string', max: 50, message: '发起人的最大长度为50！', trigger: 'blur' }
          ],
          taskStartingTime: [
            { required: true, message: '任务开始时间不能为空！', trigger: 'changer', pattern: /.+/ }
          ],
          executor: [
            { required: true, message: '执行人不能为空！', trigger: 'changer' },
            { type: 'string', max: 50, message: '执行人的最大长度为50！', trigger: 'changer' }
          ],
          taskStatus: [
            { required: true, pattern: /^[0-9]+$/, message: '任务状态不能为空！', trigger: 'changer' }
          ]
        }
      }
    },
    watch: {
      value(val) {
        this.show = val
      },
      show(val) {
        this.getStreetData()
        this.initForm()
        this.loading = false
        this.editTitle = this.modalTitle
        if (val) {
          this.$refs['tZhsqTaskListForm'].resetFields()
          if (this.TZhsqTaskListId != null && this.TZhsqTaskListId.trim().length > 0) {
            getTZhsqTaskList({ id: this.TZhsqTaskListId }).then(res => {
              if (res && res.code == 200) {
                //加载街道
                getStreetData({}).then(r => {
                  if (r.success) {
                    this.houseStreetPriority = r.data
                  }
                })
                this.tZhsqTaskListForm.houseStreet = res.data.houseStreet;
                this.tZhsqTaskListForm.houseStreetId = res.data.houseStreetId;

                //加载社区
                getCommunityData({ streetId: res.data.houseStreetId }).then(r => {
                  if (res && res.success) {
                    this.communityPriority = r.data
                  }
                })
                this.tZhsqTaskListForm.community = res.data.community
                this.tZhsqTaskListForm.communityId = res.data.communityId

                //社区找网格
                queryAllList({ communityId: res.data.communityId }).then(resp => {
                  if (resp && resp.success) {
                    //赋值
                    this.gridPriority = resp.data
                  }
                })

                this.tZhsqTaskListForm.grid = res.data.grid
                this.tZhsqTaskListForm.gridId = res.data.gridId
                this.tZhsqTaskListForm.taskSort = res.data.taskSort
                this.tZhsqTaskListForm.taskName = res.data.taskName
                //         this.tZhsqTaskListForm.houseStreetId = res.data.houseStreetId;
                //         this.tZhsqTaskListForm.communityId = res.data.communityId;
                //         this.tZhsqTaskListForm.houseStreet = res.data.houseStreet;
                // this.tZhsqTaskListForm.community = res.data.community;
                // this.gridItem({"communityId":this.tZhsqTaskListForm.community});
                // this.tZhsqTaskListForm.grid = res.data.grid;
                // this.tZhsqTaskListForm.gridId = res.data.gridId;
                this.tZhsqTaskListForm.sponsor = res.data.sponsor
                if (res.data.taskStartingTime) {
                  this.tZhsqTaskListForm.taskStartingTime = formartDate(new Date(res.data.taskStartingTime).getTime(), 'yyyy-MM-dd HH:mm:ss')
                } else {
                  this.tZhsqTaskListForm.taskStartingTime = null
                }
                if (res.data.taskEndTime) {
                  this.tZhsqTaskListForm.taskEndTime = formartDate(new Date(res.data.taskEndTime).getTime(), 'yyyy-MM-dd HH:mm:ss')
                } else {
                  this.tZhsqTaskListForm.taskEndTime = null
                }
                this.tZhsqTaskListForm.executor = res.data.executor
                this.tZhsqTaskListForm.taskStatus = res.data.taskStatus.toString();

              } else {
                this.$Message.error(res.msg)
              }
            })
          }
        } else {
          this.closeModal(val)
        }
      }
    }
  }
</script>
