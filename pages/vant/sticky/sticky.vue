<template>
  <view class="pages-sticky">
    <demo-block title="基础用法">
      <van-sticky>
        <van-button
          type="primary"
          style="margin-left: 15px"
        >
          基础用法
        </van-button>
      </van-sticky>
    </demo-block>

    <demo-block title="吸顶距离">
      <van-sticky :offset-top="50">
        <van-button
          type="info"
          style="margin-left: 115px"
        >
          吸顶距离
        </van-button>
      </van-sticky>
    </demo-block>
  </view>
</template>

<script>
import DemoBlock from "@/components/app/demo-block";
import VanSticky from "@/components/vant/sticky/index";
import VanButton from "@/components/vant/button/index";

export default {
  name: 'pages-sticky',
  components: { VanButton, VanSticky, DemoBlock },
  onLoad () {

  },
  onUnload () {

  },
  methods: {

  }
}
</script>

<style lang="less">
.pages-sticky {
  height: 200vh;
}
.van-button {
  margin-left: 16px;
}

.sticky-container {
  position: relative;
  z-index: -1;
  height: 150px;
  background-color: #fff;
}
</style>
