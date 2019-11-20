<template>
  <view class="pages-notify">
    <demo-block
      padding
      title="基础用法"
    >
      <van-button
        type="danger"
        @click="showNotify"
      >基础用法</van-button>
    </demo-block>

    <demo-block
      padding
      title="通知类型"
    >
      <view class="demo-margin-bottom">
        <van-button
          class="demo-margin-right"
          type="info"
          @click="showNotifyByType('primary')"
        >主要通知</van-button>
        <van-button
          type="primary"
          @click="showNotifyByType('success')"
        >成功通知</van-button>
      </view>
      <view class="demo-margin-bottom">
        <van-button
          class="demo-margin-right"
          type="danger"
          @click="showNotifyByType('danger')"
        >危险通知</van-button>
        <van-button
          type="warning"
          @click="showNotifyByType('warning')"
        >警告通知</van-button>
      </view>
    </demo-block>

    <demo-block
      padding
      title="自定义通知"
    >
      <van-button
        type="primary"
        class="demo-margin-right"
        @click="showCustomColor"
      >自定义颜色</van-button>
      <van-button
        type="primary"
        @click="showCustomDuration"
      >自定义时长</van-button>
    </demo-block>

    <van-notify
      ref="van-notify"
      safe-area-inset-top
    />
  </view>
</template>

<script>
import DemoBlock from "@/components/app/demo-block";
import VanButton from "@/components/vant/button/index"
import VanNotify from "@/components/vant/notify/index";
import Notify from "@/components/vant/notify/notify";

export default {
  name: 'pages-notify',
  components: { VanNotify, VanButton, DemoBlock },
  onLoad () {

  },
  onUnload () {

  },
  methods: {
    showNotify () {
      Notify('通知内容');
    },

    showCustomColor () {
      Notify({
        message: '自定义颜色',
        color: '#ad0000',
        background: '#ffe1e1'
      });
    },

    showCustomDuration () {
      Notify({
        duration: 1000,
        message: '自定义时长'
      });
    },

    showNotifyByType (type) {
      Notify({
        type,
        message: '通知内容'
      });
    }
  }
}
</script>

<style lang="less">
</style>
