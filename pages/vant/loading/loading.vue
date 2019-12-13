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

    <demo-block>
      <view class="loading-line">
        <van-loading
            custom-class="demo-loading"
            type="spinner"
        >加载中...</van-loading>
      </view>

    </demo-block>
  </view>
</template>

<script>
import DemoBlock from "@/components/app/demo-block";
import VanLoading from "@/components/vant/loading/index";
import VanDivider from "../../../components/vant/divider/index";
export default {
  name: 'pages-loading',
  components: {VanDivider, VanLoading, DemoBlock },
  onLoad () {

  },
  onUnload () {

  },
  methods: {

  }
}
</script>

<style lang="less">
  .pages-loading{
    background-color: #fff;
    .loading-line{
      padding: 20rpx;
      text-align: center;
    }
  }
</style>
