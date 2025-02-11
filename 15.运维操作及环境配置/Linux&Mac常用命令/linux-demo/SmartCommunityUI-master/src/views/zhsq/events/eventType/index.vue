<template>
  <el-row type="flex" class="app-warp" justify="center">
    <el-col :span="23">

		<div style="display: flex;    margin: 10px;">
      <!--v-if="permitIds.includes('shijian_record_add')"-->
			<el-button
            class="m10 addbtn"
            type="primary"
			size="small"
            @click="addType"
          >
            +  添加
          </el-button>
		<span>
            <!-- <span>所属类别</span> -->
            <Search
			  class="inputstyle"
              :query-str="queryStr"
              :placeholder="'请输入事件类型名称'"
              @update="handleUpdate"
            />
          </span>
		</div>

	  <el-row>
		  <el-table
	      :header-cell-style="{
	        'font-size': '13px',
	        'font-weight': 'bold',
	        'color':'#000000'

	      }"
	      stripe
	      :data="tableData"
	      style="width: 100%"
        row-key="id"
        :tree-props="{ children: 'children', hasChildren: true }" v-loading="tableLoading"
	    >
	  	  <el-table-column prop="id" label="编号" />
	      <!-- <el-table-column prop="id" label="编号" /> -->
	      <el-table-column prop="name" label="类型名称" />
	      <el-table-column prop="option" label="操作">
	        <template slot-scope="scope">
			  <el-tooltip content="新增" placement="top" popper-class="atooltip">
				 <el-button
	            class="xinzeng"
	            @click="addTypeChildren(scope.row)"
	          >
	             <!-- 新增 -->
	             </el-button>
			  </el-tooltip>

         <el-tooltip content="修改" placement="top" popper-class="atooltip">
           <!--v-if="permitIds.includes('shijian_record_edit')"-->
				   <el-button
	            class="bianji"
	            @click="editType(scope.row)"
	          >
	             <!-- 编辑 -->
	             </el-button>
			  </el-tooltip>

			  <el-tooltip content="删除" placement="top"  popper-class="atooltip">
          <!--v-if="permitIds.includes('shijian_record_delete')"-->
			  	<el-button
	            class="shanchu"
	            @click="deleteType(scope.row)"
	          >
	            <!-- 删除 -->
	          </el-button>
			  </el-tooltip>

        <el-tooltip content="绑定流程" placement="top" popper-class="atooltip">
          <el-button
            class="bianji"
            @click="bindingProcess(scope.row)"
          >
            <!-- 绑定流程 -->
          </el-button>
        </el-tooltip>

	        </template>
	      </el-table-column>
	      <div slot="empty" class="sqt">
	        <!-- 暂无数据图-->
	        <p><img src="../../../../assets/imgs/qsy.png"></p>
	      </div>
	    </el-table>
	    <Pagination
	      class="numsize"
	     :page-total="pageTotal"
	      @paginationChange="handleUpdate"
	    />
	  </el-row>
    </el-col>
    <AddAndEditEventType
      :id="id"
      :add-event-type="addEventType"
      :add-child="addChild"
      :pid-data="pidData"
      :edit-event-type="editEventType"
      :name="name"
      @close="handleClose"
      @update="handleUpdate"
    />
    <!--    绑定流程-->
    <Modal v-model="procDefShow" title="绑定流程">
      <Form ref="proForm" :model="proForm" inline :label-width="120" :rules="tFormGeneratorFormRule">
        <Form-item label="绑定的流程" prop="procDefId">
          <Select v-model="proForm.procDefId" clearable placeholder="请选择流程" label-in-value style="width: 200px"
                  @on-change="changeProcess">
            <Option v-for="(item, i) in accProcess" :key="item.id" :value="item.id" :label="item.name">{{ item.name }}
            </Option>
          </Select>
        </Form-item>
      </Form>
      <div slot="footer">
        <Button type="text" @click="procDefShow=false">取消</Button>
        <Button type="primary" :loading="proFormLoading" @click="handelSubmit">提交</Button>
      </div>
    </Modal>
  </el-row>
</template>

<script>
import { mapGetters } from 'vuex'
import Search from '@/components/Search'
import Pagination from '@/components/Pagination'
import {
  getEventType,
  deleteEventType,
  queryEventsTypeTreeByPage,
  modifyEventType as update
} from '@/api/events'
import AddAndEditEventType from './components/editandAddDialog'
import {getAllProcess} from '@/api/activiti'
export default {
  data() {
    return {
      pageTotal: 0,
      tableData: [],
      id: '',
      name: '',
      addEventType: false,
      addChild: false,
      pidData: '',
      editEventType: false,
      tableLoading: false,
      tFormGeneratorFormRule: this.getTFormGeneratorFormRule(),//绑定流程表单验证规则
      proForm: {//绑定流程
        id: "",//表单ID
        procDefId: "",//绑定流程id
        procDefName: "",//绑定流程名
      },
      procDefShow: false,//是否显示绑定流程
      proFormLoading: false,//提交时的等待
      accProcess: [],//流程集合
    }
  },
  computed: {
    ...mapGetters(['pageSize', 'pageNum', 'queryStr', 'permitIds', 'loading'])
  },
  created() {
    this.handleGetEventType();
    this.getAllProcess();
  },
  methods: {
    //查询所有流程
    getAllProcess() {
      let _this = this;
      getAllProcess().then(res => {
        if (res && res.data) {
          _this.accProcess = res.data;
        }
      }).catch(err => {

      });
    },
    // 绑定流程
    bindingProcess(row) {
      this.proForm.id = row.id
      this.procDefShow = true;
      this.proForm.procDefId = row.procDefId
      this.proForm.procDefName = row.procDefName
    },
    //绑定流程改变时间
    changeProcess(e) {
      if (e) {
        // 网格
        this.proForm.procDefId = e.value
        this.proForm.procDefName = e.label
      }
    },
    //绑定流程提交
    handelSubmit() {
      this.$refs['proForm'].validate((valid) => {
        if (valid) {
          if (this.proForm && this.proForm.id && this.proForm.procDefId && this.proForm.procDefName) {
            if (this.proForm.id.trim().length == 0 || this.proForm.procDefId.trim().length == 0 || this.proForm.procDefName.trim().length == 0) {
              this.$Message.error("参数错误请联系管理员！！！")
              return
            }
          }
          this.proFormLoading = true
          update(this.proForm).then(res => {
            this.proFormLoading = false;
            if (res) {
              if (res && res.code == 200) {
                this.procDefShow = false;
                // this.getDataList();
                this.handleGetEventType();
                this.proForm.id = "";
                this.proForm.procDefId = "";
                this.proForm.procDefName = "";
                this.$Message.success('绑定成功');
              } else {
                this.$Message.error(res.msg);
              }
            } else {
              this.$Message.error('绑定失败');
            }
          })
        } else {
          this.$Message.error('表单验证不通过！');
        }
      })

    },
    getTFormGeneratorFormRule() {
      return {
        procDefId: [
          {required: true, message: '绑定的流程不能为空！', trigger: 'blur'},
          {type: 'string', max: 50, message: '数据的最大长度为50！', trigger: 'blur'}
        ]
      }
    },
    handleUpdate() {
      this.handleGetEventType()
    },
    async handleGetEventType() {
      this.tableLoading = true;
      // const { data } = await getEventType({
      //   pageSize: this.pageSize,
      //   pageNum: this.pageNum,
      //   queryStr: this.queryStr
      // })
      // this.tableData = data.records
      // this.pageTotal = data.total
      queryEventsTypeTreeByPage({
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        name: this.queryStr
      }).then(res => {
        if(res && res.success) {
          if (res.data && res.data.records) {
            this.tableLoading = false;
            // this.loading = false;
            //展开第一层
            // for(let i in res.data.records ){
            //   let item = res.data.records[i];
            //   if(item && item.children){
            //     item._showChildren = true;
            //   }
            // }
            this.tableData = res.data.records;
            // this.data._showChildren = true;
            this.pageTotal = res.data.total;
            // this.csvData = JSON.parse(JSON.stringify(res.data.records));
          }
        }
      }).catch(err => {
        this.loading = false
      });
    },
    addType() {
      this.addEventType = true
    },
    addTypeChildren(row) {
      this.addEventType = true;
      this.addChild = true;
      this.pidData = row.id;
      this.name = row.name;
    },
    editType(row) {
      this.id = row.id
      this.name = row.name
      this.editEventType = true
    },
    handleClose() {
      this.id = '';
      (this.addEventType = false), (this.editEventType = false)
    },
    async deleteType(event) {
      this.$confirm(`确认删除名为【${event.name}】的类别吗？`, {
				type: 'warning' ,
				  cancelButtonText: '取消',
				  confirmButtonText: '删除',
				})
        .then(async _ => {
          const data = await deleteEventType({
            eventsTypeId: event.id
          })
          if (data && data.code == 200) {
            this.$notify({
              title: data.msg,
              type: 'success'
            })
          } else {
            this.$notify({
              title: data.msg,
              type: 'fail'
            })
          }
          this.handleUpdate()
        })
        .catch(e => {
        })
    }
  },
  components: {
    Search,
    AddAndEditEventType,
    Pagination
  }
}
</script>

<style lang="scss" scoped>
  .search{
	display: flex;

    margin: 32px 0 10px 0;
  }
	.numsize{
		margin-top: 15px;
		margin-bottom: 13px;
	}
	.tablebox{
		border-top: 2px solid #e8e8ea;
	}
	/* .tablebox ::v-deep .cell{
		font-size: 14px;
		font-weight: bold;
		color: #000000;
	} */
	.addbtn{
		width: 100px;

		background: #3083f2;
		border-radius: 4px;
		line-height: 10px;

	}
	.inputstyle{
		margin-left: 20px;

	}
</style>
