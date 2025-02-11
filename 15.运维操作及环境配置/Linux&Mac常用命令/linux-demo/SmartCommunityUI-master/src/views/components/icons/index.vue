<template>
  <div class="icons-container">
    <aside>
      <a href="http://v1.iviewui.com/components/icon" target="_blank">Add and use
      </a>
    </aside>
     <Tabs type="card">
      <Tab-pane label="Icons">
        <div  class="icon-item" v-for="(item, i)  of svgIcons" :key="item" @click="handleClipboard(generateIconCode(item),$event)">
          <Tooltip placement="top">
            <div slot="content">
            {{ generateIconCode(item) }}
          </div>
            <div class="icon-item">
              <svg-icon :icon-class="item" class-name="disabled" />
              <span>{{ item }}</span>
            </div>
          </Tooltip>
        </div>
      </Tab-pane>
      <Tab-pane label="Iview-UI Icons">
        <div  class="icon-item" v-for="(item, i)  of iconData" :key="item" @click="handleClipboard(generateElementIconCode(item),$event)">
          <Tooltip placement="top">
            <div slot="content">
              {{ generateElementIconCode(item) }}
            </div>
            <div class="icon-item">
<!--              <Icon type="" + item></Icon>-->
              <Icon :type="item" style="font-size: 32px;"/>
              <span>{{ item }}</span>
            </div>
          </Tooltip>
        </div>
      </Tab-pane>
    </Tabs>
  </div>
</template>

<script>
  import clipboard from '@/utils/clipboard'
  import svgIcons from './svg-icons'
  import { icons } from "@/libs/icon";


  export default {
    name: 'Icons',
    data() {
      return {
        svgIcons,
        iconData:[],
      }
    },
    methods: {
      init() {
        let re = [];
        icons.forEach(e => {
          e.icons.forEach(item => {
            re.push(item);
          });
        });
        this.iconData = re;
      },

      generateIconCode(symbol) {
        return `<svg-icon icon-class="${symbol}" />`
      },
      generateElementIconCode(symbol) {
        // <Icon type="arrow-right-a"></Icon>
        return `<Icon type="${symbol}"></Icon>`
      },
      handleClipboard(text, event) {
        clipboard(text, event)
      },
    },
    created()  {
      this.init();
    },
  }

</script>

<style lang="scss" scoped>
  .icons-container {
    margin: 10px 20px 0;
    overflow: hidden;

    .icon-item {
      margin: 20px;
      height: 85px;
      text-align: center;
      width: 100px;
      float: left;
      font-size: 30px;
      color: #24292e;
      cursor: pointer;
      /*display: inline-block;*/
    }

    span {
      display: block;
      font-size: 16px;
      margin-top: 10px;
    }

    .disabled {
      pointer-events: none;
    }
  }
</style>
