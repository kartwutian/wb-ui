<template>
  <view class="pages-loading">
    <demo-block
      title="加载类型"
      padding
    >
      <van-loading custom-class="demo-loading" />
      <van-loading
        custom-class="demo-loading"
        type="spinner"
      />
    </demo-block>

    <demo-block
      title="自定义颜色"
      padding
    >
      <van-loading
        custom-class="demo-loading"
        color="#1989fa"
      />
      <van-loading
        custom-class="demo-loading"
        type="spinner"
        color="#1989fa"
      />
    </demo-block>

    <demo-block
      title="加载文案"
      padding
    >
      <van-loading
        custom-class="demo-loading"
        size="24px"
      >加载中...</van-loading>
    </demo-block>

    <demo-block
      title="垂直排列"
      padding
    >
      <van-loading
        custom-class="demo-loading"
        size="24px"
        vertical
      >加载中...</van-loading>
    </demo-block>
  </view>
</template>

<script>
import DemoBlock from "@/components/app/demo-block";
import VanLoading from "@/components/vant/loading/index";
export default {
  name: 'pages-loading',
  components: { VanLoading, DemoBlock },
  onLoad () {

  },
  onUnload () {

  },
  methods: {

  }
}
</script>

<style lang="less">
</style>
