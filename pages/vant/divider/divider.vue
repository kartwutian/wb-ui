<template>
  <view class="pages-divider">
    <demo-block
      custom-class="white"
      title="基础用法"
      padding
    >
      <van-divider />
    </demo-block>

    <demo-block
      custom-class="white"
      title="内容位置"
      padding
    >
      <van-divider content-position="center">文本</van-divider>
      <van-divider content-position="left">文本</van-divider>
      <van-divider content-position="right">文本</van-divider>
    </demo-block>

    <demo-block
      custom-class="white"
      title="虚线"
      padding
    >
      <van-divider dashed>文字</van-divider>
    </demo-block>

    <demo-block
      custom-class="white"
      title="自定义属性"
      padding
    >
      <van-divider
        contentPosition="center"
        textColor="#1989fa"
      >文本颜色</van-divider>
      <van-divider
        contentPosition="center"
        borderColor="#1989fa"
      >border颜色</van-divider>
      <van-divider
        contentPosition="center"
        fontSize="18"
      >字体大小</van-divider>
    </demo-block>

    <demo-block
      custom-class="white"
      title="自定义样式"
      padding
    >
      <van-divider
        content-position="center"
        custom-style="color: #1989fa;border-color: #1989fa;font-size: 18px;"
      >文本</van-divider>
    </demo-block>

  </view>
</template>

<script>
import DemoBlock from "@/components/app/demo-block";
import VanDivider from "@/components/vant/divider/index"
export default {
  name: 'pages-divider',
  components: { VanDivider, DemoBlock },
  onLoad () {

  },
  onUnload () {

  },
  methods: {

  }
}
</script>

<style lang="less">
page {
  background-color: white;
}
</style>
