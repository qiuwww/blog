<template>
  <div>
    <TreeSelect v-model="value" filterable filter-by-label :data="data" @on-change="dataSubmit" :loading="loading" laceholder="请选择地址"/>
  </div>
</template>

<script>
import {
  listWithTree
} from '@/api/zhsq/tZhsqAddressAdministration/tZhsqAddressAdministration'
export default {
  name: "addressTree",
  data() {
    return {
      value: this.value,
      loading:false,
      data: [],
    }
  },
  props: {
    value: {
      type: String,
      default: ""
    },
  },
  methods: {
    //加载地址树
    init(){
      this.loading = true;
      let that=this;
      listWithTree({}).then(res => {
        that.loading = false;
        if (res) {
         that.data=that.setData(res.data,"")
        } else {
          this.$Message.error('获取数据失败');
        }
      })
    },
    //选定回传值
    dataSubmit(value) {
      if (value){
        this.$emit('dataSubmit',value);
      }
    },
    //设置数值
    setData(value,name){
      var dataList=[]
      for (var i=0;i<value.length;i++){
        let data= {
          title:value[i].siteName,
          expand: false,
          value:name+ value[i].siteName,
          selected: false,
          checked: false,
          children: []
        }
        if (value[i].childrens.length>0){
          data.children=this.setData(value[i].childrens,name+value[i].siteName)
        }
        dataList.push(data);
      }
      return dataList;
    },
  },
  mounted() {
    this.init();
  }
}
</script>

<style scoped>

</style>
