<template>
  <view class="content">
    <image class="logo" src="/static/logo.png"></image>
    <view class="text-area">
      <text class="title">{{title}}</text>
    </view>

    <unicloud-db ref="udb" v-slot:default="{data, loading, error, options}" collection="contacts">
      <view v-if="error">{{error.message}}</view>
      <view v-else>
        <uni-list>
          <uni-list-item @longpress.native="rmItem(item._id)" v-for="item in data" :key="item._id" :title="item.name">
          </uni-list-item>
        </uni-list>
      </view>
    </unicloud-db>

    <uni-easyinput v-model="item.name" placeholder="name" />
    <uni-easyinput v-model="item.phone" placeholder="phone" />

    <button type="default" @click="submit">submit</button>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        title: 'Hello',
        item: {
          "name": '',
          "phone": ''
        }
      }
    },
    onLoad() {
      // uniCloud.callFunction({
      //   name: 'test',
      //   success: (e) => {
      //     console.log(e);
      //     this.title = e;
      //   }
      // })
    },
    methods: {
      rmItem(id) {
        this.$refs.udb.remove(id)
      },
      submit() {
        const db = uniCloud.database();
        db.collection('contacts').add(this.item).then(res => {
          console.log(res);
        })
      }
    }
  }
</script>

<style>
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .logo {
    height: 200rpx;
    width: 200rpx;
    margin-top: 200rpx;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 50rpx;
  }

  .text-area {
    display: flex;
    justify-content: center;
  }

  .title {
    font-size: 36rpx;
    color: #8f8f94;
  }
</style>
