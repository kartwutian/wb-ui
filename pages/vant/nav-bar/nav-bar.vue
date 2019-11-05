<template>
  <view class="pages-nav-bar">
    <demo-block title="基础用法">
      <van-nav-bar
        title="标题"
        left-text="返回"
        right-text="按钮"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
      />
    </demo-block>

    <demo-block title="高级用法">
      <van-nav-bar
        title="标题"
        left-text="返回"
        left-arrow
      >
        <van-icon
          name="search"
          slot="right"
          custom-class="icon"
        />

      </van-nav-bar>
    </demo-block>
  </view>
</template>

<script>
import DemoBlock from "../../../components/app/demo-block";
import VanNavBar from "../../../components/vant/nav-bar/index.vue"
import VanIcon from "../../../components/vant/icon/index"

export default {
  name: 'pages-nav-bar',
  components: { VanNavBar, VanIcon, DemoBlock },
  onLoad () {

  },
  onUnload () {

  },
  methods: {
    onClickLeft () {
      uni.showToast({
        title: "点击返回",
        icon: "none"
      })
    },
    onClickRight () {
      uni.showToast({
        title: "点击按钮！！！",
        icon: "none"
      })
    }
  }
}
</script>

<style lang="less">
.icon {
  color: #1989fa;
}
</style>
