<template>
  <card dis-hover bordered class="tZhsqAddressAdministration">
    <Row>
      <div >标准地址构成:行政区划+乡镇街道+街道巷+门牌号+小区（组）+楼排号+单元号+户室号</div>
    </Row>
    <Row style="margin-top:10px;">
      <Alert>
        所选地址
        <span class="select-count">{{ selectCount }}</span>
      </Alert>
    </Row>
    <Row style="margin-top:10px;display: flex">
      <div style="width: 10%;padding: 10px" v-for="(item, i) in list">
        <Table  highlight-row border :columns=item.title :data=item.data @on-current-change="lightChange">
<!--          <template slot-scope="{ row }" slot="name">-->
<!--            <strong>{{ row.siteName }}</strong>-->
<!--          </template>-->
          <template slot-scope="{ row, index }" slot="action" style="display: flex">
            <div class="city_text" :tooltip="item.data[index].siteName">{{ item.data[index].siteName }}</div>
            <div style="margin-left: auto">
              <Icon v-if="!item.data[index].showAdd" @click="handleEdit(index,row)" type="md-create"/>
              <Icon @click="show(index,row)"  type="md-add" />
              <Icon v-if="!item.data[index].showAdd" @click="remove(index,row)" type="ios-trash"/>
            </div>
          </template>
        </Table>
      </div>
    </Row>
    <upData v-model="updateShow" :Pid="Pid" :SiteLevel="SiteLevel" :modalTitle="title" v-on:handleSearch="handleSearch"></upData>
  </card>
</template>
<script>
import upData from "./updataTZhsqAddressAdministration"
import {
  listWithTree,
  deleteTZhsqAddressAdministration
} from '@/api/zhsq/tZhsqAddressAdministration/tZhsqAddressAdministration'
import {deleteHistoricTask} from "@/api/activiti";

export default {
  components: {
    upData
  },
  data() {
    return {
      selectCount:"",
      updateShow:false,
      title:"",
      Pid:'0',
      SiteLevel:"1",
      list: [
        {
          title: [{
            title: '市区',
            slot: 'action',
            align: 'center'
          }],
          data: [

          ]
        },
        {
          title: [{
            title: '区/县',
            slot: 'action',
            align: 'center'
          }
          ],
          data: [

          ]

        },
        {
          title: [{
            title: '乡镇街道',
            slot: 'action',
            align: 'center'
          }
          ],
          data: [

          ]

        },
        {
          title: [{
            title: '街（路）道巷',
            slot: 'action',
            align: 'center'
          }
          ],
          data: [

          ]

        },
        {
          title: [{
            title: '门牌号',
            slot: 'action',
            align: 'center'
          }
          ],
          data: [

          ]
        },
        {
          title: [{
            title: '小区（组）',
            slot: 'action',
            align: 'center'
          }
          ],
          data: [

          ]
        },
        {
          title: [{
            title: '楼（栋）排号',
            slot: 'action',
            align: 'center'
          }
          ],
          data: [

          ]
        },
        {
          title: [{
            title: '单元号',
            slot: 'action',
            align: 'center'
          }
          ],
          data: [

          ]
        },
        {
          title: [{
            title: '楼层号',
            slot: 'action',
            align: 'center'
          }
          ],
          data: [

          ]

        },
        {
          title: [{
            title: '户室号',
            slot: 'action',
            align: 'center'
          }
          ],
          data: [

          ]

        },
      ],
    }
  },
  methods: {
    //新增
    show(index,data) {
      this.title = '新增';
      this.updateShow = true
      this.Pid = data.pid;
      this.SiteLevel=data.siteLevel
    },
    //删除
    remove(index,data) {
      this.$Modal.confirm({
        title: "确认删除",
        // 记得确认修改此处
        content: "您确认要删除 " + data.siteName + " ?",
        loading: true,
        onOk: () => {
          deleteTZhsqAddressAdministration({ids:[data.id]}).then(res => {
            this.$Modal.remove();
            if (res && res.success) {
              this.$Message.success("操作成功");
              this.init();
            }
          });
        }
      });
    },
    //高亮显示
    lightChange(val){
      if (val&&val.childrens){
        let index=Number(val.siteLevel);
        if (val.childrens.length>0){
          this.setData(val.childrens,index)
          this.selectCount=val.siteName
        }else{
          this.list[index].data=[{
            siteName:"新增数据",
            showAdd:true,
            pid:val.id,
            siteLevel:String(index+1)
          }]
          for (var i=index+1;i<10;i++){
            this.list[i].data=[]
          }
        }
      }
    },
    //编辑
    handleEdit(index,data) {
      this.title = '编辑';
      this.updateShow = true
      this.Pid = '0';
    },
    //新增返回
    handleSearch() {
      this.updateShow = false;
      this.init();
    },
    //初始化数据
    init(){
      let _this=this
      listWithTree({}).then(res => {
        if (res&&res.data){
          _this.setData(res.data,0)
        }
      })
    },
    //设置数据格式
    setData(val,index){
      this.list[index].data=val
      if (this.list[index].data[0]){
        this.list[index].data[0]["_highlight"]=true;
        //高亮关联属性
        this.lightChange(this.list[index].data[0])
      }
    }
  },
  mounted() {
    this.init();
  }
}
</script>
<style lang="less">
.tZhsqAddressAdministration {
  .city_text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 62%;
  }
  .ivu-table-cell-slot {
    display: flex;
  }
  .ivu-table th, .ivu-table td {
    border-bottom: 0;
  }
  .ivu-table-tip {
    overflow-x: hidden;
  }
  .ivu-icon{
    cursor: pointer;
  }
}
</style>
