<template>
  <div>
    <div style="display:flex">
      <Input
        v-model="currentValue" @on-change="handleChange" placeholder="请选择图标"  :maxlength=50 :icon="currentValue"
      />
      <Button @click="iconModalVisible=true" :size="size" :disabled="disabled" :icon="icon" style="margin-left:10px">选择图标</Button>
    </div>
    <Modal
      title="选择图标"
      v-model="iconModalVisible"
      :width="950"
      :styles="{top: '30px'}"
      footer-hide
      :z-index="1060"
    >
      <div class="icon-search">
      </div>
      <div class="icon-block icon-bar">
        <div class="icon-wrap" v-for="(item, i) in iconData" :key="i" @click="hanleChoose(item.icon)">
          <div class="icons-item" style="overflow: hidden;">
          <Icon :type="item.icon" style="font-size: 32px;"/>
            <img style="max-height: 32px;max-width: 120px;" :src="'/tempfile'+item.icon">
            <br>
            <label :title="item.name">{{item.name}}</label>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
//import { icons } from "@/api/zhxc/tScenicSpotManagement/icon";

import {queryAllTPointIconList} from '@/api/zhxc/tPointIcon/tPointIcon'
export default {
  name: "iconChoose",
  props: {
    value: {
      type: String,
      default: ""
    },
    size: String,
    placeholder: {
      type: String,
      default: "输入图标名或选择图标"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    maxlength: Number,
    icon: {
      type: String,
      default: "md-ionic"
    }
  },
  data() {
    return {
      iconModalVisible: false,
      currentValue: this.value,
      iconData: [],
      key: "",

    };
  },
  methods: {
    init() {
      let re = [];
      queryAllTPointIconList({type:"1"}).then(res => {       
        if (res) {
          res.data.forEach(item => {
            re.push({icon:item.icon,name:item.name});
          });
        }
      })
      this.iconData = re;
    },
    handleChange(v) {
      this.$emit("input", this.currentValue);
      this.$emit("on-change", this.currentValue);
    },
    setCurrentValue(value) {
      if (value == this.currentValue) {
        return;
      }
      this.currentValue = value;
    },
    hanleChoose(v) {
      this.currentValue = v;
      this.$emit("input", this.currentValue);
      this.$emit("on-change", this.currentValue);
      this.iconModalVisible = false;
    }
  },
  watch: {
    value(val) {
      this.setCurrentValue(val);
    }
  },
  created() {
    this.init();
  }
};
</script>

<style lang="less">
.icon-search {
  position: relative;
  margin: 20px auto 30px;
  text-align: center;
  input {
    width: 500px;
    box-sizing: border-box;
    border: 0;
    border-radius: 4px;
    background: #f5f5f5;
    text-align: center;
    font-size: 14px;
    outline: none;
    margin: 0 auto;
    padding: 8px 0;
  }
}
.icon-block {
  display: flex;
  flex-wrap: wrap;
  max-height: 500px;
  overflow: auto;
}
.icon-bar {
  overflow: auto;
  overflow-x: hidden;
}
.icon-bar::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.icon-bar::-webkit-scrollbar-thumb {
  border-radius: 3px;
  background: #c3c3c3;
}

.icon-bar::-webkit-scrollbar-track {
  background: #fff;
}
.icon-wrap {
  :hover {
    color: #1890ff;
    transition: color 0.3s;
  }
}
.icons-item {
  margin: 6px 6px 6px 0;
  width: 145px;
  text-align: center;
  list-style: none;
  cursor: pointer;
  height: 100px;
  color: #5c6b77;
  transition: all 0.2s ease;
  position: relative;
  padding-top: 10px;
  p {
    padding-top: 15px;
    margin: 5px;
    font-size: 14px;
  }
}
</style>

