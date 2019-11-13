<template>
  <view class="pages-notice-bar">
    <demo-block title="基础用法">
      <van-notice-bar
        :text="text"
        left-icon="//img.yzcdn.cn/public_files/2017/8/10/6af5b7168eed548100d9041f07b7c616.png"
        @click="onclick"
      />
    </demo-block>

    <demo-block title="通告栏模式">
      <van-notice-bar
        mode="closeable"
        :text="text"
      />
      <van-notice-bar
        mode="link"
        :text="text"
      />
    </demo-block>

    <demo-block title="禁用滚动">
      <van-notice-bar
        :scrollable="false"
        :text="text"
      />
    </demo-block>

    <demo-block title="多行展示">
      <van-notice-bar
        wrapable
        :scrollable="false"
        :text="text"
      />
    </demo-block>

    <demo-block title="使用左右插槽">
      <van-notice-bar :text="text">
        <text slot="left-icon">[公告]</text>
        <text slot="right-icon">[结束]</text>
      </van-notice-bar>
    </demo-block>

    <demo-block title="自定义样式">
      <van-notice-bar
        :text="text"
        color="#1989fa"
        background="#ecf9ff"
        left-icon="info-o"
      />
    </demo-block>
  </view>
</template>

<script>
import DemoBlock from "@/components/app/demo-block";
import VanNoticeBar from "@/components/vant/notice-bar/index.vue"

export default {
  name: 'pages-notice-bar',
  components: { VanNoticeBar, DemoBlock },
  data () {
    return {
      text: '足协杯战线连续第2年上演广州德比战，上赛季半决赛上恒大以两回合5-3的总比分淘汰富力。'
    }
  },
  onLoad () {

  },
  onUnload () {

  },
  methods: {
    onclick (event) {
      console.log(event)
    }
  }
}
</script>

<style lang="less">
</style>
